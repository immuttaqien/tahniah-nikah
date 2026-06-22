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

/* ============ BACKGROUND MUSIC ============ */
const bgMusic = document.getElementById('bgMusic');
const audioToggle = document.getElementById('audioToggle');
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  bgMusic.volume = 0.5;
  bgMusic.play().then(() => {
    musicStarted = true;
    audioToggle.classList.remove('muted');
  }).catch(() => {
    // Autoplay blocked — keep muted state, will retry on next interaction
    audioToggle.classList.add('muted');
  });
}

// Try autoplay on first user interaction (browser policy requires gesture)
function onFirstInteraction() {
  startMusic();
  document.removeEventListener('click', onFirstInteraction);
  document.removeEventListener('touchstart', onFirstInteraction);
  document.removeEventListener('scroll', onFirstInteraction);
}
document.addEventListener('click', onFirstInteraction, { once: true });
document.addEventListener('touchstart', onFirstInteraction, { once: true });
document.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });

// Also try immediate autoplay
startMusic();

audioToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent triggering onFirstInteraction twice
  if (!musicStarted) {
    startMusic();
    return;
  }
  if (bgMusic.paused) {
    bgMusic.play();
    audioToggle.classList.remove('muted');
  } else {
    bgMusic.pause();
    audioToggle.classList.add('muted');
  }
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
    { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
  );
  reveals.forEach((el) => io.observe(el));
  addEventListener("load", () =>
    setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 2500)
  );
}

/* ============ GUESTBOOK (Firebase Realtime Database) ============ */
const gbList = document.getElementById("gbList");
const gbCount = document.getElementById("gbCount");
const gbRef = db.ref("guestbook");

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

// Listen for realtime updates from Firebase
gbRef.orderByChild("ts").on("value", (snapshot) => {
  const all = [];
  snapshot.forEach((child) => {
    all.push(child.val());
  });
  // Sort newest first
  all.sort((a, b) => b.ts - a.ts);
  gbList.innerHTML = "";
  all.forEach((m) => gbList.appendChild(msgEl(m, false)));
  gbCount.textContent = all.length;
});

function saveMessage(msg) {
  return gbRef.push(msg);
}

/* ============ SCROLL TO TOP ============ */
const scrollTopBtn = document.getElementById("scrollTop");
const toggleScrollTop = () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
};
addEventListener("scroll", toggleScrollTop, { passive: true });
toggleScrollTop();
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============ Form handling ============ */
const pesan = document.getElementById("pesan");
const cnt = document.getElementById("cnt");
pesan.addEventListener("input", () => (cnt.textContent = pesan.value.length));

const form = document.getElementById("gbForm");
const success = document.getElementById("gbSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama");
  const divisi = document.getElementById("selectDivisi").value;
  let ok = true;
  const fNama = document.getElementById("f-nama");
  const fPesan = document.getElementById("f-pesan");

  if (!nama.value.trim()) { fNama.classList.add("invalid"); ok = false; }
  else fNama.classList.remove("invalid");

  if (!pesan.value.trim()) { fPesan.classList.add("invalid"); ok = false; }
  else fPesan.classList.remove("invalid");

  if (!ok) return;

  const msg = { nama: nama.value.trim(), pesan: pesan.value.trim(), ts: Date.now(), divisi: divisi || "" };

  saveMessage(msg).then(() => {
    form.reset();
    cnt.textContent = "0";
    success.classList.add("show");
    setTimeout(() => success.classList.remove("show"), 3600);
  }).catch((err) => {
    console.error("Gagal menyimpan ucapan:", err);
    alert("Maaf, gagal mengirim ucapan. Silakan coba lagi.");
  });
});
