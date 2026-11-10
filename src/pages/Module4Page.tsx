
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Module1Page.css';
import './Module4Page.css';

type SectionId =
    | 'overview'
    | 'mechanism'
    | 'orientation'
    | 'factors'
    | 'properties'
    | 'summary'
    | 'references';

const sections: { id: SectionId; number: string; label: string }[] = [
    { id: 'overview', number: '01', label: 'Pengertian' },
    { id: 'mechanism', number: '02', label: 'Mekanisme' },
    { id: 'orientation', number: '03', label: 'Orientasi molekul' },
    { id: 'factors', number: '04', label: 'Faktor kekuatan' },
    { id: 'properties', number: '05', label: 'Sifat fisik' },
    { id: 'summary', number: '06', label: 'Rangkuman' },
    { id: 'references', number: '07', label: 'Referensi' },
];

const mechanismSteps = [
    {
        title: 'Molekul memiliki distribusi elektron tidak merata',
        description:
            'Pada molekul HCl, atom klorin (Cl) memiliki keelektronegatifan lebih tinggi daripada hidrogen (H). Akibatnya, pasangan elektron ikatan lebih tertarik ke arah atom Cl.',
        detail:
            'Atom H memiliki muatan parsial positif (δ+), sedangkan atom Cl memiliki muatan parsial negatif (δ−).',
    },
    {
        title: 'Terbentuk dipol permanen',
        description:
            'Perbedaan distribusi elektron tersebut menyebabkan molekul HCl memiliki dua kutub muatan parsial yang tetap selama molekul mempertahankan struktur dan orientasinya.',
        detail:
            'Pemisahan muatan ini disebut dipol permanen. Berbeda dengan dipol sesaat pada gaya London, dipol HCl berasal dari kepolaran ikatan H–Cl.',
    },
    {
        title: 'Kutub berlawanan saling mendekat',
        description:
            'Ketika dua molekul HCl berada berdekatan, ujung H (δ+) dari satu molekul dapat mengarah ke ujung Cl (δ−) molekul lainnya.',
        detail:
            'Interaksi elektrostatik antara kutub yang berlawanan menghasilkan gaya tarik antarmolekul.',
    },
    {
        title: 'Terjadi gaya tarik dipol-dipol',
        description:
            'Tarikan antara kutub-kutub berlawanan pada molekul polar yang berdekatan disebut gaya dipol-dipol.',
        detail:
            'Interaksi ini merupakan salah satu gaya antarmolekul. Gaya tersebut tidak memutus ikatan kovalen H–Cl di dalam molekul.',
    },
];

