
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODULE_1 } from '../data/module1';
import { MODULE_1_CONTENT } from '../data/module1Content';
import QuizPlaceholder from '../components/QuizPlaceholder';
import './Module1Page.css';

// Mengubah teks **tebal** menjadi tulisan tebal.
const renderFormattedText = (text: string) => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

// Menampilkan paragraf, daftar, dan teks materi dengan format yang rapi.
const renderBody = (body: string) => {
  return body.split('\n').map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) return null;

    if (trimmedLine.startsWith('- ')) {
      return (
        <div className="lesson-list-item" key={index}>
          <span className="lesson-list-dot">•</span>
          <p>{renderFormattedText(trimmedLine.slice(2))}</p>
        </div>
      );
    }

    const numbered = trimmedLine.match(/^(\d+)\.\s*(.*)$/);

    if (numbered) {
      return (
        <div className="lesson-list-item" key={index}>
          <span className="lesson-list-number">{numbered[1]}</span>
          <p>{renderFormattedText(numbered[2])}</p>
        </div>
      );
    }

    return (
      <p className="lesson-paragraph" key={index}>
        {renderFormattedText(trimmedLine)}
      </p>
    );
  });
};

const Module1Page: React.FC = () => {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`draft-${MODULE_1.id}`);

      if (saved) {
        setDraft(JSON.parse(saved));
      }
    } catch {
      console.warn('Gagal membaca draft kuis.');
    }
  }, []);

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
              TAHAP 1 · ENGAGE
            </span>

            <h1>{MODULE_1.title}</h1>

            <p className="lesson-hero-description">
              {MODULE_1.shortDesc}
            </p>

            <div className="lesson-meta">
              <span>📖 {MODULE_1_CONTENT.length} bagian materi</span>
              <span>⏱ {MODULE_1.durationMin} menit</span>
              <span>🧪 Pembelajaran Kimia</span>
            </div>
          </div>

          <div className="lesson-hero-decoration">
            <span className="lesson-molecule">H₂O</span>
            <span className="lesson-molecule-small">Oil</span>
            <span className="lesson-decoration-caption">
              Polaritas dan interaksi molekul
            </span>
          </div>
        </section>

        {/* Konsep Utama */}
        <section className="lesson-concept">
          <div className="lesson-concept-icon">💡</div>
          <div>
            <span className="lesson-section-label">KONSEP UTAMA</span>
            <p>{MODULE_1.scientificNotes}</p>
          </div>
        </section>

        {/* Isi Materi */}
        <section className="lesson-content">
          <div className="lesson-content-heading">
            <span className="lesson-section-label">MATERI PEMBELAJARAN</span>
            <h2>Memahami Fenomena Air dan Minyak</h2>
            <p>
              Pelajari setiap bagian untuk memahami hubungan polaritas
              molekul dengan gaya antarmolekul.
            </p>
          </div>

          <div className="lesson-section-list">
            {MODULE_1_CONTENT.map((sec, idx) => (
              <article className="lesson-section-card" key={idx}>
                <div className="lesson-section-number">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="lesson-section-body">
                  <div className="lesson-section-topline">
                    BAGIAN {idx + 1} DARI {MODULE_1_CONTENT.length}
                  </div>

                  <h3>{sec.title}</h3>

                  <div className="lesson-text">
                    {renderBody(sec.body)}
                  </div>

                  {sec.citation && (
                    <div className="lesson-citation">
                      <span>📚</span>
                      <span>
                        <strong>Sumber referensi</strong>
                        {sec.citation}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Kuis */}
        <section className="lesson-quiz-section">
          <div className="lesson-quiz-heading">
            <span className="lesson-section-label">EVALUASI PEMBELAJARAN</span>
            <h2>Uji Pemahamanmu</h2>
            <p>
              Kerjakan evaluasi berikut untuk mengetahui pemahamanmu
              tentang fenomena air dan minyak.
            </p>
          </div>

          <div className="lesson-quiz-card">
            <QuizPlaceholder
              moduleId={MODULE_1.id}
              draft={draft}
              setDraft={setDraft}
            />
          </div>
        </section>

        {/* Navigasi bawah */}
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

export default Module1Page;
