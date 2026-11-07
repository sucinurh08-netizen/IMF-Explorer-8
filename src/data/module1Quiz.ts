
export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOption: string;
  explanation: string;
};

export const MODULE_1_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Apa faktor utama yang menyebabkan air dan minyak sulit bercampur?',
    options: [
      'Perbedaan massa jenis kedua zat',
      'Perbedaan polaritas dan karakteristik interaksi antarmolekul',
      'Adanya ikatan ionik antara air dan minyak',
      'Perbedaan jumlah atom dalam molekul',
      'Perbedaan suhu kedua zat',
    ],
    correctOption: 'B',
    explanation: 'Air bersifat polar, sedangkan minyak umumnya nonpolar. Interaksi antara keduanya kurang menguntungkan dibandingkan interaksi antarmolekul sejenis sehingga keduanya cenderung membentuk dua fase.'
  },
  {
    id: 'q2',
    question: 'Gaya dispersi London dapat terjadi pada ...',
    options: [
      'Molekul polar saja',
      'Molekul nonpolar saja',
      'Semua atom dan molekul',
      'Hanya molekul gas',
      'Hanya senyawa ionik',
    ],
    correctOption: 'C',
    explanation: 'Gaya dispersi London berasal dari dipol sesaat akibat perubahan distribusi elektron. Gaya ini dapat terjadi pada semua atom dan molekul.'
  },
  {
    id: 'q3',
    question: 'Manakah pasangan molekul yang dapat membentuk ikatan hidrogen antarmolekul?',
    options: [
      'CH₄ dengan CH₄',
      'HCl dengan HCl',
      'H₂O dengan H₂O',
      'N₂ dengan N₂',
      'CO₂ dengan CO₂',
    ],
    correctOption: 'C',
    explanation: 'Molekul air memiliki atom H yang terikat pada O dan pasangan elektron bebas pada O molekul lain. Keduanya memungkinkan terbentuknya ikatan hidrogen antarmolekul.'
  },
  {
    id: 'q4',
    question: 'Gaya dipol-dipol terjadi akibat interaksi antara ...',
    options: [
      'Molekul-molekul nonpolar',
      'Kutub positif dan negatif dari molekul-molekul polar',
      'Inti atom dengan elektron bebas',
      'Ion positif dan ion negatif saja',
      'Elektron dengan medan magnet',
    ],
    correctOption: 'B',
    explanation: 'Molekul polar memiliki momen dipol permanen. Tarik-menarik elektrostatik terjadi antara bagian bermuatan parsial positif dan negatif dari molekul yang berdekatan.'
  },
  {
    id: 'q5',
    question: 'Pernyataan yang tepat mengenai gaya antarmolekul dibandingkan ikatan kovalen adalah ...',
    options: [
      'Gaya antarmolekul umumnya lebih kuat',
      'Keduanya selalu memiliki kekuatan yang sama',
      'Gaya antarmolekul umumnya lebih lemah',
      'Gaya antarmolekul hanya terjadi pada zat cair',
      'Ikatan kovalen hanya terjadi pada zat gas',
    ],
    correctOption: 'C',
    explanation: 'Secara umum, gaya antarmolekul lebih lemah daripada ikatan kovalen yang mengikat atom-atom dalam molekul.'
  },
];
