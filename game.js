/* =========================================================================
   LOW TIDE — game engine
   State, routing, triggers, the call, the passcode, the case board, endings.
   ========================================================================= */

const SAVE_KEY = "low-tide-v1";
const END_KEY = "low-tide-endings";
const TOTAL_CLUES = 12;

function freshState() {
  return {
    act: 1,
    clock: "1:04",
    battery: 41,
    seenApps: [],
    clues: [],
    flags: { julesRead: false, hiddenSeen: false, hiddenNote: false, memoPlayed: false, callShown: false },
    pin: "",
    pinAttempts: 0,
    pinError: "",
    recipients: [],
    attachments: { photo: false, memo: false, locker: false },
    album: "recents",
    phoneTab: "recents",
    openVm: null,
    mapPin: null,
    surfPage: null,
    track: 0,
    musicPlaying: false,
    memoPlaying: null,
    memoProgress: 0,
    wallZoom: 1,
    wallFrom: "lock",
    notifs: [],
    route: { name: "home" },
    ending: null
  };
}

let state = freshState();
loadState();

const $ = (id) => document.getElementById(id);
const screenContent = $("screenContent");

let lastRouteKey = "";
let memoTimer = null;
let callTick = null;
let callAuto = null;
let audioCtx = null;
let rainGain = null;
let soundOn = false;

const PHOTO_CLUES = {
  p_van: "van",
  p_boathouse: "boathouse",
  p_1147: "photo1147",
  p_locker: "locker"
};

const NIGHT_LOG = {
  1: "A phone in drawer 4. Battery 41%. It won’t stop buzzing.",
  2: "The phone locked itself at 2:14. Dana knows someone at the desk has it.",
  3: "Hidden album restored at 2:26. The 11:47 photograph. Low tide at 4:58."
};

/* =========================================================================
   SAVE / LOAD
   ========================================================================= */

function save() {
  try {
    const keys = [
      "act", "clock", "battery", "seenApps", "clues", "flags", "pinAttempts",
      "recipients", "attachments", "album", "phoneTab", "openVm", "mapPin",
      "surfPage", "track", "musicPlaying", "wallZoom", "notifs", "route"
    ];
    const data = {};
    keys.forEach((k) => { data[k] = state[k]; });
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) { /* storage blocked — the night still plays */ }
}

function loadState() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); } catch (e) { raw = null; }
  if (!raw || typeof raw !== "object") return;

  const s = freshState();
  Object.assign(s, raw);
  s.flags = Object.assign(freshState().flags, raw.flags || {});
  s.attachments = Object.assign(freshState().attachments, raw.attachments || {});
  if (!Array.isArray(s.clues)) s.clues = [];
  if (!Array.isArray(s.seenApps)) s.seenApps = [];
  if (!Array.isArray(s.recipients)) s.recipients = [];
  if (!Array.isArray(s.notifs)) s.notifs = [];
  if (!s.route || typeof s.route !== "object") s.route = { name: "home" };

  s.memoPlaying = null;
  s.memoProgress = 0;
  s.pin = "";
  s.pinError = "";
  s.ending = null;

  if (["call", "send", "ending", "hidden"].indexOf(s.route.name) >= 0) s.route = { name: "home" };
  if (s.act === 2 && ["lock", "pin", "wallpaper"].indexOf(s.route.name) < 0) s.route = { name: "lock" };
  if (s.act >= 3 && s.clock === "2:14") s.clock = "2:26";

  state = s;
}

/* =========================================================================
   BOOT + WIRING
   ========================================================================= */

function boot() {
  initRain();

  const soundBtn = $("soundBtn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundOn = !soundOn;
      soundBtn.setAttribute("aria-pressed", String(soundOn));
      setSound(soundOn);
      toast(soundOn ? "Ambience on." : "Ambience muted.");
    });
  }

  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKey);

  window.addEventListener("beforeunload", save);
  document.addEventListener("visibilitychange", () => { if (document.hidden) save(); });

  try {
    if (localStorage.getItem(SAVE_KEY)) $("intro").hidden = true;
  } catch (e) { /* ignore */ }

  render();
}

function onDocClick(e) {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  if (el.disabled) return;
  handle(el.dataset.action, el);
}

