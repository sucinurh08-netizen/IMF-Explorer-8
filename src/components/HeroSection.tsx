import React from 'react';
import type { IMFProgress } from '../types/curriculum';
import { LEARNING_MODULES } from '../data/curriculumData';
import { InteractiveMoleculeHero } from './InteractiveMoleculeHero';

interface HeroSectionProps {
  progress: IMFProgress;
  onStartLearning: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ progress, onStartLearning }) => {
  const currentModule = LEARNING_MODULES.find((m) => m.id === progress.lastPage) || LEARNING_MODULES[0];
  const isStarted = progress.completedPages.length > 0;

  const scrollToRoadmap = () => {
    const el = document.getElementById('alur-belajar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrereq = () => {
    const el = document.getElementById('prasyarat');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="beranda" className="hero-section">
      <div className="content-wrapper">
        <div className="hero-grid">
          {/* Left Column: Narrative & CTA */}
          <div className="hero-text-col">
            <div className="hero-pill-badge">
              <span>🔬</span>
              <span>Kimia SMA/MA Kelas XI • Kurikulum Merdeka (Fase F)</span>
            </div>

            <h1 className="hero-title">
              IMF Explorer: <br />
              <span className="highlight">Jelajah Gaya Antarmolekul</span>
            </h1>

            <p className="hero-desc">
              Hubungkan fenomena makroskopik sehari-hari dengan interaksi submikroskopik tak kasat mata. 
              Pelajari mekanisme <strong>Gaya London</strong>, <strong>Gaya Dipol-Dipol</strong>, dan <strong>Ikatan Hidrogen</strong> melalui 
              simulasi visual bertahap dan siklus belajar 5E.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn-primary-large"
                onClick={onStartLearning}
              >
                <span>{isStarted ? `Lanjut Belajar: ${currentModule.title}` : 'Mulai Jelajah Kimia'}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <button
                type="button"
                className="btn-secondary-large"
                onClick={scrollToRoadmap}
              >
                <span>Lihat Alur 5E</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </button>

              <button
                type="button"
                className="btn-secondary-large"
                onClick={scrollToPrereq}
              >
                <span>Cek Prasyarat</span>
              </button>
            </div>

            {/* Quick stats row */}
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="stat-value">3 Gaya Utama</span>
                <span className="stat-label">London • Dipol • Ikatan H</span>
              </div>
              <div className="hero-stat-item">
                <span className="stat-value">7 Modul 5E</span>
                <span className="stat-label">Engage s.d. Evaluasi</span>
              </div>
              <div className="hero-stat-item">
                <span className="stat-value">15 Soal Evaluasi</span>
                <span className="stat-label">Formatif & Remedial Terarah</span>
              </div>
              <div className="hero-stat-item">
                <span className="stat-value">100% Lokal</span>
                <span className="stat-label">Tanpa Registrasi Akun</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Molecular Stage */}
          <div className="hero-visual-col">
            <InteractiveMoleculeHero />
          </div>
        </div>
      </div>
    </section>
  );
};
