/* =========================================================================
   LOW TIDE — views, part 2
   Lock screen, passcode, wallpaper, the call, and the send sheet.
   ========================================================================= */

const CALL_LINES = [
  { who: "You", text: "…" },
  { who: "Dana", text: "Noor? … No. You’re not Noor." },
  { who: "Dana", text: "That phone was supposed to stay in the drawer." },
  { sfx: "gulls. a bilge pump knocking somewhere below the dock." },
  { who: "Dana", text: "I can hear the lobby radio from here. You’re at the desk, aren’t you." },
  { who: "Dana", text: "Put it back. Go home. This isn’t your night." },
  { who: "Dana", text: "I’d hate for something to happen to a helpful person." },
  { sfx: "the line goes dead." }
];

/* =========================================================================
   LOCK SCREEN
   ========================================================================= */

function lockNoteHTML(n) {
  return `
    <div class="lock__note ${n.alert ? "lock__note--alert" : ""}">
      <strong><time>${esc(n.time || "")}</time>${esc(n.title)}</strong>
      <span>${esc(n.body)}</span>
    </div>`;
}

function viewLock() {
  const fallback = [
    { title: "Jules", time: "1:02 AM", body: "I’m at the marina. slip 4-B, gate 27. five o’clock. don’t be late." },
    { title: "Dana (Vesper Motel)", time: "2:14 AM", body: "Leave it in the drawer. I’ll know if you don’t.", alert: true },
    { title: "Harbour Master", time: "2:10 AM", body: "Low tide 04:58. Inlet restricted to commercial traffic until 05:30." }
  ];
  const notes = (state.notifs || []).slice(-3);
  const list = notes.length ? notes : fallback;

  return `
  <div class="lock">
    <div class="lock__wall" aria-hidden="true">${ART.marina}</div>
    <div class="lock__scrim" aria-hidden="true"></div>

    <div class="lock__top">
      <p class="lock__date">Friday, October 24</p>
      <p class="lock__clock">${state.clock}</p>
      <p class="lock__widget">${icon("warning")} <span>Low tide <strong>4:58 AM</strong> · 41°</span></p>
    </div>

    <div class="lock__notifs">
      ${list.map(lockNoteHTML).join("")}
    </div>

    <div class="lock__bottom">
      <button class="linkbtn" type="button" data-action="wallpaper" style="color:rgba(240,245,242,.6)">Look closer at the wallpaper</button>
      <button class="lock__open" type="button" data-action="pin-open">Enter Passcode</button>
      <p class="lock__hint">${state.pinAttempts ? `${Math.max(0, 8 - state.pinAttempts)} attempts before erase` : "Face ID unavailable · passcode required"}</p>
    </div>
  </div>`;
}

/* =========================================================================
   PASSCODE
   ========================================================================= */

function viewPin() {
  const dots = Array.from({ length: 4 }, (_, i) =>
    `<span class="pin__dot ${i < (state.pin || "").length ? "is-on" : ""}"></span>`
  ).join("");

  const key = (d) => `<button class="pin__key" type="button" data-action="pin" data-d="${d}" aria-label="${d}">${d}</button>`;
  const hint =
    state.pinAttempts >= 6
      ? `<div class="pin__hint">Fine. The marina doesn’t change: <strong>slip 4-B</strong>, <strong>gate 27</strong>. Four digits.</div>`
      : state.pinAttempts >= 3
      ? `<div class="pin__hint">Hint: the answer is painted on the marina. Two numbers, <strong>4-B</strong> and <strong>gate 27</strong>.</div>`
      : "";

  return `
  <div class="pin">
    <div class="pin__wall" aria-hidden="true">${ART.marina}</div>
    <div class="pin__scrim" aria-hidden="true"></div>
    <div class="pin__body">
      <button class="pin__zoom" type="button" data-action="wallpaper" aria-label="Look closer at the wallpaper">${icon("magnifier")}</button>
      <p class="pin__date">Friday, October 24</p>
      <p class="pin__time">${state.clock}</p>
      <p class="pin__label">Enter Passcode</p>
      <div class="pin__dots" aria-label="${(state.pin || "").length} of 4 digits entered">${dots}</div>
      <p class="pin__err">${esc(state.pinError || "")}</p>
      <div class="pin__keys">
        ${key(1)}${key(2)}${key(3)}
        ${key(4)}${key(5)}${key(6)}
        ${key(7)}${key(8)}${key(9)}
        <button class="pin__key pin__key--fn" type="button" data-action="emergency">Emergency</button>
        ${key(0)}
        <button class="pin__key pin__key--fn" type="button" data-action="pin-del" aria-label="Delete digit">${icon("close")}</button>
      </div>
      ${hint}
      <p class="pin__hint" style="background:none;border:0;color:rgba(240,245,242,.45);padding-top:2px">
        The phone is locked for your security.
      </p>
    </div>
  </div>`;
}

