
import { useEffect, useState } from 'react';

type Phase = 'liquid' | 'gas';

type Molecule = {
    id: number;
    x: number;
    y: number;
    phase: Phase;
};

const initialMolecules: Molecule[] = [
    { id: 1, x: 65, y: 205, phase: 'liquid' },
    { id: 2, x: 125, y: 220, phase: 'liquid' },
    { id: 3, x: 185, y: 195, phase: 'liquid' },
    { id: 4, x: 245, y: 220, phase: 'liquid' },
    { id: 5, x: 305, y: 200, phase: 'liquid' },
    { id: 6, x: 365, y: 220, phase: 'liquid' },
    { id: 7, x: 425, y: 195, phase: 'liquid' },
    { id: 8, x: 95, y: 260, phase: 'liquid' },
    { id: 9, x: 155, y: 270, phase: 'liquid' },
    { id: 10, x: 215, y: 255, phase: 'liquid' },
    { id: 11, x: 275, y: 270, phase: 'liquid' },
    { id: 12, x: 335, y: 255, phase: 'liquid' },
    { id: 13, x: 395, y: 270, phase: 'liquid' },
    { id: 14, x: 455, y: 255, phase: 'liquid' },
];

export default function WaterEvaporationSimulation() {
    const [molecules, setMolecules] =
        useState<Molecule[]>(initialMolecules);

    const [temperature, setTemperature] = useState(25);
    const [isRunning, setIsRunning] = useState(true);

    const gasCount = molecules.filter(
        (molecule) => molecule.phase === 'gas'
    ).length;

    const liquidCount = molecules.length - gasCount;

    // Gerakan molekul dan perubahan fase secara sederhana
    useEffect(() => {
        if (!isRunning) return;

        const timer = window.setInterval(() => {
            setMolecules((previous) =>
                previous.map((molecule) => {
                    const movement = 0.5 + temperature / 30;

                    let nextX =
                        molecule.x + (Math.random() - 0.5) * movement * 2;

                    let nextY =
                        molecule.y + (Math.random() - 0.5) * movement * 2;

                    let nextPhase = molecule.phase;

                    if (molecule.phase === 'liquid') {
                        nextX = Math.max(35, Math.min(465, nextX));
                        nextY = Math.max(185, Math.min(275, nextY));

                        // Pemanasan meningkatkan peluang molekul
                        // di permukaan untuk mengalami penguapan.
                        if (
                            temperature >= 60 &&
                            molecule.y <= 215 &&
                            Math.random() < (temperature - 55) / 1800
                        ) {
                            nextPhase = 'gas';
                            nextY = 145;
                        }
                    } else {
                        // Molekul fase gas bergerak lebih bebas.
                        nextX = Math.max(35, Math.min(465, nextX));
                        nextY = Math.max(45, Math.min(175, nextY));

                        // Pendinginan memungkinkan molekul gas
                        // kembali ke fase cair.
                        if (
                            temperature <= 35 &&
                            Math.random() < 0.025
                        ) {
                            nextPhase = 'liquid';
                            nextY = 205 + Math.random() * 65;
                        }
                    }

                    return {
                        ...molecule,
                        x: nextX,
                        y: nextY,
                        phase: nextPhase,
                    };
                })
            );
        }, 60);

        return () => window.clearInterval(timer);
    }, [isRunning, temperature]);

    const heatWater = () => {
        setTemperature((previous) =>
            Math.min(100, previous + 15)
        );
    };

    const coolWater = () => {
        setTemperature((previous) =>
            Math.max(0, previous - 15)
        );
    };

    const resetSimulation = () => {
        setMolecules(initialMolecules);
        setTemperature(25);
        setIsRunning(true);
    };

    const condition =
        gasCount === 0
            ? 'initial'
            : temperature <= 35
                ? 'cooling'
                : 'evaporation';

    const explanation = {
        initial:
            'Pada kondisi awal, molekul-molekul air berada dalam fase cair. Molekul air saling tarik-menarik melalui ikatan hidrogen. Ikatan O–H di dalam setiap molekul merupakan ikatan kovalen.',
        evaporation:
            'Ketika air dipanaskan, energi kinetik rata-rata molekul meningkat. Sebagian molekul di permukaan memperoleh energi yang cukup untuk mengatasi gaya tarik-menarik antarmolekul dan lepas ke fase gas. Peristiwa ini disebut penguapan.',
        cooling:
            'Ketika suhu diturunkan, energi kinetik rata-rata molekul berkurang. Molekul uap dapat kehilangan energi, saling mendekat, dan kembali ke fase cair. Perubahan dari gas menjadi cair disebut pengembunan.',
    };

    const conditionTitle = {
        initial: 'Kondisi awal — Air dalam fase cair',
        evaporation: 'Proses penguapan — Molekul air menjadi uap',
        cooling: 'Proses pendinginan — Pengembunan',
    };

    const focusQuestion = {
        initial:
            'Gaya tarik-menarik apa yang terdapat di antara molekul-molekul air?',
        evaporation:
            'Apa yang harus diatasi oleh molekul air agar dapat lepas ke fase gas?',
        cooling:
            'Apa yang terjadi pada gerak molekul ketika energi panas berkurang?',
    };

    const drawWaterMolecule = (
        x: number,
        y: number,
        id: number
    ) => (
        <g key={id}>
            {/* Ikatan kovalen O-H */}
            <line
                x1={x}
                y1={y}
                x2={x - 12}
                y2={y - 11}
                stroke="#475569"
                strokeWidth="3"
            />
            <line
                x1={x}
                y1={y}
                x2={x + 12}
                y2={y - 11}
                stroke="#475569"
                strokeWidth="3"
            />

            {/* Atom oksigen */}
            <circle
                cx={x}
                cy={y}
                r="11"
                fill="#ef4444"
                stroke="#991b1b"
            />

            <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="white"
            >
                O
            </text>

            {/* Atom hidrogen */}
            <circle
                cx={x - 12}
                cy={y - 11}
                r="7"
                fill="#f8fafc"
                stroke="#64748b"
            />

            <circle
                cx={x + 12}
                cy={y - 11}
                r="7"
                fill="#f8fafc"
                stroke="#64748b"
            />

            <text
                x={x - 12}
                y={y - 8}
                textAnchor="middle"
                fontSize="8"
                fill="#334155"
            >
                H
            </text>

            <text
                x={x + 12}
                y={y - 8}
                textAnchor="middle"
                fontSize="8"
                fill="#334155"
            >
                H
            </text>
        </g>
    );

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
            <h2 style={{ color: '#1e3a8a', marginBottom: '8px' }}>
                Laboratorium Penguapan Air
            </h2>

            <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Apa yang terjadi pada molekul air ketika
                dipanaskan? Melalui simulasi ini, kamu akan
                mengamati hubungan antara energi kinetik molekul,
                gaya tarik-menarik antarmolekul, dan perubahan
                fase air.
            </p>

            {/* Area simulasi */}
            <div
                style={{
                    marginTop: '18px',
                    padding: '12px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                }}
            >
                <svg
                    viewBox="0 0 500 320"
                    width="100%"
                    role="img"
                    aria-label="Simulasi penguapan dan pengembunan molekul air"
                >
                    {/* Area gas */}
                    <rect
                        x="10"
                        y="15"
                        width="480"
                        height="145"
                        rx="12"
                        fill="#e0f2fe"
                    />

                    {/* Area cair */}
                    <rect
                        x="10"
                        y="165"
                        width="480"
                        height="140"
                        rx="12"
                        fill="#bfdbfe"
                    />

                    <text
                        x="28"
                        y="38"
                        fontSize="13"
                        fontWeight="bold"
                        fill="#0369a1"
                    >
                        Fase gas (uap air)
                    </text>

                    <text
                        x="28"
                        y="190"
                        fontSize="13"
                        fontWeight="bold"
                        fill="#1d4ed8"
                    >
                        Fase cair (air)
                    </text>

                    {/* Garis permukaan air */}
                    <line
                        x1="10"
                        y1="165"
                        x2="490"
                        y2="165"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                    />

                    {/* Ikatan hidrogen konseptual pada fase cair */}
                    {molecules
                        .filter((molecule) => molecule.phase === 'liquid')
                        .slice(0, 10)
                        .map((molecule, index, group) => {
                            const next = group[(index + 1) % group.length];

                            return (
                                <line
                                    key={`hbond-${molecule.id}`}
                                    x1={molecule.x}
                                    y1={molecule.y}
                                    x2={next.x}
                                    y2={next.y}
                                    stroke="#2563eb"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 5"
                                    opacity="0.45"
                                />
                            );
                        })}

                    {/* Molekul air */}
                    {molecules.map((molecule) =>
                        drawWaterMolecule(
                            molecule.x,
                            molecule.y,
                            molecule.id
                        )
                    )}

                    {/* Keterangan proses */}
                    {gasCount > 0 && (
                        <text
                            x="250"
                            y="65"
                            textAnchor="middle"
                            fontSize="12"
                            fill="#0369a1"
                            fontWeight="bold"
                        >
                            Molekul air berada dalam fase gas
                        </text>
                    )}
                </svg>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '14px',
                        fontSize: '12px',
                        color: '#475569',
                    }}
                >
                    <span>🔴 Oksigen (O)</span>
                    <span>⚪ Hidrogen (H)</span>
                    <span>╌╌ Ikatan hidrogen</span>
                    <span>— Ikatan kovalen O–H</span>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '18px',
                        marginTop: '12px',
                        fontSize: '13px',
                        color: '#334155',
                    }}
                >
                    <span>
                        Molekul cair: <strong>{liquidCount}</strong>
                    </span>
                    <span>
                        Molekul gas: <strong>{gasCount}</strong>
                    </span>
                </div>
            </div>

            {/* Kontrol simulasi */}
            <div
                style={{
                    marginTop: '16px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <strong>Kontrol Simulasi</strong>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '12px',
                    }}
                >
                    <button onClick={heatWater}>
                        Panaskan (+15)
                    </button>

                    <button onClick={coolWater}>
                        Dinginkan (−15)
                    </button>

                    <button onClick={() => setIsRunning(!isRunning)}>
                        {isRunning ? 'Jeda gerakan' : 'Lanjutkan gerakan'}
                    </button>

                    <button onClick={resetSimulation}>
                        Ulangi
                    </button>
                </div>

                <div style={{ marginTop: '18px' }}>
                    <label
                        htmlFor="evaporation-temperature"
                        style={{ fontWeight: 'bold', color: '#334155' }}
                    >
                        Tingkat pemanasan model: {temperature}%
                    </label>

                    <input
                        id="evaporation-temperature"
                        type="range"
                        min="0"
                        max="100"
                        value={temperature}
                        onChange={(event) =>
                            setTemperature(Number(event.target.value))
                        }
                        style={{
                            display: 'block',
                            width: '100%',
                            marginTop: '8px',
                        }}
                    />

                    <p
                        style={{
                            fontSize: '12px',
                            color: '#64748b',
                            marginBottom: 0,
                        }}
                    >
                        Geser pengaturan untuk mengubah tingkat
                        pemanasan pada model. Nilai ini bukan
                        pengukuran suhu Celsius yang sebenarnya.
                    </p>
                </div>
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
                        Amati kondisi awal molekul air pada fase cair.
                        Perhatikan susunan molekul dan garis putus-putus
                        yang menggambarkan interaksi antarmolekul.
                    </li>
                    <li>
                        Klik <strong>Panaskan (+15)</strong> beberapa
                        kali atau geser tingkat pemanasan ke nilai yang
                        lebih tinggi.
                    </li>
                    <li>
                        Amati gerakan molekul dan perhatikan sebagian
                        molekul yang berpindah ke area fase gas.
                    </li>
                    <li>
                        Klik <strong>Jeda gerakan</strong> untuk
                        mengamati posisi molekul dengan lebih teliti.
                    </li>
                    <li>
                        Setelah mengamati penguapan, klik
                        <strong> Dinginkan (−15)</strong> beberapa kali.
                        Perhatikan molekul gas yang kembali ke fase cair.
                    </li>
                    <li>
                        Baca penjelasan konsep dan pertanyaan
                        pengamatan untuk memahami perubahan yang terjadi.
                    </li>
                    <li>
                        Klik <strong>Ulangi</strong> untuk mengembalikan
                        simulasi ke kondisi awal.
                    </li>
                </ol>
            </div>

            {/* Penjelasan kondisi */}
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
                    {conditionTitle[condition]}
                </h3>

                <p>{explanation[condition]}</p>

                <p style={{ marginBottom: 0 }}>
                    <strong>Fokus pengamatan:</strong>{' '}
                    {focusQuestion[condition]}
                </p>
            </div>

            {/* Konsep ilmiah */}
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
                    Memahami Konsep: Mengapa Air Dapat Menguap?
                </h3>

                <p>
                    Molekul-molekul air saling tarik-menarik melalui
                    ikatan hidrogen. Interaksi ini merupakan gaya
                    antarmolekul, yaitu gaya tarik-menarik antara
                    molekul yang satu dengan molekul lainnya.
                </p>

                <p>
                    Ketika air menerima energi panas, energi kinetik
                    rata-rata molekul meningkat. Molekul bergerak
                    lebih cepat dan sebagian molekul di permukaan
                    dapat memperoleh energi yang cukup untuk
                    mengatasi gaya tarik-menarik antarmolekul.
                    Molekul tersebut kemudian lepas ke fase gas.
                </p>

                <p>
                    Penguapan tidak memutus ikatan kovalen O–H
                    di dalam molekul air. Molekul H₂O tetap menjadi
                    H₂O, tetapi jarak antarmolekul menjadi lebih
                    renggang ketika berada dalam fase gas.
                </p>

                <p>
                    Sebaliknya, ketika uap air kehilangan energi,
                    molekul dapat saling mendekat dan membentuk
                    kembali interaksi antarmolekul. Peristiwa ini
                    disebut pengembunan.
                </p>

                <strong>Ingat:</strong>

                <p style={{ marginBottom: 0 }}>
                    Penguapan mengatasi gaya tarik-menarik
                    antarmolekul, bukan memutus ikatan kovalen
                    O–H di dalam molekul air.
                </p>
            </div>

            {/* Pertanyaan refleksi */}
            <div
                style={{
                    marginTop: '14px',
                    padding: '18px',
                    borderRadius: '12px',
                    background: '#f1f5f9',
                    color: '#334155',
                    lineHeight: 1.7,
                }}
            >
                <h3 style={{ marginTop: 0 }}>
                    Ayo Tarik Kesimpulan!
                </h3>

                <ol style={{ paddingLeft: '22px', marginBottom: 0 }}>
                    <li>
                        Apa yang terjadi pada energi kinetik rata-rata
                        molekul air ketika dipanaskan?
                    </li>
                    <li>
                        Mengapa sebagian molekul air dapat lepas dari
                        permukaan dan berubah menjadi uap?
                    </li>
                    <li>
                        Apakah penguapan menyebabkan ikatan kovalen
                        O–H dalam molekul air terputus? Jelaskan.
                    </li>
                    <li>
                        Bagaimana perubahan energi molekul ketika
                        uap air mengalami pengembunan?
                    </li>
                </ol>
            </div>

            {/* Catatan model */}
            <p
                style={{
                    marginTop: '14px',
                    fontSize: '12px',
                    color: '#64748b',
                    lineHeight: 1.6,
                }}
            >
                Catatan: Simulasi ini merupakan model konseptual
                sederhana. Jumlah molekul yang menguap dan
                mengembun tidak dihitung berdasarkan persamaan
                termodinamika atau dinamika molekul yang sebenarnya.
                Garis putus-putus menggambarkan interaksi
                antarmolekul secara ilustratif.
            </p>
        </section>
    );
}
