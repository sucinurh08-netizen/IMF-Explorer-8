# AI_LOG — IMF Explorer: Jelajah Gaya Antarmolekul

Dokumentasi riwayat implementasi, perubahan kode, pengujian, dan keputusan teknis/pedagogis sesuai panduan **AGENTS.md**.

---

## Log Aktivitas: Pembuatan Halaman Beranda (Home Page)

- **Tanggal/Waktu**: 2026-10-24
- **Referensi Acuan**:
  - `dist/.agent/PRD.md` (FR-01 Home, FR-14 Penyimpanan Progres, Section 6 Prasyarat, Section 8 Alur 5E, Section 10 Persyaratan Konten Kimia, Section 11 Desain Antarmuka)
  - `dist/.agent/AGENT.md` (Teknologi React + Vite, Ketepatan Konsep Kimia, Batasan Teknis & Desain)

### 1. Analisis Kebutuhan (PRD FR-01)
Halaman Beranda dirancang sebagai pintu gerbang pembelajaran interaktif untuk peserta didik SMA/MA kelas XI (Fase F), yang mencakup:
1. **Identitas & Hero**:
   - Judul: "IMF Explorer: Jelajah Gaya Antarmolekul"
   - Badge kurikulum: Kimia SMA Kelas XI • Fase F (Kurikulum Merdeka)
   - Deskripsi konseptual menghubungkan tingkat makroskopik, submikroskopik, dan simbolik.
   - Tombol CTA dinamis: "Mulai Jelajah Kimia" (pengguna baru) atau "Lanjut Belajar: [Nama Modul]" (pengguna kembali).
2. **Simulasi Submikroskopik Interaktif (Hero Stage)**:
   - Visualisasi SVG interaktif untuk 4 konteks:
     - *Ikatan Hidrogen (H₂O)*: Membedakan ikatan kovalen intramolekul (garis solid) dengan ikatan hidrogen antarmolekul (garis putus-putus), menampilkan pasangan elektron bebas (PEB) dan muatan parsial $\delta^+/\delta^-$.
     - *Gaya Dipol-Dipol (HCl)*: Kontrol rotasi orientasi kutub molekul polar untuk mengamati komponen tarikan ($\delta^+\cdots\delta^-$) dan tolakan ($\delta^-\cdots\delta^-$).
     - *Gaya London (CH₄)*: Visualisasi 3 tahap: awan elektron simetris $\rightarrow$ dipol sesaat $\rightarrow$ dipol terinduksi pada molekul tetangga.
     - *Fenomena Air dan Minyak*: Lapisan makroskopik air dan minyak dengan penjelasan ketidakcocokan polaritas molekuler.
3. **Indikator Progres Belajar (`localStorage`)**:
   - Menggunakan key `imf_explorer_progress`.
   - Menampilkan persentase ketercapaian (dari 7 modul utama).
   - Menghitung jumlah modul selesai, kuis formatif, dan status evaluasi akhir.
   - Tombol "Reset Progres" yang dilengkapi dialog konfirmasi aman (`ResetConfirmModal`).
4. **Tiga Pilar Gaya Antarmolekul**:
   - Tiga kartu visual terstruktur: Gaya London, Gaya Dipol-Dipol, dan Ikatan Hidrogen.
   - Dilengkapi diagram mini, mekanisme, contoh molekul (CH₄, HCl, H₂O), dan faktor penentu.
5. **Alur Pembelajaran Siklus 5E (Roadmap 7 Modul)**:
   - Tahap 1 Engage: *Fenomena Air dan Minyak*
   - Tahap 2 Explore: *Pengantar Gaya Antarmolekul & Penguapan Air*
   - Tahap 3 Explain (1): *Gaya London (Dispersi)*
   - Tahap 3 Explain (2): *Gaya Dipol-Dipol*
   - Tahap 3 Explain (3): *Ikatan Hidrogen*
   - Tahap 4 Elaborate: *Perbandingan Gaya & Penerapan Titik Didih Hidrida*
   - Tahap 5 Evaluate: *Evaluasi Akhir 15 Soal & Rekomendasi Remedial*
   - Setiap kartu memiliki indikator status, catatan ilmiah bebas miskonsepsi, dan tombol aksi.
6. **Pengingat Prasyarat Pengetahuan (Prerequisites Refresher)**:
   - 5 topik: Atom & Molekul, Ikatan Kovalen Intramolekul, Keelektronegatifan Pauling, Kepolaran & Muatan Parsial, serta Struktur Lewis & PEB.
7. **Kerangka Tiga Tingkat Representasi Kimia**:
   - Menjelaskan hubungan Makroskopik, Submikroskopik, dan Simbolik.
