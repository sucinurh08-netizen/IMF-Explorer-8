
# TECHNICAL DESIGN
# IMF Explorer: Jelajah Gaya Antarmolekul

**Versi Dokumen:** 1.0.0  
**Versi Produk:** 1.0.0  
**Status:** Technical Design Specification  
**Platform:** Web Application  
**Target Pengguna:** Siswa SMA/MA Kelas XI (Fase F)

---

# 1. Pendahuluan

## 1.1 Tujuan Dokumen

Dokumen ini menjelaskan rancangan teknis pengembangan aplikasi web pembelajaran IMF Explorer: Jelajah Gaya Antarmolekul.

Dokumen menjadi pedoman implementasi bagi AI Coding Agent maupun developer dalam membangun aplikasi berdasarkan kebutuhan yang telah ditetapkan pada `PRD.md`.

Rancangan teknis mencakup:

- Arsitektur aplikasi.
- Teknologi yang digunakan.
- Struktur direktori proyek.
- Sistem navigasi halaman.
- Rancangan komponen antarmuka.
- Pengelolaan state aplikasi.
- Penyimpanan progres menggunakan localStorage.
- Implementasi simulasi dan animasi molekuler.
- Sistem kuis dan evaluasi.
- Pengujian aplikasi.
- Standar kualitas kode.

## 1.2 Dokumen Acuan

Pengembangan aplikasi wajib mengacu pada dokumen berikut:

| Dokumen | Fungsi |
|---|---|
| PRD.md | Sumber utama kebutuhan dan spesifikasi produk. |
| AGENTS.md | Aturan kerja dan batasan bagi AI Coding Agent. |
| TECHNICAL_DESIGN.md | Panduan arsitektur dan implementasi teknis. |
| AI_LOG.md | Catatan perubahan, keputusan teknis, dan progres pengembangan. |

Apabila terdapat perbedaan antara dokumen, PRD.md menjadi acuan utama kebutuhan produk.

---

# 2. Gambaran Umum Sistem

## 2.1 Deskripsi Sistem

IMF Explorer merupakan aplikasi pembelajaran kimia berbasis Single Page Application (SPA) yang dibangun menggunakan React dan Vite.

Aplikasi memungkinkan siswa mempelajari gaya antarmolekul melalui:

1. Materi berbasis narasi ilmiah.
2. Visualisasi molekul berbasis SVG.
3. Animasi interaktif.
4. Simulasi manipulatif.
5. Kuis formatif.
6. Evaluasi akhir.
7. Penyimpanan progres pembelajaran.

Seluruh proses pembelajaran berjalan di sisi pengguna (client-side), tanpa memerlukan akun, autentikasi, maupun backend server.

## 2.2 Arsitektur Sistem

Aplikasi menggunakan arsitektur client-side dengan pembagian tanggung jawab sebagai berikut:

- Presentation Layer: menampilkan halaman dan komponen antarmuka.
- Application Layer: mengatur navigasi, interaksi, dan alur pembelajaran.
- Data Layer: mengelola materi, soal, hasil evaluasi, dan progres.
- Storage Layer: menyimpan progres pembelajaran menggunakan localStorage.

### Diagram Arsitektur

```text
              USER / SISWA
                    |
                    v
             WEB BROWSER
                    |
                    v
          REACT APPLICATION (SPA)
                    |
       +------------+------------+
       |            |            |
       v            v            v
 PRESENTATION   APPLICATION    DATA
    LAYER          LAYER       LAYER
       |            |            |
       |            |            |
  UI Components  Navigation   Materi Kimia
  Pages          Quiz Logic   Bank Soal
  SVG Visuals    Progress     Data Evaluasi
  Animations     Interaction  Feedback
       |            |            |
       +------------+------------+
                    |
                    v
              STORAGE LAYER
                    |
                    v
               localStorage
                    |
                    v
          imf_explorer_progress
```

## 2.3 Alur Kerja Sistem

1. Pengguna membuka aplikasi melalui browser.
2. React merender halaman beranda.
3. Aplikasi membaca data progres dari localStorage.
4. Pengguna memilih modul pembelajaran.
5. Sistem menampilkan materi dan visualisasi sesuai modul.
6. Pengguna melakukan interaksi dengan simulasi atau kuis.
7. Sistem memperbarui progres dan hasil kuis.
8. Data disimpan secara otomatis ke localStorage.
9. Setelah evaluasi akhir, sistem menghitung nilai dan menampilkan rekomendasi pembelajaran.

