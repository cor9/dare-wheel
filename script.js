/* ============================================================
   DARE WHEEL COLLECTION — 6 wheels x 25 dares
   P2P cams + chat + synced spins (p2p.js)
   Wheel: spin-wheel by CrazyTim (MIT) — see LICENSE.spin-wheel.txt
   ============================================================ */

const ROOM_PREFIX = "wheel";
const MAX_REROLLS = 3;

/* ============================================================
   THE WHEELS
   ============================================================ */
const WHEELS = [
    {
        id: "balanced",
        name: "The Balanced Wheel",
        icon: "⚖️",
        desc: "A bit of everything",
        theme: { accent: "#00d4ff", slices: ["#0e4354", "#1a1a1a", "#142f3a", "#0a3a4a"] },
        dares: [
            "Fully naked, slow 360° turn",
            "Flex! Show off your muscles",
            "5 naked jumping jacks (on stream)",
            "Show off 3 pairs of underwear",
            "Measure your cock girth & length",
            "Spread your legs wide open and rub your body",
            "Wank slowly for 30 sec",
            "Stroke 30 sec, loose grip, medium pace",
            "Slap your dick against your palm 10x",
            "Hands behind head — wiggle, shake, windmill",
            "Wear a sock on your cock and balls, show off on video",
            "Squat and let your balls touch the floor",
            "Hump a pillow for 45 sec",
            "Bate like a monkey for 30 sec",
            "Sing a song while touching yourself",
            "Blindfold yourself and sensually wank for 90 seconds",
            "On all fours, doggy, tongue out, spin around and shake your tail",
            "5 hard spanks on each butt cheek",
            "Tie your balls up, then slap 7x (loose, soft cord, max 5 min)",
            "Edge once with legs in the air",
            "Edge once while pressing your taint",
            "Wank on stream for 3 min",
            "Cum in your hand and eat it",
            "Choose a dare for another player",
            "Lucky free roll"
        ]
    },
    {
        id: "gauntlet",
        name: "The Edging Gauntlet",
        icon: "😮‍💨",
        desc: "Stamina required",
        theme: { accent: "#ff6b35", slices: ["#3a1c14", "#22100b", "#4a2417", "#1a0d08"] },
        dares: [
            "Fully naked, slow 360° turn",
            "Wank slowly for 30 sec",
            "Stroke 30 sec, loose grip, medium pace",
            "Wank with your non-dominant hand for 60 sec",
            "Sing or recite lyrics while stroking at medium pace",
            "Blindfold yourself and sensually wank for 90 sec",
            "Hump a pillow for 45 sec",
            "Edge once, legs in the air",
            "Edge once while pressing your taint",
            "Edge once wearing only socks and a hat",
            "Slowest possible strokes for 90 sec — if you speed up, restart",
            "Stop-and-go: 25 strokes, hands off, x5 rounds",
            "Wank on stream for 3 min",
            "Hold a plank, naked, for 45 sec",
            "Edge (slow wank), Edge (fast), Edge (thrusting)",
            "Squeeze your dick as hard as you can and stroke 30 sec",
            "Slap your dick against your palm 10x",
            "Tie your balls up, then slap 7x (loose, soft cord, max 5 min)",
            "5 hard spanks on each butt cheek",
            "Show us your fave technique",
            "Coin flip: heads = double the next dare, tails = re-spin",
            "Cum in your hand and eat it",
            "Jerk until you give yourself a facial",
            "Lucky free roll",
            "Choose a dare for another player"
        ]
    },
    {
        id: "clown",
        name: "The Clown Wheel",
        icon: "🤡",
        desc: "Humiliation comedy hour",
        theme: { accent: "#ffd93d", slices: ["#3a2e0e", "#241c08", "#3d2f66", "#1c1531"] },
        dares: [
            "Wear a sock on your cock and balls, show off on video",
            "Bate like a monkey for 30 sec",
            "On all fours, doggy, tongue out, spin and shake your tail",
            "Hands behind head — wiggle, shake, windmill",
            "5 naked jumping jacks on stream",
            "Flex! Show off your muscles",
            "Sing a song while touching yourself",
            "5 hard spanks on each butt cheek",
            "Squat and let your balls touch the floor",
            "Show off your pits, then lick them",
            "Hump a pillow for 45 sec",
            "Underwear on head til the game is over",
            "Deepthroat a banana for 30 sec, no hands",
            "Winner instructs you to write something on your body",
            "Hold an ice cube on your balls until it melts",
            "Measure your penis",
            "Truth: most embarrassing boner story, told in detail",
            "Wank slowly for 30 sec",
            "Slap your dick against your palm 10x",
            "Wank on stream for 3 min",
            "Goon and drool 60 sec",
            "Cum in your hand and eat it",
            "Jerk until you give yourself a facial",
            "Choose a dare for another player",
            "Lucky free roll"
        ]
    },
    {
        id: "sensual",
        name: "The Sensual Wheel",
        icon: "🕯️",
        desc: "Slow, teasing, torturous",
        theme: { accent: "#ff7bac", slices: ["#3d1626", "#241018", "#4a1a2e", "#1a0c12"] },
        dares: [
            "Undress one piece of clothing per 10 strokes, slowly",
            "Fully naked, slow 360° turn with hands behind your head",
            "Rub your body all over with lotion or oil, 2 minutes",
            "Spread your legs wide open and rub your body",
            "Slowly wank for 60 sec — eyes closed, no sound",
            "Blindfold yourself and sensually wank for 90 seconds",
            "Ice cube from your neck, down your chest, to your balls",
            "Tease just the tip with two fingers for 60 sec",
            "Stroke your inner thighs and taint only — no touching your dick for 90 sec",
            "Nipple play: pinch, pull, and roll for 60 sec",
            "Hump a pillow slowly for 45 sec, no hands",
            "Wank with your non-dominant hand, slow, for 60 sec",
            "Edge once with legs in the air, then breathe and hold it",
            "Edge once while pressing your taint",
            "Edge once wearing only socks and a hat",
            "Frenulum rub 60 sec",
            "Mirror dare: watch yourself in a mirror while wanking 60 sec",
            "Slowest possible strokes for 90 sec — speed up and you restart",
            "Stop-and-go: 25 strokes, hands off, x5 rounds",
            "Dance or sing, as sensually as possible",
            "Wank on stream for 2 min, build pace from 1 to 10",
            "Partner picks your tempo for 2 minutes — you may not cum",
            "Hands-free: thrust into a lubed fist or toy held 60 sec",
            "Hold the edge for 30 seconds without moving, three times",
            "Lucky free roll"
        ]
    },
    {
        id: "showoff",
        name: "The Show-Off Wheel",
        icon: "💪",
        desc: "Time to perform, big boy",
        theme: { accent: "#ffc627", slices: ["#33270c", "#1c1606", "#3a2c0e", "#241c08"] },
        dares: [
            "Flex! Show off your muscles",
            "Fully naked, slow 360° turn, tensed the whole time",
            "5 naked jumping jacks on stream",
            "10 push-ups, naked, hardest flex at the top of each",
            "Hands behind head — wiggle, shake, windmill",
            "Squat and let your balls touch the floor, 5 reps",
            "On all fours, doggy, tongue out, spin around and shake your tail",
            "Bate like a monkey for 30 sec",
            "Slap your dick against your palm 10x",
            "Helicopter for 10 full rotations",
            "Measure your cock girth & length, announce the numbers out loud",
            "Wear a sock on your cock and balls, show off on video",
            "Show off 3 pairs of underwear, model each one",
            "Show off your pits, then lick them",
            "Deepthroat a banana for 30 sec, no hands",
            "Hump a pillow for 45 sec, eye contact with the cam",
            "Hold a plank, naked, for 45 sec",
            "Flex-off: hold your best pose until your partner says stop",
            "Magic Mike stripper dance",
            "Bounce your cock for 20 sec",
            "Let another player control your bate 2 mins",
            "Spit on it and edge 2x",
            "Sloppy with lube, stroke freestyle 45 sec",
            "Choose a dare for another player",
            "Lucky free roll"
        ]
    },
    {
        id: "beginner",
        name: "The Beginner Wheel",
        icon: "🌱",
        desc: "No cum, no pain — easy warm-up",
        theme: { accent: "#7bd88f", slices: ["#123a22", "#0c2415", "#1a4a2c", "#0f2e1a"] },
        dares: [
            "5 jumping jacks, shirt off",
            "Show off your favorite pair of underwear",
            "Flex! Show off your muscles",
            "Get naked with a strip tease dance",
            "Wear a sock on your cock and balls, show off on video",
            "Pretend to be a dog and bark 5 times",
            "Wear socks on your hands for 5 minutes",
            "Bate like a monkey for 30 sec",
            "Hands behind head — wiggle, shake, windmill",
            "Hump a pillow for 45 sec",
            "Squat and let your balls touch the floor",
            "Blindfold yourself for the next 3 minutes",
            "Wank slowly for 30 sec",
            "Stroke 30 sec, loose grip, medium pace",
            "Rub and slap your body for 60 sec",
            "Spread your legs wide open and rub your body",
            "Ice cube on your chest, stomach, cock until it melts",
            "Tease just the tip with two fingers for 60 sec",
            "Breath hold while stroking for 15 sec, breathe, then edge",
            "Edge once with legs in the air",
            "Edge once while pressing your taint",
            "Slowest possible strokes for 60 sec — speed up and restart",
            "Wank on stream for 2 minutes",
            "Choose a dare for another player",
            "Lucky free roll"
        ]
    }
];