function onKey(e) {
  if (e.key === "Escape") {
    if (!$("ending").hidden) return;
    if (!$("board").hidden) { closeBoard(); return; }
    if (!$("modal").hidden) { closeModal(); return; }
    if (state.route.name !== "home" && state.route.name !== "lock") goBack();
    return;
  }
  if (state.route.name === "pin" && state.act === 2) {
    if (/^[0-9]$/.test(e.key)) { pinDigit(e.key); }
    else if (e.key === "Backspace") { e.preventDefault(); delPin(); }
  }
}

/* =========================================================================
   RENDER
   ========================================================================= */

function routeKey(r) {
  return r.name + (r.id ? ":" + r.id : "") + (r.name === "app" && r.id === "surf" ? ":" + (state.surfPage || "") : "");
}

function render() {
  const r = state.route || { name: "home" };
  const key = routeKey(r);
  const keep = key === lastRouteKey;
  const y = screenContent.scrollTop;

  screenContent.innerHTML = renderContent(r);
  screenContent.scrollTop = keep ? y : 0;
  if (!keep && r.name === "thread") screenContent.scrollTop = screenContent.scrollHeight;
  lastRouteKey = key;

  const scr = $("screen");
  scr.classList.toggle("is-locked", r.name === "lock" || r.name === "pin");
  scr.classList.toggle("is-call", r.name === "call");
  scr.classList.toggle("is-dim", state.battery <= 20);

  renderStatus();
  renderChrome();
  postRender(r);
  save();
}

function renderContent(r) {
  switch (r.name) {
    case "home": return viewHome();
    case "lock": return viewLock();
    case "pin": return viewPin();
    case "wallpaper": return viewWallpaper();
    case "call": return viewCall();
    case "hidden": return viewHidden();
    case "send": return viewSend();
    case "thread": return viewThread(threadById(r.id));
    case "photo": return viewPhoto(photoById(r.id));
    case "note": return viewNote(noteById(r.id));
    case "memo": return viewMemo(memoById(r.id));
    case "file": return viewFile(fileById(r.id));
    case "web": {
      state.surfPage = r.id || null;
      return viewSurf();
    }
    case "app":
      switch (r.id) {
        case "messages": return viewMessages();
        case "photos": return viewPhotos();
        case "notes": return viewNotes();
        case "phone": return viewPhoneApp();
        case "surf": return viewSurf();
        case "maps": return viewMaps();
        case "memos": return viewMemos();
        case "weather": return viewWeather();
        case "clock": return viewClock();
        case "music": return viewMusic();
        case "files": return viewFiles();
        case "settings": return viewSettings();
        case "recipes": return viewRecipes();
        default: return viewHome();
      }
    default: return viewHome();
  }
}

function renderStatus() {
  const sb = $("statusbar");
  if (!sb) return;
  sb.innerHTML =
    '<span class="sb__time">' + esc(state.clock) + '</span>' +
    '<span class="sb__right">' +
      '<svg viewBox="0 0 18 12" aria-hidden="true" focusable="false">' +
        '<path d="M1 11h2V8H1zM5 11h2V6H5zM9 11h2V3.5H9zM13 11h2V1h-2z" fill="currentColor" stroke="none"/>' +
      '</svg>' +
      '<span class="battery' + (state.battery <= 20 ? " is-low" : "") + '">' +
        '<span class="battery__fill" style="width:' + Math.max(4, Math.min(100, state.battery)) + '%"></span>' +
      '</span>' +
    '</span>';
}

function renderChrome() {
  const t = $("caseTime");
  if (t) t.textContent = state.clock + " AM";

  const c = $("clueCount");
  if (c) c.textContent = state.clues.length + "/12";

  const log = $("nightLog");
  if (log) {
    if (state.clock === "4:41") {
      log.textContent = "Everything you can prove is in a message now. The rest is the tide.";
    } else {
      log.textContent = (state.clock + " — " + (NIGHT_LOG[state.act] || NIGHT_LOG[1]));
    }
  }
}

function postRender(r) {
  if (r.name === "send") {
    const go = document.querySelector(".send__go");
    if (go) go.textContent = state.recipients.length ? "Send" : "Put the phone back";
  }
}

/* =========================================================================
   ACTIONS
   ========================================================================= */

