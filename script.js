/* ============================================================
   DARE WHEEL — game + network orchestration (p2p.js)
   Wheel: spin-wheel by CrazyTim (MIT) — see LICENSE.spin-wheel.txt
   ============================================================ */

const ROOM_PREFIX = "wheel";

/* ============================================================
   👉 THE DARE LIST — replace these 25 dares with yours.
   - label: short text drawn ON the wheel slice (keep ≤ 12 chars)
   - text:  the full dare shown when the wheel lands
   - seconds: optional — shows a synced timer after the dare
   ============================================================ */
const DARES = [
    { label: "Dare 1",  text: "DARE 1 — (replace me)", seconds: 0 },
    { label: "Dare 2",  text: "DARE 2 — (replace me)", seconds: 0 },
    { label: "Dare 3",  text: "DARE 3 — (replace me)", seconds: 0 },
    { label: "Dare 4",  text: "DARE 4 — (replace me)", seconds: 0 },
    { label: "Dare 5",  text: "DARE 5 — (replace me)", seconds: 0 },
    { label: "Dare 6",  text: "DARE 6 — (replace me)", seconds: 0 },
    { label: "Dare 7",  text: "DARE 7 — (replace me)", seconds: 0 },
    { label: "Dare 8",  text: "DARE 8 — (replace me)", seconds: 0 },
    { label: "Dare 9",  text: "DARE 9 — (replace me)", seconds: 0 },
    { label: "Dare 10", text: "DARE 10 — (replace me)", seconds: 0 },
    { label: "Dare 11", text: "DARE 11 — (replace me)", seconds: 0 },
    { label: "Dare 12", text: "DARE 12 — (replace me)", seconds: 0 },
    { label: "Dare 13", text: "DARE 13 — (replace me)", seconds: 0 },
    { label: "Dare 14", text: "DARE 14 — (replace me)", seconds: 0 },
    { label: "Dare 15", text: "DARE 15 — (replace me)", seconds: 0 },
    { label: "Dare 16", text: "DARE 16 — (replace me)", seconds: 0 },
    { label: "Dare 17", text: "DARE 17 — (replace me)", seconds: 0 },
    { label: "Dare 18", text: "DARE 18 — (replace me)", seconds: 0 },
    { label: "Dare 19", text: "DARE 19 — (replace me)", seconds: 0 },
    { label: "Dare 20", text: "DARE 20 — (replace me)", seconds: 0 },
    { label: "Dare 21", text: "DARE 21 — (replace me)", seconds: 0 },
    { label: "Dare 22", text: "DARE 22 — (replace me)", seconds: 0 },
    { label: "Dare 23", text: "DARE 23 — (replace me)", seconds: 0 },
    { label: "Dare 24", text: "DARE 24 — (replace me)", seconds: 0 },
    { label: "Dare 25", text: "DARE 25 — (replace me)", seconds: 0 }
];

// Spin feel — identical params keep every screen in lockstep
const SPIN_DURATION = 4200;   // ms
const SPIN_REVOLUTIONS = 3;

/* ---------------- State ---------------- */

let p2p = null;
let chat = null;
let wheel = null;
let soloMode = false;

const S = {
    phase: "lobby",       // lobby | play
    players: [],          // [{id,name}]
    turnIdx: 0,
    spinning: false,
    result: null          // { index, spinnerName }
};

const timers = { interval: null, running: false };
const remoteStreams = new Map();

const $ = (id) => document.getElementById(id);
const me = () => p2p && p2p.me;
const isHost = () => p2p && p2p.isHost;
const myTurn = () => soloMode || (S.players.length && S.players[S.turnIdx].id === (me() && me().id));
const canSpin = () => (myTurn() || isHost()) && !S.spinning;
const spinnerName = () => (S.players[S.turnIdx] || {}).name || "…";

/* ============================================================
   WHEEL SETUP
   ============================================================ */

function buildWheel() {
    if (wheel) wheel.remove();
    wheel = new Wheel($("wheelContainer"), {
        items: DARES.map((d, i) => ({ label: d.label || "D" + (i + 1), weight: 1, value: i })),
        itemBackgroundColors: ["#0e4354", "#1a1a1a", "#142f3a", "#5a2430"],
        itemLabelColors: ["#ffffff"],
        itemLabelFont: "Arial, sans-serif",
        itemLabelFontSizeMax: 26,
        lineColor: "#00d4ff",
        lineWidth: 1,
        borderColor: "#00d4ff",
        borderWidth: 2,
        radius: 0.92,
        pointerAngle: 0,
        isInteractive: false,
        onRest: (e) => handleRest(e.currentIndex)
    });
}

