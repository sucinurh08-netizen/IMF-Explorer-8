import React, { useState, useEffect } from 'react';
import { MODULE_1_QUIZ, type QuizQuestion } from '../../data/module1Quiz';

interface ModuleQuizCardProps {
  moduleId: string;
  onCompleteQuiz?: (score: number) => void;
}

const STORAGE_DRAFT_PREFIX = 'chem_quiz_draft_';

export const ModuleQuizCard: React.FC<ModuleQuizCardProps> = ({
  moduleId,
  onCompleteQuiz,
}) => {
  const questions: QuizQuestion[] = MODULE_1_QUIZ;
  const storageKey = `${STORAGE_DRAFT_PREFIX}${moduleId}`;

  // User selected answers: { q1: 'B', q2: 'C', ... }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.answers === 'object') {
          return parsed.answers;
        }
      }
    } catch {
      // Fallback
    }
    return {};
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed?.isSubmitted);
      }
    } catch {
      // Fallback
    }
    return false;
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Auto-save draft to localStorage whenever answers change
  useEffect(() => {
    try {
      const payload = {
        answers: selectedAnswers,
        isSubmitted,
        lastUpdated: new Date().toISOString(),
        meetingMarker: 'Pertemuan 3 (Penanda Jujur)',
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch (e) {
      console.warn('Gagal menyimpan draf kuis ke localStorage', e);
    }
  }, [selectedAnswers, isSubmitted, storageKey]);

  const handleSelectOption = (questionId: string, optionChar: string) => {
    if (isSubmitted) return; // Locked after submission until reset
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionChar,
    }));
  };

  const handleSaveDraftManual = () => {
    try {
      const payload = {
        answers: selectedAnswers,
        isSubmitted,
        lastUpdated: new Date().toISOString(),
        meetingMarker: 'Pertemuan 3 (Penanda Jujur)',
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
      setSaveToast('Draf jawaban Anda tersimpan aman di browser!');
      setTimeout(() => setSaveToast(null), 3000);
    } catch {
      setSaveToast('Peringatan: Gagal menyimpan draf.');
    }
  };

  // Calculate score
  const correctCount = questions.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctOption ? acc + 1 : acc;
  }, 0);
  const totalCount = questions.length;
  const scorePercent = Math.round((correctCount / totalCount) * 100);

  const handleSubmitQuiz = () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < totalCount) {
      const confirmSubmit = window.confirm(
        `Anda baru menjawab ${answeredCount} dari ${totalCount} soal. Yakin ingin mengirim dan memeriksa hasil sekarang?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    if (onCompleteQuiz) {
      onCompleteQuiz(scorePercent);
    }
  };

  const handleResetQuiz = () => {
    const confirmReset = window.confirm(
      'Atur ulang latihan kuis ini untuk mencoba kembali dari awal?'
    );
    if (!confirmReset) return;

    setSelectedAnswers({});
    setIsSubmitted(false);
    setActiveQuestionIndex(0);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignored
    }
  };

  const currentQ = questions[activeQuestionIndex];
  const isAllAnswered = Object.keys(selectedAnswers).length === totalCount;

  return (
    <div className="quiz-container-card">
      {/* Toast Notification */}
      {saveToast && (
        <div className="quiz-toast-banner">
          <span>💾</span>
          <span>{saveToast}</span>
        </div>
      )}

      {/* Quiz Header & Honest Marker Badge */}
      <div className="quiz-header">
        <div className="quiz-title-wrap">
          <div className="quiz-badge-row">
            <span className="quiz-stage-badge">Kuis Formatif Modul 1</span>
            <span className="honest-marker-badge" title="Tersimpan secara mandiri tanpa memerlukan akun atau database eksternal">
              🛡️ Penanda Jujur Mandiri (Pertemuan 3)
            </span>
          </div>
          <h3 className="quiz-title">Uji Pemahaman Konsep: Fenomena Air & Minyak</h3>
          <p className="quiz-subtitle">
            5 butir pertanyaan konseptual berbasis penalaran submikroskopik dan representasi kimia (Raymon Chang & Kemendikbudristek).
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="quiz-score-indicator">
          {isSubmitted ? (
            <div className={`score-badge ${scorePercent >= 80 ? 'high' : scorePercent >= 60 ? 'mid' : 'low'}`}>
              <span className="score-val">{scorePercent}%</span>
              <span className="score-lbl">{correctCount} dari {totalCount} Benar</span>
            </div>
          ) : (
            <div className="answered-badge">
              <span className="answered-val">{Object.keys(selectedAnswers).length}/{totalCount}</span>
              <span className="answered-lbl">Terjawab</span>
            </div>
          )}
        </div>
      </div>

      {/* Question Stepper Navigation */}
      <div className="quiz-nav-stepper">
        {questions.map((q, idx) => {
          const isAnswered = Boolean(selectedAnswers[q.id]);
          const isCorrect = selectedAnswers[q.id] === q.correctOption;
          let statusClass = '';
          if (isSubmitted) {
            statusClass = isCorrect ? 'correct' : 'wrong';
          } else if (isAnswered) {
            statusClass = 'answered';
          }

          return (
            <button
              key={q.id}
              type="button"
              className={`stepper-btn ${idx === activeQuestionIndex ? 'active' : ''} ${statusClass}`}
              onClick={() => setActiveQuestionIndex(idx)}
            >
              <span>{idx + 1}</span>
              {isSubmitted && (isCorrect ? ' ✓' : ' ✕')}
            </button>
          );
        })}
      </div>

      {/* Current Question Body */}
      <div className="quiz-body-box">
        <div className="question-topic-pill">
          Topik: {currentQ.sourceTopic || 'Gaya Antarmolekul'}
        </div>

        <h4 className="question-text">
          <span className="q-number">Soal {activeQuestionIndex + 1}:</span> {currentQ.question}
        </h4>

        {/* Options List */}
        <div className="options-list" role="radiogroup">
          {currentQ.options.map((optionText) => {
            const optionChar = optionText.charAt(0); // 'A', 'B', 'C', 'D', 'E'
            const isSelected = selectedAnswers[currentQ.id] === optionChar;
            const isAnswerKey = currentQ.correctOption === optionChar;

            let optionClass = '';
            if (isSubmitted) {
              if (isAnswerKey) {
                optionClass = 'option-correct';
              } else if (isSelected && !isAnswerKey) {
                optionClass = 'option-wrong';
              }
            } else if (isSelected) {
              optionClass = 'option-selected';
            }

            return (
              <button
                key={optionChar}
                type="button"
                className={`option-btn ${optionClass}`}
                onClick={() => handleSelectOption(currentQ.id, optionChar)}
                disabled={isSubmitted}
              >
                <div className="option-indicator">
                  <span className="option-letter">{optionChar}</span>
                </div>
                <div className="option-content-text">
                  {optionText.substring(3)}
                </div>
                {isSubmitted && isAnswerKey && (
                  <span className="option-status-icon text-success">✓ Kunci</span>
                )}
                {isSubmitted && isSelected && !isAnswerKey && (
                  <span className="option-status-icon text-error">✕ Jawaban Anda</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Submit Detailed Conceptual Feedback */}
        {isSubmitted && (
          <div className="explanation-panel">
            <div className="explanation-header">
              <span className="explanation-icon">📖</span>
              <strong>Pembahasan Ilmiah & Konseptual:</strong>
            </div>
            <p className="explanation-content">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Quiz Controls Footer */}
      <div className="quiz-controls-footer">
        <div className="quiz-left-actions">
          <button
            type="button"
            className="btn-quiz-nav"
            onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeQuestionIndex === 0}
          >
            ← Soal Sebelumnya
          </button>
          <button
            type="button"
            className="btn-quiz-nav"
            onClick={() => setActiveQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={activeQuestionIndex === questions.length - 1}
          >
            Soal Berikutnya →
          </button>
        </div>

        <div className="quiz-right-actions">
          {!isSubmitted ? (
            <>
              <button
                type="button"
                className="btn-quiz-draft"
                onClick={handleSaveDraftManual}
                title="Simpan draf jawaban secara lokal ke browser tanpa menyerahkan"
              >
                💾 Simpan Draf Jawaban
              </button>
              <button
                type="button"
                className="btn-quiz-submit"
                onClick={handleSubmitQuiz}
              >
                {isAllAnswered ? 'Periksa & Kirim Jawaban 🚀' : 'Kirim Jawaban'}
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-quiz-reset"
              onClick={handleResetQuiz}
            >
              🔄 Ulangi Latihan Kuis
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

