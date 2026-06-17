# Design

## Theme

Islami Elegan — iluminasi manuskrip: gold leaf di atas hijau zamrud pekat. Dark theme (suasana khusyuk, agung). Color strategy: **Drenched** — permukaan hijau pekat membawa identitas; emas sebagai aksen mulia.

## Color Palette (OKLCH)

| Role | Token | Value | Note |
|---|---|---|---|
| Latar terdalam | `--green-950` | `oklch(0.20 0.03 158)` ≈ #08160d | footer / hero base |
| Latar utama | `--green-900` | `oklch(0.27 0.045 158)` ≈ #0f2419 | |
| Latar surface | `--green-800` | `oklch(0.32 0.05 158)` ≈ #163524 | kartu |
| Latar terang | `--green-700` | `oklch(0.40 0.06 157)` ≈ #1f4a32 | |
| Emas | `--gold` | `oklch(0.78 0.13 85)` ≈ #d4af37 | aksen utama |
| Emas terang | `--gold-light` | `oklch(0.86 0.10 88)` ≈ #ecd28a | highlight kaligrafi |
| Teks utama | `--cream` | `oklch(0.94 0.03 90)` ≈ #f4ecd6 | body, ≥4.5:1 di green-900 |
| Teks tenang | `--cream-dim` | `oklch(0.82 0.035 92)` ≈ #d8caa6 | sekunder |
| Sage (label besar) | `--sage` | `oklch(0.74 0.04 150)` ≈ #a6c2ac | hanya teks besar/label, bukan body |

Kontras: body memakai `--cream`/`--cream-dim` (lolos AA di latar hijau). Sage hanya untuk teks ≥18px.

## Typography

Tiga keluarga, tiap satu peran jelas (menghindari reflex Playfair/Cormorant):

- **Arabic — `Amiri`** (naskh): seluruh teks Arab (bismillah, doa, ayat, kaligrafi). Jangkar visual.
- **Display — `Marcellus`**: nama mempelai & judul section. Berakar pada inskripsi klasik (Trajan-esque) — agung, terukir, bermartabat. Bukan font reflex.
- **Body & kutipan — `EB Garamond`**: terjemahan, pesan, kutipan; punya italic sejati yang anggun. Klasik, terbaca, non-reflex.
- **UI micro — `Mulish`**: hanya untuk chrome kecil (nav, label form, tombol, kapsul) demi keterbacaan netral.

Scale: fluid `clamp()`, rasio ≥1.25. Nama hero clamp max ≤6rem. Letter-spacing display ≥ -0.02em (tidak terlalu rapat). Light-on-dark: line-height +0.05–0.1.

## Ornaments / Imagery

Tanpa foto. "Imagery" = SVG geometris Islam buatan sendiri:
- Pola khatam (bintang 8) sebagai tekstur latar (opacity ≤0.06).
- Bingkai lengkung mihrab pada hero.
- Ornamen pemisah arabesque & medali bintang pada section ayat.
- Garis emas gradien sebagai divider (tanpa gradient-text).

## Components

- **Section marker**: BUKAN eyebrow uppercase berulang. Memakai frasa Arab kecil + ornamen sebagai penanda — kultural, bukan AI grammar.
- **Quote pimpinan**: bingkai penuh + ornamen tanda kutip / medali. TANPA side-stripe border-left.
- **Kartu divisi**: border penuh tipis emas, latar tint hijau, hover angkat halus. radius ≤14px.
- **Buku tamu**: avatar inisial emas, kartu pesan border penuh, form dengan focus ring emas.

## Motion

Ease-out-expo. Page-load choreography pada hero (stagger). Scroll-reveal halus yang **menambah** keadaan default yang sudah terlihat (tidak menyembunyikan konten). Semua animasi punya alternatif `prefers-reduced-motion: reduce` (crossfade/instant).
