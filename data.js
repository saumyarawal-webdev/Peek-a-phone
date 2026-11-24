/* =========================================================================
   LOW TIDE — the case file
   Every line of story, every app, every clue and every ending.
   ========================================================================= */

const APPS = [
  { id: "messages", name: "Messages", icon: "messages", a: "#5fd8cb", b: "#1f7a73" },
  { id: "photos", name: "Photos", icon: "photos", a: "#ffd27a", b: "#d9763c" },
  { id: "notes", name: "Notes", icon: "notes", a: "#e8cf86", b: "#8c6c2a" },
  { id: "phone", name: "Phone", icon: "phone", a: "#7ce0a3", b: "#2f9c62" },
  { id: "surf", name: "Surf", icon: "safari", a: "#7fd1f0", b: "#2c6fb0" },
  { id: "maps", name: "Maps", icon: "maps", a: "#a8d8a0", b: "#4d8f6a" },
  { id: "memos", name: "Voice Memos", icon: "memos", a: "#ff9a8a", b: "#b8443f" },
  { id: "weather", name: "Weather", icon: "weather", a: "#8cc3e8", b: "#2f6f9e" },
  { id: "clock", name: "Clock", icon: "clock", a: "#c9d4d2", b: "#687b7e" },
  { id: "music", name: "Music", icon: "music", a: "#ff9fc6", b: "#a3386b" },
  { id: "files", name: "Files", icon: "files", a: "#8fd6d0", b: "#347b78" },
  { id: "recipes", name: "Miso's Kitchen", icon: "recipes", a: "#e8b878", b: "#8a5a2a" },
  { id: "settings", name: "Settings", icon: "settings", a: "#b9c4c2", b: "#5b6b6d" }
];

const DOCK = ["phone", "messages", "surf", "photos"];

