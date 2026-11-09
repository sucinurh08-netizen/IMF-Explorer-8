import React from 'react';

interface EvaluatePlaceholderPageProps {
  onBackToHome: () => void;
  onOpenElaborate: () => void;
}

export const EvaluatePlaceholderPage: React.FC<EvaluatePlaceholderPageProps> = ({
  onBackToHome,
  onOpenElaborate,
}) => {
  return (
    <div className="module-page-container">
      {/* Topbar */}
      <header className="module-topbar">
        <div className="content-wrapper module-topbar-inner">
          <button
            type="button"
            className="btn-back-home"
            onClick={onBackToHome}
          >
            <span className="arrow-icon">←</span>
            <span>Kembali ke Beranda</span>
          </button>
          <div className="module-breadcrumbs">
            <span className="crumb" onClick={onBackToHome} style={{ cursor: 'pointer' }}>Beranda</span>
            <span className="separator">/</span>
            <span className="crumb current">Tahap 5: Evaluate (Penanda)</span>
          </div>
        </div>
      </header>

      <main className="content-wrapper" style={{ marginTop: '3.5rem', maxWidth: '820px' }}>
        <div className="article-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}>⏳</div>

          <span className="stage-badge" style={{ background: '#718096', marginBottom: '1rem', display: 'inline-block' }}>
            Tahap 5: Evaluate (Evaluasi Pembelajaran)
          </span>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-deep-forest)', fontWeight: 800, marginBottom: '1rem' }}>
            Bagian Ini Belum Diimplementasikan
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--color-muted-text)', lineHeight: 1.65, maxWidth: '640px', margin: '0 auto 2rem' }}>
            Sesuai dengan ketentuan ruang lingkup pengembangan proyek saat ini, implementasi dibatasi penuh pada <strong>Tahap 1 s.d. 4 (Engage, Explore, Explain, dan Elaborate)</strong>.
            <br /><br />
            Bank soal evaluasi akhir, sistem penilaian skor, dan rekomendasi remedial akan dibuka pada sesi instruksi pengembangan berikutnya.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary-large"
              onClick={onBackToHome}
              style={{ padding: '0.75rem 1.75rem' }}
            >
              🏠 Kembali ke Beranda Utama
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={onOpenElaborate}
              style={{ padding: '0.75rem 1.75rem', borderColor: 'var(--color-forest-green)', color: 'var(--color-forest-green)' }}
            >
              ← Buka Modul 6: Elaborate & Titik Didih
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

