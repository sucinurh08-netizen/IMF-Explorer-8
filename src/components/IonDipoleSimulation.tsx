
import { useState } from 'react';

type IonType = 'Na+' | 'Cl-';
type Stage = 0 | 1 | 2;

const moleculePositions = [
    { x: 250, y: 65, angle: -90 },
    { x: 335, y: 105, angle: -30 },
    { x: 335, y: 195, angle: 30 },
    { x: 250, y: 235, angle: 90 },
    { x: 165, y: 195, angle: 150 },
    { x: 165, y: 105, angle: 210 },
];

export default function IonDipoleSimulation() {
    const [selectedIon, setSelectedIon] = useState<IonType>('Na+');
    const [stage, setStage] = useState<Stage>(0);

    const resetSimulation = () => setStage(0);

    const changeIon = (ion: IonType) => {
        setSelectedIon(ion);
        setStage(0);
    };

    const isSodium = selectedIon === 'Na+';

    const drawWaterMolecule = (
        x: number,
        y: number,
        angle: number,
        index: number
    ) => {
        // Arah molekul disesuaikan dengan muatan ion.
        // Na+: oksigen menghadap ion.
        // Cl-: salah satu hidrogen menghadap ion.
        const oxygenX = isSodium ? -11 : 11;
        const hydrogenX = isSodium ? 12 : -7;

        return (
            <g
                key={index}
                transform={`translate(${x} ${y}) rotate(${angle})`}
            >
                {/* Ikatan kovalen O-H */}
                <line
                    x1={oxygenX}
                    y1="0"
                    x2={hydrogenX}
                    y2="-14"
                    stroke="#475569"
                    strokeWidth="3"
                />

                <line
                    x1={oxygenX}
                    y1="0"
                    x2={hydrogenX}
                    y2="14"
                    stroke="#475569"
                    strokeWidth="3"
                />

                {/* Atom oksigen */}
                <circle
                    cx={oxygenX}
                    cy="0"
                    r="15"
                    fill="#ef4444"
                    stroke="#991b1b"
                    strokeWidth="1.5"
                />

                <text
                    x={oxygenX}
                    y="4"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="white"
                >
                    O
                </text>

                {/* Atom hidrogen */}
                <circle
                    cx={hydrogenX}
                    cy="-14"
                    r="9"
                    fill="#f8fafc"
                    stroke="#64748b"
                    strokeWidth="1.3"
                />

                <circle
                    cx={hydrogenX}
                    cy="14"
                    r="9"
                    fill="#f8fafc"
                    stroke="#64748b"
                    strokeWidth="1.3"
                />

                <text
                    x={hydrogenX}
                    y="-11"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill="#334155"
                >
                    H
                </text>

                <text
                    x={hydrogenX}
                    y="17"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill="#334155"
                >
                    H
                </text>

                {/* Muatan parsial */}
                {stage >= 1 && (
                    <>
                        <text
                            x={oxygenX}
                            y="-23"
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#2563eb"
                        >
                            δ−
                        </text>

                        <text
                            x={hydrogenX}
                            y="34"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="bold"
                            fill="#b45309"
                        >
                            δ+
                        </text>
                    </>
                )}
            </g>
        );
    };

    const explanations = [
        {
            title: 'Tahap 1 — Mengenali Molekul Air dan Ion',
            text:
                'Molekul air (H₂O) merupakan molekul polar. Atom oksigen memiliki muatan parsial negatif (δ−), sedangkan atom hidrogen memiliki muatan parsial positif (δ+). Ion Na⁺ bermuatan positif dan ion Cl⁻ bermuatan negatif.',
            focus:
                'Perhatikan perbedaan muatan ion dengan muatan parsial pada molekul air.',
        },
        {
            title: 'Tahap 2 — Orientasi Molekul Air',
            text: isSodium
                ? 'Ion Na⁺ bermuatan positif sehingga menarik bagian oksigen (δ−) dari molekul air. Akibatnya, atom oksigen pada molekul air mengarah ke ion Na⁺, sedangkan atom hidrogen cenderung mengarah menjauhinya.'
                : 'Ion Cl⁻ bermuatan negatif sehingga menarik bagian hidrogen (δ+) dari molekul air. Akibatnya, salah satu atom hidrogen pada molekul air mengarah ke ion Cl⁻.',
            focus: isSodium
                ? 'Mengapa atom oksigen yang menghadap ion Na⁺?'
                : 'Mengapa atom hidrogen yang menghadap ion Cl⁻?',
        },
        {
            title: 'Tahap 3 — Terbentuknya Interaksi Ion-Dipol',
            text: isSodium
                ? 'Ketika molekul air berada di sekitar Na⁺, muatan parsial negatif pada oksigen tertarik oleh ion positif. Interaksi tarik-menarik antara ion Na⁺ dan molekul air ini disebut gaya ion-dipol.'
                : 'Ketika molekul air berada di sekitar Cl⁻, muatan parsial positif pada hidrogen tertarik oleh ion negatif. Interaksi tarik-menarik antara ion Cl⁻ dan molekul air ini disebut gaya ion-dipol.',
            focus:
                'Apa hubungan antara muatan ion dan orientasi molekul air di sekitarnya?',
        },
    ];

    const explanation = explanations[stage];

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
            {/* Judul dan pengantar */}
            <h2 style={{ color: '#1e3a8a', marginBottom: '8px' }}>
                Laboratorium Interaksi Ion-Dipol
            </h2>

            <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Bagaimana molekul air berinteraksi dengan ion
                bermuatan positif dan negatif? Amati orientasi
                molekul air di sekitar ion untuk memahami
                terbentuknya gaya ion-dipol.
            </p>

            {/* Pilihan ion */}
            <div
                style={{
                    marginTop: '18px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <strong>Pilih ion yang akan diamati:</strong>

                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap',
                        marginTop: '12px',
                    }}
                >
                    {(['Na+', 'Cl-'] as IonType[]).map((ion) => (
                        <button
                            key={ion}
                            onClick={() => changeIon(ion)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                border: '1px solid #93c5fd',
                                background:
                                    selectedIon === ion ? '#1d4ed8' : 'white',
                                color:
                                    selectedIon === ion ? 'white' : '#1e3a8a',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            {ion === 'Na+' ? 'Na⁺ (positif)' : 'Cl⁻ (negatif)'}
                        </button>
                    ))}
                </div>

                <p style={{ color: '#475569', marginBottom: 0 }}>
                    Ion yang diamati:{' '}
                    <strong>{selectedIon === 'Na+' ? 'Na⁺' : 'Cl⁻'}</strong>
                </p>
            </div>

            {/* Area simulasi */}
            <div
                style={{
                    marginTop: '18px',
                    padding: '12px',
                    background: 'white',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <svg
                    viewBox="0 0 500 300"
                    width="100%"
                    role="img"
                    aria-label={`Enam molekul air mengelilingi ion ${selectedIon}`}
                >
                    {/* Lingkaran area interaksi */}
                    <circle
                        cx="250"
                        cy="150"
                        r="118"
                        fill="#eff6ff"
                        stroke="#bfdbfe"
                        strokeDasharray="5 5"
                        strokeWidth="2"
                    />

                    {/* Molekul air */}
                    {moleculePositions.map((position, index) =>
                        drawWaterMolecule(
                            position.x,
                            position.y,
                            position.angle,
                            index
                        )
                    )}

                    {/* Ion di pusat */}
                    <circle
                        cx="250"
                        cy="150"
                        r="29"
                        fill={isSodium ? '#2563eb' : '#dc2626'}
                        stroke={isSodium ? '#1e40af' : '#991b1b'}
                        strokeWidth="2"
                    />

                    <text
                        x="250"
                        y="156"
                        textAnchor="middle"
                        fontSize="18"
                        fontWeight="bold"
                        fill="white"
                    >
                        {isSodium ? 'Na⁺' : 'Cl⁻'}
                    </text>

                    {/* Garis interaksi ion-dipol */}
                    {stage >= 2 &&
                        moleculePositions.map((position, index) => {
                            const dx = position.x - 250;
                            const dy = position.y - 150;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            const startX = 250 + (dx / distance) * 35;
                            const startY = 150 + (dy / distance) * 35;

                            const endX = 250 + (dx / distance) * 100;
                            const endY = 150 + (dy / distance) * 100;

                            return (
                                <line
                                    key={`interaction-${index}`}
                                    x1={startX}
                                    y1={startY}
                                    x2={endX}
                                    y2={endY}
                                    stroke="#d97706"
                                    strokeWidth="2"
                                    strokeDasharray="5 5"
                                    opacity="0.75"
                                />
                            );
                        })}
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
                    <span>🔴 Oksigen (δ−)</span>
                    <span>⚪ Hidrogen (δ+)</span>
                    <span>🔵 Ion Na⁺</span>
                    <span>🔴 Ion Cl⁻</span>
                    <span>╌╌ Interaksi ion-dipol</span>
                </div>
            </div>

            {/* Kendali simulasi */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '16px',
                }}
            >
                <button
                    onClick={() =>
                        setStage((previous) =>
                            previous < 2 ? ((previous + 1) as Stage) : 2
                        )
                    }
                    disabled={stage === 2}
                >
                    Langkah berikutnya
                </button>

                <button
                    onClick={() =>
                        setStage((previous) =>
                            previous > 0 ? ((previous - 1) as Stage) : 0
                        )
                    }
                    disabled={stage === 0}
                >
                    Langkah sebelumnya
                </button>

                <button onClick={resetSimulation}>
                    Ulangi simulasi
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
                        Pilih ion <strong>Na⁺</strong> untuk mengamati
                        interaksi antara ion positif dan molekul air.
                    </li>
                    <li>
                        Amati posisi atom oksigen dan hidrogen pada
                        molekul air di sekeliling ion.
                    </li>
                    <li>
                        Klik <strong>Langkah berikutnya</strong> untuk
                        menampilkan muatan parsial pada molekul air.
                    </li>
                    <li>
                        Klik <strong>Langkah berikutnya</strong> sekali
                        lagi untuk melihat representasi interaksi
                        ion-dipol.
                    </li>
                    <li>
                        Pilih ion <strong>Cl⁻</strong> dan ulangi
                        pengamatan. Bandingkan arah molekul air
                        ketika berinteraksi dengan ion negatif.
                    </li>
                    <li>
                        Baca penjelasan dan jawab pertanyaan pengamatan
                        untuk memahami perbedaan kedua interaksi.
                    </li>
                </ol>
            </div>

            {/* Penjelasan tiap tahap */}
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
                    {explanation.title}
                </h3>

                <p>{explanation.text}</p>

                <p style={{ marginBottom: 0 }}>
                    <strong>Fokus pengamatan:</strong>{' '}
                    {explanation.focus}
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
                    Memahami Konsep: Gaya Ion-Dipol
                </h3>

                <p>
                    Molekul air merupakan molekul polar karena
                    distribusi muatannya tidak merata. Atom oksigen
                    memiliki muatan parsial negatif (δ−), sedangkan
                    atom hidrogen memiliki muatan parsial positif (δ+).
                </p>

                <p>
                    Ketika ion positif seperti Na⁺ berinteraksi
                    dengan air, bagian oksigen (δ−) tertarik ke
                    arah ion. Sebaliknya, ketika ion negatif seperti
                    Cl⁻ berinteraksi dengan air, bagian hidrogen
                    (δ+) tertarik ke arah ion.
                </p>

                <p>
                    Tarik-menarik antara ion dengan bagian bermuatan
                    parsial pada molekul polar disebut gaya ion-dipol.
                    Interaksi ini berperan penting dalam proses
                    hidrasi ion ketika senyawa ionik larut dalam air.
                </p>

                <strong>Ingat:</strong>

                <p style={{ marginBottom: 0 }}>
                    Ion positif menarik kutub negatif molekul polar,
                    sedangkan ion negatif menarik kutub positif
                    molekul polar.
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
                        Mengapa atom oksigen pada molekul air
                        mengarah ke ion Na⁺?
                    </li>
                    <li>
                        Mengapa atom hidrogen pada molekul air
                        mengarah ke ion Cl⁻?
                    </li>
                    <li>
                        Apa perbedaan interaksi molekul air dengan
                        ion Na⁺ dan ion Cl⁻?
                    </li>
                    <li>
                        Mengapa interaksi ion-dipol berperan dalam
                        proses pelarutan garam dalam air?
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
                Catatan: Ilustrasi merupakan model konseptual
                sederhana. Susunan molekul air tidak menunjukkan
                jumlah molekul dalam selubung hidrasi yang
                sebenarnya. Garis putus-putus menunjukkan
                interaksi ion-dipol secara ilustratif.
            </p>
        </section>
    );
}
