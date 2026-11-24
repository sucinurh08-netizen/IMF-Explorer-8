
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import type { IMFProgress } from '../types/curriculum';
import { calculateProgressPercentage } from '../utils/storage';
import { supabase, isSupabaseConfigured } from '../utils/supabase';

interface NavbarProps {
  progress: IMFProgress;
  onOpenResetModal: () => void;
  onStartLearning: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  onOpenResetModal,
}) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCurrentUser(null);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Tutup sidebar dengan Escape dan kunci scroll halaman
  useEffect(() => {
    if (!isSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen]);

  const handleLogout = async () => {
    if (!isSupabaseConfigured) {
      setCurrentUser(null);
      setIsSidebarOpen(false);
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Gagal keluar dari akun:', error);
      return;
    }

    setCurrentUser(null);
    setIsSidebarOpen(false);
  };

  const percentage = calculateProgressPercentage(
    progress.completedPages,
    7
  );

  const isStarted =
    progress.completedPages.length > 0 ||
    progress.lastPage !== 'fenomena-air-minyak';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    setIsSidebarOpen(false);
  };

  const navigationItems = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Alur Belajar 5E', id: 'alur-belajar' },
    { label: '3 Gaya Antarmolekul', id: 'tiga-gaya' },
    { label: 'Prasyarat Konsep', id: 'prasyarat' },
    { label: 'Kerangka Kimia', id: 'pedagogi' },
  ];

  return (
    <>
      {/* Navbar Atas */}
      <header className="navbar">
        <div className="content-wrapper">
          <div className="navbar-inner">

            {/* Tombol Hamburger */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Buka navigasi"
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar-navigation"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Progres dan Reset tetap tersedia di navbar */}
            <div className="nav-actions">
              {isStarted && (
                <>
                  <button
                    type="button"
                    className="nav-progress-chip"
                    title="Klik untuk melihat progres belajar Anda"
                    onClick={() => scrollTo('progres')}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>{percentage}% Selesai</span>
                  </button>

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
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay Gelap */}
      {isSidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Tutup navigasi"
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar-navigation"
        className={`sidebar-navigation ${isSidebarOpen ? 'open' : ''}`}
        aria-hidden={!isSidebarOpen}
        aria-label="Navigasi utama"
      >
        {/* Logo dan Identitas Website */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon-box">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <line x1="14.5" y1="9.5" x2="17.5" y2="6.5" />
                <line x1="9.5" y1="14.5" x2="6.5" y2="17.5" />
                <line
                  x1="14.5"
                  y1="14.5"
                  x2="17.5"
                  y2="17.5"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            <div className="brand-meta">
              <span className="brand-title">IMF Explorer</span>
              <span className="brand-badge">
                Kimia SMA Kelas XI • Fase F
              </span>
            </div>
          </div>

          {/* Tombol Tutup */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Tutup navigasi"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Menu Navigasi */}
        <div className="sidebar-content">
          <p className="sidebar-section-label">MENU NAVIGASI</p>

          <nav aria-label="Navigasi Utama">
            <ul className="sidebar-nav-links">
              {navigationItems.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="sidebar-nav-link"
                    onClick={() => scrollTo(item.id)}
                  >
                    <span className="sidebar-nav-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span>{item.label}</span>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Login / Logout di Dalam Sidebar */}
        <div className="sidebar-footer">
          {currentUser ? (
            <div className="sidebar-account">
              <div className="sidebar-user-info">
                <span className="sidebar-user-label">
                  Sedang masuk sebagai
                </span>
                <span className="sidebar-user-name">
                  {currentUser.user_metadata?.full_name ||
                    currentUser.email?.split('@')[0]}
                </span>
              </div>

              <button
                type="button"
                className="sidebar-account-btn"
                onClick={handleLogout}
              >
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="sidebar-account-btn"
              onClick={() => {
                setIsSidebarOpen(false);
                navigate('/login');
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>Masuk</span>
            </button>
          )}

          <div className="sidebar-footer-brand">
            IMF Explorer
          </div>
        </div>
      </aside>
    </>
  );
};
