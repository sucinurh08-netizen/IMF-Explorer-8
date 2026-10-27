import React from 'react';
import type { IMFProgress } from '../types/curriculum';
import { calculateProgressPercentage } from '../utils/storage';

interface NavbarProps {
  progress: IMFProgress;
  onOpenResetModal: () => void;
  onStartLearning: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  onOpenResetModal,
  onStartLearning,
}) => {
  const percentage = calculateProgressPercentage(progress.completedPages, 7);
  const isStarted = progress.completedPages.length > 0 || progress.lastPage !== 'fenomena-air-minyak';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="content-wrapper">
        <div className="navbar-inner">
          {/* Brand */}
          <a href="#" className="brand-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="brand-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <line x1="14.5" y1="9.5" x2="17.5" y2="6.5" />
                <line x1="9.5" y1="14.5" x2="6.5" y2="17.5" />
                <line x1="14.5" y1="14.5" x2="17.5" y2="17.5" strokeDasharray="2 2" />
              </svg>
            </div>
            <div className="brand-meta">
              <span className="brand-title">IMF Explorer</span>
              <span className="brand-badge">Kimia SMA Kelas XI • Fase F</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav aria-label="Navigasi Utama">
            <ul className="nav-links">
              <li>
                <button type="button" className="nav-link" onClick={() => scrollTo('beranda')}>
                  Beranda
                </button>
              </li>
              <li>
                <button type="button" className="nav-link" onClick={() => scrollTo('alur-belajar')}>
                  Alur Belajar 5E
                </button>
              </li>
              <li>
                <button type="button" className="nav-link" onClick={() => scrollTo('tiga-gaya')}>
                  3 Gaya Antarmolekul
                </button>
              </li>
              <li>
                <button type="button" className="nav-link" onClick={() => scrollTo('prasyarat')}>
                  Prasyarat Konsep
                </button>
              </li>
              <li>
                <button type="button" className="nav-link" onClick={() => scrollTo('pedagogi')}>
                  Kerangka Kimia
                </button>
              </li>
            </ul>
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            {isStarted ? (
              <>
                <div
                  className="nav-progress-chip"
                  title="Klik untuk melihat progres belajar Anda"
                  onClick={() => scrollTo('progres')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>{percentage}% Selesai</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenResetModal}
                  title="Atur ulang progres belajar"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-muted-text)',
                    padding: '0.35rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  Reset
                </button>
              </>
            ) : null}

            <button
              type="button"
              className="nav-cta-btn"
              onClick={onStartLearning}
            >
              <span>{isStarted ? 'Lanjut Belajar' : 'Mulai Belajar'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