---

# 3. Teknologi yang Digunakan

## 3.1 Technology Stack

| Teknologi | Fungsi |
|---|---|
| React | Membangun antarmuka berbasis komponen. |
| Vite | Development server dan proses build aplikasi. |
| JavaScript (ES6+) | Logika aplikasi dan pengelolaan interaksi. |
| HTML5 | Struktur halaman. |
| CSS3 | Styling, layout, responsivitas, dan animasi. |
| SVG | Visualisasi molekul dan simulasi interaktif. |
| localStorage | Penyimpanan progres pembelajaran. |
| Git | Version control proyek. |

Catatan:
- Gunakan teknologi yang sudah tersedia pada proyek.
- Jangan menambahkan framework atau library baru tanpa kebutuhan yang jelas.
- Visualisasi molekul diutamakan menggunakan SVG dan CSS.
- Hindari penggunaan WebGL atau Three.js karena tidak termasuk ruang lingkup produk.

## 3.2 Prinsip Pemilihan Teknologi

Teknologi yang digunakan harus memenuhi prinsip:

1. Ringan dan mudah dijalankan melalui browser.
2. Mendukung tampilan responsif.
3. Mudah dikembangkan secara modular.
4. Tidak memerlukan server backend.
5. Mendukung visualisasi dan animasi interaktif.
6. Mudah dipelihara oleh developer maupun AI Coding Agent.

---

# 4. Struktur Direktori Proyek

Struktur direktori dirancang secara modular agar setiap fitur memiliki tanggung jawab yang jelas.

```text
imf-explorer/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── assets/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   └── LearningLayout.jsx
│   │   │
│   │   ├── molecule/
│   │   │   ├── MoleculeViewer.jsx
│   │   │   ├── MoleculeAtom.jsx
│   │   │   ├── CovalentBond.jsx
│   │   │   └── IntermolecularBond.jsx
│   │   │
│   │   ├── simulation/
│   │   │   ├── WaterOilSimulation.jsx
│   │   │   ├── LondonSimulation.jsx
│   │   │   ├── DipoleSimulation.jsx
│   │   │   └── HydrogenBondSimulation.jsx
│   │   │
│   │   └── quiz/
│   │       ├── QuizCard.jsx
│   │       ├── QuizOption.jsx
│   │       ├── QuizFeedback.jsx
│   │       └── QuizResult.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── WaterOil.jsx
│   │   ├── Introduction.jsx
│   │   ├── London.jsx
│   │   ├── LondonQuiz.jsx
│   │   ├── Dipole.jsx
│   │   ├── DipoleQuiz.jsx
│   │   ├── HydrogenBond.jsx
│   │   ├── HydrogenBondQuiz.jsx
│   │   ├── Comparison.jsx
│   │   ├── Application.jsx
│   │   ├── FinalEvaluation.jsx
│   │   └── Result.jsx
│   │
│   ├── data/
│   │   ├── modules.js
│   │   ├── londonQuestions.js
│   │   ├── dipoleQuestions.js
│   │   ├── hydrogenQuestions.js
│   │   └── finalQuestions.js
│   │
│   ├── hooks/
│   │   ├── useProgress.js
│   │   └── useLocalStorage.js
│   │
│   ├── services/
│   │   ├── storageService.js
│   │   ├── progressService.js
│   │   └── evaluationService.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   ├── components.css
│   │   └── responsive.css
│   │
│   ├── utils/
│   │   ├── calculateScore.js
│   │   ├── calculateProgress.js
│   │   └── formatAnswer.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── AGENTS.md
├── PRD.md
├── TECHNICAL_DESIGN.md
├── AI_LOG.md
├── package.json
└── index.html
```

Catatan implementasi:

- Struktur di atas merupakan rancangan target, bukan keharusan untuk membuat seluruh file sekaligus.
- Buat direktori dan file sesuai kebutuhan fitur yang sedang dikerjakan.
- Jangan membuat banyak file kosong tanpa implementasi.
- Hindari satu file komponen yang terlalu besar dan menangani seluruh aplikasi.

---

# 5. Rancangan Navigasi Aplikasi

## 5.1 Struktur Halaman

