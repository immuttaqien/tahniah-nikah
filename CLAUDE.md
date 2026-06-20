# CLAUDE.md

Panduan untuk Claude Code saat bekerja di repo ini.

## Apa ini

Website satu halaman (single-page) berisi **ucapan selamat & doa** dari Keluarga Besar PJ Persis Cintaasih (organisasi Islam: Persis, Persistri, Pemuda, Pemudi) untuk pernikahan **Nurul & Fahri**. Disebarkan via tautan WhatsApp, diakses terutama dari ponsel. Bahasa: **Indonesia**.

Tema visual: **Islami Elegan** — iluminasi manuskrip (gold leaf di atas hijau zamrud pekat), tanpa foto; keindahan dibawa oleh ornamen geometris Islam + kaligrafi.

## Dokumen sumber (baca dulu sebelum mengubah desain/scope)

- `docs/superpowers/specs/2026-06-17-website-ucapan-pernikahan-design.md` — **PRD lengkap** (scope, 5 section, arsitektur, skema Firebase bag. 7.3). Sumber kebenaran untuk fitur.
- `PRODUCT.md` — register (brand), user, prinsip desain strategis, anti-references.
- `DESIGN.md` — sistem visual: palet OKLCH, tipografi, ornamen, motion.

Jika mengubah perilaku/scope, perbarui PRD; jika mengubah sistem visual, perbarui DESIGN.md.

## Struktur

Saat ini seluruh prototipe ada di **satu file**: `index.html` (HTML + CSS inline + JS inline, self-contained, tinggal dibuka di browser).

PRD merencanakan pemisahan untuk produksi:

```
index.html · style.css · main.js · firebase-config.js · assets/ornaments/
```

Pisahkan hanya bila file sudah sulit dikelola; untuk sekarang single-file lebih praktis.

## 5 Section (urutan tetap)

1. **Hero** (`#top`) — bismillah, doa pernikahan (Arab + terjemahan), nama, tanggal (Ahad, 5 Juli 2026), bingkai mihrab.
2. **Ucapan Pimpinan** (`#pimpinan`) — quote card.
3. **Pesan 4 Divisi** (`#divisi`) — grid 2×2 (Persis, Persistri, Pemuda, Pemudi).
4. **Galeri Ornamen & Ayat** (`#ayat`) — QS Ar-Rum 21 + hadits, layout berselang-seling.
5. **Buku Tamu** (`#tamu`) — form + daftar pesan.

## Konvensi & aturan craft (penting — jangan dilanggar)

Desain ini sudah lolos review skill **impeccable** (register brand). Pertahankan:

- **Tipografi**: `Amiri` (Arab) · `Marcellus` (display/judul) · `EB Garamond` (body/kutipan) · `Mulish` (UI kecil). **Jangan** ganti ke Playfair/Cormorant/Inter/DM Sans (font default AI yang ditolak).
- **Warna**: pakai token CSS OKLCH di `:root` (`--green-*`, `--gold-*`, `--cream*`, `--sage*`). Jangan ciptakan warna baru di luar ramp ini. Teks tubuh pakai `--cream`/`--cream-dim` (kontras AA); `--sage` hanya untuk teks besar/label.
- **Penanda section**: frasa Arab kecil + ornamen bintang (`.marker`). **Jangan** tambah eyebrow uppercase berulang di tiap section.
- **Larangan**: side-stripe border (`border-left` >1px sebagai aksen), gradient text (`background-clip:text`), kartu radius >16px, glassmorphism dekoratif.
- **Motion**: ease-out (`--ease-out`). `.reveal` harus tetap **terlihat secara default**; state tersembunyi hanya aktif via `html.anim` (ditambahkan JS bila motion OK). Semua animasi wajib punya jalur `prefers-reduced-motion: reduce`. Jangan gating visibilitas konten murni pada JS/IntersectionObserver.
- **z-index**: pakai skala semantik (`--z-nav`, `--z-cue`, `--z-toast`), bukan angka acak.

## Konten yang masih placeholder (ganti dengan teks resmi)

- Ucapan Pimpinan: `[ Nama Ketua ]` + isi kutipan (CONTOH).
- Tiap kartu divisi: `[ Ketua Persis/Persistri/Pemuda/Pemudi ]` + isi pesan (CONTOH).
- Verifikasi ulang teks Arab (doa, ayat, hadits) dengan mushaf/sumber sahih sebelum rilis.

## Buku Tamu — status & TODO produksi

Prototipe memakai **localStorage** (seed contoh) agar bisa dicoba offline. Untuk produksi:

- Cari komentar `//=== FIREBASE INTEGRATION POINT ===` di `index.html`.
- Ganti `loadMessages()` → listener `ref('guestbook').on('value', ...)`.
- Ganti `saveMessage()` → `ref('guestbook').push({nama, divisi, pesan, timestamp})`.
- Struktur data + security rules ada di PRD bagian 7.3.
- Tambah `firebase-config.js` (jangan commit kredensial sensitif).
- Pertahankan escaping input (`esc()`) untuk cegah XSS pada pesan tamu.

## Verifikasi perubahan UI

Tidak ada build step. Buka `index.html` langsung, atau screenshot dengan Playwright:

```bash
npx playwright install chromium   # sekali saja
npx playwright screenshot --wait-for-timeout=3000 --viewport-size=1440,900 \
  "file://D:/Projects/nurul-fahri/index.html" shot.png
```

Selalu cek **desktop (1440px) dan mobile (390px)**. Untuk section ber-`.reveal`, scroll ke section dulu (atau tunggu >2.5s untuk failsafe) agar konten muncul saat di-screenshot. Hapus file screenshot setelah selesai (jangan di-commit).

## Deploy (rencana)

Static hosting: Netlify/Vercel free tier. Tidak ada backend selain Firebase Realtime DB. Sebarkan tautan via WhatsApp.