function spinToIndex(index) {
    S.spinning = true;
    syncSpinUI();
    wheel.spinToItem(index, SPIN_DURATION, true, SPIN_REVOLUTIONS, 1);
}

function handleRest(index) {
    S.spinning = false;
    S.result = { index, spinnerName: spinnerName() };
    const dare = DARES[index];
    showResult(dare, S.result.spinnerName);
    syncSpinUI();
}

/* ============================================================
   RESULT OVERLAY + TIMER
   ============================================================ */

function showResult(dare, who) {
    $("resultNumber").textContent = "🎯 " + (dare.label || "Dare");
    $("resultText").textContent = dare.text;
    $("resultNote").textContent = soloMode ? "" : `${who} spun it — ${who} does it.`;

    const hasTimer = dare.seconds > 0;
    $("timerSection").classList.toggle("hidden", !hasTimer);
    if (hasTimer) {
        $("timerDisplay").textContent = fmt(dare.seconds);
        $("startTimerBtn").classList.toggle("hidden", !canActTimer() || timers.running ? false : false);
        syncTimerBtn();
    }

    $("doneBtn").classList.toggle("hidden", !canAcknowledge());
    $("resultOverlay").classList.remove("hidden");
}

function canActTimer() { return soloMode || myTurn() || isHost(); }
function canAcknowledge() { return !timers.running && canActTimer(); }

function fmt(t) {
    t = Math.max(0, Math.round(t));
    return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
}

function syncTimerBtn() {
    $("startTimerBtn").classList.toggle("hidden", !canActTimer() || timers.running);
    $("doneBtn").classList.toggle("hidden", !canAcknowledge());
}

function startTimerNet() {
    const dare = DARES[S.result.index];
    const msg = { kind: "timer", op: "start", duration: dare.seconds, at: Date.now() };
    if (!soloMode) p2p.sendAll({ type: "gameEvent", event: msg });
    runTimer(msg);
}

function runTimer({ duration, at }) {
    stopTimer();
    timers.running = true;
    const tick = () => {
        const remaining = duration - (Date.now() - at) / 1000;
        $("timerDisplay").textContent = remaining <= 0 ? "Time's up!" : fmt(remaining);
        if (remaining <= 0) {
            stopTimer();
            syncTimerBtn();
        }
    };
    tick();
    timers.interval = setInterval(tick, 250);
    syncTimerBtn();
}

function stopTimer() {
    if (timers.interval) clearInterval(timers.interval);
    timers.interval = null;
    timers.running = false;
}

function acknowledge() {
    stopTimer();
    $("resultOverlay").classList.add("hidden");
    if (soloMode) { syncSpinUI(); return; }
    const msg = { kind: "advance" };
    p2p.sendAll({ type: "gameEvent", event: msg });
    advanceTurn();
}

function advanceTurn() {
    if (S.players.length) S.turnIdx = (S.turnIdx + 1) % S.players.length;
    S.result = null;
    renderChips();
    syncSpinUI();
}

/* ============================================================
   UI SYNC
   ============================================================ */

function syncSpinUI() {
    $("spinBtn").classList.toggle("hidden", !canSpin());
    if (!canSpin() && !S.spinning && !soloMode) {
        $("waitingSpinnerNote").classList.remove("hidden");
        $("waitingSpinnerNote").textContent = `Waiting for ${spinnerName()} to spin…`;
    } else {
        $("waitingSpinnerNote").classList.add("hidden");
        $("waitingSpinnerNote").textContent = "";
    }
    if (S.spinning && !soloMode) {
        $("waitingSpinnerNote").classList.remove("hidden");
        $("waitingSpinnerNote").textContent = `🎡 ${spinnerName()} is spinning…`;
    }
    renderChips();
}

function renderChips() {
    if (soloMode) { $("turnOrder").innerHTML = ""; return; }
    const wrap = $("turnOrder");
    wrap.innerHTML = "";
    S.players.forEach((p, i) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        if (i === S.turnIdx) chip.classList.add("up-next");
        chip.textContent = p.name + (p.id === (me() && me().id) ? " (you)" : "");
        wrap.appendChild(chip);
    });
}

