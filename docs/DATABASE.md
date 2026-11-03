# Database Hasil Belajar

> **Catatan:** Dokumen ini mengikuti struktur yang direkomendasikan pada Lampiran A ([handout-web-based-learning-kimia](https://github.com/Wildan2150/handout-web-based-learning-kimia/blob/main/Lampiran_A_Templat_Dokumen_Proyek.md)). Silakan isi bagian-bagian yang masih placeholder sesuai keputusan tim.

## Lingkup dan Pengelola
- **Produk ID:** `{{PRODUCT_ID}}`  <!-- contoh: IMF-EXPLORER -->
- **Label kelas / materi:** `{{KELAS_LABEL}}`
- **Provider:** Firebase Auth / Firestore (utama) – Supabase Auth (alternatif)
- **Nama / ID project:** `{{PROJECT_NAME}}` / `{{PROJECT_ID}}`
- **Akun guru tunggal:** `{{GURU_UID}}` (ditetapkan melalui rules keamanan Firestore)
- **Daftar ID siswa:** dikelola melalui dashboard admin, tidak ada multi‑kelas.

## Sumber Data
- **Materi, soal, tag konsep, kunci, pembahasan:** disimpan di `src/data/` (format JSON atau Markdown).
- **Versi bank soal:** `{{BANK_SOAL_VERSION}}` – dipertahankan untuk riwayat lama.
- **Draf / jawaban / progres / antrean lokal:** namespace per akun/tamu di `src/data/local/`.
- **Profil pengguna minimum:** `uid` (ID provider) dan `displayName` / `studentCode`.
- **Skema Riwayat (Firestore collection `results`):**
  ```json
  {
    "id": "{{resultId}}",
    "ownerId": "{{uid}}",
    "alias": "{{namaAlias}}",
    "moduleId": "{{moduleId}}",
    "activityId": "{{activityId}}",
    "questionVersion": "{{questionVersion}}",
    "kind": "quiz|exercise",
    "answers": {"q1": "A", "q2": "C"},
    "score": 85,
    "completedAt": "2026-11-03T12:00:00Z",
    "receivedAt": "2026-11-03T12:01:00Z"
  }
  ```
- **Progres cloud:** diturunkan dari riwayat; tidak menimpa skor lain.

## Akses dan Aturan
- **Tamu / akun di luar daftar:** dapat belajar lokal, tidak dapat membaca/menulis ke cloud.
- **Siswa kelas:** dapat membuat hasil sendiri, membaca riwayat pribadi.
- **Guru tunggal:** dapat membaca semua hasil kelas, jawaban asli tetap tidak dapat diubah.
- **Pengelola dashboard:** menetapkan guru, menambah/menhapus siswa, prosedur penghapusan data.
- **Validasi keamanan:** memeriksa `ownerId`, `alias`, tipe data, dan timestamp pada tiap write.
- **Idempotensi:** `resultId` bersifat tetap; pengiriman ulang tidak menduplikasi; hasil yang sudah diterima tidak ditimpa.
- **Tidak disimpan di repo:** password, kredensial admin, atau data siswa mentah.

## Sinkronisasi
- **Kapan hasil tamu ditawarkan untuk disimpan ke akun:** setelah login berhasil dan sebelum logout.
- **Kapan antrean dikirim ulang:** pada perubahan status jaringan atau pergantian akun, menjaga kepemilikan `ownerId`.
- **Status lokal:** `draft` (belum kirim), `pending` (menunggu konfirmasi), `sent` (terkirim), `failed` (gagal, dengan bukti error server).
- **Penanganan refresh / logout / storage gagal / reset lokal / data cloud:**
  - Simpan draft di `localStorage`.
  - Pada refresh, coba kirim kembali antrean `pending`.
  - Pada logout, hapus draft lokal kecuali ada `sent`.
  - Pada error storage, beri peringatan dan minta pengguna menunggu.

## Konfigurasi dan Hasil Uji
- **Variabel lingkungan (tanpa nilai):**
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_AUTH_REDIRECT_URI`
- **Policy yang diterbitkan (contoh):** `rules/firestore.rules`

| Lingkungan / commit / penguji | Skenario | Aktual / bukti | Status / issue |
| :--- | :--- | :--- | :--- |
| `dev` / `a1b2c3` / QA | Siswa A kirim / baca hasil sendiri | {…} (contoh JSON) | BELUM DIUJI |
| `dev` / `a1b2c3` / QA | Siswa A mengakses hasil B (tidak diizinkan) | **Error 403** | BELUM DIUJI |
| `staging` / `d4e5f6` / Lead | Guru membaca per butir & ringkasan | Ringkasan tampilan UI | BELUM DIUJI |
| `prod` / `g7h8i9` / Security | Tamu / akun di luar daftar ditolak | **Error 401** | BELUM DIUJI |
| `prod` / `g7h8i9` / DevOps | Putus koneksi, refresh, pulih, kirim ulang | Retry berhasil | BELUM DIUJI |

## Batas dan Tindak Lanjut
- **Skor client:** dapat diverifikasi & diubah oleh guru bila diperlukan.
- **Offline pertama kali:** data disimpan lokal, sinkronisasi saat online.
- **Ujian khusus / lintas perangkat:** dukungan mode locked exam.
- **Penghapusan data:** sesuai regulasi pendidikan, di‑trigger oleh dashboard admin.
