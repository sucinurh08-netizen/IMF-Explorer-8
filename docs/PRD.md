
# AGENTS.md — IMF Explorer

## 1. Identitas dan Acuan Proyek

Proyek ini adalah **IMF Explorer: Jelajah Gaya Antarmolekul**, aplikasi web pembelajaran Kimia interaktif untuk peserta didik SMA/MA kelas XI (Fase F).

Sebelum membuat atau mengubah kode:
1. Baca `PRD.md` sebagai sumber utama spesifikasi produk.
2. Baca `AGENTS.md` untuk memahami aturan kerja dan batasan teknis.
3. Periksa kode yang sudah ada sebelum membuat file atau komponen baru.
4. Pastikan setiap perubahan tetap selaras dengan tujuan pembelajaran, fitur, alur, dan desain yang ditetapkan dalam PRD.

Jika instruksi baru bertentangan dengan PRD, jangan mengubah fitur atau spesifikasi produk secara diam-diam. Jelaskan konflik tersebut dan minta keputusan sebelum melakukan perubahan yang berdampak pada ruang lingkup produk.

## 2. Teknologi

Gunakan teknologi berikut:

- **Framework:** React.
- **Build tool dan development server:** Vite.
- **Bahasa pemrograman:** JavaScript dengan JSX.
- **Styling:** CSS dan Tailwind CSS sesuai konfigurasi proyek.
- **Visualisasi:** SVG dan CSS untuk ilustrasi serta animasi molekuler.
- **Penyimpanan progres:** `localStorage` pada browser.

Ketentuan:
1. Gunakan komponen React berbentuk function component.
2. Gunakan React Hooks, seperti `useState` dan `useEffect`, sesuai kebutuhan.
3. Gunakan teknologi yang sudah ditetapkan. Jangan mengganti React, Vite, atau menambahkan framework lain tanpa persetujuan.
4. Jangan menambahkan Three.js, WebGL, atau library simulasi 3D berat. Visualisasi mengikuti ruang lingkup PRD.
5. Jangan menambahkan paket baru jika kebutuhan dapat diselesaikan menggunakan teknologi yang sudah tersedia.
6. Periksa `package.json` sebelum menambahkan dependency. Jangan mengubah konfigurasi proyek yang sudah berjalan tanpa alasan yang jelas.

## 3. Penyimpanan Data

Gunakan `localStorage` untuk menyimpan progres belajar secara lokal dan anonim.

Data yang boleh disimpan meliputi:
- Status penyelesaian modul.
- Halaman atau modul terakhir yang dikunjungi.
- Nilai kuis formatif.
- Hasil evaluasi akhir dan informasi remedial yang diperlukan aplikasi.

Aturan penyimpanan:
1. Tidak memerlukan akun, registrasi, atau login.
2. Tidak menggunakan backend, database cloud, atau layanan penyimpanan eksternal.
3. Simpan data secara otomatis setelah perubahan progres yang relevan.
4. Saat aplikasi dibuka kembali atau browser di-refresh, progres sebelumnya harus dapat dipulihkan.
5. Sediakan mekanisme reset progres sesuai PRD, dengan konfirmasi sebelum data dihapus.
6. Tangani data `localStorage` yang kosong, tidak valid, atau gagal dibaca agar aplikasi tidak mengalami error.
7. Jangan menyimpan informasi pribadi siswa yang tidak diperlukan untuk fungsi pembelajaran.

## 4. Struktur Proyek

Gunakan struktur modular agar komponen mudah ditemukan, diuji, dan diperbaiki.

Struktur awal yang disarankan:

```text
imf-explorer/
├── PRD.md
├── AGENTS.md
├── AI_LOG.md
├── package.json
├├── index.html
├└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProgressIndicator.jsx
    │   ├── QuizCard.jsx
    │   ├── FeedbackPanel.jsx
    │   └── ...
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── LondonPage.jsx
    │   ├── DipoleDipolePage.jsx
    │   ├── HydrogenBondPage.jsx
    │   └── ...
    ├── data/
    │   ├── modules.js
    │   ├── quizQuestions.js
    │   └── evaluationQuestions.js
    ├── utils/
    │   ├── storage.js
    │   └── scoring.js
    └── styles/
        └── ...
```