/* ============================================================
   GAME START (host)
   ============================================================ */

function hostStartGame() {
    S.players = p2p.roster.map((p) => ({ id: p.id, name: p.name }));
    S.phase = "play";
    S.turnIdx = 0;
    p2p.sendAll({ type: "gameEvent", event: { kind: "start", players: S.players } });
    enterGame();
}

function enterGame() {
    $("homeScreen").classList.add("hidden");
    $("lobbyScreen").classList.add("hidden");
    $("gameScreen").classList.remove("hidden");
    buildWheel();
    setTiles();
    renderChips();
    syncSpinUI();
}

/* ============================================================
   NETWORK (mirrors the suite pattern)
   ============================================================ */

function applyGameEvent(event) {
    switch (event.kind) {
        case "start":
            S.players = event.players;
            S.phase = "play";
            S.turnIdx = 0;
            enterGame();
            break;
        case "spin":
            S.turnIdx = event.turnIdx;
            renderChips();
            spinToIndex(event.index);
            break;
        case "timer":
            if (event.op === "start") runTimer(event);
            if (event.op === "stop") { stopTimer(); syncTimerBtn(); }
            break;
        case "advance":
            $("resultOverlay").classList.add("hidden");
            advanceTurn();
            break;
    }
}

function doSpin() {
    const index = Math.floor(Math.random() * DARES.length);
    if (!soloMode) {
        p2p.sendAll({ type: "gameEvent", event: { kind: "spin", index, turnIdx: S.turnIdx } });
    }
    spinToIndex(index);
}

async function connect(asHost, code) {
    const name = $("nameInput").value.trim() || "Gooner " + Math.floor(Math.random() * 90 + 10);
    $("connectStatus").textContent = "Getting your cam ready…";

    p2p = new P2PRoom({ prefix: ROOM_PREFIX });
    p2p.onRosterChange = () => {
        if (isHost() && S.phase === "lobby") { /* roster live-updates */ }
        renderLobby();
    };
    p2p.onStream = (id, who, stream) => { remoteStreams.set(id, stream); addTile(id, who, stream, false); };
    p2p.onStreamRemoved = (id) => { remoteStreams.delete(id); removeTile(id); };
    p2p.onPeerGone = (id, who) => {
        chat && chat.addMessage({ name: "", text: `${who} left the room`, system: true });
        if (S.phase === "play") {
            const idx = S.players.findIndex((p) => p.id === id);
            S.players = S.players.filter((p) => p.id !== id);
            if (idx > -1 && idx <= S.turnIdx && S.turnIdx > 0) S.turnIdx--;
            if (S.players.length) S.turnIdx = S.turnIdx % S.players.length;
            renderChips(); syncSpinUI();
        }
    };
    p2p.onHostGone = () => {
        alert("The host left — room closed.");
        location.hash = "";
        location.reload();
    };
    p2p.onHostMessage = (msg) => { if (msg && msg.type === "gameEvent") applyGameEvent(msg.event); };
    p2p.onAnyMessage = (peerId, msg) => {
        if (msg && msg.type === "chat") chat && chat.addMessage({ name: msg.name, text: msg.text, self: false });
        if (msg && msg.type === "gameEvent") applyGameEvent(msg.event);
    };
    p2p.onError = (err) => { $("connectStatus").textContent = "⚠️ " + err.message; };

    try {
        if (asHost) {
            const link = await p2p.host(name);
            $("shareLink").textContent = link;
        } else {
            $("connectStatus").textContent = "Joining room…";
            await p2p.join(name, code);
        }
    } catch (err) {
        $("connectStatus").textContent = "⚠️ " + (err.message || "Could not connect.");
        return;
    }

    chat = mountChatUI($("chatRoot"), {
        selfName: name,
        onSend: (text) => {
            p2p.sendAll({ type: "chat", name: me().name, text });
            chat.addMessage({ name: me().name, text, self: true });
        }
    });

    soloMode = false;
    $("mediaBar").classList.remove("hidden");
    if (isHost()) $("startGameBtn").classList.remove("hidden");
    else $("waitingHostNote").classList.remove("hidden");
    $("homeScreen").classList.add("hidden");
    $("lobbyScreen").classList.remove("hidden");
    setTiles();
    renderLobby();
    $("connectStatus").textContent = "";
}