const CASE = {
  threads: [
    {
      id: "jules", name: "Jules", initials: "JH", av: "#f2b661", av2: "#a8661f",
      preview: "I’m at the marina. slip 4-B, gate 27.", time: "1:02 AM", unread: true,
      messages: [
        { d: "day", text: "Friday, October 24" },
        { from: "them", time: "11:41 PM", text: "you at the pier?" },
        { from: "me", time: "11:41 PM", text: "yeah. blue van. he’s loading crate 6." },
        { from: "them", time: "11:42 PM", text: "leave it. call harbour patrol." },
        { from: "me", time: "11:43 PM", text: "can’t prove anything from the car park. five minutes." },
        { from: "them", time: "11:44 PM", text: "noor." },
        { from: "me", time: "11:47 PM", kind: "photo", art: "pier1147", caption: "got him." },
        { from: "them", time: "11:52 PM", text: "noor??" },
        { from: "them", time: "11:56 PM", text: "I’m calling you." },
        { from: "them", time: "12:03 AM", text: "I’m at the marina. slip 4-B, gate 27. five o’clock. don’t be late." },
        { from: "them", time: "1:02 AM", text: "please." }
      ]
    },
    {
      id: "dana", name: "Dana (Vesper Motel)", initials: "DR", av: "#ff9a8a", av2: "#a83b35",
      preview: "Saw your light on. You should really close your curtains.", time: "12:07 AM", unread: false,
      messages: [
        { d: "day", text: "Friday, October 24" },
        { from: "them", time: "10:02 PM", text: "You forgot your scarf at the desk. Want me to bring it up? 🙂" },
        { from: "me", time: "10:03 PM", text: "I’m out. Leave it in the room." },
        { from: "them", time: "10:04 PM", text: "Out where? It’s pouring." },
        { from: "me", time: "10:06 PM", text: "Working." },
        { from: "them", time: "10:20 PM", text: "Pier’s closed after ten. Just so you know." },
        { from: "me", time: "10:21 PM", text: "Good thing I’m not on the pier." },
        { from: "them", time: "11:58 PM", text: "Saw your light on. You should really close your curtains." },
        { from: "them", time: "12:07 AM", text: "Call me back." }
      ]
    },
    {
      id: "vance", name: "M. Vance — Northline", initials: "MV", av: "#8fd6d0", av2: "#2c6f6a",
      preview: "The magazine can’t run accusations. I need a face, a crate, a time.", time: "9:40 PM", unread: false,
      messages: [
        { d: "day", text: "Friday, October 24" },
        { from: "them", time: "9:40 PM", text: "The magazine can’t run accusations. I need a face, a crate, a time." },
        { from: "me", time: "9:42 PM", text: "Working on it. One more night." },
        { from: "them", time: "9:43 PM", text: "You said that Tuesday." },
        { from: "me", time: "9:44 PM", text: "Thursday." },
        { from: "them", time: "9:45 PM", text: "Careful, Haddad." },
        { from: "me", time: "9:45 PM", text: "Always." }
      ]
    },
    {
      id: "mum", name: "Mum", initials: "NH", av: "#d9c2f0", av2: "#7d5f9c",
      preview: "There’s a storm warning on the news. Are you safe?", time: "11:20 PM", unread: true,
      messages: [
        { d: "day", text: "Friday, October 24" },
        { from: "them", time: "10:14 PM", text: "Did you land? Miso knocked the plant off the sill again. Text me when you’re at the hotel ❤️" },
        { from: "me", time: "10:16 PM", text: "landed. it’s beautiful here. rainy." },
        { from: "them", time: "10:17 PM", text: "Eat something warm." },
        { from: "them", time: "11:20 PM", text: "There’s a storm warning on the news. Are you safe?" }
      ]
    },
    {
      id: "locals", name: "Vesper Bay Locals", initials: "VB", av: "#9fb8b3", av2: "#4c6664",
      preview: "Dana’s boat is the only one dumb enough to run the inlet at low tide.", time: "11:36 PM", unread: false,
      messages: [
        { d: "day", text: "Friday, October 24" },
        { from: "them", name: "Barb", time: "11:12 PM", text: "anyone else’s power flickering?" },
        { from: "them", name: "Tom", time: "11:18 PM", text: "storm’s early. low tide 4:58 if anyone’s crazy enough to go out" },
        { from: "them", name: "Barb", time: "11:31 PM", text: "Dana’s boat is the only one dumb enough to run the inlet at low tide" },
        { from: "them", name: "Tom", time: "11:33 PM", text: "she’s been out every night this week" },
        { from: "them", name: "Barb", time: "11:36 PM", text: "not our business" }
      ]
    },
    {
      id: "harbour", name: "Harbour Master", initials: "HM", av: "#a8c8e8", av2: "#365f8a",
      preview: "Small craft advisory in effect until 06:00.", time: "11:05 PM", unread: false,
      messages: [
        { d: "day", text: "Friday, October 24" },
        { from: "them", time: "11:05 PM", text: "SMALL CRAFT ADVISORY in effect until 06:00. Wind SW 22 kt, gusting 31." },
        { from: "them", time: "11:06 PM", text: "Low tide 04:58. Inlet restricted to commercial traffic until 05:30." },
        { from: "them", time: "11:06 PM", text: "Report non-emergencies at vesperbay.gov/tips. Emergencies: 911." }
      ]
    },
    {
      id: "unknown", name: "+1 (555) 0147", initials: "?", av: "#8a9a98", av2: "#3d4a49",
      preview: "go to sleep.", time: "12:36 AM", unread: true,
      messages: [
        { d: "day", text: "Friday, October 24" },
        { from: "them", time: "12:31 AM", text: "is this noor" },
        { from: "me", time: "12:32 AM", text: "who is this" },
        { from: "them", time: "12:34 AM", text: "you left your balcony door open. the rain’s getting in." },
        { from: "me", time: "12:35 AM", text: "Who is this." },
        { from: "them", time: "12:36 AM", text: "go to sleep." }
      ]
    },
    {
      id: "dentist", name: "Vesper Dental", initials: "VD", av: "#cfd8d6", av2: "#6b7a78",
      preview: "Reminder: cleaning Fri 24 at 4:58 PM.", time: "Oct 23", unread: false,
      messages: [
        { d: "day", text: "Thursday, October 23" },
        { from: "them", time: "4:58 PM", text: "Reminder: cleaning Fri 24 at 4:58 PM. Reply C to confirm." },
        { from: "them", time: "5:02 PM", text: "Reply C to confirm." }
      ]
    }
  ],

  photos: [
    { id: "p_pier", file: "IMG_4465", title: "Pier 9, dusk", place: "Vesper Bay Marina", time: "11:12 PM", art: "pierDusk", album: "recents", ratio: "4 / 3", note: "The last of the light. You can just make out a boat at the far mooring." },
    { id: "p_motel", file: "IMG_4466", title: "Vacancy", place: "Vesper Motel", time: "9:31 PM", art: "motel", album: "recents", ratio: "4 / 3", note: "The sign buzzes like a trapped fly. Noor liked it. She said it looked honest." },
    { id: "p_selfie", file: "IMG_4470", title: "Before the pier", place: "Vesper Motel · Room 6", time: "9:48 PM", art: "selfie", album: "recents", ratio: "4 / 5", note: "Red scarf. Gold hoops. One bar of signal." },
    { id: "p_cat", file: "IMG_4468", title: "Miso, unimpressed", place: "Home · 2,400 miles away", time: "10:02 PM", art: "cat", album: "recents", ratio: "4 / 3", note: "Mum sends one of these every night. Miso has never once looked at the camera." },
    { id: "p_van", file: "IMG_4471", title: "Blue van", place: "Vesper Motel · car park", time: "11:39 PM", art: "van", album: "case", ratio: "4 / 3", note: "Parked with its nose to the fence. Plate reads VB 27-4.", clue: "van" },
    { id: "p_boathouse", file: "IMG_4472", title: "The boathouse", place: "Pier 9", time: "11:44 PM", art: "boathouse", album: "case", ratio: "4 / 3", note: "One window lit. The tide was already going out.", clue: "boathouse" },
    { id: "p_camera", file: "IMG_4473", title: "Left the bag", place: "Pier 9", time: "11:46 PM", art: "camera", album: "case", ratio: "4 / 3", note: "She set it down to get closer. The card inside is gone." },
    { id: "p_broken", file: "IMG_4475", title: "Upload failed", place: "Pier 9", time: "11:47 PM", album: "recents", ratio: "4 / 3", broken: true, note: "This photo could not be saved. Storage is full." },
    { id: "p_tide", file: "Screenshot", title: "Tide table", place: "NOAA · Station 941", time: "11:52 PM", art: "tideShot", album: "screenshots", ratio: "4 / 3", note: "Low tide at 4:58 AM. Slack water at five." },
    { id: "p_1147", file: "IMG_4476", title: "The 11:47 photograph", place: "Pier 9 · crate 6", time: "11:47 PM", art: "pier1147", album: "hidden", ratio: "4 / 3", note: "Crate 6 on the dock. The Martha R. at the far mooring. A figure in a hood, turning away.", clue: "photo1147" },
    { id: "p_locker", file: "IMG_4478", title: "Locker B-14", place: "Vesper Bay Marina", time: "11:58 PM", art: "locker", album: "hidden", ratio: "4 / 3", note: "One door hanging open. The tag says B-14.", clue: "locker" }
  ],

  albums: [
    { id: "recents", name: "Recents" },
    { id: "case", name: "Case" },
    { id: "screenshots", name: "Screenshots" },
    { id: "hidden", name: "Hidden" }
  ],

  notes: [
    {
      id: "story", title: "STORY — VESPER BAY", date: "Thu 23 Oct", preview: "Night manifests. Crate 6 never on the sheet.",
      body: "Night manifests. Crate 6 never on the sheet.\n\nDana Roe runs the day desk and the boat. Ask her about the Marina, not the motel.\n\nRoe Marine Services — the Martha R. Out on the low tide every night this week.\n\nVance wants a face, a crate and a time. He’s right. A hunch is not a story.\n\nIf the manifest is real, this is bigger than a motel.",
      sign: "— N.", clue: "story"
    },
    {
      id: "ifanything", title: "IF ANYTHING HAPPENS", date: "Thu 23 Oct", preview: "Don’t call the cops from here. Dana knows half of them.",
      body: "Don’t call the cops from here. Dana knows half of them.\n\nCall Jules. He’s on the water before I am.\n\nThe good photo is backed up on this phone — same place as the recipes. You’ll know the code.\n\nIf I’m not back by five, don’t come looking alone.\n\nFeed Miso. She lies about being hungry.",
      sign: "— N."
    },
    {
      id: "locker", title: "LOCKER", date: "Fri 24 Oct", preview: "B-14. 1189. If the card’s still there…",
      body: "B-14. 1189.\n\nThe camera card is in the locker, taped under the shelf. If it’s still there, the story’s still mine.\n\nDon’t put it in your pocket. Don’t take it to the motel. Don’t give it to Dana.",
      sign: "— N.", clue: "lockerCode"
    },
    {
      id: "interview", title: "INTERVIEW — D. ROE", date: "Thu 23 Oct", preview: "“Nothing moves through this harbour without me knowing.”",
      body: "“Nothing moves through this harbour without me knowing.”\n— D. Roe, smiling, drying a glass.\n\nAsk her about crate 6. Ask her why she locks the office at night. Ask her why the manifest says 05:00 and the office clock says 04:40.\n\nShe offered me a coffee. She watched me not drink it.",
      sign: "— N."
    },
    {
      id: "packing", title: "PACKING", date: "Wed 22 Oct", preview: "film ×6 / charger / Miso’s meds (Tues) / red scarf",
      body: "film ×6\ncharger — the long one\ntide table, p. 14\nred scarf (the good one)\nMiso’s meds — Tuesday, don’t forget again\n\nBuy batteries at the harbour shop. The woman there knows everything and sells nothing.",
      sign: "— N."
    },
    {
      id: "groceries", title: "GROCERIES", date: "Tue 21 Oct", preview: "tuna (Miso) / batteries / ice / cheap coffee",
      body: "tuna — the small tins, she can tell the difference\nbatteries\na bag of ice\ncheap coffee for the room\nsomething green, technically",
      sign: "— N."
    }
  ],

  vms: [
    {
      id: "vm_dana", from: "Dana (Vesper Motel)", time: "12:07 AM", dur: "0:31",
      text: "Hey. It’s me. I saw your light on. You should really close your curtains. Call me back."
    },
    {
      id: "vm_jules", from: "Jules", time: "11:58 PM", dur: "0:12",
      text: "Noor, pick up. If you’re at the pier, get away from the water. I’m serious."
    },
    {
      id: "vm_mum", from: "Mum", time: "10:14 PM", dur: "0:44",
      text: "Hello love, it’s your mother. Miso has knocked the fern off the sill again. I don’t think she’s sorry. Call me when you’re settled. Eat something warm."
    },
    {
      id: "vm_harbour", from: "Harbour Master (auto)", time: "11:05 PM", dur: "0:18",
      text: "Small craft advisory in effect until six a.m. Low tide at four fifty-eight. Inlet restricted to commercial traffic. This is an automated message."
    }
  ],

  memos: [
    {
      id: "m1", title: "pier, 11:44", dur: "0:38", len: 38, clue: "threat", key: true,
      meta: "Recorded at Pier 9 · one bar of signal",
      lines: [
        { sfx: "wind. water against the pilings. a crate being dragged." },
        { who: "Dana", text: "You saw the manifest." },
        { who: "Noor", text: "I saw crate six." },
        { who: "Dana", text: "So you understand why you’re staying the night." },
        { who: "Noor", text: "You can’t just—" },
        { who: "Dana", text: "I can. Sit down." },
        { sfx: "a door. the click of a torch." }
      ]
    },
    {
      id: "m2", title: "miso", dur: "0:12", len: 12, meta: "Recorded at home · last Tuesday",
      lines: [
        { sfx: "a cat purring directly into the microphone." },
        { who: "Noor", text: "This is the sound of a small animal who has never paid rent." }
      ]
    },
    {
      id: "m3", title: "interview — d. roe", dur: "2:10", len: 130, clue: "manifest", key: true,
      meta: "Recorded at the Vesper Motel · 8:40 PM",
      lines: [
        { who: "Noor", text: "For the record, you run the night manifests?" },
        { who: "Dana", text: "I run a lot of things. Nobody notices until something goes missing." },
        { who: "Noor", text: "Like crate six?" },
        { who: "Dana", text: "Especially crate six." },
        { sfx: "ice in a glass. a long pause." },
        { who: "Dana", text: "Nothing moves through this harbour without me knowing. That’s not a threat, sweetheart. It’s a tide table." },
        { who: "Noor", text: "And the Martha R.?" },
        { who: "Dana", text: "She’s my father’s boat. She goes out when I say." }
      ]
    },
    {
      id: "m4", title: "song idea", dur: "0:22", len: 22, meta: "Recorded in the car · Wednesday",
      lines: [
        { sfx: "rain on a windscreen. a hummed melody, four notes, then the same four notes." },
        { who: "Noor", text: "If I ever finish this, it’s for Jules. He’ll hate it." }
      ]
    }
  ],

  files: [
    {
      id: "manifest", name: "manifest_crate6.pdf", meta: "PDF · 184 KB", kind: "pdf", clue: "manifest",
      doc: {
        title: "NIGHT MANIFEST — MARTHA R.", sub: "ROE MARINE SERVICES · VESPER BAY",
        stamp: "COPY", rows: [["Crate", "6"], ["Contents", "Marine electronics (GPS / radar)"], ["Destination", "Martha R."], ["Departure", "05:00"], ["Signed", "D. Roe"]],
        note: "Gate 27 to remain locked until 05:00. No dock hands on the pier after 04:30.",
        sig: "D. Roe"
      }
    },
    {
      id: "insurance", name: "hull_insurance.pdf", meta: "PDF · 96 KB", kind: "pdf",
      doc: {
        title: "HULL & LIABILITY", sub: "ROE MARINE SERVICES LLC", stamp: "ACTIVE", rows: [["Vessel", "Martha R. (ex-Marguerite)"], ["Official no.", "1140227"], ["Insured", "Roe Marine Services LLC"], ["Named operator", "Dana Roe"], ["Cover", "Coastal / night running"]],
        note: "Premium paid quarterly. No claims in eleven years. The boat is old, insured, and always out at low tide.",
        sig: "Vesper Mutual"
      }
    },
    {
      id: "portfolio", name: "Noor_Haddad_portfolio.pdf", meta: "PDF · 4.2 MB", kind: "pdf",
      doc: {
        title: "NOOR HADDAD — SELECTED WORK", sub: "NORTHLINE · DOCUMENTARY", stamp: "2026", rows: [["Field", "Coastal labour"], ["Recent", "The Night Shift (in progress)"], ["Agent", "M. Vance"], ["Based", "Beirut / everywhere"]],
        note: "The series follows one harbour for one year. The last page is blank. She always leaves the last page blank until the story is finished.",
        sig: "N.H."
      }
    },
    {
      id: "tidepdf", name: "tide_table.pdf", meta: "PDF · 62 KB", kind: "pdf", red: true,
      doc: {
        title: "VESPER BAY — TIDE TABLE", sub: "OCTOBER · STATION 941", stamp: "PRINTED", rows: [["Fri 24", "Low 04:58 AM"], ["Fri 24", "High 11:12 AM"], ["Sat 25", "Low 05:41 AM"], ["Note", "Slack water 05:00"]],
        note: "Printed at the motel desk. Someone has circled 04:58 in pencil, twice.",
        sig: "—"
      }
    }
  ],

  web: {
    start: {
      title: "Start page", url: "surf://start",
      history: [
        { label: "how to report smuggling anonymously", page: "tips" },
        { label: "martha r vessel registry", page: "registry" },
        { label: "low tide vesper bay", page: "tides" },
        { label: "vesper bay marina slip map", page: "slips" },
        { label: "what does a bilge pump sound like", page: "bilge" }
      ]
    },
    pages: {
      slips: {
        title: "Marina — slip map", url: "vesperbay.gov/marina/slips",
        html: `
          <p class="webpage__kicker">Vesper Bay Port Authority</p>
          <h1>Marina slip map</h1>
          <p>Transient and commercial berths, north basin. Gate access is fob-only outside office hours.</p>
          <table>
            <tr><th>Slip</th><th>Berth</th><th>Gate</th><th>Notes</th></tr>
            <tr><td><strong>4-B</strong></td><td>North basin, end tie</td><td><strong>27</strong></td><td>Deep draft. Commercial only.</td></tr>
            <tr><td>4-A</td><td>North basin</td><td>27</td><td>Seasonal.</td></tr>
            <tr><td>5-C</td><td>South basin</td><td>31</td><td>Fuel dock.</td></tr>
          </table>
          <div class="webpage__banner">Gate 27 is locked between 22:00 and 05:00. Fobs are issued to berth holders only. The gate is opened for the 05:00 tide.</div>
          <p>The boathouse at Pier 9 is not a public building. Access is restricted to lease holders and harbour staff.</p>
          <p class="webpage__foot">Last updated 14 Oct · Port Authority of Vesper Bay</p>`
      },
      registry: {
        title: "Vessel registry — MARTHA R.", url: "wa.gov/vessels/1140227",
        html: `
          <p class="webpage__kicker">State vessel registry</p>
          <h1>MARTHA R.</h1>
          <table>
            <tr><th>Official number</th><td><strong>1140227</strong></td></tr>
            <tr><th>Vessel type</th><td>Commercial fishing / coastal</td></tr>
            <tr><th>Registered owner</th><td><strong>Roe Marine Services LLC</strong></td></tr>
            <tr><th>Named operator</th><td><strong>D. Roe</strong></td></tr>
            <tr><th>Home port</th><td>Vesper Bay, WA</td></tr>
            <tr><th>Status</th><td>Active — night running permitted</td></tr>
          </table>
          <div class="webpage__banner">Owner address on file: 14 Gull Row, Vesper Bay. Correspondence to the registered agent only.</div>
          <p class="webpage__foot">Extract generated 24 Oct · Registry data is public record</p>`
      },
      tips: {
        title: "Report a concern", url: "vesperbay.gov/tips",
        html: `
          <p class="webpage__kicker">Vesper Bay Harbour Patrol</p>
          <h1>Report a concern</h1>
          <p>Use this form for non-emergency reports about harbour activity: unlicensed mooring, night running, unlisted cargo, or unsafe conduct on the pier.</p>
          <p><strong>Response time: 3–5 business days.</strong> For anything happening now, call 911.</p>
          <div class="webpage__banner">Please include a vessel name, a berth number, and a time. Reports without a vessel name cannot be actioned.</div>
          <p>Anonymous reports are accepted. They are also, in our experience, the least useful.</p>
          <p class="webpage__foot">Harbour Patrol · Pier 3 · Non-emergency line 555-0140</p>`
      },
      tides: {
        title: "Tides — Vesper Bay", url: "noaa.gov/tides/941",
        html: `
          <p class="webpage__kicker">NOAA · Station 941</p>
          <h1>Vesper Bay tides</h1>
          <table>
            <tr><th>Time</th><th>Height</th><th>Note</th></tr>
            <tr><td>02:10</td><td>1.8 ft</td><td>—</td></tr>
            <tr><td>03:20</td><td>0.9 ft</td><td>Falling</td></tr>
            <tr><td><strong>04:58</strong></td><td><strong>-0.4 ft</strong></td><td><strong>Low tide</strong></td></tr>
            <tr><td>05:00</td><td>-0.4 ft</td><td>Slack water</td></tr>
          </table>
          <div class="webpage__banner">Small craft advisory until 06:00. Inlet restricted to commercial traffic. Night running at low tide is not recommended.</div>
          <p class="webpage__foot">Predictions are not guarantees. The sea does what it likes.</p>`
      },
      bilge: {
        title: "What does a bilge pump sound like?", url: "forum.boats/threads/8812",
        html: `
          <p class="webpage__kicker">The Hull Truth · forum archive</p>
          <h1>What does a bilge pump sound like when it’s running dry?</h1>
          <p>Asked by <em>northbay_nick</em>, 2019.</p>
          <p>A dry bilge pump makes a hollow, rhythmic knock — like someone tapping a plastic bucket with two fingers, then a long whine. You hear it through the hull before you hear it in the cabin.</p>
          <p>If you can hear it from the dock, the boat is either old, angry, or both.</p>
          <p class="webpage__foot">17 replies · last post 2021</p>`
      }
    }
  },

  mapPins: [
    { id: "motel", name: "Vesper Motel", x: 66, y: 68, tone: "cool", meta: "Room 6 · night desk", text: "A twelve-room motel with a neon sign and a desk that faces the car park. Your shift ends at six." },
    { id: "pier", name: "Pier 9 · boathouse", x: 31, y: 42, tone: "cool", meta: "Starred · 5 min walk", text: "Noor starred this before she left. Dropped pin note: “camera bag.” One lit window, low tide access." },
    { id: "gate", name: "Gate 27 / Slip 4-B", x: 42, y: 55, tone: "hot", meta: "Locked 22:00–05:00", text: "The north basin gate. Opened for the 05:00 tide. The Martha R. is berthed at the end tie." },
    { id: "dana", name: "14 Gull Row", x: 79, y: 31, tone: "warm", meta: "Registered agent", text: "A narrow house behind the harbour office. A truck is parked outside with its lights off." }
  ],

  recipes: [
    { title: "Tuna, for one", emoji: "🐟", time: "1 min", a: "#7a4a2a", b: "#2e1b10", text: "One tin. One fork. Eat it standing up while the cat watches. Do not share." },
    { title: "Motel coffee", emoji: "☕", time: "4 min", a: "#6b4f2f", b: "#2c2115", text: "One sachet, two sugars, the little carton of milk that never opens cleanly. Best drunk looking at the rain." },
    { title: "Rainy-day noodles", emoji: "🍜", time: "8 min", a: "#8a4a3a", b: "#3a1a14", text: "Instant noodles, an egg, too much chilli. Jules says this is not cooking. Jules is wrong." },
    { title: "Toast, technically", emoji: "🍞", time: "3 min", a: "#8a6a3a", b: "#3a2a14", text: "Bread, butter, the motel toaster that only browns one side. Turn it over. Be patient." },
    { title: "Something warm", emoji: "🥣", time: "12 min", a: "#6a7a4a", b: "#2a321a", text: "Mum’s lentil soup, approximately. She refuses to write it down. This is the closest she got." },
    { title: "Leftovers", emoji: "🥡", time: "2 min", a: "#5a4a6a", b: "#241a2e", text: "Whatever is in the fridge. Eat it cold. The tide is not waiting." }
  ],

  tracks: [
    { name: "Marina Lights", artist: "The Breakwater", len: "3:42" },
    { name: "Salt & Diesel", artist: "Low Hymn", len: "4:12" },
    { name: "Kitchen Door", artist: "Miso", len: "2:08" },
    { name: "Cold Water", artist: "Night Ferry", len: "5:11" },
    { name: "The Martha R.", artist: "D. Roe", len: "3:03" }
  ]
};