Aturan struktur:
1. Struktur di atas merupakan panduan pengorganisasian, bukan alasan untuk memindahkan atau mengganti file yang sudah berfungsi.
2. Komponen yang digunakan kembali ditempatkan di `src/components/`.
3. Halaman atau modul pembelajaran ditempatkan di `src/pages/`.
4. Materi, pertanyaan, kunci jawaban, dan umpan balik dipisahkan dari komponen tampilan di `src/data/`.
5. Fungsi penyimpanan dan perhitungan skor ditempatkan di `src/utils/`.
6. Jangan membuat satu file besar yang mencampur seluruh halaman, simulasi, data kuis, dan penyimpanan.
7. Jangan membuat abstraksi atau folder baru yang tidak diperlukan oleh kebutuhan proyek.
8. Jika struktur proyek yang sudah ada berbeda, ikuti struktur yang berjalan dan lakukan perubahan secara konsisten.

## 5. Bahasa Antarmuka

Gunakan **Bahasa Indonesia baku, komunikatif, dan sesuai tingkat pemahaman peserta didik SMA kelas XI**.

Ketentuan:
1. Gunakan istilah kimia yang benar dan konsisten.
2. Gunakan kalimat yang jelas, langsung, dan tidak terlalu panjang.
3. Hindari bahasa yang terlalu formal, kaku, atau menyerupai terjemahan mesin.
4. Hindari slang berlebihan, bahasa bercanda yang mengganggu pemahaman, dan sapaan yang tidak diperlukan.
5. Gunakan istilah bahasa Inggris hanya jika merupakan istilah ilmiah, nama fitur, atau istilah teknis yang memang diperlukan.
6. Pertahankan istilah dan nama modul yang sudah ditetapkan dalam PRD.
7. Jangan mengubah pertanyaan, instruksi, atau umpan balik pembelajaran hanya untuk membuat tampilannya lebih menarik tanpa memeriksa kesesuaian maknanya.

## 6. Narasi dan Ketepatan Konsep Kimia

Narasi pembelajaran harus mengikuti tujuan pembelajaran, urutan materi, dan naskah yang ditetapkan dalam PRD.

### Gaya narasi

- Mulai dari fenomena yang dekat dengan kehidupan siswa jika sesuai dengan modul.
- Hubungkan fenomena makroskopik dengan penjelasan submikroskopik.
- Gunakan penjelasan simbolik, rumus, dan notasi kimia ketika diperlukan.
- Jelaskan hubungan sebab-akibat, bukan sekadar memberikan definisi.
- Gunakan pertanyaan pemantik dan umpan balik yang membantu siswa memahami alasan di balik jawabannya.
- Jangan menambahkan materi di luar ruang lingkup PRD tanpa persetujuan.

### Aturan ketepatan kimia

1. Gaya London terjadi pada semua molekul, baik polar maupun nonpolar.
2. Gaya dipol-dipol melibatkan interaksi antara molekul polar dengan orientasi kutub yang sesuai.
3. Ikatan hidrogen dibahas sesuai syarat pembentukan dan interaksi antar molekul dalam PRD. Jangan menyatakan bahwa semua molekul yang mengandung atom H otomatis membentuk ikatan hidrogen.
4. Bedakan ikatan intramolekul dengan gaya antarmolekul. Penguapan air tidak berarti ikatan kovalen O–H di dalam molekul air terputus.
5. Jelaskan fenomena air dan minyak berdasarkan perbedaan kepolaran serta interaksi antarmolekul. Jangan menyatakan bahwa air dan minyak tidak bercampur hanya karena perbedaan massa jenis.
6. Gunakan notasi kimia yang benar, termasuk subskrip, superskrip, muatan ion, dan muatan parsial.
7. Jangan membuat kunci jawaban atau umpan balik kuis yang bertentangan dengan konsep kimia.
8. Jika ada ketidakpastian ilmiah atau materi yang belum dijelaskan dalam PRD, tandai untuk diperiksa. Jangan mengarang penjelasan dan menyajikannya sebagai fakta.

Contoh notasi yang benar:

- H₂O
- CH₄
- HCl
- NH₃
- HF
- CH₃OH
- Ca²⁺
- δ⁺ dan δ⁻