function renderLobby() {
    if (!p2p) return;
    const wrap = $("lobbyPlayers");
    wrap.innerHTML = "";
    p2p.roster.forEach((p, i) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = (i === 0 ? "👑 " : "") + p.name + (p.id === (me() && me().id) ? " (you)" : "");
        wrap.appendChild(chip);
    });
}

/* ---------------- tiles ---------------- */

function activeGrid() {
    return $("gameScreen").classList.contains("hidden") ? $("videoGridLobby") : $("videoGridGame");
}

function setTiles() {
    const grid = activeGrid();
    if (!grid || !p2p) return;
    grid.innerHTML = "";
    addTile(me().id, me().name + " (you)", p2p.localStream, true);
    p2p.roster.forEach((p) => {
        if (p.id !== (me() && me().id) && remoteStreams.has(p.id)) addTile(p.id, p.name, remoteStreams.get(p.id), false);
    });
}

function addTile(peerId, label, stream, muted) {
    const grid = activeGrid();
    if (!grid) return;
    let tile = grid.querySelector(`[data-peer="${peerId}"]`);
    if (!tile) {
        tile = document.createElement("div");
        tile.className = "video-tile";
        tile.dataset.peer = peerId;
        tile.innerHTML = "<video autoplay playsinline></video><span class=\"tile-label\"></span>";
        grid.appendChild(tile);
    }
    const v = tile.querySelector("video");
    v.muted = muted;
    if (v.srcObject !== stream) v.srcObject = stream;
    tile.querySelector(".tile-label").textContent = label;
}

function removeTile(peerId) {
    document.querySelectorAll(`[data-peer="${peerId}"]`).forEach((t) => t.remove());
}

/* ============================================================
   EVENTS + INIT
   ============================================================ */

function init() {
    $("soloBtn").addEventListener("click", () => {
        soloMode = true;
        S.players = [{ id: "solo", name: "You" }];
        S.phase = "play";
        enterGame();
    });

    $("hostBtn").addEventListener("click", () => connect(true));
    $("joinBtn").addEventListener("click", () => {
        const code = $("joinCodeInput").value.trim().toLowerCase();
        if (code.length !== 6) { $("connectStatus").textContent = "Enter the 6-character room code."; return; }
        connect(false, code);
    });

    const m = location.hash.match(/#join=([a-z0-9]{6})/i);
    if (m) {
        $("joinCodeInput").value = m[1].toLowerCase();
        $("connectStatus").textContent = "Link loaded — enter your name and hit Join.";
        $("nameInput").focus();
    }

    $("copyLinkBtn").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText($("shareLink").textContent);
            $("copyLinkBtn").textContent = "Copied!";
            setTimeout(() => ($("copyLinkBtn").textContent = "Copy"), 1500);
        } catch (_) {}
    });
    $("textLinkBtn").addEventListener("click", async () => {
        const url = $("shareLink").textContent;
        if (navigator.share) {
            try { await navigator.share({ title: "DARE WHEEL", text: "Spin it if you dare:", url }); return; } catch (_) {}
        }
        try { await navigator.clipboard.writeText(url); alert("Link copied — text it to your buds!"); } catch (_) {}
    });

    $("startGameBtn").addEventListener("click", hostStartGame);
    $("leaveLobbyBtn").addEventListener("click", () => { p2p && p2p.destroy(); location.hash = ""; location.reload(); });

    $("spinBtn").addEventListener("click", () => { if (canSpin()) doSpin(); });
    $("startTimerBtn").addEventListener("click", startTimerNet);
    $("doneBtn").addEventListener("click", acknowledge);
    $("quitBtn").addEventListener("click", () => { p2p && p2p.destroy(); location.hash = ""; location.reload(); });

    $("toggleMicBtn").addEventListener("click", () => {
        const on = p2p && p2p.toggleMic();
        $("toggleMicBtn").classList.toggle("media-off", !on);
    });
    $("toggleCamBtn").addEventListener("click", () => {
        const on = p2p && p2p.toggleCam();
        $("toggleCamBtn").classList.toggle("media-off", !on);
    });
}

document.addEventListener("DOMContentLoaded", init);
