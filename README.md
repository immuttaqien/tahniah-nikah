# 💍 Website Ucapan Pernikahan Nurul & Fahri

Website satu halaman berisi ucapan selamat dan doa dari **Keluarga Besar PJ Persis Cintaasih** (Persis, Persistri, Pemuda, Pemudi) untuk pernikahan **Nurul & Fahri** — Ahad, 5 Juli 2026.

Disebarkan via tautan WhatsApp, diakses terutama dari ponsel.

## ✨ Tema Visual

**Islami Elegan** — terinspirasi iluminasi manuskrip Islam (gold leaf di atas hijau zamrud). Tanpa foto; keindahan dibawa oleh ornamen geometris Islam, kaligrafi Arab, dan tipografi serif elegan.

## 📄 Konten (5 Section)

1. **Hero** — Bismillah, doa pernikahan (Arab + terjemahan), nama mempelai, tanggal, bingkai mihrab
2. **Ucapan Pimpinan** — Quote card dari Ketua PJ Persis Cintaasih
3. **Pesan 4 Divisi** — Grid kartu dari Persis, Persistri, Pemuda, Pemudi
4. **Doa & Ayat** — QS. Ar-Rum 21, hadits pernikahan, ornamen geometris
5. **Buku Tamu** — Form interaktif + daftar ucapan real-time

## 🗂 Struktur File

```
nurul-fahri/
├── index.html                  # Halaman utama
├── assets/
│   ├── css/
│   │   └── style.css           # Seluruh gaya visual
│   ├── js/
│   │   ├── main.js             # Logika interaksi (theme, nav, reveal, guestbook)
│   │   └── firebase-config.js  # Konfigurasi Firebase (placeholder)
│   └── ornaments/              # SVG ornamen terpisah (jika diperlukan)
├── docs/                       # Dokumentasi & spesifikasi
├── CLAUDE.md                   # Panduan untuk AI assistant
├── DESIGN.md                   # Sistem visual (palet, tipografi, ornamen)
└── PRODUCT.md                  # Register brand & prinsip desain
```

## 🚀 Menjalankan

Tidak ada build step. Cukup buka `index.html` di browser:

```bash
# Opsi 1: Buka langsung
start index.html

# Opsi 2: Pakai live server (recommended untuk development)
npx serve .
```

## 🎨 Tipografi

| Peran | Font |
|-------|------|
| Kaligrafi Arab | Amiri |
| Display / Judul | Marcellus |
| Body / Kutipan | EB Garamond |
| UI / Label | Mulish |

## 🌙 Fitur

- **Dark/Light mode** — toggle di navigasi, preferensi tersimpan di localStorage
- **Scroll reveal** — animasi halus saat section masuk viewport (respects `prefers-reduced-motion`)
- **Buku tamu** — form validasi + daftar ucapan (localStorage untuk prototipe)
- **Responsif** — mobile-first, tampil baik di 390px hingga 1440px+

## 🔥 Integrasi Firebase (Produksi)

Buku tamu saat ini memakai localStorage sebagai prototipe. Untuk produksi:

1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan Realtime Database
3. Isi konfigurasi di `assets/js/firebase-config.js`
4. Uncomment script Firebase SDK di `index.html`
5. Terapkan security rules (lihat [PRD bagian 7.3](docs/superpowers/specs/2026-06-17-website-ucapan-pernikahan-design.md))

## 🌐 Deploy

Target hosting: **Netlify** atau **Vercel** (free tier). Static site, tidak ada backend selain Firebase Realtime DB.

```bash
# Deploy ke Netlify via CLI
npx netlify deploy --prod --dir .
```

## 📝 Konten Placeholder

Beberapa teks masih perlu diganti dengan konten resmi dari organisasi:

- `[ Nama Ketua ]` — Ucapan Pimpinan
- `[ Ketua Persis / Persistri / Pemuda / Pemudi ]` — Kartu divisi
- Verifikasi teks Arab dengan mushaf/sumber sahih sebelum rilis

## 📜 Lisensi

Proyek internal Keluarga Besar PJ Persis Cintaasih.
