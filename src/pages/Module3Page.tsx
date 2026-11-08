
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Module1Page.css';

const Module3Page: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBack = () => {
        navigate('/module-2');
    };

    return (
        <div className="lesson-page">
            {/* Header */}
            <header className="lesson-header">
                <div className="lesson-header-inner">
                    <button className="lesson-brand" onClick={handleBack}>
                        <span className="lesson-brand-icon">⚗</span>
                        <span>
                            <strong>IMF Explorer</strong>
                            <small>Jelajah Gaya Antarmolekul</small>
                        </span>
                    </button>

                    <button className="lesson-back-button" onClick={handleBack}>
                        ← Kembali ke Modul 2
                    </button>
                </div>
            </header>

            <main className="lesson-main">
                {/* Hero */}
                <section className="lesson-hero">
                    <div className="lesson-hero-content">
                        <span className="lesson-eyebrow">
                            TAHAP 3 · EXPLAIN
                        </span>

                        <h1>Gaya London (Gaya Dispersi)</h1>

                        <p className="lesson-hero-description">
                            Bagaimana atom dan molekul nonpolar dapat saling
                            tarik-menarik? Temukan jawabannya melalui
                            pembentukan dipol sesaat dan dipol terinduksi.
                        </p>

                        <div className="lesson-meta">
                            <span>📖 Materi Pembelajaran</span>
                            <span>⚛️ Konsep Submikroskopik</span>
                            <span>⏱ 10 menit</span>
                        </div>
                    </div>

                    <div className="lesson-hero-decoration">
                        <span className="lesson-molecule">He</span>
                        <span className="lesson-molecule-small">δ+ δ−</span>
                        <span className="lesson-decoration-caption">
                            Dipol sesaat dan terinduksi
                        </span>
                    </div>
                </section>

                {/* Konsep Utama */}
                <section className="lesson-concept">
                    <div className="lesson-concept-icon">💡</div>
                    <div>
                        <span className="lesson-section-label">
                            KONSEP UTAMA
                        </span>
                        <p>
                            Gaya dispersi London merupakan gaya tarik-menarik
                            yang timbul akibat dipol sesaat yang menginduksi
                            dipol pada atom atau molekul di sekitarnya.
                            Gaya ini terjadi pada semua atom dan molekul,
                            baik polar maupun nonpolar.
                        </p>
                    </div>
                </section>

                {/* Materi */}
                <section className="lesson-content">
                    <div className="lesson-content-heading">
                        <span className="lesson-section-label">
                            MATERI PEMBELAJARAN
                        </span>
                        <h2>Memahami Gaya Dispersi London</h2>
                        <p>
                            Pelajari proses terbentuknya gaya London dan
                            faktor-faktor yang memengaruhi kekuatannya.
                        </p>
                    </div>

                    <div className="lesson-section-list">
                        <article className="lesson-section-card">
                            <div className="lesson-section-number">01</div>
                            <div className="lesson-section-body">
                                <div className="lesson-section-topline">
                                    KONSEP DASAR
                                </div>
                                <h3>Mengapa Molekul Nonpolar Dapat Saling Menarik?</h3>
                                <div className="lesson-text">
                                    <p className="lesson-paragraph">
                                        Molekul nonpolar tidak mempunyai momen
                                        dipol permanen. Namun, elektron selalu
                                        bergerak sehingga distribusi elektron
                                        pada suatu saat dapat menjadi tidak merata.
                                    </p>
                                    <p className="lesson-paragraph">
                                        Ketidakmerataan tersebut menghasilkan
                                        dipol sesaat. Dipol ini dapat memengaruhi
                                        distribusi elektron partikel lain di
                                        dekatnya sehingga terbentuk gaya tarik
                                        antarp­artikel yang disebut gaya dispersi
                                        London.
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="lesson-section-card">
                            <div className="lesson-section-number">02</div>
                            <div className="lesson-section-body">
                                <div className="lesson-section-topline">
                                    MEKANISME PEMBENTUKAN
                                </div>
                                <h3>Dipol Sesaat (Instantaneous Dipole)</h3>
                                <div className="lesson-text">
                                    <p className="lesson-paragraph">
                                        Elektron dalam atom atau molekul
                                        bergerak secara terus-menerus.
                                        Pada suatu saat, elektron dapat
                                        terkumpul lebih banyak di salah satu
                                        sisi sehingga distribusi muatannya
                                        menjadi tidak simetris.
                                    </p>
                                    <p className="lesson-paragraph">
                                        Sisi yang memiliki kerapatan elektron
                                        lebih besar menjadi bermuatan parsial
                                        negatif (δ−), sedangkan sisi lainnya
                                        menjadi bermuatan parsial positif (δ+).
                                    </p>
                                    <p className="lesson-paragraph">
                                        Dipol ini disebut dipol sesaat karena
                                        hanya berlangsung dalam waktu yang
                                        sangat singkat. Pergerakan elektron
                                        berikutnya dapat menghasilkan susunan
                                        dipol yang berbeda.
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="lesson-section-card">
                            <div className="lesson-section-number">03</div>
                            <div className="lesson-section-body">
                                <div className="lesson-section-topline">
                                    MEKANISME PEMBENTUKAN
                                </div>
                                <h3>Dipol Terinduksi (Induced Dipole)</h3>
                                <div className="lesson-text">
                                    <p className="lesson-paragraph">
                                        Ketika dipol sesaat terbentuk pada
                                        suatu atom atau molekul, distribusi
                                        elektron partikel tetangganya dapat
                                        mengalami perubahan akibat pengaruh
                                        gaya elektrostatik.
                                    </p>
                                    <p className="lesson-paragraph">
                                        Perubahan distribusi elektron tersebut
                                        menghasilkan dipol terinduksi.
                                        Kutub-kutub yang berlawanan saling
                                        berdekatan dan menghasilkan gaya tarik.
                                    </p>
                                    <p className="lesson-paragraph">
                                        Dipol sesaat dan dipol terinduksi
                                        berubah secara terus-menerus. Interaksi
                                        sementara inilah yang menghasilkan
                                        gaya dispersi London.
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="lesson-section-card">
                            <div className="lesson-section-number">04</div>
                            <div className="lesson-section-body">
                                <div className="lesson-section-topline">
                                    FAKTOR YANG MEMENGARUHI
                                </div>
                                <h3>Polarisabilitas (Polarizability)</h3>
                                <div className="lesson-text">
                                    <p className="lesson-paragraph">
                                        Polarisabilitas adalah kemudahan
                                        distribusi elektron dalam atom atau
                                        molekul untuk mengalami perubahan
                                        akibat pengaruh gaya dari partikel lain.
                                    </p>
                                    <p className="lesson-paragraph">
                                        Semakin mudah awan elektron terdistorsi,
                                        semakin besar polarisabilitasnya.
                                        Awan elektron yang lebih menyebar
                                        dan tidak terlalu kuat ditahan oleh
                                        inti atom cenderung lebih mudah
                                        mengalami distorsi.
                                    </p>
                                    <p className="lesson-paragraph">
                                        Dengan demikian, polarisabilitas
                                        yang lebih besar menghasilkan
                                        interaksi dispersi yang lebih kuat.
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="lesson-section-card">
                            <div className="lesson-section-number">05</div>
                            <div className="lesson-section-body">
                                <div className="lesson-section-topline">
                                    KEKUATAN GAYA LONDON
                                </div>
                                <h3>Pengaruh Jumlah Elektron dan Massa Molar</h3>
                                <div className="lesson-text">
                                    <p className="lesson-paragraph">
                                        Gaya dispersi London umumnya meningkat
                                        seiring bertambahnya massa molar.
                                        Molekul dengan massa molar lebih besar
                                        cenderung memiliki lebih banyak elektron
                                        sehingga awan elektronnya lebih mudah
                                        mengalami distorsi.
                                    </p>
                                    <p className="lesson-paragraph">
                                        Karena itu, semakin besar jumlah elektron
                                        dan polarisabilitas suatu partikel,
                                        umumnya semakin kuat gaya dispersinya.
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="lesson-section-card">
                            <div className="lesson-section-number">06</div>
                            <div className="lesson-section-body">
                                <div className="lesson-section-topline">
                                    CONTOH DAN PERBANDINGAN
                                </div>
                                <h3>Perbandingan Senyawa Nonpolar</h3>
                                <div className="lesson-text">
                                    <p className="lesson-paragraph">
                                        Raymond Chang memberikan contoh
                                        perbandingan titik leleh beberapa
                                        senyawa nonpolar berikut.
                                        Peningkatan jumlah elektron diikuti
                                        oleh peningkatan kekuatan gaya dispersi.
                                    </p>

                                    <table>
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

                                    <p className="lesson-paragraph">
                                        Data tersebut menunjukkan bahwa
                                        semakin banyak elektron, umumnya
                                        semakin kuat gaya dispersi yang
                                        bekerja di antara molekul-molekulnya.
                                        Akibatnya, diperlukan energi lebih
                                        besar untuk memisahkan molekul,
                                        sehingga titik lelehnya meningkat.
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="lesson-section-card">
                            <div className="lesson-section-number">07</div>
                            <div className="lesson-section-body">
                                <div className="lesson-section-topline">
                                    PENERAPAN KONSEP
                                </div>
                                <h3>Gaya London pada Semua Partikel</h3>
                                <div className="lesson-text">
                                    <p className="lesson-paragraph">
                                        Gaya dispersi tidak hanya terjadi
                                        pada molekul nonpolar. Gaya ini juga
                                        terdapat pada molekul polar dan bahkan
                                        spesies bermuatan.
                                    </p>
                                    <p className="lesson-paragraph">
                                        Sebagai contoh, CCl₄ merupakan molekul
                                        nonpolar, tetapi mempunyai titik didih
                                        lebih tinggi daripada CH₃F yang
                                        merupakan molekul polar. Hal ini
                                        menunjukkan bahwa gaya dispersi pada
                                        CCl₄ dapat lebih kuat daripada
                                        gabungan gaya dispersi dan
                                        dipol-dipol pada CH₃F.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                {/* Ringkasan */}
                <section className="lesson-concept">
                    <div className="lesson-concept-icon">📌</div>
                    <div>
                        <span className="lesson-section-label">
                            RANGKUMAN
                        </span>
                        <p>
                            Gaya London terbentuk melalui dipol sesaat
                            yang menginduksi dipol pada partikel tetangga.
                            Kekuatannya dipengaruhi oleh polarisabilitas
                            dan jumlah elektron. Gaya ini terdapat pada
                            semua atom dan molekul, baik polar maupun nonpolar.
                        </p>
                    </div>
                </section>

                {/* Referensi */}
                <section className="lesson-content">
                    <div className="lesson-citation">
                        <span>📚</span>
                        <span>
                            <strong>Sumber referensi</strong>
                            Chang, R., & Goldsby, K. (2010).
                            <em> Chemistry </em> (10th ed.).
                            McGraw-Hill Education. Bab 11.2,
                            halaman 464–466.
                        </span>
                    </div>
                </section>

                {/* Navigasi bawah */}
                <div className="lesson-bottom-navigation">
                    <button onClick={handleBack}>
                        ← Kembali ke Modul 2
                    </button>
                    <span>IMF Explorer · Pembelajaran Kimia</span>
                </div>
            </main>
        </div>
    );
};

export default Module3Page;
