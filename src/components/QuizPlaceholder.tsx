
import React, { useEffect, useState } from 'react';
import { MODULE_1_DIAGNOSTIC } from '../data/module1Diagnostic';
import { supabase } from '../utils/supabase';

interface QuizPlaceholderProps {
    moduleId: string;
    draft: any;
    setDraft: React.Dispatch<React.SetStateAction<any>>;
}

const QuizPlaceholder: React.FC<QuizPlaceholderProps> = ({
    moduleId,
    draft,
    setDraft,
}) => {
    void draft;
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loadingDiagnostic, setLoadingDiagnostic] = useState(true);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);

    const storageKey = `diagnostic-${moduleId}`;



    useEffect(() => {
        let active = true;

        const initializeDiagnostic = async () => {
            setLoadingDiagnostic(true);

            try {
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError) throw userError;
                if (!user) throw new Error('Silakan login terlebih dahulu.');

                const { data, error } = await supabase
                    .from('diagnostic_submissions')
                    .select('id, answers, correct_count, total_questions, score, submitted_at')
                    .eq('user_id', user.id)
                    .eq('module_id', moduleId)
                    .maybeSingle();

                if (error) throw error;
                if (!active) return;

                if (data) {
                    setAnswers(data.answers as Record<string, string>);
                    setSubmitted(true);
                    setAlreadySubmitted(true);
                } else {
                    const saved = localStorage.getItem(storageKey);

                    if (saved) {
                        const parsed = JSON.parse(saved);
                        setAnswers(parsed.answers || {});
                        setSubmitted(parsed.submitted || false);
                        setDraft(parsed);
                    }
                }
            } catch (error) {
                console.error('Gagal memeriksa hasil diagnostik:', error);
            } finally {
                if (active) setLoadingDiagnostic(false);
            }
        };

        void initializeDiagnostic();

        return () => {
            active = false;
        };
    }, [moduleId, storageKey, setDraft]);


    const handleAnswer = (questionId: string, option: string) => {
        if (submitted) return;

        const updated = {
            ...answers,
            [questionId]: option,
        };

        setAnswers(updated);

        const updatedDraft = {
            answers: updated,
            submitted: false,
        };

        setDraft(updatedDraft);
        localStorage.setItem(storageKey, JSON.stringify(updatedDraft));
    };


    const handleSubmit = async () => {
        if (!allAnswered || loadingDiagnostic) return;

        const result = {
            answers,
            submitted: true,
        };

        setSubmitted(true);
        setDraft(result);
        localStorage.setItem(storageKey, JSON.stringify(result));

        // Jika sudah pernah mengerjakan, jangan simpan ulang ke database.
        if (alreadySubmitted) return;

        try {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError) throw userError;
            if (!user) throw new Error('Silakan login terlebih dahulu.');

            const { error } = await supabase
                .from('diagnostic_submissions')
                .insert({
                    user_id: user.id,
                    module_id: moduleId,
                    answers,
                    correct_count: score,
                    total_questions: MODULE_1_DIAGNOSTIC.length,
                    score: (score / MODULE_1_DIAGNOSTIC.length) * 100,
                });

            if (error) throw error;

            setAlreadySubmitted(true);
        } catch (error) {
            console.error('Gagal menyimpan hasil diagnostik:', error);
            alert('Hasil diagnostik gagal disimpan. Silakan hubungi guru atau coba kembali.');
            setSubmitted(false);
        }
    };


    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
        setDraft(null);
        localStorage.removeItem(storageKey);
    };

    const score = MODULE_1_DIAGNOSTIC.reduce((total, question) => {
        return total + (
            answers[question.id] === question.correctOption ? 1 : 0
        );
    }, 0);

    const allAnswered = MODULE_1_DIAGNOSTIC.every(
        (question) => answers[question.id]
    );

    if (loadingDiagnostic) {
        return (
            <div className="quiz-container">
                <p>Memeriksa riwayat tes diagnostik...</p>
            </div>
        );
    }
    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <span className="quiz-label">ASESMEN DIAGNOSTIK</span>
                <h3>Seberapa Kenal Kamu dengan Air dan Minyak?</h3>
                <p>
                    Jawablah pertanyaan berikut berdasarkan pengetahuan dan
                    pengalamanmu. Tidak perlu khawatir jika belum mengetahui
                    jawabannya.
                </p>

                <div className="quiz-progress">
                    {Object.keys(answers).length} dari{' '}
                    {MODULE_1_DIAGNOSTIC.length} soal dijawab
                </div>
            </div>

            {MODULE_1_DIAGNOSTIC.map((question, index) => (
                <div className="quiz-question" key={question.id}>
                    <h4>
                        {index + 1}. {question.question}
                    </h4>

                    <div className="quiz-options">
                        {question.options.map((option, optionIndex) => {
                            const letter = String.fromCharCode(65 + optionIndex);
                            const selected = answers[question.id] === letter;
                            const correct = question.correctOption === letter;

                            let optionClass = 'quiz-option';

                            if (!submitted && selected) {
                                optionClass += ' selected';
                            }

                            if (submitted && correct) {
                                optionClass += ' correct';
                            } else if (submitted && selected && !correct) {
                                optionClass += ' incorrect';
                            }

                            const optionText = option.replace(/^[A-E]\.\s*/, '');

                            return (
                                <button
                                    key={letter}
                                    type="button"
                                    className={optionClass}
                                    onClick={() => handleAnswer(question.id, letter)}
                                    disabled={submitted}
                                >
                                    <span className="quiz-option-letter">{letter}</span>
                                    <span>{optionText}</span>
                                </button>
                            );
                        })}
                    </div>

                    {submitted && (
                        <div className="quiz-explanation">
                            <strong>
                                {answers[question.id] === question.correctOption
                                    ? '✓ Jawaban sesuai dengan kunci.'
                                    : `Jawaban acuan: ${question.correctOption}`}
                            </strong>
                            <p>{question.explanation}</p>
                        </div>
                    )}
                </div>
            ))}

            {!submitted ? (
                <button
                    type="button"
                    className="quiz-submit"
                    disabled={!allAnswered}
                    onClick={handleSubmit}
                >
                    Kumpulkan Jawaban
                </button>
            ) : (
                <div className="quiz-result">
                    <span className="quiz-label">HASIL DIAGNOSTIK</span>
                    <h3>Terima kasih sudah menjawab!</h3>
                    <p>
                        Kamu menjawab {MODULE_1_DIAGNOSTIC.length} soal.
                        Jawabanmu digunakan untuk mengetahui pemahaman awal
                        sebelum mempelajari materi.
                    </p>
                    <p>
                        Jumlah jawaban yang sesuai dengan kunci: {score} dari{' '}
                        {MODULE_1_DIAGNOSTIC.length}.
                    </p>

                    <button
                        type="button"
                        className="quiz-retry"
                        onClick={handleRetry}
                    >
                        Ulangi Diagnostik
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizPlaceholder;
