const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');

function room() {
    const clients = [], packets = [], roster = [];
    let now = 100000;
    function client(id) {
        const elements = new Map();
        const element = id => {
            if (!elements.has(id)) {
                const classes = new Set(['hidden']);
                elements.set(id, {
                    value: id === 'nameInput' ? 'Tester' : '', textContent: '', innerHTML: '', children: [],
                    classList: {
                        add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c),
                        toggle: (c, on = !classes.has(c)) => on ? classes.add(c) : classes.delete(c)
                    },
                    appendChild(child) { this.children.push(child); }, setAttribute() {},
                    querySelector(selector) { return selector === '.dare-list-text' ? element(Symbol()) : null; }, focus() {}
                });
            }
            return elements.get(id);
        };
        const c = { id, element, media: null, p2p: null, sent: [], callbacks: new Map() };
        const context = vm.createContext({
            console, window: {}, localStorage: { getItem: () => null },
            Date: { now: () => now }, Math,
            setInterval(fn) { const id = Symbol(); c.callbacks.set(id, fn); return id; },
            clearInterval(id) { c.callbacks.delete(id); },
            document: {
                getElementById: element, createElement: () => element(Symbol()),
                documentElement: { style: { setProperty() {} } }, addEventListener() {}
            },
            spinWheel: { Wheel: class {
                constructor(_el, options) { this.options = options; this.rotation = 0; }
                spinToItem(index, duration) { this.lastSpin = { index, duration }; }
                remove() {} stop() {}
            } },
            P2PRoom: class {
                constructor() { c.p2p = this; this.roster = roster; this.hostId = 'host'; }
                async host(name) { this.isHost = true; this.admit(name); return '#join=abc123'; }
                async join(name) { this.isHost = false; this.admit(name); }
                admit(name) {
                    this.me = { id, name }; roster.push(this.me);
                    for (const other of clients) other.p2p?.onRosterChange?.(roster);
                }
                setRoomMeta() {} advertiseWhenReady() {}
            },
            LKMedia: class {
                constructor() { c.media = this; this._connected = false; this.queue = []; this.onConnected = () => {}; }
                connect() { return Promise.resolve(true); }
                sendToAll(msg) {
                    if (!this._connected) { this.queue.push(msg); return; }
                    const payload = JSON.parse(JSON.stringify(msg));
                    c.sent.push(payload);
                    for (const other of clients) {
                        if (other !== c && other.media?._connected) packets.push({ from: id, to: other, payload });
                    }
                }
            },
            mountChatUI: () => ({ addMessage() {} })
        });
        c.run = code => vm.runInContext(code, context);
        c.state = () => JSON.parse(c.run('JSON.stringify(S)'));
        c.ready = () => {
            c.media._connected = true;
            for (const msg of c.media.queue.splice(0)) c.media.sendToAll(msg);
            c.media.onConnected();
        };
        c.rest = () => c.run('handleRest(S.spin.index)');
        vm.runInContext(source, context);
        clients.push(c);
        return c;
    }
    return {
        client, packets,
        advance(ms) { now += ms; },
        flush() {
            let count = 0;
            while (packets.length) {
                assert.ok(++count < 100, 'network must not loop');
                const packet = packets.shift();
                packet.to.media.onData(packet.from, JSON.parse(JSON.stringify(packet.payload)));
            }
        }
    };
}

test('minute abbreviations produce minutes in the countdown and dare list', () => {
    const c = room().client('solo');
    for (const [text, seconds] of [['3 min', 180], ['2 mins', 120], ['2mins', 120], ['3 MIN', 180],
        ['max 5 min', 300], ['2 minutes', 120], ['1 minute', 60], ['30 sec', 30],
        ['90 seconds', 90], ['45 secs', 45], ['3 repetitions', 0]]) {
        assert.equal(c.run(`extractTimerDuration(${JSON.stringify(text)})`), seconds, text);
    }
    c.run('startSolo(); spinToIndex(21); handleRest(21); renderDareList()');
    assert.equal(c.element('timerDisplay').textContent, '3:00');
    assert.match(c.element('dareListContent').children[21].innerHTML, /3:00/);
    c.run('acknowledge()');
    assert.equal(c.run('canSpin()'), true, 'solo can spin again after Done');
});

test('guest missing start recovers the current turn, not a fresh game', async () => {
    const net = room(), host = net.client('host'), guest = net.client('guest');
    await host.run('connect(true)'); host.ready();
    await guest.run('connect(false, "abc123")');
    host.run('hostStartGame(); doSpin()'); host.rest(); host.run('acknowledge()');
    net.flush();
    assert.equal(guest.state().phase, 'lobby');
    guest.ready(); net.flush();
    assert.equal(guest.state().phase, 'play');
    assert.equal(guest.state().turnIdx, 1);
    assert.equal(guest.element('lobbyScreen').classList.contains('hidden'), true);
    assert.equal(guest.element('waitingHostNote').classList.contains('hidden'), true);
    assert.equal(guest.element('spinBtn').classList.contains('hidden'), false);

    // The guest spins and completes its own turn, then play wraps back to host.
    guest.run('doSpin()'); net.flush(); host.rest(); net.flush();
    guest.run('acknowledge()'); net.flush();
    assert.equal(host.state().turnIdx, 0);
    assert.equal(guest.state().turnIdx, 0);
    assert.equal(guest.element('gameScreen').classList.contains('hidden'), false);
    assert.equal(guest.element('waitingHostNote').classList.contains('hidden'), true);
});

