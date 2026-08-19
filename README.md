# 💍 Website Ucapan Pernikahan

Website satu halaman berisi ucapan selamat dan doa dari **Keluarga Besar PJ Persis Cintaasih** (Persis, Persistri, Pemuda, Pemudi) untuk pernikahan **Nurul & Fahri** — Ahad, 5 Juli 2026.

Disebarkan via tautan WhatsApp, diakses terutama dari ponsel.

## ✨ Tema Visual

**Islami Elegan** — terinspirasi iluminasi manuskrip Islam (gold leaf di atas hijau zamrud). Tanpa foto; keindahan dibawa oleh ornamen geometris Islam, kaligrafi Arab, dan tipografi serif elegan.

## 📄 Konten (5 Section)

1. **Hero** — Bismillah, doa pernikahan (Arab + terjemahan), nama mempelai, tanggal, bingkai mihrab
2. **Ucapan Pimpinan** — Quote card dari Ketua PJ Persis Cintaasih
3. **Pesan 4 Divisi** — Grid kartu dari Persis, Persistri, Pemuda, Pemudi
4. **Doa & Ayat** — QS. Ar-Rum 21, hadits pernikahan, ornamen geometris
5. **Buku Tamu** — Form interaktif + daftar ucapan real-time (Firebase)

## 🗂 Struktur File

```
nurul-fahri/
├── index.html                          # Halaman utama
└── assets/
    ├── css/
    │   └── style.css                   # Seluruh gaya visual
    ├── js/
    │   ├── main.js                     # Logika interaksi (theme, audio, nav, reveal, guestbook)
    │   ├── firebase-config.example.js  # Template konfigurasi Firebase (commit)
    │   └── firebase-config.js          # Konfigurasi asli — gitignored, buat sendiri
    ├── ornaments/                      # SVG ornamen terpisah (jika diperlukan)
    └── audio/
        └── lagu-pernikahan.mp3         # Background music — gitignored, sediakan sendiri (lisensi belum dikonfirmasi)
```

> `docs/`, `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md` adalah dokumen kerja internal dan sengaja di-gitignore — tidak muncul di clone publik repo ini.

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
- **Background music** — autoplay dengan tombol mute/unmute di navigasi
- **Scroll reveal** — animasi halus saat section masuk viewport (respects `prefers-reduced-motion`)
- **Scroll to top** — floating button muncul setelah scroll 400px
- **Buku tamu real-time** — form validasi + daftar ucapan via Firebase Realtime Database
- **Responsif** — mobile-first, tampil baik di 390px hingga 1440px+

## 🔥 Integrasi Firebase

Buku tamu menggunakan Firebase Realtime Database untuk menyimpan dan menampilkan ucapan secara real-time.

### Setup:

1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan Realtime Database (region: `asia-southeast1`)
3. Copy `assets/js/firebase-config.example.js` menjadi `assets/js/firebase-config.js` dan isi dengan nilai asli dari Firebase Console (`firebase-config.js` sudah di-gitignore, tidak akan ter-commit)
4. Terapkan security rules di Firebase Console → Database → Rules:

```json
{
  "rules": {
    "guestbook": {
      ".read": true,
      ".write": true,
      "$entry": {
        ".validate": "newData.hasChildren(['nama', 'pesan', 'ts', 'divisi']) && newData.child('nama').isString() && newData.child('nama').val().length > 0 && newData.child('nama').val().length <= 40 && newData.child('pesan').isString() && newData.child('pesan').val().length > 0 && newData.child('pesan').val().length <= 300 && newData.child('ts').isNumber() && newData.child('divisi').isString() && newData.child('divisi').val().length <= 30"
      }
    }
  }
}
```

### Struktur Data:

```json
{
  "guestbook": {
    "-uniqueKey": {
      "nama": "Nama Pengirim",
      "divisi": "Persis",
      "pesan": "Barakallahu lakuma...",
      "ts": 1719100000000
    }
  }
}
```

## 🌐 Deploy

Target hosting: **Netlify** atau **Vercel** (free tier). Static site, tidak ada backend selain Firebase Realtime DB.

```bash
# Deploy ke Netlify via CLI
npx netlify deploy --prod --dir .
```

## 📝 Konten Placeholder

Beberapa bagian masih perlu diganti dengan konten resmi dari organisasi sebelum rilis:

- **Ucapan Pimpinan** (`index.html`, ditandai `<!-- CONTOH teks -->`) — masih kutipan generik, belum ucapan resmi Ketua PJ Persis Cintaasih
- **Pesan 4 Divisi** — section dinonaktifkan (dikomentari di `index.html`) sampai pesan resmi dari Persis, Persistri, Pemuda, Pemudi tersedia
- Verifikasi teks Arab dengan mushaf/sumber sahih sebelum rilis

## 📜 Lisensi

Proyek internal Keluarga Besar PJ Persis Cintaasih.
