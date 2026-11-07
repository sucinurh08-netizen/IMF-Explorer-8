
import React, { useState } from 'react';
import './Module2Closing.css';

type DiscoveryPost = {
    id: number;
    name: string;
    className: string;
    simulation: string;
    discovery: string;
    comments: string[];
};

const simulations = [
    {
        id: 'air-minyak',
        number: '01',
        title: 'Air dan Minyak',
        icon: '💧',
        color: 'blue',
        summary: 'Perbedaan polaritas memengaruhi kemampuan dua zat untuk bercampur.',
        finding: 'Air dan minyak membentuk dua lapisan karena interaksi antarmolekulnya berbeda.',
        detail: 'Air merupakan zat polar yang dapat membentuk ikatan hidrogen. Minyak tersusun terutama dari molekul nonpolar yang interaksi utamanya berupa gaya dispersi London. Perbedaan karakteristik interaksi tersebut menyebabkan air dan minyak tidak bercampur sempurna.',
        keyPoint: 'Minyak biasanya berada di atas air karena massa jenisnya lebih rendah, bukan semata-mata karena perbedaan polaritas.',
        visual: '💧 🫧 🟡'
    },
    {
        id: 'penguapan',
        number: '02',
        title: 'Penguapan Air',
        icon: '🌡️',
        color: 'orange',
        summary: 'Energi membantu molekul mengatasi gaya tarik antarmolekul.',
        finding: 'Sebagian molekul air dapat meninggalkan fase cair ketika memperoleh energi yang cukup.',
        detail: 'Ketika air dipanaskan, energi kinetik rata-rata molekul meningkat. Sebagian molekul di permukaan memperoleh energi yang cukup untuk mengatasi tarikan antarmolekul dan berpindah ke fase gas.',
        keyPoint: 'Pada penguapan, ikatan kovalen O–H di dalam molekul air tidak diputus.',
        visual: '💧 ♨️ ☁️'
    },
    {
        id: 'ion-dipol',
        number: '03',
        title: 'Ion-Dipol',
        icon: '⚡',
        color: 'purple',
        summary: 'Ion berinteraksi dengan bagian bermuatan parsial dari molekul polar.',
        finding: 'Ion Na⁺ tertarik pada ujung oksigen (δ−) molekul air.',
        detail: 'Molekul air memiliki kutub negatif parsial pada atom oksigen dan kutub positif parsial pada atom hidrogen. Ion positif seperti Na⁺ tertarik pada ujung oksigen, sedangkan ion negatif seperti Cl⁻ tertarik pada ujung hidrogen.',
        keyPoint: 'Gaya ion-dipol terjadi antara ion dan molekul polar.',
        visual: '➕ 💧 ➖'
    },
    {
        id: 'dipol-dipol',
        number: '04',
        title: 'Dipol-Dipol',
        icon: '🧲',
        color: 'pink',
        summary: 'Molekul polar dapat saling menarik melalui kutub-kutubnya.',
        finding: 'Ujung positif parsial suatu molekul dapat tertarik pada ujung negatif parsial molekul lain.',
        detail: 'Molekul polar mempunyai distribusi muatan yang tidak merata sehingga memiliki kutub positif parsial dan negatif parsial. Antarmolekul, kutub yang berlawanan dapat saling tarik-menarik.',
        keyPoint: 'Gaya dipol-dipol terjadi antarmolekul polar.',
        visual: 'δ⁺ ↔ δ⁻'
    },
    {
        id: 'london',
        number: '05',
        title: 'Dispersi London',
        icon: '✨',
        color: 'cyan',
        summary: 'Dipol sesaat dapat menginduksi dipol pada partikel di sekitarnya.',
        finding: 'Gaya dispersi London dapat terjadi pada semua atom dan molekul.',
        detail: 'Elektron selalu bergerak. Pada suatu saat, distribusi elektron dapat menjadi tidak merata dan membentuk dipol sesaat. Dipol tersebut dapat memengaruhi distribusi elektron partikel di dekatnya sehingga terbentuk dipol terinduksi.',
        keyPoint: 'Gaya dispersi London terdapat pada semua atom dan molekul, baik polar maupun nonpolar.',
        visual: '✨ ⚛️ ✨'
    },
    {
        id: 'ikatan-hidrogen',
        number: '06',
        title: 'Ikatan Hidrogen',
        icon: '🔗',
        color: 'green',
        summary: 'Interaksi khusus melibatkan H yang terikat pada F, O, atau N.',
        finding: 'Ikatan hidrogen melibatkan H yang terikat pada F, O, atau N dan pasangan elektron bebas F, O, atau N lain.',
        detail: 'Ikatan hidrogen merupakan interaksi antarmolekul yang terjadi ketika atom H yang terikat secara kovalen pada F, O, atau N berinteraksi dengan pasangan elektron bebas pada atom F, O, atau N dari molekul lain.',
        keyPoint: 'Ikatan hidrogen bukan ikatan kovalen O–H atau N–H di dalam satu molekul.',
        visual: 'H—O ··· H—O'
    }
];