const CLUES = [
  { id: "pier", n: 1, label: "Last seen", detail: "Jules’s thread: Pier 9, a blue van, crate 6. Then silence.", x: 2, y: 2, rot: -1.6 },
  { id: "photo1147", n: 2, label: "The 11:47 photograph", detail: "Crate 6, the Martha R., a figure turning away.", x: 26.5, y: 12, rot: 1.1 },
  { id: "van", n: 3, label: "The van", detail: "Blue cargo van in the car park. Plate VB 27-4.", x: 51, y: 2, rot: -0.8 },
  { id: "danaBoat", n: 4, label: "Roe Marine", detail: "The Martha R. is registered to Dana Roe.", x: 75.5, y: 13, rot: 1.5 },
  { id: "threat", n: 5, label: "Dana’s voice", detail: "“You understand why you’re staying the night.”", x: 2, y: 37, rot: 1.2 },
  { id: "manifest", n: 6, label: "Crate 6", detail: "On the night manifest for the Martha R., 05:00.", x: 26.5, y: 47, rot: -1.2 },
  { id: "boathouse", n: 7, label: "Pier 9 boathouse", detail: "Low tide 4:58. The boat leaves at five.", x: 51, y: 37, rot: 0.9 },
  { id: "locker", n: 8, label: "Locker B-14", detail: "Blue lockers at the marina. One door open.", x: 75.5, y: 47, rot: -1.4 },
  { id: "story", n: 9, label: "The story", detail: "Noor was documenting the night manifests.", x: 2, y: 72, rot: -0.9 },
  { id: "lockerCode", n: 10, label: "Code 1189", detail: "Noor’s locker. Her camera card is inside.", x: 26.5, y: 82, rot: 1.6 },
  { id: "findmy", n: 11, label: "Find My", detail: "Noor’s camera last seen at Pier 9, 11:47 PM.", x: 51, y: 72, rot: 1.1 },
  { id: "call", n: 12, label: "The call", detail: "Dana knows someone at the desk has the phone.", x: 75.5, y: 82, rot: -1.1 }
];