// Spin feel — identical params keep every screen in lockstep
const SPIN_DURATION = 4200;   // ms
const SPIN_REVOLUTIONS = 3;

/* ---------------- Helpers ---------------- */

const $ = (id) => document.getElementById(id);

function activeWheel() {
    return WHEELS.find((w) => w.id === S.wheelId) || WHEELS[0];
}

// Pull a duration (seconds) out of the dare text, if it has one
function extractTimerDuration(text) {
    const patterns = [
        /(\d+)\s*seconds?/i,
        /(\d+)\s*secs?/i,
        /(\d+)\s*minutes?/i,
        /(\d+)\s*mins?/i
    ];
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            const value = parseInt(match[1], 10);
            return pattern.source.includes("minute") ? value * 60 : value;
        }
    }
    return 0;
}

/* ---------------- State ---------------- */

let p2p = null;
let lk = null;        // LiveKit media layer (lk.js)
let chat = null;
let wheel = null;
let soloMode = false;

const S = {
    phase: "lobby",       // lobby | play
    players: [],          // [{id,name}]
    turnIdx: 0,
    spinning: false,
    result: null,         // { index }
    wheelId: "balanced",
    rerolls: {}           // playerId -> count used
};

const timers = { interval: null, running: false };
const tiles = new Map(); // identity -> { name, stream, muted }