Aplikasi memiliki alur pembelajaran utama sebagai berikut:

```text
HOME
 |
 v
FENOMENA AIR & MINYAK
 |
 v
PENGANTAR GAYA ANTARMOLEKUL
 |
 v
GAYA LONDON
 |
 v
KUIS LONDON
 |
 v
GAYA DIPOL-DIPOL
 |
 v
KUIS DIPOL-DIPOL
 |
 v
IKATAN HIDROGEN
 |
 v
KUIS IKATAN HIDROGEN
 |
 v
PERBANDINGAN GAYA
 |
 v
PENERAPAN & TITIK DIDIH
 |
 v
EVALUASI AKHIR
 |
 v
HASIL EVALUASI
```

## 5.2 Sistem Navigasi

Navigasi menggunakan pendekatan SPA.

Setiap halaman memiliki identitas atau ID yang unik.

Contoh ID halaman:

| Halaman | Page ID |
|---|---|
| Home | FR-01 |
| Fenomena Air dan Minyak | FR-02 |
| Pengantar Gaya Antarmolekul | FR-03 |
| Gaya London | FR-04 |
| Kuis London | FR-05 |
| Gaya Dipol-Dipol | FR-06 |
| Kuis Dipol-Dipol | FR-07 |
| Ikatan Hidrogen | FR-08 |
| Kuis Ikatan Hidrogen | FR-09 |
| Perbandingan Gaya | FR-10 |
| Penerapan | FR-11 |
| Evaluasi Akhir | FR-12 |
| Hasil Evaluasi | FR-13 |

FR-14 digunakan untuk pengelolaan penyimpanan progres, bukan sebagai halaman navigasi.

## 5.3 Perilaku Navigasi

- Tombol CTA pada halaman Home mengarahkan pengguna ke modul pertama.
- Tombol Berikutnya mengarahkan pengguna ke halaman pembelajaran berikutnya.
- Tombol Sebelumnya mengarahkan pengguna ke halaman sebelumnya.
- Navigasi modul memungkinkan pengguna membuka kembali materi yang sudah tersedia.
- Halaman terakhir yang dikunjungi disimpan ke localStorage.
- Tombol Lanjutkan Belajar mengarahkan pengguna ke halaman terakhir yang dikunjungi.

---

# 6. Rancangan Komponen Antarmuka

## 6.1 Komponen Global

Komponen global digunakan berulang pada beberapa halaman.

| Komponen | Tanggung Jawab |
|---|---|
| Navbar | Menampilkan identitas aplikasi dan navigasi. |
| Footer | Menampilkan informasi bagian bawah halaman. |
| ProgressBar | Menampilkan persentase progres belajar. |
| Button | Menyediakan tombol interaksi. |
| Modal | Menampilkan dialog konfirmasi. |
| LearningLayout | Menyediakan kerangka halaman pembelajaran. |

## 6.2 Komponen Visualisasi Molekul

Visualisasi molekul menggunakan SVG agar ringan, fleksibel, dan dapat dianimasikan.

Komponen utama:

### MoleculeViewer

Bertanggung jawab menampilkan visualisasi molekul.

### MoleculeAtom

Menampilkan atom berdasarkan jenis unsur.

### CovalentBond

Menampilkan ikatan kovalen di dalam satu molekul menggunakan garis solid.

### IntermolecularBond

Menampilkan gaya antarmolekul menggunakan garis atau indikator interaksi sesuai jenis gaya.

Ketentuan visual:

| Elemen | Representasi |
|---|---|
| Atom O | Merah |
| Atom H | Putih |
| Atom C | Hitam |
| Atom N | Biru |
| Atom Cl | Hijau |
| Ikatan Kovalen | Garis solid tebal |
| Ikatan Hidrogen | Garis putus-putus Soft Orange |
| Muatan Parsial Positif | δ+ |
| Muatan Parsial Negatif | δ− |

Warna dan representasi harus konsisten pada seluruh modul.

---

# 7. Rancangan Simulasi dan Animasi

## 7.1 Prinsip Implementasi

Setiap simulasi harus:

1. Memiliki kondisi awal yang jelas.
2. Memiliki kontrol interaksi pengguna.
3. Menampilkan perubahan visual secara bertahap.
4. Menampilkan penjelasan ilmiah yang sesuai dengan perubahan visual.
5. Dapat diulang kembali.
6. Tidak bergantung pada animasi otomatis saja.

