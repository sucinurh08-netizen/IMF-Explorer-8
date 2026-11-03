import React from 'react';
import type { LearningModule } from '../types/curriculum';

interface ModuleDetailModalProps {
  module: LearningModule | null;
  isOpen: boolean;
  isCompleted: boolean;
  onClose: () => void;
  onLaunchModule: (moduleId: string) => void;
  onToggleCompleted: (moduleId: string) => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  isOpen,
  isCompleted,
  onClose,
  onLaunchModule,
  onToggleCompleted,
}) => {
  if (!isOpen || !module) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span style={{ fontSize: '1.4rem' }}>📖</span>
            <div>
              <span className="stage-badge-tag">{module.stageTitle}</span>
              <h3 className="modal-title" style={{ marginTop: '0.2rem' }}>{module.title}</h3>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Tutup modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.98rem', marginBottom: '1.25rem' }}>
            {module.shortDesc}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div className="chip-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Estimasi Durasi: {module.durationMin} Menit</span>
            </div>
            <div className="chip-item">
              <span>Status: {isCompleted ? '✓ Telah Diselesaikan' : 'Belum Selesai'}</span>
            </div>
          </div>

          {module.scientificNotes && (
            <div style={{
              background: '#FAFDF9',
              border: '1.5px solid var(--color-sage-green)',
              borderRadius: 'var(--radius-md)',
              padding: '0.9rem 1rem',
              color: 'var(--color-deep-forest)',
              fontSize: '0.88rem',
              lineHeight: 1.5,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                <span>🔬</span>
                <span>Landasan Ilmiah & Catatan Bebas Miskonsepsi:</span>
              </div>
              <p style={{ margin: 0 }}>{module.scientificNotes}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onToggleCompleted(module.id)}
          >
            {isCompleted ? 'Tandai Belum Selesai' : 'Tandai Modul Selesai'}
          </button>

          <button
            type="button"
            className="btn-primary-large"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.92rem' }}
            onClick={() => onLaunchModule(module.id)}
          >
            <span>{isCompleted ? 'Buka Kembali Modul' : 'Mulai Belajar'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
