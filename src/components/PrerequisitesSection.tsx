import React, { useState } from 'react';
import { PREREQUISITE_TOPICS } from '../data/curriculumData';

export const PrerequisitesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="prasyarat" className="section">
      <div className="content-wrapper">
        <div className="section-header-center">
          <span className="section-eyebrow">Prasyarat Pengetahuan</span>
          <h2 className="section-title">Ingat Kembali Konsep Dasar Kimia</h2>
          <p className="section-subtitle">
            Sebelum menjelajahi interaksi antarmolekul, segarkan kembali ingatan Anda mengenai 
            konsep-konsep ikatan intramolekul dan polaritas yang telah dipelajari sebelumnya.
          </p>
        </div>

        <div className="prerequisites-grid">
          {PREREQUISITE_TOPICS.map((topic) => {
            const isExpanded = expandedId === topic.id;

            return (
              <div key={topic.id} className="prereq-card">
                <div className="prereq-header">
                  <span className="prereq-icon">{topic.icon}</span>
                  <div className="prereq-title-wrap">
                    <h3 className="prereq-title">{topic.title}</h3>
                    <span className="prereq-subtitle">{topic.subtitle}</span>
                  </div>
                </div>

                <p className="prereq-summary">{topic.summary}</p>

                {topic.chemicalNotation && (
                  <div>
                    <span className="notation-tag">{topic.chemicalNotation}</span>
                  </div>
                )}

                {isExpanded && (
                  <div className="prereq-detail-box">
                    <p style={{ marginBottom: '0.5rem' }}>{topic.detail}</p>
                    <div className="prereq-importance">
                      <span>🎯</span>
                      <span><strong>Penting untuk IMF:</strong> {topic.importanceForIMF}</span>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => toggleExpand(topic.id)}
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--color-forest-green)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.2rem 0',
                    marginTop: 'auto',
                  }}
                >
                  <span>{isExpanded ? 'Tutup Rincian' : 'Baca Penjelasan Lengkap'}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