const CLUE_PAIRS = [
  ["threat", "pier"],
  ["threat", "photo1147"],
  ["photo1147", "locker"],
  ["locker", "lockerCode"],
  ["boathouse", "lockerCode"],
  ["van", "danaBoat"],
  ["story", "manifest"],
  ["findmy", "boathouse"],
  ["pier", "call"]
];

const ENDINGS = {
  dryland: {
    stamp: "Case closed", title: "Dry Land",
    lede: "The harbour patrol reaches the boathouse at 4:51, seven minutes before the Martha R. is due to slip.",
    body: [
      "Noor is in the tackle room, sitting on a crate of stolen GPS units with her hands tied to a shelf. Cold, furious, entirely alive. The patrol cuts her loose at 4:56.",
      "Dana is arrested on the dock with the manifest in her coat pocket. Crate 6 is still on the pier. The Martha R. never leaves the inlet.",
      "The photograph runs on the front page of Northline under the headline THE NIGHT SHIFT. Jules sends the motel one text, at 6:12 AM: a photo of Miso asleep on Noor’s hospital blanket."
    ],
    quote: { text: "You answered a phone that wasn’t yours. That’s the whole story.", cite: "Jules Haddad" }
  },
  longway: {
    stamp: "Case open", title: "The Long Way Home",
    lede: "Jules reaches the boathouse first. Noor is alive. By the time anyone official arrives, Dana is already out past the breakwater.",
    body: [
      "You send Jules the photograph and the locker number. He calls the harbour patrol on the way, but he does not wait for them.",
      "Noor is found at 4:47, half-frozen, leaning against the door. Jules carries her to the truck. The two of them sit in the car park with the heater on until the sky goes grey.",
      "The photograph keeps the case alive for a month. The Martha R. is found empty at a dock in Astoria. Dana is not on it. The file stays open, and every so often Noor texts you a picture of the sea."
    ],
    quote: { text: "Next time, call Jules first. He’s faster.", cite: "Noor Haddad, 6:02 AM" }
  },
  statement: {
    stamp: "Inconclusive", title: "Statement",
    lede: "You call the harbour patrol. They are polite. Without a location they can act on, the boathouse is just a locked building on a pier.",
    body: [
      "The constable takes your name, the guest’s name, and the name of the boat. She says someone will check the marina at first light. First light is 7:04.",
      "Noor is found at 5:40 on the mudflats below Pier 9, hypothermic, alive, and unable to say how she got there. The boathouse was searched at 6:20. It was empty.",
      "Dana gives a statement at eight. She is helpful. She makes tea. The Martha R. is gone, and so is crate 6, and the report is three lines long."
    ],
    quote: { text: "Next time, lead with the boat.", cite: "Desk sergeant, Vesper Bay" }
  },
  static: {
    stamp: "Case collapsed", title: "Static",
    lede: "You call both of them. The file is thin: one photograph you cannot authenticate, one voice memo with no chain of custody, and a motel key.",
    body: [
      "The patrol goes to Pier 9 at 3:10. The boathouse is locked. Dana opens it herself, cheerful in a raincoat, and shows them an empty room, a coil of rope, and a copy of the tide table.",
      "Noor is found at dawn, walking up the hard shoulder of the coast road. She is alive. She is also, the report notes, “uncooperative.”",
      "The photograph is excluded. The memo cannot be traced to a device. Dana is questioned for forty minutes and released. By Friday the motel has a new day clerk, and the old one has a boat with a fresh coat of paint."
    ],
    quote: { text: "A photograph is not a witness.", cite: "M. Vance, Northline" }
  },
  undertow: {
    stamp: "Cold case", title: "Undertow", cold: true,
    lede: "You text Dana. She thanks you for being reasonable.",
    body: [
      "At 5:00 the Martha R. slips the inlet on the last of the tide. The rain closes over the harbour like a lid.",
      "In the morning the guest in room 6 has still not checked out. Her bag is by the bed, her toothbrush is dry, and the balcony door is wide open.",
      "The phone stays on the desk until Monday. Then it goes in the drawer with the umbrella nobody claimed and the keys to a car that isn’t in the car park. Sometimes, late, it lights up with a message from an unknown number."
    ],
    quote: { text: "Goodnight.", cite: "Unknown number, 3:03 AM" }
  },
  lowtide: {
    stamp: "Cold case", title: "Low Tide", cold: true,
    lede: "You put the phone back in the drawer.",
    body: [
      "Dana collects it at 6:40 with a smile and a comment about forgetful guests. She drops it into her coat pocket. It does not ring again.",
      "At 5:00 the Martha R. left on the tide. At 7:40 the ferry left without a passenger named Noor Haddad. On Tuesday the room was cleared and the sheets were burned.",
      "The case stays open for eleven days. Then it becomes a folder, and then a box, and then a line in a database that nobody reads. The desk light stays on all night, every night, in case someone comes back for it."
    ],
    quote: { text: "Some nights, the desk light stays on.", cite: "Night clerk’s log" }
  }
};

