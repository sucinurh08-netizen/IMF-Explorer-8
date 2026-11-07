
import { useState } from 'react';
import type { PointerEvent } from 'react';

type MoleculeType = 'HCl' | 'SO2' | 'CH2O';

type Molecule = {
    x: number;
    y: number;
    angle: number;
};

const moleculeInfo = {
    HCl: {
        name: 'Hidrogen klorida',
        atoms: 'Hidrogen (H) dan Klorin (Cl)',
        description: 'HCl merupakan molekul polar. H memiliki muatan parsial positif (δ+), sedangkan Cl memiliki muatan parsial negatif (δ−).',
        positive: 'H',
        negative: 'Cl',
    },
    SO2: {
        name: 'Sulfur dioksida',
        atoms: 'Sulfur (S) dan Oksigen (O)',
        description: 'SO₂ memiliki bentuk bengkok. Resultan dipolnya mengarah dari atom S menuju sisi kedua atom O.',
        positive: 'S',
        negative: 'O',
    },
    CH2O: {
        name: 'Metanal (formaldehida)',
        atoms: 'Karbon (C), Hidrogen (H), dan Oksigen (O)',
        description: 'CH₂O memiliki bentuk trigonal planar di sekitar atom C. Ikatan C=O menghasilkan dipol kuat ke arah O.',
        positive: 'C/H',
        negative: 'O',
    },
};

const initialMolecules = (): [Molecule, Molecule] => [
    { x: 120, y: 165, angle: 0 },
    { x: 330, y: 165, angle: 180 },
];

