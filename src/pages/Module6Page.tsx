
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import './Module1Page.css';
import './Module6Page.css';

type SectionId =
    | 'overview'
    | 'data'
    | 'analysis'
    | 'application'
    | 'conclusion'
    | 'references';

const sections: { id: SectionId; label: string }[] = [
    { id: 'overview', label: 'Pengantar' },
    { id: 'data', label: 'Eksplorasi Data' },
    { id: 'analysis', label: 'Analisis' },
    { id: 'application', label: 'Penerapan' },
    { id: 'conclusion', label: 'Kesimpulan' },
    { id: 'references', label: 'Referensi' },
];

const Module6Page: React.FC = () => {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] =
        useState<SectionId>('overview');

    const [dataAnswer, setDataAnswer] = useState<string | null>(null);
    const [analysisAnswer, setAnalysisAnswer] = useState<string | null>(null);

    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [essayAnswer, setEssayAnswer] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeSection]);

    const goToSection = (id: SectionId) => {
        setActiveSection(id);
        setDataAnswer(null);
        setAnalysisAnswer(null);
    };

    const currentIndex = sections.findIndex(
        (section) => section.id === activeSection
    );

    const goNext = () => {
        if (currentIndex < sections.length - 1) {
            goToSection(sections[currentIndex + 1].id);
        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            goToSection(sections[currentIndex - 1].id);
        }
    };
    const handleSubmitEssay = async () => {
        const wordCount = essayAnswer.trim().split(/\s+/).filter(Boolean).length;

        if (!studentName.trim() || !studentClass.trim()) {
            setSubmitMessage('Nama lengkap dan kelas wajib diisi.');
            setSubmitSuccess(false);
            return;
        }

        if (wordCount < 50) {
            setSubmitMessage(`Jawaban minimal 50 kata. Saat ini ${wordCount} kata.`);
            setSubmitSuccess(false);
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const { data: activity, error: activityError } = await supabase
                .from('activities')
                .select('id')
                .eq('activity_code', 'M6-ELABORATE-01')
                .eq('is_active', true)
                .single();

            if (activityError || !activity) {
                throw new Error('Aktivitas belum ditemukan. Silakan hubungi guru.');
            }

            const { error: submitError } = await supabase
                .from('essay_submissions')
                .insert({
                    activity_id: activity.id,
                    student_name: studentName.trim(),
                    student_class: studentClass.trim(),
                    answer: essayAnswer.trim(),
                    word_count: wordCount,
                });

            if (submitError) {
                throw submitError;
            }

            setSubmitSuccess(true);
            setSubmitMessage(
                'Jawaban berhasil dikirim! Terima kasih sudah mengerjakan tugas.'
            );

            setStudentName('');
            setStudentClass('');
            setEssayAnswer('');

        } catch (error) {
            console.error('Gagal mengirim esai:', error);

            setSubmitSuccess(false);
            setSubmitMessage(
                error instanceof Error
                    ? error.message
                    : 'Terjadi kesalahan saat mengirim jawaban.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="lesson-page m6-page">

            {/* HEADER */}
            <header className="lesson-header">
                <div className="lesson-header-inner">
                    <button
                        className="lesson-brand"
                        onClick={() => navigate('/')}
                    >
                        <span className="lesson-brand-icon">⚗</span>
                        <span>
                            <strong>IMF Explorer</strong>
                            <small>Jelajah Gaya Antarmolekul</small>
                        </span>
                    </button>

                    <button
                        className="lesson-back-button"
                        onClick={() => navigate('/')}
                    >
                        ← Kembali ke Beranda
                    </button>
                </div>
            </header>

            <main className="lesson-main m6-main">

                {/* HERO */}
                <section className="lesson-hero m6-hero">
                    <div className="lesson-hero-content">
                        <span className="lesson-eyebrow">
                            TAHAP 5 · ELABORATE
                        </span>

                        <h1>Membandingkan dan Menerapkan Gaya Antarmolekul</h1>

                        <p className="lesson-hero-description">
                            Mengapa beberapa zat memiliki titik didih lebih
                            tinggi daripada zat lainnya? Gunakan konsep gaya
                            antarmolekul untuk menganalisis data dan menjelaskan
                            berbagai fenomena dalam kehidupan sehari-hari.
                        </p>

                        <div className="lesson-meta">
                            <span>🔍 Analisis data</span>
                            <span>🧪 Penerapan konsep</span>
                            <span>⏱️ 12 menit</span>
                        </div>
                    </div>

                    <div className="m6-hero-visual">
                        <div className="m6-hero-circle">
                            <span>H₂O</span>
                            <span className="m6-hero-connection">···</span>
                            <span>H₂O</span>
                        </div>
                        <p>Interaksi antarmolekul memengaruhi sifat fisik zat</p>
                    </div>
                </section>

                {/* SECTION NAVIGATION */}
                <nav className="m6-section-navigation">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            className={`m6-section-button ${activeSection === section.id ? 'active' : ''
                                }`}
                            onClick={() => goToSection(section.id)}
                        >
                            <span>{index + 1}</span>
                            {section.label}
                        </button>
                    ))}
                </nav>

                {/* PROGRESS */}
                <div className="m6-progress">
                    <div className="m6-progress-info">
                        <span>Progres pembelajaran</span>
                        <strong>
                            {currentIndex + 1} dari {sections.length}
                        </strong>
                    </div>
                    <div className="m6-progress-track">
                        <div
                            className="m6-progress-fill"
                            style={{
                                width: `${((currentIndex + 1) / sections.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="m6-content">

                    {/* 1. OVERVIEW */}
                    {activeSection === 'overview' && (
                        <section className="m6-section">
                            <span className="m6-section-eyebrow">
                                BAGIAN 1 · PENGANTAR
                            </span>

                            <h2>Dari Memahami Konsep Menuju Penerapan</h2>

                            <p>
                                Pada modul sebelumnya, kamu telah mempelajari
                                tiga jenis gaya antarmolekul, yaitu gaya
                                dispersi London, gaya dipol-dipol, dan ikatan
                                hidrogen. Setiap jenis interaksi memiliki
                                karakteristik yang berbeda dan dapat
                                memengaruhi sifat fisik suatu zat.
                            </p>

                            <p>
                                Sekarang, kamu akan menggunakan pengetahuan
                                tersebut untuk menjelaskan mengapa zat-zat
                                yang memiliki massa molekul relatif atau
                                struktur berbeda dapat menunjukkan titik didih
                                yang berbeda pula.
                            </p>

                            <div className="m6-info-card">
                                <strong>Tujuan pembelajaran</strong>
                                <p>
                                    Setelah menyelesaikan modul ini, kamu
                                    diharapkan mampu membandingkan gaya
                                    antarmolekul pada berbagai senyawa,
                                    menganalisis hubungan gaya antarmolekul
                                    dengan titik didih, serta menggunakan
                                    konsep tersebut untuk menjelaskan
                                    fenomena dalam kehidupan sehari-hari.
                                </p>
                            </div>

                            <h3>Ingat kembali tiga jenis interaksi</h3>

                            <div className="m6-concept-grid">
                                <div className="m6-concept-card">
                                    <span>✨</span>
                                    <strong>Gaya London</strong>
                                    <p>
                                        Terdapat pada semua atom dan molekul,
                                        baik polar maupun nonpolar.
                                    </p>
                                </div>

                                <div className="m6-concept-card">
                                    <span>🧲</span>
                                    <strong>Dipol-Dipol</strong>
                                    <p>
                                        Terjadi karena interaksi antara
                                        kutub-kutub molekul polar.
                                    </p>
                                </div>

                                <div className="m6-concept-card">
                                    <span>🔗</span>
                                    <strong>Ikatan Hidrogen</strong>
                                    <p>
                                        Interaksi khusus yang melibatkan
                                        H terikat pada F, O, atau N.
                                    </p>
                                </div>
                            </div>

                            <div className="m6-question">
                                <strong>Pertanyaan pemantik</strong>
                                <p>
                                    Jika massa molekul relatif suatu zat
                                    semakin besar, apakah titik didihnya
                                    selalu semakin tinggi? Mari kita
                                    selidiki melalui data berikut.
                                </p>
                            </div>
                        </section>
                    )}

                    {/* 2. DATA EXPLORATION */}
                    {activeSection === 'data' && (
                        <section className="m6-section">
                            <span className="m6-section-eyebrow">
                                BAGIAN 2 · EKSPLORASI DATA
                            </span>

                            <h2>Mengamati Perbedaan Titik Didih Senyawa</h2>

                            <p>
                                Perhatikan data titik didih beberapa senyawa
                                hidrida berikut. Data ini dapat digunakan
                                untuk melihat hubungan antara ukuran molekul,
                                jenis gaya antarmolekul, dan titik didih.
                            </p>

                            <div className="m6-table-wrapper">
                                <table className="m6-data-table">
                                    <thead>
                                        <tr>
                                            <th>Senyawa</th>
                                            <th>Mr relatif</th>
                                            <th>Titik didih (°C)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CH₄</td>
                                            <td>16</td>
                                            <td>−161,5</td>
                                        </tr>
                                        <tr>
                                            <td>SiH₄</td>
                                            <td>32</td>
                                            <td>−111,8</td>
                                        </tr>
                                        <tr>
                                            <td>GeH₄</td>
                                            <td>77</td>
                                            <td>−88,5</td>
                                        </tr>
                                        <tr>
                                            <td>SnH₄</td>
                                            <td>123</td>
                                            <td>−52,0</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span className="m6-table-caption">
                                    Data titik didih hidrida Golongan 14.
                                </span>
                            </div>

                            <p>
                                Keempat senyawa tersebut merupakan molekul
                                tetrahedral nonpolar. Gaya dispersi London
                                menjadi interaksi antarmolekul utamanya.
                                Seiring bertambahnya ukuran dan jumlah
                                elektron, polarizabilitas umumnya meningkat.
                                Akibatnya, gaya dispersi London semakin kuat
                                dan titik didih meningkat.
                            </p>

                            <div className="m6-highlight">
                                <strong>Temuan penting</strong>
                                <p>
                                    Pada kelompok senyawa dengan karakteristik
                                    struktur dan jenis interaksi yang sebanding,
                                    peningkatan ukuran molekul dapat
                                    meningkatkan gaya dispersi London dan
                                    menaikkan titik didih.
                                </p>
                            </div>

                            <div className="m6-check-card">
                                <h3>Cek Pemahaman 1</h3>
                                <p>
                                    Berdasarkan tabel, mengapa titik didih
                                    SnH₄ lebih tinggi daripada CH₄?
                                </p>

                                {[
                                    {
                                        value: 'A',
                                        label: 'Karena SnH₄ dapat membentuk ikatan hidrogen antarmolekul.',
                                    },
                                    {
                                        value: 'B',
                                        label: 'Karena SnH₄ memiliki ukuran dan jumlah elektron lebih besar sehingga gaya dispersi London lebih kuat.',
                                    },
                                    {
                                        value: 'C',
                                        label: 'Karena CH₄ merupakan molekul polar sedangkan SnH₄ nonpolar.',
                                    },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        className={`m6-answer ${dataAnswer === option.value
                                            ? 'selected'
                                            : ''
                                            }`}
                                        onClick={() => setDataAnswer(option.value)}
                                    >
                                        <strong>{option.value}.</strong>
                                        {option.label}
                                    </button>
                                ))}

                                {dataAnswer && (
                                    <div
                                        className={`m6-feedback ${dataAnswer === 'B' ? 'correct' : 'incorrect'
                                            }`}
                                    >
                                        {dataAnswer === 'B'
                                            ? 'Benar! SnH₄ memiliki awan elektron yang lebih mudah terpolarisasi sehingga gaya dispersi London lebih kuat.'
                                            : 'Belum tepat. Perhatikan perbedaan ukuran molekul dan jumlah elektron pada CH₄ dan SnH₄.'}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* 3. ANALYSIS */}
                    {activeSection === 'analysis' && (
                        <section className="m6-section">
                            <span className="m6-section-eyebrow">
                                BAGIAN 3 · ANALISIS
                            </span>

                            <h2>Mengapa Air Memiliki Titik Didih Tinggi?</h2>

                            <p>
                                Tidak semua senyawa mengikuti kecenderungan
                                kenaikan titik didih berdasarkan peningkatan
                                massa molekul relatif. Air merupakan salah
                                satu contoh yang menarik.
                            </p>

                            <div className="m6-table-wrapper">
                                <table className="m6-data-table">
                                    <thead>
                                        <tr>
                                            <th>Senyawa</th>
                                            <th>Mr relatif</th>
                                            <th>Titik didih (°C)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>H₂O</td>
                                            <td>18</td>
                                            <td>100,0</td>
                                        </tr>
                                        <tr>
                                            <td>H₂S</td>
                                            <td>34</td>
                                            <td>−60,3</td>
                                        </tr>
                                        <tr>
                                            <td>H₂Se</td>
                                            <td>81</td>
                                            <td>−41,3</td>
                                        </tr>
                                        <tr>
                                            <td>H₂Te</td>
                                            <td>130</td>
                                            <td>−2,2</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span className="m6-table-caption">
                                    Data titik didih hidrida Golongan 16.
                                </span>
                            </div>

                            <p>
                                Secara umum, titik didih H₂S, H₂Se, dan H₂Te
                                meningkat seiring bertambahnya ukuran molekul
                                dan kuatnya gaya dispersi London. Namun, H₂O
                                memiliki titik didih jauh lebih tinggi
                                meskipun massa molekul relatifnya paling kecil.
                            </p>

                            <div className="m6-analysis-visual">
                                <div className="m6-water-molecule">
                                    <span>H</span>
                                    <span className="m6-water-bond">—</span>
                                    <strong>O</strong>
                                    <span className="m6-water-bond">—</span>
                                    <span>H</span>
                                </div>
                                <div className="m6-hydrogen-connection">
                                    ·················
                                </div>
                                <div className="m6-water-molecule">
                                    <span>H</span>
                                    <span className="m6-water-bond">—</span>
                                    <strong>O</strong>
                                    <span className="m6-water-bond">—</span>
                                    <span>H</span>
                                </div>
                                <p>
                                    Ikatan hidrogen antarmolekul air
                                    <br />
                                    <small>Ilustrasi sederhana</small>
                                </p>
                            </div>

                            <p>
                                Hal tersebut terjadi karena molekul air
                                dapat membentuk ikatan hidrogen. Interaksi
                                ini relatif kuat dibandingkan interaksi
                                antarmolekul pada hidrida lain dalam tabel.
                                Oleh karena itu, diperlukan energi lebih
                                besar untuk memisahkan molekul-molekul air
                                ketika mendidih.
                            </p>

                            <div className="m6-highlight">
                                <strong>Hubungan konsep</strong>
                                <p>
                                    Titik didih berkaitan dengan energi yang
                                    diperlukan untuk mengatasi gaya tarik
                                    antarmolekul dalam fase cair. Semakin
                                    kuat interaksi antarmolekul, umumnya
                                    semakin tinggi titik didih jika faktor
                                    lain sebanding.
                                </p>
                            </div>

                            <div className="m6-check-card">
                                <h3>Cek Pemahaman 2</h3>
                                <p>
                                    Mengapa H₂O memiliki titik didih lebih
                                    tinggi daripada H₂S meskipun Mr H₂O
                                    lebih kecil?
                                </p>

                                {[
                                    {
                                        value: 'A',
                                        label: 'Karena molekul H₂O memiliki ukuran lebih besar daripada molekul H₂S.',
                                    },
                                    {
                                        value: 'B',
                                        label: 'Karena antarmolekul H₂O terbentuk ikatan hidrogen yang meningkatkan energi untuk memisahkan molekul.',
                                    },
                                    {
                                        value: 'C',
                                        label: 'Karena H₂S tidak memiliki gaya antarmolekul sama sekali.',
                                    },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        className={`m6-answer ${analysisAnswer === option.value
                                            ? 'selected'
                                            : ''
                                            }`}
                                        onClick={() => setAnalysisAnswer(option.value)}
                                    >
                                        <strong>{option.value}.</strong>
                                        {option.label}
                                    </button>
                                ))}

                                {analysisAnswer && (
                                    <div
                                        className={`m6-feedback ${analysisAnswer === 'B' ? 'correct' : 'incorrect'
                                            }`}
                                    >
                                        {analysisAnswer === 'B'
                                            ? 'Tepat! Ikatan hidrogen antarmolekul air menyebabkan titik didihnya jauh lebih tinggi.'
                                            : 'Belum tepat. Ingat kembali karakteristik ikatan hidrogen yang telah dipelajari pada Modul 5.'}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* 4. APPLICATION */}
                    {activeSection === 'application' && (
                        <section className="m6-section">
                            <span className="m6-section-eyebrow">
                                BAGIAN 4 · PENERAPAN
                            </span>

                            <h2>Menerapkan Konsep pada Kehidupan Sehari-hari</h2>

                            <p>
                                Konsep gaya antarmolekul dapat digunakan
                                untuk menjelaskan berbagai fenomena,
                                misalnya proses penguapan, perbedaan
                                volatilitas cairan, dan karakteristik
                                zat dalam kehidupan sehari-hari.
                            </p>

                            <div className="m6-case-card">
                                <span className="m6-case-icon">🌡️</span>
                                <div>
                                    <strong>Studi kasus: Penguapan cairan</strong>
                                    <p>
                                        Ketika dua cairan dengan jumlah
                                        yang sama diletakkan pada kondisi
                                        lingkungan yang sama, cairan yang
                                        memiliki gaya tarik antarmolekul
                                        lebih lemah umumnya lebih mudah
                                        menguap.
                                    </p>
                                </div>
                            </div>

                            <p>
                                Penguapan terjadi ketika molekul pada
                                permukaan cairan memperoleh energi kinetik
                                yang cukup untuk mengatasi tarikan
                                antarmolekul dan berpindah ke fase gas.
                                Oleh karena itu, kekuatan gaya antarmolekul
                                dapat memengaruhi volatilitas suatu cairan.
                            </p>

                            <div className="m6-question">
                                <strong>Permasalahan</strong>
                                <p>
                                    Seorang siswa mengamati bahwa suatu
                                    cairan lebih cepat menguap dibandingkan
                                    cairan lainnya pada suhu dan kondisi
                                    lingkungan yang sama. Berdasarkan
                                    konsep gaya antarmolekul, penjelasan
                                    manakah yang paling tepat?
                                </p>
                            </div>

                            <div className="m6-check-card">
                                <h3>Aktivitas Elaborasi: Analisis Fenomena Sehari-hari</h3>

                                <p>
                                    Parfum yang disemprotkan ke tubuh atau pakaian lama-kelamaan
                                    akan menguap dan aromanya menyebar ke udara.
                                    Jelaskan fenomena tersebut berdasarkan konsep gaya antarmolekul.
                                    Hubungkan kekuatan gaya antarmolekul dengan kemudahan suatu
                                    zat menguap dan berikan alasan ilmiah yang mendukung penjelasanmu.
                                </p>

                                <div className="m6-essay-form">

                                    <div className="m6-form-group">
                                        <label htmlFor="student-name">Nama Lengkap</label>
                                        <input
                                            id="student-name"
                                            type="text"
                                            value={studentName}
                                            onChange={(e) => setStudentName(e.target.value)}
                                            placeholder="Masukkan nama lengkap"
                                            disabled={isSubmitting || submitSuccess}
                                        />
                                    </div>

                                    <div className="m6-form-group">
                                        <label htmlFor="student-class">Kelas</label>
                                        <input
                                            id="student-class"
                                            type="text"
                                            value={studentClass}
                                            onChange={(e) => setStudentClass(e.target.value)}
                                            placeholder="Contoh: XI IPA 1"
                                            disabled={isSubmitting || submitSuccess}
                                        />
                                    </div>

                                    <div className="m6-form-group">
                                        <label htmlFor="essay-answer">Jawaban Esai</label>
                                        <textarea
                                            id="essay-answer"
                                            value={essayAnswer}
                                            onChange={(e) => setEssayAnswer(e.target.value)}
                                            placeholder="Tuliskan jawaban dan alasan ilmiahmu di sini..."
                                            rows={7}
                                            disabled={isSubmitting || submitSuccess}
                                        />
                                    </div>

                                    <div className="m6-word-count">
                                        Jumlah kata: {
                                            essayAnswer.trim()
                                                ? essayAnswer.trim().split(/\s+/).length
                                                : 0
                                        } / 50 kata minimum
                                    </div>

                                    <button
                                        className="m6-control"
                                        onClick={handleSubmitEssay}
                                        disabled={isSubmitting || submitSuccess}
                                    >
                                        {isSubmitting
                                            ? 'Mengirim Jawaban...'
                                            : submitSuccess
                                                ? 'Jawaban Terkirim'
                                                : 'Kirim Jawaban'}
                                    </button>

                                    {submitMessage && (
                                        <div
                                            className={`m6-feedback ${submitSuccess ? 'correct' : 'incorrect'
                                                }`}
                                        >
                                            {submitMessage}
                                        </div>
                                    )}

                                </div>
                            </div>

                            <div className="m6-highlight">
                                <strong>Ingat!</strong>
                                <p>
                                    Penguapan tidak memutus ikatan kovalen
                                    di dalam molekul. Proses ini melibatkan
                                    molekul-molekul yang mengatasi interaksi
                                    antarmolekulnya.
                                </p>
                            </div>
                        </section>
                    )}

                    {/* 5. CONCLUSION */}
                    {activeSection === 'conclusion' && (
                        <section className="m6-section">
                            <span className="m6-section-eyebrow">
                                BAGIAN 5 · KESIMPULAN
                            </span>

                            <h2>Merangkum Hasil Analisis</h2>

                            <p>
                                Berdasarkan data dan aktivitas yang telah
                                dilakukan, dapat disimpulkan bahwa gaya
                                antarmolekul berperan penting dalam
                                menentukan sifat fisik suatu zat.
                            </p>

                            <div className="m6-summary-card">
                                <div className="m6-summary-item">
                                    <span>01</span>
                                    <div>
                                        <strong>Ukuran dan polarizabilitas</strong>
                                        <p>
                                            Peningkatan ukuran dan jumlah
                                            elektron umumnya meningkatkan
                                            polarizabilitas sehingga gaya
                                            dispersi London menjadi lebih kuat.
                                        </p>
                                    </div>
                                </div>

                                <div className="m6-summary-item">
                                    <span>02</span>
                                    <div>
                                        <strong>Polaritas molekul</strong>
                                        <p>
                                            Molekul polar dapat mengalami
                                            interaksi dipol-dipol selain
                                            gaya dispersi London.
                                        </p>
                                    </div>
                                </div>

                                <div className="m6-summary-item">
                                    <span>03</span>
                                    <div>
                                        <strong>Ikatan hidrogen</strong>
                                        <p>
                                            Ikatan hidrogen dapat menyebabkan
                                            sifat fisik yang berbeda, seperti
                                            titik didih air yang relatif tinggi.
                                        </p>
                                    </div>
                                </div>

                                <div className="m6-summary-item">
                                    <span>04</span>
                                    <div>
                                        <strong>Sifat fisik zat</strong>
                                        <p>
                                            Kekuatan gaya antarmolekul
                                            memengaruhi titik didih dan
                                            volatilitas suatu zat.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="m6-reflection">
                                <strong>Refleksi pembelajaran</strong>
                                <p>
                                    Setelah mempelajari modul ini, bagaimana
                                    kamu menjelaskan hubungan antara
                                    struktur molekul, gaya antarmolekul,
                                    dan sifat fisik suatu zat?
                                </p>
                            </div>
                        </section>
                    )}

                    {/* 6. REFERENCES */}
                    {activeSection === 'references' && (
                        <section className="m6-section">
                            <span className="m6-section-eyebrow">
                                BAGIAN 6 · REFERENSI
                            </span>

                            <h2>Sumber Belajar</h2>

                            <p>
                                Materi dan data pembelajaran dalam modul
                                ini disusun dengan mengacu pada sumber
                                kimia umum berikut.
                            </p>

                            <div className="m6-reference-card">
                                <strong>1. Buku utama</strong>
                                <p>
                                    Chang, R., & Goldsby, K. (2010).
                                    <em> Chemistry</em> (10th ed.).
                                    McGraw-Hill.
                                </p>
                                <span>
                                    Chapter 11 – Liquids and Intermolecular Forces,
                                    khususnya Section 11.2.
                                </span>
                            </div>

                            <div className="m6-reference-card">
                                <strong>2. Sumber pendukung</strong>
                                <p>
                                    Flowers, P., Theopold, K., Langley, R.,
                                    & Robinson, W. R. (2019).
                                    <em> Chemistry 2e</em>. OpenStax.
                                </p>
                                <span>
                                    Chapter 10 – Liquids and Solids.
                                </span>
                            </div>

                            <div className="m6-next-module">
                                <div>
                                    <strong>Siap menguji pemahamanmu?</strong>
                                    <p>
                                        Lanjutkan ke tahap Evaluate untuk
                                        mengukur pemahamanmu tentang gaya
                                        antarmolekul.
                                    </p>
                                </div>

                                <button
                                    className="m6-control"
                                    onClick={() => navigate('/module-7')}
                                >
                                    Lanjut ke Modul 7 →
                                </button>
                            </div>
                        </section>
                    )}
                </div>

                {/* BOTTOM NAVIGATION */}
                <div className="m6-bottom-navigation">
                    <button
                        className="m6-control m6-previous"
                        onClick={goPrevious}
                        disabled={currentIndex === 0}
                    >
                        ← Sebelumnya
                    </button>

                    <span>
                        Bagian {currentIndex + 1} dari {sections.length}
                    </span>

                    <button
                        className="m6-control"
                        onClick={goNext}
                        disabled={currentIndex === sections.length - 1}
                    >
                        Selanjutnya →
                    </button>
                </div>

            </main>
        </div>
    );
};

export default Module6Page;
