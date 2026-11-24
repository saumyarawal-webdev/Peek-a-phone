/* =========================================================================
   LOW TIDE — views, part 1
   Pure rendering helpers. Global state is read at call time.
   ========================================================================= */

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const icon = (name, cls) =>
  `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;

const photoById = (id) => CASE.photos.find((p) => p.id === id);
const noteById = (id) => CASE.notes.find((n) => n.id === id);
const memoById = (id) => CASE.memos.find((m) => m.id === id);
const threadById = (id) => CASE.threads.find((t) => t.id === id);
const fileById = (id) => CASE.files.find((f) => f.id === id);
const vmById = (id) => CASE.vms.find((v) => v.id === id);
const appById = (id) => APPS.find((a) => a.id === id);
const clueById = (id) => CLUES.find((c) => c.id === id);
const hasClue = (id) => state.clues.includes(id);

const appIcon = (id, { dock = false, badge = 0 } = {}) => {
  const a = appById(id);
  if (!a) return "";
  return `
    <button class="appicon${dock ? " appicon--dock" : ""}" type="button" data-action="app" data-app="${a.id}" aria-label="Open ${esc(a.name)}">
      <span class="appicon__tile" style="--a:${a.a};--b:${a.b}">
        ${icon(a.icon)}
        ${badge ? `<span class="badge">${badge > 9 ? "9+" : badge}</span>` : ""}
      </span>
      <span class="appicon__label">${esc(a.name)}</span>
    </button>`;
};

/* =========================================================================
   HOME
   ========================================================================= */

function viewHome() {
  const unread = !state.flags.julesRead;
  const photoBadge = state.act >= 3 && !state.flags.hiddenSeen ? 3 : 0;

  return `
  <div class="home">
    <div class="home__wall" aria-hidden="true">${ART.marina}</div>
    <div class="home__scrim" aria-hidden="true"></div>

    <div class="home__clock">
      <p class="home__date">Friday, October 24</p>
      <p class="home__time">${state.clock}</p>
    </div>

    <div class="home__widget">
      ${icon("warning")}
      <span>Small craft advisory · low tide <strong>4:58 AM</strong> · gate 27 opens 5:00</span>
    </div>

    <div class="home__grid">
      ${APPS.map((a) =>
        appIcon(a.id, {
          badge: a.id === "messages" ? (unread ? 1 : 0) : a.id === "photos" ? photoBadge : 0
        })
      ).join("")}
    </div>

    <div class="home__pager" aria-hidden="true">
      <span class="home__dot is-on"></span><span class="home__dot"></span>
    </div>

    <div class="home__dock" role="group" aria-label="Dock">
      ${DOCK.map((id) => appIcon(id, { dock: true })).join("")}
    </div>
  </div>`;
}

/* =========================================================================
   SHARED APP FRAME
   ========================================================================= */

function appShell(title, body, { sub = "", action = "", bodyClass = "" } = {}) {
  return `
  <div class="app">
    <header class="app__bar">
      <button class="app__back" type="button" data-action="back" aria-label="Back">${icon("chevron")}</button>
      <div class="app__title">${title}${sub ? `<small>${sub}</small>` : ""}</div>
      <div class="app__action">${action}</div>
    </header>
    <div class="app__body ${bodyClass}">${body}</div>
  </div>`;
}

/* =========================================================================
   MESSAGES
   ========================================================================= */

function viewMessages() {
  const rows = CASE.threads
    .map((t) => {
      const unread = t.id === "jules" && !state.flags.julesRead;
      const groupBadge = t.id === "locals" ? '<span class="msgrow__badge">group</span>' : "";
      return `
      <button class="msgrow" type="button" data-action="thread" data-id="${t.id}">
        <span class="avatar" style="--av:${t.av};--av2:${t.av2}">${esc(t.initials)}</span>
        <span class="msgrow__main">
          <span class="msgrow__top">
            <span class="msgrow__name">${esc(t.name)}</span>
            <span class="msgrow__time">${esc(t.time)}</span>
          </span>
          <span class="msgrow__preview">${esc(t.preview)}</span>
        </span>
        ${unread ? '<span class="unread" aria-label="Unread"></span>' : groupBadge}
      </button>`;
    })
    .join("");

  return appShell("Messages", `<div class="msglist">${rows}</div>`, {
    sub: "8 conversations",
    action: `<span class="app__action" aria-hidden="true">${icon("magnifier")}</span>`
  });
}

function bubbleHTML(m, group) {
  if (m.d === "day") return `<p class="thread__day">${esc(m.text)}</p>`;

  const mine = m.from === "me";
  if (m.kind === "photo") {
    const canOpen = state.act >= 3;
    return `
      <div class="bubble bubble--${mine ? "me" : "them"} bubble--photo" style="padding:4px">
        <button class="bubble__img" type="button" data-action="${canOpen ? "photo" : "locked-photo"}" data-id="p_1147" aria-label="Open the 11:47 photograph">
          ${ART.pier1147}
        </button>
        <div class="bubble__cap">${esc(m.caption || "")}</div>
        <span class="bubble__time">${esc(m.time)}</span>
      </div>`;
  }
  if (m.failed) {
    return `<div class="bubble bubble--failed">${esc(m.text)}<span class="bubble__time">Not delivered</span></div>`;
  }
  return `
    <div class="bubble bubble--${mine ? "me" : "them"}">
      ${!mine && m.name ? `<span class="bubble__cap">${esc(m.name)}</span>` : ""}
      ${esc(m.text)}
      <span class="bubble__time">${esc(m.time)}</span>
    </div>`;
}

function viewThread(t) {
  if (!t) return viewMessages();
  const group = t.id === "locals";
  const messages = t.messages.map((m) => bubbleHTML(m, group)).join("");
  const composerDisabled = t.id === "unknown" || t.id === "harbour" || t.id === "dentist";

  return appShell(esc(t.name), `
    <div class="thread">${messages}</div>
    <div class="composer" aria-hidden="true">
      <div class="composer__field">${composerDisabled ? "Notifications only" : "Message"}</div>
      <span class="composer__send">${icon("arrow")}</span>
    </div>
  `, {
    sub: group ? "9 members" : "iMessage",
    action: `<span class="app__action" aria-hidden="true">${icon("phone")}</span>`
  });
}

/* =========================================================================
   PHOTOS
   ========================================================================= */

function viewPhotos() {
  const album = state.album || "recents";
  const hiddenLocked = album === "hidden" && state.act < 3;
  const items = CASE.photos.filter((p) => p.album === album);
  const albums = CASE.albums
    .map((a) => {
      const lock = a.id === "hidden" && state.act < 3 ? "🔒 " : "";
      return `<button class="album${a.id === album ? " is-on" : ""}" type="button" data-action="album" data-id="${a.id}">${lock}${esc(a.name)}</button>`;
    })
    .join("");

  let grid;
  if (hiddenLocked) {
    grid = `
      <div class="ph ph--locked" style="grid-column:1 / -1; aspect-ratio: 2 / 1" role="img" aria-label="Hidden album locked">
        <div style="text-align:center">
          ${icon("lock")}
          <p style="font-size:9px;margin-top:6px;color:var(--fog-dim)">Hidden album · locked</p>
          <p style="font-size:7.5px;margin-top:2px;color:var(--fog-faint)">2 photos, 1 note</p>
        </div>
      </div>`;
  } else if (!items.length) {
    grid = `<div class="empty" style="grid-column:1 / -1">${icon("photos")}Nothing in this album yet.</div>`;
  } else {
    grid = items
      .map((p) => {
        if (p.broken) {
          return `
            <button class="ph ph--broken" type="button" data-action="broken" data-id="${p.id}" aria-label="Upload failed, ${esc(p.file)}">
              ${icon("warning")}<span>Upload failed</span>
            </button>`;
        }
        return `
          <button class="ph" type="button" data-action="photo" data-id="${p.id}" aria-label="${esc(p.title)}">
            ${ART[p.art]}
            <span class="ph__label">${esc(p.time)}</span>
          </button>`;
      })
      .join("");
  }

  return appShell("Photos", `
    <div class="phototabs" role="tablist" aria-label="Albums">${albums}</div>
    <div class="photogrid">${grid}</div>
    <p class="app__label">${items.length && !hiddenLocked ? items.length + " items" : ""}</p>
    ${album === "hidden" && state.act >= 3 ? `<p style="font-size:9.5px;color:var(--fog-dim);padding:0 2px">Restored from iCloud at 2:26 AM. 2 photos, 1 note.</p>` : ""}
    <p style="font-size:9px;line-height:1.5;color:var(--fog-faint);padding:10px 2px 0">
      Storage almost full. 0.1 GB available. ${album === "recents" ? "One upload failed at 11:47 PM." : ""}
    </p>
  `, { sub: `${CASE.photos.length} items` });
}

function viewPhoto(p) {
  if (!p) return viewPhotos();
  const art = p.broken ? "" : ART[p.art];
  return `
  <div class="pv">
    <div class="pv__bar">
      <button class="app__back" type="button" data-action="back" aria-label="Back">${icon("chevron")}</button>
      <span>${esc(p.file)}</span>
      <span style="width:38px"></span>
    </div>
    <div class="pv__stage" style="background:${p.broken ? "#101d23" : "#000"}">
      ${p.broken ? `<div class="empty" style="padding:60px 20px">${icon("warning")}This photo could not be loaded.<br />Storage is full.</div>` : art}
    </div>
    <div class="pv__meta">
      <p class="pv__time">${esc(p.time)} · ${esc(p.place)}</p>
      <h2 class="pv__title">${esc(p.title)}</h2>
      <p class="pv__place">${esc(p.note)}</p>
      ${p.broken ? "" : `<button class="pv__link" type="button" data-action="open-map" data-pin="pier">${icon("pin")} View on the map</button>`}
      <div class="pv__note">
        <strong style="color:var(--paper)">Details</strong><br />
        ${esc(p.file)} · ${esc(p.place)}<br />
        Saved to ${p.album === "hidden" ? "Hidden album" : "this phone"} · ${esc(p.time)}
      </div>
    </div>
  </div>`;
}

function viewHidden() {
  const seen = state.flags.hiddenSeen;
  return `
  <div class="hiddenview">
    <div class="pv__bar">
      <button class="app__back" type="button" data-action="back" aria-label="Back">${icon("chevron")}</button>
      <span>Hidden album</span>
      <span style="width:38px"></span>
    </div>
    <div class="hiddenview__head">
      <h2>Hidden</h2>
      <p class="hiddenview__lede">Restored from Noor’s backup at 2:26 AM. Two photographs and one note that never left this phone.</p>
    </div>
    <div class="hiddenview__grid">
      ${CASE.photos.filter((p) => p.album === "hidden").map((p) => `
        <button class="ph" type="button" data-action="photo" data-id="${p.id}" aria-label="${esc(p.title)}">
          ${ART[p.art]}
          <span class="ph__label">${esc(p.title)}</span>
        </button>`).join("")}
      <button class="ph${state.flags.hiddenNote ? " is-read" : ""}" type="button" data-action="hidden-note" style="background:linear-gradient(160deg,#f2e7d3,#d9c7a4)" aria-label="Open Noor's note">
        <span style="font-family:var(--font-display);font-size:34px;color:#5c4a33;transform:rotate(-6deg)">N.</span>
        <span class="ph__label" style="color:#3a3226;background:linear-gradient(transparent,rgba(255,255,255,.55))">A note for whoever finds this</span>
      </button>
    </div>
    <div class="hiddenview__body">
      ${state.flags.hiddenNote ? `
        <div class="hiddenview__note">
          <small>Handwritten · saved 11:59 PM</small>
          “If you’re reading this, I trusted you more than I trusted the desk. The card is in locker B-14. The code is 1189. Don’t take it inside. — N.”
        </div>` : `
        <button class="hiddenview__card" type="button" data-action="hidden-note" style="width:100%;text-align:left">
          ${icon("info")}
          <span><strong>One note, unopened</strong>Tap to read what Noor left for whoever found the phone.</span>
        </button>`}

      <div class="hiddenview__card">
        ${icon("share")}
        <span><strong>You have enough to act</strong>The photograph proves crate 6. The memo proves she was threatened. The locker has the camera card.</span>
      </div>

      ${seen ? "" : `<p style="font-family:var(--font-mono);font-size:8px;letter-spacing:.1em;color:var(--fog-faint);margin:2px 0 14px">2:26 AM · HIDDEN ALBUM OPENED</p>`}

      <button class="btn btn--amber" type="button" data-action="send-open" style="width:100%;justify-content:center">
        ${icon("share")} Decide who to tell
      </button>
      <p class="send__foot" style="margin-top:10px">Jules is at the marina. Low tide is 4:58. The boat leaves at five.</p>
    </div>
  </div>`;
}

/* =========================================================================
   NOTES
   ========================================================================= */

function viewNotes() {
  const rows = CASE.notes
    .map((n) => `
      <button class="noterow${n.clue ? " noterow--hot" : ""}" type="button" data-action="note" data-id="${n.id}">
        <span class="noterow__head">
          <span class="noterow__title">${esc(n.title)}</span>
          <span class="noterow__date">${esc(n.date)}</span>
        </span>
        <span class="noterow__prev">${esc(n.preview)}</span>
      </button>`)
    .join("");
  return appShell("Notes", `<div class="notelist">${rows}</div>`, { sub: "6 notes" });
}

function viewNote(n) {
  if (!n) return viewNotes();
  return `
  <div class="noteview">
    <div class="pv__bar" style="position:sticky">
      <button class="app__back" type="button" data-action="back" aria-label="Back">${icon("chevron")}</button>
      <span>Notes</span>
      <span style="width:38px"></span>
    </div>
    <div class="note">
      <div class="note__paper">
        <p class="note__date">${esc(n.date)} · Noor’s phone</p>
        <h2 class="note__title">${esc(n.title)}</h2>
        <div class="note__body">${esc(n.body)}</div>
        <p class="note__sign">${esc(n.sign || "")}</p>
        ${n.clue ? `<div class="note__clue">${icon("info")}<span>Worth writing down. This goes on the case board.</span></div>` : ""}
      </div>
    </div>
  </div>`;
}

/* =========================================================================
   PHONE APP
   ========================================================================= */

function viewPhoneApp() {
  const tab = state.phoneTab || "recents";
  let body = "";

  if (tab === "recents") {
    const rows = [
      { name: "Jules", meta: "Outgoing · 0:24", time: "11:47 PM", kind: "out" },
      { name: "Dana (Vesper Motel)", meta: "Missed · 1 call", time: "11:52 PM", kind: "missed" },
      { name: "Dana (Vesper Motel)", meta: "Missed · 1 call", time: "12:07 AM", kind: "missed" },
      { name: "Unknown", meta: "Missed · 1 call", time: "12:58 AM", kind: "missed" },
      { name: "Mum", meta: "Missed · 1 call", time: "10:14 PM", kind: "missed" },
      { name: "Harbour Patrol", meta: "Saved · non-emergency", time: "9:12 PM", kind: "out" }
    ];
    body = `<div class="calllist">${rows.map((r) => `
      <button class="callrow" type="button" data-action="noop">
        <span class="callrow__icon ${r.kind === "missed" ? "is-missed" : ""}">${icon("phone")}</span>
        <span class="callrow__main">
          <span class="callrow__name ${r.kind === "missed" ? "is-missed" : ""}">${esc(r.name)}</span>
          <span class="callrow__meta">${esc(r.meta)}</span>
        </span>
        <span class="callrow__time">${esc(r.time)}</span>
      </button>`).join("")}</div>`;
  } else {
    body = `<div class="calllist">${CASE.vms.map((v) => {
      const open = state.openVm === v.id;
      return `
      <div class="vmrow ${open ? "is-playing" : ""}">
        <button class="vmrow__top" type="button" data-action="play-vm" data-id="${v.id}">
          <span class="vmrow__play">${icon(open ? "pause" : "play")}</span>
          <span class="vmrow__main">
            <span class="vmrow__name">${esc(v.from)}</span>
            <span class="vmrow__meta">${esc(v.time)} · ${esc(v.dur)}</span>
          </span>
          <span class="callrow__time">${esc(v.dur)}</span>
        </button>
        ${open ? `<div class="vmrow__transcript"><strong>Transcript</strong><br />${esc(v.text)}</div>` : ""}
      </div>`;
    }).join("")}</div>`;
  }

  return appShell("Phone", `
    <div class="segmented">
      <button type="button" class="${tab === "recents" ? "is-on" : ""}" data-action="phone-tab" data-tab="recents">Recents</button>
      <button type="button" class="${tab === "voicemail" ? "is-on" : ""}" data-action="phone-tab" data-tab="voicemail">Voicemail (4)</button>
    </div>
    ${body}
    <p style="font-size:8.5px;color:var(--fog-faint);text-align:center;padding:18px 0 0">iCloud voicemail · last synced 1:01 AM</p>
  `, { sub: "Noor Haddad" });
}

/* =========================================================================
   SURF
   ========================================================================= */

function browserBar(title, url, backAction = "back") {
  return `
    <div class="browser__bar">
      <button class="app__back" type="button" data-action="${backAction}" aria-label="Back">${icon("chevron")}</button>
      <div class="browser__url">${icon("lock")}${esc(url)}</div>
      <div class="browser__count" aria-label="One tab"><span></span>1</div>
    </div>`;
}

function viewSurf() {
  const page = state.surfPage ? CASE.web.pages[state.surfPage] : null;
  if (page) {
    return `<div class="browser">
      ${browserBar(page.title, page.url, "surf-home")}
      <div class="webpage">${page.html}</div>
    </div>`;
  }

  const rows = CASE.web.start.history
    .map((h) => `
      <button class="history__row" type="button" data-action="web" data-page="${h.page}">
        ${icon("safari")}
        <span>${esc(h.label)}</span>
        <small>11:4x PM</small>
      </button>`)
    .join("");

  return `<div class="browser">
    ${browserBar("Surf", "surf://start")}
    <div class="webpage" style="background:#0b161b;color:#dfe9e6">
      <p class="webpage__kicker" style="color:#6f8587">Private browsing · no history saved</p>
      <h1 style="color:#f2ead9;font-size:28px;margin-top:2px">Good evening.</h1>
      <p style="color:#8fa5a3;font-size:10px">It’s late and the signal is bad. Here’s what you were looking at.</p>
      <h2 style="color:#e9dfcb;margin-top:18px">History</h2>
      <div class="history">${rows}</div>
      <div style="margin-top:18px;padding:12px;border:1px dashed rgba(242,182,97,.25);border-radius:4px;font-family:var(--font-mono);font-size:8px;line-height:1.6;color:#c9a76e">
        Tip: the harbour patrol’s non-emergency form wants a vessel name and a berth. “Something suspicious at the pier” is not a vessel name.
      </div>
    </div>
  </div>`;
}

/* =========================================================================
   MAPS
   ========================================================================= */

function viewMaps() {
  const selected = CASE.mapPins.find((p) => p.id === state.mapPin) || null;
  const pins = CASE.mapPins
    .map((p) => `
      <button class="mappin ${p.tone === "hot" ? "mappin--hot" : p.tone === "cool" ? "mappin--cool" : ""}"
        type="button" data-action="map-pin" data-id="${p.id}"
        style="left:${p.x}%;top:${p.y}%" aria-label="${esc(p.name)}">${esc(p.name.split(" · ")[0])}</button>`)
    .join("");

  return appShell("Maps", `
    <div class="mapwrap">
      <div class="map" role="img" aria-label="Map of Vesper Bay">
        ${MAP_ART}
        ${pins}
      </div>
      ${selected ? `
        <div class="mapcard">
          <h3>${esc(selected.name)}</h3>
          <p>${esc(selected.text)}</p>
          <div class="mapcard__meta"><span>${esc(selected.meta)}</span><span>${(selected.x / 10).toFixed(1)} mi</span></div>
        </div>` : `
        <div class="mapcard">
          <h3>Vesper Bay</h3>
          <p>Four pins. One of them is starred. Tap a pin for what Noor saved.</p>
          <div class="mapcard__meta"><span>North basin</span><span>Rain · 41°</span></div>
        </div>`}
      <p class="app__label">Location history</p>
      <div class="hist">
        <div class="hist__row"><span class="hist__time">11:58 PM</span><span>Marina · locker row · 4 min</span></div>
        <div class="hist__row"><span class="hist__time">11:47 PM</span><span>Pier 9 · 38 sec · photo taken</span></div>
        <div class="hist__row"><span class="hist__time">10:58 PM</span><span>Vesper Motel · Room 6</span></div>
        <div class="hist__row"><span class="hist__time">9:31 PM</span><span>Vesper Motel · car park</span></div>
      </div>
    </div>
  `, { sub: "Offline maps" });
}

/* =========================================================================
   VOICE MEMOS
   ========================================================================= */

const waveBars = (n, seed = 1) =>
  Array.from({ length: n }, (_, i) => {
    const h = 22 + Math.abs(Math.sin((i + seed) * 1.7) * 60) + (i % 3) * 4;
    return `<i style="--h:${Math.min(96, h)}%;--i:${i}"></i>`;
  }).join("");

function viewMemos() {
  const cards = CASE.memos
    .map((m) => `
      <button class="memocard" type="button" data-action="memo" data-id="${m.id}">
        <span class="memocard__play">${icon("play")}</span>
        <span class="memocard__main">
          <span class="memocard__title">${esc(m.title)}</span>
          <span class="memocard__meta">${esc(m.dur)} · ${esc(m.meta)}</span>
          <span class="miniwave">${waveBars(22, m.id.length)}</span>
        </span>
      </button>`)
    .join("");
  return appShell("Voice Memos", `
    <div class="app__hero">
      <h2>Four recordings.</h2>
      <p>One of them is not like the others.</p>
    </div>
    <div class="memolist">${cards}</div>
  `, { sub: "On this phone" });
}

function viewMemo(m) {
  if (!m) return viewMemos();
  const playing = state.memoPlaying === m.id;
  const pct = playing ? state.memoProgress : 0;
  const lines = m.lines
    .map((l) => {
      if (l.sfx) return `<p class="memo__sfx">[ ${esc(l.sfx)} ]</p>`;
      const key = l.who === "Dana" && m.key;
      return `<div class="memo__line${key ? " is-key" : ""}"><b>${esc(l.who)}</b><span>${esc(l.text)}</span></div>`;
    })
    .join("");

  return `
  <div class="memo">
    <div class="memo__bar">
      <button class="app__back" type="button" data-action="back" aria-label="Back">${icon("chevron")}</button>
      <span style="font-size:10px;color:var(--fog-dim)">Voice Memo</span>
      <span style="width:38px"></span>
    </div>
    <div class="memo__body">
      <p class="memo__kicker">${esc(m.meta)}</p>
      <h2 class="memo__title">${esc(m.title)}</h2>
      <p class="memo__meta">${esc(m.dur)} · recorded on this phone</p>

      <div class="memo__stage">
        <div class="memo__wave ${playing ? "is-playing" : ""}" aria-hidden="true">${waveBars(40, m.id.length * 2)}</div>
        <div class="memo__controls">
          <button class="memo__play" type="button" data-action="play-memo" data-id="${m.id}" aria-label="${playing ? "Pause" : "Play"} memo">
            ${icon(playing ? "pause" : "play")}
          </button>
          <span class="memo__time">${playing ? "0:" + String(Math.floor(m.len * pct / 100)).padStart(2, "0") : "0:00"}</span>
          <span class="memo__scrub"><span style="--p:${pct}%"></span></span>
          <span class="memo__time">${esc(m.dur)}</span>
        </div>
      </div>

      <div class="memo__transcript">
        <h3>Transcript</h3>
        ${lines}
      </div>
    </div>
  </div>`;
}

/* =========================================================================
   WEATHER · CLOCK · MUSIC
   ========================================================================= */

function viewWeather() {
  return appShell("Weather", `
    <div class="wx">
      <div class="wx__hero">
        <p class="wx__city">Vesper Bay · Friday, 1:04 AM</p>
        <p class="wx__temp">41<sup>°</sup></p>
        <p class="wx__cond">${icon("wave")} Rain · wind 22 kt SW</p>
        <p class="wx__range">H 48° · L 39° · feels like 34°</p>
        <div class="wx__hours">
          <div class="wx__hour">${icon("weather")}<strong>41°</strong>1 AM</div>
          <div class="wx__hour">${icon("weather")}<strong>40°</strong>2 AM</div>
          <div class="wx__hour">${icon("weather")}<strong>40°</strong>3 AM</div>
          <div class="wx__hour">${icon("weather")}<strong>39°</strong>4 AM</div>
          <div class="wx__hour">${icon("weather")}<strong>39°</strong>5 AM</div>
        </div>
      </div>
      <div class="wx__alert">${icon("warning")}<span><strong>Small craft advisory</strong> until 6:00 AM. Inlet restricted to commercial traffic until 5:30.</span></div>
      <div class="wx__grid">
        <div class="wx__stat"><span>Low tide</span><strong>4:58 AM</strong></div>
        <div class="wx__stat"><span>Slack water</span><strong>5:00 AM</strong></div>
        <div class="wx__stat"><span>Visibility</span><strong>0.8 mi</strong></div>
        <div class="wx__stat"><span>Pressure</span><strong>↓ 998 mb</strong></div>
      </div>
      <p style="font-size:9px;line-height:1.6;color:var(--fog-faint);padding:14px 2px 0">Rain until morning. The kind that gets under the door.</p>
    </div>
  `, { sub: "Vesper Bay" });
}

function viewClock() {
  return appShell("Clock", `
    <div class="clockapp">
      <p class="clockapp__big">${state.clock}<span style="font-size:22px;color:var(--fog-dim)"> AM</span></p>
      <p class="clockapp__date">Friday, 24 October</p>
      <p class="app__label">Alarms</p>
      <div class="alarm">
        <div class="alarm__main"><span class="alarm__time">4:40</span><span class="alarm__label"><strong>LOW TIDE</strong> · boathouse</span></div>
        <span class="toggle is-on" aria-label="Alarm on"></span>
      </div>
      <div class="alarm">
        <div class="alarm__main"><span class="alarm__time">7:40</span><span class="alarm__label">Ferry · return ticket</span></div>
        <span class="toggle" aria-label="Alarm off"></span>
      </div>
      <p class="app__label">World clock</p>
      <div class="world"><span>Beirut</span><strong>9:04 AM</strong></div>
      <div class="world"><span>Home</span><strong>9:04 AM</strong></div>
      <p style="font-size:9px;color:var(--fog-faint);padding-top:14px">Alarm set 2 days ago: “LOW TIDE — don’t miss it.”</p>
    </div>
  `, { sub: "Alarms & world clock" });
}

function viewMusic() {
  const idx = state.track || 0;
  const t = CASE.tracks[idx];
  const playing = state.musicPlaying;
  return appShell("Music", `
    <div class="music">
      <div class="np">
        <div class="np__art">${icon("wave")}</div>
        <p class="np__title">${esc(t.name)}</p>
        <p class="np__artist">${esc(t.artist)} · For the boat</p>
        <div class="np__scrub"><span></span></div>
        <div class="np__times"><span>1:34</span><span>${esc(t.len)}</span></div>
        <div class="np__controls">
          <button type="button" aria-label="Previous">${icon("chevron")}</button>
          <button class="is-main" type="button" data-action="music-toggle" aria-label="${playing ? "Pause" : "Play"}">${icon(playing ? "pause" : "play")}</button>
          <button type="button" aria-label="Next">${icon("chevron")}</button>
        </div>
      </div>
      <p class="app__label">Playlist · for the boat</p>
      <div class="tracks">
        ${CASE.tracks.map((tr, i) => `
          <button class="track${i === idx ? " is-on" : ""}" type="button" data-action="track" data-i="${i}">
            <span class="track__num">${i + 1}</span>
            <span class="track__body"><span class="track__name">${esc(tr.name)}</span><span class="track__artist">${esc(tr.artist)}</span></span>
            <span class="track__len">${esc(tr.len)}</span>
          </button>`).join("")}
      </div>
      <p style="font-size:9px;color:var(--fog-faint);padding-top:12px">Downloaded for offline. Signal at the marina is one bar.</p>
    </div>
  `, { sub: "Offline playlist" });
}

/* =========================================================================
   FILES
   ========================================================================= */

function viewFiles() {
  const rows = CASE.files
    .map((f) => `
      <button class="filerow" type="button" data-action="file" data-id="${f.id}">
        <span class="filerow__icon filerow__icon--${f.kind}">PDF</span>
        <span class="filerow__main">
          <span class="filerow__name">${esc(f.name)}</span>
          <span class="filerow__meta">${esc(f.meta)}</span>
        </span>
      </button>`)
    .join("");
  return appShell("Files", `
    <div class="app__hero">
      <h2>On my phone.</h2>
      <p>Downloads, scans, and the thing Vance keeps asking for.</p>
    </div>
    <div class="filelist">${rows}</div>
    <p style="font-size:9px;color:var(--fog-faint);padding-top:16px">iCloud Drive · 0.1 GB available</p>
  `, { sub: "iCloud Drive" });
}

function viewFile(f) {
  if (!f) return viewFiles();
  const d = f.doc;
  const rows = d.rows
    .map(([k, v]) => `<tr><th>${esc(k)}</th><td><strong>${esc(v)}</strong></td></tr>`)
    .join("");
  return `
  <div class="doc">
    <div class="pv__bar" style="position:sticky">
      <button class="app__back" type="button" data-action="back" aria-label="Back">${icon("chevron")}</button>
      <span>${esc(f.name)}</span>
      <span style="width:38px"></span>
    </div>
    <div class="doc__paper">
      <div class="doc__head">
        <div><p>${esc(d.sub)}</p><h2>${esc(d.title)}</h2></div>
        <span class="doc__stamp">${esc(d.stamp)}</span>
      </div>
      <table>${rows}</table>
      <p>${esc(d.note)}</p>
      <p class="doc__sig">${esc(d.sig)}</p>
      <p class="doc__foot">${esc(f.name)} · ${esc(f.meta)} · saved on this phone</p>
    </div>
  </div>`;
}

/* =========================================================================
   SETTINGS
   ========================================================================= */

function viewSettings() {
  return appShell("Settings", `
    <div class="settings">
      <div class="settinggroup">
        <div class="settingrow"><span class="settingrow__icon">${icon("phone")}</span><span class="settingrow__label">Airplane Mode</span><span class="settingrow__value">Off</span></div>
        <div class="settingrow"><span class="settingrow__icon">${icon("wave")}</span><span class="settingrow__label">Wi-Fi</span><span class="settingrow__value">VESPER-GUEST</span></div>
        <div class="settingrow"><span class="settingrow__icon">${icon("share")}</span><span class="settingrow__label">Bluetooth</span><span class="settingrow__value">On</span></div>
      </div>

      <div class="findmy">
        <p class="findmy__head">${icon("pin")} Find My</p>
        <div class="findmy__row">
          <span class="findmy__pin"></span>
          <span class="findmy__main">
            <span class="findmy__name">Noor’s Camera</span>
            <span class="findmy__meta">Pier 9, Vesper Bay · last seen 11:47 PM</span>
          </span>
          <button class="findmy__btn" type="button" data-action="findmy">Open</button>
        </div>
        <p style="font-size:8.5px;line-height:1.5;color:var(--fog-faint);margin-top:10px">This device is offline. The last known location is shown.</p>
      </div>

      <div class="settinggroup">
        <div class="settingrow"><span class="settingrow__icon">${icon("photos")}</span><span class="settingrow__label">Photos &amp; storage</span><span class="settingrow__value">48.2 GB</span></div>
        <div class="settingrow"><span class="settingrow__icon">${icon("clock")}</span><span class="settingrow__label">Battery</span><span class="settingrow__value">${state.battery}%</span></div>
        <div class="settingrow"><span class="settingrow__icon">${icon("lock")}</span><span class="settingrow__label">Face ID &amp; Passcode</span><span class="settingrow__value">On</span></div>
      </div>

      <div class="storage">
        <p class="app__label" style="padding-top:2px">Storage</p>
        <div class="storage__bar">
          <i style="width:62%;background:#f2b661"></i><i style="width:24%;background:#7fd1c6"></i><i style="width:13%;background:#ff7a6b"></i>
        </div>
        <div class="storage__legend"><span style="--c:#f2b661">Photos 48.2 GB</span><span style="--c:#7fd1c6">Apps 19.1 GB</span><span style="--c:#ff7a6b">Free 0.1 GB</span></div>
      </div>

      <p style="font-size:8.5px;line-height:1.6;color:var(--fog-faint);padding:16px 2px 0">Noor’s iPhone · VesperOS 4.2 · signed in as noor.haddad@northline.co</p>
    </div>
  `, { sub: "Noor’s iPhone" });
}

/* =========================================================================
   RECIPES
   ========================================================================= */

function viewRecipes() {
  return appShell("Miso’s Kitchen", `
    <div class="recipes">
      <div class="app__hero">
        <h2>Six things worth eating at 1 AM.</h2>
        <p>Collected over four years, three flats, and one very opinionated cat.</p>
      </div>
      ${CASE.recipes.map((r) => `
        <button class="recipe" type="button" data-action="recipe" data-title="${esc(r.title)}">
          <span class="recipe__art" style="--a:${r.a};--b:${r.b}">${r.emoji}</span>
          <span class="recipe__body">
            <span class="recipe__title">${esc(r.title)}</span>
            <span class="recipe__meta">${esc(r.time)} · serves one, reluctantly</span>
            <span class="recipe__text">${esc(r.text)}</span>
          </span>
        </button>`).join("")}
      <div class="recipes__note">
        Miso eats at six. She will tell you it is six at four thirty. Do not believe her.
      </div>
    </div>
  `, { sub: "Noor’s recipes" });
}
