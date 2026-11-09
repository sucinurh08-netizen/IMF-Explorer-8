/**
 * Data Naskah Pembelajaran Modul 1 — IMF Explorer
 * Tahap 1: Engage (Pembangkit Minat)
 * Topik: Fenomena Air dan Minyak
 * 
 * Rujukan Utama:
 * 1. Raymond Chang & Kenneth A. Goldsby, Chemistry (12th Edition, McGraw-Hill, Chapter 11: Liquids and Solids)
 * 2. Buku Kimia SMA/MA Kelas XI Fase F (Kurikulum Merdeka, Kemendikbudristek RI)
 * 3. Model Tiga Tingkat Representasi Kimia (A.H. Johnstone)
 */

export interface ChemistryDataEntry {
  property: string;
  water: string;
  oil: string;
  scientificUnit: string;
  literatureNote: string;
}

export interface VerificationAlert {
  id: string;
  parameter: string;
  currentValue: string;
  reason: string;
  suggestedAction: string;
}

export interface Module1Content {
  id: string;
  stage5E: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  estimatedDurationMin: number;
  curriculumBadge: string;
  
  learningObjectives: string[];
  triggerQuestions: string[];
  
  macroscopicSection: {
    title: string;
    narrative: string[];
    experimentSteps: {
      step: number;
      label: string;
      description: string;
      observation: string;
    }[];
    misconceptionAlert: {
      misconception: string;
      scientificFact: string;
      analogy: string;
    };
  };

  submicroscopicSection: {
    title: string;
    narrative: string[];
    waterMoleculeAnalysis: {
      formula: string;
      geometry: string;
      bondAngle: string;
      electronegativityDiff: string;
      dipoleMoment: string;
      partialCharges: string;
      dominantForces: string;
    };
    oilMoleculeAnalysis: {
      formulaRepresentative: string;
      molecularNature: string;
      electronegativityDiff: string;
      dipoleMoment: string;
      dominantForces: string;
    };
    interactionMechanism: {
      step1: string;
      step2: string;
      step3: string;
      hydrophobicEffect: string;
    };
  };

  symbolicSection: {
    title: string;
    chemicalEquations: string[];
    energyComparison: {
      covalentBondOH: string;
      hydrogenBondWater: string;
      londonForceHydrocarbon: string;
      ratioDescription: string;
    };
    comparisonTable: ChemistryDataEntry[];
  };

  verificationAlerts: VerificationAlert[];
  
  academicReferences: {
    title: string;
    authors: string;
    year: string;
    publisher: string;
    relevantSection: string;
  }[];
}

