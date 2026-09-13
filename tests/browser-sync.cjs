// Requires playwright-chromium. Tests local scripts against real PeerJS/LiveKit
// services in isolated browser profiles; no room directory beacons are posted.
const assert = require('node:assert/strict');
const { chromium } = require('playwright-chromium');
const { readFileSync } = require('node:fs');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const root = path.join(__dirname, '..');
const baseline = process.env.BASELINE === '1';
const live = process.env.LIVE === '1';
const source = baseline
    ? execFileSync('git', ['show', 'HEAD:script.js'], { cwd: root, encoding: 'utf8' })
    : readFileSync(path.join(root, 'script.js'), 'utf8');

(async () => {
    const options = { args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] };
    const hostBrowser = await chromium.launch({ ...options, ...(process.env.HOST_CHANNEL ? { channel: process.env.HOST_CHANNEL } : {}) });
    const guestBrowser = await chromium.launch(options);
    const errors = [];
    async function page(browser, name, delayed = false) {
        const p = await browser.newPage();
        p.on('pageerror', err => errors.push(`${name}: ${err.message}`));
        if (!live) await p.route('**/script.js*', route => route.fulfill({ body: source, contentType: 'application/javascript' }));
        await p.route('**/beacon', route => route.fulfill({ body: '{"ok":true}', contentType: 'application/json' }));
        if (delayed) {
            await p.route('**/token?*', async route => {
                await new Promise(resolve => setTimeout(resolve, 8000));
                await route.continue();
            });
        }
        await p.goto('https://darewheel.batorgames.site', { waitUntil: 'domcontentloaded' });
        await p.locator('#nameInput').fill(name);
        return p;
    }
    async function join(p, code) {
        await p.locator('#joinCodeInput').fill(code);
        await p.locator('#joinBtn').click();
        await p.waitForFunction(() => p2p && p2p.me && p2p.roster.length >= 2, null, { timeout: 60000 });
    }
    async function turn(p, index) {
        await p.waitForFunction(i => S.phase === 'play' && S.turnIdx === i && !S.spinning && !S.result, index, { timeout: 20000 });
        assert.equal(await p.locator('#gameScreen').isVisible(), true);
        assert.equal(await p.locator('#waitingHostNote').isVisible(), false);
    }
    async function spin(p, peers) {
        await p.locator('#spinBtn').click();
        for (const peer of peers) await peer.waitForFunction(() => S.result && !S.spinning, null, { timeout: 15000 });
        const results = await Promise.all(peers.map(peer => peer.evaluate(() => S.result.index)));
        assert.ok(results.every(value => value === results[0]), 'all peers must land on the same result');
    }
    try {
        const host = await page(hostBrowser, 'Host');
        await host.locator('#hostBtn').click();
        await host.waitForFunction(() => lk && lk._connected, null, { timeout: 60000 });
        const code = await host.evaluate(() => p2p.roomCode);
        const guest = await page(guestBrowser, 'DelayedGuest', true);
        await join(guest, code);
        await host.waitForFunction(() => p2p.roster.length === 2);
        assert.equal(await guest.evaluate(() => !!(lk && lk._connected)), false);
        await host.locator('#startGameBtn').click();
        await spin(host, [host]);
        await host.locator('#doneBtn').click();
        await turn(host, 1);
        await guest.waitForFunction(() => lk && lk._connected, null, { timeout: 30000 });
        await turn(guest, 1);
        console.log('PASS: delayed guest recovers missed start and current turn');

        await spin(guest, [host, guest]);
        await guest.locator('#doneBtn').click();
        await turn(host, 0); await turn(guest, 0);
        await spin(host, [host, guest]);
        await host.locator('#doneBtn').click();
        await turn(host, 1); await turn(guest, 1);
        console.log('PASS: guest and host each complete a turn without returning to lobby');

        // Force the reported timed item through the regular action handler.
        await guest.evaluate(() => sendGameEvent({ kind: 'spin', index: 21, turnIdx: S.turnIdx }));
        for (const peer of [host, guest]) {
            await peer.waitForFunction(() => S.result && !S.spinning);
            assert.equal(await peer.locator('#timerDisplay').textContent(), '3:00');
        }
        await guest.locator('#startTimerBtn').click();
        for (const peer of [host, guest]) await peer.waitForFunction(() => timers.running);

        const late = await page(guestBrowser, 'LateGuest');
        await join(late, code);
        await late.waitForFunction(() => S.phase === 'play' && S.result && timers.running, null, { timeout: 30000 });
        assert.equal(await late.evaluate(() => S.turnIdx), 1);
        assert.equal(await late.evaluate(() => S.result.index), 21);
        const seconds = text => text.split(':').reduce((a, n) => a * 60 + Number(n), 0);
        const times = await Promise.all([host, guest, late].map(p => p.locator('#timerDisplay').textContent()));
        assert.ok(times.every(t => seconds(t) > 120 && seconds(t) <= 180), `three-minute timers: ${times}`);
        assert.ok(Math.max(...times.map(seconds)) - Math.min(...times.map(seconds)) <= 2, `timers aligned: ${times}`);
        console.log('PASS: 3 min displays 3:00; late join restores the running countdown');

        await guest.locator('#doneBtn').click();
        for (const peer of [host, guest, late]) await turn(peer, 2);
        await spin(late, [host, guest, late]);
        await late.locator('#doneBtn').click();
        for (const peer of [host, guest, late]) await turn(peer, 0);
        console.log('PASS: late joiner takes a turn and all three players wrap to host');

        // Drop application packets on one guest, then let periodic sync recover.
        await guest.evaluate(() => { window.savedOnData = lk.onData; lk.onData = () => {}; });
        await spin(host, [host, late]);
        await host.locator('#doneBtn').click();
        await turn(host, 1);
        await guest.evaluate(() => { lk.onData = window.savedOnData; });
        await turn(guest, 1);
        console.log('PASS: guest recovers a missed turn update without restarting');
        assert.deepEqual(errors, []);
    } finally {
        await hostBrowser.close();
        await guestBrowser.close();
    }
})().catch(err => { console.error(err); process.exitCode = 1; });