Gunakan state React untuk mengatur kondisi simulasi.

## 7.2 Simulasi Air dan Minyak

Komponen: `WaterOilSimulation.jsx`

State yang digunakan:

```javascript
const [simulationState, setSimulationState] = useState("separated");
```

Pilihan state:

- `separated`: air dan minyak terpisah.
- `shaking`: campuran sedang dikocok.
- `emulsion`: campuran tampak keruh.
- `settling`: campuran sedang memisah kembali.

Alur interaksi:

```text
SEPARATED
    |
    v
SHAKING
    |
    v
EMULSION
    |
    v
SETTLING
    |
    v
SEPARATED
```

Kontrol pengguna:

- Sebelum Dikocok.
- Kocok Campuran.
- Didiamkan.

Implementasi visual menggunakan SVG dan CSS animation.

## 7.3 Simulasi Gaya London

Komponen: `LondonSimulation.jsx`

Simulasi menampilkan empat tahapan:

1. Distribusi elektron awal.
2. Terbentuknya dipol sesaat.
3. Terbentuknya dipol terinduksi pada molekul tetangga.
4. Terjadinya gaya tarik antara kedua molekul.

State:

```javascript
const [step, setStep] = useState(1);
const [isPlaying, setIsPlaying] = useState(false);
```

Kontrol:

- Play.
- Pause.
- Next Step.
- Previous Step.
- Reset.

Visualisasi menggunakan pergeseran posisi awan elektron dan perubahan warna distribusi muatan.

## 7.4 Simulasi Gaya Dipol-Dipol

Komponen: `DipoleSimulation.jsx`

Simulasi menggunakan dua molekul HCl.

Fitur utama:

- Rotasi orientasi molekul.
- Perubahan posisi kutub δ+ dan δ−.
- Indikator gaya tarik.
- Indikator gaya tolak.

State:

```javascript
const [orientation, setOrientation] = useState(0);
```

Perubahan orientasi akan memperbarui tampilan molekul dan indikator interaksi.

## 7.5 Simulasi Ikatan Hidrogen

Komponen: `HydrogenBondSimulation.jsx`

Simulasi menampilkan interaksi antarmolekul yang memenuhi syarat pembentukan ikatan hidrogen.

Contoh molekul:

- H₂O.
- NH₃.
- HF.

Visualisasi menggunakan:

- Garis putus-putus Soft Orange.
- Animasi kedipan interaksi.
- Label atom F, O, dan N.
- Penanda pasangan elektron bebas.

Simulasi harus membedakan ikatan kovalen di dalam molekul dengan ikatan hidrogen antarmolekul.

---

# 8. Pengelolaan State Aplikasi

## 8.1 Prinsip Pengelolaan State

State digunakan untuk menyimpan informasi yang dapat berubah akibat interaksi pengguna.

Pengelolaan state dibagi menjadi:

| Jenis State | Contoh |
|---|---|
| UI State | Modal terbuka, tab aktif, menu navigasi. |
| Simulation State | Tahap animasi, orientasi molekul. |
| Quiz State | Jawaban pengguna, status benar/salah. |
| Progress State | Halaman terakhir dan modul selesai. |
| Evaluation State | Jawaban evaluasi dan nilai akhir. |

Gunakan React useState dan custom hooks sesuai kebutuhan.

## 8.2 Custom Hooks

### useLocalStorage

Mengelola pembacaan dan penyimpanan data ke localStorage.

### useProgress

Mengelola progres pembelajaran, termasuk:

- Halaman terakhir.
- Modul yang telah selesai.
- Persentase progres.
- Status penyelesaian kuis.

---

# 9. Sistem Penyimpanan Data

## 9.1 Teknologi Penyimpanan

Penyimpanan menggunakan browser localStorage.

Key utama:

```text
imf_explorer_progress
```

Tidak menggunakan database eksternal.

## 9.2 Struktur Data

```javascript
const progressData = {
  user_profile: {
    last_visited_page: "FR-01",
    completed_pages: [],
    overall_progress_percent: 0
  },

  quiz_scores: {
    london_quiz: {
      score: 0,
      completed: false,
      attempts: 0
    },

    dipole_quiz: {
      score: 0,
      completed: false,
      attempts: 0
    },

    hbond_quiz: {
      score: 0,
      completed: false,
      attempts: 0
    }
  },

  final_evaluation: {
    completed: false,
    score_total: 0,
    user_answers: {},
    timestamp: null
  }
};
```