export const MODULE_1_DATA: Module1Content = {
  id: 'fenomena-air-minyak', // Stable module ID
  stage5E: 'Engage',
  stageNumber: 1,
  title: 'Fenomena Air dan Minyak',
  subtitle: 'Mengapa Dua Cairan Sehari-hari Ini Tidak Pernah Dapat Menyatu?',
  estimatedDurationMin: 8,
  curriculumBadge: 'Kimia SMA Kelas XI • Fase F (Kurikulum Merdeka)',

  learningObjectives: [
    'Mengamati fenomena makroskopik ketidaktercampuran air dan minyak goreng saat dicampur dan dikocok.',
    'Menganalisis perbedaan struktur submikroskopik antara molekul polar air (H₂O) dan molekul nonpolar minyak (trigliserida).',
    'Membedakan peran massa jenis (penentu posisi vertikal lapisan) dengan peran polaritas & gaya antarmolekul (penyebab ketidakcampuran).',
    'Menghubungkan kekuatan jaringan ikatan hidrogen antarmolekul air dengan fenomena efek hidrofobik.',
    'Menghargai perbandingan kuantitatif energi ikatan kovalen intramolekul dengan gaya tarik antarmolekul berdasarkan literatur kimia.',
  ],

  triggerQuestions: [
    'Pernahkah Anda memperhatikan kuah sup daging yang berminyak atau tumpahan minyak di permukaan air laut? Mengapa minyak selalu membentuk bulatan dan berada di lapisan atas?',
    'Jika tabung berisi air dan minyak dikocok sekuat tenaga hingga tampak keruh dan menyatu, mengapa setelah didiamkan beberapa menit keduanya selalu memisah kembali ke bentuk semula?',
    'Apakah alasan sebenarnya air dan minyak tidak bercampur semata-mata karena massa jenis minyak lebih ringan, ataukah ada interaksi molekuler tak kasat mata yang memaksa keduanya memisah?',
  ],

  macroscopicSection: {
    title: '1. Tingkat Makroskopik: Pengamatan Nyata di Laboratorium',
    narrative: [
      'Dalam kehidupan sehari-hari, kita sangat akrab dengan kenyataan bahwa air dan minyak goreng tidak pernah dapat bersatu. Ketika kedua cairan dituangkan ke dalam satu wadah kaca bening, seketika terbentuk batas antarfasa (meniskus pemisah) yang sangat tegas.',
      'Percobaan sederhana ini dapat diuji melalui 4 tahapan pengamatan:',
    ],
    experimentSteps: [
      {
        step: 1,
        label: 'Sebelum Dikocok (Terpisah Statis)',
        description: 'Minyak goreng dituangkan perlahan ke atas permukaan air murni di dalam gelas kimia.',
        observation: 'Minyak langsung mengapung di bagian atas membentuk lapisan bening keemasan, sedangkan air jernih berada di bawahnya dengan batas pemisah yang tajam.',
      },
      {
        step: 2,
        label: 'Pengocokan Kuat (Gaya Mekanis Diberikan)',
        description: 'Tabung reaksi ditutup rapat lalu dikocok kuat-kuat selama 10–15 detik.',
        observation: 'Lapisan batas tampak lenyap; campuran berubah menjadi cairan keruh keputihan (emulsi mekanis sementara) akibat tetesan-tetesan minyak terdispersi secara paksa di antara air.',
      },
      {
        step: 3,
        label: 'Didiamkan (Proses Koalesensi & Relaksasi)',
        description: 'Tabung diletakkan tegak pada rak tabung dan dibiarkan tanpa gangguan fisik.',
        observation: 'Tetesan-tetesan minyak kecil mulai saling mendekat, bergabung (koalesensi) menjadi butiran yang lebih besar, dan perlahan terdorong bergerak naik ke atas.',
      },
      {
        step: 4,
        label: 'Terpisah Sempurna Kembali',
        description: 'Setelah didiamkan 1–3 menit pada suhu ruang.',
        observation: 'Sistem kembali sepenuhnya ke keadaan awal: dua fasa cairan yang terpisah sempurna dengan lapisan minyak di atas dan air di bawah.',
      },
    ],
    misconceptionAlert: {
      misconception: 'Air dan minyak tidak bercampur KARENA massa jenis minyak lebih ringan daripada air.',
      scientificFact: 'Perbedaan massa jenis (ρ minyak ≈ 0,91–0,93 g/cm³ vs ρ air ≈ 1,00 g/cm³) HANYA menentukan POSISI lapisan (yakni minyak terapung di atas air). Faktor PENYEBAB mengapa keduanya tidak larut adalah ketidakcocokan polaritas dan ketidakmampuan minyak mengimbangi kekuatan ikatan hidrogen air.',
      analogy: 'Jika Anda memasukkan balok kayu ke dalam air, kayu mengapung karena massa jenisnya lebih kecil. Namun, jika Anda mencampurkan etanol (alkohol pembersih, ρ ≈ 0,79 g/cm³ yang jauh lebih ringan dari air) ke dalam air, alkohol dan air BERCAMPUR SEMPURNA (larut homogen). Hal ini membuktikan bahwa massa jenis yang berbeda BUKAN penyebab ketidaktercampuran!',
    },
  },

  submicroscopicSection: {
    title: '2. Tingkat Submikroskopik: Dinamika Partikel & Gaya Antarmolekul',
    narrative: [
      'Untuk memahami mengapa air dan minyak memisah kembali, kita harus memperbesar pandangan kita ke tingkat molekuler (skala angstrom, 1 Å = 10⁻¹⁰ m).',
      'Di balik tampilan cairan yang tenang, terdapat interaksi elektrostatik yang sangat dinamis antarmolekul.',
    ],
    waterMoleculeAnalysis: {
      formula: 'H₂O',
      geometry: 'Bentuk V / Bengkok (Bent, sudut ikatan ≈ 104,5°)',
      bondAngle: '104,5° (akibat tolakan 2 pasang elektron bebas pada atom O)',
      electronegativityDiff: 'ΔEN = 3,44 (O) - 2,20 (H) = 1,24 (Kovalen Polar Kuat)',
      dipoleMoment: 'μ = 1,85 Debye (D) — Momen Dipol Permanen Tinggi',
      partialCharges: 'Atom O bermuatan parsial negatif (δ⁻), kedua atom H bermuatan parsial positif (δ⁺)',
      dominantForces: 'Ikatan Hidrogen Antarmolekul yang sangat kuat dan kohesif (energi ≈ 20–25 kJ/mol)',
    },
    oilMoleculeAnalysis: {
      formulaRepresentative: 'Trigliserida rantai panjang (contoh: ester gliseril trioleat C₅₇H₁₀₄O₆)',
      molecularNature: 'Molekul Raksasa Nonpolar dengan rantai karbon-hidrogen panjang (-CH₂-CH₂-)',
      electronegativityDiff: 'Ikatan C–H: ΔEN = 2,55 (C) - 2,20 (H) = 0,35 (Kovalen Nonpolar)',
      dipoleMoment: 'μ ≈ 0 Debye (D) — Tidak Memiliki Momen Dipol Permanen',
      dominantForces: 'Gaya Dispersi London antar rantai hidrokarbon (energi per kontak kontak ≈ 2–8 kJ/mol)',
    },
    interactionMechanism: {
      step1: 'Jaringan Ikatan Hidrogen Air: Di dalam air murni, setiap molekul H₂O mampu membentuk hingga 4 ikatan hidrogen dengan tetangganya, menciptakan struktur jaringan tiga dimensi yang sangat rapat dan berenergi rendah (sangat stabil).',
      step2: 'Tuntutan Pemutusan Ikatan: Agar minyak dapat larut di dalam air, molekul minyak harus menyusup di antara molekul air. Hal ini mengharuskan molekul air memutuskan sebagian ikatan hidrogennya yang kuat (membutuhkan input energi besar).',
      step3: 'Interaksi Pengganti yang Terlalu Lemah: Molekul minyak nonpolar hanya dapat menawarkan interaksi dipol-terinduksi (dipole-induced dipole) yang sangat lemah kepada molekul air. Interaksi lemah ini sama sekali TIDAK CUKUP untuk membayar energi ikatan hidrogen yang harus diputus.',
      hydrophobicEffect: 'Efek Hidrofobik: Secara termodinamika (Hukum Termodinamika & Energi Bebas Gibbs, ΔG = ΔH - TΔS), molekul air memilih saling merapat kembali membentuk ikatan hidrogen maksimum, sehingga molekul-molekul minyak nonpolar terdesak dan "terperas" keluar dari jaringan air.',
    },
  },

  symbolicSection: {
    title: '3. Tingkat Simbolik: Notasi Kimia & Perbandingan Energi Kuantitatif',
    chemicalEquations: [
      'Representasi Kepolaran Air: H(δ⁺) — O(δ⁻) — H(δ⁺)  [Bentuk Bengkok, μ = 1,85 D]',
      'Representasi Rantai Hidrokarbon Minyak: —(CH₂)n—  [Distribusi Elektron Simetris, μ ≈ 0 D]',
      'Prinsip Kelarutan: "Similia similibus solvuntur" (Like dissolves like)',
    ],
    energyComparison: {
      covalentBondOH: '≈ 460 kJ/mol (Ikatan kovalen intramolekul kuat di dalam molekul H₂O)',
      hydrogenBondWater: '≈ 20–25 kJ/mol (Gaya tarik antarmolekul H₂O)',
      londonForceHydrocarbon: '≈ 2–8 kJ/mol (Gaya dispersi fluktuatif antar rantai C–H)',
      ratioDescription: 'Ikatan kovalen intramolekul (O–H) kira-kira 20 kali lipat LEBIH KUAT dibandingkan ikatan hidrogen antarmolekul. Saat air mendidih atau mengocok minyak, ikatan kovalen O–H TIDAK PERNAH terputus!',
    },
    comparisonTable: [
      {
        property: 'Jenis Molekul',
        water: 'Kovalen Polar (Kutub permanen)',
        oil: 'Kovalen Nonpolar (Rantai hidrokarbon)',
        scientificUnit: 'Karakteristik',
        literatureNote: 'Raymond Chang, Chap. 11',
      },
      {
        property: 'Bentuk Geometri',
        water: 'Bengkok (V-shape, sudut 104,5°)',
        oil: 'Rantai bercabang/lurus panjang',
        scientificUnit: 'Geometri ruang',
        literatureNote: 'Teori VSEPR',
      },
      {
        property: 'Massa Jenis (ρ pada 25 °C)',
        water: '0,997 ≈ 1,00',
        oil: '0,910 – 0,930',
        scientificUnit: 'g/cm³ (atau g/mL)',
        literatureNote: 'Menentukan posisi lapisan',
      },
      {
        property: 'Momen Dipol (μ)',
        water: '1,85',
        oil: '0,00 – 0,10 (mendekati nol)',
        scientificUnit: 'Debye (D)',
        literatureNote: 'Ukuran polaritas listrik',
      },
      {
        property: 'Gaya Antarmolekul Utama',
        water: 'Ikatan Hidrogen (sangat kuat)',
        oil: 'Gaya Dispersi London (fluktuasi sesaat)',
        scientificUnit: 'Tipe interaksi',
        literatureNote: 'Gaya Van der Waals & H-Bond',
      },
      {
        property: 'Energi Gaya Antarmolekul',
        water: '20 – 25',
        oil: '2 – 8 (per kontak gugus)',
        scientificUnit: 'kJ/mol',
        literatureNote: 'Kuantitas pemutusan fasa',
      },
      {
        property: 'Energi Ikatan Kovalen Intramolekul',
        water: '460 (ikatan O–H)',
        oil: '413 (C–H), 347 (C–C)',
        scientificUnit: 'kJ/mol',
        literatureNote: 'Tidak terputus pada fasa fisik',
      },
    ],
  },

  verificationAlerts: [
    {
      id: 'val-1',
      parameter: 'Komposisi Asam Lemak Minyak Nabati',
      currentValue: 'Trigliserida berbasis ester gliserol dengan asam oleat (C18:1) dan asam linoleat (C18:2)',
      reason: 'Minyak goreng komersial di Indonesia umumnya berasal dari kelapa sawit (kelapa sawit fraksi olein) yang kaya akan asam palmitat (jenuh) dan asam oleat (tak jenuh tunggal). Rentang massa jenis minyak sawit adalah 0,89–0,92 g/cm³.',
      suggestedAction: '[Perlu Pemeriksaan Ilmiah: Pastikan rujukan jenis minyak dicantumkan sebagai minyak nabati/trigliserida secara umum agar tidak bertentangan dengan data laboratorium lokal siswa.]',
    },
    {
      id: 'val-2',
      parameter: 'Rentang Energi Ikatan Hidrogen Air',
      currentValue: '≈ 20–25 kJ/mol (atau ~23,3 kJ/mol)',
      reason: 'Literatur kimia fisik modern mencatat energi ikatan hidrogen air berada pada rentang 15 hingga 25 kJ/mol tergantung pada fase (uap dimer vs cairan ruah). Pada buku teks SMA umumnya disederhanakan menjadi 20–25 kJ/mol.',
      suggestedAction: '[Terverifikasi: Sesuai dengan rujukan Raymond Chang 12th Edition Hal. 462.]',
    },
  ],

  academicReferences: [
    {
      title: 'Chemistry (12th Edition)',
      authors: 'Raymond Chang & Kenneth A. Goldsby',
      year: '2016',
      publisher: 'McGraw-Hill Education, New York',
      relevantSection: 'Chapter 11: Liquids and Solids (Section 11.2 Intermolecular Forces, pp. 458-472)',
    },
    {
      title: 'Buku Panduan Guru & Buku Siswa Kimia untuk SMA/MA Kelas XI',
      authors: 'Munasprianto Ramli dkk.',
      year: '2022',
      publisher: 'Pusat Perbukuan, Kemendikbudristek RI, Jakarta',
      relevantSection: 'Bab 1: Ikatan Kimia dan Gaya Antarmolekul (Fase F)',
    },
    {
      title: 'Why is science difficult to learn? Things are seldom what they seem',
      authors: 'A. H. Johnstone',
      year: '1991',
      publisher: 'Journal of Computer Assisted Learning, Vol. 7, No. 2, pp. 75-83',
      relevantSection: 'Kerangka Tiga Tingkat Representasi Kimia (Makroskopik, Submikroskopik, dan Simbolik)',
    },
  ],
};

