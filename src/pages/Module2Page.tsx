
import React from 'react';
import { useNavigate } from 'react-router-dom';

import WaterOilSimulation from '../components/WaterOilSimulation';
import WaterEvaporationSimulation from '../components/WaterEvaporationSimulation';
import IonDipoleSimulation from '../components/IonDipoleSimulation';
import DipoleDipoleSimulation from '../components/DipoleDipoleSimulation';
import LondonDispersionSimulation from '../components/LondonDispersionSimulation';
import HydrogenBondingSimulation from '../components/HydrogenBondingSimulation';
import Module2Closing from '../components/Module2Closing';

import './Module1Page.css';

const Module2Page: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
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
                        ← Kembali ke Beranda
                    </button>
                </div>
            </header>

            <main className="lesson-main">

                {/* Hero Materi */}
                <section className="lesson-hero">
                    <div className="lesson-hero-content">
                        <span className="lesson-eyebrow">
                            TAHAP 2 · EXPLORE
                        </span>

                        <h1>Mengenal Gaya Antarmolekul</h1>

                        <p className="lesson-hero-description">
                            Amati, bandingkan, dan temukan bagaimana molekul-molekul
                            dapat saling berinteraksi.
                        </p>

                        <div className="lesson-meta">
                            <span>🧪 Pembelajaran Kimia</span>
                            <span>🔍 Kegiatan Eksplorasi</span>
                            <span>⚛️ Simulasi Submikroskopik</span>
                        </div>
                    </div>

                    <div className="lesson-hero-decoration">
                        <span className="lesson-molecule">H₂O</span>
                        <span className="lesson-molecule-small">Na⁺</span>
                        <span className="lesson-decoration-caption">
                            Interaksi antarpartikel
                        </span>
                    </div>
                </section>

                {/* Tujuan Eksplorasi */}
                <section className="lesson-concept">
                    <div className="lesson-concept-icon">💡</div>
                    <div>
                        <span className="lesson-section-label">
                            TUJUAN EKSPLORASI
                        </span>
                        <p>
                            Mengenali pengertian gaya antarmolekul, membedakan
                            ikatan intramolekul dan gaya antarmolekul, serta
                            mengeksplorasi berbagai jenis interaksi antarpartikel.
                        </p>
                    </div>
                </section>

                {/* Enam Simulasi Interaktif */}
                <WaterOilSimulation />

                <WaterEvaporationSimulation />

                <IonDipoleSimulation />

                <DipoleDipoleSimulation />

                <LondonDispersionSimulation />

                <HydrogenBondingSimulation />

                {/* Rangkuman dan Discovery Wall */}
                <Module2Closing />

                {/* Navigasi Bawah */}
                <div className="lesson-bottom-navigation">
                    <button onClick={handleBack}>
                        ← Kembali ke Beranda
                    </button>
                    <span>IMF Explorer · Pembelajaran Kimia</span>
                </div>

            </main>
        </div>
    );
};

export default Module2Page;