## 7. Desain dan Pengalaman Pengguna

Ikuti desain dan palet warna yang telah ditetapkan dalam PRD.

Gunakan palet utama:
- Deep Forest: `#245B45`
- Forest Green: `#39765A`
- Sage Green: `#A8C3A0`
- Soft Mint: `#EAF2E6`
- Warm Cream: `#FAF7ED`
- Soft Orange: `#E9A15B`
- Warm Yellow: `#F3D77A`

Ketentuan:
1. Pertahankan konsistensi warna, tipografi, tombol, kartu, dan navigasi.
2. Gunakan layout responsif untuk desktop, tablet, dan smartphone.
3. Utamakan CSS dan SVG yang ringan.
4. Pastikan animasi dapat dikontrol pengguna sesuai kebutuhan fitur, misalnya play, pause, atau step.
5. Pastikan tombol, slider, dan aktivitas kuis dapat digunakan melalui keyboard.
6. Jangan mengorbankan keterbacaan teks dan notasi kimia demi dekorasi.
7. Jangan mengubah desain menjadi tema, palet, atau gaya visual baru tanpa persetujuan.

## 8. Batasan Ruang Lingkup

Jangan menambahkan fitur berikut tanpa persetujuan:
- Login, registrasi, atau akun siswa.
- Backend dan database cloud.
- Leaderboard publik.
- Live chat atau diskusi antar pengguna.
- Integrasi LMS.
- Simulasi 3D berat.
- Fitur baru yang tidak tercantum dalam PRD.

Fokus pengembangan adalah menyelesaikan fitur dan alur pembelajaran yang telah ditetapkan dalam PRD, bukan memperluas ruang lingkup secara spontan.

## 9. Aturan Kerja AI Coding Agent

Gunakan pola kerja berikut:

1. **Baca:** Periksa PRD, AGENTS, dan kode yang berkaitan dengan tugas.
2. **Rencanakan:** Identifikasi file yang akan dibuat atau diubah.
3. **Kerjakan:** Lakukan perubahan sekecil dan sespesifik mungkin untuk memenuhi instruksi.
4. **Jelaskan:** Sampaikan file yang diubah dan tujuan perubahannya.
5. **Uji:** Jalankan aplikasi dan periksa hasil di browser.
6. **Periksa:** Pastikan isi kimia, tampilan, interaksi, dan penyimpanan sesuai PRD.
7. **Catat:** Dokumentasikan prompt, perubahan, hasil pengujian, dan koreksi dalam `AI_LOG.md`.

Ketentuan tambahan:
- Jangan mengklaim suatu fitur selesai jika belum diperiksa.
- Jangan menghapus fitur yang sudah berfungsi hanya untuk menyederhanakan kode.
- Jangan mengubah banyak bagian sekaligus jika satu perubahan kecil dapat diuji terlebih dahulu.
- Jika menemukan bug, jelaskan penyebab yang diketahui dan perbaiki tanpa mengubah fitur lain yang tidak berkaitan.
- Jika kebutuhan tidak jelas atau bertentangan dengan PRD, berhenti pada bagian yang terdampak dan minta klarifikasi.

## 10. Pemeriksaan Sebelum Menyatakan Selesai

Setiap perubahan harus diperiksa sesuai jenisnya.

### Pemeriksaan teknis
- Aplikasi dapat dijalankan menggunakan perintah yang tersedia di `package.json`.
- Tidak ada error baru pada console browser.
- Tidak ada import atau dependency yang tidak diperlukan.
- Navigasi dan interaksi yang terdampak berfungsi.

### Pemeriksaan pembelajaran
- Isi sesuai PRD.
- Istilah dan notasi kimia benar.
- Animasi tidak menggambarkan konsep yang keliru.
- Kunci jawaban dan umpan balik kuis sesuai konsep kimia.
- Progres tersimpan dan dapat dipulihkan jika fitur penyimpanan terdampak.

### Pemeriksaan tampilan
- Layout tidak rusak pada desktop dan smartphone.
- Teks dan notasi dapat dibaca.
- Tombol dan kontrol berfungsi.
- Warna serta komponen tetap konsisten dengan desain PRD.

Jangan menandai perubahan sebagai selesai sebelum pemeriksaan yang relevan dilakukan.
