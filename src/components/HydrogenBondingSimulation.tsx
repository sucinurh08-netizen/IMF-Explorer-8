
import { useState } from 'react';

type MoleculeType = 'H2O' | 'HF' | 'NH3';
type Stage = 0 | 1 | 2;

const moleculeInfo = {
    H2O: {
        name: 'Air',
        central: 'O',
        donor: 'H',
        acceptor: 'O',
        explanation:
            'Pada molekul air, atom H terikat secara kovalen pada atom O. Atom O dari molekul air lain memiliki pasangan elektron bebas yang dapat berinteraksi dengan H tersebut.',
    },
    HF: {
        name: 'Hidrogen fluorida',
        central: 'F',
        donor: 'H',
        acceptor: 'F',
        explanation:
            'Pada HF, atom H terikat secara kovalen pada F. Atom F dari molekul HF lain memiliki pasangan elektron bebas yang dapat berinteraksi dengan H tersebut.',
    },
    NH3: {
        name: 'Amonia',
        central: 'N',
        donor: 'H',
        acceptor: 'N',
        explanation:
            'Pada NH₃, atom H terikat secara kovalen pada N. Atom N dari molekul NH₃ lain memiliki pasangan elektron bebas yang dapat berinteraksi dengan H tersebut.',
    },
};

