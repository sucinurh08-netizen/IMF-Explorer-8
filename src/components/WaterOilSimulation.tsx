
import { useEffect, useState } from 'react';
import type { PointerEvent } from 'react';

type ParticleType = 'water' | 'oil';

type Particle = {
    id: number;
    x: number;
    y: number;
    type: ParticleType;
};

type Condition = 'initial' | 'mixed' | 'settled';

const initialParticles: Particle[] = [
    // Molekul minyak
    { id: 1, x: 100, y: 65, type: 'oil' },
    { id: 2, x: 165, y: 75, type: 'oil' },
    { id: 3, x: 230, y: 60, type: 'oil' },
    { id: 4, x: 300, y: 75, type: 'oil' },
    { id: 5, x: 370, y: 65, type: 'oil' },
    { id: 6, x: 130, y: 110, type: 'oil' },
    { id: 7, x: 260, y: 105, type: 'oil' },
    { id: 8, x: 350, y: 110, type: 'oil' },

    // Molekul air
    { id: 9, x: 100, y: 195, type: 'water' },
    { id: 10, x: 165, y: 210, type: 'water' },
    { id: 11, x: 230, y: 190, type: 'water' },
    { id: 12, x: 300, y: 210, type: 'water' },
    { id: 13, x: 370, y: 195, type: 'water' },
    { id: 14, x: 130, y: 245, type: 'water' },
    { id: 15, x: 260, y: 245, type: 'water' },
    { id: 16, x: 350, y: 245, type: 'water' },
];

const randomPosition = (min: number, max: number) =>
    min + Math.random() * (max - min);