Struktur tersebut menjadi acuan implementasi dan dapat dikembangkan tanpa mengubah kebutuhan utama PRD.

## 9.3 Operasi Penyimpanan

Sistem menyediakan fungsi:

| Fungsi | Tanggung Jawab |
|---|---|
| getProgress() | Mengambil data progres. |
| saveProgress() | Menyimpan perubahan progres. |
| updateLastPage() | Memperbarui halaman terakhir. |
| completePage() | Menandai halaman selesai. |
| saveQuizScore() | Menyimpan nilai kuis. |
| saveEvaluation() | Menyimpan hasil evaluasi. |
| resetProgress() | Menghapus progres setelah konfirmasi. |

## 9.4 Ketentuan Penyimpanan

- Data disimpan secara otomatis.
- Refresh browser tidak menghapus progres.
- Membuka kembali browser mempertahankan progres.
- Data awal dibuat apabila localStorage belum memiliki data.
- Sistem harus menangani data yang tidak valid atau gagal dibaca.
- Reset progres harus menggunakan dialog konfirmasi.

---

# 10. Sistem Kuis dan Evaluasi

## 10.1 Kuis Formatif

Kuis formatif tersedia setelah setiap modul utama:

1. Kuis Gaya London.
2. Kuis Gaya Dipol-Dipol.
3. Kuis Ikatan Hidrogen.

Setiap kuis memiliki tiga soal sesuai PRD.

Fitur:

- Menampilkan pertanyaan.
- Menampilkan pilihan jawaban.
- Menerima jawaban pengguna.
- Memeriksa jawaban.
- Menampilkan umpan balik langsung.
- Menampilkan pembahasan konseptual.
- Menyimpan nilai dan jumlah percobaan.

## 10.2 Evaluasi Akhir

Evaluasi akhir memiliki 15 soal:

| Jenis Soal | Jumlah |
|---|---:|
| Pilihan Ganda | 5 |
| Pilihan Ganda Kompleks | 5 |
| Jawaban Singkat | 5 |
| Total | 15 |

Nilai akhir menggunakan skala 0–100.

## 10.3 Logika Penilaian

Penilaian dilakukan melalui fungsi terpisah agar mudah diuji.

Contoh:

```javascript
function calculateScore(correctAnswers, totalQuestions) {
  if (totalQuestions === 0) return 0;

  return Math.round(
    (correctAnswers / totalQuestions) * 100
  );
}
```

Untuk pilihan ganda kompleks dan jawaban singkat, gunakan aturan penilaian yang ditetapkan pada PRD dan bank soal.

Jangan menggunakan satu aturan pemeriksaan jawaban untuk seluruh tipe soal apabila karakteristik jawabannya berbeda.

## 10.4 Halaman Hasil

Halaman hasil menampilkan:

- Nilai total.
- Lencana hasil belajar.
- Penguasaan setiap subtopik.
- Rekomendasi remedial.
- Tombol tinjau jawaban.
- Tombol cetak atau simpan hasil.
- Tombol kembali ke beranda.

---

# 11. Sistem Desain Antarmuka

## 11.1 Palet Warna

Gunakan warna yang telah ditetapkan pada PRD.

| Nama | Kode |
|---|---|
| Deep Forest | #245B45 |
| Forest Green | #39765A |
| Sage Green | #A8C3A0 |
| Soft Mint | #EAF2E6 |
| Warm Cream | #FAF7ED |
| Soft Orange | #E9A15B |
| Warm Yellow | #F3D77A |
| Dark Text | #27352D |
| Muted Text | #647267 |
| Success Green | #4C855F |
| Error Terracotta | #B85C45 |

## 11.2 Tipografi

Font utama:

- Poppins.
- Nunito Sans.
- system-ui sebagai fallback.

Ukuran:

| Elemen | Ukuran |
|---|---|
| H1 | 28–32 px |
| H2 | 20–24 px |
| Body | 16–18 px |
| Caption | 14–16 px |

## 11.3 Layout