const playSound = (type: 'pop' | 'success') => {
    try {
        const audioContext = new window.AudioContext();
        const notes = type === 'success'
            ? [523.25, 659.25, 783.99, 1046.5]
            : [620, 880];

        notes.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = frequency;

            const startTime = audioContext.currentTime + index * (
                type === 'success' ? 0.16 : 0.045
            );

            gain.gain.setValueAtTime(0.0001, startTime);
            gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.025);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22);

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.24);
        });

        window.setTimeout(() => {
            void audioContext.close();
        }, 1200);
    } catch {
        // Jika audio tidak didukung browser, fitur lainnya tetap berjalan.
    }
};

const Module2Closing: React.FC = () => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [selectedSimulation, setSelectedSimulation] = useState('');
    const [discovery, setDiscovery] = useState('');
    const [posts, setPosts] = useState<DiscoveryPost[]>([]);
    const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
    const [message, setMessage] = useState('');

    const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
    const [openedSimulations, setOpenedSimulations] = useState<string[]>([]);
    const [showCelebration, setShowCelebration] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const selectedInfo = simulations.find(
        (simulation) => simulation.id === selectedSimulation
    );

    const activeInfo = simulations.find(
        (simulation) => simulation.id === activeSimulation
    );

    const openSimulation = (simulationId: string) => {
        setActiveSimulation(simulationId);

        const isNew = !openedSimulations.includes(simulationId);

        if (isNew) {
            const updated = [...openedSimulations, simulationId];
            setOpenedSimulations(updated);

            if (soundEnabled) playSound('pop');

            if (updated.length === simulations.length) {
                setShowCelebration(true);
                if (soundEnabled) {
                    window.setTimeout(() => playSound('success'), 350);
                }
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name.trim() || !className.trim() || !selectedSimulation || !discovery.trim()) {
            setMessage('Lengkapi semua bagian sebelum mengirim temuanmu.');
            return;
        }

        const newPost: DiscoveryPost = {
            id: Date.now(),
            name: name.trim(),
            className: className.trim(),
            simulation: selectedInfo?.title || '',
            discovery: discovery.trim(),
            comments: []
        };

        setPosts((previousPosts) => [newPost, ...previousPosts]);

        setName('');
        setClassName('');
        setSelectedSimulation('');
        setDiscovery('');
        setMessage('🎉 Temuanmu berhasil ditambahkan ke Discovery Wall!');
    };

    const handleComment = (postId: number) => {
        const comment = commentInputs[postId]?.trim();

        if (!comment) return;

        setPosts((previousPosts) =>
            previousPosts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, comment] }
                    : post
            )
        );

        setCommentInputs((previous) => ({
            ...previous,
            [postId]: ''
        }));
    };

    return (
        <section className="module2-closing">

            {/* RANGKUMAN SIMULASI */}
            <div className="closing-heading">
                <span className="closing-eyebrow">YOUR EXPLORATION JOURNEY</span>
                <h2>Enam Simulasi, Banyak Penemuan!</h2>
                <p>
                    Tekan setiap kartu untuk membuka kembali penemuan penting
                    dari perjalanan eksplorasimu.
                </p>
            </div>

            <div className="summary-progress">
                <div className="summary-progress-info">
                    <span>Perjalanan eksplorasimu</span>
                    <strong>{openedSimulations.length} / 6 konsep dibuka</strong>
                </div>
                <div className="summary-progress-track">
                    <div
                        className="summary-progress-fill"
                        style={{ width: `${(openedSimulations.length / 6) * 100}%` }}
                    />
                </div>
            </div>

            <div className="discovery-summary-grid">
                {simulations.map((simulation) => {
                    const isOpened = openedSimulations.includes(simulation.id);

                    return (
                        <button
                            type="button"
                            className={`summary-card summary-${simulation.color} ${isOpened ? 'summary-opened' : ''}`}
                            key={simulation.id}
                            onClick={() => openSimulation(simulation.id)}
                        >
                            <div className="summary-card-top">
                                <span className="summary-number">{simulation.number}</span>
                                <span className="summary-icon">{simulation.icon}</span>
                            </div>

                            <h3>{simulation.title}</h3>
                            <p>{simulation.summary}</p>

                            <div className="summary-card-footer">
                                <span>{isOpened ? '✓ Sudah dipelajari' : 'Buka penemuan →'}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="closing-takeaway">
                <span className="takeaway-icon">💡</span>
                <div>
                    <strong>Apa kesimpulan besarnya?</strong>
                    <p>
                        Gaya antarmolekul merupakan interaksi antara partikel
                        yang berperan dalam berbagai fenomena, seperti
                        pencampuran zat, penguapan, dan interaksi antarpartikel.
                    </p>
                </div>
            </div>

            {/* POPUP DETAIL SIMULASI */}
            {activeInfo && (
                <div
                    className="summary-modal-overlay"
                    onClick={() => setActiveSimulation(null)}
                >
                    <div
                        className="summary-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="summary-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="summary-modal-close"
                            onClick={() => setActiveSimulation(null)}
                            aria-label="Tutup popup"
                        >
                            ×
                        </button>

                        <div className={`summary-modal-banner summary-${activeInfo.color}`}>
                            <span className="summary-modal-number">
                                SIMULASI {activeInfo.number}
                            </span>
                            <div className="summary-modal-visual">
                                {activeInfo.visual}
                            </div>
                            <span className="summary-modal-caption">
                                {activeInfo.title}
                            </span>
                        </div>

                        <div className="summary-modal-content">
                            <span className="closing-eyebrow">DISCOVERY MOMENT</span>
                            <h2 id="summary-modal-title">{activeInfo.title}</h2>
                            <p>{activeInfo.detail}</p>

                            <div className="summary-keypoint">
                                <span>💡</span>
                                <div>
                                    <strong>Ingat hal penting ini!</strong>
                                    <p>{activeInfo.keyPoint}</p>
                                </div>
                            </div>

                            <div className="summary-modal-actions">
                                <button
                                    type="button"
                                    className="summary-modal-next"
                                    onClick={() => {
                                        const currentIndex = simulations.findIndex(
                                            (item) => item.id === activeInfo.id
                                        );
                                        const next = simulations[currentIndex + 1];

                                        if (next) {
                                            openSimulation(next.id);
                                        } else {
                                            setActiveSimulation(null);
                                        }
                                    }}
                                >
                                    {activeInfo.number === '06'
                                        ? 'Selesai menjelajah ✓'
                                        : 'Konsep berikutnya →'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CELEBRATION */}
            {showCelebration && (
                <div
                    className="celebration-overlay"
                    onClick={() => setShowCelebration(false)}
                >
                    <div
                        className="celebration-card"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="celebration-close"
                            onClick={() => setShowCelebration(false)}
                            aria-label="Tutup perayaan"
                        >
                            ×
                        </button>

                        <div className="celebration-fireworks">
                            <span>🎆</span>
                            <span>✨</span>
                            <span>🎇</span>
                            <span>🎊</span>
                            <span>🎆</span>
                        </div>

                        <div className="celebration-confetti">🎉 🎊 ✨ 🎈 🎉</div>

                        <span className="closing-eyebrow">
                            EXPLORATION COMPLETED
                        </span>

                        <h2>Wah, Hebat Sekali!</h2>

                        <div className="celebration-clap">👏 🎉 👏</div>

                        <p>
                            Kamu berhasil membuka dan mempelajari keenam konsep
                            gaya antarmolekul. Terus pertahankan rasa ingin tahumu!
                        </p>

                        <div className="celebration-score">
                            <strong>6 / 6</strong>
                            <span>SEMUA KONSEP BERHASIL DIBUKA</span>
                        </div>

                        <button
                            type="button"
                            className="celebration-button"
                            onClick={() => setShowCelebration(false)}
                        >
                            Lanjutkan eksplorasi ✨
                        </button>
                    </div>
                </div>
            )}

            {/* DISCOVERY WALL */}
            <div className="discovery-wall-heading">
                <span className="closing-eyebrow">SHARE YOUR DISCOVERY</span>
                <h2>Discovery Wall</h2>
                <p>
                    Setiap penjelajah punya penemuan. Bagikan satu hal yang
                    paling menarik atau mengejutkan menurutmu!
                </p>
            </div>

            <div className="discovery-sound-control">
                <span>🔊 Efek suara</span>
                <button
                    type="button"
                    onClick={() => setSoundEnabled((previous) => !previous)}
                >
                    {soundEnabled ? 'Suara aktif' : 'Suara mati'}
                </button>
            </div>

            {/* FORM TEMUAN */}
            <form className="discovery-form" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <span className="form-heading-icon">🔬</span>
                    <div>
                        <h3>Bagikan Temuanmu</h3>
                        <p>Tuliskan hasil pengamatanmu setelah menjelajahi simulasi.</p>
                    </div>
                </div>

                <div className="discovery-form-grid">
                    <div className="discovery-field">
                        <label htmlFor="student-name">Nama lengkap</label>
                        <input
                            id="student-name"
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>

                    <div className="discovery-field">
                        <label htmlFor="student-class">Kelas</label>
                        <input
                            id="student-class"
                            type="text"
                            placeholder="Contoh: XI-2"
                            value={className}
                            onChange={(event) => setClassName(event.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="discovery-field">
                    <label htmlFor="selected-simulation">
                        Simulasi yang kamu amati
                    </label>
                    <select
                        id="selected-simulation"
                        value={selectedSimulation}
                        onChange={(event) => setSelectedSimulation(event.target.value)}
                        required
                    >
                        <option value="">Pilih simulasi</option>
                        {simulations.map((simulation) => (
                            <option key={simulation.id} value={simulation.id}>
                                {simulation.number}. {simulation.title}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedInfo && (
                    <div className="discovery-hint">
                        <span>{selectedInfo.icon}</span>
                        <p>
                            <strong>Petunjuk pengamatan:</strong> {selectedInfo.finding}
                        </p>
                    </div>
                )}

                <div className="discovery-field">
                    <label htmlFor="student-discovery">Apa yang kamu temukan?</label>
                    <textarea
                        id="student-discovery"
                        placeholder="Ceritakan hal yang kamu amati, pahami, atau temukan dari simulasi..."
                        value={discovery}
                        onChange={(event) => setDiscovery(event.target.value)}
                        rows={5}
                        minLength={10}
                        required
                    />
                    <span className="field-note">
                        Tuliskan minimal satu temuan dengan bahasamu sendiri.
                    </span>
                </div>

                {message && (
                    <div className="discovery-message" role="status">
                        {message}
                    </div>
                )}

                <button className="discovery-submit-button" type="submit">
                    Kirim Temuanku <span>→</span>
                </button>
            </form>

            {/* KUMPULAN TEMUAN */}
            <div className="wall-posts-heading">
                <div>
                    <span className="closing-eyebrow">CLASS DISCOVERIES</span>
                    <h3>Temuan Para Penjelajah</h3>
                </div>
                <span className="post-count">{posts.length} temuan</span>
            </div>

            {posts.length === 0 ? (
                <div className="discovery-empty">
                    <span>🌱</span>
                    <h3>Jadilah penjelajah pertama!</h3>
                    <p>
                        Temuanmu akan muncul di sini setelah kamu mengirimkannya.
                        Baca dan tanggapi juga temuan teman-temanmu.
                    </p>
                </div>
            ) : (
                <div className="discovery-post-list">
                    {posts.map((post) => (
                        <article className="discovery-post" key={post.id}>
                            <div className="post-top">
                                <div className="post-avatar">
                                    {post.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="post-author">
                                    <strong>{post.name}</strong>
                                    <span>{post.className} · Baru saja</span>
                                </div>
                                <span className="post-simulation-tag">
                                    {post.simulation}
                                </span>
                            </div>

                            <p className="post-discovery-text">{post.discovery}</p>

                            <div className="post-comments">
                                <strong>💬 Tanggapan teman ({post.comments.length})</strong>

                                {post.comments.map((comment, index) => (
                                    <p className="post-comment" key={index}>
                                        {comment}
                                    </p>
                                ))}

                                <div className="comment-input-row">
                                    <input
                                        type="text"
                                        placeholder="Tulis tanggapan yang membangun..."
                                        value={commentInputs[post.id] || ''}
                                        onChange={(event) =>
                                            setCommentInputs((previous) => ({
                                                ...previous,
                                                [post.id]: event.target.value
                                            }))
                                        }
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                event.preventDefault();
                                                handleComment(post.id);
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleComment(post.id)}
                                        disabled={!commentInputs[post.id]?.trim()}
                                    >
                                        Kirim
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

        </section>
    );
};

export default Module2Closing;
