export type QuizQuestion = {
  id: string;
  question: string;
  options: string[]; // Pilihan A - E
  correctOption: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  explanation: string; // Pembahasan ilmiah konseptual
  sourceTopic?: string;
};

export const MODULE_1_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Berdasarkan analisis tingkat submikroskopik, faktor utama apa yang menyebabkan air dan minyak tidak dapat bercampur secara permanen?',
    options: [
      'A. Perbedaan massa jenis antara cairan air dan minyak',
      'B. Perbedaan kepolaran molekul dan ketidakcocokan gaya antarmolekul',
      'C. Terbentuknya ikatan ionik yang kuat di antara molekul air',
      'D. Kandungan garam mineral terlarut di dalam air',
      'E. Viskositas (kekentalan) minyak yang lebih tinggi daripada air',
    ],
    correctOption: 'B',
    explanation: 'Pemisahan air dan minyak didorong oleh perbedaan polaritas molekul. Air merupakan molekul sangat polar yang terikat kuat oleh jaringan ikatan hidrogen (~20-25 kJ/mol), sedangkan minyak adalah molekul nonpolar rantai panjang yang hanya berinteraksi melalui gaya London lemah. Air lebih stabil berikatan sesamanya (efek hidrofobik) daripada membentuk interaksi dipol-terinduksi yang sangat lemah dengan minyak. Perbedaan massa jenis hanya menentukan lapisan mana yang berada di atas, bukan penyebab ketidakcampuran.',
    sourceTopic: 'Kepolaran & Gaya Antarmolekul',
  },
  {
    id: 'q2',
    question: 'Gaya dispersi London merupakan salah satu jenis gaya Van der Waals. Pada jenis molekul apa gaya London dapat terjadi?',
    options: [
      'A. Hanya pada molekul polar yang memiliki momen dipol permanen',
      'B. Hanya pada molekul nonpolar simetris',
      'C. Pada SEMUA molekul dan atom, baik polar maupun nonpolar',
      'D. Hanya pada molekul gas mulia pada tekanan sangat tinggi',
      'E. Hanya pada senyawa ionik biner padat',
    ],
    correctOption: 'C',
    explanation: 'Gaya dispersi London timbul akibat fluktuasi sesaat dari awan elektron di sekitar inti atom yang menghasilkan dipol sesaat dan menginduksi dipol tetangga. Karena semua atom dan molekul memiliki awan elektron, gaya London terjadi pada SEMUA molekul (baik polar maupun nonpolar). Pada molekul nonpolar, gaya London adalah satu-satunya gaya antarmolekul yang bekerja.',
    sourceTopic: 'Gaya Dispersi London',
  },
  {
    id: 'q3',
    question: 'Di antara senyawa dan ikatan berikut, manakah yang melibatkan pembentukan IKATAN HIDROGEN antarmolekul yang sah menurut kriteria kimia?',
    options: [
      'A. Molekul hidrogen klorida (H–Cl)',
      'B. Interaksi antarmolekul air (H₂O) melalui atom H bermuatan parsial positif dengan pasangan elektron bebas pada atom O molekul tetangga',
      'C. Ikatan intramolekul C–H di dalam molekul metana (CH₄)',
      'D. Molekul gas nitrogen (N≡N) di udara',
      'E. Molekul gas fluorin (F–F)',
    ],
    correctOption: 'B',
    explanation: 'Ikatan hidrogen hanya terbentuk jika atom hidrogen terikat langsung secara kovalen pada atom yang sangat elektronegatif dan berukuran kecil (F, O, atau N) sehingga atom H memiliki kerapatan elektron sangat rendah (δ⁺), yang kemudian ditarik oleh pasangan elektron bebas (PEB) dari atom F, O, atau N pada molekul di dekatnya.',
    sourceTopic: 'Ikatan Hidrogen',
  },
  {
    id: 'q4',
    question: 'Bagaimana mekanisme mendasar terjadinya gaya tarik dipol-dipol pada senyawa seperti asam klorida (HCl)?',
    options: [
      'A. Pertukaran elektron valensi secara permanen antarmolekul',
      'B. Tarik-menarik elektrostatik antara kutub positif parsial (δ⁺) pada suatu molekul dengan kutub negatif parsial (δ⁻) pada molekul di dekatnya',
      'C. Induksi medan magnet luar yang mempolarisasi molekul',
      'D. Tolakan antar awan elektron yang simetris',
      'E. Pembentukan kisi kristal ionik pada suhu kamar',
    ],
    correctOption: 'B',
    explanation: 'Molekul polar seperti HCl memiliki momen dipol permanen karena perbedaan keelektronegatifan (H = 2,20 dan Cl = 3,16). Ujung H yang bermuatan δ⁺ menarik ujung Cl yang bermuatan δ⁻ dari molekul tetangganya ketika orientasi ruangnya sejajar/mendukung.',
    sourceTopic: 'Gaya Dipol-Dipol',
  },
  {
    id: 'q5',
    question: 'Berdasarkan literatur kimia (Raymond Chang), bagaimana perbandingan rentang energi gaya antarmolekul dibandingkan dengan energi ikatan kovalen intramolekul?',
    options: [
      'A. Energi gaya antarmolekul sama kuat dengan ikatan kovalen (~200–500 kJ/mol)',
      'B. Gaya antarmolekul jauh lebih lemah (≈ 2–40 kJ/mol) dibandingkan ikatan kovalen (≈ 200–500 kJ/mol)',
      'C. Gaya antarmolekul lebih kuat karena melibatkan volume molekul yang besar',
      'D. Gaya antarmolekul berenergi mendekati nol (< 0,001 kJ/mol) dan tidak berpengaruh pada titik didih',
      'E. Energi ikatan kovalen selalu bernilai negatif sedangkan gaya antarmolekul selalu bernilai nol',
    ],
    correctOption: 'B',
    explanation: 'Energi gaya antarmolekul (Van der Waals dan ikatan hidrogen) berada pada rentang ≈ 2–40 kJ/mol, sedangkan energi ikatan kovalen intramolekul (seperti ikatan O–H dalam air) mencapai ≈ 460 kJ/mol. Inilah mengapa saat air mendidih (100 °C), hanya gaya antarmolekul yang terputus, sedangkan molekul H₂O tetap utuh.',
    sourceTopic: 'Energetika Ikatan Kimia',
  },
];