const me = () => p2p && p2p.me;
const isHost = () => p2p && p2p.isHost;
const myTurn = () => soloMode || (S.players.length && S.players[S.turnIdx].id === (me() && me().id));
const canSpin = () => (myTurn() || isHost()) && !S.spinning;
const spinnerName = () => (S.players[S.turnIdx] || {}).name || "…";
const myRerollsLeft = () => MAX_REROLLS - (S.rerolls[(me() && me().id) || "solo"] || 0);

/* ============================================================
   WHEEL SETUP
   ============================================================ */

function buildWheel() {
    if (wheel) wheel.remove();
    const theme = activeWheel().theme;
    wheel = new spinWheel.Wheel($("wheelContainer"), {
        items: activeWheel().dares.map((text, i) => ({
            label: String(i + 1),
            weight: 1,
            value: i
        })),
        itemBackgroundColors: theme.slices,
        itemLabelColors: ["#ffffff"],
        itemLabelFont: "Arial, sans-serif",
        itemLabelFontSizeMax: 30,
        lineColor: theme.accent,
        lineWidth: 1,
        borderColor: theme.accent,
        borderWidth: 2,
        radius: 0.92,
        pointerAngle: 0,
        isInteractive: false,
        onRest: (e) => handleRest(e.currentIndex)
    });
    applyTheme();
    renderWheelBanner();
}

// Theme the page accent to match the active wheel
function applyTheme() {
    document.documentElement.style.setProperty("--wheel-accent", activeWheel().theme.accent);
}

function renderWheelBanner() {
    const w = activeWheel();
    $("wheelName").textContent = `${w.icon} ${w.name}`;
    $("switchWheelBtn").classList.toggle("hidden", !(isHost() || soloMode));
}

function spinToIndex(index) {
    S.spinning = true;
    syncSpinUI();
    wheel.spinToItem(index, SPIN_DURATION, true, SPIN_REVOLUTIONS, 1);
}

function handleRest(index) {
    S.spinning = false;
    S.result = { index };
    showResult(index);
    syncSpinUI();
}

/* ============================================================
   RESULT OVERLAY + TIMER + RE-ROLL
   ============================================================ */

