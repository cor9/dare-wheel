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
            return pattern.source.includes("min") ? value * 60 : value;
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
let myName = null;
let lkConnected = false; // media only joins once 2+ people are actually here —
                          // most sessions are one person alone in a lobby

const S = {
    revision: 0,
    phase: "lobby",       // lobby | play
    players: [],          // [{id,name}]
    turnIdx: 0,
    spinning: false,
    result: null,         // { index }
    spin: null,           // { index, at } for catching up mid-animation
    timer: null,          // { duration, at } for catching up mid-countdown
    wheelId: "balanced",
    rerolls: {}           // playerId -> count used
};

const timers = { interval: null, running: false };
let syncedRevision = -1;
let syncInterval = null;
const tiles = new Map(); // identity -> { name, stream, muted }

const me = () => p2p && p2p.me;
const isHost = () => p2p && p2p.isHost;
const myTurn = () => soloMode || (S.players.length && S.players[S.turnIdx].id === (me() && me().id));
const canSpin = () => S.phase === "play" && (myTurn() || isHost()) && !S.spinning && !S.result;
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

function spinToIndex(index, duration = SPIN_DURATION, at = Date.now()) {
    stopTimer();
    S.result = null;
    S.spin = { index, at };
    S.spinning = true;
    $("resultOverlay").classList.add("hidden");
    syncSpinUI();
    wheel.spinToItem(index, duration, true, SPIN_REVOLUTIONS, 1);
}

function handleRest(index) {
    if (!S.spinning || !S.spin || S.spin.index !== index) return;
    S.spinning = false;
    S.result = { index };
    showResult(index);
    syncSpinUI();
    if (!soloMode && isHost()) {
        S.revision++;
        sendGameState();
    }
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
    if (!S.result || !canActTimer() || timers.running) return;
    const seconds = extractTimerDuration(activeWheel().dares[S.result.index]);
    if (seconds) sendGameEvent({ kind: "timer", op: "start", duration: seconds, at: Date.now() });
}

function runTimer({ duration, at }) {
    stopTimer();
    S.timer = { duration, at };
    timers.running = true;
    const tick = () => {
        const remaining = duration - (Date.now() - at) / 1000;
        $("timerDisplay").textContent = remaining <= 0 ? "Time's up!" : fmt(remaining);
        if (remaining <= 0) {
            stopTimer();
            // Preserve the deadline so later snapshots still show expiry.
            S.timer = { duration, at };
            syncTimerBtn();
        }
    };
    timers.interval = setInterval(tick, 250);
    tick();
    syncTimerBtn();
}

function stopTimer() {
    if (timers.interval) clearInterval(timers.interval);
    timers.interval = null;
    timers.running = false;
    S.timer = null;
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
    lk && lk.sendToAll({ type: 'chat', name: who, text: "🙊 Re-roll toll: " + truth });

    $("truthModal").classList.add("hidden");

    const index = Math.floor(Math.random() * 25);
    sendGameEvent({ kind: "spin", index, turnIdx: S.turnIdx, rerollerId: me().id });
}

function acknowledge() {
    if (!S.result || !canActTimer()) return;
    if (soloMode) {
        $("resultOverlay").classList.add("hidden");
        advanceTurn();
        return;
    }
    sendGameEvent({ kind: "advance" });
}