function handle(action, el) {
  const ds = el.dataset;
  switch (action) {
    case "start": startGame(); break;
    case "help": openHelp(); break;
    case "close-modal": closeModal(); break;
    case "reset": resetGame(); break;
    case "board": openBoard(); break;
    case "close-board": closeBoard(); break;
    case "ending-board": closeEnding(true); break;
    case "close-ending": closeEnding(false); break;
    case "file-case":
      if (state.act >= 3) { closeBoard(); openSend(); }
      else toast("Not yet. You don’t have enough to file.");
      break;

    case "app": openApp(ds.app); break;
    case "back": goBack(); break;
    case "thread": openThread(ds.id); break;
    case "photo": openPhoto(ds.id); break;
    case "locked-photo": toast("That photo never finished uploading. It isn’t in Recents."); break;
    case "broken": toast("Upload failed at 11:47 PM. Storage is full."); break;
    case "album": state.album = ds.id; render(); break;
    case "hidden-note": openHiddenNote(); break;
    case "note": openNote(ds.id); break;
    case "play-vm": state.openVm = state.openVm === ds.id ? null : ds.id; render(); break;
    case "phone-tab": state.phoneTab = ds.tab; render(); break;
    case "web": openWeb(ds.page); break;
    case "surf-home": state.surfPage = null; render(); break;
    case "map-pin": state.mapPin = ds.id; if (ds.id === "pier") addClue("boathouse"); render(); break;
    case "open-map": state.mapPin = ds.pin || "pier"; state.route = { name: "app", id: "maps" }; render(); break;
    case "memo": openMemo(ds.id); break;
    case "play-memo": playMemo(ds.id); break;
    case "music-toggle": state.musicPlaying = !state.musicPlaying; ping(state.musicPlaying ? 520 : 360); render(); break;
    case "track": state.track = Number(ds.i) || 0; state.musicPlaying = true; render(); break;
    case "file": openFile(ds.id); break;
    case "findmy": addClue("findmy"); toast("Last seen at Pier 9 · 11:47 PM."); render(); break;
    case "recipe": toast("Saved for later. Miso approves."); break;

    case "send-open": openSend(); break;
    case "send": finishSend(); break;
    case "toggle-recipient": toggleRecipient(ds.id); break;
    case "toggle-attachment": toggleAttachment(ds.id, ds.available === "1"); break;

    case "pin-open": openPin(); break;
    case "pin": pinDigit(ds.d); break;
    case "pin-del": delPin(); break;
    case "emergency": toast("Emergency calls are disabled on this phone."); break;
    case "wallpaper": openWallpaper(); break;
    case "zoom-in": state.wallZoom = Math.min(2.4, (state.wallZoom || 1) + 0.25); render(); break;
    case "zoom-out": state.wallZoom = Math.max(1, (state.wallZoom || 1) - 0.25); render(); break;

    case "call-accept": answerCall(); break;
    case "call-decline": declineCall(); break;
    case "call-end": endCall(); break;

    case "home": homebar(); break;
    case "noop": break;
    default: break;
  }
}

/* =========================================================================
   NAVIGATION
   ========================================================================= */

function startGame() {
  const intro = $("intro");
  if (!intro) return;
  intro.classList.add("is-closing");
  setTimeout(() => { intro.hidden = true; }, 640);
  setTimeout(() => {
    if (state.act === 1 && !state.clues.length) toast("Start with Messages. Jules is still texting.");
  }, 1000);
  save();
}

function homebar() {
  if (state.route.name === "call") return;
  stopMemo();
  if (state.act === 2) { state.route = { name: "lock" }; render(); return; }
  if (state.route.name === "home") return;
  state.route = { name: "home" };
  render();
}

function openApp(id) {
  if (state.act === 2) { state.route = { name: "lock" }; render(); return; }
  if (!appById(id)) return;
  stopMemo();
  if (!state.seenApps.includes(id)) {
    state.seenApps.push(id);
    state.battery = Math.max(6, state.battery - 2);
  }
  if (id === "surf") state.surfPage = null;
  state.route = { name: "app", id: id };
  render();
  if (state.seenApps.length >= 6) setTimeout(maybeTriggerCall, 900);
}

function goBack() {
  stopMemo();
  const r = state.route;
  switch (r.name) {
    case "app": state.route = { name: "home" }; break;
    case "thread": state.route = { name: "app", id: "messages" }; break;
    case "photo": state.route = state.photoReturn || { name: "app", id: "photos" }; state.photoReturn = null; break;
    case "note": state.route = { name: "app", id: "notes" }; break;
    case "memo": state.route = { name: "app", id: "memos" }; break;
    case "file": state.route = { name: "app", id: "files" }; break;
    case "web":
      state.route = { name: "app", id: "surf" };
      state.surfPage = null;
      break;
    case "wallpaper":
      state.route = { name: state.wallFrom || "lock" };
      break;
    case "pin": state.route = { name: "lock" }; break;
    case "hidden": state.route = { name: "home" }; break;
    case "send": state.route = { name: "home" }; break;
    case "lock": return;
    default: state.route = { name: "home" }; break;
  }
  render();
}