function showResult(index) {
    const dareText = activeWheel().dares[index];
    $("resultNumber").textContent = `${activeWheel().icon} Dare #${index + 1}`;
    $("resultText").textContent = dareText;
    $("resultNote").textContent = soloMode ? "" : `${spinnerName()} spun it — ${spinnerName()} does it.`;

    const seconds = extractTimerDuration(dareText);
    $("timerSection").classList.toggle("hidden", !seconds);
    if (seconds) $("timerDisplay").textContent = fmt(seconds);

    // Re-roll offer: only the spinner, only if they have tolls left
    const offerReroll = !soloMode
        ? (myTurn() || isHost()) && myRerollsLeft() > 0
        : true;
    $("rerollBtn").textContent = soloMode
        ? "🔄 Re-spin"
        : `🔄 Re-roll — ${myRerollsLeft()} left (costs a juicy truth)`;
    $("rerollBtn").classList.toggle("hidden", !offerReroll);

    syncTimerBtn();
    $("resultOverlay").classList.remove("hidden");
}

function canActTimer() { return soloMode || myTurn() || isHost(); }

function fmt(t) {
    t = Math.max(0, Math.round(t));
    return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
}

function syncTimerBtn() {
    const hasTimedDare = S.result &&
        extractTimerDuration(activeWheel().dares[S.result.index]) > 0;
    $("startTimerBtn").classList.toggle("hidden",
        !(hasTimedDare && canActTimer() && !timers.running));
    $("doneBtn").classList.toggle("hidden", !canActTimer());
}

function startTimerNet() {
    const seconds = extractTimerDuration(activeWheel().dares[S.result.index]);
    const msg = { kind: "timer", op: "start", duration: seconds, at: Date.now() };
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

/* ---------------- Re-roll (juicy truth toll) ---------------- */

function askReroll() {
    if (soloMode) {
        const index = Math.floor(Math.random() * 25);
        stopTimer();
        spinToIndex(index);
        return;
    }
    $("truthInput").value = "";
    $("truthModal").classList.remove("hidden");
    $("truthInput").focus();
}

function submitTruth() {
    const truth = $("truthInput").value.trim();
    if (!truth) { $("truthInput").focus(); return; }

    const who = me().name;
    p2p.sendAll({ type: "chat", name: who, text: "🙊 Re-roll toll: " + truth });

    S.rerolls[me().id] = (S.rerolls[me().id] || 0) + 1;

    $("truthModal").classList.add("hidden");
    stopTimer();

    const index = Math.floor(Math.random() * 25);
    p2p.sendAll({ type: "gameEvent", event: { kind: "spin", index, turnIdx: S.turnIdx, rerollerId: me().id } });
    spinToIndex(index);
}

function acknowledge() {
    stopTimer();
    $("resultOverlay").classList.add("hidden");
    if (soloMode) { syncSpinUI(); return; }
    p2p.sendAll({ type: "gameEvent", event: { kind: "advance" } });
    advanceTurn();
}

function advanceTurn() {
    if (S.players.length) S.turnIdx = (S.turnIdx + 1) % S.players.length;
    S.result = null;
    renderChips();
    syncSpinUI();
}

/* ============================================================
   WHEEL SWITCH
   ============================================================ */

function renderWheelPicker() {
    const grid = $("wheelGrid");
    grid.innerHTML = "";
    WHEELS.forEach((w) => {
        const card = document.createElement("button");
        card.className = "wheel-card" + (w.id === S.wheelId ? " active" : "");
        card.innerHTML = `<span class="wheel-card-icon">${w.icon}</span>
                          <span class="wheel-card-name">${w.name}</span>
                          <span class="wheel-card-desc">${w.desc}</span>`;
        card.addEventListener("click", () => switchWheel(w.id));
        grid.appendChild(card);
    });
}

function switchWheel(wheelId) {
    S.wheelId = wheelId;
    buildWheel();
    $("wheelPicker").classList.add("hidden");
    if (!soloMode) {
        p2p.sendAll({ type: "gameEvent", event: { kind: "switch", wheelId } });
        chat && chat.addMessage({ name: "", text: `🎡 Wheel switched to: ${activeWheel().name}`, system: true });
        p2p.sendAll({ type: "gameEvent", event: { kind: "chatSystem", text: `🎡 Wheel switched to: ${activeWheel().name}` } });
    }
}

/* ============================================================
   DARE LIST BROWSER
   ============================================================ */

let dareListWheelId = "balanced";

function openDareList(wheelId) {
    dareListWheelId = wheelId || S.wheelId;
    renderDareListTabs();
    renderDareList();
    $("dareListOverlay").classList.remove("hidden");
}

function renderDareListTabs() {
    const tabs = $("dareListTabs");
    tabs.innerHTML = "";
    WHEELS.forEach((w) => {
        const btn = document.createElement("button");
        btn.className = "dare-list-tab" + (w.id === dareListWheelId ? " active" : "");
        btn.textContent = w.icon + " " + w.name.replace("The ", "").replace(" Wheel", "");
        btn.title = w.name;
        btn.addEventListener("click", () => {
            dareListWheelId = w.id;
            renderDareListTabs();
            renderDareList();
        });
        tabs.appendChild(btn);
    });
}

function renderDareList() {
    const w = WHEELS.find((x) => x.id === dareListWheelId) || WHEELS[0];
    $("dareListTitle").textContent = `${w.icon} ${w.name} — 25 dares`;
    const content = $("dareListContent");
    content.innerHTML = "";
    w.dares.forEach((text, i) => {
        const row = document.createElement("div");
        row.className = "dare-list-row";
        const secs = extractTimerDuration(text);
        row.innerHTML = `<span class="dare-list-num">${i + 1}</span>` +
                        `<span class="dare-list-text"></span>` +
                        (secs ? `<span class="dare-list-time">⏱ ${fmt(secs)}</span>` : "");
        row.querySelector(".dare-list-text").textContent = text;
        content.appendChild(row);
    });
}



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
        const tolls = S.rerolls[p.id] || 0;
        chip.textContent = p.name +
            (p.id === (me() && me().id) ? " (you)" : "") +
            (tolls ? ` 🙊${tolls}` : "");
        wrap.appendChild(chip);
    });
}

