/* ============================================================
   Website Ucapan Pernikahan Nurul & Fahri
   Logika interaksi: theme toggle, nav scroll, reveal, guestbook
   ============================================================ */

/* ============ THEME TOGGLE ============ */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  try { localStorage.setItem('nf_theme', isDark ? 'dark' : 'light'); } catch(e) {}
});

/* ============ NAV scroll state ============ */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ============ Scroll reveal (enhances an already-visible default) ============ */
const reveals = document.querySelectorAll(".reveal");
if (
  matchMedia("(prefers-reduced-motion: no-preference)").matches &&
  "IntersectionObserver" in window
) {
  document.documentElement.classList.add("anim");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  reveals.forEach((el) => io.observe(el));
  addEventListener("load", () =>
    setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 2500)
  );
}

/* ============ GUESTBOOK ============ */
/* === FIREBASE INTEGRATION POINT ===
   Produksi: ganti loadMessages()/saveMessage() dengan Firebase Realtime DB
     loadMessages() -> ref('guestbook').on('value', ...)
     saveMessage()  -> ref('guestbook').push({nama, divisi, pesan, timestamp})
   Struktur data & rules ada di PRD bagian 7.3. */

const STORE_KEY = "nf_guestbook";
const SEED = [
  { nama: "Ust. Abdurrahman", divisi: "Persis",
    pesan: "Barakallahu lakuma wa baraka alaikuma. Semoga menjadi keluarga dakwah yang diberkahi.",
    ts: Date.now() - 1000 * 60 * 60 * 26 },
  { nama: "Siti Maryam", divisi: "Persistri",
    pesan: "Selamat ananda Nurul, semoga menjadi istri salehah penyejuk hati. Aamiin.",
    ts: Date.now() - 1000 * 60 * 60 * 9 },
  { nama: "Rizki Hidayat", divisi: "Pemuda",
    pesan: "Tahniah akhi Fahri! Semoga sakinah mawaddah warahmah sampai jannah.",
    ts: Date.now() - 1000 * 60 * 48 },
  { nama: "Aisyah Nur", divisi: "Pemudi",
    pesan: "Masyaa Allah, turut berbahagia. Semoga langgeng dan penuh keberkahan ya kak Nurul.",
    ts: Date.now() - 1000 * 60 * 12 },
];

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try { localStorage.setItem(STORE_KEY, JSON.stringify(SEED)); } catch (e) {}
  return [...SEED];
}

function saveMessage(msg) {
  try {
    const all = loadMessages();
    all.push(msg);
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  } catch (e) {}
}

const gbList = document.getElementById("gbList");
const gbCount = document.getElementById("gbCount");

const initials = (name) => {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || "") + (p[1]?.[0] || p[0]?.[1] || "")).toUpperCase();
};

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "Baru saja";
  if (s < 3600) return Math.floor(s / 60) + " menit lalu";
  if (s < 86400) return Math.floor(s / 3600) + " jam lalu";
  return Math.floor(s / 86400) + " hari lalu";
}

const esc = (t) => {
  const d = document.createElement("div");
  d.textContent = t;
  return d.innerHTML;
};

function msgEl(m, isNew) {
  const el = document.createElement("div");
  el.className = "gb-msg" + (isNew ? " gb-new" : "");
  el.innerHTML = `
    <div class="avatar">${esc(initials(m.nama))}</div>
    <div class="body">
      <div class="meta">
        <span class="nm">${esc(m.nama)}</span>
        ${m.divisi ? `<span class="dv">${esc(m.divisi)}</span>` : ""}
        <span class="tm">${timeAgo(m.ts)}</span>
      </div>
      <p class="txt">${esc(m.pesan)}</p>
    </div>`;
  return el;
}

function render() {
  const all = loadMessages().sort((a, b) => b.ts - a.ts);
  gbList.innerHTML = "";
  all.forEach((m) => gbList.appendChild(msgEl(m, false)));
  gbCount.textContent = all.length;
}
render();

/* ============ Form handling ============ */
const pesan = document.getElementById("pesan");
const cnt = document.getElementById("cnt");
pesan.addEventListener("input", () => (cnt.textContent = pesan.value.length));

const form = document.getElementById("gbForm");
const success = document.getElementById("gbSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama");
  const divisi = document.getElementById("divisi").value;
  let ok = true;
  const fNama = document.getElementById("f-nama");
  const fPesan = document.getElementById("f-pesan");

  if (!nama.value.trim()) { fNama.classList.add("invalid"); ok = false; }
  else fNama.classList.remove("invalid");

  if (!pesan.value.trim()) { fPesan.classList.add("invalid"); ok = false; }
  else fPesan.classList.remove("invalid");

  if (!ok) return;

  const msg = { nama: nama.value.trim(), divisi, pesan: pesan.value.trim(), ts: Date.now() };
  saveMessage(msg);
  gbList.prepend(msgEl(msg, true));
  gbCount.textContent = loadMessages().length;
  form.reset();
  cnt.textContent = "0";
  success.classList.add("show");
  setTimeout(() => success.classList.remove("show"), 3600);
});
