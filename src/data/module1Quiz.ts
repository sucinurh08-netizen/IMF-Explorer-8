export type QuizQuestion = {
  id: string;
  question: string;
  options: string[]; // A‑E
  correctOption: string; // e.g., 'B'
  explanation: string; // feedback shown after submit
};

export const MODULE_1_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Apa yang menyebabkan air dan minyak tidak bercampur?',
    options: [
      'Perbedaan massa jenis',
      'Perbedaan polaritas molekul',
      'Interaksi ionik kuat',
      'Kadar garam dalam air',
      'Suhu lingkungan tinggi',
    ],
    correctOption: 'B',
    explanation: 'Air polar dan minyak non‑polar; gaya London tidak cukup kuat untuk mengatasi interaksi polar‑nonpolar.',
  },
  {
    id: 'q2',
    question: 'Gaya London terjadi pada:',
    options: ['Molekul polar saja', 'Molekul nonpolar saja', 'Semua molekul', 'Hanya molekul gas', 'Molekul ionik'],
    correctOption: 'C',
    explanation: 'Fluktuasi awan elektron menghasilkan dipol sesaat pada semua molekul, baik polar maupun nonpolar.',
  },
  {
    id: 'q3',
    question: 'Manakah contoh ikatan hidrogen yang sah?',
    options: ['H‑Cl', 'O‑H dalam H₂O', 'C‑H dalam CH₄', 'N‑N dalam N₂', 'F‑F dalam F₂'],
    correctOption: 'B',
    explanation: 'Ikatan hidrogen memerlukan H‑δ⁺ yang terikat pada F, O, atau N yang memiliki pasangan elektron bebas.',
  },
  {
    id: 'q4',
    question: 'Apa yang menjadi penyebab gaya dipol‑dipol?',
    options: [
      'Interaksi antara molekul nonpolar',
      'Interaksi antara kutub positif‑negatif pada molekul polar',
      'Pengaruh medan magnet eksternal',
      'Gaya van der Waals',
      'Tekanan tinggi',
    ],
    correctOption: 'B',
    explanation: 'Molekul polar memiliki muatan parsial δ⁺ dan δ⁻; orientasi yang tepat menghasilkan tarik‑tarik elektrostatik.',
  },
  {
    id: 'q5',
    question: 'Berapa nilai energi gaya antarmolekul dibandingkan ikatan kovalen?',
    options: ['~200‑500 kJ mol⁻¹', '≈2‑40 kJ mol⁻¹', '≈100‑200 kJ mol⁻¹', '≈0,5‑1 kJ mol⁻¹', 'Tidak dapat diukur'],
    correctOption: 'B',
    explanation: 'Gaya antarmolekul jauh lebih lemah (≈2‑40 kJ mol⁻¹) dibandingkan ikatan kovalen (≈200‑500 kJ mol⁻¹).',
  },
];