/* ============================================================
   GAME START (host) / SOLO
   ============================================================ */

function hostStartGame() {
    S.players = p2p.roster.map((p) => ({ id: p.id, name: p.name }));
    S.phase = "play";
    S.turnIdx = 0;
    S.rerolls = {};
    p2p.sendAll({ type: "gameEvent", event: { kind: "start", players: S.players, wheelId: S.wheelId } });
    enterGame();
}

function startSolo() {
    soloMode = true;
    S.players = [{ id: "solo", name: "You" }];
    S.phase = "play";
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
   NETWORK
   ============================================================ */

function applyGameEvent(event) {
    switch (event.kind) {
        case "start":
            S.players = event.players;
            S.wheelId = event.wheelId || S.wheelId;
            S.phase = "play";
            S.rerolls = {};
            enterGame();
            // late joiner? align the wheel exactly with everyone else
            if (event.rotation !== undefined && wheel) {
                wheel.rotation = event.rotation;
            }
            S.turnIdx = event.turnIdx !== undefined ? event.turnIdx : 0;
            renderChips();
            break;
        case "switch":
            S.wheelId = event.wheelId;
            buildWheel();
            break;
        case "spin":
            S.turnIdx = event.turnIdx;
            if (event.rerollerId && event.rerollerId !== (me() && me().id)) {
                S.rerolls[event.rerollerId] = (S.rerolls[event.rerollerId] || 0) + 1;
            }
            renderChips();
            stopTimer();
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
        case "chatSystem":
            chat && chat.addMessage({ name: "", text: event.text, system: true });
            break;
    }
}

function doSpin() {
    const index = Math.floor(Math.random() * 25);
    if (!soloMode) {
        p2p.sendAll({ type: "gameEvent", event: { kind: "spin", index, turnIdx: S.turnIdx } });
    }
    spinToIndex(index);
}

async function connect(asHost, code) {
    const name = $("nameInput").value.trim() || "Gooner " + Math.floor(Math.random() * 90 + 10);
    $("connectStatus").textContent = "Getting your cam ready…";

    p2p = new P2PRoom({ prefix: ROOM_PREFIX, requireMedia: false }); // data channels only
    p2p.onRosterChange = (roster) => {
        renderLobby();
        if (isHost() && S.phase === "play") {
            // Catch late joiners up: current players + exact wheel rotation,
            // sent only to them — no disruption for players mid-game.
            roster.forEach((p) => {
                if (!S.players.some((sp) => sp.id === p.id)) {
                    S.players.push({ id: p.id, name: p.name });
                    const conn = p2p.conns.get(p.id);
                    if (conn && conn.open) {
                        conn.send({
                            type: "gameEvent",
                            event: {
                                kind: "start",
                                players: S.players,
                                wheelId: S.wheelId,
                                rotation: wheel ? wheel.rotation : 0,
                                turnIdx: S.turnIdx
                            }
                        });
                    }
                }
            });
            renderChips();
            syncSpinUI();
        }
    };
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
    // Events are applied ONLY via onAnyMessage. (onHostMessage would double-fire:
    // the same host message would advance turns twice — the "stuck on host" bug.)
    p2p.onAnyMessage = (peerId, msg) => {
        if (msg && msg.type === "chat") {
            chat && chat.addMessage({ name: msg.name, text: msg.text, self: msg.name === (me() && me().name) });
        }
        if (msg && msg.type === "gameEvent") applyGameEvent(msg.event);
    };
    p2p.onError = (err) => { $("connectStatus").textContent = "⚠️ " + err.message; };

    try {
        if (asHost) {
            const link = await p2p.host(name);
            $("shareLink").textContent = link;
            p2p.setRoomMeta({ title: "Dare Wheel", password: $("passwordInput").value.trim() });
            // hub directory connects in the background so it never blocks the room
            p2p.advertiseWhenReady();
        } else {
            $("connectStatus").textContent = "Joining room…";
            await p2p.join(name, code, $("passwordInput").value.trim());
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

    // ---- LiveKit cams (media layer) ----
    window.LK_TILE_CONFIG = {
        isHost: () => p2p && p2p.isHost,
        kick: (id) => p2p.kickPeer(id),
        selfId: () => (p2p && p2p.me && p2p.me.id) || null
    };
    lk = new LKMedia();
    lk.onTile = (id, label, stream, isLocal) => {
        tiles.set(id, { name: label, stream, muted: isLocal });
        addTile(id, label, stream, isLocal);
    };
    lk.onRemoveTile = (id) => {
        tiles.delete(id);
        removeTile(id);
    };
    lk.onError = (err) => { $("connectStatus").textContent = "⚠️ " + err.message; };
    // room name ties LiveKit to this p2p room; identity maps 1:1 to roster
    // Joining the session must not wait on camera permission or the media service.
    lk.connect(p2p.hostId, p2p.me.id, name).catch((err) => lk.onError(err));

    soloMode = false;
    $("mediaBar").classList.remove("hidden");
    if (isHost()) $("startGameBtn").classList.remove("hidden");
    else $("waitingHostNote").classList.remove("hidden");
    $("homeScreen").classList.add("hidden");
    // A running host may already have sent the session snapshot during admission.
    $("lobbyScreen").classList.toggle("hidden", S.phase === "play");
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
    if (!grid) return;
    grid.innerHTML = "";
    tiles.forEach((t, id) => addTile(id, t.name, t.stream, t.muted));
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
    $("soloBtn").addEventListener("click", startSolo);

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
    $("rerollBtn").addEventListener("click", askReroll);
    $("submitTruthBtn").addEventListener("click", submitTruth);
    $("cancelTruthBtn").addEventListener("click", () => $("truthModal").classList.add("hidden"));

    $("switchWheelBtn").addEventListener("click", () => { renderWheelPicker(); $("wheelPicker").classList.remove("hidden"); });
    $("closePickerBtn").addEventListener("click", () => $("wheelPicker").classList.add("hidden"));

    $("dareListBtn").addEventListener("click", () => openDareList());
    $("browseBtn").addEventListener("click", () => openDareList("balanced"));
    $("closeDareListBtn").addEventListener("click", () => $("dareListOverlay").classList.add("hidden"));

    $("quitBtn").addEventListener("click", () => { p2p && p2p.destroy(); location.hash = ""; location.reload(); });

    $("toggleMicBtn").addEventListener("click", async () => {
        const on = lk ? await lk.toggleMic() : false;
        $("toggleMicBtn").classList.toggle("media-off", !on);
    });
    $("toggleCamBtn").addEventListener("click", async () => {
        const on = lk ? await lk.toggleCam() : false;
        $("toggleCamBtn").classList.toggle("media-off", !on);
    });
}

document.addEventListener("DOMContentLoaded", init);