8. **Footer & Privasi**:
   - Penjelasan transparansi penyimpanan lokal (`localStorage`) tanpa pengumpulan data pribadi ke luar.

---

### 2. File yang Dibuat dan Diperbarui

| File | Status | Keterangan |
|---|---|---|
| `src/types/curriculum.ts` | Diperiksa | Type definitions untuk `Stage5E`, `LearningModule`, `IMFProgress`, `PrerequisiteTopic`, `IMFTypeCard`. |
| `src/data/curriculumData.ts` | Diperbarui | Perbaikan `import type` untuk `verbatimModuleSyntax` TypeScript. |
| `src/utils/storage.ts` | Diperbarui | Perbaikan `import type`, fungsi baca/tulis `imf_explorer_progress`, reset progres, dan kalkulasi persentase. |
| `src/index.css` | Dibuat | Palet warna lengkap PRD (`#245B45`, `#39765A`, `#A8C3A0`, `#EAF2E6`, `#FAF7ED`, `#E9A15B`, `#F3D77A`, dll.), tipografi Outfit & Plus Jakarta Sans, layout responsif desktop/mobile, efek hover halus. |
| `src/components/Navbar.tsx` | Dibuat | Header sticky dengan logo molekuler, link navigasi, chip indikator progres, tombol reset cepat, dan CTA. |
| `src/components/InteractiveMoleculeHero.tsx` | Dibuat | Stage kanvas SVG interaktif di hero dengan 4 mode (H₂O, HCl, CH₄, Air-Minyak) dan kontrol dinamis. |
| `src/components/HeroSection.tsx` | Dibuat | Hero banner dengan badge kurikulum Fase F, judul, narasi, tombol CTA pintar, statistik cepat, dan stage molekuler. |
| `src/components/ProgressCard.tsx` | Dibuat | Kartu progres dengan circular gauge, status pengerjaan modul/kuis/evaluasi, tombol lanjutkan, dan tombol atur ulang. |
| `src/components/IMFOverview.tsx` | Dibuat | Kartu perbandingan 3 gaya antarmolekul dengan diagram mini dan detail ilmiah. |
| `src/components/LearningRoadmap.tsx` | Dibuat | Peta kurikulum 7 modul berdasarkan pendekatan 5E dengan catatan ilmiah pencegah miskonsepsi. |
| `src/components/PrerequisitesSection.tsx` | Dibuat | Kartu pengingat prasyarat konsep interaktif yang dapat diperluas. |
| `src/components/PedagogyBanner.tsx` | Dibuat | Penjelasan model 3 representasi kimia (Makro, Submikro, Simbolik). |
| `src/components/ResetConfirmModal.tsx` | Dibuat | Dialog konfirmasi reset data `localStorage` sesuai PRD FR-01. |
| `src/components/ModuleDetailModal.tsx` | Dibuat | Modal pratinjau modul, catatan ilmiah, dan tombol peluncuran belajar. |
| `src/components/Footer.tsx` | Dibuat | Identitas kurikulum, link modul, dan pernyataan privasi penyimpanan lokal. |
| `src/App.tsx` | Diperbarui | Integrasi seluruh komponen, sinkronisasi state dengan `localStorage`, sistem toast notifikasi. |
| `index.html` | Diperbarui | Judul halaman, meta deskripsi SEO, Google Fonts Outfit & Plus Jakarta Sans, bahasa Indonesia (`lang="id"`). |
| `public/favicon.svg` | Diperbarui | Ikon molekul kustom bertema ikatan kimia dengan palet warna produk. |

---

### 3. Hasil Pengujian & Verifikasi

1. **TypeScript & Build Production**:
   - Perintah: `npm run build` (`tsc -b && vite build`)
   - Hasil: **Berhasil tanpa error** (`dist/` tergenerasi dengan modul JavaScript 278 kB dan CSS 23 kB).
2. **Linter**:
   - Perintah: `npm run lint` (`oxlint`)
   - Hasil: **0 errors, 0 warnings** (semua aturan purity, no-unused-vars, dan react compiler terverifikasi bersih).
3. **Server Lokal**:
   - Perintah: `npm run dev`
   - Hasil: Server Vite aktif dan merespons `HTTP 200 OK` di `http://localhost:5174/`.
4. **Verifikasi Konten Kimia**:
   - Memastikan pembedaan jelas antara ikatan intramolekul kovalen dan gaya antarmolekul.
   - Memastikan catatan ilmiah menegaskan bahwa gaya London terjadi pada semua molekul (termasuk polar).
   - Memastikan ketidakcampuran air dan minyak dijelaskan melalui kepolaran dan interaksi molekuler, bukan semata massa jenis.
