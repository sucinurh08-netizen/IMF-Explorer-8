
import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import './Module1Page.css';
import './Module7Page.css';

type StudentIdentity = {
    name: string;
    studentClass: string;
    attendanceNumber: string;
};

type QuizStage = 'identity' | 'multiple-choice' | 'essay' | 'result' | 'review';

type QuizOption = {
    label: string;
    text: string;
};

type QuizQuestion = {
    id: string;
    level: string;
    topic: string;
    stimulus: string;
    question: string;
    options: QuizOption[];
    correctAnswer: string;
    indicator: string;
    explanation: string;
    visual?: 'hydrogen-bond' | 'oil-water' | 'models' | 'surfactant';
};

type EssayQuestion = {
    level: string;
    title: string;
    stimulus: string;
    questions: string[];
    expectedAnswers: string[];
};

const MODULE_7_QUESTIONS: QuizQuestion[] = [
    {
        id: 'q1',
        level: 'C4',
        topic: 'Gaya Dispersi London',
        stimulus: `Perhatikan data titik didih beberapa senyawa hidrida golongan 14 berikut.

Senyawa | Massa molekul relatif | Titik didih
CH₄ | 16 | −161,5 °C
SiH₄ | 32 | −111,8 °C
GeH₄ | 77 | −88,5 °C
SnH₄ | 123 | −52,0 °C

Senyawa-senyawa tersebut memiliki bentuk molekul tetrahedral dan bersifat nonpolar. Berdasarkan data, seorang siswa menyimpulkan bahwa kenaikan titik didih terjadi karena semakin besar massa molekul relatif, semakin kuat ikatan kovalen di dalam molekul.`,
        question: 'Analisis manakah yang paling tepat untuk menjelaskan kecenderungan titik didih tersebut sekaligus mengoreksi kesimpulan siswa?',
        options: [
            {
                label: 'A',
                text: 'Kenaikan titik didih terjadi karena ikatan kovalen antara atom pusat dan hidrogen semakin kuat, sehingga diperlukan energi lebih besar untuk memutus ikatan tersebut ketika senyawa berubah menjadi gas.'
            },
            {
                label: 'B',
                text: 'Kenaikan massa molekul relatif menunjukkan bertambahnya jumlah elektron dan ukuran awan elektron, sehingga polarizabilitas meningkat dan gaya dispersi London antarmolekul menjadi semakin kuat.'
            },
            {
                label: 'C',
                text: 'Kenaikan titik didih terjadi karena senyawa dengan massa molekul lebih besar memiliki kepolaran semakin tinggi, sehingga interaksi dipol-dipol menjadi gaya antarmolekul yang dominan.'
            },
            {
                label: 'D',
                text: 'Kenaikan titik didih disebabkan oleh bertambahnya jumlah ikatan hidrogen yang terbentuk antarmolekul seiring dengan meningkatnya ukuran molekul hidrida.'
            },
            {
                label: 'E',
                text: 'Kenaikan titik didih terjadi karena semakin besar massa molekul relatif, semakin kuat gaya tarik gravitasi antarmolekul sehingga molekul semakin sulit berpindah ke fase gas.'
            }
        ],
        correctAnswer: 'B',
        indicator: 'Disajikan tabel massa molekul relatif dan titik didih senyawa nonpolar, siswa mampu menganalisis hubungan ukuran awan elektron, polarizabilitas, gaya dispersi London, dan titik didih serta mengevaluasi kesalahan penjelasan yang diberikan.',
        explanation: 'CH₄, SiH₄, GeH₄, dan SnH₄ merupakan molekul nonpolar sehingga gaya antarmolekul dominannya adalah gaya dispersi London. Semakin besar ukuran molekul dan jumlah elektronnya, awan elektron semakin mudah terpolarisasi. Dipol sesaat yang terbentuk dapat menginduksi dipol pada molekul lain sehingga gaya dispersi London semakin kuat. Akibatnya, diperlukan energi lebih besar untuk mengatasi gaya tarik antarmolekul ketika zat mendidih. Pendidihan tidak memutus ikatan kovalen di dalam molekul.'
    },
    {
        id: 'q2',
        level: 'C4',
        topic: 'Ikatan Hidrogen',
        visual: 'hydrogen-bond',
        stimulus: `Perhatikan ilustrasi interaksi antarmolekul air berikut.

Ilustrasi molekul air. Garis putus-putus menunjukkan interaksi antarmolekul, bukan ikatan kovalen O–H.

Dalam suatu diskusi, seorang siswa menyatakan bahwa garis putus-putus pada diagram tersebut merupakan ikatan yang menghubungkan atom oksigen dan hidrogen dalam satu molekul air. Siswa lain menyatakan bahwa garis tersebut menunjukkan gaya tarik antara atom H dari satu molekul air dengan pasangan elektron bebas atom O dari molekul air lain.`,
        question: 'Analisis manakah yang paling tepat?',
        options: [
            {
                label: 'A',
                text: 'Pernyataan pertama benar karena semua garis yang menghubungkan atom O dan H dalam air menunjukkan ikatan kovalen, baik di dalam maupun di antara molekul.'
            },
            {
                label: 'B',
                text: 'Pernyataan kedua benar karena ikatan hidrogen merupakan interaksi antarmolekul antara H yang terikat pada O dan pasangan elektron bebas pada O molekul lain.'
            },
            {
                label: 'C',
                text: 'Kedua pernyataan benar karena ikatan kovalen dan ikatan hidrogen merupakan jenis ikatan intramolekul yang memiliki kekuatan relatif sama.'
            },
            {
                label: 'D',
                text: 'Pernyataan pertama benar karena atom H dalam molekul air memiliki muatan parsial positif yang menyebabkan ikatan kovalen O–H berubah menjadi gaya dipol-dipol.'
            },
            {
                label: 'E',
                text: 'Kedua pernyataan salah karena molekul air hanya memiliki gaya dispersi London dan tidak dapat membentuk interaksi antarmolekul lainnya.'
            }
        ],
        correctAnswer: 'B',
        indicator: 'Disajikan diagram interaksi antarmolekul air dan dua interpretasi siswa, siswa mampu menganalisis perbedaan ikatan kovalen intramolekul dan ikatan hidrogen antarmolekul.',
        explanation: 'Ikatan kovalen O–H menghubungkan atom O dan H di dalam satu molekul air. Sementara itu, ikatan hidrogen terbentuk melalui interaksi antara atom H yang terikat pada O dari satu molekul dan pasangan elektron bebas pada atom O molekul lain. Garis putus-putus pada diagram digunakan untuk menggambarkan interaksi antarmolekul tersebut. Keduanya berbeda dari segi sifat dan kekuatan interaksinya.'
    },
    {
        id: 'q3',
        level: 'C4',
        topic: 'Polaritas dan Gaya Antarmolekul',
        visual: 'oil-water',
        stimulus: `Dalam suatu percobaan, siswa memasukkan air dan minyak ke dalam gelas kimia, kemudian mengaduk campuran tersebut. Setelah beberapa saat, kedua cairan kembali membentuk dua lapisan.

Seorang siswa berpendapat bahwa minyak tidak bercampur dengan air semata-mata karena massa molekul minyak lebih besar daripada massa molekul air.`,
        question: 'Berdasarkan konsep polaritas dan gaya antarmolekul, analisis manakah yang paling tepat untuk menjelaskan fenomena tersebut?',
        options: [
            {
                label: 'A',
                text: 'Air dan minyak tidak bercampur karena molekul minyak memiliki gaya dispersi London lebih kuat sehingga seluruh molekul air terdorong keluar dari campuran.'
            },
            {
                label: 'B',
                text: 'Air dan minyak tidak bercampur karena air bersifat polar dan dapat membentuk ikatan hidrogen, sedangkan komponen utama minyak bersifat nonpolar sehingga interaksi antara air dan minyak tidak cukup menguntungkan untuk menghasilkan campuran homogen.'
            },
            {
                label: 'C',
                text: 'Air dan minyak tidak bercampur karena air hanya dapat berinteraksi dengan senyawa yang memiliki ikatan kovalen polar, sedangkan molekul minyak tidak mempunyai ikatan kovalen.'
            },
            {
                label: 'D',
                text: 'Air dan minyak tidak bercampur karena ikatan hidrogen di dalam molekul air lebih kuat daripada ikatan kovalen pada molekul minyak sehingga kedua zat tidak dapat mengalami perubahan susunan molekul.'
            },
            {
                label: 'E',
                text: 'Air dan minyak tidak bercampur karena molekul minyak tidak memiliki elektron yang dapat berinteraksi dengan molekul air melalui gaya tarik elektrostatik.'
            }
        ],
        correctAnswer: 'B',
        indicator: 'Disajikan fenomena pemisahan air dan minyak serta argumen siswa, siswa mampu menganalisis hubungan polaritas, gaya antarmolekul, dan kemiscibilan dua cairan.',
        explanation: 'Air bersifat polar dan membentuk ikatan hidrogen antarmolekul. Minyak umumnya tersusun atas molekul nonpolar yang interaksi dominannya adalah gaya dispersi London. Interaksi antara air dan minyak tidak cukup menguntungkan untuk menggantikan interaksi antarmolekul dalam masing-masing cairan. Oleh karena itu, keduanya cenderung memisah menjadi dua lapisan. Massa molekul bukan satu-satunya penentu kemiscibilan.'
    },
    {
        id: 'q4',
        level: 'C4',
        topic: 'Penguapan dan Gaya Antarmolekul',
        stimulus: `Parfum yang disemprotkan pada kulit lama-kelamaan menghilang meskipun tidak terlihat adanya perubahan kimia pada komponen utamanya.

Seorang siswa menyatakan bahwa parfum menguap karena ikatan kovalen di dalam molekul pewangi terputus sehingga molekul-molekulnya berubah menjadi gas.`,
        question: 'Analisis manakah yang paling tepat untuk menjelaskan fenomena tersebut?',
        options: [
            {
                label: 'A',
                text: 'Molekul pewangi mengalami pemutusan seluruh ikatan kovalen, kemudian atom-atomnya bergerak bebas dan membentuk fase gas.'
            },
            {
                label: 'B',
                text: 'Molekul pewangi menyerap energi sehingga ikatan kovalen antaratom di dalam molekul melemah, sedangkan gaya antarmolekul tidak mengalami perubahan.'
            },
            {
                label: 'C',
                text: 'Molekul pewangi menyerap energi dari lingkungan sehingga sebagian molekul memperoleh energi yang cukup untuk mengatasi gaya tarik antarmolekul dan berpindah ke fase gas tanpa memutus ikatan kovalen intramolekul.'
            },
            {
                label: 'D',
                text: 'Molekul pewangi berubah menjadi gas karena seluruh gaya antarmolekulnya hilang secara permanen setelah bersentuhan dengan permukaan kulit.'
            },
            {
                label: 'E',
                text: 'Molekul pewangi mengalami reaksi kimia dengan oksigen udara sehingga menghasilkan senyawa baru yang memiliki titik didih lebih rendah.'
            }
        ],
        correctAnswer: 'C',
        indicator: 'Disajikan fenomena penguapan parfum dan suatu penjelasan siswa, siswa mampu menganalisis perbedaan gaya intramolekul dan antarmolekul dalam proses perubahan fase.',
        explanation: 'Penguapan merupakan perubahan fisika. Molekul menyerap energi dari lingkungan dan sebagian molekul memperoleh energi yang cukup untuk mengatasi gaya tarik antarmolekul sehingga dapat berpindah ke fase gas. Ikatan kovalen di dalam molekul tetap utuh. Dengan demikian, penguapan tidak mengharuskan pemutusan ikatan kovalen.'
    },
    {
        id: 'q5',
        level: 'C5',
        topic: 'Evaluasi Argumen tentang Titik Didih',
        stimulus: `Perhatikan karakteristik tiga senyawa berikut.

Senyawa | Polaritas | Gaya antarmolekul
CH₄ | Nonpolar | Dispersi London
HCl | Polar | Dipol-dipol dan dispersi London
H₂O | Polar | Ikatan hidrogen, dipol-dipol, dan dispersi London

Seorang siswa menyusun tiga argumen berikut.

1. HCl mempunyai titik didih lebih tinggi daripada CH₄ karena HCl memiliki interaksi dipol-dipol selain gaya dispersi London.
2. H₂O mempunyai titik didih lebih tinggi daripada HCl karena molekul air dapat membentuk ikatan hidrogen yang kuat.
3. CH₄ mempunyai titik didih paling tinggi karena molekulnya nonpolar sehingga seluruh gaya tarik antarmolekul terkonsentrasi pada satu jenis interaksi.`,
        question: 'Berdasarkan konsep gaya antarmolekul, evaluasi manakah yang paling tepat terhadap argumen tersebut?',
        options: [
            {
                label: 'A',
                text: 'Argumen 1 dan 2 tepat, sedangkan argumen 3 tidak tepat karena sifat nonpolar tidak otomatis membuat gaya dispersi London lebih kuat daripada keseluruhan interaksi pada molekul polar.'
            },
            {
                label: 'B',
                text: 'Argumen 1 dan 3 tepat, sedangkan argumen 2 tidak tepat karena ikatan hidrogen hanya terjadi di dalam molekul air, bukan di antara molekul-molekulnya.'
            },
            {
                label: 'C',
                text: 'Argumen 2 dan 3 tepat, sedangkan argumen 1 tidak tepat karena molekul HCl dan CH₄ sama-sama hanya mengalami gaya dispersi London.'
            },
            {
                label: 'D',
                text: 'Ketiga argumen tepat karena setiap jenis gaya antarmolekul selalu menghasilkan titik didih yang sama apabila jumlah molekulnya sama.'
            },
            {
                label: 'E',
                text: 'Ketiga argumen tidak tepat karena titik didih suatu zat hanya ditentukan oleh massa molekul relatif, bukan oleh jenis gaya antarmolekul.'
            }
        ],
        correctAnswer: 'A',
        indicator: 'Disajikan karakteristik molekul dan beberapa argumen ilmiah, siswa mampu mengevaluasi konsistensi penjelasan tentang hubungan polaritas, jenis gaya antarmolekul, dan titik didih.',
        explanation: 'CH₄ bersifat nonpolar dan memiliki gaya dispersi London. HCl bersifat polar sehingga memiliki gaya dipol-dipol selain gaya dispersi London. H₂O dapat membentuk ikatan hidrogen yang menyebabkan titik didihnya jauh lebih tinggi. Argumen ketiga salah karena jumlah jenis interaksi bukan penentu tunggal titik didih. Ukuran molekul, polarizabilitas, struktur, dan kekuatan interaksi juga harus dipertimbangkan.'
    },
    {
        id: 'q6',
        level: 'C5',
        topic: 'Evaluasi Data Penguapan',
        stimulus: `Sekelompok siswa melakukan percobaan untuk membandingkan kecepatan penguapan tiga cairan. Mereka menggunakan volume awal yang sama dan mencatat waktu hingga cairan tidak lagi terlihat dalam wadah.

Cairan | Waktu hingga tidak terlihat
P | 4 menit
Q | 9 menit
R | 15 menit

Berdasarkan pengamatan tersebut, siswa menyimpulkan bahwa cairan P pasti memiliki gaya antarmolekul paling lemah, cairan Q berada di urutan kedua, dan cairan R memiliki gaya antarmolekul paling kuat.

Seorang siswa lain mempertanyakan kesimpulan tersebut karena belum ada informasi mengenai suhu, luas permukaan, dan aliran udara selama percobaan.`,
        question: 'Evaluasi manakah yang paling tepat terhadap permasalahan tersebut?',
        options: [
            {
                label: 'A',
                text: 'Kesimpulan pertama sepenuhnya benar karena waktu penguapan merupakan satu-satunya parameter yang diperlukan untuk menentukan kekuatan gaya antarmolekul suatu zat.'
            },
            {
                label: 'B',
                text: 'Kesimpulan pertama dapat diterima tanpa informasi tambahan karena seluruh cairan dengan volume awal sama pasti mempunyai luas permukaan dan tekanan uap yang sama.'
            },
            {
                label: 'C',
                text: 'Kesimpulan pertama belum cukup kuat karena laju penguapan dipengaruhi oleh kondisi percobaan dan sifat zat. Suhu, luas permukaan, serta aliran udara perlu dikendalikan sebelum perbedaan waktu penguapan digunakan untuk membandingkan kecenderungan volatilitas cairan.'
            },
            {
                label: 'D',
                text: 'Kesimpulan pertama salah karena cairan yang menguap paling cepat selalu mempunyai gaya antarmolekul paling kuat akibat energi kinetik molekulnya lebih besar.'
            },
            {
                label: 'E',
                text: 'Kesimpulan pertama tidak dapat digunakan sama sekali karena waktu penguapan tidak memiliki hubungan dengan kecenderungan suatu zat untuk menguap.'
            }
        ],
        correctAnswer: 'C',
        indicator: 'Disajikan data percobaan penguapan dan dua pandangan siswa, siswa mampu mengevaluasi validitas kesimpulan berdasarkan kecukupan bukti, pengendalian variabel, dan keterbatasan eksperimen.',
        explanation: 'Waktu penguapan dapat memberikan indikasi mengenai volatilitas cairan, tetapi tidak cukup untuk membuktikan urutan kekuatan gaya antarmolekul tanpa pengendalian variabel. Suhu, luas permukaan, aliran udara, tekanan, serta karakteristik masing-masing zat dapat memengaruhi laju penguapan. Kesimpulan ilmiah harus didukung oleh data yang diperoleh melalui prosedur yang terkontrol.'
    },
    {
        id: 'q7',
        level: 'C5',
        topic: 'Evaluasi Representasi Ikatan Hidrogen',
        visual: 'models',
        stimulus: `Perhatikan empat representasi interaksi antarmolekul berikut. Pada setiap diagram, simbol O menunjukkan atom oksigen, H menunjukkan atom hidrogen, sedangkan garis putus-putus menunjukkan interaksi antarmolekul.

Diagram I: H dari satu H₂O berinteraksi dengan O molekul air lain.
Diagram II: Garis putus-putus menghubungkan dua atom O.
Diagram III: Garis putus-putus menghubungkan dua atom H.
Diagram IV: Garis putus-putus ditunjukkan di antara O dan H dalam satu molekul air.

Catatan: ilustrasi di atas merupakan gambaran konsep. Diagram opsi final perlu dibuat ulang dengan struktur molekul dan orientasi atom yang konsisten.`,
        question: 'Seorang siswa diminta memilih diagram yang paling tepat untuk menggambarkan ikatan hidrogen antarmolekul pada air. Evaluasi manakah yang paling tepat?',
        options: [
            {
                label: 'A',
                text: 'Diagram I, karena ikatan hidrogen melibatkan atom H yang terikat pada O dari satu molekul dan pasangan elektron bebas pada O molekul lain.'
            },
            {
                label: 'B',
                text: 'Diagram II, karena ikatan hidrogen terbentuk akibat interaksi langsung antara dua atom oksigen yang memiliki muatan parsial negatif.'
            },
            {
                label: 'C',
                text: 'Diagram III, karena ikatan hidrogen terbentuk akibat interaksi langsung antara dua atom hidrogen yang memiliki muatan parsial positif.'
            },
            {
                label: 'D',
                text: 'Diagram IV, karena ikatan hidrogen merupakan ikatan yang menghubungkan atom O dan H dalam satu molekul air.'
            },
            {
                label: 'E',
                text: 'Semua diagram benar karena seluruh atom dalam molekul air dapat saling berinteraksi tanpa memperhatikan posisi dan muatan parsialnya.'
            }
        ],
        correctAnswer: 'A',
        indicator: 'Disajikan beberapa representasi visual interaksi molekul air, siswa mampu mengevaluasi ketepatan diagram berdasarkan struktur molekul, muatan parsial, dan syarat pembentukan ikatan hidrogen.',
        explanation: 'Ikatan hidrogen dalam air terbentuk antara atom H yang terikat kovalen pada O suatu molekul dengan pasangan elektron bebas pada O molekul air lain. Interaksi tersebut digambarkan sebagai O–H···O. Dua atom O yang sama-sama bermuatan parsial negatif atau dua atom H yang sama-sama bermuatan parsial positif bukan representasi ikatan hidrogen yang tepat. Ikatan kovalen O–H dalam satu molekul juga harus dibedakan dari interaksi antarmolekul.'
    },
    {
        id: 'q8',
        level: 'C5',
        topic: 'Evaluasi Model Gaya Antarmolekul',
        stimulus: `Seorang siswa diminta menjelaskan mengapa suatu cairan polar memiliki titik didih lebih tinggi dibandingkan cairan nonpolar dengan ukuran molekul yang relatif sebanding. Ia mengembangkan dua model penjelasan berikut.

Model I: Perbedaan titik didih hanya disebabkan oleh gaya dispersi London karena semua molekul mempunyai elektron.

Model II: Perbedaan titik didih dapat dipengaruhi oleh gaya dispersi London dan interaksi dipol-dipol. Pada kondisi ukuran molekul yang sebanding, keberadaan interaksi dipol-dipol dapat menambah gaya tarik antarmolekul.`,
        question: 'Model manakah yang lebih layak digunakan dan alasan evaluatif manakah yang paling kuat?',
        options: [
            {
                label: 'A',
                text: 'Model I lebih layak karena gaya dispersi London selalu menjadi satu-satunya gaya antarmolekul yang menentukan titik didih, sedangkan polaritas tidak memengaruhi sifat fisik zat.'
            },
            {
                label: 'B',
                text: 'Model I lebih layak karena gaya dipol-dipol hanya terjadi pada fase padat dan tidak memberikan pengaruh terhadap proses penguapan cairan.'
            },
            {
                label: 'C',
                text: 'Model II lebih layak karena mempertimbangkan lebih dari satu jenis interaksi antarmolekul, sehingga penjelasannya lebih sesuai untuk membandingkan cairan polar dan nonpolar dengan ukuran molekul yang sebanding.'
            },
            {
                label: 'D',
                text: 'Model II tidak layak karena molekul polar tidak mempunyai gaya dispersi London dan hanya mengalami gaya dipol-dipol.'
            },
            {
                label: 'E',
                text: 'Kedua model sama-sama tidak layak karena titik didih hanya dapat dijelaskan melalui energi ikatan kovalen di dalam molekul.'
            }
        ],
        correctAnswer: 'C',
        indicator: 'Disajikan dua model penjelasan ilmiah, siswa mampu mengevaluasi kelengkapan dan ketepatan model berdasarkan karakteristik molekul dan jenis gaya antarmolekul.',
        explanation: 'Semua molekul memiliki gaya dispersi London. Molekul polar juga memiliki gaya dipol-dipol. Karena itu, Model II lebih lengkap untuk menjelaskan perbedaan interaksi pada molekul polar dan nonpolar yang ukurannya sebanding. Walaupun demikian, ukuran molekul, bentuk molekul, dan kemungkinan ikatan hidrogen tetap perlu diperhitungkan dalam membandingkan titik didih.'
    },
    {
        id: 'q9',
        level: 'C6',
        topic: 'Rancangan Penyelidikan Ilmiah',
        stimulus: `Sebuah kelompok siswa ingin menyelidiki pengaruh karakteristik gaya antarmolekul terhadap kecenderungan suatu cairan untuk menguap. Mereka berencana membandingkan dua cairan yang memiliki karakteristik molekul berbeda.

Tujuan penelitian tersebut adalah memperoleh data yang dapat digunakan untuk menyusun kesimpulan ilmiah mengenai hubungan karakteristik molekul dan volatilitas.`,
        question: 'Rancangan penyelidikan manakah yang paling tepat untuk dikembangkan?',
        options: [
            {
                label: 'A',
                text: 'Menggunakan dua cairan dengan volume berbeda, meletakkannya di ruangan berbeda, kemudian mencatat cairan yang lebih dahulu menguap agar hasil percobaan lebih bervariasi.'
            },
            {
                label: 'B',
                text: 'Menggunakan dua cairan dengan massa awal dan luas permukaan yang terukur, meletakkannya pada suhu serta kondisi aliran udara yang sama, kemudian mengukur perubahan massa pada interval waktu tertentu.'
            },
            {
                label: 'C',
                text: 'Menggunakan dua cairan dengan jenis wadah dan suhu berbeda, kemudian membandingkan bau yang dihasilkan untuk menentukan cairan yang mempunyai gaya antarmolekul lebih kuat.'
            },
            {
                label: 'D',
                text: 'Menggunakan dua cairan dengan massa awal berbeda, memanaskannya secara bersamaan sampai mendidih, kemudian membandingkan warna uap sebagai indikator kekuatan gaya antarmolekul.'
            },
            {
                label: 'E',
                text: 'Menggunakan dua cairan dalam wadah tertutup dengan volume berbeda, kemudian mengamati bentuk permukaan cairan tanpa mengukur perubahan massa atau mengendalikan suhu.'
            }
        ],
        correctAnswer: 'B',
        indicator: 'Disajikan permasalahan penyelidikan tentang volatilitas, siswa mampu memilih rancangan eksperimen yang mengendalikan variabel dan menghasilkan bukti untuk menjelaskan hubungan karakteristik molekul dengan kecenderungan penguapan.',
        explanation: 'Rancangan B memungkinkan perbandingan yang lebih terkontrol melalui pengukuran perubahan massa pada interval waktu tertentu. Suhu, kondisi aliran udara, dan luas permukaan perlu dikendalikan. Massa awal juga perlu ditetapkan secara konsisten. Pemilihan sampel harus mempertimbangkan sifat kimia, keamanan bahan, dan karakteristik molekulnya. Hasil penguapan tidak boleh langsung dianggap sebagai ukuran tunggal kekuatan gaya antarmolekul karena volatilitas juga dipengaruhi oleh tekanan uap dan faktor lainnya.'
    },
    {
        id: 'q10',
        level: 'C6',
        topic: 'Penerapan Gaya Antarmolekul dan Surfaktan',
        visual: 'surfactant',
        stimulus: `Sebuah tim pengembang produk ingin membuat cairan pembersih yang mampu mengangkat noda minyak pada permukaan peralatan. Mereka mengetahui bahwa air bersifat polar, sedangkan sebagian besar komponen minyak bersifat nonpolar.

Tim tersebut mempertimbangkan beberapa rancangan produk. Mereka juga mempelajari struktur surfaktan yang memiliki bagian hidrofilik dan hidrofobik.

Bagian hidrofilik berinteraksi dengan lingkungan air, sedangkan bagian hidrofobik berasosiasi dengan minyak atau bagian nonpolar.`,
        question: 'Berdasarkan prinsip gaya antarmolekul, rancangan manakah yang paling tepat untuk dikembangkan?',
        options: [
            {
                label: 'A',
                text: 'Menggunakan air murni dengan konsentrasi lebih tinggi karena peningkatan jumlah molekul air akan membuat gaya dipol-dipol semakin kuat dan otomatis menarik seluruh molekul minyak.'
            },
            {
                label: 'B',
                text: 'Menggunakan cairan yang seluruh komponennya bersifat nonpolar karena zat nonpolar selalu dapat bercampur dengan air melalui gaya dispersi London yang lebih kuat daripada ikatan hidrogen.'
            },
            {
                label: 'C',
                text: 'Menggunakan surfaktan yang memiliki bagian hidrofilik dan hidrofobik sehingga dapat berinteraksi dengan air dan minyak sekaligus serta membantu mendispersikan minyak dalam air.'
            },
            {
                label: 'D',
                text: 'Menggunakan bahan yang meningkatkan ikatan kovalen antarmolekul minyak sehingga minyak berubah menjadi senyawa polar dan langsung larut dalam air.'
            },
            {
                label: 'E',
                text: 'Menggunakan bahan yang menghilangkan seluruh gaya antarmolekul dalam air dan minyak sehingga kedua zat dapat bercampur tanpa memerlukan interaksi tambahan.'
            }
        ],
        correctAnswer: 'C',
        indicator: 'Disajikan permasalahan pengembangan produk pembersih dan diagram struktur surfaktan, siswa mampu memilih solusi berdasarkan polaritas, orientasi bagian hidrofilik-hidrofobik, dan prinsip interaksi antarmolekul.',
        explanation: 'Surfaktan memiliki bagian hidrofilik yang dapat berinteraksi dengan air dan bagian hidrofobik yang dapat berasosiasi dengan minyak. Dalam pembentukan misel, bagian hidrofobik cenderung mengarah ke bagian dalam yang berasosiasi dengan minyak, sedangkan bagian hidrofilik berinteraksi dengan air. Susunan ini membantu minyak terdispersi dalam air. Surfaktan tidak menghilangkan seluruh gaya antarmolekul, tetapi memfasilitasi pembentukan sistem dispersi.'
    }
];