test('late join restores a running timer and repeated snapshots do not reset it', async () => {
    const net = room(), host = net.client('host');
    await host.run('connect(true)'); host.ready();
    host.run('hostStartGame(); sendGameEvent({kind:"spin", index:21, turnIdx:0})'); host.rest();
    host.run('startTimerNet()');
    net.advance(10000);
    const guest = net.client('guest');
    await guest.run('connect(false, "abc123")'); guest.ready(); net.flush();
    assert.equal(guest.element('timerDisplay').textContent, '2:50');
    assert.equal(guest.state().result.index, 21);
    const snapshot = host.sent.filter(p => p.type === 'gameState').at(-1);
    net.advance(2000);
    for (const fn of guest.callbacks.values()) fn(); net.flush();
    guest.media.onData('host', snapshot);
    assert.equal(guest.element('timerDisplay').textContent, '2:48');
    host.run('acknowledge()'); net.flush();
    assert.equal(guest.run('timers.running'), false);
    assert.equal(guest.state().timer, null);
    assert.equal(guest.element('spinBtn').classList.contains('hidden'), false);
});

test('lost state is recovered on the next sync request; duplicate actions advance once', async () => {
    const net = room(), host = net.client('host'), guest = net.client('guest');
    await host.run('connect(true)'); host.ready();
    await guest.run('connect(false, "abc123")'); guest.ready(); net.flush();
    host.run('hostStartGame(); doSpin()'); host.rest(); host.run('acknowledge()');
    net.packets.length = 0;
    guest.run('requestGameState()'); net.flush();
    assert.equal(guest.state().turnIdx, 1);
    guest.run('doSpin()'); net.flush(); host.rest(); net.flush();
    guest.run('acknowledge(); acknowledge()'); net.flush();
    assert.equal(host.state().turnIdx, 0);
    assert.equal(guest.state().turnIdx, 0);

    const old = host.sent.find(p => p.type === 'gameState' && p.game.phase === 'play');
    guest.media.onData('host', old);
    assert.equal(guest.state().revision, host.state().revision);
    guest.media.onData('stranger', { ...old, game: { ...old.game, revision: 999 } });
    assert.equal(guest.state().revision, host.state().revision);
});

test('joining mid-spin finishes only the remaining animation', async () => {
    const net = room(), host = net.client('host');
    await host.run('connect(true)'); host.ready();
    host.run('hostStartGame(); doSpin()');
    net.advance(2500);
    const guest = net.client('guest');
    await guest.run('connect(false, "abc123")'); guest.ready(); net.flush();
    assert.equal(guest.run('wheel.lastSpin.duration'), 1700);
    host.rest(); net.flush();
    assert.equal(guest.state().spinning, false);
    assert.equal(guest.state().result.index, host.state().result.index);
});

test('host with suspended animation settles from the clock and accepts the next action', async () => {
    const net = room(), host = net.client('host'), guest = net.client('guest');
    await host.run('connect(true)'); host.ready();
    await guest.run('connect(false, "abc123")'); guest.ready(); net.flush();
    host.run('hostStartGame(); doSpin()'); host.rest(); host.run('acknowledge()'); net.flush();
    guest.run('doSpin()'); net.flush();
    net.advance(5000);
    guest.rest(); guest.run('acknowledge()'); net.flush();
    assert.equal(host.state().turnIdx, 0);
    assert.equal(guest.state().turnIdx, 0);
    host.run('handleRest(0)'); net.flush();
    assert.equal(host.state().result, null, 'stale animation callback cannot reopen a result');
});

test('lost next-turn action keeps the result available to retry', async () => {
    const net = room(), host = net.client('host'), guest = net.client('guest');
    await host.run('connect(true)'); host.ready();
    await guest.run('connect(false, "abc123")'); guest.ready(); net.flush();
    host.run('hostStartGame(); doSpin()'); host.rest(); host.run('acknowledge()'); net.flush();
    guest.run('doSpin()'); net.flush(); host.rest(); net.flush();
    guest.run('acknowledge()'); net.packets.length = 0;
    assert.equal(guest.element('resultOverlay').classList.contains('hidden'), false);
    guest.run('acknowledge()'); net.flush();
    assert.equal(guest.state().turnIdx, 0);
});

test('expired timer remains expired after a roster update', async () => {
    const net = room(), host = net.client('host');
    await host.run('connect(true)'); host.ready();
    host.run('hostStartGame(); sendGameEvent({kind:"spin", index:21, turnIdx:0})'); host.rest();
    host.run('startTimerNet()'); net.advance(181000);
    for (const fn of host.callbacks.values()) fn();
    assert.equal(host.element('timerDisplay').textContent, "Time's up!");
    const guest = net.client('guest');
    await guest.run('connect(false, "abc123")'); guest.ready(); net.flush();
    assert.equal(guest.element('timerDisplay').textContent, "Time's up!");
    assert.equal(guest.run('timers.running'), false);
});
