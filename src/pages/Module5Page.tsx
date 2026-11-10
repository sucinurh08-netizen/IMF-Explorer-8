
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Module1Page.css';
import './Module5Page.css';

type SectionId =
    | 'overview'
    | 'mechanism'
    | 'requirements'
    | 'factors'
    | 'properties'
    | 'summary'
    | 'references';

const sections: { id: SectionId; number: string; label: string }[] = [
    { id: 'overview', number: '01', label: 'Pengertian' },
    { id: 'mechanism', number: '02', label: 'Mekanisme' },
    { id: 'requirements', number: '03', label: 'Syarat terbentuk' },
    { id: 'factors', number: '04', label: 'Faktor kekuatan' },
    { id: 'properties', number: '05', label: 'Sifat fisik' },
    { id: 'summary', number: '06', label: 'Rangkuman' },
    { id: 'references', number: '07', label: 'Referensi' },
];

const mechanismSteps = [
    {
        title: 'Atom hidrogen terikat pada atom elektronegatif',
        description:
            'Ikatan hidrogen dapat terbentuk ketika atom hidrogen terikat secara kovalen pada atom nitrogen (N), oksigen (O), atau fluorin (F). Ketiga atom tersebut memiliki keelektronegatifan tinggi.',
        detail:
            'Contohnya adalah ikatan O–H pada air, N–H pada amonia, dan H–F pada hidrogen fluorida.',
    },
    {
        title: 'Terbentuk muatan parsial',
        description:
            'Atom elektronegatif menarik pasangan elektron ikatan ke arahnya. Akibatnya, atom hidrogen memiliki kerapatan elektron lebih rendah dan bermuatan parsial positif (δ+).',
        detail:
            'Atom N, O, atau F yang terlibat memiliki bagian bermuatan parsial negatif (δ−).',
    },
    {
        title: 'Atom hidrogen berinteraksi dengan molekul lain',
        description:
            'Atom H yang bermuatan parsial positif tertarik pada pasangan elektron bebas atom elektronegatif N, O, atau F dari molekul yang berdekatan.',
        detail:
            'Interaksi ini melibatkan atom H dari satu molekul dan pasangan elektron bebas pada atom dari molekul lainnya.',
    },
    {
        title: 'Terbentuk ikatan hidrogen',
        description:
            'Tarikan antara atom H dengan pasangan elektron bebas atom elektronegatif menghasilkan interaksi yang disebut ikatan hidrogen.',
        detail:
            'Pada air, interaksi O–H···O memungkinkan molekul-molekul air membentuk jaringan ikatan hidrogen (Flowers et al., 2019).',
    },
];