/* =========================================================================
   WALLPAPER VIEWER
   ========================================================================= */

function viewWallpaper() {
  const z = state.wallZoom || 1;
  return `
  <div class="wallview">
    <div class="wallview__bar">
      <button class="app__back" type="button" data-action="back" aria-label="Back">${icon("chevron")}</button>
      <span>Wallpaper</span>
      <div class="wallview__zoom">
        <button type="button" data-action="zoom-out" aria-label="Zoom out">−</button>
        <button type="button" data-action="zoom-in" aria-label="Zoom in">+</button>
      </div>
    </div>
    <div class="wallview__stage">
      <div class="wallview__art" style="--z:${z}">${ART.marina}</div>
    </div>
    <p class="wallview__hint">No caption. Saved 9:12 PM. “The only honest thing in town.” · Tap + to look closer.</p>
  </div>`;
}

/* =========================================================================
   THE CALL
   ========================================================================= */

function viewCall() {
  const phase = state.callPhase || "incoming";
  const answered = phase === "active";

  const lines = answered
    ? CALL_LINES.slice(0, state.callLines || 0).map((l) => {
        if (l.sfx) return `<p class="callline callline--sfx">[ ${esc(l.sfx)} ]</p>`;
        return `<div class="callline ${l.who === "Dana" ? "callline--dana" : ""}"><b>${esc(l.who)}</b>${esc(l.text)}</div>`;
      }).join("")
    : "";

  return `
  <div class="callview">
    <div class="callview__bg" aria-hidden="true"></div>
    <div class="callview__body">
      <p class="callview__kicker">${answered ? "Ongoing call" : "Incoming call"}</p>
      <div class="callview__avatar" aria-hidden="true">DR</div>
      <h2 class="callview__name">Dana</h2>
      <p class="callview__sub">Vesper Motel · mobile</p>
      ${answered ? `<p class="callview__timer">${formatCallTime(state.callTimer || 0)}</p>` : ""}

      ${answered ? `
        <div class="callview__lines" aria-live="polite">${lines}</div>
        <div class="callview__actions">
          <button class="callbtn" type="button" data-action="noop">
            <span class="callbtn__circle" style="background:rgba(255,255,255,.12)">${icon("mic")}</span>
            <span>mute</span>
          </button>
          <button class="callbtn callbtn--decline" type="button" data-action="call-end">
            <span class="callbtn__circle">${icon("call")}</span>
            <span>end</span>
          </button>
          <button class="callbtn" type="button" data-action="noop">
            <span class="callbtn__circle" style="background:rgba(255,255,255,.12)">${icon("wave")}</span>
            <span>speaker</span>
          </button>
        </div>
        <p class="callview__note">The lobby radio is playing in the background.</p>
      ` : `
        <div class="callview__lines" aria-live="polite">
          <p class="callline callline--sfx" style="text-align:center">The motel’s internal line. She is calling from the desk downstairs.</p>
        </div>
        <div class="callview__actions">
          <button class="callbtn callbtn--decline" type="button" data-action="call-decline">
            <span class="callbtn__circle">${icon("call")}</span>
            <span>decline</span>
          </button>
          <button class="callbtn callbtn--accept" type="button" data-action="call-accept">
            <span class="callbtn__circle">${icon("call")}</span>
            <span>accept</span>
          </button>
        </div>
        <p class="callview__note">Answering will let her hear the lobby radio.</p>
      `}
    </div>
  </div>`;
}

function formatCallTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* =========================================================================
   SEND SHEET
   ========================================================================= */

function viewSend() {
  const rec = state.recipients || [];
  const att = state.attachments || {};

  const canPhoto = hasClue("photo1147");
  const canMemo = hasClue("threat");
  const canLocker = hasClue("lockerCode") && hasClue("locker");

  const recipient = (id, initials, name, sub, av, av2, danger) => `
    <button class="pick ${rec.includes(id) ? "pick--on" : ""} ${danger ? "pick--danger" : ""}"
      type="button" data-action="toggle-recipient" data-id="${id}" aria-pressed="${rec.includes(id)}">
      <span class="pick__avatar" style="--av:${av};--av2:${av2}">${esc(initials)}</span>
      <span class="pick__main"><span class="pick__name">${esc(name)}</span><span class="pick__sub">${esc(sub)}</span></span>
      <span class="pick__check">${icon("check")}</span>
    </button>`;

  const attachment = (id, label, sub, available) => `
    <button class="pick ${att[id] ? "pick--on" : ""} ${available ? "" : "pick--locked"}"
      type="button" data-action="toggle-attachment" data-id="${id}" data-available="${available ? "1" : "0"}"
      aria-pressed="${!!att[id]}" ${available ? "" : "disabled"}>
      <span class="pick__avatar" style="--av:${available ? "#7fd1c6" : "#5d6d6b"};--av2:${available ? "#2f6f68" : "#2a3433"}">${icon(id === "photo" ? "photos" : id === "memo" ? "memos" : "lock")}</span>
      <span class="pick__main"><span class="pick__name">${esc(label)}</span><span class="pick__sub">${esc(available ? sub : "Not found yet")}</span></span>
      <span class="pick__check">${icon("check")}</span>
    </button>`;

  const missing = [];
  if (!canPhoto) missing.push("the photograph");
  if (!canMemo) missing.push("Dana’s voice memo");
  if (!canLocker) missing.push("the locker number and code");

  return `
  <div class="sendview">
    <div class="send__bar">
      <button type="button" data-action="back">Cancel</button>
      <span>Send evidence</span>
      <span style="width:34px"></span>
    </div>
    <div class="send__body">
      <h2>Who do you tell?</h2>
      <p class="send__sub">It is 2:26 in the morning. Everything you send leaves this phone and cannot be taken back.</p>

      ${recipient("jules", "JH", "Jules Haddad", "Her brother. On the water. Five minutes from Pier 9.", "#f2b661", "#a8661f")}
      ${recipient("police", "HP", "Harbour Patrol", "Non-emergency line. Response time 3–5 business days, officially.", "#8fd6d0", "#2c6f6a")}
      ${recipient("dana", "DR", "Dana Roe", "Day desk. Owns the boat. Took the photograph’s subject.", "#ff9a8a", "#a83b35", true)}

      <h2 style="margin-top:24px">What goes with it?</h2>
      <p class="send__sub">Pick what you can prove. Everything you attach is copied from this phone.</p>

      ${attachment("photo", "The 11:47 photograph", "Crate 6, the Martha R., a figure in a hood.", canPhoto)}
      ${attachment("memo", "Dana’s voice memo", "“You understand why you’re staying the night.”", canMemo)}
      ${attachment("locker", "Locker B-14 · code 1189", "Where Noor hid the camera card.", canLocker)}

      ${rec.includes("dana") ? `<div class="send__note" style="background:rgba(255,122,107,.08);border-color:rgba(255,122,107,.3);color:#ffb6aa">Dana will know you have the phone. She already does.</div>` : ""}
      ${missing.length ? `<p class="send__missing">Still missing: ${esc(missing.join(", "))}. You can send without it, if you think it’s enough.</p>` : `<p class="send__missing">You have everything. The photograph, the voice, and the place she hid the card.</p>`}

      <button class="send__go" type="button" data-action="send">Send</button>
      <p class="send__foot">The Martha R. leaves at 5:00 AM. Low tide is 4:58.</p>
    </div>
  </div>`;
}
