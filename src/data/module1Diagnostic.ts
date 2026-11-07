
export type DiagnosticQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOption: string;
  explanation: string;
};

export const MODULE_1_DIAGNOSTIC: DiagnosticQuestion[] = [
  {
    id: "d1",
    question:
      "Ketika air dan minyak dituangkan ke dalam satu gelas, apa yang biasanya terjadi?",
    options: [
      "A. Keduanya langsung menyatu sempurna.",
      "B. Keduanya membentuk dua lapisan.",
      "C. Minyak berubah menjadi air.",
      "D. Air menghilang dari gelas."
    ],
    correctOption: "B",
    explanation:
      "Air dan minyak biasanya membentuk dua lapisan karena keduanya tidak bercampur secara merata."
  },
  {
    id: "d2",
    question:
      "Jika campuran air dan minyak dikocok, apa yang kemungkinan terjadi?",
    options: [
      "A. Keduanya bercampur sementara, kemudian dapat terpisah kembali.",
      "B. Keduanya berubah menjadi satu jenis cairan baru.",
      "C. Minyak larut seluruhnya dan tidak akan terpisah.",
      "D. Air berubah menjadi minyak."
    ],
    correctOption: "A",
    explanation:
      "Pengocokan dapat membuat minyak tersebar sementara dalam air. Setelah didiamkan, keduanya dapat kembali terpisah."
  },
  {
    id: "d3",
    question:
      "Manakah pernyataan yang paling sesuai dengan pengamatan terhadap air dan minyak?",
    options: [
      "A. Air dan minyak selalu memiliki warna yang sama.",
      "B. Air dan minyak merupakan dua cairan yang memiliki sifat berbeda.",
      "C. Air dan minyak selalu memiliki bau yang sama.",
      "D. Air dan minyak selalu dapat bercampur."
    ],
    correctOption: "B",
    explanation:
      "Air dan minyak merupakan dua zat cair yang memiliki karakteristik dan sifat berbeda."
  },
  {
    id: "d4",
    question:
      "Ketika air dan minyak didiamkan setelah dikocok, minyak biasanya terlihat berada di bagian atas. Fenomena ini menunjukkan bahwa ...",
    options: [
      "A. Minyak berubah menjadi lebih ringan setelah dikocok.",
      "B. Air menguap seluruhnya.",
      "C. Kedua cairan kembali membentuk lapisan terpisah.",
      "D. Minyak berubah menjadi gas."
    ],
    correctOption: "C",
    explanation:
      "Setelah didiamkan, air dan minyak kembali membentuk dua lapisan. Minyak umumnya berada di atas karena massa jenisnya lebih rendah daripada air."
  },
  {
    id: "d5",
    question:
      "Dalam kehidupan sehari-hari, sabun cuci piring sering digunakan untuk membantu membersihkan minyak pada peralatan makan. Sabun membantu ...",
    options: [
      "A. Mengubah minyak menjadi air.",
      "B. Membantu minyak terangkat dan terdispersi dalam air saat dicuci.",
      "C. Menghilangkan seluruh air dari peralatan makan.",
      "D. Mengubah minyak menjadi gas."
    ],
    correctOption: "B",
    explanation:
      "Sabun membantu minyak terdispersi dalam air sehingga lebih mudah terangkat saat proses pencucian."
  }
];