const Module4Page: React.FC = () => {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] =
        useState<SectionId>('overview');

    const [mechanismStep, setMechanismStep] = useState(0);
    const [orientation, setOrientation] = useState('attraction');

    const [mechanismAnswer, setMechanismAnswer] =
        useState<string | null>(null);

    const [orientationAnswer, setOrientationAnswer] =
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

    const goToSection = (id: SectionId) => {
        setActiveSection(id);
        setMechanismAnswer(null);
        setOrientationAnswer(null);
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
        <div className="lesson-page m4-page">

            {/* HEADER */}
            <header className="lesson-header">
                <div className="lesson-header-inner">

                    <button
                        className="lesson-brand"
                        onClick={() => navigate('/')}
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
                        onClick={() => navigate('/')}
                    >
                        ← Kembali ke Beranda
                    </button>

                </div>
            </header>

            <main className="lesson-main m4-main">

                {/* HERO */}
                <section className="lesson-hero m4-hero">
                    <div className="lesson-hero-content">

                        <span className="lesson-eyebrow">
                            TAHAP 3 · EXPLAIN
                        </span>

                        <h1>Gaya Dipol-Dipol</h1>

                        <p className="lesson-hero-description">
                            Mengapa molekul polar dapat saling
                            tarik-menarik? Pelajari interaksi antara
                            kutub positif dan negatif pada molekul
                            yang memiliki dipol permanen.
                        </p>

                        <div className="lesson-meta">
                            <span>📖 Materi pembelajaran</span>
                            <span>🧲 Interaksi elektrostatik</span>
                            <span>⏱ ±10 menit</span>
                        </div>
                    </div>

                    <div className="m4-hero-visual" aria-hidden="true">
                        <div className="m4-hero-molecule">
                            <span className="m4-hero-h">Hδ+</span>
                            <span className="m4-hero-bond" />
                            <span className="m4-hero-cl">Clδ−</span>
                        </div>
                        <small>Dipol permanen HCl</small>
                    </div>
                </section>

                {/* GAGASAN UTAMA */}
                <div className="m4-intro-note">
                    <span className="m4-note-icon">💡</span>
                    <div>
                        <strong>Gagasan utama</strong>
                        <p>
                            Gaya dipol-dipol merupakan gaya tarik
                            elektrostatik antara molekul-molekul polar
                            yang memiliki dipol permanen. Kutub positif
                            parsial suatu molekul tertarik pada kutub
                            negatif parsial molekul lainnya
                            (Chang &amp; Goldsby, 2010; Flowers et al., 2019).
                        </p>
                    </div>
                </div>

                {/* NAVIGASI BAGIAN */}
                <nav className="m4-section-nav" aria-label="Navigasi materi Modul 4">
                    <div className="m4-nav-heading">
                        <span>JELAJAHI MATERI</span>
                        <small>Pilih bagian untuk membuka pembahasan</small>
                    </div>

                    <div className="m4-nav-items">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`m4-nav-item ${activeSection === section.id ? 'active' : ''
                                    }`}
                                onClick={() => goToSection(section.id)}
                                aria-current={
                                    activeSection === section.id ? 'step' : undefined
                                }
                            >
                                <span>{section.number}</span>
                                {section.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* PROGRES */}
                <div className="m4-progress-line">
                    <span>
                        Bagian {activeIndex + 1} dari {sections.length}
                    </span>
                    <span>
                        {Math.round(
                            ((activeIndex + 1) / sections.length) * 100
                        )}% materi
                    </span>
                </div>

                {/* KONTEN BAGIAN AKTIF */}
                <div className="m4-page-content" key={activeSection}>

                    {/* 01. PENGERTIAN */}
                    {activeSection === 'overview' && (
                        <section className="m4-section">
                            <div className="m4-section-heading">
                                <span className="m4-kicker">01 · KONSEP DASAR</span>
                                <h2>Mengenal Gaya Dipol-Dipol</h2>
                                <p>
                                    Molekul polar memiliki kutub positif
                                    dan negatif parsial yang dapat
                                    berinteraksi dengan molekul polar lainnya.
                                </p>
                            </div>

                            <div className="m4-content-card">
                                <h3>Apa yang dimaksud dengan gaya dipol-dipol?</h3>

                                <p>
                                    Gaya dipol-dipol adalah gaya tarik
                                    elektrostatik antara molekul-molekul
                                    polar. Molekul polar memiliki distribusi
                                    elektron yang tidak merata sehingga
                                    terbentuk kutub positif parsial (δ+)
                                    dan kutub negatif parsial (δ−).
                                </p>

                                <p>
                                    Ketika dua molekul polar berdekatan,
                                    kutub positif parsial dari satu molekul
                                    dapat tertarik pada kutub negatif parsial
                                    molekul lainnya. Interaksi inilah yang
                                    disebut gaya dipol-dipol
                                    (Chang &amp; Goldsby, 2010).
                                </p>

                                <div className="m4-molecule-example">
                                    <span className="m4-example-label">
                                        CONTOH MOLEKUL HCl
                                    </span>
                                    <div className="m4-hcl-large">
                                        <span className="m4-h-label">H δ+</span>
                                        <span className="m4-bond" />
                                        <span className="m4-cl-label">Cl δ−</span>
                                    </div>
                                    <p>
                                        Elektron ikatan lebih tertarik
                                        ke arah Cl karena atom Cl lebih
                                        elektronegatif daripada H.
                                    </p>
                                </div>

                                <div className="m4-highlight-line">
                                    <strong>Ingat:</strong> Gaya dipol-dipol
                                    terjadi antarmolekul polar yang memiliki
                                    dipol permanen, bukan akibat dipol sesaat.
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 02. MEKANISME */}
                    {activeSection === 'mechanism' && (
                        <section className="m4-section">
                            <div className="m4-section-heading">
                                <span className="m4-kicker">
                                    02 · MEKANISME PEMBENTUKAN
                                </span>
                                <h2>Bagaimana Gaya Dipol-Dipol Terbentuk?</h2>
                                <p>
                                    Amati pembentukan dipol permanen
                                    dan interaksi antara dua molekul HCl.
                                </p>
                            </div>

                            <div className="m4-content-card">
                                <div className="m4-step-indicators">
                                    {mechanismSteps.map((step, index) => (
                                        <button
                                            key={step.title}
                                            className={`m4-step-dot ${mechanismStep === index ? 'active' : ''
                                                } ${mechanismStep > index ? 'completed' : ''
                                                }`}
                                            onClick={() => setMechanismStep(index)}
                                            aria-label={`Tampilkan tahap ${index + 1}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <div className={`m4-mechanism-visual step-${mechanismStep + 1}`}>
                                    <div className="m4-single-molecule">
                                        <span className="m4-molecule-h">H δ+</span>
                                        <span className="m4-molecule-bond" />
                                        <span className="m4-molecule-cl">Cl δ−</span>
                                    </div>

                                    {mechanismStep >= 2 && (
                                        <>
                                            <span className="m4-interaction-dots">········</span>
                                            <div className="m4-single-molecule second">
                                                <span className="m4-molecule-h">H δ+</span>
                                                <span className="m4-molecule-bond" />
                                                <span className="m4-molecule-cl">Cl δ−</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="m4-step-explanation" aria-live="polite">
                                    <span className="m4-kicker">
                                        TAHAP {mechanismStep + 1} DARI 4
                                    </span>

                                    <h3>{mechanismSteps[mechanismStep].title}</h3>
                                    <p>{mechanismSteps[mechanismStep].description}</p>

                                    <div className="m4-highlight-line">
                                        {mechanismSteps[mechanismStep].detail}
                                    </div>

                                    <p className="m4-citation-inline">
                                        Sumber konsep: Chang &amp; Goldsby (2010);
                                        Flowers et al. (2019).
                                    </p>
                                </div>

                                <div className="m4-step-controls">
                                    <button
                                        className="m4-control secondary"
                                        onClick={() =>
                                            setMechanismStep((step) =>
                                                Math.max(0, step - 1)
                                            )
                                        }
                                        disabled={mechanismStep === 0}
                                    >
                                        ← Tahap sebelumnya
                                    </button>

                                    <button
                                        className="m4-control"
                                        onClick={() =>
                                            setMechanismStep((step) =>
                                                Math.min(3, step + 1)
                                            )
                                        }
                                        disabled={mechanismStep === 3}
                                    >
                                        Tahap berikutnya →
                                    </button>
                                </div>

                                <p className="m4-visual-caption">
                                    Ilustrasi konseptual. Label muatan parsial
                                    menunjukkan distribusi muatan dalam molekul,
                                    bukan muatan ion penuh.
                                </p>
                                {/* CEK PEMAHAMAN */}
                                <div className="m4-check-card">
                                    <span className="m4-kicker">CEK PEMAHAMAN</span>

                                    <h3>
                                        Ketika dua molekul HCl saling berdekatan,
                                        mengapa atom H (δ+) dari satu molekul
                                        dapat tertarik pada atom Cl (δ−) dari
                                        molekul lainnya?
                                    </h3>

                                    {[
                                        [
                                            'A',
                                            'Karena kedua atom memiliki muatan parsial yang sama.',
                                        ],
                                        [
                                            'B',
                                            'Karena muatan parsial yang berlawanan menghasilkan tarikan elektrostatik.',
                                        ],
                                        [
                                            'C',
                                            'Karena ikatan kovalen H–Cl berpindah ke molekul lain.',
                                        ],
                                    ].map(([letter, answer]) => (
                                        <button
                                            key={letter}
                                            className={`m4-answer ${mechanismAnswer === letter ? 'chosen' : ''
                                                } ${mechanismAnswer && letter === 'B' ? 'right' : ''
                                                } ${mechanismAnswer === letter && letter !== 'B'
                                                    ? 'wrong'
                                                    : ''
                                                }`}
                                            onClick={() => setMechanismAnswer(letter)}
                                        >
                                            <b>{letter}</b>
                                            <span>{answer}</span>
                                        </button>
                                    ))}

                                    {mechanismAnswer && (
                                        <p
                                            className={`m4-feedback ${mechanismAnswer === 'B' ? 'correct' : 'incorrect'
                                                }`}
                                        >
                                            {mechanismAnswer === 'B'
                                                ? 'Tepat! Kutub positif parsial (δ+) dan kutub negatif parsial (δ−) saling tarik-menarik melalui interaksi elektrostatik.'
                                                : 'Belum tepat. Perhatikan kembali muatan parsial pada molekul HCl. Kutub dengan muatan berlawanan akan saling tarik-menarik.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 03. ORIENTASI MOLEKUL */}
                    {activeSection === 'orientation' && (
                        <section className="m4-section">
                            <div className="m4-section-heading">
                                <span className="m4-kicker">
                                    03 · INTERAKSI ANTARMOLEKUL
                                </span>
                                <h2>Pengaruh Orientasi Molekul</h2>
                                <p>
                                    Susunan kutub molekul menentukan
                                    apakah interaksi menghasilkan tarikan
                                    atau tolakan.
                                </p>
                            </div>

                            <div className="m4-content-card">
                                <h3>Bandingkan orientasi dua molekul HCl</h3>

                                <div className="m4-orientation-tabs">
                                    <button
                                        className={orientation === 'attraction' ? 'active' : ''}
                                        onClick={() => setOrientation('attraction')}
                                    >
                                        Kutub berlawanan berdekatan
                                    </button>
                                    <button
                                        className={orientation === 'repulsion' ? 'active' : ''}
                                        onClick={() => setOrientation('repulsion')}
                                    >
                                        Kutub sejenis berdekatan
                                    </button>
                                </div>

                                <div className={`m4-orientation-visual ${orientation}`}>
                                    <div className="m4-orientation-molecule">
                                        <span>H δ+</span>
                                        <i />
                                        <span>Cl δ−</span>
                                    </div>

                                    <div className="m4-orientation-symbol">
                                        {orientation === 'attraction' ? '······' : '↔'}
                                    </div>

                                    <div className={`m4-orientation-molecule ${orientation === 'repulsion' ? 'reverse' : ''
                                        }`}>
                                        <span>H δ+</span>
                                        <i />
                                        <span>Cl δ−</span>
                                    </div>
                                </div>

                                {orientation === 'attraction' ? (
                                    <div className="m4-orientation-explanation attractive">
                                        <strong>Tarikan elektrostatik</strong>
                                        <p>
                                            Ujung Cl (δ−) dari molekul pertama
                                            berdekatan dengan ujung H (δ+)
                                            molekul kedua. Muatan parsial
                                            berlawanan saling tarik-menarik.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="m4-orientation-explanation repulsive">
                                        <strong>Tolakan elektrostatik</strong>
                                        <p>
                                            Kutub sejenis yang saling berdekatan
                                            mengalami tolakan elektrostatik.
                                            Susunan ini kurang menguntungkan
                                            dibandingkan susunan dengan kutub
                                            berlawanan yang berdekatan.
                                        </p>
                                    </div>
                                )}

                                <div className="m4-highlight-line">
                                    <strong>Kesimpulan:</strong> Orientasi
                                    molekul memengaruhi interaksi elektrostatik.
                                    Dalam zat cair, molekul terus bergerak
                                    sehingga orientasinya dapat berubah.
                                </div>
                                {/* CEK PEMAHAMAN */}
                                <div className="m4-check-card">
                                    <span className="m4-kicker">CEK PEMAHAMAN</span>

                                    <h3>
                                        Jika dua molekul HCl didekatkan dengan
                                        ujung Cl (δ−) saling berhadapan,
                                        interaksi apa yang terjadi pada kedua
                                        ujung tersebut?
                                    </h3>

                                    {[
                                        [
                                            'A',
                                            'Tarik-menarik karena keduanya memiliki dipol permanen.',
                                        ],
                                        [
                                            'B',
                                            'Tolak-menolak karena kedua ujung memiliki muatan parsial negatif.',
                                        ],
                                        [
                                            'C',
                                            'Tidak terjadi interaksi karena molekul HCl bersifat netral.',
                                        ],
                                    ].map(([letter, answer]) => (
                                        <button
                                            key={letter}
                                            className={`m4-answer ${orientationAnswer === letter ? 'chosen' : ''
                                                } ${orientationAnswer && letter === 'B' ? 'right' : ''
                                                } ${orientationAnswer === letter && letter !== 'B'
                                                    ? 'wrong'
                                                    : ''
                                                }`}
                                            onClick={() => setOrientationAnswer(letter)}
                                        >
                                            <b>{letter}</b>
                                            <span>{answer}</span>
                                        </button>
                                    ))}

                                    {orientationAnswer && (
                                        <p
                                            className={`m4-feedback ${orientationAnswer === 'B' ? 'correct' : 'incorrect'
                                                }`}
                                        >
                                            {orientationAnswer === 'B'
                                                ? 'Benar! Kedua ujung Cl memiliki muatan parsial negatif sehingga mengalami tolakan elektrostatik.'
                                                : 'Belum tepat. Ingat bahwa muatan parsial sejenis akan saling menolak, sedangkan muatan parsial berlawanan saling menarik.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 04. FAKTOR KEKUATAN */}
                    {activeSection === 'factors' && (
                        <section className="m4-section">
                            <div className="m4-section-heading">
                                <span className="m4-kicker">
                                    04 · FAKTOR YANG MEMENGARUHI
                                </span>
                                <h2>Apa yang Memengaruhi Kekuatan Gaya Dipol-Dipol?</h2>
                                <p>
                                    Besarnya interaksi berkaitan dengan
                                    karakteristik dipol dan susunan molekul.
                                </p>
                            </div>

                            <div className="m4-factor-grid">
                                <article className="m4-factor-card">
                                    <span>🧲</span>
                                    <h3>Momen dipol</h3>
                                    <p>
                                        Molekul dengan momen dipol lebih besar
                                        dapat memiliki interaksi dipol-dipol
                                        yang lebih kuat jika dibandingkan
                                        dalam kondisi yang sebanding.
                                    </p>
                                </article>

                                <article className="m4-factor-card">
                                    <span>↔️</span>
                                    <h3>Jarak antarmolekul</h3>
                                    <p>
                                        Interaksi elektrostatik dipengaruhi
                                        oleh jarak antara bagian-bagian
                                        bermuatan parsial pada molekul.
                                    </p>
                                </article>

                                <article className="m4-factor-card">
                                    <span>🔄</span>
                                    <h3>Orientasi molekul</h3>
                                    <p>
                                        Susunan kutub yang berlawanan
                                        berdekatan menghasilkan tarikan
                                        yang lebih menguntungkan secara
                                        elektrostatik.
                                    </p>
                                </article>
                            </div>

                            <div className="m4-content-card">
                                <h3>Contoh: kepolaran molekul HCl</h3>
                                <p>
                                    HCl memiliki ikatan polar karena
                                    perbedaan keelektronegatifan antara
                                    hidrogen dan klorin. Molekul HCl
                                    memiliki momen dipol permanen sehingga
                                    dapat mengalami interaksi dipol-dipol.
                                </p>
                                <div className="m4-highlight-line">
                                    Perlu diingat bahwa gaya dipol-dipol
                                    bukan satu-satunya interaksi pada molekul
                                    HCl. Gaya dispersi London juga terdapat
                                    pada molekul tersebut.
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 05. SIFAT FISIK */}
                    {activeSection === 'properties' && (
                        <section className="m4-section">
                            <div className="m4-section-heading">
                                <span className="m4-kicker">
                                    05 · HUBUNGAN DENGAN SIFAT FISIK
                                </span>
                                <h2>Pengaruh Gaya Dipol-Dipol terhadap Sifat Zat</h2>
                                <p>
                                    Gaya tarik antarmolekul berperan
                                    dalam menentukan perilaku fisik zat.
                                </p>
                            </div>

                            <div className="m4-property-grid">
                                <article className="m4-property-card">
                                    <span>🌡️</span>
                                    <div>
                                        <h3>Titik didih</h3>
                                        <p>
                                            Jika faktor lain sebanding,
                                            interaksi antarmolekul yang
                                            lebih kuat umumnya membutuhkan
                                            energi lebih besar untuk
                                            memisahkan molekul ke fase gas.
                                            Akibatnya, titik didih cenderung
                                            lebih tinggi.
                                        </p>
                                    </div>
                                </article>

                                <article className="m4-property-card">
                                    <span>💨</span>
                                    <div>
                                        <h3>Volatilitas</h3>
                                        <p>
                                            Zat dengan gaya tarik antarmolekul
                                            yang lebih kuat cenderung lebih
                                            sulit menguap. Dengan demikian,
                                            volatilitasnya cenderung lebih
                                            rendah jika faktor lain sebanding.
                                        </p>
                                    </div>
                                </article>
                            </div>

                            <div className="m4-content-card">
                                <h3>Hubungkan dengan molekul HCl</h3>
                                <p>
                                    Molekul HCl memiliki dipol permanen
                                    sehingga antarmolekulnya mengalami
                                    interaksi dipol-dipol. Molekul HCl juga
                                    mengalami gaya dispersi London.
                                </p>
                                <div className="m4-highlight-line">
                                    Sifat fisik suatu zat ditentukan oleh
                                    keseluruhan interaksi antarmolekul,
                                    bukan hanya satu jenis gaya.
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 06. RANGKUMAN */}
                    {activeSection === 'summary' && (
                        <section className="m4-section">
                            <div className="m4-section-heading">
                                <span className="m4-kicker">06 · RANGKUMAN</span>
                                <h2>Apa yang Sudah Kamu Pelajari?</h2>
                                <p>Empat gagasan utama tentang gaya dipol-dipol.</p>
                            </div>

                            <div className="m4-summary-grid">
                                <article className="m4-summary-card">
                                    <span>01</span>
                                    <h3>Pengertian</h3>
                                    <p>
                                        Gaya tarik elektrostatik antara
                                        molekul-molekul polar yang
                                        memiliki dipol permanen.
                                    </p>
                                </article>

                                <article className="m4-summary-card">
                                    <span>02</span>
                                    <h3>Mekanisme</h3>
                                    <p>
                                        Kutub positif parsial suatu
                                        molekul tertarik pada kutub
                                        negatif parsial molekul lain.
                                    </p>
                                </article>

                                <article className="m4-summary-card">
                                    <span>03</span>
                                    <h3>Orientasi</h3>
                                    <p>
                                        Susunan kutub molekul memengaruhi
                                        kuat dan arah interaksi
                                        elektrostatik.
                                    </p>
                                </article>

                                <article className="m4-summary-card">
                                    <span>04</span>
                                    <h3>Sifat fisik</h3>
                                    <p>
                                        Interaksi antarmolekul berkontribusi
                                        terhadap titik didih dan volatilitas
                                        suatu zat.
                                    </p>
                                </article>
                            </div>
                        </section>
                    )}

                    {/* 07. REFERENSI */}
                    {activeSection === 'references' && (
                        <section className="m4-section">
                            <div className="m4-section-heading">
                                <span className="m4-kicker">07 · SUMBER BELAJAR</span>
                                <h2>Referensi</h2>
                                <p>
                                    Sumber yang digunakan dalam penyusunan
                                    materi Gaya Dipol-Dipol.
                                </p>
                            </div>

                            <div className="m4-reference-list">
                                <article className="m4-reference-card">
                                    <span>📘</span>
                                    <div>
                                        <strong>Referensi utama</strong>
                                        <p>
                                            Chang, R., &amp; Goldsby, K. A.
                                            (2010). <em>Chemistry</em>
                                            {' '}(10th ed.). McGraw-Hill.
                                            Bab 11.2.
                                        </p>
                                    </div>
                                </article>

                                <article className="m4-reference-card">
                                    <span>📗</span>
                                    <div>
                                        <strong>Referensi pendukung</strong>
                                        <p>
                                            Flowers, P., Theopold, K.,
                                            Langley, R., &amp; Robinson,
                                            W. R. (2019).
                                            <em> Chemistry 2e</em>. OpenStax.
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
                            </div>
                        </section>
                    )}

                </div>

                {/* NAVIGASI HALAMAN */}
                <div className="m4-page-navigation">
                    <button
                        className="m4-control secondary"
                        onClick={goPrevious}
                        disabled={activeIndex === 0}
                    >
                        ← Sebelumnya
                    </button>

                    <span>
                        {sections[activeIndex].number} / 07 ·{' '}
                        {sections[activeIndex].label}
                    </span>

                    {activeIndex < sections.length - 1 ? (
                        <button className="m4-control" onClick={goNext}>
                            Selanjutnya →
                        </button>
                    ) : (
                        <button
                            className="m4-control"
                            onClick={() => goToSection('overview')}
                        >
                            ✓ Selesai Membaca · Kembali ke Awal
                        </button>
                    )}
                </div>

                {/* LANJUT KE MODUL 5 */}
                {activeSection === 'references' && (
                    <div className="m4-next-module">
                        <div>
                            <strong>Siap mempelajari gaya antarmolekul berikutnya?</strong>
                            <p>
                                Lanjutkan perjalananmu dengan mempelajari
                                Ikatan Hidrogen.
                            </p>
                        </div>

                        <button
                            className="m4-control"
                            onClick={() => navigate('/module-5')}
                        >
                            Lanjut ke Modul 5: Ikatan Hidrogen →
                        </button>
                    </div>
                )}
                <div className="lesson-bottom-navigation">
                    <button onClick={() => navigate('/')}>
                        ← Kembali ke Beranda
                    </button>
                    <span>IMF Explorer · Pembelajaran Kimia</span>
                </div>

            </main>
        </div>
    );
};

export default Module4Page;