- Menggunakan CSS Grid dan Flexbox.
- Lebar maksimum kontainer 1200 px.
- Padding smartphone minimal 16 px.
- Menggunakan komponen kartu untuk materi.
- Menjaga konsistensi jarak dan hierarki visual.
- Menghindari tampilan terlalu padat.

## 11.4 Responsivitas

| Perangkat | Lebar Layar |
|---|---|
| Smartphone | 320–480 px |
| Tablet | 481–768 px |
| Desktop | Di atas 768 px |

Pada layar kecil:

- Navigasi disesuaikan menjadi lebih ringkas.
- Kartu materi disusun satu kolom.
- Visualisasi molekul tetap terlihat utuh.
- Tombol interaksi mudah disentuh.
- Tabel dapat menggunakan horizontal scrolling jika diperlukan.

---

# 12. Aksesibilitas dan Performa

## 12.1 Aksesibilitas

Mengacu pada WCAG 2.1 AA.

Ketentuan:

- Kontras teks minimal 4.5:1.
- Semua tombol dapat diakses menggunakan keyboard.
- Gunakan semantic HTML.
- Berikan label pada elemen interaktif.
- Gunakan ARIA jika diperlukan.
- Jangan menyampaikan informasi hanya melalui warna.

## 12.2 Performa

Target berdasarkan PRD:

- First Contentful Paint kurang dari 1.2 detik pada koneksi 4G standar.
- Bundle JavaScript dan CSS kurang dari 500 KB dalam kondisi gzipped.
- Animasi berjalan dengan target 60 FPS.
- Hindari proses rendering yang tidak diperlukan.
- Gunakan SVG dan CSS untuk visualisasi ringan.

---

# 13. Standar Implementasi Kode

## 13.1 Prinsip Penulisan Kode

1. Gunakan komponen React yang modular.
2. Gunakan nama variabel dan fungsi yang deskriptif.
3. Pisahkan data materi dari komponen tampilan.
4. Pisahkan logika perhitungan nilai dari UI.
5. Hindari duplikasi kode.
6. Gunakan CSS yang terorganisasi.
7. Hindari penggunaan inline style secara berlebihan.
8. Pastikan setiap komponen memiliki tanggung jawab yang jelas.

## 13.2 Penanganan Error

Aplikasi harus menangani:

- Data localStorage tidak ditemukan.
- Data localStorage tidak valid.
- Jawaban kuis belum dipilih.
- Pengguna mengakses halaman yang tidak tersedia.
- Simulasi di-reset ketika pengguna berpindah modul.
- Kesalahan saat proses penyimpanan.

Tampilkan pesan yang mudah dipahami pengguna.

## 13.3 Aturan Pengembangan

AI Coding Agent wajib:

- Membaca PRD.md sebelum mengimplementasikan fitur.
- Membaca AGENTS.md sebelum melakukan perubahan kode.
- Mengikuti struktur teknis dalam dokumen ini.
- Tidak mengubah kebutuhan produk tanpa persetujuan.
- Tidak menambahkan fitur di luar ruang lingkup.
- Menguji fitur setelah implementasi.
- Memperbarui AI_LOG.md setelah menyelesaikan pekerjaan.

---

# 14. Strategi Pengujian

## 14.1 Pengujian Fungsional

| ID | Fitur | Skenario Pengujian |
|---|---|---|
| T-01 | Home | Halaman beranda tampil dengan progres awal 0%. |
| T-02 | Air dan Minyak | Tombol simulasi mengubah kondisi campuran. |
| T-03 | Pengantar | Toggle membedakan ikatan intramolekul dan antarmolekul. |
| T-04 | Gaya London | Animasi memiliki empat tahapan yang dapat dikontrol. |
| T-05 | Dipol-Dipol | Rotasi HCl mengubah indikator tarik dan tolak. |
| T-06 | Ikatan Hidrogen | Interaksi F, O, dan N divisualisasikan dengan tepat. |
| T-07 | Kuis | Jawaban menghasilkan umpan balik yang sesuai. |
| T-08 | Perbandingan | Tabel perbandingan menampilkan informasi yang benar. |
| T-09 | Penerapan | Grafik titik didih menampilkan anomali. |
| T-10 | Evaluasi | Sistem menghitung nilai dari 15 soal. |
| T-11 | Hasil | Sistem menampilkan nilai dan rekomendasi remedial. |
| T-12 | Storage | Progres tetap tersimpan setelah refresh. |