export default function HydrogenBondingSimulation() {
    const [selected, setSelected] = useState<MoleculeType>('H2O');
    const [stage, setStage] = useState<Stage>(0);

    const info = moleculeInfo[selected];

    const resetSimulation = () => setStage(0);

    const changeMolecule = (value: MoleculeType) => {
        setSelected(value);
        setStage(0);
    };

    const drawAtom = (
        x: number,
        y: number,
        atom: string,
        color: string,
        size = 22
    ) => (
        <g>
            <circle
                cx={x}
                cy={y}
                r={size}
                fill={color}
                stroke="#334155"
                strokeWidth="1.5"
            />
            <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontSize="15"
                fontWeight="bold"
                fill="white"
            >
                {atom}
            </text>
        </g>
    );

    const drawBond = (
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) => (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#475569"
            strokeWidth="4"
            strokeLinecap="round"
        />
    );

    const drawLonePairs = (x: number, y: number) => (
        <g fill="#7c3aed">
            <circle cx={x - 5} cy={y} r="3.5" />
            <circle cx={x + 5} cy={y} r="3.5" />
        </g>
    );

    const renderWater = () => (
        <>
            {/* Molekul air pertama: donor */}
            {drawBond(110, 145, 65, 110)}
            {drawBond(110, 145, 165, 145)}
            {drawAtom(110, 145, 'O', '#dc4545', 25)}
            {drawAtom(65, 110, 'H', '#94a3b8', 17)}
            {drawAtom(165, 145, 'H', '#94a3b8', 17)}

            {/* Molekul air kedua: akseptor */}
            {drawBond(340, 145, 390, 110)}
            {drawBond(340, 145, 390, 180)}
            {drawAtom(340, 145, 'O', '#dc4545', 25)}
            {drawAtom(390, 110, 'H', '#94a3b8', 17)}
            {drawAtom(390, 180, 'H', '#94a3b8', 17)}

            {drawLonePairs(340, 105)}
            {drawLonePairs(340, 185)}
        </>
    );

    const renderHF = () => (
        <>
            {/* Molekul HF pertama: donor */}
            {drawBond(110, 145, 165, 145)}
            {drawAtom(110, 145, 'F', '#16a34a', 25)}
            {drawAtom(165, 145, 'H', '#94a3b8', 17)}

            {/* Molekul HF kedua: akseptor */}
            {drawBond(340, 145, 390, 145)}
            {drawAtom(340, 145, 'F', '#16a34a', 25)}
            {drawAtom(390, 145, 'H', '#94a3b8', 17)}

            {drawLonePairs(340, 105)}
            {drawLonePairs(340, 185)}
        </>
    );

    const renderNH3 = () => (
        <>
            {/* Molekul NH3 pertama: donor */}
            {drawBond(110, 145, 65, 110)}
            {drawBond(110, 145, 65, 180)}
            {drawBond(110, 145, 165, 145)}
            {drawAtom(110, 145, 'N', '#2563eb', 25)}
            {drawAtom(65, 110, 'H', '#94a3b8', 17)}
            {drawAtom(65, 180, 'H', '#94a3b8', 17)}
            {drawAtom(165, 145, 'H', '#94a3b8', 17)}

            {/* Molekul NH3 kedua: akseptor */}
            {drawBond(340, 145, 390, 110)}
            {drawBond(340, 145, 390, 180)}
            {drawAtom(340, 145, 'N', '#2563eb', 25)}
            {drawAtom(390, 110, 'H', '#94a3b8', 17)}
            {drawAtom(390, 180, 'H', '#94a3b8', 17)}

            {drawLonePairs(340, 105)}
        </>
    );

    const renderMolecules = () => {
        if (selected === 'H2O') return renderWater();
        if (selected === 'HF') return renderHF();
        return renderNH3();
    };

    const explanations = [
        {
            title: 'Tahap 1 — Mengenali Molekul',
            text:
                'Amati dua molekul yang ditampilkan. Perhatikan atom F, O, atau N yang berikatan kovalen dengan atom H. Atom-atom tersebut berperan dalam pembentukan ikatan hidrogen.',
            focus:
                'Temukan atom H yang terikat langsung pada F, O, atau N.',
        },
        {
            title: 'Tahap 2 — Mengenali Donor dan Akseptor',
            text:
                'Atom H yang terikat pada F, O, atau N memiliki muatan parsial positif (δ+). Sementara itu, atom F, O, atau N pada molekul lain memiliki pasangan elektron bebas yang dapat berinteraksi dengan H tersebut.',
            focus:
                'Perhatikan atom H sebagai bagian donor dan pasangan elektron bebas sebagai bagian akseptor.',
        },
        {
            title: 'Tahap 3 — Terbentuknya Ikatan Hidrogen',
            text:
                'Ikatan hidrogen merupakan gaya tarik-menarik antara atom H yang terikat kovalen pada F, O, atau N dengan pasangan elektron bebas pada atom F, O, atau N dari molekul lain. Interaksi ini digambarkan dengan garis putus-putus.',
            focus:
                'Garis putus-putus menunjukkan ikatan hidrogen, bukan ikatan kovalen.',
        },
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
            <h2 style={{ color: '#1e3a8a', marginBottom: '8px' }}>
                Laboratorium Ikatan Hidrogen
            </h2>

            <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Amati bagaimana atom H dari suatu molekul dapat
                berinteraksi dengan pasangan elektron bebas pada
                molekul lain sehingga terbentuk ikatan hidrogen.
            </p>

            {/* Pilihan molekul */}
            <div
                style={{
                    marginTop: '18px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <strong>Pilih pasangan molekul:</strong>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '12px',
                    }}
                >
                    {(['H2O', 'HF', 'NH3'] as MoleculeType[]).map((item) => (
                        <button
                            key={item}
                            onClick={() => changeMolecule(item)}
                            style={{
                                padding: '9px 16px',
                                borderRadius: '8px',
                                border: '1px solid #93c5fd',
                                background: selected === item ? '#1d4ed8' : 'white',
                                color: selected === item ? 'white' : '#1e3a8a',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <p style={{ color: '#475569', marginBottom: 0 }}>
                    Molekul yang dipilih: <strong>{info.name}</strong>
                </p>
            </div>

            {/* Ilustrasi */}
            <div
                style={{
                    marginTop: '18px',
                    padding: '12px',
                    borderRadius: '14px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                }}
            >
                <svg
                    viewBox="0 0 500 270"
                    width="100%"
                    role="img"
                    aria-label={`Ilustrasi pembentukan ikatan hidrogen pada ${selected}`}
                >
                    <text
                        x="110"
                        y="35"
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#334155"
                    >
                        Molekul donor
                    </text>

                    <text
                        x="365"
                        y="35"
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#334155"
                    >
                        Molekul akseptor
                    </text>

                    {renderMolecules()}

                    {/* Penanda atom H donor */}
                    {stage >= 1 && (
                        <g>
                            <circle
                                cx="165"
                                cy="145"
                                r="24"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="3"
                                strokeDasharray="4 3"
                            />
                            <text
                                x="165"
                                y="205"
                                textAnchor="middle"
                                fontSize="12"
                                fontWeight="bold"
                                fill="#b45309"
                            >
                                H (δ+)
                            </text>
                        </g>
                    )}

                    {/* Penanda akseptor */}
                    {stage >= 1 && (
                        <text
                            x="340"
                            y="225"
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#7c3aed"
                        >
                            Pasangan elektron bebas
                        </text>
                    )}

                    {/* Garis ikatan hidrogen */}
                    {stage >= 2 && (
                        <>
                            <line
                                x1="185"
                                y1="145"
                                x2="313"
                                y2="145"
                                stroke="#d97706"
                                strokeWidth="3"
                                strokeDasharray="8 6"
                            />
                            <text
                                x="250"
                                y="130"
                                textAnchor="middle"
                                fontSize="12"
                                fontWeight="bold"
                                fill="#b45309"
                            >
                                Ikatan hidrogen
                            </text>
                        </>
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
                    <span>🔴 Oksigen</span>
                    <span>🟢 Fluorin</span>
                    <span>🔵 Nitrogen</span>
                    <span>⚪ Hidrogen</span>
                    <span>🟣 Pasangan elektron bebas</span>
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
                        Pilih salah satu pasangan molekul, yaitu H₂O,
                        HF, atau NH₃.
                    </li>
                    <li>
                        Amati susunan atom pada kedua molekul yang
                        ditampilkan.
                    </li>
                    <li>
                        Klik <strong>Langkah berikutnya</strong> untuk
                        melihat bagian molekul yang berperan sebagai
                        donor dan akseptor.
                    </li>
                    <li>
                        Klik <strong>Langkah berikutnya</strong> sekali
                        lagi untuk melihat garis putus-putus yang
                        menggambarkan ikatan hidrogen.
                    </li>
                    <li>
                        Baca penjelasan setiap tahap untuk memahami
                        bagaimana interaksi tersebut terjadi.
                    </li>
                    <li>
                        Pilih pasangan molekul lain atau klik
                        <strong> Ulangi simulasi</strong> untuk
                        mengamati kembali dari awal.
                    </li>
                </ol>
            </div>

            {/* Penjelasan tahap */}
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
                <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>
                    {explanations[stage].title}
                </h3>

                <p>{explanations[stage].text}</p>

                <p style={{ marginBottom: 0 }}>
                    <strong>Fokus pengamatan:</strong>{' '}
                    {explanations[stage].focus}
                </p>
            </div>

            {/* Penjelasan tambahan */}
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
                    Apa yang Perlu Kamu Pahami?
                </h3>

                <p>
                    Ikatan hidrogen merupakan salah satu bentuk
                    interaksi antarmolekul yang relatif kuat.
                    Interaksi ini dapat terjadi ketika atom H
                    berikatan kovalen dengan F, O, atau N dan
                    berinteraksi dengan pasangan elektron bebas
                    pada atom F, O, atau N dari molekul lain.
                </p>

                <p>
                    Ikatan hidrogen berbeda dari ikatan kovalen.
                    Ikatan kovalen menghubungkan atom-atom di dalam
                    satu molekul, sedangkan ikatan hidrogen merupakan
                    interaksi antara bagian dari molekul yang berbeda.
                </p>

                <strong>Ingat:</strong>
                <p style={{ marginBottom: 0 }}>
                    Ikatan O–H, H–F, dan N–H di dalam molekul
                    merupakan ikatan kovalen. Interaksi antara
                    H dari satu molekul dengan pasangan elektron
                    bebas molekul lain merupakan ikatan hidrogen.
                </p>
            </div>

            <p
                style={{
                    marginTop: '14px',
                    fontSize: '12px',
                    color: '#64748b',
                    lineHeight: 1.6,
                }}
            >
                Catatan: Ilustrasi merupakan model konseptual
                sederhana. Posisi atom dan pasangan elektron bebas
                tidak menggambarkan geometri molekul secara
                proporsional.
            </p>
        </section>
    );
}
