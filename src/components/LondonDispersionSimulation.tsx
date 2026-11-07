
import { useEffect, useState } from 'react';

type Stage = 0 | 1 | 2;

export default function LondonDispersionSimulation() {
    const [stage, setStage] = useState<Stage>(0);
    const [isRunning, setIsRunning] = useState(false);
    const [phase, setPhase] = useState(0);

    // Animasi elektron bergerak secara kontinu
    useEffect(() => {
        if (!isRunning) return;

        const timer = window.setInterval(() => {
            setPhase((previous) => previous + 0.12);
        }, 50);

        return () => window.clearInterval(timer);
    }, [isRunning]);

    const startAutomatic = () => {
        if (stage === 0) {
            setStage(1);
        }
        setIsRunning(true);
    };

    const nextStage = () => {
        setStage((previous) =>
            previous < 2 ? ((previous + 1) as Stage) : 2
        );
        setIsRunning(true);
    };

    const resetSimulation = () => {
        setStage(0);
        setPhase(0);
        setIsRunning(false);
    };

    // Menggambar satu atom helium
    const renderAtom = (
        centerX: number,
        centerY: number,
        label: string,
        shift: number,
        atomStage: Stage,
        electronPhase: number
    ) => {
        const asymmetric = atomStage > 0;
        const cloudShift = asymmetric ? shift : 0;

        const electron1X =
            centerX - 12 +
            Math.sin(electronPhase) * 10 +
            cloudShift * 0.7;

        const electron1Y =
            centerY - 10 + Math.cos(electronPhase * 1.3) * 9;

        const electron2X =
            centerX + 12 +
            Math.cos(electronPhase * 0.8) * 10 +
            cloudShift * 0.7;

        const electron2Y =
            centerY + 10 + Math.sin(electronPhase * 1.1) * 9;

        return (
            <g>
                <text
                    x={centerX}
                    y={centerY - 105}
                    textAnchor="middle"
                    fontSize="17"
                    fontWeight="bold"
                    fill="#26364a"
                >
                    {label}
                </text>

                {/* Awan elektron */}
                <ellipse
                    cx={centerX + cloudShift}
                    cy={centerY}
                    rx="67"
                    ry="57"
                    fill="#93c5fd"
                    opacity="0.22"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                />

                <ellipse
                    cx={centerX + cloudShift}
                    cy={centerY}
                    rx="47"
                    ry="39"
                    fill="#60a5fa"
                    opacity="0.12"
                />

                {/* Inti atom */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r="13"
                    fill="#facc15"
                    stroke="#a16207"
                    strokeWidth="1.5"
                />

                <text
                    x={centerX}
                    y={centerY + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#713f12"
                >
                    +
                </text>

                {/* Elektron */}
                <circle
                    cx={electron1X}
                    cy={electron1Y}
                    r="6"
                    fill="#2563eb"
                    stroke="#1e40af"
                />

                <circle
                    cx={electron2X}
                    cy={electron2Y}
                    r="6"
                    fill="#2563eb"
                    stroke="#1e40af"
                />

                {/* Muatan parsial */}
                {asymmetric && (
                    <>
                        <text
                            x={centerX - 58 + cloudShift * 0.2}
                            y={centerY - 68}
                            fontSize="15"
                            fontWeight="bold"
                            fill="#dc2626"
                        >
                            δ+
                        </text>

                        <text
                            x={centerX + 38 + cloudShift * 0.2}
                            y={centerY - 68}
                            fontSize="15"
                            fontWeight="bold"
                            fill="#2563eb"
                        >
                            δ−
                        </text>
                    </>
                )}
            </g>
        );
    };

    const firstShift =
        stage > 0
            ? 17 + Math.sin(phase) * 5
            : Math.sin(phase) * 3;

    const secondShift =
        stage === 2
            ? 17 + Math.sin(phase + 0.5) * 5
            : Math.sin(phase + 1) * 3;

    const stageTitle = [
        'Tahap 1 — Distribusi Elektron',
        'Tahap 2 — Pembentukan Dipol Sesaat',
        'Tahap 3 — Pembentukan Dipol Terinduksi',
    ];

    const stageExplanation = [
        'Atom helium memiliki dua elektron. Elektron terus mengalami perubahan distribusi sehingga pada suatu saat awan elektronnya dapat menjadi tidak merata. Amati perubahan posisi elektron pada ilustrasi.',
        'Ketika distribusi elektron tidak merata, salah satu sisi atom memiliki kerapatan elektron lebih besar sehingga bermuatan parsial negatif (δ−). Sisi lainnya memiliki kerapatan elektron lebih kecil sehingga bermuatan parsial positif (δ+). Keadaan sementara ini disebut dipol sesaat.',
        'Dipol sesaat pada atom pertama memengaruhi distribusi elektron atom kedua sehingga terbentuk dipol terinduksi. Sisi atom yang berdekatan memiliki muatan parsial berlawanan. Akibatnya, kedua atom mengalami gaya tarik-menarik yang disebut gaya dispersi London.',
    ];

    return (
        <section
            style={{
                margin: '30px 0',
                padding: '24px',
                borderRadius: '18px',
                background: '#f8fafc',
                border: '1px solid #dbeafe',
            }}
        >
            {/* Judul */}
            <div style={{ marginBottom: '18px' }}>
                <h2 style={{ color: '#1e3a8a', marginBottom: '8px' }}>
                    Laboratorium Gaya Dispersi London
                </h2>

                <p style={{ color: '#475569', lineHeight: 1.7 }}>
                    Pada simulasi ini, kamu akan mengamati bagaimana
                    perubahan distribusi elektron dapat menghasilkan
                    dipol sesaat dan menginduksi dipol pada atom
                    di sekitarnya.
                </p>
            </div>

            {/* Area simulasi */}
            <div
                style={{
                    background: 'white',
                    borderRadius: '14px',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <svg
                    viewBox="0 0 500 270"
                    width="100%"
                    role="img"
                    aria-label="Ilustrasi dua atom helium dan perubahan distribusi elektronnya"
                >
                    {renderAtom(
                        135,
                        145,
                        'Atom helium 1',
                        firstShift,
                        stage,
                        phase
                    )}

                    {renderAtom(
                        365,
                        145,
                        'Atom helium 2',
                        secondShift,
                        stage === 2 ? 2 : 0,
                        phase + 1.5
                    )}

                    {stage === 2 && (
                        <>
                            <path
                                d="M 205 145 L 295 145"
                                stroke="#64748b"
                                strokeWidth="2"
                                strokeDasharray="5 5"
                            />

                            <text
                                x="250"
                                y="125"
                                textAnchor="middle"
                                fontSize="12"
                                fill="#475569"
                            >
                                Gaya tarik-menarik
                            </text>

                            <text
                                x="250"
                                y="165"
                                textAnchor="middle"
                                fontSize="11"
                                fill="#475569"
                            >
                                Dipol terinduksi
                            </text>
                        </>
                    )}
                </svg>

                {/* Keterangan gambar */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                        fontSize: '12px',
                        color: '#475569',
                    }}
                >
                    <span>🟡 Inti atom</span>
                    <span>🔵 Elektron</span>
                    <span>🔹 Awan elektron</span>
                </div>
            </div>

            {/* Tombol kendali */}
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginTop: '16px',
                }}
            >
                <button onClick={startAutomatic} disabled={isRunning}>
                    Mulai otomatis
                </button>

                <button
                    onClick={() => setIsRunning(false)}
                    disabled={!isRunning}
                >
                    Jeda
                </button>

                <button
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning}
                >
                    Lanjutkan
                </button>

                <button onClick={nextStage} disabled={stage === 2}>
                    Langkah berikutnya
                </button>

                <button onClick={resetSimulation}>
                    Ulangi
                </button>
            </div>

            {/* Petunjuk penggunaan */}
            <div
                style={{
                    marginTop: '18px',
                    padding: '18px',
                    borderRadius: '12px',
                    background: '#f0fdf4',
                    color: '#14532d',
                    lineHeight: 1.7,
                }}
            >
                <h3 style={{ marginTop: 0 }}>
                    Petunjuk Penggunaan Simulasi
                </h3>

                <ol style={{ paddingLeft: '22px', marginBottom: 0 }}>
                    <li>
                        Klik <strong>Mulai otomatis</strong> untuk
                        mengamati perubahan distribusi elektron pada
                        atom helium.
                    </li>
                    <li>
                        Perhatikan gerakan elektron dan perubahan
                        distribusi awan elektron.
                    </li>
                    <li>
                        Klik <strong>Jeda</strong> untuk menghentikan
                        animasi sementara. Klik <strong>Lanjutkan</strong>
                        untuk menjalankannya kembali.
                    </li>
                    <li>
                        Klik <strong>Langkah berikutnya</strong> untuk
                        mengamati pembentukan dipol sesaat.
                    </li>
                    <li>
                        Klik <strong>Langkah berikutnya</strong> sekali
                        lagi untuk mengamati pembentukan dipol terinduksi
                        pada atom kedua.
                    </li>
                    <li>
                        Baca penjelasan pada setiap tahap dan klik
                        <strong> Ulangi</strong> jika ingin mengamati
                        proses dari awal.
                    </li>
                </ol>
            </div>

            {/* Penjelasan setiap tahap */}
            <div
                style={{
                    marginTop: '18px',
                    padding: '18px',
                    borderRadius: '12px',
                    background: '#eff6ff',
                    color: '#1e293b',
                    lineHeight: 1.7,
                }}
            >
                <h3 style={{ marginTop: 0, color: '#1e3a8a' }}>
                    {stageTitle[stage]}
                </h3>

                <p>{stageExplanation[stage]}</p>

                <p style={{ marginBottom: 0 }}>
                    <strong>Fokus pengamatan:</strong>{' '}
                    {stage === 0 &&
                        'Apakah distribusi elektron selalu merata?'}
                    {stage === 1 &&
                        'Mengapa satu sisi atom dapat menjadi δ− dan sisi lainnya δ+?'}
                    {stage === 2 &&
                        'Bagaimana dipol sesaat memengaruhi atom di dekatnya?'}
                </p>
            </div>

            {/* Rangkuman konsep */}
            <div
                style={{
                    marginTop: '14px',
                    padding: '18px',
                    borderRadius: '12px',
                    background: '#fefce8',
                    color: '#713f12',
                    lineHeight: 1.7,
                }}
            >
                <h3 style={{ marginTop: 0 }}>
                    Apa yang Dapat Kamu Simpulkan?
                </h3>

                <p>
                    Gaya dispersi London merupakan gaya tarik-menarik
                    ant partikel yang berasal dari terbentuknya dipol
                    sesaat dan dipol terinduksi. Dipol sesaat terjadi
                    akibat distribusi elektron yang tidak merata,
                    sedangkan dipol terinduksi terbentuk karena
                    pengaruh dipol sesaat pada partikel di sekitarnya.
                </p>

                <p>
                    Gaya dispersi London terdapat pada semua atom dan
                    molekul, baik molekul polar maupun nonpolar.
                    Besarnya gaya ini juga dipengaruhi oleh
                    kemudahan awan elektron untuk mengalami polarisasi.
                </p>

                <strong>Ingat:</strong>
                <p style={{ marginBottom: 0 }}>
                    Semakin mudah awan elektron suatu partikel
                    mengalami polarisasi, semakin besar gaya dispersi
                    London yang dapat terbentuk.
                </p>
            </div>

            {/* Catatan ilmiah */}
            <p
                style={{
                    marginTop: '14px',
                    fontSize: '12px',
                    color: '#64748b',
                    lineHeight: 1.6,
                }}
            >
                Catatan: Ilustrasi merupakan model konseptual
                sederhana. Elektron tidak bergerak pada lintasan
                seperti planet, dan tahapan dipol sesaat serta
                dipol terinduksi digunakan untuk mempermudah
                pemahaman fenomena.
            </p>
        </section>
    );
}