## 14.2 Pengujian Responsivitas

Uji aplikasi pada:

- Smartphone.
- Tablet.
- Laptop.
- Desktop.

Pastikan tidak terdapat:

- Elemen terpotong.
- Teks bertumpuk.
- Tombol sulit diakses.
- Visualisasi keluar dari kontainer.
- Horizontal overflow yang tidak diperlukan.

## 14.3 Pengujian Kimia

Setiap materi dan simulasi harus diperiksa berdasarkan ketepatan konsep.

Poin pemeriksaan:

1. Gaya London terjadi pada semua molekul.
2. Gaya London merupakan satu-satunya gaya antarmolekul pada molekul nonpolar sederhana.
3. Gaya dipol-dipol melibatkan interaksi dipol permanen.
4. Ikatan hidrogen melibatkan H yang terikat langsung pada F, O, atau N serta pasangan elektron bebas pada molekul tetangga.
5. Ikatan kovalen tidak digambarkan sebagai gaya antarmolekul.
6. Penguapan air tidak memutus ikatan kovalen O-H.

---

# 15. Tahapan Implementasi

Pengembangan dilakukan secara bertahap agar setiap fitur dapat diuji sebelum melanjutkan ke tahap berikutnya.

## Tahap 1 — Project Setup

- Membuat proyek React + Vite.
- Menyiapkan struktur direktori.
- Menyiapkan global CSS.
- Membuat layout utama.
- Membuat navigasi dasar.

## Tahap 2 — Home dan Fondasi Pembelajaran

- Mengembangkan halaman Home.
- Membuat komponen Navbar.
- Membuat ProgressBar.
- Membuat halaman Fenomena Air dan Minyak.
- Membuat halaman Pengantar Gaya Antarmolekul.

## Tahap 3 — Modul Visualisasi

- Mengembangkan simulasi Gaya London.
- Mengembangkan simulasi Dipol-Dipol.
- Mengembangkan simulasi Ikatan Hidrogen.
- Membuat kuis formatif setiap modul.

## Tahap 4 — Perbandingan dan Penerapan

- Membuat tabel perbandingan.
- Membuat grafik titik didih.
- Mengembangkan studi kasus air dan minyak.

## Tahap 5 — Evaluasi dan Penyimpanan

- Membuat evaluasi akhir 15 soal.
- Membuat sistem penilaian.
- Membuat halaman hasil.
- Membuat rekomendasi remedial.
- Mengimplementasikan localStorage.

## Tahap 6 — Quality Assurance

- Menguji seluruh fitur.
- Memeriksa ketepatan konsep kimia.
- Menguji responsivitas.
- Memeriksa aksesibilitas.
- Mengoptimalkan performa.
- Memeriksa browser console.

---

# 16. Definition of Technically Done

Implementasi teknis dinyatakan selesai apabila:

- [ ] Struktur proyek tersusun modular.
- [ ] Seluruh halaman utama dapat diakses.
- [ ] Navigasi antarmodul berjalan dengan benar.
- [ ] Visualisasi molekul berfungsi.
- [ ] Simulasi dapat dikontrol pengguna.
- [ ] Kuis formatif memberikan umpan balik.
- [ ] Evaluasi akhir dapat menghitung nilai.
- [ ] Halaman hasil menampilkan analisis penguasaan.
- [ ] Data progres tersimpan menggunakan localStorage.
- [ ] Progres tetap tersedia setelah browser di-refresh.
- [ ] Tampilan responsif pada desktop, tablet, dan smartphone.
- [ ] Tidak terdapat error pada browser console.
- [ ] Seluruh konsep kimia sesuai dengan ketentuan PRD.

---

# 17. Catatan Akhir

TECHNICAL_DESIGN.md merupakan panduan implementasi teknis IMF Explorer.

Dokumen ini tidak menggantikan PRD.md, melainkan menerjemahkan kebutuhan produk menjadi rancangan teknis yang dapat dikerjakan secara bertahap.

Setiap perubahan arsitektur, teknologi, struktur data, maupun alur sistem harus tetap mempertimbangkan kebutuhan produk yang telah ditetapkan.

**Prinsip utama pengembangan:**

Build what is specified, keep the architecture simple, preserve scientific accuracy, and make every learning interaction meaningful.
