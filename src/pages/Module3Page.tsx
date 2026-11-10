
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Module1Page.css';
import './Module3Page.css';

type SectionId =
    | 'overview'
    | 'mechanism'
    | 'polarizability'
    | 'factors'
    | 'properties'
    | 'summary'
    | 'references';

const sections: { id: SectionId; number: string; label: string }[] = [
    { id: 'overview', number: '01', label: 'Pengertian' },
    { id: 'mechanism', number: '02', label: 'Mekanisme' },
    { id: 'polarizability', number: '03', label: 'Polarisabilitas' },
    { id: 'factors', number: '04', label: 'Faktor kekuatan' },
    { id: 'properties', number: '05', label: 'Sifat fisik' },
    { id: 'summary', number: '06', label: 'Rangkuman' },
    { id: 'references', number: '07', label: 'Referensi' },
];

const mechanismSteps = [
    {
        title: 'Distribusi elektron berubah sesaat',
        description:
            'Elektron terus bergerak. Pada suatu saat, distribusinya dapat menjadi tidak merata sehingga salah satu sisi partikel memiliki kerapatan elektron lebih besar.',
        detail:
            'Ketidakmerataan distribusi elektron ini berlangsung sementara dan dapat terjadi meskipun atom atau molekul tidak memiliki dipol permanen.',
    },
    {
        title: 'Terbentuk dipol sesaat',
        description:
            'Sisi yang memiliki kerapatan elektron lebih besar menjadi relatif negatif (δ−), sedangkan sisi yang kekurangan kerapatan elektron menjadi relatif positif (δ+).',
        detail:
            'Pemisahan muatan parsial sementara tersebut disebut dipol sesaat (instantaneous dipole).',
    },
    {
        title: 'Terbentuk dipol terinduksi',
        description:
            'Dipol sesaat menghasilkan medan listrik yang memengaruhi distribusi elektron partikel di dekatnya. Awan elektron partikel kedua mengalami distorsi sehingga terbentuk dipol terinduksi.',
        detail:
            'Sisi partikel kedua yang menghadap sisi δ− dari partikel pertama menjadi relatif δ+.',
    },
    {
        title: 'Kedua partikel saling tarik-menarik',
        description:
            'Muatan parsial yang berlawanan pada kedua partikel saling tarik-menarik. Interaksi ini merupakan gaya dispersi London.',
        detail:
            'Dipol-dipol tersebut bersifat sementara dan terus berubah, tetapi interaksi dispersinya tetap dapat terjadi.',
    },
];