function openThread(id) {
  stopMemo();
  if (state.act === 2) return;
  state.route = { name: "thread", id: id };
  if (id === "jules") {
    state.flags.julesRead = true;
    addClue("pier");
  }
  render();
}

function openPhoto(id) {
  const p = photoById(id);
  if (!p) return;
  state.photoReturn = Object.assign({}, state.route);
  state.route = { name: "photo", id: id };
  const c = PHOTO_CLUES[id];
  if (c) addClue(c);
  render();
}

function openNote(id) {
  const n = noteById(id);
  if (!n) return;
  state.route = { name: "note", id: id };
  if (n.clue) addClue(n.clue);
  render();
}

function openMemo(id) {
  const m = memoById(id);
  if (!m) return;
  stopMemo();
  state.route = { name: "memo", id: id };
  render();
}

function openFile(id) {
  const f = fileById(id);
  if (!f) return;
  state.route = { name: "file", id: id };
  if (id === "insurance") addClue("danaBoat");
  if (f.clue) addClue(f.clue);
  render();
}

function openWeb(page) {
  if (!CASE.web.pages[page]) return;
  state.route = { name: "app", id: "surf" };
  state.surfPage = page;
  if (page === "registry") addClue("danaBoat");
  render();
}

function openHidden() {
  state.route = { name: "hidden" };
  render();
  state.flags.hiddenSeen = true;
  save();
}

function openHiddenNote() {
  state.flags.hiddenNote = true;
  addClue("lockerCode");
  toast("A note, in her handwriting.");
  render();
}

function openPin() {
  state.route = { name: "pin" };
  state.pin = "";
  state.pinError = "";
  render();
}

function openWallpaper() {
  state.wallZoom = 1;
  state.wallFrom = state.route.name === "pin" ? "pin" : "lock";
  state.route = { name: "wallpaper" };
  render();
}

/* =========================================================================
   CLUES
   ========================================================================= */

function addClue(id) {
  if (!id || state.clues.indexOf(id) >= 0) return;
  const c = clueById(id);
  if (!c) return;
  state.clues.push(id);
  ping(720);
  toast("Case note " + c.n + " · " + c.label);
  renderChrome();
  if ($("board") && !$("board").hidden) renderBoard();
  save();
}

/* =========================================================================
   VOICE MEMOS
   ========================================================================= */

function playMemo(id) {
  const m = memoById(id);
  if (!m) return;
  if (state.memoPlaying === id) {
    stopMemo();
    render();
    return;
  }
  stopMemo();
  state.memoPlaying = id;
  state.memoProgress = 0;
  render();

  memoTimer = setInterval(() => {
    state.memoProgress = Math.min(100, state.memoProgress + 4);
    paintMemo();
    if (state.memoProgress >= 100) finishMemo(m);
  }, 200);
}

function paintMemo() {
  const m = memoById(state.memoPlaying);
  if (!m) return;
  const bar = document.querySelector(".memo__scrub span");
  if (bar) bar.style.setProperty("--p", state.memoProgress + "%");
  const times = document.querySelectorAll(".memo__time");
  if (times[0]) times[0].textContent = "0:" + String(Math.floor(m.len * state.memoProgress / 100)).padStart(2, "0");
}

function stopMemo() {
  if (memoTimer) { clearInterval(memoTimer); memoTimer = null; }
  state.memoPlaying = null;
  state.memoProgress = 0;
}

function finishMemo(m) {
  if (memoTimer) { clearInterval(memoTimer); memoTimer = null; }
  state.memoPlaying = null;
  state.memoProgress = 0;
  if (m.clue) addClue(m.clue);
  if (m.id === "m1") {
    state.flags.memoPlayed = true;
    setTimeout(maybeTriggerCall, 1200);
  }
  render();
}

/* =========================================================================
   THE CALL
   ========================================================================= */

function maybeTriggerCall() {
  if (state.act !== 1 || state.flags.callShown) return;
  if (state.route.name === "call") return;
  triggerCall();
}