const Module5Page: React.FC = () => {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] =
        useState<SectionId>('overview');

    const [mechanismStep, setMechanismStep] = useState(0);
    const [mechanismAnswer, setMechanismAnswer] =
        useState<string | null>(null);
    const [requirementsAnswer, setRequirementsAnswer] =
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
        setRequirementsAnswer(null);
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
        <div className="lesson-page m5-page">

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

            <main className="lesson-main m5-main">

                {/* HERO */}
                <section className="lesson-hero m5-hero">
                    <div className="lesson-hero-content">

                        <span className="lesson-eyebrow">
                            TAHAP 3 · EXPLAIN
                        </span>

                        <h1>Ikatan Hidrogen</h1>

                        <p className="lesson-hero-description">
                            Mengapa air memiliki titik didih yang relatif
                            tinggi? Pelajari interaksi antarmolekul yang
                            melibatkan atom hidrogen dan pasangan elektron
                            bebas pada atom elektronegatif.
                        </p>

                        <div className="lesson-meta">
                            <span>📖 Materi pembelajaran</span>
                            <span>💧 Interaksi antarmolekul</span>
                            <span>⏱ ±10 menit</span>
                        </div>
                    </div>

                    <div className="m5-hero-visual" aria-hidden="true">
                        <div className="m5-water-molecule">
                            <span>H</span>
                            <i />
                            <strong>O</strong>
                            <i />
                            <span>H</span>
                        </div>

                        <div className="m5-hydrogen-dots">······</div>

                        <div className="m5-water-molecule second">
                            <span>H</span>
                            <i />
                            <strong>O</strong>
                            <i />
                            <span>H</span>
                        </div>

                        <small>Ilustrasi interaksi antarmolekul air</small>
                    </div>
                </section>

                {/* GAGASAN UTAMA */}
                <div className="m5-intro-note">
                    <span className="m5-note-icon">💡</span>
                    <div>
                        <strong>Gagasan utama</strong>
                        <p>
                            Ikatan hidrogen merupakan interaksi dipol-dipol
                            yang relatif kuat. Interaksi ini terjadi antara
                            atom H yang terikat pada N, O, atau F dengan
                            pasangan elektron bebas pada atom elektronegatif
                            dari molekul lain (Chang &amp; Goldsby, 2010;
                            Flowers et al., 2019).
                        </p>
                    </div>
                </div>

                {/* NAVIGASI BAGIAN */}
                <nav className="m5-section-nav" aria-label="Navigasi materi Modul 5">
                    <div className="m5-nav-heading">
                        <span>JELAJAHI MATERI</span>
                        <small>Pilih bagian untuk membuka pembahasan</small>
                    </div>

                    <div className="m5-nav-items">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`m5-nav-item ${activeSection === section.id ? 'active' : ''
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
                <div className="m5-progress-line">
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
                <div className="m5-page-content" key={activeSection}>

                    {/* 01. PENGERTIAN */}
                    {activeSection === 'overview' && (
                        <section className="m5-section">
                            <div className="m5-section-heading">
                                <span className="m5-kicker">01 · KONSEP DASAR</span>
                                <h2>Mengenal Ikatan Hidrogen</h2>
                                <p>
                                    Salah satu interaksi antarmolekul yang
                                    berperan penting dalam menentukan sifat
                                    berbagai zat.
                                </p>
                            </div>

                            <div className="m5-content-card">
                                <h3>Apa yang dimaksud dengan ikatan hidrogen?</h3>

                                <p>
                                    Ikatan hidrogen merupakan jenis interaksi
                                    dipol-dipol yang relatif kuat. Interaksi ini
                                    terjadi ketika atom hidrogen yang terikat
                                    secara kovalen pada atom nitrogen (N),
                                    oksigen (O), atau fluorin (F) tertarik pada
                                    pasangan elektron bebas atom elektronegatif
                                    pada molekul lain (Chang &amp; Goldsby,
                                    2010; Flowers et al., 2019).
                                </p>

                                <p>
                                    Ikatan N–H, O–H, dan F–H memiliki distribusi
                                    elektron yang tidak merata. Atom hidrogen
                                    menjadi bermuatan parsial positif (δ+),
                                    sedangkan atom N, O, atau F memiliki bagian
                                    bermuatan parsial negatif (δ−). Tarikan
                                    antara atom H tersebut dengan pasangan
                                    elektron bebas pada molekul lain menghasilkan
                                    ikatan hidrogen (Flowers et al., 2019).
                                </p>

                                <div className="m5-example-grid">
                                    <article className="m5-example-card">
                                        <span>💧</span>
                                        <h3>Air (H₂O)</h3>
                                        <p>
                                            Atom H yang terikat pada O dapat
                                            berinteraksi dengan pasangan
                                            elektron bebas atom O dari
                                            molekul air lainnya.
                                        </p>
                                    </article>

                                    <article className="m5-example-card">
                                        <span>🧪</span>
                                        <h3>Amonia (NH₃)</h3>
                                        <p>
                                            Atom H pada ikatan N–H dapat
                                            berinteraksi dengan pasangan
                                            elektron bebas atom N dari
                                            molekul amonia lainnya.
                                        </p>
                                    </article>

                                    <article className="m5-example-card">
                                        <span>⚗️</span>
                                        <h3>Hidrogen fluorida (HF)</h3>
                                        <p>
                                            Atom H pada ikatan H–F dapat
                                            berinteraksi dengan atom F
                                            dari molekul HF lainnya.
                                        </p>
                                    </article>
                                </div>

                                <div className="m5-highlight-line">
                                    <strong>Ingat:</strong> Ikatan hidrogen
                                    merupakan interaksi antarmolekul, bukan
                                    ikatan kovalen yang menghubungkan atom H
                                    dengan N, O, atau F di dalam satu molekul.
                                    Ikatan hidrogen lebih lemah daripada ikatan
                                    kovalen, tetapi umumnya lebih kuat daripada
                                    gaya dipol-dipol biasa dan gaya dispersi
                                    London (Flowers et al., 2019).
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 02. MEKANISME */}
                    {activeSection === 'mechanism' && (
                        <section className="m5-section">
                            <div className="m5-section-heading">
                                <span className="m5-kicker">
                                    02 · MEKANISME PEMBENTUKAN
                                </span>
                                <h2>Bagaimana Ikatan Hidrogen Terbentuk?</h2>
                                <p>
                                    Amati tahapan interaksi antara dua
                                    molekul air.
                                </p>
                            </div>

                            <div className="m5-content-card">
                                <div className="m5-step-indicators">
                                    {mechanismSteps.map((step, index) => (
                                        <button
                                            key={step.title}
                                            className={`m5-step-dot ${mechanismStep === index ? 'active' : ''
                                                } ${mechanismStep > index ? 'completed' : ''
                                                }`}
                                            onClick={() => setMechanismStep(index)}
                                            aria-label={`Tampilkan tahap ${index + 1}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <div className={`m5-mechanism-visual step-${mechanismStep + 1}`}>
                                    <div className="m5-molecule">
                                        <span className="m5-hydrogen">H δ+</span>
                                        <i />
                                        <strong className="m5-oxygen">O δ−</strong>
                                        <i />
                                        <span className="m5-hydrogen">H δ+</span>
                                    </div>

                                    {mechanismStep >= 2 && (
                                        <>
                                            <span className="m5-interaction-dots">
                                                ·········
                                            </span>

                                            <div className="m5-molecule second">
                                                <span className="m5-hydrogen">H δ+</span>
                                                <i />
                                                <strong className="m5-oxygen">O δ−</strong>
                                                <i />
                                                <span className="m5-hydrogen">H δ+</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="m5-step-explanation" aria-live="polite">
                                    <span className="m5-kicker">
                                        TAHAP {mechanismStep + 1} DARI 4
                                    </span>

                                    <h3>{mechanismSteps[mechanismStep].title}</h3>
                                    <p>{mechanismSteps[mechanismStep].description}</p>

                                    <div className="m5-highlight-line">
                                        {mechanismSteps[mechanismStep].detail}
                                    </div>

                                    <p className="m5-citation-inline">
                                        Sumber konsep: Chang &amp; Goldsby
                                        (2010); Flowers et al. (2019).
                                    </p>
                                </div>

                                <div className="m5-step-controls">
                                    <button
                                        className="m5-control secondary"
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
                                        className="m5-control"
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

                                <p className="m5-visual-caption">
                                    Ilustrasi konseptual interaksi antara
                                    molekul air. Garis titik-titik menunjukkan
                                    ikatan hidrogen antarmolekul.
                                </p>

                                {/* CEK PEMAHAMAN 1 */}
                                <div className="m5-check-card">
                                    <span className="m5-check-label">
                                        CEK PEMAHAMAN
                                    </span>

                                    <h3>
                                        Mengapa atom hidrogen pada molekul air
                                        dapat terlibat dalam pembentukan
                                        ikatan hidrogen?
                                    </h3>

                                    <div className="m5-answer-list">
                                        <button
                                            className={`m5-answer ${mechanismAnswer === 'A'
                                                    ? 'selected incorrect'
                                                    : ''
                                                }`}
                                            onClick={() => setMechanismAnswer('A')}
                                        >
                                            <span>A</span>
                                            Karena atom hidrogen memiliki
                                            pasangan elektron bebas yang dapat
                                            menarik atom oksigen molekul lain.
                                        </button>

                                        <button
                                            className={`m5-answer ${mechanismAnswer === 'B'
                                                    ? 'selected correct'
                                                    : ''
                                                }`}
                                            onClick={() => setMechanismAnswer('B')}
                                        >
                                            <span>B</span>
                                            Karena atom hidrogen terikat pada
                                            oksigen yang sangat elektronegatif
                                            sehingga memiliki muatan parsial
                                            positif.
                                        </button>

                                        <button
                                            className={`m5-answer ${mechanismAnswer === 'C'
                                                    ? 'selected incorrect'
                                                    : ''
                                                }`}
                                            onClick={() => setMechanismAnswer('C')}
                                        >
                                            <span>C</span>
                                            Karena atom hidrogen melepaskan
                                            elektron dan berubah menjadi ion
                                            hidrogen bebas.
                                        </button>
                                    </div>

                                    {mechanismAnswer && (
                                        <div className={`m5-feedback ${mechanismAnswer === 'B'
                                                ? 'correct'
                                                : 'incorrect'
                                            }`}>
                                            <strong>
                                                {mechanismAnswer === 'B'
                                                    ? 'Tepat sekali!'
                                                    : 'Belum tepat, coba pahami kembali.'}
                                            </strong>
                                            <p>
                                                Atom oksigen menarik pasangan
                                                elektron ikatan sehingga atom
                                                hidrogen memiliki muatan parsial
                                                positif (δ+). Atom H tersebut
                                                kemudian dapat tertarik pada
                                                pasangan elektron bebas atom
                                                elektronegatif dari molekul lain.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 03. SYARAT TERBENTUK */}
                    {activeSection === 'requirements' && (
                        <section className="m5-section">
                            <div className="m5-section-heading">
                                <span className="m5-kicker">
                                    03 · SYARAT PEMBENTUKAN
                                </span>
                                <h2>Kapan Ikatan Hidrogen Dapat Terbentuk?</h2>
                                <p>
                                    Kenali atom-atom yang berperan dalam
                                    pembentukan interaksi ini.
                                </p>
                            </div>

                            <div className="m5-content-card">
                                <h3>Dua bagian penting dalam ikatan hidrogen</h3>

                                <div className="m5-requirement-grid">
                                    <article className="m5-requirement-card">
                                        <span className="m5-requirement-number">01</span>
                                        <h3>Donor hidrogen</h3>
                                        <p>
                                            Atom hidrogen harus terikat langsung
                                            pada atom nitrogen (N), oksigen (O),
                                            atau fluorin (F). Ikatan tersebut
                                            menghasilkan atom H yang memiliki
                                            muatan parsial positif.
                                        </p>
                                    </article>

                                    <article className="m5-requirement-card">
                                        <span className="m5-requirement-number">02</span>
                                        <h3>Penerima pasangan elektron</h3>
                                        <p>
                                            Harus terdapat atom elektronegatif
                                            yang memiliki pasangan elektron bebas
                                            untuk berinteraksi dengan atom
                                            hidrogen dari molekul lain.
                                        </p>
                                    </article>
                                </div>

                                <h3 className="m5-subheading">
                                    Contoh molekul yang dapat membentuk
                                    ikatan hidrogen
                                </h3>

                                <div className="m5-molecule-examples">
                                    <div className="m5-molecule-example">
                                        <strong>H₂O</strong>
                                        <span>Air</span>
                                        <small>Memiliki ikatan O–H</small>
                                    </div>

                                    <div className="m5-molecule-example">
                                        <strong>NH₃</strong>
                                        <span>Amonia</span>
                                        <small>Memiliki ikatan N–H</small>
                                    </div>

                                    <div className="m5-molecule-example">
                                        <strong>HF</strong>
                                        <span>Hidrogen fluorida</span>
                                        <small>Memiliki ikatan H–F</small>
                                    </div>
                                </div>

                                <div className="m5-highlight-line">
                                    <strong>Perhatikan:</strong> Tidak semua
                                    molekul yang mengandung atom H dapat
                                    membentuk ikatan hidrogen. Atom H harus
                                    terikat langsung pada N, O, atau F.
                                    (Flowers et al., 2019).
                                </div>

                                {/* CEK PEMAHAMAN 2 */}
                                <div className="m5-check-card">
                                    <span className="m5-check-label">
                                        CEK PEMAHAMAN
                                    </span>

                                    <h3>
                                        Di antara molekul berikut, manakah yang
                                        dapat membentuk ikatan hidrogen
                                        antarmolekul dengan sesama molekulnya?
                                    </h3>

                                    <div className="m5-answer-list">
                                        <button
                                            className={`m5-answer ${requirementsAnswer === 'A'
                                                    ? 'selected incorrect'
                                                    : ''
                                                }`}
                                            onClick={() => setRequirementsAnswer('A')}
                                        >
                                            <span>A</span>
                                            CH₄, karena atom hidrogen terikat
                                            pada atom karbon dan molekulnya
                                            memiliki ikatan kovalen.
                                        </button>

                                        <button
                                            className={`m5-answer ${requirementsAnswer === 'B'
                                                    ? 'selected correct'
                                                    : ''
                                                }`}
                                            onClick={() => setRequirementsAnswer('B')}
                                        >
                                            <span>B</span>
                                            NH₃, karena atom hidrogen terikat
                                            langsung pada atom nitrogen dan
                                            atom nitrogen memiliki pasangan
                                            elektron bebas.
                                        </button>

                                        <button
                                            className={`m5-answer ${requirementsAnswer === 'C'
                                                    ? 'selected incorrect'
                                                    : ''
                                                }`}
                                            onClick={() => setRequirementsAnswer('C')}
                                        >
                                            <span>C</span>
                                            HCl, karena atom hidrogen terikat
                                            pada atom klorin yang bersifat
                                            elektronegatif.
                                        </button>
                                    </div>

                                    {requirementsAnswer && (
                                        <div className={`m5-feedback ${requirementsAnswer === 'B'
                                                ? 'correct'
                                                : 'incorrect'
                                            }`}>
                                            <strong>
                                                {requirementsAnswer === 'B'
                                                    ? 'Benar!'
                                                    : 'Belum tepat, perhatikan syaratnya.'}
                                            </strong>
                                            <p>
                                                NH₃ memiliki ikatan N–H dan
                                                pasangan elektron bebas pada
                                                atom N. Kedua karakteristik
                                                tersebut memungkinkan molekul
                                                amonia membentuk ikatan hidrogen.
                                                CH₄ tidak memenuhi syarat donor
                                                hidrogen, sedangkan HCl bukan
                                                contoh umum pembentukan ikatan
                                                hidrogen dalam pembahasan dasar.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 04. FAKTOR KEKUATAN */}
                    {activeSection === 'factors' && (
                        <section className="m5-section">
                            <div className="m5-section-heading">
                                <span className="m5-kicker">
                                    04 · FAKTOR YANG MEMENGARUHI
                                </span>
                                <h2>Apa yang Memengaruhi Kekuatan Ikatan Hidrogen?</h2>
                                <p>
                                    Kekuatan interaksi dipengaruhi oleh
                                    karakteristik molekul dan susunannya.
                                </p>
                            </div>

                            <div className="m5-factor-grid">
                                <article className="m5-factor-card">
                                    <span>⚡</span>
                                    <h3>Distribusi muatan</h3>
                                    <p>
                                        Besarnya muatan parsial pada atom H dan
                                        atom penerima memengaruhi kekuatan
                                        interaksi. Distribusi elektron berkaitan
                                        dengan sifat atom donor dan penerima
                                        ikatan hidrogen.
                                    </p>
                                </article>

                                <article className="m5-factor-card">
                                    <span>📐</span>
                                    <h3>Jarak dan orientasi</h3>
                                    <p>
                                        Ikatan hidrogen memiliki sifat terarah.
                                        Jarak yang sesuai dan orientasi interaksi
                                        yang mendukung dapat menghasilkan
                                        tarikan yang lebih efektif antara atom H
                                        dan atom penerima.
                                    </p>
                                </article>

                                <article className="m5-factor-card">
                                    <span>🔗</span>
                                    <h3>Karakteristik donor dan penerima</h3>
                                    <p>
                                        Sifat atom yang mengikat H dan atom yang
                                        menyediakan pasangan elektron bebas
                                        memengaruhi kekuatan ikatan hidrogen.
                                        Ukuran atom dan karakteristik elektronnya
                                        turut berperan.
                                    </p>
                                </article>
                            </div>

                            <div className="m5-content-card">
                                <h3>Contoh: jaringan ikatan hidrogen pada air</h3>

                                <p>
                                    Molekul air memiliki dua atom H yang terikat
                                    pada satu atom O. Atom O juga memiliki dua
                                    pasangan elektron bebas. Susunan ini
                                    memungkinkan molekul air membentuk beberapa
                                    interaksi ikatan hidrogen dengan molekul air
                                    di sekitarnya.
                                </p>

                                <p>
                                    Interaksi tersebut membentuk jaringan yang
                                    berkontribusi terhadap sifat fisik air
                                    (Flowers et al., 2019).
                                </p>

                                <div className="m5-highlight-line">
                                    Kekuatan ikatan hidrogen dipengaruhi oleh
                                    karakteristik donor dan penerima serta
                                    geometri interaksi, bukan hanya satu faktor.
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 05. SIFAT FISIK */}
                    {activeSection === 'properties' && (
                        <section className="m5-section">
                            <div className="m5-section-heading">
                                <span className="m5-kicker">
                                    05 · HUBUNGAN DENGAN SIFAT FISIK
                                </span>
                                <h2>Pengaruh Ikatan Hidrogen terhadap Sifat Zat</h2>
                                <p>
                                    Ikatan hidrogen dapat menyebabkan
                                    karakteristik fisik suatu zat berbeda
                                    dari zat lain dengan massa molekul
                                    yang sebanding.
                                </p>
                            </div>

                            <div className="m5-property-grid">
                                <article className="m5-property-card">
                                    <span>🌡️</span>
                                    <div>
                                        <h3>Titik didih relatif tinggi</h3>
                                        <p>
                                            Molekul air membentuk ikatan hidrogen
                                            antarmolekul. Ketika air menguap,
                                            diperlukan energi untuk mengatasi
                                            interaksi tersebut. Hal ini
                                            berkontribusi terhadap titik didih
                                            air yang relatif tinggi dibandingkan
                                            senyawa sejenis dengan massa molekul
                                            yang sebanding (Flowers et al., 2019).
                                        </p>
                                    </div>
                                </article>

                                <article className="m5-property-card">
                                    <span>💧</span>
                                    <div>
                                        <h3>Tegangan permukaan</h3>
                                        <p>
                                            Ikatan hidrogen berkontribusi
                                            terhadap gaya kohesi antarmolekul
                                            air. Kohesi yang kuat menyebabkan
                                            air memiliki tegangan permukaan
                                            relatif tinggi (Flowers et al., 2019).
                                        </p>
                                    </div>
                                </article>

                                <article className="m5-property-card">
                                    <span>❄️</span>
                                    <div>
                                        <h3>Massa jenis es lebih rendah</h3>
                                        <p>
                                            Ketika air membeku, molekul-molekulnya
                                            membentuk susunan jaringan ikatan
                                            hidrogen yang relatif terbuka.
                                            Akibatnya, es memiliki massa jenis
                                            lebih rendah daripada air cair
                                            (Chang &amp; Goldsby, 2010).
                                        </p>
                                    </div>
                                </article>
                            </div>

                            <div className="m5-content-card">
                                <h3>Mengapa es dapat mengapung di air?</h3>

                                <p>
                                    Pada keadaan padat, molekul air tersusun
                                    dalam struktur kristal yang relatif terbuka
                                    akibat jaringan ikatan hidrogen. Struktur
                                    tersebut membuat volume es lebih besar
                                    dibandingkan air cair untuk massa yang sama.
                                </p>

                                <p>
                                    Oleh karena itu, massa jenis es lebih rendah
                                    daripada massa jenis air cair sehingga es
                                    dapat mengapung di permukaan air
                                    (Chang &amp; Goldsby, 2010).
                                </p>

                                <div className="m5-highlight-line">
                                    <strong>Kesimpulan:</strong> Ikatan hidrogen
                                    berkontribusi terhadap titik didih,
                                    tegangan permukaan, dan karakteristik
                                    struktur es.
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 06. RANGKUMAN */}
                    {activeSection === 'summary' && (
                        <section className="m5-section">
                            <div className="m5-section-heading">
                                <span className="m5-kicker">06 · RANGKUMAN</span>
                                <h2>Apa yang Sudah Kamu Pelajari?</h2>
                                <p>
                                    Empat gagasan utama tentang ikatan hidrogen.
                                </p>
                            </div>

                            <div className="m5-summary-grid">
                                <article className="m5-summary-card">
                                    <span>01</span>
                                    <h3>Pengertian</h3>
                                    <p>
                                        Interaksi antara atom H yang terikat
                                        pada N, O, atau F dengan pasangan
                                        elektron bebas atom elektronegatif
                                        pada molekul lain.
                                    </p>
                                </article>

                                <article className="m5-summary-card">
                                    <span>02</span>
                                    <h3>Mekanisme</h3>
                                    <p>
                                        Muatan parsial positif pada atom H
                                        tertarik pada pasangan elektron bebas
                                        dari molekul yang berdekatan.
                                    </p>
                                </article>

                                <article className="m5-summary-card">
                                    <span>03</span>
                                    <h3>Syarat pembentukan</h3>
                                    <p>
                                        Memerlukan atom H yang terikat langsung
                                        pada N, O, atau F serta pasangan
                                        elektron bebas sebagai penerima interaksi.
                                    </p>
                                </article>

                                <article className="m5-summary-card">
                                    <span>04</span>
                                    <h3>Sifat fisik</h3>
                                    <p>
                                        Berkontribusi terhadap titik didih,
                                        tegangan permukaan, dan struktur es.
                                    </p>
                                </article>
                            </div>
                        </section>
                    )}

                    {/* 07. REFERENSI */}
                    {activeSection === 'references' && (
                        <section className="m5-section">
                            <div className="m5-section-heading">
                                <span className="m5-kicker">07 · SUMBER BELAJAR</span>
                                <h2>Referensi</h2>
                                <p>
                                    Sumber yang digunakan dalam penyusunan
                                    materi Ikatan Hidrogen.
                                </p>
                            </div>

                            <div className="m5-reference-list">
                                <article className="m5-reference-card">
                                    <span>📘</span>
                                    <div>
                                        <strong>Referensi utama</strong>
                                        <p>
                                            Chang, R., &amp; Goldsby, K. A.
                                            (2010). <em>Chemistry</em> (10th ed.).
                                            McGraw-Hill. Bab 11, khususnya
                                            Section 11.2: Intermolecular Forces.
                                        </p>
                                    </div>
                                </article>

                                <article className="m5-reference-card">
                                    <span>📗</span>
                                    <div>
                                        <strong>Referensi pendukung</strong>
                                        <p>
                                            Flowers, P., Theopold, K., Langley,
                                            R., &amp; Robinson, W. R. (2019).
                                            <em> Chemistry 2e</em>. OpenStax.
                                            Section 10.1: Intermolecular Forces.
                                            {' '}
                                            <a
                                                href="https://openstax.org/books/chemistry-2e/pages/10-1-intermolecular-forces"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Buka buku
                                            </a>.
                                        </p>
                                    </div>
                                </article>
                            </div>

                            {/* LANJUT KE MODUL 6 */}
                            <div className="m5-next-module">
                                <div>
                                    <strong>Siap melanjutkan pembelajaran?</strong>
                                    <p>
                                        Lanjutkan ke materi perbandingan dan
                                        penerapan gaya antarmolekul.
                                    </p>
                                </div>

                                <button
                                    className="m5-control"
                                    onClick={() => navigate('/module-6')}
                                >
                                    Lanjut ke Modul 6 →
                                </button>
                            </div>
                        </section>
                    )}

                </div>

                {/* NAVIGASI HALAMAN */}
                <div className="m5-page-navigation">
                    <button
                        className="m5-control secondary"
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
                        <button className="m5-control" onClick={goNext}>
                            Selanjutnya →
                        </button>
                    ) : (
                        <button
                            className="m5-control"
                            onClick={() => goToSection('overview')}
                        >
                            ✓ Selesai Membaca · Kembali ke Awal
                        </button>
                    )}
                </div>

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

export default Module5Page;