export default function DipoleDipoleSimulation() {
    const [moleculeType, setMoleculeType] = useState<MoleculeType>('HCl');
    const [molecules, setMolecules] = useState<[Molecule, Molecule]>(initialMolecules);
    const [dragging, setDragging] = useState<number | null>(null);
    const [step, setStep] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);

    const info = moleculeInfo[moleculeType];

    const moveMolecule = (index: number, x: number, y: number) => {
        setMolecules((previous) =>
            previous.map((molecule, i) =>
                i === index
                    ? {
                        ...molecule,
                        x: Math.max(65, Math.min(385, x)),
                        y: Math.max(65, Math.min(255, y)),
                    }
                    : molecule
            ) as [Molecule, Molecule]
        );
    };

    const rotateMolecule = (index: number, amount: number) => {
        setMolecules((previous) =>
            previous.map((molecule, i) =>
                i === index
                    ? { ...molecule, angle: (molecule.angle + amount + 360) % 360 }
                    : molecule
            ) as [Molecule, Molecule]
        );
    };

    const reset = () => {
        setMolecules(initialMolecules());
        setDragging(null);
        setStep(0);
        setShowExplanation(false);
    };

    const handlePointerDown = (index: number, event: PointerEvent<SVGGElement>) => {
        setDragging(index);
        event.currentTarget.ownerSVGElement?.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        if (dragging === null) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 450;
        const y = ((event.clientY - rect.top) / rect.height) * 320;

        moveMolecule(dragging, x, y);
    };

    const first = molecules[0];
    const second = molecules[1];

    const dx = second.x - first.x;
    const dy = second.y - first.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const direction = Math.atan2(dy, dx);

    const angle1 = (first.angle * Math.PI) / 180;
    const angle2 = (second.angle * Math.PI) / 180;

    const interactionScore =
        Math.cos(angle1 - angle2) -
        3 * Math.cos(angle1 - direction) * Math.cos(angle2 - direction);

    const interaction =
        distance > 280
            ? 'weak'
            : interactionScore < -0.25
                ? 'attraction'
                : interactionScore > 0.25
                    ? 'repulsion'
                    : 'neutral';

    const renderMolecule = (molecule: Molecule, index: number) => {
        const { x, y, angle } = molecule;
        const rad = (angle * Math.PI) / 180;

        const rotatePoint = (localX: number, localY: number) => ({
            x: x + localX * Math.cos(rad) - localY * Math.sin(rad),
            y: y + localX * Math.sin(rad) + localY * Math.cos(rad),
        });

        const atom = (
            localX: number,
            localY: number,
            label: string,
            color: string,
            charge?: string,
            radius = 19
        ) => {
            const point = rotatePoint(localX, localY);
            return (
                <g key={`${label}-${localX}-${localY}`}>
                    <circle
                        cx={point.x}
                        cy={point.y}
                        r={radius}
                        fill={color}
                        stroke="#475569"
                        strokeWidth="1.5"
                    />
                    <text
                        x={point.x}
                        y={point.y + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="bold"
                        fill={color === '#ffffff' ? '#17324d' : 'white'}
                    >
                        {label}
                    </text>
                    {charge && (
                        <text
                            x={point.x}
                            y={point.y - radius - 5}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill={charge === 'δ+' ? '#246da8' : '#c62828'}
                        >
                            {charge}
                        </text>
                    )}
                </g>
            );
        };

        const bond = (a: { x: number; y: number }, b: { x: number; y: number }, width = 4) => (
            <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#64748b"
                strokeWidth={width}
                strokeLinecap="round"
            />
        );

        let atoms;
        let bonds;

        if (moleculeType === 'HCl') {
            const h = rotatePoint(-36, 0);
            const cl = rotatePoint(36, 0);

            bonds = bond(h, cl, 5);
            atoms = (
                <>
                    {atom(-36, 0, 'H', '#ffffff', 'δ+', 17)}
                    {atom(36, 0, 'Cl', '#16a34a', 'δ−', 22)}
                </>
            );
        } else if (moleculeType === 'SO2') {
            const s = rotatePoint(0, 0);
            const o1 = rotatePoint(-35, -29);
            const o2 = rotatePoint(-35, 29);

            bonds = (
                <>
                    {bond(s, o1, 5)}
                    {bond(s, o2, 5)}
                </>
            );

            atoms = (
                <>
                    {atom(0, 0, 'S', '#eab308', 'δ+', 20)}
                    {atom(-35, -29, 'O', '#dc3545', 'δ−', 19)}
                    {atom(-35, 29, 'O', '#dc3545', 'δ−', 19)}
                </>
            );
        } else {
            const c = rotatePoint(0, 0);
            const o = rotatePoint(42, 0);
            const h1 = rotatePoint(-27, -30);
            const h2 = rotatePoint(-27, 30);

            bonds = (
                <>
                    {bond(c, o, 7)}
                    {bond(c, h1)}
                    {bond(c, h2)}
                </>
            );

            atoms = (
                <>
                    {atom(0, 0, 'C', '#374151', 'δ+', 19)}
                    {atom(42, 0, 'O', '#dc3545', 'δ−', 21)}
                    {atom(-27, -30, 'H', '#ffffff', undefined, 15)}
                    {atom(-27, 30, 'H', '#ffffff', undefined, 15)}
                </>
            );
        }

        return (
            <g
                key={index}
                onPointerDown={(event) => handlePointerDown(index, event)}
                style={{ cursor: 'grab', touchAction: 'none' }}
            >
                <circle
                    cx={x}
                    cy={y}
                    r="62"
                    fill="transparent"
                    stroke="#b8cfe5"
                    strokeDasharray="4 5"
                />
                {bonds}
                {atoms}
                <text
                    x={x}
                    y={y + 67}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#17324d"
                >
                    Molekul {index + 1}
                </text>
            </g>
        );
    };

    return (
        <div
            style={{
                background: '#f0f7ff',
                border: '1px solid #cbdff5',
                borderRadius: 16,
                padding: 20,
                margin: '24px 0',
                color: '#17324d',
            }}
        >
            <h2 style={{ marginTop: 0 }}>Laboratorium Mini: Gaya Dipol-Dipol</h2>

            <p>
                Dalam eksperimen ini, kamu akan mengatur posisi dan arah dua molekul
                polar untuk mengetahui bagaimana kutub positif dan negatif saling
                berinteraksi.
            </p>

            <label htmlFor="dipole-choice">
                <strong>1. Pilih molekul yang ingin diamati</strong>
            </label>

            <select
                id="dipole-choice"
                value={moleculeType}
                onChange={(event) => {
                    setMoleculeType(event.target.value as MoleculeType);
                    reset();
                }}
                style={{
                    display: 'block',
                    width: '100%',
                    maxWidth: 320,
                    padding: 10,
                    marginTop: 8,
                    borderRadius: 8,
                    border: '1px solid #9db9d3',
                }}
            >
                <option value="HCl">HCl — Hidrogen klorida</option>
                <option value="SO2">SO₂ — Sulfur dioksida</option>
                <option value="CH2O">CH₂O — Metanal</option>
            </select>

            <p style={{ fontSize: 13 }}>{info.description}</p>

            <div
                style={{
                    background: 'white',
                    border: '1px solid #b8cfe5',
                    borderRadius: 12,
                    padding: 8,
                }}
            >
                <strong style={{ display: 'block', padding: 8 }}>
                    2. Area eksperimen — geser molekul dengan mouse atau sentuhan
                </strong>

                <svg
                    viewBox="0 0 450 320"
                    width="100%"
                    role="img"
                    aria-label={`Eksperimen dua molekul ${moleculeType}`}
                    style={{ display: 'block', touchAction: 'none' }}
                    onPointerMove={handlePointerMove}
                    onPointerUp={() => setDragging(null)}
                    onPointerCancel={() => setDragging(null)}
                >
                    <rect width="450" height="320" fill="#fbfdff" />

                    <text x="225" y="22" textAnchor="middle" fill="#64748b" fontSize="12">
                        SERET MOLEKUL 1 ATAU 2
                    </text>

                    {renderMolecule(first, 0)}
                    {renderMolecule(second, 1)}
                </svg>
            </div>

            <div
                style={{
                    background: 'white',
                    padding: 12,
                    borderRadius: 10,
                    marginTop: 12,
                }}
            >
                <strong>3. Kenali bagian molekul</strong>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 10 }}>
                    {moleculeType === 'HCl' && (
                        <>
                            <span>⚪ H = Hidrogen (δ+)</span>
                            <span>🟢 Cl = Klorin (δ−)</span>
                        </>
                    )}

                    {moleculeType === 'SO2' && (
                        <>
                            <span>🟡 S = Sulfur (δ+)</span>
                            <span>🔴 O = Oksigen (δ−)</span>
                        </>
                    )}

                    {moleculeType === 'CH2O' && (
                        <>
                            <span>⚫ C = Karbon (δ+)</span>
                            <span>⚪ H = Hidrogen</span>
                            <span>🔴 O = Oksigen (δ−)</span>
                        </>
                    )}
                </div>

                <p style={{ fontSize: 12, color: '#64748b', marginBottom: 0 }}>
                    δ+ menunjukkan muatan parsial positif, sedangkan δ− menunjukkan
                    muatan parsial negatif. Warna dan label atom juga ditampilkan
                    langsung pada gambar molekul.
                </p>
            </div>

            <div
                style={{
                    background: 'white',
                    padding: 12,
                    borderRadius: 10,
                    marginTop: 12,
                }}
            >
                <strong>4. Atur arah molekul</strong>
                <p style={{ fontSize: 13 }}>
                    Pilih molekul yang ingin diputar. Setiap tombol akan memutar
                    molekul sebesar 45°.
                </p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button onClick={() => rotateMolecule(0, -45)}>
                        Putar molekul 1 ke kiri 45°
                    </button>
                    <button onClick={() => rotateMolecule(0, 45)}>
                        Putar molekul 1 ke kanan 45°
                    </button>
                    <button onClick={() => rotateMolecule(1, -45)}>
                        Putar molekul 2 ke kiri 45°
                    </button>
                    <button onClick={() => rotateMolecule(1, 45)}>
                        Putar molekul 2 ke kanan 45°
                    </button>
                    <button onClick={reset}>Ulangi eksperimen</button>
                </div>
            </div>

            <div
                style={{
                    background: '#fff',
                    padding: 14,
                    borderRadius: 10,
                    marginTop: 14,
                    borderLeft: '4px solid #3986c8',
                }}
            >
                <strong>5. Coba lakukan eksperimen berikut</strong>

                {step === 0 && (
                    <p>
                        <strong>Percobaan 1:</strong> Atur molekul agar ujung δ− dari
                        molekul pertama berdekatan dengan ujung δ+ molekul kedua.
                        Amati hasil interaksinya.
                    </p>
                )}

                {step === 1 && (
                    <p>
                        <strong>Percobaan 2:</strong> Putar molekul kedua sehingga kedua
                        ujung δ+ saling berdekatan. Apa yang berubah?
                    </p>
                )}

                {step === 2 && (
                    <p>
                        <strong>Percobaan 3:</strong> Jauhkan kedua molekul. Amati
                        bagaimana jarak memengaruhi interaksi.
                    </p>
                )}

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button onClick={() => setStep((s) => (s + 1) % 3)}>
                        Percobaan berikutnya
                    </button>
                    <button onClick={() => setStep(0)}>Kembali ke percobaan 1</button>
                </div>
            </div>

            <div
                style={{
                    background: '#e2f0ff',
                    padding: 14,
                    borderRadius: 10,
                    marginTop: 14,
                }}
            >
                <strong>Hasil pengamatan</strong>

                {interaction === 'attraction' && (
                    <p>
                        <strong style={{ color: '#16834a' }}>Tarikan elektrostatik cenderung dominan.</strong>
                        {' '}Orientasi kedua dipol mendukung interaksi antara ujung
                        bermuatan parsial yang berlawanan.
                    </p>
                )}

                {interaction === 'repulsion' && (
                    <p>
                        <strong style={{ color: '#c62828' }}>Tolakan elektrostatik cenderung dominan.</strong>
                        {' '}Orientasi kedua dipol menghasilkan susunan yang kurang
                        menguntungkan karena kutub sejenis saling berdekatan.
                    </p>
                )}

                {interaction === 'neutral' && (
                    <p>
                        Orientasi ini belum menunjukkan kecenderungan tarik atau tolak
                        yang dominan dalam model sederhana ini. Coba putar salah satu molekul.
                    </p>
                )}

                {interaction === 'weak' && (
                    <p>
                        Kedua molekul cukup berjauhan sehingga interaksi dipol-dipol
                        dalam model ini relatif lemah. Coba dekatkan kedua molekul.
                    </p>
                )}

                <p style={{ fontSize: 12, color: '#52677b', marginBottom: 0 }}>
                    Jarak antarmolekul pada model: {Math.round(distance)} satuan visual.
                    Hasil ini merupakan pendekatan konseptual, bukan pengukuran energi
                    interaksi molekul sebenarnya.
                </p>
            </div>

            <button
                onClick={() => setShowExplanation((value) => !value)}
                style={{
                    marginTop: 14,
                    padding: '10px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#246da8',
                    color: 'white',
                    cursor: 'pointer',
                }}
            >
                {showExplanation ? 'Tutup penjelasan konsep' : 'Lihat penjelasan konsep'}
            </button>

            {showExplanation && (
                <div
                    style={{
                        background: 'white',
                        padding: 14,
                        borderRadius: 10,
                        marginTop: 12,
                    }}
                >
                    <strong>Apa itu gaya dipol-dipol?</strong>

                    <p>
                        Gaya dipol-dipol merupakan gaya tarik elektrostatik antara
                        molekul-molekul polar. Molekul polar memiliki distribusi muatan
                        yang tidak merata sehingga mempunyai ujung bermuatan parsial
                        positif (δ+) dan negatif (δ−).
                    </p>

                    <p>
                        Ketika ujung δ+ dari satu molekul berdekatan dengan ujung δ−
                        molekul lainnya, keduanya dapat saling tarik-menarik. Sebaliknya,
                        ujung dengan muatan parsial sejenis dapat saling tolak-menolak.
                    </p>

                    <p>
                        Oleh karena itu, orientasi dan jarak antarmolekul memengaruhi
                        interaksi dipol-dipol. Molekul polar juga tetap mengalami gaya
                        dispersi London.
                    </p>

                    <p style={{ marginBottom: 0 }}>
                        Contoh molekul polar yang mengalami interaksi dipol-dipol
                        adalah HCl, SO₂, dan CH₂O.
                    </p>
                </div>
            )}

            <div
                style={{
                    background: '#fff7e6',
                    padding: 12,
                    borderRadius: 10,
                    marginTop: 14,
                    fontSize: 12,
                    color: '#73551b',
                }}
            >
                <strong>Catatan ilmiah:</strong> Gambar molekul merupakan model
                dua dimensi yang disederhanakan. Hasil tarik atau tolak menunjukkan
                kecenderungan orientasi dipol, bukan simulasi dinamika molekul
                sebenarnya. Gaya antarmolekul nyata juga dipengaruhi oleh bentuk
                molekul, distribusi muatan, dan jarak.
            </div>
        </div>
    );
}