function triggerCall() {
  if (state.act !== 1 || state.flags.callShown) return;
  state.flags.callShown = true;
  stopMemo();
  state.route = { name: "call" };
  state.callPhase = "incoming";
  state.callLines = 0;
  state.callTimer = 0;
  render();
  ringSound();
  notify({ title: "Incoming call", body: "Dana · Vesper Motel", icon: "phone" });
  callAuto = setTimeout(() => {
    if (state.route.name === "call" && state.callPhase === "incoming") missedCall();
  }, 30000);
}

function answerCall() {
  if (state.route.name !== "call" || state.callPhase !== "incoming") return;
  if (callAuto) { clearTimeout(callAuto); callAuto = null; }
  state.callPhase = "active";
  state.callLines = 1;
  state.callTimer = 0;
  addClue("call");
  render();
  callTick = setInterval(tickCall, 1000);
}

function callLinesHTML(n) {
  return CALL_LINES.slice(0, n).map((l) => {
    if (l.sfx) return '<p class="callline callline--sfx">[ ' + esc(l.sfx) + ' ]</p>';
    return '<div class="callline ' + (l.who === "Dana" ? "callline--dana" : "") + '"><b>' + esc(l.who) + '</b>' + esc(l.text) + '</div>';
  }).join("");
}

function tickCall() {
  state.callTimer = (state.callTimer || 0) + 1;
  const t = state.callTimer;

  const timerEl = document.querySelector(".callview__timer");
  if (timerEl) timerEl.textContent = formatCallTime(t);

  let nth = state.callLines || 1;
  if (t >= 2 && nth < 2) nth = 2;
  if (t >= 4 && nth < 3) nth = 3;
  if (t >= 7 && nth < 4) nth = 4;
  if (t >= 9 && nth < 5) nth = 5;
  if (t >= 12 && nth < 6) nth = 6;
  if (t >= 15 && nth < 7) nth = 7;
  if (t >= 18 && nth < 8) nth = 8;

  if (nth > state.callLines) {
    state.callLines = nth;
    const box = document.querySelector(".callview__lines");
    if (box) box.innerHTML = callLinesHTML(nth);
  }
  if (t >= 21) endCall();
}

function declineCall() {
  if (state.route.name !== "call") return;
  if (callAuto) { clearTimeout(callAuto); callAuto = null; }
  addClue("call");
  toast("Call declined.");
  setTimeout(() => { if (state.act === 1) remoteLock(); }, 1200);
}

function missedCall() {
  addClue("call");
  toast("Missed call · Dana");
  remoteLock();
}

function endCall() {
  if (callTick) { clearInterval(callTick); callTick = null; }
  if (callAuto) { clearTimeout(callAuto); callAuto = null; }
  if (state.act === 1) remoteLock();
}

function remoteLock() {
  if (callTick) { clearInterval(callTick); callTick = null; }
  if (callAuto) { clearTimeout(callAuto); callAuto = null; }
  stopMemo();

  state.act = 2;
  state.clock = "2:14";
  state.route = { name: "lock" };
  state.pin = "";
  state.pinAttempts = 0;
  state.pinError = "";
  state.notifs = (state.notifs || []).concat([
    { title: "Dana (Vesper Motel)", time: "2:14 AM", body: "Leave it in the drawer. I’ll know if you don’t.", alert: true }
  ]);

  glitchScreen();
  notify({ title: "Dana (Vesper Motel)", body: "Leave it in the drawer. I’ll know if you don’t.", icon: "lock" });
  render();
}

function glitchScreen() {
  const scr = $("screen");
  if (!scr) return;
  scr.classList.remove("is-glitching");
  void scr.offsetWidth;
  scr.classList.add("is-glitching");
  setTimeout(() => scr.classList.remove("is-glitching"), 950);
}

/* =========================================================================
   PASSCODE
   ========================================================================= */

function pinDigit(d) {
  if (state.act !== 2 || state.route.name !== "pin") return;
  if (!/^[0-9]$/.test(String(d))) return;
  if ((state.pin || "").length >= 4) return;
  state.pin = (state.pin || "") + d;
  state.pinError = "";
  render();
  if (state.pin.length === 4) setTimeout(checkPin, 300);
}

function delPin() {
  if (state.route.name !== "pin") return;
  state.pin = (state.pin || "").slice(0, -1);
  state.pinError = "";
  render();
}