const Module3Page: React.FC = () => {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] =
        useState<SectionId>('overview');

    const [mechanismStep, setMechanismStep] = useState(0);
    const [mechanismAnswer, setMechanismAnswer] =
        useState<string | null>(null);

    const [polarAnswer, setPolarAnswer] =
        useState<string | null>(null);

    const activeIndex = sections.findIndex(
        (section) => section.id === activeSection
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMechanismStep(0);
    }, [activeSection]);

    const handleBack = () => navigate('/');

    const goToSection = (id: SectionId) => {
        setActiveSection(id);
        setMechanismAnswer(null);
        setPolarAnswer(null);
    };

    const goPrevious = () => {
        if (activeIndex > 0) {
            goToSection(sections[activeIndex - 1].id);
        }
    };

    const goNext = () => {
        if (activeIndex < sections.length - 1) {
            goToSection(sections[activeIndex + 1].id);
        }
    };

    return (
        <div className="lesson-page m3-page">

            {/* HEADER */}
            <header className="lesson-header">
                <div className="lesson-header-inner">

                    <button
                        className="lesson-brand"
                        onClick={handleBack}
                        aria-label="Kembali ke Beranda"
                    >
                        <span className="lesson-brand-icon">⚗</span>
                        <span>
                            <strong>IMF Explorer</strong>
                            <small>Jelajah Gaya Antarmolekul</small>
                        </span>
                    </button>

                    <button
                        className="lesson-back-button"
                        onClick={handleBack}
                    >
                        ← Kembali ke Beranda
                    </button>

                </div>
            </header>

            <main className="lesson-main m3-main">

                {/* HERO */}
                <section className="lesson-hero m3-hero">

                    <div className="lesson-hero-content">
                        <span className="lesson-eyebrow">
                            TAHAP 3 · EXPLAIN
                        </span>

                        <h1>Gaya London (Gaya Dispersi)</h1>

                        <p className="lesson-hero-description">
                            Bagaimana partikel yang tidak memiliki kutub
                            permanen tetap dapat saling tarik-menarik?
                            Pelajari pembentukan dipol sesaat dan
                            dipol terinduksi.
                        </p>

                        <div className="lesson-meta">
                            <span>📖 Materi pembelajaran</span>
                            <span>⚛️ Konsep submikroskopik</span>
                            <span>⏱ ±10–15 menit</span>
                        </div>
                    </div>

                    <div className="m3-hero-visual" aria-hidden="true">
                        <div className="m3-hero-orbit">
                            <span>δ−</span>
                            <strong>e⁻</strong>
                            <span>δ+</span>
                        </div>
                        <small>Distribusi elektron</small>
                    </div>

                </section>

                {/* GAGASAN UTAMA */}
                <div className="m3-intro-note">
                    <span className="m3-note-icon">💡</span>
                    <div>
                        <strong>Gagasan utama</strong>
                        <p>
                            Gaya dispersi London berkaitan dengan dipol
                            sesaat yang dapat menginduksi dipol pada
                            partikel di dekatnya. Gaya dispersi terdapat
                            pada semua atom dan molekul, baik polar
                            maupun nonpolar (Chang &amp; Goldsby, 2010,
                            Bab 11.2).
                        </p>
                    </div>
                </div>

                {/* NAVIGASI BAGIAN */}
                <nav
                    className="m3-section-nav"
                    aria-label="Navigasi materi Modul 3"
                >
                    <div className="m3-nav-heading">
                        <span>JELAJAHI MATERI</span>
                        <small>
                            Pilih bagian untuk membuka pembahasan
                        </small>
                    </div>

                    <div className="m3-nav-items">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`m3-nav-item ${activeSection === section.id
                                    ? 'active'
                                    : ''
                                    }`}
                                onClick={() =>
                                    goToSection(section.id)
                                }
                                aria-current={
                                    activeSection === section.id
                                        ? 'step'
                                        : undefined
                                }
                            >
                                <span>{section.number}</span>
                                {section.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* PROGRES MATERI */}
                <div className="m3-progress-line">
                    <span>
                        Bagian {activeIndex + 1} dari {sections.length}
                    </span>
                    <span>
                        {Math.round(
                            ((activeIndex + 1) / sections.length) * 100
                        )}% materi
                    </span>
                </div>

                {/* KONTEN: HANYA BAGIAN AKTIF YANG DITAMPILKAN */}
                <div
                    className="m3-page-content"
                    key={activeSection}
                >

                    {/* 01. PENGERTIAN */}
                    {activeSection === 'overview' && (
                        <section className="m3-section m3-active-section">

                            <div className="m3-section-heading">
                                <span className="m3-kicker">
                                    01 · KONSEP DASAR
                                </span>

                                <h2>Mengenal Gaya London</h2>

                                <p>
                                    Partikel tidak harus memiliki kutub
                                    permanen untuk dapat saling
                                    tarik-menarik.
                                </p>
                            </div>

                            <div className="m3-content-card">
                                <h3>Mengapa gaya ini dapat terjadi?</h3>

                                <p>
                                    Elektron dalam atom atau molekul
                                    bergerak dan distribusinya dapat
                                    berubah dari waktu ke waktu. Pada
                                    suatu saat, distribusi elektron
                                    mungkin tidak merata. Ketidakmerataan
                                    sementara ini menghasilkan dipol
                                    sesaat yang dapat memengaruhi partikel
                                    di sekitarnya (Chang &amp; Goldsby,
                                    2010, Bab 11.2).
                                </p>

                                <p>
                                    Gaya tarik yang berkaitan dengan
                                    dipol sesaat dan dipol terinduksi ini
                                    disebut gaya dispersi London. Gaya
                                    ini tidak hanya terjadi pada molekul
                                    nonpolar; molekul polar juga memiliki
                                    kontribusi gaya dispersi (Flowers
                                    et al., 2019, bagian 10.1).
                                </p>

                                <div className="m3-highlight-line">
                                    <strong>Ingat:</strong> Gaya London
                                    merupakan salah satu jenis gaya
                                    antarmolekul yang berasal dari
                                    fluktuasi distribusi elektron.
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 02. MEKANISME */}
                    {activeSection === 'mechanism' && (
                        <section className="m3-section m3-active-section">

                            <div className="m3-section-heading">
                                <span className="m3-kicker">
                                    02 · MEKANISME PEMBENTUKAN
                                </span>

                                <h2>
                                    Bagaimana Gaya London Terbentuk?
                                </h2>

                                <p>
                                    Tekan tombol tahap berikutnya untuk
                                    mengamati mekanismenya satu per satu.
                                </p>
                            </div>

                            <div className="m3-content-card">

                                <div className="m3-mechanism-stepper">

                                    {/* INDIKATOR TAHAP */}
                                    <div className="m3-step-indicators">
                                        {mechanismSteps.map(
                                            (step, index) => (
                                                <button
                                                    key={step.title}
                                                    className={`m3-step-dot ${mechanismStep === index
                                                        ? 'active'
                                                        : ''
                                                        } ${mechanismStep > index
                                                            ? 'completed'
                                                            : ''
                                                        }`}
                                                    onClick={() =>
                                                        setMechanismStep(index)
                                                    }
                                                    aria-label={`Tampilkan tahap ${index + 1}`}
                                                >
                                                    {index + 1}
                                                </button>
                                            )
                                        )}
                                    </div>

                                    {/* ILUSTRASI MEKANISME */}
                                    <div
                                        className={`m3-mechanism-visual step-${mechanismStep + 1}`}
                                        aria-label={`Ilustrasi tahap ${mechanismStep + 1}`}
                                    >
                                        <div className="m3-visual-particle m3-visual-particle-one">
                                            <span className="m3-electron-cloud" />

                                            <span className="m3-charge m3-left-charge">
                                                {mechanismStep === 0 ? '?' : 'δ+'}
                                            </span>

                                            <span className="m3-charge m3-right-charge">
                                                {mechanismStep === 0 ? '?' : 'δ−'}
                                            </span>

                                            <b>Partikel 1</b>
                                        </div>

                                        <div className="m3-visual-interaction">
                                            {mechanismStep >= 2 && '············'}

                                            {mechanismStep === 3 && (
                                                <strong>
                                                    Tarik-menarik
                                                </strong>
                                            )}
                                        </div>

                                        <div className="m3-visual-particle m3-visual-particle-two">
                                            <span className="m3-electron-cloud" />

                                            <span className="m3-charge m3-left-charge">
                                                {mechanismStep >= 2 ? 'δ+' : '?'}
                                            </span>

                                            <span className="m3-charge m3-right-charge">
                                                {mechanismStep >= 2 ? 'δ−' : '?'}
                                            </span>

                                            <b>Partikel 2</b>
                                        </div>
                                    </div>

                                    {/* PENJELASAN SETIAP TAHAP */}
                                    <div
                                        className="m3-step-explanation"
                                        aria-live="polite"
                                    >
                                        <span className="m3-kicker">
                                            TAHAP {mechanismStep + 1} DARI 4
                                        </span>

                                        <h3>
                                            {mechanismSteps[mechanismStep].title}
                                        </h3>

                                        <p>
                                            {mechanismSteps[mechanismStep].description}
                                        </p>

                                        <div className="m3-highlight-line">
                                            {mechanismSteps[mechanismStep].detail}
                                        </div>

                                        <p className="m3-citation-inline">
                                            Sumber konsep: Chang &amp;
                                            Goldsby (2010, Bab 11.2);
                                            Flowers et al. (2019,
                                            bagian 10.1).
                                        </p>
                                    </div>

                                    {/* TOMBOL TAHAP */}
                                    <div className="m3-step-controls">
                                        <button
                                            className="m3-step-control secondary"
                                            onClick={() =>
                                                setMechanismStep(
                                                    (step) =>
                                                        Math.max(0, step - 1)
                                                )
                                            }
                                            disabled={mechanismStep === 0}
                                        >
                                            ← Tahap sebelumnya
                                        </button>

                                        <button
                                            className="m3-step-control"
                                            onClick={() =>
                                                setMechanismStep(
                                                    (step) =>
                                                        Math.min(3, step + 1)
                                                )
                                            }
                                            disabled={mechanismStep === 3}
                                        >
                                            Tahap berikutnya →
                                        </button>
                                    </div>

                                    <p className="m3-visual-caption">
                                        Ilustrasi konseptual, bukan
                                        gambaran skala atau lintasan
                                        elektron yang sebenarnya.
                                        Elektron tidak berpindah
                                        seluruhnya dari satu partikel
                                        ke partikel lain.
                                    </p>

                                </div>

                                {/* CEK PEMAHAMAN */}
                                <div className="m3-check-card">
                                    <span className="m3-kicker">
                                        CEK PEMAHAMAN
                                    </span>

                                    <h3>
                                        Ketika suatu atom membentuk dipol
                                        sesaat, apa yang dapat terjadi
                                        pada atom lain di dekatnya?
                                    </h3>

                                    {[
                                        [
                                            'A',
                                            'Atom kedua menerima elektron dari atom pertama.',
                                        ],
                                        [
                                            'B',
                                            'Distribusi elektron atom kedua berubah akibat pengaruh dipol sesaat pada atom pertama.',
                                        ],
                                        [
                                            'C',
                                            'Atom kedua selalu membentuk dipol permanen.',
                                        ],
                                    ].map(([letter, answer]) => (
                                        <button
                                            key={letter}
                                            className={`m3-answer ${mechanismAnswer === letter
                                                ? 'chosen'
                                                : ''
                                                } ${mechanismAnswer &&
                                                    letter === 'B'
                                                    ? 'right'
                                                    : ''
                                                } ${mechanismAnswer === letter &&
                                                    letter !== 'B'
                                                    ? 'wrong'
                                                    : ''
                                                }`}
                                            onClick={() =>
                                                setMechanismAnswer(letter)
                                            }
                                        >
                                            <b>{letter}</b>
                                            <span>{answer}</span>
                                        </button>
                                    ))}

                                    {mechanismAnswer && (
                                        <p
                                            className={`m3-feedback ${mechanismAnswer === 'B'
                                                ? 'correct'
                                                : 'incorrect'
                                                }`}
                                        >
                                            {mechanismAnswer === 'B'
                                                ? 'Tepat! Dipol sesaat dapat mengubah distribusi elektron partikel di dekatnya sehingga terbentuk dipol terinduksi.'
                                                : 'Belum tepat. Yang berubah adalah distribusi elektron pada partikel tetangga, bukan perpindahan elektron dari satu atom ke atom lain.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 03. POLARISABILITAS */}
                    {activeSection === 'polarizability' && (
                        <section className="m3-section m3-active-section">

                            <div className="m3-section-heading">
                                <span className="m3-kicker">
                                    03 · KEMUDAHAN AWAN ELEKTRON BERUBAH
                                </span>

                                <h2>Polarisabilitas</h2>

                                <p>
                                    Seberapa mudah awan elektron suatu
                                    partikel mengalami distorsi?
                                </p>
                            </div>

                            <div className="m3-content-card">
                                <h3>Pengertian polarisabilitas</h3>

                                <p>
                                    <strong>Polarisabilitas</strong> adalah
                                    ukuran kemudahan awan elektron dalam
                                    atom atau molekul mengalami distorsi
                                    akibat pengaruh medan listrik di
                                    sekitarnya. Semakin mudah awan
                                    elektron terdistorsi, semakin besar
                                    polarisabilitasnya (IUPAC, Gold Book,
                                    “Polarizability”).
                                </p>

                                <p>
                                    Partikel dengan polarisabilitas lebih
                                    besar cenderung menghasilkan dipol
                                    terinduksi yang lebih besar, sehingga
                                    gaya dispersinya cenderung lebih kuat
                                    apabila dibandingkan dalam kondisi
                                    yang sebanding (Chang &amp; Goldsby,
                                    2010, Bab 11.2).
                                </p>

                                {/* PERBANDINGAN He DAN Xe */}
                                <div className="m3-comparison">
                                    <div className="m3-comparison-heading">
                                        <div>
                                            <span className="m3-kicker">
                                                PERBANDINGAN
                                            </span>
                                            <h3>
                                                Helium (He) dan Xenon (Xe)
                                            </h3>
                                        </div>

                                        <span className="m3-compare-tag">
                                            Skema konseptual
                                        </span>
                                    </div>

                                    <div className="m3-atom-comparison">

                                        <div className="m3-atom-card">
                                            <div className="m3-atom he-atom">
                                                <span>He</span>
                                            </div>

                                            <strong>Helium</strong>

                                            <p>
                                                Memiliki dua elektron dan
                                                awan elektron relatif
                                                sulit terdistorsi.
                                            </p>

                                            <small>
                                                Polarisabilitas lebih rendah
                                            </small>
                                        </div>

                                        <div className="m3-atom-card">
                                            <div className="m3-atom xe-atom">
                                                <span>Xe</span>
                                            </div>

                                            <strong>Xenon</strong>

                                            <p>
                                                Memiliki lebih banyak
                                                elektron dan awan elektron
                                                lebih mudah terdistorsi.
                                            </p>

                                            <small>
                                                Polarisabilitas lebih tinggi
                                            </small>
                                        </div>

                                    </div>

                                    <p className="m3-visual-caption">
                                        Perbandingan kualitatif.
                                        Ukuran ilustrasi tidak menunjukkan
                                        ukuran atom sebenarnya
                                        (Chang &amp; Goldsby, 2010,
                                        Bab 11.2).
                                    </p>
                                </div>

                                {/* CEK PEMAHAMAN */}
                                <div className="m3-check-card">
                                    <span className="m3-kicker">
                                        CEK PEMAHAMAN
                                    </span>

                                    <h3>
                                        Jika atom A lebih mudah mengalami
                                        distorsi awan elektron daripada
                                        atom B, bagaimana kecenderungan
                                        gaya London pada kondisi yang
                                        sebanding?
                                    </h3>

                                    <button
                                        className={`m3-answer ${polarAnswer === 'A'
                                            ? 'chosen right'
                                            : ''
                                            }`}
                                        onClick={() => setPolarAnswer('A')}
                                    >
                                        <b>A</b>
                                        <span>
                                            Atom A cenderung memiliki
                                            gaya London lebih kuat
                                            karena polarisabilitasnya
                                            lebih besar.
                                        </span>
                                    </button>

                                    <button
                                        className={`m3-answer ${polarAnswer === 'B'
                                            ? 'chosen wrong'
                                            : ''
                                            }`}
                                        onClick={() => setPolarAnswer('B')}
                                    >
                                        <b>B</b>
                                        <span>
                                            Atom A memiliki gaya London
                                            lebih lemah karena awan
                                            elektronnya mudah berubah.
                                        </span>
                                    </button>

                                    {polarAnswer && (
                                        <p
                                            className={`m3-feedback ${polarAnswer === 'A'
                                                ? 'correct'
                                                : 'incorrect'
                                                }`}
                                        >
                                            {polarAnswer === 'A'
                                                ? 'Benar! Kemudahan awan elektron mengalami distorsi menunjukkan polarisabilitas lebih besar.'
                                                : 'Coba lagi. Kemudahan awan elektron mengalami distorsi menunjukkan polarisabilitas lebih besar.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 04. FAKTOR KEKUATAN */}
                    {activeSection === 'factors' && (
                        <section className="m3-section m3-active-section">

                            <div className="m3-section-heading">
                                <span className="m3-kicker">
                                    04 · FAKTOR YANG MEMENGARUHI
                                </span>

                                <h2>
                                    Apa yang Memperkuat Gaya London?
                                </h2>

                                <p>
                                    Kekuatan gaya dispersi berkaitan
                                    dengan karakteristik awan elektron
                                    dan bentuk molekul.
                                </p>
                            </div>

                            <div className="m3-factor-grid">

                                <article className="m3-factor-card">
                                    <span className="m3-factor-icon">⚛</span>
                                    <h3>Jumlah elektron</h3>
                                    <p>
                                        Jumlah elektron yang lebih banyak
                                        umumnya berkaitan dengan awan
                                        elektron yang lebih mudah
                                        terdistorsi (Chang &amp;
                                        Goldsby, 2010, Bab 11.2).
                                    </p>
                                </article>

                                <article className="m3-factor-card">
                                    <span className="m3-factor-icon">☁</span>
                                    <h3>Polarisabilitas</h3>
                                    <p>
                                        Semakin besar polarisabilitas,
                                        semakin mudah terbentuk dipol
                                        terinduksi dan semakin kuat
                                        gaya dispersi (IUPAC, Gold Book,
                                        “Polarizability”).
                                    </p>
                                </article>

                                <article className="m3-factor-card">
                                    <span className="m3-factor-icon">◇</span>
                                    <h3>Bentuk molekul</h3>
                                    <p>
                                        Molekul yang lebih memanjang
                                        dapat memiliki luas permukaan
                                        kontak lebih besar daripada
                                        molekul yang lebih kompak dengan
                                        massa molekul sebanding
                                        (Flowers et al., 2019,
                                        bagian 10.1).
                                    </p>
                                </article>

                            </div>

                            <div className="m3-content-card">
                                <h3>Contoh data senyawa nonpolar</h3>

                                <p>
                                    Tabel berikut menunjukkan jumlah
                                    elektron dan titik leleh beberapa
                                    senyawa nonpolar. Data titik leleh
                                    dirujuk dari Chang dan Goldsby
                                    (2010, Tabel 11.2).
                                </p>

                                <div className="m3-table-wrap">
                                    <table className="m3-data-table">
                                        <thead>
                                            <tr>
                                                <th>Senyawa</th>
                                                <th>Jumlah elektron</th>
                                                <th>Titik leleh (°C)</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>CH₄</td>
                                                <td>10</td>
                                                <td>−182,5</td>
                                            </tr>
                                            <tr>
                                                <td>CF₄</td>
                                                <td>42</td>
                                                <td>−150,0</td>
                                            </tr>
                                            <tr>
                                                <td>CCl₄</td>
                                                <td>74</td>
                                                <td>−23,0</td>
                                            </tr>
                                            <tr>
                                                <td>CBr₄</td>
                                                <td>146</td>
                                                <td>90,0</td>
                                            </tr>
                                            <tr>
                                                <td>CI₄</td>
                                                <td>218</td>
                                                <td>171,0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p className="m3-citation-inline">
                                    Sumber data: Chang &amp; Goldsby
                                    (2010, Tabel 11.2). Jumlah elektron
                                    dihitung dari jumlah elektron atom
                                    penyusunnya.
                                </p>

                                <div className="m3-highlight-line">
                                    <strong>Perhatikan:</strong> Jangan
                                    menyimpulkan bahwa titik leleh hanya
                                    ditentukan oleh gaya London. Titik
                                    leleh juga dipengaruhi susunan dan
                                    kemasan partikel dalam kristal.
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 05. SIFAT FISIK */}
                    {activeSection === 'properties' && (
                        <section className="m3-section m3-active-section">

                            <div className="m3-section-heading">
                                <span className="m3-kicker">
                                    05 · HUBUNGAN DENGAN SIFAT FISIK
                                </span>

                                <h2>
                                    Pengaruh Gaya London terhadap
                                    Sifat Zat
                                </h2>

                                <p>
                                    Gaya tarik antarmolekul ikut
                                    menentukan energi yang diperlukan
                                    untuk memisahkan partikel.
                                </p>
                            </div>

                            <div className="m3-property-grid">

                                <article className="m3-property-card">
                                    <div className="m3-property-symbol">
                                        🌡️
                                    </div>

                                    <div>
                                        <h3>Titik didih</h3>

                                        <p>
                                            Jika gaya London menjadi
                                            faktor dominan, gaya dispersi
                                            yang lebih kuat umumnya
                                            membuat lebih banyak energi
                                            diperlukan untuk memisahkan
                                            molekul ke fase gas.
                                            Akibatnya, titik didih
                                            cenderung lebih tinggi
                                            (Flowers et al., 2019,
                                            bagian 10.1).
                                        </p>
                                    </div>
                                </article>

                                <article className="m3-property-card">
                                    <div className="m3-property-symbol">
                                        💨
                                    </div>

                                    <div>
                                        <h3>Volatilitas</h3>

                                        <p>
                                            Zat dengan gaya tarik
                                            antarmolekul lebih kuat
                                            cenderung lebih sulit
                                            menguap. Karena itu,
                                            volatilitasnya umumnya
                                            lebih rendah (Flowers
                                            et al., 2019, bagian 10.1).
                                        </p>
                                    </div>
                                </article>

                            </div>

                            <div className="m3-content-card">
                                <h3>
                                    Contoh: kecenderungan titik didih alkana
                                </h3>

                                <p>
                                    Pada deret alkana rantai lurus,
                                    ukuran molekul dan jumlah elektronnya
                                    meningkat dari etana ke propana lalu
                                    butana. Gaya dispersi antarmolekul
                                    juga cenderung meningkat sehingga
                                    titik didihnya meningkat
                                    (Chang &amp; Goldsby, 2010;
                                    Flowers et al., 2019, bagian 10.1).
                                </p>

                                <div className="m3-highlight-line">
                                    Hubungan ini merupakan kecenderungan
                                    umum untuk membandingkan zat dalam
                                    kondisi yang sesuai. Jika jenis gaya
                                    antarmolekul lain berbeda, pengaruhnya
                                    juga harus dipertimbangkan.
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 06. RANGKUMAN */}
                    {activeSection === 'summary' && (
                        <section className="m3-section m3-active-section">

                            <div className="m3-section-heading">
                                <span className="m3-kicker">
                                    06 · RANGKUMAN
                                </span>

                                <h2>Apa yang Sudah Kamu Pelajari?</h2>

                                <p>
                                    Empat gagasan utama dari materi
                                    Gaya London.
                                </p>
                            </div>

                            <div className="m3-summary-grid">

                                <article className="m3-summary-card">
                                    <span>01</span>
                                    <h3>Apa itu Gaya London?</h3>
                                    <p>
                                        Gaya tarik antarp partikel yang
                                        berkaitan dengan dipol sesaat
                                        dan dipol terinduksi
                                        (Chang &amp; Goldsby, 2010).
                                    </p>
                                </article>

                                <article className="m3-summary-card">
                                    <span>02</span>
                                    <h3>Bagaimana terbentuknya?</h3>
                                    <p>
                                        Distribusi elektron berubah
                                        sesaat, lalu memengaruhi
                                        distribusi elektron partikel
                                        di dekatnya (Flowers et al., 2019).
                                    </p>
                                </article>

                                <article className="m3-summary-card">
                                    <span>03</span>
                                    <h3>
                                        Apa yang memengaruhi kekuatannya?
                                    </h3>
                                    <p>
                                        Polarisabilitas, jumlah elektron,
                                        serta bentuk dan luas permukaan
                                        kontak molekul
                                        (Chang &amp; Goldsby, 2010).
                                    </p>
                                </article>

                                <article className="m3-summary-card">
                                    <span>04</span>
                                    <h3>
                                        Apa pengaruhnya terhadap sifat zat?
                                    </h3>
                                    <p>
                                        Gaya dispersi yang lebih kuat
                                        umumnya berkaitan dengan titik
                                        didih lebih tinggi dan volatilitas
                                        lebih rendah (Flowers et al., 2019).
                                    </p>
                                </article>

                            </div>
                        </section>
                    )}

                    {/* 07. REFERENSI */}
                    {activeSection === 'references' && (
                        <section className="m3-section m3-active-section">

                            <div className="m3-section-heading">
                                <span className="m3-kicker">
                                    07 · SUMBER BELAJAR
                                </span>

                                <h2>Referensi</h2>

                                <p>
                                    Daftar sumber yang dirujuk pada
                                    penjelasan materi.
                                </p>
                            </div>

                            <div className="m3-reference-list">

                                <article className="m3-reference-card">
                                    <span>📘</span>
                                    <div>
                                        <strong>Referensi utama</strong>
                                        <p>
                                            Chang, R., &amp; Goldsby,
                                            K. A. (2010).
                                            <em> Chemistry</em> (10th ed.).
                                            McGraw-Hill. Bab 11.2.
                                        </p>
                                    </div>
                                </article>

                                <article className="m3-reference-card">
                                    <span>📗</span>
                                    <div>
                                        <strong>Referensi pendukung</strong>
                                        <p>
                                            Flowers, P., Theopold, K.,
                                            Langley, R., &amp; Robinson,
                                            W. R. (2019).
                                            <em> Chemistry 2e</em>.
                                            OpenStax.
                                            {' '}
                                            <a
                                                href="https://openstax.org/details/books/chemistry-2e"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Buka buku
                                            </a>.
                                        </p>
                                    </div>
                                </article>

                                <article className="m3-reference-card">
                                    <span>📙</span>
                                    <div>
                                        <strong>Definisi istilah</strong>
                                        <p>
                                            International Union of Pure
                                            and Applied Chemistry.
                                            <em> Compendium of Chemical
                                                Terminology (the Gold Book)</em>:
                                            London forces dan polarizability.
                                        </p>

                                        <p>
                                            <a
                                                href="https://doi.org/10.1351/goldbook.L03617"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                London forces
                                            </a>
                                            {' · '}
                                            <a
                                                href="https://doi.org/10.1351/goldbook.P04711"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Polarizability
                                            </a>
                                        </p>
                                    </div>
                                </article>

                            </div>
                        </section>
                    )}

                </div>


                {/* NAVIGASI SEBELUMNYA DAN SELANJUTNYA */}
                <div className="m3-page-navigation">

                    <button
                        className="m3-step-control secondary"
                        onClick={goPrevious}
                        disabled={activeIndex === 0}
                    >
                        ← Sebelumnya
                    </button>

                    <span>
                        {sections[activeIndex].number} / 07 ·
                        {' '}
                        {sections[activeIndex].label}
                    </span>

                    {activeIndex < sections.length - 1 ? (
                        <button
                            className="m3-step-control"
                            onClick={goNext}
                        >
                            Selanjutnya →
                        </button>
                    ) : (
                        <button
                            className="m3-step-control"
                            onClick={() => goToSection('overview')}
                        >
                            ✓ Selesai Membaca · Kembali ke Awal Modul 3
                        </button>
                    )}

                </div>

                {/* LANJUT KE MODUL 4 */}
                {activeSection === 'references' && (
                    <div className="m3-next-module">
                        <div>
                            <strong>Siap mempelajari gaya antarmolekul berikutnya?</strong>
                            <p>
                                Lanjutkan perjalananmu dengan mempelajari
                                Gaya Dipol-Dipol.
                            </p>
                        </div>

                        <button
                            className="m3-step-control"
                            onClick={() => navigate('/module-4')}
                        >
                            Lanjut ke Modul 4: Gaya Dipol-Dipol →
                        </button>
                    </div>
                )}

                <div className="lesson-bottom-navigation">
                    <button onClick={handleBack}>
                        ← Kembali ke Beranda
                    </button>

                    <span>
                        IMF Explorer · Pembelajaran Kimia
                    </span>
                </div>
            </main>
        </div>
    );
};

export default Module3Page;