const ESSAY_QUESTIONS: EssayQuestion[] = [
    {
        level: 'C4',
        title: 'Menganalisis Fenomena Air, Minyak, dan Surfaktan',
        stimulus: `Dalam kehidupan sehari-hari, air sering digunakan untuk mencuci berbagai jenis kotoran. Namun, minyak yang menempel pada peralatan terkadang sulit dihilangkan hanya dengan menggunakan air. Penggunaan sabun atau detergen dapat membantu mengangkat minyak dari permukaan benda.

Surfaktan dalam sabun memiliki struktur molekul dengan dua bagian berbeda, yaitu bagian hidrofilik yang berinteraksi dengan air dan bagian hidrofobik yang berinteraksi dengan minyak.`,
        questions: [
            'a. Analisis hubungan polaritas molekul air dan minyak dengan jenis gaya antarmolekul dominan pada masing-masing zat.',
            'b. Jelaskan mengapa air dan minyak cenderung membentuk dua lapisan ketika dicampurkan, meskipun keduanya telah diaduk.',
            'c. Analisis bagaimana struktur molekul surfaktan memungkinkan sabun membantu mengangkat minyak dari permukaan benda.',
            'd. Buatlah representasi sederhana yang menunjukkan orientasi bagian hidrofilik dan hidrofobik surfaktan ketika berinteraksi dengan tetesan minyak dalam air. Berikan keterangan pada gambar tersebut.'
        ],
        expectedAnswers: [
            'Air bersifat polar dan dapat membentuk ikatan hidrogen antarmolekul.',
            'Minyak umumnya bersifat nonpolar dan interaksi dominannya adalah gaya dispersi London.',
            'Interaksi air dan minyak tidak cukup menguntungkan untuk menghasilkan campuran homogen.',
            'Surfaktan memiliki bagian hidrofilik dan hidrofobik.',
            'Bagian hidrofilik berinteraksi dengan air, sedangkan bagian hidrofobik berasosiasi dengan minyak.',
            'Representasi harus menunjukkan orientasi kedua bagian tersebut secara benar.'
        ]
    },
    {
        level: 'C5',
        title: 'Mengevaluasi Argumen Berdasarkan Data Eksperimen',
        stimulus: `Seorang siswa melakukan kajian terhadap hubungan massa molekul relatif dan titik didih beberapa senyawa berikut.

Senyawa | Massa molekul relatif | Titik didih
CH₄ | 16 | −161,5 °C
H₂O | 18 | 100 °C
H₂S | 34 | −60,3 °C
NH₃ | 17 | −33,3 °C

Setelah mengamati data, siswa tersebut menyatakan:

"Semakin besar massa molekul relatif suatu senyawa, semakin tinggi titik didihnya. Oleh karena itu, H₂S seharusnya memiliki titik didih lebih tinggi daripada H₂O karena massa molekul relatifnya lebih besar."`,
        questions: [
            'a. Evaluasilah apakah argumen siswa tersebut dapat diterima berdasarkan data yang tersedia. Berikan alasan ilmiah.',
            'b. Jelaskan mengapa titik didih H₂O jauh lebih tinggi daripada H₂S meskipun massa molekul relatif H₂O lebih kecil.',
            'c. Bandingkan kemampuan H₂O dan NH₃ dalam membentuk ikatan hidrogen serta hubungkan perbedaannya dengan titik didih kedua senyawa.',
            'd. Susun kesimpulan ilmiah yang lebih tepat mengenai faktor-faktor yang memengaruhi titik didih suatu senyawa.'
        ],
        expectedAnswers: [
            'Argumen siswa tidak dapat diterima sebagai aturan umum karena massa molekul relatif bukan satu-satunya faktor penentu titik didih.',
            'H₂O dapat membentuk jaringan ikatan hidrogen antarmolekul yang kuat.',
            'NH₃ juga dapat membentuk ikatan hidrogen, tetapi karakteristik jaringan interaksinya berbeda dengan air.',
            'H₂S tidak membentuk ikatan hidrogen konvensional seperti H₂O.',
            'Titik didih dipengaruhi jenis dan kekuatan gaya antarmolekul, ukuran molekul, polarizabilitas, bentuk molekul, dan faktor struktur lainnya.'
        ]
    },
    {
        level: 'C6',
        title: 'Merancang Penyelidikan Ilmiah',
        stimulus: `Seorang siswa ingin melakukan penelitian sederhana untuk mengetahui hubungan karakteristik gaya antarmolekul dengan kecenderungan suatu cairan untuk menguap.

Ia memiliki beberapa sampel cairan yang karakteristik molekulnya berbeda. Siswa tersebut ingin mengembangkan eksperimen yang dapat menghasilkan data untuk membandingkan volatilitas zat.`,
        questions: [
            'a. Rumuskan tujuan dan hipotesis penelitian yang sesuai dengan konsep gaya antarmolekul.',
            'b. Tentukan minimal tiga sampel cairan yang dapat dibandingkan beserta alasan pemilihannya berdasarkan karakteristik molekul dan gaya antarmolekul dominan.',
            'c. Identifikasi variabel bebas, variabel terikat, dan minimal tiga variabel kontrol dalam penelitian.',
            'd. Susun prosedur eksperimen secara sistematis agar data yang diperoleh dapat dibandingkan secara adil.',
            'e. Buat rancangan tabel pengamatan yang akan digunakan untuk mencatat hasil percobaan. Jelaskan bagaimana data tersebut dianalisis untuk menghasilkan kesimpulan.',
            'f. Identifikasi kemungkinan keterbatasan penelitian serta cara mengurangi kesalahan interpretasi hasil.'
        ],
        expectedAnswers: [
            'Tujuan dan hipotesis relevan dengan hubungan karakteristik molekul dan penguapan.',
            'Pemilihan sampel didasarkan pada sifat molekul dan keamanan bahan.',
            'Variabel penelitian ditentukan secara tepat.',
            'Prosedur mengendalikan suhu, luas permukaan, massa awal, dan kondisi aliran udara.',
            'Pengumpulan data dilakukan pada interval waktu yang konsisten.',
            'Analisis menggunakan perubahan massa terhadap waktu.',
            'Keterbatasan seperti perbedaan tekanan uap, massa molar, dan sifat kimia sampel dipertimbangkan.'
        ]
    }
];