const MAP_ART = `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="mapSea" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c2630"/><stop offset="1" stop-color="#081820"/>
    </linearGradient>
    <linearGradient id="mapLand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#14241f"/><stop offset="1" stop-color="#0c1714"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#mapSea)"/>
  <g stroke="#16343c" stroke-width="1" opacity=".7">
    <path d="M0 30h400M0 70h400M0 110h400M0 150h400M0 190h400M0 230h400M0 270h400"/>
    <path d="M30 0v300M70 0v300M110 0v300M150 0v300M190 0v300M230 0v300M270 0v300M310 0v300M350 0v300"/>
  </g>
  <path d="M0 300V0h152c10 18 4 34 16 48 14 16 44 18 54 38 12 22-4 40 8 58 10 16 34 20 40 42 5 18-6 38 4 58 6 12 20 22 30 36v20Z" fill="url(#mapLand)"/>
  <path d="M152 0c10 18 4 34 16 48 14 16 44 18 54 38 12 22-4 40 8 58 10 16 34 20 40 42 5 18-6 38 4 58 6 12 20 22 30 36" fill="none" stroke="#2b514e" stroke-width="2" opacity=".7"/>
  <g fill="#12302c" opacity=".7">
    <rect x="190" y="42" width="46" height="26" rx="2"/><rect x="244" y="60" width="36" height="22" rx="2"/>
    <rect x="200" y="110" width="54" height="30" rx="2"/><rect x="270" y="120" width="42" height="26" rx="2"/>
    <rect x="228" y="176" width="60" height="34" rx="2"/><rect x="306" y="180" width="40" height="24" rx="2"/>
    <rect x="188" y="230" width="44" height="26" rx="2"/>
  </g>
  <g stroke="#3a4a42" stroke-width="5" fill="none" opacity=".8">
    <path d="M170 30h90l30 40 20 90 40 60"/>
    <path d="M160 240h80l40-40 50 20"/>
    <path d="M300 20v120l40 40"/>
  </g>
  <g stroke="#5b7a70" stroke-width="1.5" fill="none" opacity=".5">
    <path d="M170 30h90l30 40 20 90 40 60"/>
    <path d="M160 240h80l40-40 50 20"/>
  </g>
  <path d="M90 128h52v6H90Z" fill="#1b3234"/>
  <path d="M90 128v52M142 128v52M110 134v40M128 134v40" stroke="#1b3234" stroke-width="5"/>
  <path d="M88 170h56v18H88Z" fill="#16282a"/>
  <g font-family="'JetBrains Mono', monospace" font-size="6" fill="#6f8b84" letter-spacing="1">
    <text x="196" y="38">GULL ROW</text>
    <text x="268" y="112">HARBOUR RD</text>
    <text x="120" y="88">VESPER BAY</text>
    <text x="236" y="222">TOWN</text>
    <text x="30" y="30" fill="#2f5258">NORTH BASIN</text>
    <text x="22" y="250" fill="#2f5258">INLET</text>
  </g>
  <g stroke="#f2b661" stroke-width="1.2" stroke-dasharray="3 4" fill="none" opacity=".55">
    <path d="M264 204c-40-10-70-20-96-44"/>
  </g>
  <circle cx="264" cy="204" r="4" fill="#7fd1c6"/>
  <circle cx="168" cy="160" r="4" fill="#ff7a6b"/>
  <circle cx="126" cy="127" r="4" fill="#f2b661"/>
</svg>`;