function checkPin() {
  if (state.route.name !== "pin") return;
  if (state.pin === "0427") {
    unlock();
    return;
  }
  state.pinAttempts += 1;
  state.pin = "";
  state.pinError =
    state.pinAttempts >= 8
      ? "Phone disabled. Use Emergency."
      : "Wrong passcode. " + Math.max(0, 8 - state.pinAttempts) + " attempts before erase.";
  render();
  const pinEl = document.querySelector(".pin");
  if (pinEl) {
    pinEl.classList.add("is-wrong");
    setTimeout(() => pinEl.classList.remove("is-wrong"), 460);
  }
  toast("Wrong passcode · " + Math.max(0, 8 - state.pinAttempts) + " attempts left");
}

function unlock() {
  state.act = 3;
  state.clock = "2:26";
  state.pin = "";
  state.pinError = "";
  state.pinAttempts = 0;
  state.battery = Math.max(6, state.battery - 1);
  glitchScreen();
  notify({ title: "iCloud", body: "2 photos and 1 note restored to Hidden.", icon: "photos" });
  toast("Hidden album restored.");
  openHidden();
}

/* =========================================================================
   SEND SHEET
   ========================================================================= */

function openSend() {
  if (state.act < 3) { toast("Not yet. Find out what she was doing at the pier."); return; }
  state.route = { name: "send" };
  render();
}

function toggleRecipient(id) {
  const i = state.recipients.indexOf(id);
  if (i >= 0) state.recipients.splice(i, 1);
  else state.recipients.push(id);
  render();
}

function toggleAttachment(id, available) {
  if (!available) return;
  state.attachments[id] = !state.attachments[id];
  render();
}

function computeEnding() {
  const rec = state.recipients || [];
  const att = state.attachments || {};
  if (rec.indexOf("dana") >= 0) return "undertow";
  if (!rec.length) return "lowtide";
  const jules = rec.indexOf("jules") >= 0;
  const police = rec.indexOf("police") >= 0;
  if (police && !jules) return "statement";
  if (jules && !police) return "longway";
  return att.photo && att.memo && att.locker ? "dryland" : "static";
}

function finishSend() {
  if (state.route.name !== "send") return;
  if (!state.recipients.length) { showEnding("lowtide"); return; }
  showEnding(computeEnding());
}

/* =========================================================================
   ENDINGS
   ========================================================================= */