function advanceTurn() {
    stopTimer();
    if (S.players.length) S.turnIdx = (S.turnIdx + 1) % S.players.length;
    S.result = null;
    S.spin = null;
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
    sendGameEvent({ kind: "switch", wheelId });
    $("wheelPicker").classList.add("hidden");
    if (!soloMode) {
        chat && chat.addMessage({ name: "", text: `🎡 Wheel switched to: ${activeWheel().name}`, system: true });
        lk && lk.sendToAll({ type: "chat", name: "", text: `Wheel switched to: ${activeWheel().name}` });
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
    if (!isHost() || S.phase !== "lobby") return;
    sendGameEvent({ kind: "start", players: p2p.roster.map((p) => ({ id: p.id, name: p.name })), wheelId: S.wheelId });
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
    $("waitingHostNote").classList.add("hidden");
    $("gameScreen").classList.remove("hidden");
    buildWheel();
    setTiles();
    renderChips();
    syncSpinUI();
    // Solo mode: players can still open their cam as a show
    $("soloCamBtn").classList.toggle("hidden", !soloMode);
}

let soloCamStream = null;

async function toggleSoloCam() {
    if (soloCamStream) {
        soloCamStream.getTracks().forEach((t) => t.stop());
        soloCamStream = null;
        $("videoGridGame").innerHTML = "";
        $("soloCamBtn").textContent = "📹 Cam";
        return;
    }
    try {
        soloCamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    } catch (err) {
        $("soloCamBtn").textContent = "📹 blocked";
        setTimeout(() => ($("soloCamBtn").textContent = "📹 Cam"), 2000);
        return;
    }
    addTile("solo-cam", "You", soloCamStream, true);
    $("soloCamBtn").textContent = "📹 On! (tap to hide)";
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
            S.turnIdx = 0;
            S.result = null;
            S.spin = null;
            stopTimer();
            enterGame();
            break;
        case "switch":
            S.wheelId = event.wheelId;
            buildWheel();
            break;
        case "spin":
            S.turnIdx = event.turnIdx;
            if (event.rerollerId) {
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
    sendGameEvent({ kind: "spin", index, turnIdx: S.turnIdx });
}

function sendGameEvent(event) {
    if (soloMode || isHost()) {
        applyGameEvent(event);
        if (!soloMode) {
            S.revision++;
            sendGameState();
        }
    } else if (lk) {
        lk.sendToAll({ type: "gameAction", revision: S.revision, event });
    }
}

function sendGameState(to) {
    if (!isHost() || !lk) return;
    // Copy now: LKMedia may queue this packet while the host is connecting.
    lk.sendToAll({ type: "gameState", to, game: JSON.parse(JSON.stringify(S)), rotation: wheel ? wheel.rotation : 0 });
}

function requestGameState() {
    if (!isHost() && lk && lk._connected && p2p && !p2p._destroyed) {
        lk.sendToAll({ type: "syncRequest", revision: syncedRevision });
    }
}

function receiveGameState(msg) {
    const state = msg.game;
    if (!state || !Number.isInteger(state.revision) || state.revision <= syncedRevision) return;
    const previousSpin = S.spin;
    const previousWheel = S.wheelId;
    const entering = S.phase !== "play" || !wheel;
    stopTimer();
    Object.assign(S, state);
    syncedRevision = state.revision;
    if (S.phase !== "play") return;

    if (entering) enterGame();
    else if (previousWheel !== S.wheelId) buildWheel();
    if (S.spinning && S.spin) {
        const remaining = Math.max(1, SPIN_DURATION - (Date.now() - S.spin.at));
        if (entering || previousWheel !== S.wheelId || !previousSpin || previousSpin.at !== S.spin.at) {
            spinToIndex(S.spin.index, remaining, S.spin.at);
        }
    } else {
        wheel.stop();
        wheel.rotation = msg.rotation;
        $("resultOverlay").classList.toggle("hidden", !S.result);
        if (S.result) showResult(S.result.index);
    }
    if (state.timer) runTimer(state.timer);
    syncSpinUI();
}

async function connect(asHost, code) {
    const name = $("nameInput").value.trim() || "Gooner " + Math.floor(Math.random() * 90 + 10);
    myName = name;
    $("connectStatus").textContent = "Connecting…";

    p2p = new P2PRoom({ prefix: ROOM_PREFIX, requireMedia: false, maxPeers: 5 }); // data channels only
    p2p.onRosterChange = (roster) => {
        renderLobby();
        ensureMediaConnection();
        if (isHost() && S.phase === "play") {
            // Admission updates the host's state; LiveKit-ready guests request it.
            let changed = false;
            roster.forEach((p) => {
                if (!S.players.some((sp) => sp.id === p.id)) {
                    S.players.push({ id: p.id, name: p.name });
                    changed = true;
                }
            });
            if (changed) { S.revision++; sendGameState(); }
            renderChips();
            syncSpinUI();
        }
    };
    p2p.onPeerGone = (id, who) => {
        chat && chat.addMessage({ name: "", text: `${who} left the room`, system: true });
        if (isHost() && S.phase === "play") {
            const idx = S.players.findIndex((p) => p.id === id);
            S.players = S.players.filter((p) => p.id !== id);
            if (idx > -1 && idx <= S.turnIdx && S.turnIdx > 0) S.turnIdx--;
            if (S.players.length) S.turnIdx = S.turnIdx % S.players.length;
            renderChips(); syncSpinUI();
            S.revision++;
            sendGameState();
        }
    };
    p2p.onHostGone = () => {
        alert("The host left — room closed.");
        location.hash = "";
        location.reload();
    };
    // LiveKit data carries chat + game sync; PeerJS stays for roster only.
    p2p.onAnyMessage = () => {};
    p2p.onError = (err) => { $("connectStatus").textContent = "⚠️ " + err.message; };

    try {
        if (asHost) {
            const link = await p2p.host(name, (() => { const c = localStorage.getItem("batorRoom:" + ROOM_PREFIX); return c ? { code: c } : {}; })());
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
            lk && lk.sendToAll({ type: 'chat', name: me().name, text });
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

    // Only the host commits game actions. Snapshots are safe to receive again
    // after a delayed join/reconnect and never restart the current turn.
    lk.onData = (fromId, msg) => {
        if (!msg || typeof msg !== "object") return;
        if (msg.type === "chat") {
            chat && chat.addMessage({ name: msg.name, text: msg.text, self: fromId === me().id });
            return;
        }
        if (!isHost()) {
            if (fromId === p2p.hostId && msg.type === "gameState" && (!msg.to || msg.to === me().id)) receiveGameState(msg);
            return;
        }
        if (!p2p.roster.some((p) => p.id === fromId)) return;
        const actionRevision = S.revision;
        // Background tabs can suspend the wheel's animation callback. Finish
        // elapsed spins from the clock too, so guests are not blocked by it.
        if (S.spinning && S.spin && Date.now() >= S.spin.at + SPIN_DURATION) {
            wheel.stop();
            wheel.rotation = 360 - (S.spin.index + 0.5) * 360 / activeWheel().dares.length;
            handleRest(S.spin.index);
        }
        if (msg.type === "syncRequest") {
            if (msg.revision !== S.revision) sendGameState(fromId);
            return;
        }
        if (msg.type !== "gameAction" || !msg.event) return;
        const event = msg.event;
        const actor = (S.players[S.turnIdx] || {}).id === fromId;
        if (msg.revision !== actionRevision || S.phase !== "play" || !actor || S.spinning) {
            sendGameState(fromId);
            return;
        }
        if (event.kind === "advance" && S.result) sendGameEvent({ kind: "advance" });
        if (event.kind === "timer" && event.op === "start" && S.result && !timers.running) startTimerNet();
        if (event.kind === "spin" && Number.isInteger(event.index) && event.index >= 0 && event.index < activeWheel().dares.length) {
            const reroll = event.rerollerId === fromId && S.result && (S.rerolls[fromId] || 0) < MAX_REROLLS;
            if (!S.result || reroll) sendGameEvent({ kind: "spin", index: event.index, turnIdx: S.turnIdx, ...(reroll ? { rerollerId: fromId } : {}) });
        }
    };
    lk.onConnected = () => {
        if (isHost()) sendGameState();
        else requestGameState();
    };
    clearInterval(syncInterval);
    // A start broadcast is not replayed for someone who joins LiveKit later.
    // Also recover missed turns after a mobile tab sleeps or the SFU reconnects.
    syncInterval = setInterval(requestGameState, 3000);

    // Media only connects once a second person is actually in the room —
    // connects right away here if we joined an already-occupied room.
    ensureMediaConnection();

    soloMode = false;
    $("mediaBar").classList.remove("hidden");
    if (isHost()) $("startGameBtn").classList.remove("hidden");
    else $("waitingHostNote").classList.toggle("hidden", S.phase === "play");
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
    syncCamPlaceholder();
}

/** Cams (and the media connection they ride on) only join once a second
 *  person actually shows up — most sessions are one person alone in a
 *  lobby, and there's no point burning media-server resources for that. */
function ensureMediaConnection() {
    if (!lk || !p2p) return;
    const has2 = p2p.roster.length >= 2;
    if (has2 && !lkConnected) {
        lkConnected = true;
        lk.connect(p2p.hostId, p2p.me.id, myName).catch((err) => lk.onError(err));
    } else if (!has2 && lkConnected) {
        lkConnected = false;
        lk.disconnect();
    }
    syncCamPlaceholder();
}

function syncCamPlaceholder() {
    const grid = activeGrid();
    if (!grid) return;
    let note = grid.querySelector(".cam-wait-note");
    if (!lkConnected && tiles.size === 0) {
        if (!note) {
            note = document.createElement("p");
            note.className = "muted cam-wait-note";
            note.textContent = "📷 Cams turn on once a friend joins";
            grid.appendChild(note);
        }
    } else if (note) {
        note.remove();
    }
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
    syncCamPlaceholder();
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
    $("soloCamBtn").addEventListener("click", toggleSoloCam);

    $("hostBtn").addEventListener("click", () => connect(true));
    $("joinBtn").addEventListener("click", () => {
        const code = $("joinCodeInput").value.trim().toLowerCase();
        if (code.length !== 6) { $("connectStatus").textContent = "Enter the 6-character room code."; return; }
        connect(false, code);
    });

    const queryCode = new URLSearchParams(location.search).get("join");
    const hashMatch = location.hash.match(/#join=([a-z0-9]{6})/i);
    const joinCode = queryCode || (hashMatch && hashMatch[1]);
    if (joinCode && /^[a-z0-9]{6}$/i.test(joinCode)) {
        $("joinCodeInput").value = joinCode.toLowerCase();
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
        try { await navigator.clipboard.writeText(url); alert("Link copied — text it to your buds!"); } catch (_) {} });


    // Save this room as MY permanent link (device-local)
    $("saveRoomBtn") && $("saveRoomBtn").addEventListener("click", () => {
        (() => {
                const cur = localStorage.getItem("batorRoom:" + ROOM_PREFIX) || p2p.roomCode;
                let custom = prompt("Your permanent room name (letters/numbers/dash, 3-16):", cur);
                if (custom === null) custom = cur;
                custom = custom.trim().toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 16);
                const code = custom.length >= 3 ? custom : cur;
                localStorage.setItem("batorRoom:" + ROOM_PREFIX, code);
            })();
        $("saveRoomBtn").textContent = "🔖 Saved! This is YOUR link now";
        $("saveRoomBtn").style.borderColor = "#3dff73";
        setTimeout(() => { $("saveRoomBtn").textContent = "🔖 Permanent Link"; }, 2500);
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