const renderEssayStimulus = (stimulus: string) => {
    const lines = stimulus.split('\n');
    const result: React.ReactNode[] = [];
    let tableRows: string[][] = [];

    const saveTable = () => {
        if (tableRows.length > 0) {
            result.push(
                <table className="module7-stimulus-table" key={`table-${result.length}`}>
                    <thead>
                        <tr>
                            {tableRows[0].map((cell, index) => (
                                <th key={index}>{cell.trim()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell.trim()}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
            tableRows = [];
        }
    };

    lines.forEach((line, index) => {
        if (line.includes('|')) {
            tableRows.push(line.split('|'));
        } else {
            saveTable();

            if (line.trim()) {
                result.push(<p key={`text-${index}`}>{line}</p>);
            }
        }
    });

    saveTable();

    return <>{result}</>;
};

const Module7Page: React.FC = () => {
    const [stage, setStage] = useState<QuizStage>('identity');

    const [student, setStudent] = useState<StudentIdentity>({
        name: '',
        studentClass: '',
        attendanceNumber: ''
    });

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [essayAnswers, setEssayAnswers] = useState<string[][]>(
        ESSAY_QUESTIONS.map((essay) => essay.questions.map(() => ''))
    );

    const [submitted, setSubmitted] = useState(false);
    const [checkingSubmission, setCheckingSubmission] = useState(false);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    const [databaseError, setDatabaseError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const checkStudentSubmission = async () => {
        setCheckingSubmission(true);
        setDatabaseError('');

        try {
            const { data, error } = await supabase.rpc(
                'has_module7_submission',
                {
                    p_student_name: student.name.trim(),
                    p_student_class: student.studentClass.trim(),
                    p_attendance_number: student.attendanceNumber.trim(),
                }
            );

            if (error) throw error;

            if (data === true) {
                setAlreadySubmitted(true);
                setSubmitted(true);
                setStage('review');
            } else {
                setAlreadySubmitted(false);
                setStage('multiple-choice');
            }
        } catch (error) {
            console.error('Gagal memeriksa pengerjaan:', error);
            setDatabaseError(
                'Gagal memeriksa data siswa. Silakan coba kembali.'
            );
        } finally {
            setCheckingSubmission(false);
        }
    };
    const handleIdentityChange = (
        field: keyof StudentIdentity,
        value: string
    ) => {
        setStudent((previous) => ({
            ...previous,
            [field]: value
        }));
    };

    const handleEssayChange = (
        essayIndex: number,
        questionIndex: number,
        value: string
    ) => {
        setEssayAnswers((previous) =>
            previous.map((essay, i) =>
                i === essayIndex
                    ? essay.map((answer, j) =>
                        j === questionIndex ? value : answer
                    )
                    : essay
            )
        );
    };

    const score = MODULE_7_QUESTIONS.filter(
        (question) => answers[question.id] === question.correctAnswer
    ).length;

    const answeredCount = Object.keys(answers).length;

    const allEssaysAnswered = essayAnswers.every((essay) =>
        essay.every((answer) => answer.trim().length > 0)
    );

    const handleSubmit = async () => {
        if (
            answeredCount !== MODULE_7_QUESTIONS.length ||
            !allEssaysAnswered ||
            submitting
        ) {
            return;
        }

        setSubmitting(true);
        setDatabaseError('');

        try {
            const { data, error } = await supabase.rpc(
                'submit_module7_evaluation',
                {
                    p_student_name: student.name.trim(),
                    p_student_class: student.studentClass.trim(),
                    p_attendance_number: student.attendanceNumber.trim(),
                    p_mcq_answers: answers,
                    p_essay_answers: essayAnswers,
                    p_mcq_score: score,
                }
            );

            if (error) throw error;

            if (data?.status === 'already_submitted') {
                setAlreadySubmitted(true);
                setSubmitted(true);
                setStage('review');
                return;
            }

            if (data?.status !== 'submitted') {
                throw new Error('Status pengiriman tidak dikenali.');
            }

            setSubmitted(true);
            setStage('result');
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Gagal menyimpan evaluasi:', error);
            setDatabaseError(
                'Jawaban belum berhasil disimpan. Silakan coba kembali.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const renderVisual = (visual?: QuizQuestion['visual']) => {
        if (visual === 'hydrogen-bond') {
            return (
                <div className="module7-visual">
                    <h4>Diagram interaksi antarmolekul air</h4>
                    <svg viewBox="0 0 340 170" width="100%" role="img" aria-label="Diagram ikatan hidrogen antara dua molekul air">
                        <line x1="76" y1="75" x2="43" y2="42" stroke="#64748b" strokeWidth="4" />
                        <line x1="76" y1="75" x2="110" y2="42" stroke="#64748b" strokeWidth="4" />
                        <line x1="245" y1="75" x2="212" y2="42" stroke="#64748b" strokeWidth="4" />
                        <line x1="245" y1="75" x2="279" y2="42" stroke="#64748b" strokeWidth="4" />
                        <line x1="110" y1="42" x2="212" y2="42" stroke="#d97706" strokeWidth="3" strokeDasharray="7 6" />
                        <circle cx="76" cy="75" r="22" fill="#e05b55" />
                        <circle cx="43" cy="42" r="13" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                        <circle cx="110" cy="42" r="13" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                        <circle cx="245" cy="75" r="22" fill="#e05b55" />
                        <circle cx="212" cy="42" r="13" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                        <circle cx="279" cy="42" r="13" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                        <g fill="#ffffff" fontSize="12" textAnchor="middle">
                            <text x="76" y="79">O</text>
                            <text x="245" y="79">O</text>
                        </g>
                        <g fill="#334155" fontSize="11" textAnchor="middle">
                            <text x="43" y="46">H</text>
                            <text x="110" y="46">H</text>
                            <text x="212" y="46">H</text>
                            <text x="279" y="46">H</text>
                        </g>
                        <text x="160" y="27" fill="#b45309" fontSize="11" textAnchor="middle">Ikatan hidrogen</text>
                        <text x="160" y="125" fill="currentColor" fontSize="11" textAnchor="middle">O–H ··· O</text>
                        <text x="160" y="145" fill="currentColor" fontSize="10" textAnchor="middle">Garis putus-putus = interaksi antarmolekul</text>
                    </svg>
                    <p className="module7-visual-caption">
                        Ikatan kovalen O–H berada di dalam molekul, sedangkan O–H···O menunjukkan interaksi antarmolekul.
                    </p>
                </div>
            );
        }

        if (visual === 'oil-water') {
            return (
                <div className="module7-visual">
                    <h4>Ilustrasi pemisahan air dan minyak</h4>
                    <svg viewBox="0 0 320 190" width="100%" role="img" aria-label="Dua lapisan minyak dan air dalam gelas">
                        <path d="M95 22 L225 22 L215 165 Q160 180 105 165 Z" fill="none" stroke="#64748b" strokeWidth="4" />
                        <path d="M104 82 L216 82 L210 158 Q160 170 110 158 Z" fill="#70b7e8" opacity="0.75" />
                        <path d="M101 43 L219 43 L216 82 L104 82 Z" fill="#e9b34f" opacity="0.85" />
                        <path d="M104 82 L216 82" stroke="#64748b" strokeWidth="2" />
                        <g fill="#334155" fontSize="12">
                            <text x="160" y="65" textAnchor="middle">Minyak</text>
                            <text x="160" y="125" textAnchor="middle">Air</text>
                            <text x="160" y="188" textAnchor="middle">Dua lapisan setelah didiamkan</text>
                        </g>
                    </svg>
                    <p className="module7-visual-caption">
                        Minyak berada di atas air pada ilustrasi ini. Pemisahan terutama berkaitan dengan ketidakcampuran kedua cairan; posisi lapisan juga dipengaruhi massa jenis.
                    </p>
                </div>
            );
        }

        if (visual === 'models') {
            return (
                <div className="module7-visual">
                    <h4>Empat representasi interaksi antarmolekul air</h4>
                    <div className="module7-model-grid">
                        <div className="module7-model">
                            <strong>Diagram I</strong>
                            <svg viewBox="0 0 150 90" width="100%">
                                <line x1="35" y1="35" x2="18" y2="15" stroke="#64748b" strokeWidth="3" />
                                <line x1="35" y1="35" x2="53" y2="15" stroke="#64748b" strokeWidth="3" />
                                <line x1="115" y1="35" x2="98" y2="15" stroke="#64748b" strokeWidth="3" />
                                <line x1="115" y1="35" x2="133" y2="15" stroke="#64748b" strokeWidth="3" />
                                <line x1="53" y1="15" x2="98" y2="15" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4 3" />
                                <circle cx="35" cy="35" r="12" fill="#e05b55" />
                                <circle cx="115" cy="35" r="12" fill="#e05b55" />
                                <g fill="#fff" fontSize="10" textAnchor="middle"><text x="35" y="39">O</text><text x="115" y="39">O</text></g>
                                <g fill="#334155" fontSize="9" textAnchor="middle"><text x="18" y="18">H</text><text x="53" y="18">H</text><text x="98" y="18">H</text><text x="133" y="18">H</text></g>
                            </svg>
                            <span>H···O antarmolekul</span>
                        </div>
                        <div className="module7-model">
                            <strong>Diagram II</strong>
                            <svg viewBox="0 0 150 90" width="100%">
                                <circle cx="35" cy="35" r="13" fill="#e05b55" />
                                <circle cx="115" cy="35" r="13" fill="#e05b55" />
                                <line x1="49" y1="35" x2="101" y2="35" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4 3" />
                                <g fill="#fff" fontSize="10" textAnchor="middle"><text x="35" y="39">O</text><text x="115" y="39">O</text></g>
                            </svg>
                            <span>O···O</span>
                        </div>
                        <div className="module7-model">
                            <strong>Diagram III</strong>
                            <svg viewBox="0 0 150 90" width="100%">
                                <circle cx="35" cy="35" r="12" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                                <circle cx="115" cy="35" r="12" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                                <line x1="49" y1="35" x2="101" y2="35" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4 3" />
                                <g fill="#334155" fontSize="10" textAnchor="middle"><text x="35" y="39">H</text><text x="115" y="39">H</text></g>
                            </svg>
                            <span>H···H</span>
                        </div>
                        <div className="module7-model">
                            <strong>Diagram IV</strong>
                            <svg viewBox="0 0 150 90" width="100%">
                                <circle cx="75" cy="35" r="13" fill="#e05b55" />
                                <circle cx="35" cy="35" r="12" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                                <line x1="47" y1="35" x2="62" y2="35" stroke="#64748b" strokeWidth="3" />
                                <line x1="88" y1="35" x2="105" y2="35" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4 3" />
                                <circle cx="117" cy="35" r="12" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                                <g fill="#fff" fontSize="10" textAnchor="middle"><text x="75" y="39">O</text></g>
                                <g fill="#334155" fontSize="10" textAnchor="middle"><text x="35" y="39">H</text><text x="117" y="39">H</text></g>
                            </svg>
                            <span>Garis putus-putus dalam satu molekul</span>
                        </div>
                    </div>
                    <p className="module7-visual-caption">
                        Diagram ini bersifat skematis. Perhatikan jenis atom yang dihubungkan dan apakah interaksi terjadi di antara molekul atau di dalam satu molekul.
                    </p>
                </div>
            );
        }

        if (visual === 'surfactant') {
            const centerX = 225;
            const centerY = 205;

            return (
                <div className="module7-visual">
                    <h4>Ilustrasi Struktur Surfaktan dan Pembentukan Misel</h4>

                    <svg
                        viewBox="0 0 540 420"
                        width="100%"
                        role="img"
                        aria-label="Struktur misel dengan kepala hidrofilik menghadap air dan ekor hidrofobik mengarah ke minyak"
                    >
                        {/* Lingkungan air */}
                        <text
                            x="225"
                            y="30"
                            textAnchor="middle"
                            fontSize="19"
                            fontWeight="600"
                            fill="#24658b"
                        >
                            Lingkungan air
                        </text>

                        {/* Bagian minyak di pusat misel */}
                        <circle
                            cx={centerX}
                            cy={centerY}
                            r="91"
                            fill="#f4d99e"
                            stroke="#c69b51"
                            strokeWidth="3"
                        />

                        <text
                            x={centerX}
                            y={centerY - 5}
                            textAnchor="middle"
                            fontSize="22"
                            fontWeight="600"
                            fill="#80520d"
                        >
                            Minyak
                        </text>

                        <text
                            x={centerX}
                            y={centerY + 23}
                            textAnchor="middle"
                            fontSize="15"
                            fill="#80520d"
                        >
                            Bagian nonpolar
                        </text>

                        {/* Molekul-molekul surfaktan */}
                        {Array.from({ length: 12 }).map((_, i) => {
                            const angle = (i * Math.PI * 2) / 12;

                            const tailStartX =
                                centerX + Math.cos(angle) * 94;
                            const tailStartY =
                                centerY + Math.sin(angle) * 94;

                            const tailEndX =
                                centerX + Math.cos(angle) * 145;
                            const tailEndY =
                                centerY + Math.sin(angle) * 145;

                            const headX =
                                centerX + Math.cos(angle) * 160;
                            const headY =
                                centerY + Math.sin(angle) * 160;

                            return (
                                <g key={i}>
                                    {/* Ekor hidrofobik mengarah ke minyak */}
                                    <line
                                        x1={tailEndX}
                                        y1={tailEndY}
                                        x2={tailStartX}
                                        y2={tailStartY}
                                        stroke="#d97706"
                                        strokeWidth="7"
                                        strokeLinecap="round"
                                    />

                                    {/* Kepala hidrofilik menghadap air */}
                                    <circle
                                        cx={headX}
                                        cy={headY}
                                        r="12"
                                        fill="#4b9ac8"
                                        stroke="#24658b"
                                        strokeWidth="2.5"
                                    />
                                </g>
                            );
                        })}

                        {/* Label kepala hidrofilik */}
                        <path
                            d="M365 82 L405 65"
                            stroke="#24658b"
                            strokeWidth="2"
                            fill="none"
                        />

                        <text
                            x="410"
                            y="62"
                            fontSize="15"
                            fontWeight="600"
                            fill="#24658b"
                        >
                            Kepala
                        </text>

                        <text
                            x="410"
                            y="82"
                            fontSize="15"
                            fontWeight="600"
                            fill="#24658b"
                        >
                            hidrofilik
                        </text>

                        {/* Label ekor hidrofobik */}
                        <path
                            d="M365 325 L405 345"
                            stroke="#d97706"
                            strokeWidth="2"
                            fill="none"
                        />

                        <text
                            x="410"
                            y="345"
                            fontSize="15"
                            fontWeight="600"
                            fill="#b45309"
                        >
                            Ekor
                        </text>

                        <text
                            x="410"
                            y="365"
                            fontSize="15"
                            fontWeight="600"
                            fill="#b45309"
                        >
                            hidrofobik
                        </text>
                    </svg>

                    <p className="module7-visual-caption">
                        Kepala hidrofilik yang bersifat polar menghadap lingkungan
                        air, sedangkan ekor hidrofobik yang bersifat nonpolar
                        mengarah ke bagian dalam dan berasosiasi dengan minyak.
                        Susunan molekul surfaktan ini membentuk misel.
                    </p>
                </div>
            );
        }

        return null;
    };

    const renderStimulus = (question: QuizQuestion) => {
        const lines = question.stimulus.split('\n');
        const blocks: Array<
            { type: 'text'; content: string } |
            { type: 'table'; rows: string[][] }
        > = [];

        let tableRows: string[][] = [];

        const saveTable = () => {
            if (tableRows.length > 0) {
                blocks.push({ type: 'table', rows: tableRows });
                tableRows = [];
            }
        };

        lines.forEach((line) => {
            if (line.includes('|')) {
                tableRows.push(
                    line.split('|').map((cell) => cell.trim())
                );
            } else {
                saveTable();

                if (line.trim()) {
                    blocks.push({ type: 'text', content: line });
                }
            }
        });

        saveTable();

        return (
            <>
                {renderVisual(question.visual)}

                <div className="module7-stimulus-text">
                    {blocks.map((block, index) =>
                        block.type === 'table' ? (
                            <div className="module7-table-wrapper" key={index}>
                                <table className="module7-table">
                                    <thead>
                                        <tr>
                                            {block.rows[0].map((cell, cellIndex) => (
                                                <th key={cellIndex}>{cell}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {block.rows.slice(1).map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p key={index}>{block.content}</p>
                        )
                    )}
                </div>
            </>
        );
    };

    return (
        <main className="module7-page">
            <div className="module7-container">

                <header className="module7-header">
                    <span className="module7-label">MODULE 07 · EVALUATE</span>
                    <h1>Evaluasi Pembelajaran</h1>
                    <p>
                        Uji pemahamanmu mengenai gaya antarmolekul melalui
                        analisis fenomena, data, dan penerapan konsep kimia
                        dalam kehidupan.
                    </p>
                </header>

                {stage === 'identity' && (
                    <section className="module7-section">
                        <h2>Identitas Siswa</h2>
                        <p>Lengkapi identitas sebelum memulai evaluasi.</p>

                        <div className="module7-form">
                            <label>
                                Nama lengkap
                                <input
                                    type="text"
                                    value={student.name}
                                    onChange={(event) =>
                                        handleIdentityChange('name', event.target.value)
                                    }
                                    placeholder="Masukkan nama lengkap"
                                />
                            </label>

                            <label>
                                Kelas
                                <input
                                    type="text"
                                    value={student.studentClass}
                                    onChange={(event) =>
                                        handleIdentityChange('studentClass', event.target.value)
                                    }
                                    placeholder="Contoh: XI-1"
                                />
                            </label>

                            <label>
                                Nomor absen
                                <input
                                    type="number"
                                    min="1"
                                    value={student.attendanceNumber}
                                    onChange={(event) =>
                                        handleIdentityChange('attendanceNumber', event.target.value)
                                    }
                                    placeholder="Masukkan nomor absen"
                                />
                            </label>

                            <button
                                type="button"
                                onClick={checkStudentSubmission}
                                disabled={
                                    checkingSubmission ||
                                    !student.name.trim() ||
                                    !student.studentClass.trim() ||
                                    !student.attendanceNumber.trim() ||
                                    Number(student.attendanceNumber) < 1
                                }
                            >
                                {checkingSubmission ? 'Memeriksa...' : 'Mulai Evaluasi'}
                            </button>
                            {databaseError && (
                                <p className="module7-error-message">
                                    {databaseError}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {stage === 'multiple-choice' && (
                    <section className="module7-section">
                        <h2>Bagian I — Pilihan Ganda</h2>
                        <p>
                            Kerjakan seluruh 10 soal pilihan ganda. Pilih satu
                            jawaban yang paling tepat pada setiap soal.
                        </p>

                        <div className="module7-question">
                            <div className="module7-question-progress">
                                <span>Soal {currentQuestion + 1} dari 10</span>
                                <span>{answeredCount} terjawab</span>
                            </div>

                            <div className="module7-progress-bar">
                                <div
                                    style={{
                                        width: `${((currentQuestion + 1) / 10) * 100}%`
                                    }}
                                />
                            </div>

                            {(() => {
                                const question = MODULE_7_QUESTIONS[currentQuestion];

                                return (
                                    <>
                                        <div className="module7-question-info">
                                            <span>{question.topic}</span>
                                            <span>{question.level}</span>
                                        </div>

                                        <div className="module7-stimulus">
                                            <h3>Stimulus</h3>
                                            {renderStimulus(question)}
                                        </div>

                                        <h3 className="module7-question-text">
                                            {question.question}
                                        </h3>

                                        <div className="module7-options">
                                            {question.options.map((option) => (
                                                <button
                                                    type="button"
                                                    key={option.label}
                                                    className={`module7-option ${answers[question.id] === option.label
                                                        ? 'selected'
                                                        : ''
                                                        }`}
                                                    onClick={() =>
                                                        setAnswers((previous) => ({
                                                            ...previous,
                                                            [question.id]: option.label
                                                        }))
                                                    }
                                                >
                                                    <span className="module7-option-label">
                                                        {option.label}
                                                    </span>
                                                    <span>{option.text}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="module7-navigation">
                                            <button
                                                type="button"
                                                disabled={currentQuestion === 0}
                                                onClick={() =>
                                                    setCurrentQuestion((previous) => previous - 1)
                                                }
                                            >
                                                Sebelumnya
                                            </button>

                                            {currentQuestion < 9 ? (
                                                <button
                                                    type="button"
                                                    disabled={!answers[question.id]}
                                                    onClick={() =>
                                                        setCurrentQuestion((previous) => previous + 1)
                                                    }
                                                >
                                                    Soal Berikutnya
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    disabled={answeredCount !== 10}
                                                    onClick={() => setStage('essay')}
                                                >
                                                    Lanjut ke Esai
                                                </button>
                                            )}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </section>
                )}

                {stage === 'essay' && (
                    <section className="module7-section">
                        <h2>Bagian II — Esai</h2>
                        <p>
                            Jawablah seluruh pertanyaan esai dengan penjelasan
                            ilmiah yang logis dan berdasarkan konsep kimia.
                        </p>

                        {ESSAY_QUESTIONS.map((essay, essayIndex) => (
                            <div className="module7-essay-card" key={essayIndex}>
                                <div className="module7-question-info">
                                    <span>Esai {essayIndex + 1}</span>
                                    <span>{essay.level}</span>
                                </div>

                                <h3>{essay.title}</h3>

                                <div className="module7-stimulus">
                                    <h4>Stimulus</h4>
                                    {renderEssayStimulus(essay.stimulus)}
                                </div>

                                {essay.questions.map((question, questionIndex) => (
                                    <div className="module7-essay-question" key={questionIndex}>
                                        <p>{question}</p>
                                        <textarea
                                            value={essayAnswers[essayIndex][questionIndex]}
                                            onChange={(event) =>
                                                handleEssayChange(
                                                    essayIndex,
                                                    questionIndex,
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Tuliskan jawabanmu di sini..."
                                            rows={5}
                                        />
                                        <span className="module7-word-count">
                                            {essayAnswers[essayIndex][questionIndex].trim()
                                                ? essayAnswers[essayIndex][questionIndex]
                                                    .trim().split(/\s+/).length
                                                : 0} kata
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="module7-navigation">
                            <button
                                type="button"
                                onClick={() => {
                                    setCurrentQuestion(9);
                                    setStage('multiple-choice');
                                }}
                            >
                                Kembali ke Pilihan Ganda
                            </button>

                            <button
                                type="button"
                                disabled={!allEssaysAnswered || submitting}
                                onClick={handleSubmit}
                            >
                                {submitting ? 'Menyimpan Jawaban...' : 'Kirim Seluruh Jawaban'}
                            </button>
                        </div>
                    </section>
                )}

                {stage === 'result' && submitted && (
                    <section className="module7-section">
                        <h2>Hasil Evaluasi</h2>
                        <p>
                            Evaluasi pilihan ganda telah selesai. Berikut
                            ringkasan jawaban dan pembahasannya.
                        </p>

                        <div className="module7-result-identity">
                            <h3>Identitas Siswa</h3>
                            <p><strong>Nama:</strong> {student.name}</p>
                            <p><strong>Kelas:</strong> {student.studentClass}</p>
                            <p><strong>Nomor absen:</strong> {student.attendanceNumber}</p>
                        </div>

                        <div className="module7-result-summary">
                            <h3>Ringkasan Pilihan Ganda</h3>
                            <div className="module7-result-score">
                                <div>
                                    <strong>{score}</strong>
                                    <span>Benar</span>
                                </div>
                                <div>
                                    <strong>{10 - score}</strong>
                                    <span>Salah</span>
                                </div>
                                <div>
                                    <strong>10</strong>
                                    <span>Total soal</span>
                                </div>
                            </div>
                        </div>

                        <h3>Pembahasan Pilihan Ganda</h3>

                        {MODULE_7_QUESTIONS.map((question, index) => {
                            const studentAnswer = answers[question.id];
                            const isCorrect = studentAnswer === question.correctAnswer;

                            return (
                                <div className="module7-result-card" key={question.id}>
                                    <div className="module7-question-info">
                                        <span>Soal {index + 1} · {question.topic}</span>
                                        <span>{question.level}</span>
                                    </div>

                                    <p>
                                        <strong>Jawabanmu:</strong> {studentAnswer}
                                    </p>
                                    <p>
                                        <strong>Kunci jawaban:</strong> {question.correctAnswer}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{' '}
                                        {isCorrect ? 'Benar' : 'Belum tepat'}
                                    </p>
                                    <p>
                                        <strong>Pembahasan:</strong> {question.explanation}
                                    </p>
                                    <p>
                                        <strong>Indikator:</strong> {question.indicator}
                                    </p>
                                </div>
                            );
                        })}

                        <h3>Umpan Balik Pembelajaran Esai</h3>
                        <p>
                            Jawaban esai tidak dinilai benar atau salah secara
                            otomatis. Gunakan poin-poin berikut sebagai panduan
                            untuk memeriksa kelengkapan jawabanmu.
                        </p>

                        {ESSAY_QUESTIONS.map((essay, essayIndex) => (
                            <div className="module7-result-card" key={essayIndex}>
                                <h3>Esai {essayIndex + 1} — {essay.title}</h3>

                                {essay.expectedAnswers.map((point, pointIndex) => (
                                    <p key={pointIndex}>
                                        {pointIndex + 1}. {point}
                                    </p>
                                ))}

                                <p>
                                    <strong>Catatan:</strong> Poin-poin tersebut
                                    merupakan unsur jawaban yang diharapkan,
                                    bukan jawaban baku yang harus ditulis dengan
                                    kalimat yang sama.
                                </p>
                            </div>
                        ))}

                        <p className="module7-result-note">
                            Jawaban esai perlu diperiksa dan dinilai oleh guru.
                            Hasil pada halaman ini hanya memberikan umpan balik
                            pembelajaran dan tidak menampilkan nilai esai.
                        </p>
                        <div className="module7-navigation">
                            <button
                                type="button"
                                onClick={() => window.location.assign('/')}
                            >
                                Kembali ke Beranda
                            </button>
                        </div>
                    </section>
                )}
                {stage === 'review' && alreadySubmitted && (
                    <section className="module7-section">
                        <h2>Pembahasan Evaluasi Modul 7</h2>
                        <p>
                            Kamu telah menyelesaikan evaluasi Modul 7.
                            Halaman ini dapat digunakan untuk mempelajari kembali
                            soal, jawaban benar, dan pembahasannya.
                        </p>

                        <div className="module7-result-identity">
                            <h3>Identitas Siswa</h3>
                            <p><strong>Nama:</strong> {student.name}</p>
                            <p><strong>Kelas:</strong> {student.studentClass}</p>
                            <p><strong>Nomor absen:</strong> {student.attendanceNumber}</p>
                        </div>

                        <h2>Bagian I — Pembahasan Pilihan Ganda</h2>

                        {MODULE_7_QUESTIONS.map((question, index) => (
                            <div className="module7-result-card" key={question.id}>
                                <div className="module7-question-info">
                                    <span>Soal {index + 1}</span>
                                    <span>{question.level}</span>
                                    <span>{question.topic}</span>
                                </div>

                                <div className="module7-stimulus">
                                    <h3>Stimulus</h3>
                                    {renderStimulus(question)}
                                </div>

                                <h3>{question.question}</h3>

                                <div className="module7-options">
                                    {question.options.map((option) => (
                                        <div
                                            className={`module7-option ${option.label === question.correctAnswer
                                                ? 'selected'
                                                : ''
                                                }`}
                                            key={option.label}
                                        >
                                            <span className="module7-option-label">
                                                {option.label}
                                            </span>
                                            <span>{option.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="module7-result-note">
                                    <p>
                                        <strong>Jawaban benar:</strong>{' '}
                                        {question.correctAnswer}
                                    </p>
                                    <p>
                                        <strong>Indikator:</strong>{' '}
                                        {question.indicator}
                                    </p>
                                    <p>
                                        <strong>Pembahasan:</strong>{' '}
                                        {question.explanation}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <h2>Bagian II — Pembahasan Esai</h2>

                        {ESSAY_QUESTIONS.map((essay, essayIndex) => (
                            <div className="module7-result-card" key={essayIndex}>
                                <div className="module7-question-info">
                                    <span>Esai {essayIndex + 1}</span>
                                    <span>{essay.level}</span>
                                </div>

                                <h3>{essay.title}</h3>

                                <div className="module7-stimulus">
                                    <h3>Stimulus</h3>
                                    {essay.stimulus.split('\n').map((line, index) => (
                                        <p key={index}>{line || '\u00A0'}</p>
                                    ))}
                                </div>

                                {essay.questions.map((question, questionIndex) => (
                                    <div
                                        className="module7-essay-question"
                                        key={questionIndex}
                                    >
                                        <p><strong>{question}</strong></p>
                                        <div className="module7-result-note">
                                            <strong>Pedoman jawaban:</strong>
                                            <p>{essay.expectedAnswers[questionIndex]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="module7-navigation">
                            <button
                                type="button"
                                onClick={() => window.location.assign('/')}
                            >
                                Kembali ke Beranda
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default Module7Page;