function getEndingsFound() {
  try {
    const arr = JSON.parse(localStorage.getItem(END_KEY) || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch (e) { return []; }
}

function showEnding(id) {
  const E = ENDINGS[id];
  if (!E) return;

  stopMemo();
  if (callTick) { clearInterval(callTick); callTick = null; }
  if (callAuto) { clearTimeout(callAuto); callAuto = null; }
  state.musicPlaying = false;

  const found = getEndingsFound();
  if (found.indexOf(id) < 0) {
    found.push(id);
    try { localStorage.setItem(END_KEY, JSON.stringify(found)); } catch (e) { /* ignore */ }
  }

  state.ending = id;
  state.clock = "4:41";
  state.route = { name: "home" };
  render();

  const perfect = id === "dryland" && state.clues.length === TOTAL_CLUES;

  const body = E.body.map((p) => '<p>' + p + '</p>').join("");

  $("endingCard").innerHTML =
    '<p class="end__kicker">Low Tide · case file</p>' +
    '<div class="end__stamp' + (E.cold ? " end__stamp--cold" : "") + '">' + esc(E.stamp) + '</div>' +
    '<h2 class="end__title" id="endingTitle">' + esc(E.title) + '</h2>' +
    '<p class="end__lede">' + esc(E.lede) + '</p>' +
    '<div class="end__body">' + body + '</div>' +
    '<blockquote class="end__quote">“' + esc(E.quote.text) + '”<cite>— ' + esc(E.quote.cite) + '</cite></blockquote>' +
    '<dl class="end__stats">' +
      '<div class="end__stat"><dt>Clues</dt><dd>' + state.clues.length + '/12</dd></div>' +
      '<div class="end__stat"><dt>Apps opened</dt><dd>' + state.seenApps.length + '</dd></div>' +
      '<div class="end__stat"><dt>Time</dt><dd>4:41 AM</dd></div>' +
      '<div class="end__stat"><dt>Endings found</dt><dd>' + found.length + '/6</dd></div>' +
    '</dl>' +
    (perfect ? '<p class="end__perfect">★ Perfect case — all twelve clues, and nothing left on the board.</p>' : '') +
    '<div class="end__actions">' +
      '<button class="btn btn--ink" type="button" data-action="close-ending">Back to the desk</button>' +
      '<button class="btn" type="button" data-action="ending-board" style="color:#3a3528;border:1px solid rgba(80,65,40,.3);background:rgba(255,255,255,.4)">Read the case notes</button>' +
      '<button class="linkbtn linkbtn--danger" type="button" data-action="reset">Start the night over</button>' +
    '</div>' +
    '<p class="end__teaser">Six ways this night ends. You have found ' + found.length + '.</p>';

  $("ending").hidden = false;
  syncModalClass();
  addClueEndingCheck();
  save();
}

function addClueEndingCheck() {
  /* reserved: keeps the perfect-case stamp honest if clues change */
}

function closeEnding(toBoard) {
  $("ending").hidden = true;
  state.ending = null;
  state.route = { name: "home" };
  render();
  syncModalClass();
  if (toBoard) openBoard();
}

/* =========================================================================
   CASE BOARD
   ========================================================================= */

function openBoard() {
  const board = $("board");
  if (!board) return;
  board.hidden = false;
  renderBoard();
  syncModalClass();
}

function closeBoard() {
  const board = $("board");
  if (!board) return;
  board.hidden = true;
  syncModalClass();
}

function renderBoard() {
  const boardMap = $("boardMap");
  const strings = $("boardStrings");
  if (!boardMap || !strings) return;

  const count = $("boardCount");
  if (count) count.textContent = state.clues.length + " of " + TOTAL_CLUES;

  Array.prototype.slice.call(boardMap.querySelectorAll(".clue")).forEach((n) => n.remove());

  CLUES.forEach((c) => {
    const found = state.clues.indexOf(c.id) >= 0;
    const el = document.createElement("div");
    el.className = "clue" + (found ? "" : " clue--empty");
    el.style.setProperty("--x", c.x);
    el.style.setProperty("--y", c.y);
    el.style.setProperty("--rot", (c.rot || 0) + "deg");
    el.innerHTML =
      '<span class="clue__num">' + String(c.n).padStart(2, "0") + '</span>' +
      '<span class="clue__label">' + esc(found ? c.label : "Unfound") + '</span>' +
      '<span class="clue__detail">' + esc(found ? c.detail : "Turn over another app.") + '</span>';
    boardMap.appendChild(el);
  });

  const centers = {};
  CLUES.forEach((c) => { centers[c.id] = { x: c.x + 10.25, y: c.y + 11.5 }; });

  strings.innerHTML = CLUE_PAIRS.filter(([a, b]) =>
    state.clues.indexOf(a) >= 0 && state.clues.indexOf(b) >= 0
  ).map(([a, b]) => {
    const p = centers[a];
    const q = centers[b];
    return '<line x1="' + p.x + '" y1="' + p.y + '" x2="' + q.x + '" y2="' + q.y + '" />';
  }).join("");

  const hint = $("boardHint");
  if (hint) {
    if (state.clues.length >= TOTAL_CLUES) hint.textContent = "All twelve. Enough to hang a case on.";
    else if (state.clues.length >= 9) hint.textContent = "One or two gaps left. The phone keeps its own receipts.";
    else if (state.clues.length >= 4) hint.textContent = "You have a thread. Pull it.";
    else hint.textContent = "Turn over the obvious things first. People leave more behind than they mean to.";
  }

  const fileBtn = $("fileCaseBtn");
  if (fileBtn) {
    fileBtn.hidden = state.act < 3;
    fileBtn.textContent = state.act >= 3 ? "Send what you have →" : "File the case →";
  }
}

/* =========================================================================
   MODAL / HELP
   ========================================================================= */

function openHelp() {
  $("modalEyebrow").textContent = "How to play";
  $("modalTitle").textContent = "Snoop carefully";
  $("modalBody").innerHTML =
    '<p><strong>The phone is unlocked for now.</strong> Read the messages, look at the photographs, listen to the memos. Every app has something in it.</p>' +
    '<p><strong>Clues land on the case board.</strong> Open it from the desk at any time — red string joins the parts that touch.</p>' +
    '<p><strong>The night has an order.</strong> Things will happen whether you are ready or not. You cannot rewind, but you can start over.</p>' +
    '<p><strong>When you know enough, act.</strong> At the end you will choose who to tell, and what to send with it. Where you send it decides how the night ends.</p>' +
    '<p style="color:#7c705d">Press <kbd>Esc</kbd> to close anything. The sound toggle is in the top right and starts muted.</p>';
  $("modal").hidden = false;
  syncModalClass();
}

function closeModal() {
  $("modal").hidden = true;
  syncModalClass();
}

function resetGame() {
  if (!window.confirm("Start the night over? Progress on this case will be lost.")) return;
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
  window.location.reload();
}

function syncModalClass() {
  const boardOpen = $("board") && !$("board").hidden;
  const modalOpen = $("modal") && !$("modal").hidden;
  const endingOpen = $("ending") && !$("ending").hidden;
  document.body.classList.toggle("is-modal", !!(boardOpen || modalOpen || endingOpen));
}

/* =========================================================================
   TOASTS + BANNERS
   ========================================================================= */

function toast(text) {
  const host = $("toasts");
  if (!host) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = '<span class="toast__dot"></span><span>' + esc(text) + '</span>';
  host.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-out");
    setTimeout(() => el.remove(), 340);
  }, 3400);
}

