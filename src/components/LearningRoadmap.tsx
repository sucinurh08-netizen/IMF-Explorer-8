import React from 'react';
import type { IMFProgress, LearningModule } from '../types/curriculum';
import { LEARNING_MODULES } from '../data/curriculumData';

interface LearningRoadmapProps {
  progress: IMFProgress;
  onOpenModule: (module: LearningModule) => void;
  onToggleComplete: (moduleId: string) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({
  progress,
  onOpenModule,
  onToggleComplete,
}) => {
  return (
    <section id="alur-belajar" className="section section-alt">
      <div className="content-wrapper">
        <div className="section-header-center">
          <span className="section-eyebrow">Alur Belajar Berbasis 5E</span>
          <h2 className="section-title">Peta Kurikulum & Tahapan Eksplorasi</h2>
          <p className="section-subtitle">
            Pembelajaran dirancang sistematis menggunakan prinsip <strong>5E (Engage, Explore, Explain, Elaborate, Evaluate)</strong> 
            agar peserta didik membangun pemahaman konsep yang kokoh tanpa miskonsepsi.
          </p>
        </div>

        <div className="roadmap-container">
          {LEARNING_MODULES.map((mod, index) => {
            const isCompleted = progress.completedPages.includes(mod.id);
            const isTarget = progress.lastPage === mod.id;

            return (
              <div
                key={mod.id}
                className={`roadmap-card ${isCompleted ? 'completed' : ''} ${isTarget ? 'active-target' : ''}`}
              >
                {/* Step badge */}
                <div className="roadmap-step-badge-col">
                  <div className={`step-num-circle ${isCompleted ? 'completed' : ''}`}>
                    {isCompleted ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="duration-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {mod.durationMin} mnt
                  </span>
                </div>

                {/* Main Content */}
                <div className="roadmap-content-col">
                  <div className="roadmap-meta-row">
                    <span className="stage-badge-tag">{mod.stageTitle}</span>
                    {isCompleted && (
                      <span className="chip-item" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>
                        ✓ Selesai
                      </span>
                    )}
                    {isTarget && !isCompleted && (
                      <span className="chip-item" style={{ color: 'var(--color-forest-green)', borderColor: 'var(--color-forest-green)' }}>
                        ● Sedang Dipelajari
                      </span>
                    )}
                  </div>

                  <h3 className="roadmap-module-title">{mod.title}</h3>
                  <p className="roadmap-module-desc">{mod.shortDesc}</p>

                  {mod.scientificNotes && (
                    <div className="scientific-note-box">
                      <span>💡</span>
                      <span><strong>Fokus Ilmiah:</strong> {mod.scientificNotes}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="roadmap-action-col">
                  <button
                    type="button"
                    className="btn-open-module"
                    onClick={() => onOpenModule(mod)}
                  >
                    <span>{isCompleted ? 'Ulangi' : isTarget ? 'Lanjutkan' : 'Buka Modul'}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn-mark-completed"
                    onClick={() => onToggleComplete(mod.id)}
                    title={isCompleted ? 'Batal tandai selesai' : 'Tandai modul selesai untuk menguji progres'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isCompleted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
