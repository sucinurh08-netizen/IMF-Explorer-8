
import React, { useEffect, useRef } from 'react';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const modal = modalRef.current;
    if (!modal) return;

    const getFocusableElements = () => {
      return Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true');
    };

    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const elements = getFocusableElements();

        if (elements.length === 0) {
          event.preventDefault();
          modal.focus();
          return;
        }

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="modal-dialog"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
        aria-describedby="reset-modal-description"
        tabIndex={-1}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span style={{ fontSize: '1.4rem' }}>⚠️</span>
            <h3 id="reset-modal-title" className="modal-title">
              Konfirmasi Reset Progres
            </h3>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p id="reset-modal-description">
            Apakah Anda yakin ingin mengatur ulang seluruh progres pembelajaran IMF Explorer?
          </p>

          <div
            style={{
              background: 'var(--color-error-bg)',
              border: '1px solid var(--color-error)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              marginTop: '0.85rem',
              fontSize: '0.86rem',
              color: '#7D2A18',
            }}
          >
            <strong>Perhatian:</strong> Tindakan ini akan menghapus daftar modul yang telah selesai,
            skor kuis formatif, dan halaman terakhir yang tersimpan di browser ini. Pembelajaran akan kembali ke modul pertama.
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Batalkan
          </button>

          <button
            type="button"
            className="btn-danger"
            onClick={onConfirmReset}
          >
            Ya, Atur Ulang Progres
          </button>
        </div>
      </div>
    </div>
  );
};