function notify(opts) {
  const host = $("banners");
  if (!host) return;
  while (host.children.length >= 2) host.removeChild(host.firstElementChild);

  const el = document.createElement("div");
  el.className = "banner";
  el.innerHTML =
    '<span class="banner__icon">' + icon(opts.icon || "info") + '</span>' +
    '<span class="banner__main">' +
      '<span class="banner__title"><span>' + esc(opts.title || "") + '</span><span>now</span></span>' +
      '<span class="banner__body">' + esc(opts.body || "") + '</span>' +
    '</span>';
  host.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-out");
    setTimeout(() => el.remove(), 400);
  }, 5200);
}

/* =========================================================================
   AUDIO (off by default)
   ========================================================================= */

function initAudio() {
  if (audioCtx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  try { audioCtx = new AC(); } catch (e) { audioCtx = null; return; }

  const len = Math.floor(audioCtx.sampleRate * 3);
  const buffer = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.2;
  }

  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  const lp = audioCtx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1100;

  const hp = audioCtx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 160;

  rainGain = audioCtx.createGain();
  rainGain.gain.value = 0;

  src.connect(lp);
  lp.connect(hp);
  hp.connect(rainGain);
  rainGain.connect(audioCtx.destination);
  src.start();

  const hum = audioCtx.createOscillator();
  hum.type = "sine";
  hum.frequency.value = 58;
  const humGain = audioCtx.createGain();
  humGain.gain.value = 0.012;
  hum.connect(humGain);
  humGain.connect(audioCtx.destination);
  hum.start();
}

function setSound(on) {
  initAudio();
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();
  if (rainGain) rainGain.gain.setTargetAtTime(on ? 0.09 : 0, audioCtx.currentTime, 0.6);
}

function ping(freq) {
  if (!soundOn || !audioCtx) return;
  const t = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = "triangle";
  o.frequency.value = freq || 660;
  g.gain.value = 0.0001;
  o.connect(g);
  g.connect(audioCtx.destination);
  g.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
  o.start(t);
  o.stop(t + 0.4);
}

function ringSound() {
  if (!soundOn || !audioCtx) return;
  [0, 0.5].forEach((delay, i) => {
    const t = audioCtx.currentTime + delay;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "sine";
    o.frequency.value = i === 0 ? 520 : 440;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(audioCtx.destination);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    o.start(t);
    o.stop(t + 0.45);
  });
}

/* =========================================================================
   RAIN
   ========================================================================= */

function initRain() {
  const canvas = $("rain");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let drops = [];

  function size() {
    w = canvas.clientWidth || window.innerWidth;
    h = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(60, Math.round(w / 10));
    drops = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      l: 6 + Math.random() * 16,
      s: 6 + Math.random() * 11,
      o: 0.05 + Math.random() * 0.2
    }));
  }

  size();
  window.addEventListener("resize", size);

  (function frame() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      ctx.strokeStyle = "rgba(190,215,212," + d.o + ")";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 1.6, d.y + d.l);
      ctx.stroke();
      d.y += d.s;
      d.x -= 0.35;
      if (d.y > h) { d.y = -20; d.x = Math.random() * w; }
      if (d.x < -10) d.x = w + 10;
    }
    requestAnimationFrame(frame);
  })();
}

/* =========================================================================
   GO
   ========================================================================= */

boot();
