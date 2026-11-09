# Backlog Produk — IMF Explorer: Jelajah Gaya Antarmolekul

## MVP Status & Progres Pengerjaan

| ID/issue | Pekerjaan | Alasan belajar | Kriteria penerimaan | Pelaksana/reviewer | Status/PR |
| :--- | :--- | :--- | :--- | :--- | :--- |
| MVP-01 | Modul 1: Fenomena Air & Minyak (Tahap 1: Engage) | Pengamatan makroskopik vs submikroskopik polaritas cairan | Simulasi 4 fase, teks 3 level Johnstone, kuis formatif penanda jujur, kembali ke beranda | Tim Kimia & Frontend | **SELESAI (TERUJI)** |
| MVP-02 | Modul 2: Pengantar Gaya Antarmolekul & Penguapan Air (Tahap 2: Explore) | Membedakan pemutusan ikatan kovalen vs gaya antarmolekul saat air mendidih | Simulasi penguapan air interaktif, energi $O-H$ vs ikatan hidrogen, pencegahan miskonsepsi | Tim Kimia & Frontend | **SELESAI (TERUJI)** |
| MVP-03 | Modul 3: Gaya London / Dispersi (Tahap 3: Explain 1) | Memahami dipol sesaat dan dipol terinduksi pada molekul nonpolar | Simulasi 4 tahap distribusi elektron, mode argon & metana, polarisabilitas & luas permukaan | Tim Kimia & Frontend | **SELESAI (TERUJI)** |
| MVP-04 | Modul 4: Gaya Dipol-Dipol (Tahap 3: Explain 2) | Interaksi elektrostatik molekul polar ($\delta^+ \cdots \delta^-$ vs $\delta^- \cdots \delta^-$) | Simulasi rotasi orientasi ($0^\circ, 90^\circ, 180^\circ$), slider jarak kutub, perbandingan energi | Tim Kimia & Frontend | **SELESAI (TERUJI)** |
| MVP-05 | Modul 5: Ikatan Hidrogen (Tahap 3: Explain 3) | Interaksi kuat melibatkan atom H dengan F/O/N dan PEB molekul tetangga | Visualisasi donor/akseptor H₂O, NH₃, HF, anomali struktur heksagonal kristal es, densitas es < air | Tim Kimia & Frontend | **SELESAI (TERUJI)** |
| MVP-06 | Modul 6: Perbandingan Gaya & Titik Didih Hidrida (Tahap 4: Elaborate) | Sintesis dan perbandingan kekuatan relatif ketiga gaya serta titik didih Golongan 14–17 | Grafik interaktif SVG titik didih hidrida Periode 2–5, anomali H₂O/HF/NH₃, tabel komparasi energi | Tim Kimia & Frontend | **SELESAI (TERUJI)** |
| MVP-07 | Sistem Navigasi & Progres SPA | Perpindahan mulus Beranda $\leftrightarrow$ Modul 1–6, dropdown pemilih modul, breadcrumbs, tombol next/prev | Navigasi tidak rusak, TOC interaktif, progres tersimpan di `localStorage` | Tim Frontend | **SELESAI (TERUJI)** |
| MVP-08 | Modul 7: Evaluasi Akhir (Tahap 5: Evaluate) | Menguji pemahaman menyeluruh konsep gaya antarmolekul | Placeholder kepatuhan batasan (soal, skor, dan bank soal ditunda sampai instruksi user berikutnya) | Tim Kimia & Evaluasi | **DITUNDA (SESUAI SCOPE BATASAN)** |

## Rincian Fitur Interaktif Terimplementasi
- **Simulasi Air-Minyak (`WaterOilSimulation.tsx`)**: 4 fase interaktif (terpisah, pengocokan, emulsi sementara, pemisahan kembali) dengan narasi kimia reaktif.
- **Simulasi Penguapan Air (`EvaporationSimulation.tsx`)**: Kontrol suhu $25^\circ\text{C}$ s.d. $100^\circ\text{C}$, visualisasi uap air yang melepaskan ikatan hidrogen tanpa memutus ikatan kovalen $O-H$.
- **Simulasi Gaya London (`LondonSimulation.tsx`)**: Langkah dinamis 4 tahap pembentukan dipol sesaat dan terinduksi pada molekul nonpolar (CH₄ / Ar).
- **Simulasi Gaya Dipol-Dipol (`DipoleSimulation.tsx`)**: Orientasi molekul polar HCl dengan visualisasi medan elektrostatik tarikan vs tolakan kutub dan penggeser jarak.
- **Simulasi Ikatan Hidrogen (`HydrogenBondSimulation.tsx`)**: Mode molekul H₂O, NH₃, dan HF dengan penggambaran jelas atom donor, PEB akseptor, dan anomali kisi es heksagonal.
- **Simulasi Titik Didih Hidrida (`BoilingPointSimulation.tsx`)**: Grafik SVG interaktif kurva titik didih hidrida Golongan 14, 15, 16, 17 periode 2 s.d. 5 dengan sorotan anomali ikatan hidrogen.

## Pekerjaan Lanjutan (Menunggu Instruksi User)
- **Tahap 5 (Evaluate)**: Bank soal 15 butir evaluasi akhir, penghitungan skor kompetensi, analisis diagnostik miskonsepsi, dan rekomendasi modul remedial.
- **Login / Fitur Kelas Guru (Jika Disetujui Nanti)**: Penyimpanan jawaban antar-peserta didik tanpa mengubah batasan privasi saat ini.

## Riwayat Keputusan
- **2026-11-05**: Implementasi Modul 1 (Engage) dan arsitektur simulasi air-minyak.
- **2026-11-08**: Master Prompt Full Website Development:
  - Implementasi materi lengkap Modul 1 s.d. 6 berdasarkan buku Raymond Chang (Bab 11).
  - Standarisasi warna atom CPK: Karbon (hitam), Oksigen (merah), Nitrogen (biru), Klorin (hijau), Hidrogen (putih).
  - Navigasi universal terpadu (`UniversalModulePage.tsx`) dengan tab Konten, Simulasi, Penerapan, dan Pustaka.
  - Penegasan batasan: Tahap 5 Evaluate dibatasi pada halaman placeholder informatif tanpa kuis/penilaian akhir.
  - Tidak ada commit atau merge git otomatis.