export default function WaterOilSimulation() {
    const [particles, setParticles] = useState<Particle[]>(initialParticles);
    const [condition, setCondition] = useState<Condition>('initial');
    const [temperature, setTemperature] = useState(50);
    const [isRunning, setIsRunning] = useState(true);
    const [draggingId, setDraggingId] = useState<number | null>(null);

    // Gerakan acak sederhana untuk menggambarkan gerak partikel
    useEffect(() => {
        if (!isRunning) return;

        const timer = window.setInterval(() => {
            setParticles((previous) =>
                previous.map((particle) => {
                    if (particle.id === draggingId) return particle;

                    const movement = 0.3 + temperature / 35;

                    let nextX = particle.x + randomPosition(-movement, movement);
                    let nextY = particle.y + randomPosition(-movement, movement);

                    nextX = Math.max(35, Math.min(465, nextX));
                    nextY = Math.max(35, Math.min(265, nextY));

                    // Pada kondisi awal dan setelah didiamkan,
                    // partikel tetap berada pada lapisan masing-masing.
                    if (condition !== 'mixed') {
                        if (particle.type === 'oil') {
                            nextY = Math.max(40, Math.min(130, nextY));
                        } else {
                            nextY = Math.max(165, Math.min(260, nextY));
                        }
                    }

                    return { ...particle, x: nextX, y: nextY };
                })
            );
        }, 60);

        return () => window.clearInterval(timer);
    }, [isRunning, temperature, condition, draggingId]);

    const mixParticles = () => {
        setCondition('mixed');

        setParticles((previous) =>
            previous.map((particle) => ({
                ...particle,
                x: randomPosition(45, 455),
                y: randomPosition(45, 255),
            }))
        );
    };

    const letParticlesSettle = () => {
        setCondition('settled');

        setParticles((previous) =>
            previous.map((particle) => ({
                ...particle,
                x: randomPosition(45, 455),
                y:
                    particle.type === 'oil'
                        ? randomPosition(45, 125)
                        : randomPosition(165, 255),
            }))
        );
    };

    const resetSimulation = () => {
        setParticles(initialParticles);
        setCondition('initial');
        setTemperature(50);
        setIsRunning(true);
        setDraggingId(null);
    };

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        if (draggingId === null) return;

        const rect = event.currentTarget.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 500;
        const y = ((event.clientY - rect.top) / rect.height) * 300;

        setParticles((previous) =>
            previous.map((particle) =>
                particle.id === draggingId
                    ? {
                        ...particle,
                        x: Math.max(30, Math.min(470, x)),
                        y: Math.max(30, Math.min(270, y)),
                    }
                    : particle
            )
        );
    };

    const conditionTitle = {
        initial: 'Kondisi awal: air dan minyak terpisah',
        mixed: 'Kondisi pencampuran: air dan minyak diaduk',
        settled: 'Kondisi setelah didiamkan: terbentuk dua lapisan',
    };

    const conditionExplanation = {
        initial:
            'Amati kedua jenis partikel. Air merupakan zat polar, sedangkan minyak terutama tersusun atas molekul hidrokarbon yang bersifat nonpolar. Keduanya memiliki karakteristik interaksi antarmolekul yang berbeda.',
        mixed:
            'Ketika campuran diaduk, minyak dapat terpecah menjadi tetesan-tetesan kecil yang tersebar di antara air. Namun, penyebaran sementara ini tidak berarti air dan minyak telah membentuk campuran homogen.',
        settled:
            'Setelah didiamkan, tetesan minyak bergabung kembali dan membentuk lapisan terpisah. Interaksi antara air dan minyak tidak cukup menguntungkan untuk mempertahankan campuran homogen. Minyak umumnya berada di lapisan atas karena massa jenisnya lebih rendah daripada air.',
    };

    const focusQuestion = {
        initial:
            'Apa perbedaan sifat kepolaran air dan minyak?',
        mixed:
            'Apakah pengadukan membuat air dan minyak benar-benar bercampur secara homogen?',
        settled:
            'Mengapa air dan minyak kembali membentuk dua lapisan setelah didiamkan?',
    };

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
                Laboratorium Air dan Minyak
            </h2>

            <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Mengapa air dan minyak tidak dapat bercampur?
                Melalui simulasi ini, kamu akan mengamati
                perbedaan sifat molekul air dan minyak serta
                hubungannya dengan gaya antarmolekul.
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
                    viewBox="0 0 500 300"
                    width="100%"
                    role="img"
                    aria-label="Simulasi partikel air dan minyak"
                    onPointerMove={handlePointerMove}
                    onPointerUp={() => setDraggingId(null)}
                    onPointerLeave={() => setDraggingId(null)}
                >
                    {/* Latar lapisan */}
                    <rect
                        x="10"
                        y="20"
                        width="480"
                        height="260"
                        rx="15"
                        fill="#f1f5f9"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                    />

                    {condition !== 'mixed' && (
                        <>
                            <rect
                                x="12"
                                y="22"
                                width="476"
                                height="118"
                                rx="12"
                                fill="#fef3c7"
                                opacity="0.55"
                            />

                            <rect
                                x="12"
                                y="150"
                                width="476"
                                height="128"
                                rx="12"
                                fill="#bfdbfe"
                                opacity="0.65"
                            />
                        </>
                    )}

                    {condition === 'mixed' && (
                        <rect
                            x="12"
                            y="22"
                            width="476"
                            height="256"
                            rx="12"
                            fill="#dbeafe"
                            opacity="0.35"
                        />
                    )}

                    <text
                        x="30"
                        y="43"
                        fontSize="12"
                        fontWeight="bold"
                        fill="#92400e"
                    >
                        Minyak
                    </text>

                    <text
                        x="30"
                        y="270"
                        fontSize="12"
                        fontWeight="bold"
                        fill="#1d4ed8"
                    >
                        Air
                    </text>

                    {/* Partikel dan ikatan hidrogen konseptual */}
                    {condition !== 'mixed' && (
                        <g
                            stroke="#2563eb"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            opacity="0.55"
                        >
                            {particles
                                .filter((particle) => particle.type === 'water')
                                .slice(0, 6)
                                .map((particle, index, group) => {
                                    const next = group[(index + 1) % group.length];

                                    return (
                                        <line
                                            key={`bond-${particle.id}`}
                                            x1={particle.x}
                                            y1={particle.y}
                                            x2={next.x}
                                            y2={next.y}
                                        />
                                    );
                                })}
                        </g>
                    )}

                    {particles.map((particle) => (
                        <g
                            key={particle.id}
                            onPointerDown={(event) => {
                                event.stopPropagation();
                                setDraggingId(particle.id);
                            }}
                            style={{ cursor: 'grab', touchAction: 'none' }}
                        >
                            {particle.type === 'water' ? (
                                <>
                                    <circle
                                        cx={particle.x}
                                        cy={particle.y}
                                        r="13"
                                        fill="#ef4444"
                                        stroke="#991b1b"
                                        strokeWidth="1.5"
                                    />

                                    <circle
                                        cx={particle.x - 12}
                                        cy={particle.y - 10}
                                        r="7"
                                        fill="#f8fafc"
                                        stroke="#64748b"
                                    />

                                    <circle
                                        cx={particle.x + 12}
                                        cy={particle.y - 10}
                                        r="7"
                                        fill="#f8fafc"
                                        stroke="#64748b"
                                    />
                                </>
                            ) : (
                                <g>
                                    <circle
                                        cx={particle.x}
                                        cy={particle.y}
                                        r="15"
                                        fill="#f59e0b"
                                        stroke="#92400e"
                                        strokeWidth="1.5"
                                    />

                                    <circle
                                        cx={particle.x - 8}
                                        cy={particle.y - 5}
                                        r="4"
                                        fill="#fef3c7"
                                    />

                                    <circle
                                        cx={particle.x + 7}
                                        cy={particle.y + 6}
                                        r="4"
                                        fill="#fef3c7"
                                    />
                                </g>
                            )}
                        </g>
                    ))}
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
                    <span>🔴⚪ Molekul air (H₂O)</span>
                    <span>🟠 Partikel minyak (ilustrasi)</span>
                    <span>╌╌ Interaksi antarmolekul air</span>
                </div>

                <p
                    style={{
                        fontSize: '12px',
                        color: '#64748b',
                        textAlign: 'center',
                        marginBottom: 0,
                    }}
                >
                    Kamu dapat menyeret partikel menggunakan mouse
                    atau layar sentuh.
                </p>
            </div>

            {/* Pengaturan simulasi */}
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
                    <button onClick={mixParticles}>
                        Campurkan
                    </button>

                    <button onClick={letParticlesSettle}>
                        Diamkan
                    </button>

                    <button onClick={resetSimulation}>
                        Ulangi
                    </button>

                    <button onClick={() => setIsRunning(!isRunning)}>
                        {isRunning ? 'Jeda gerakan' : 'Lanjutkan gerakan'}
                    </button>
                </div>

                <div style={{ marginTop: '18px' }}>
                    <label
                        htmlFor="water-oil-temperature"
                        style={{ fontWeight: 'bold', color: '#334155' }}
                    >
                        Suhu simulasi: {temperature}%
                    </label>

                    <input
                        id="water-oil-temperature"
                        type="range"
                        min="0"
                        max="100"
                        value={temperature}
                        onChange={(event) =>
                            setTemperature(Number(event.target.value))
                        }
                        style={{ display: 'block', width: '100%', marginTop: '8px' }}
                    />

                    <p
                        style={{
                            fontSize: '12px',
                            color: '#64748b',
                            marginBottom: 0,
                        }}
                    >
                        Pengaturan ini mengubah kecepatan gerak partikel
                        dalam model, bukan menghitung perubahan suhu
                        atau kelarutan secara nyata.
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
                        Amati kondisi awal partikel air dan minyak
                        pada wadah simulasi.
                    </li>
                    <li>
                        Perhatikan perbedaan ilustrasi kedua jenis
                        partikel dan lapisan yang terbentuk.
                    </li>
                    <li>
                        Klik <strong>Campurkan</strong> untuk melihat
                        bagaimana partikel air dan minyak tersebar
                        ketika diaduk.
                    </li>
                    <li>
                        Klik <strong>Diamkan</strong> untuk mengamati
                        perubahan susunan partikel setelah campuran
                        dibiarkan.
                    </li>
                    <li>
                        Gunakan tombol jeda dan lanjutkan untuk
                        mengamati gerakan partikel dengan lebih teliti.
                    </li>
                    <li>
                        Baca penjelasan setiap kondisi dan jawab
                        pertanyaan pengamatan yang tersedia.
                    </li>
                </ol>
            </div>

            {/* Penjelasan berdasarkan kondisi */}
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

                <p>{conditionExplanation[condition]}</p>

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
                    Memahami Konsep: Mengapa Air dan Minyak Tidak Bercampur?
                </h3>

                <p>
                    Molekul air (H₂O) bersifat polar karena memiliki
                    distribusi muatan yang tidak merata. Antarmolekul
                    air terdapat gaya tarik-menarik dipol-dipol,
                    termasuk ikatan hidrogen.
                </p>

                <p>
                    Sebaliknya, minyak terutama tersusun atas
                    molekul hidrokarbon yang bersifat nonpolar.
                    Interaksi antarmolekul yang dominan pada
                    hidrokarbon adalah gaya dispersi London.
                </p>

                <p>
                    Ketika air dan minyak dicampurkan, interaksi
                    antara molekul air dan molekul minyak tidak
                    cukup menguntungkan untuk menghasilkan campuran
                    homogen yang stabil. Karena itu, keduanya
                    cenderung membentuk dua lapisan.
                </p>

                <strong>Ingat:</strong>
                <p style={{ marginBottom: 0 }}>
                    Zat dengan karakteristik kepolaran yang serupa
                    cenderung lebih mudah bercampur. Minyak biasanya
                    berada di atas air karena massa jenisnya lebih
                    rendah, bukan karena sifat nonpolarnya.
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
                        Mengapa molekul air disebut polar, sedangkan
                        molekul hidrokarbon dalam minyak umumnya nonpolar?
                    </li>
                    <li>
                        Mengapa air dan minyak dapat tersebar sementara
                        ketika diaduk, tetapi kembali membentuk dua
                        lapisan setelah didiamkan?
                    </li>
                    <li>
                        Apa hubungan antara perbedaan interaksi
                        antarmolekul dengan kemampuan dua zat untuk
                        bercampur?
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
                Catatan: Simulasi ini merupakan model konseptual.
                Partikel minyak digambarkan secara sederhana,
                bukan struktur molekul minyak yang sebenarnya.
                Gerakan partikel tidak dihitung berdasarkan
                persamaan dinamika molekul atau gaya antarmolekul
                secara kuantitatif.
            </p>
        </section>
    );
}
