import React from 'react';
import type { IMFProgress } from '../types/curriculum';
import { LEARNING_MODULES } from '../data/curriculumData';
import { calculateProgressPercentage } from '../utils/storage';

interface ProgressCardProps {
  progress: IMFProgress;
  onOpenResetModal: () => void;
  onResumeModule: (moduleId: string) => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  progress,
  onOpenResetModal,
  onResumeModule,
}) => {
  const totalModules = LEARNING_MODULES.length;
  const completedCount = progress.completedPages.length;
  const percentage = calculateProgressPercentage(progress.completedPages, totalModules);
  const currentModule = LEARNING_MODULES.find((m) => m.id === progress.lastPage) || LEARNING_MODULES[0];

  // SVG Circular Gauge calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div id="progres" className="progress-card">
      <div className="progress-card-grid">
        {/* Left: Circular progress gauge */}
        <div className="progress-circle-wrap">
          <svg className="progress-circle-svg" viewBox="0 0 100 100">
            <circle
              className="progress-circle-bg"
              cx="50"
              cy="50"
              r={radius}
            />
            <circle
              className="progress-circle-bar"
              cx="50"
              cy="50"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="progress-circle-text">
            <span className="progress-circle-percent">{percentage}%</span>
            <span className="progress-circle-label">Selesai</span>
          </div>
        </div>

        {/* Center: Detailed info */}
        <div className="progress-info">
          <div className="progress-title-row">
            <h3 className="progress-heading">Progres Belajar Anda</h3>
            <span className="progress-status-badge">
              {completedCount === 0
                ? 'Belum Dimulai'
                : completedCount === totalModules
                ? 'Selesai Sempurna! 🎉'
                : 'Sedang Berjalan'}
            </span>
          </div>

          <p className="progress-description">
            Modul aktif:{' '}
            <strong>
              {currentModule.stage5E} — {currentModule.title}
            </strong>
          </p>

          <div className="progress-indicators-chips">
            <div className="chip-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{completedCount} dari {totalModules} Modul</span>
            </div>

            <div className="chip-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>{Object.keys(progress.completedQuizzes).length} Kuis Dikerjakan</span>
            </div>

            <div className="chip-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>
                Evaluasi Akhir:{' '}
                {progress.evaluationStatus?.completed
                  ? `Nilai ${progress.evaluationStatus.score ?? 0}`
                  : 'Belum Dikerjakan'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="progress-action-wrap">
          <button
            type="button"
            className="btn-resume"
            onClick={() => onResumeModule(currentModule.id)}
          >
            <span>{completedCount === 0 ? 'Mulai Sekarang' : 'Lanjutkan Modul'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button
            type="button"
            className="btn-reset-ghost"
            onClick={onOpenResetModal}
            title="Atur ulang progres belajar yang tersimpan di browser ini"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>Reset Progres</span>
          </button>
        </div>
      </div>
    </div>
  );
};
