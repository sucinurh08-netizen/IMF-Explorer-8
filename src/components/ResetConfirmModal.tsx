import React from 'react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span style={{ fontSize: '1.4rem' }}>⚠️</span>
            <h3 className="modal-title">Konfirmasi Reset Progres</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Tutup modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p>
            Apakah Anda yakin ingin mengatur ulang seluruh progres pembelajaran IMF Explorer?
          </p>
          <div style={{
            background: 'var(--color-error-bg)',
            border: '1px solid var(--color-error)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginTop: '0.85rem',
            fontSize: '0.86rem',
            color: '#7D2A18'
          }}>
            <strong>Perhatian:</strong> Tindakan ini akan menghapus daftar modul yang telah selesai, 
            skor kuis formatif, dan halaman terakhir yang tersimpan di browser ini. Pembelajaran akan kembali ke modul pertama.
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Batalkan
          </button>
          <button type="button" className="btn-danger" onClick={onConfirmReset}>
            Ya, Atur Ulang Progres
          </button>
        </div>
      </div>
    </div>
  );
};
