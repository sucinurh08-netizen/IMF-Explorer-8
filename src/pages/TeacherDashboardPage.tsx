
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { MODULE_1_DIAGNOSTIC } from '../data/module1Diagnostic';
import { MODULE_7_QUESTIONS, ESSAY_QUESTIONS } from './Module7Page';
import './TeacherDashboardPage.css';
type Student = {
    id: number;
    user_id: string;
    nama: string;
    kelas: string | null;
};

type EssaySubmission = {
    id: number;
    student_name: string;
    student_class: string;
    answer: string;
    word_count: number;
    submitted_at: string;
    status: string;
    score: number | null;
    feedback: string | null;
};

type Module7Submission = {
    id: number;
    student_name: string;
    student_class: string;
    attendance_number: string | number | null;
    mcq_answers: unknown;
    essay_answers: unknown;
    mcq_score: number | null;
    submitted_at: string;
};

type DiagnosticSubmission = {
    id: number;
    user_id: string;
    module_id: string;
    answers: Record<string, string>;
    correct_count: number;
    total_questions: number;
    score: number;
    submitted_at: string;
    student_name: string;
    student_class: string;
};

type DiscoveryComment = {
    id: number;
    user_id: string;
    comment: string;
    comment_type: string;
    created_at: string;
    name: string;
    role: string;
};

type DiscoveryPost = {
    id: number;
    user_id: string;
    simulation_id: string;
    simulation_title: string;
    discovery: string;
    created_at: string;
    name: string;
    className: string;
    comments: DiscoveryComment[];
};




const renderEssayAnswers = (answers: unknown) => {
    const studentAnswers = Array.isArray(answers)
        ? answers as unknown[]
        : [];

    return (
        <div className="teacher-essay-answers">
            {ESSAY_QUESTIONS.map((essay, essayIndex) => {
                const essayStudentAnswers = Array.isArray(studentAnswers[essayIndex])
                    ? studentAnswers[essayIndex] as unknown[]
                    : [];

                return (
                    <div
                        key={essayIndex}
                        style={{
                            marginBottom: 20,
                            padding: 14,
                            border: '1px solid #dbe5df',
                            borderRadius: 10
                        }}
                    >
                        <h4>
                            Esai {essayIndex + 1} — {essay.level}
                        </h4>

                        <strong>{essay.title}</strong>
                        <p
                            style={{
                                marginTop: 10,
                                padding: 12,
                                background: '#f0f7f3',
                                borderRadius: 8,
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.6,
                                fontWeight: 'normal'
                            }}
                        >
                            {essay.stimulus}
                        </p>

                        {essay.questions.map((question, questionIndex) => (
                            <div
                                key={questionIndex}
                                style={{ marginTop: 12 }}
                            >
                                <p>
                                    <strong>{question}</strong>
                                </p>

                                <div
                                    style={{
                                        padding: 10,
                                        background: '#f5f8f6',
                                        borderRadius: 6,
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {String(
                                        essayStudentAnswers[questionIndex] ?? 'Belum dijawab'
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};


const TeacherDashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('Guru');
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('');
    const [showTeacherForm, setShowTeacherForm] = useState(false);
    const [teacherName, setTeacherName] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherPassword, setTeacherPassword] = useState('');
    const [creatingTeacher, setCreatingTeacher] = useState(false);
    const [teacherMessage, setTeacherMessage] = useState('');
    const [students, setStudents] = useState<Student[]>([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [studentError, setStudentError] = useState('');
    const [showStudentData, setShowStudentData] = useState(false);
    const [showEvaluationRecap, setShowEvaluationRecap] = useState(false);
    const [showSubmissions, setShowSubmissions] = useState(false);
    const [activeSubmissionTab, setActiveSubmissionTab] =
        useState<'esai' | 'modul7'>('esai');

    const [essaySubmissions, setEssaySubmissions] = useState<EssaySubmission[]>([]);
    const [module7Submissions, setModule7Submissions] = useState<Module7Submission[]>([]);
    const [selectedModule7Submission, setSelectedModule7Submission] =
        useState<Module7Submission | null>(null);
    const [selectedEssaySubmission, setSelectedEssaySubmission] =
        useState<EssaySubmission | null>(null);
    const [essayScore, setEssayScore] = useState('');
    const [essayFeedback, setEssayFeedback] = useState('');
    const [showItemAnalysis, setShowItemAnalysis] = useState(false);
    const [analysisSubmissions, setAnalysisSubmissions] = useState<Module7Submission[]>([]);

    const [selectedAnalysisQuestion, setSelectedAnalysisQuestion] = useState<string | null>(null);

    const questionAnalysisDetailRef = useRef<HTMLDivElement>(null);

    const [loadingItemAnalysis, setLoadingItemAnalysis] = useState(false);
    const [itemAnalysisError, setItemAnalysisError] = useState('');

    const [loadingSubmissions, setLoadingSubmissions] = useState(false);
    const [submissionError, setSubmissionError] = useState('');

    const [showDiagnostic, setShowDiagnostic] = useState(false);
    const [diagnosticSubmissions, setDiagnosticSubmissions] = useState<DiagnosticSubmission[]>([]);
    const [loadingDiagnostic, setLoadingDiagnostic] = useState(false);
    const [diagnosticError, setDiagnosticError] = useState('');
    const [selectedDiagnostic, setSelectedDiagnostic] =
        useState<DiagnosticSubmission | null>(null);
    const [showDiscovery, setShowDiscovery] = useState(false);
    const [discoveryPosts, setDiscoveryPosts] = useState<DiscoveryPost[]>([]);
    const [loadingDiscovery, setLoadingDiscovery] = useState(false);
    const [discoveryError, setDiscoveryError] = useState('');
    const [expandedDiscoveryPostId, setExpandedDiscoveryPostId] =
        useState<number | null>(null);
    const [discoveryFeedbackInputs, setDiscoveryFeedbackInputs] =
        useState<Record<number, string>>({});


    const fetchStudents = async (silent = false) => {
        if (!silent) setLoadingStudents(true);
        setStudentError('');

        try {
            const { data, error } = await supabase
                .from('Info login')
                .select('id, user_id, nama, kelas')
                .eq('role', 'student')
                .order('nama', { ascending: true });

            if (error) throw error;

            setStudents(data ?? []);
        } catch (error) {
            console.error('Error mengambil data siswa:', error);

            const errorMessage =
                error instanceof Error
                    ? error.message
                    : typeof error === 'object' && error !== null && 'message' in error
                        ? String(error.message)
                        : 'Gagal mengambil data siswa.';

            setStudentError(errorMessage);
        } finally {
            if (!silent) setLoadingStudents(false);
        }
    };

    const fetchSubmissions = async (silent = false) => {
        if (!silent) setLoadingSubmissions(true);
        setSubmissionError('');

        try {
            const [essayResult, module7Result] = await Promise.all([
                supabase
                    .from('essay_submissions')
                    .select('id, student_name, student_class, answer, word_count, submitted_at, status, score, feedback')
                    .order('submitted_at', { ascending: false }),

                supabase
                    .from('module7_submissions')
                    .select('id, student_name, student_class, attendance_number, mcq_answers, essay_answers, mcq_score, submitted_at')
                    .order('submitted_at', { ascending: false }),
            ]);

            if (essayResult.error) throw essayResult.error;
            if (module7Result.error) throw module7Result.error;

            setEssaySubmissions(essayResult.data ?? []);
            setModule7Submissions(module7Result.data ?? []);
        } catch (error) {
            setSubmissionError(
                error instanceof Error
                    ? error.message
                    : 'Gagal mengambil data pengumpulan tugas.'
            );
        } finally {
            if (!silent) setLoadingSubmissions(false);
        }
    };
    const handleSaveEssayEvaluation = async () => {
        if (!selectedEssaySubmission) return;

        const numericScore = Number(essayScore);

        if (essayScore.trim() === '' || !Number.isFinite(numericScore) || numericScore < 0) {
            setSubmissionError('Masukkan nilai yang valid.');
            return;
        }

        setSubmissionError('');

        try {
            const { data, error } = await supabase
                .from('essay_submissions')
                .update({
                    score: numericScore,
                    feedback: essayFeedback.trim() || null,
                })
                .eq('id', selectedEssaySubmission.id)
                .select('id, score, feedback')
                .maybeSingle();

            if (error) throw error;

            if (!data) {
                throw new Error(
                    'Data pengumpulan tidak ditemukan atau tidak dapat diperbarui. Periksa ID dan izin akses Supabase.'
                );
            }

            console.log('HASIL PENYIMPANAN PENILAIAN:', data);

            await fetchSubmissions(true);

            setSelectedEssaySubmission({
                ...selectedEssaySubmission,
                score: numericScore,
                feedback: essayFeedback.trim() || null,
            });

        } catch (error) {
            console.error('Gagal menyimpan penilaian:', error);
            setSubmissionError(
                error instanceof Error
                    ? error.message
                    : 'Gagal menyimpan penilaian.'
            );
        }
    };
    const fetchItemAnalysis = async () => {
        setLoadingItemAnalysis(true);
        setItemAnalysisError('');

        try {
            const { data, error } = await supabase
                .from('module7_submissions')
                .select('*')
                .order('submitted_at', { ascending: false });

            if (error) {
                console.error('Gagal mengambil data analisis:', error);
                setItemAnalysisError('Gagal mengambil data jawaban Modul 7.');
                setAnalysisSubmissions([]);
                return;
            }

            setAnalysisSubmissions(data ?? []);
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            setItemAnalysisError('Terjadi kesalahan saat mengambil data analisis.');
            setAnalysisSubmissions([]);
        } finally {
            setLoadingItemAnalysis(false);
        }
    };

    const sortedAnalysisSubmissions = [...analysisSubmissions]
        .filter((submission) => typeof submission.mcq_score === 'number')
        .sort((a, b) => b.mcq_score! - a.mcq_score!);

    const groupSize = Math.floor(sortedAnalysisSubmissions.length * 0.27);

    const upperGroup = groupSize > 0
        ? sortedAnalysisSubmissions.slice(0, groupSize)
        : [];

    const lowerGroup = groupSize > 0
        ? sortedAnalysisSubmissions.slice(-groupSize)
        : [];

    const itemAnalysis = MODULE_7_QUESTIONS.map((question) => {
        const distribution: Record<string, number> = {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            E: 0,
        };

        let correct = 0;
        let answered = 0;

        analysisSubmissions.forEach((submission) => {
            if (
                typeof submission.mcq_answers !== 'object' ||
                submission.mcq_answers === null ||
                Array.isArray(submission.mcq_answers)
            ) {
                return;
            }

            const answers = submission.mcq_answers as Record<string, unknown>;
            const answer = answers[question.id];

            if (
                typeof answer !== 'string' ||
                !Object.prototype.hasOwnProperty.call(distribution, answer)
            ) {
                return;
            }

            distribution[answer]++;
            answered++;

            if (answer === question.correctAnswer) {
                correct++;
            }
        });

        const incorrect = answered - correct;
        const upperCorrect = upperGroup.filter((submission) => {
            const answers = submission.mcq_answers as Record<string, unknown>;
            return answers?.[question.id] === question.correctAnswer;
        }).length;

        const lowerCorrect = lowerGroup.filter((submission) => {
            const answers = submission.mcq_answers as Record<string, unknown>;
            return answers?.[question.id] === question.correctAnswer;
        }).length;

        const discriminationIndex =
            groupSize > 0
                ? (upperCorrect / groupSize) - (lowerCorrect / groupSize)
                : null;

        return {
            id: question.id,
            topic: question.topic,
            question: question.question,
            correctAnswer: question.correctAnswer,
            options: question.options,
            totalAnswered: answered,
            correct,
            incorrect,
            correctPercentage: answered > 0
                ? (correct / answered) * 100
                : 0,
            difficultyIndex: answered > 0
                ? correct / answered
                : null,

            difficultyCategory: answered === 0
                ? 'Belum ada data'
                : correct / answered <= 0.30
                    ? 'Sukar'
                    : correct / answered <= 0.70
                        ? 'Sedang'
                        : 'Mudah',
            discriminationIndex,

            discriminationCategory: discriminationIndex === null
                ? 'Belum tersedia'
                : discriminationIndex < 0
                    ? 'Jelek'
                    : discriminationIndex < 0.20
                        ? 'Kurang'
                        : discriminationIndex < 0.30
                            ? 'Cukup'
                            : discriminationIndex < 0.40
                                ? 'Baik'
                                : 'Sangat baik',
            incorrectPercentage: answered > 0
                ? (incorrect / answered) * 100
                : 0,
            distribution,
            distractorAnalysis: question.options.map((option) => {
                const count = distribution[option.label];

                const percentage = answered > 0
                    ? (count / answered) * 100
                    : 0;

                return {
                    label: option.label,
                    text: option.text,
                    count,
                    percentage,
                    isCorrect: option.label === question.correctAnswer,
                    isEffective: option.label !== question.correctAnswer
                        && percentage >= 5,
                };
            }),
        };
    }).sort((a, b) => b.incorrect - a.incorrect);
    const totalParticipants = analysisSubmissions.length;

    const averageScore = totalParticipants > 0
        ? analysisSubmissions.reduce(
            (total, submission) => total + (submission.mcq_score ?? 0),
            0
        ) / totalParticipants
        : 0;

    const averagePercentage = (averageScore / MODULE_7_QUESTIONS.length) * 100;

    const mostDifficultQuestion = itemAnalysis.length > 0
        ? itemAnalysis[0]
        : null;
    const selectedQuestionAnalysis = itemAnalysis.find(
        (item) => item.id === selectedAnalysisQuestion
    );

    const selectedQuestionDetail = MODULE_7_QUESTIONS.find(
        (question) => question.id === selectedAnalysisQuestion
    );

    const fetchDiagnosticSubmissions = async (silent = false) => {
        if (!silent) setLoadingDiagnostic(true);
        setDiagnosticError('');

        try {
            const { data, error } = await supabase
                .from('diagnostic_submissions')
                .select(`
                id,
                user_id,
                module_id,
                answers,
                correct_count,
                total_questions,
                score,
                submitted_at
            `)
                .order('submitted_at', { ascending: false });

            if (error) throw error;

            const submissions = data ?? [];

            if (submissions.length === 0) {
                setDiagnosticSubmissions([]);
                return;
            }

            const userIds = [...new Set(submissions.map(item => item.user_id))];

            const { data: profiles, error: profileError } = await supabase
                .from('Info login')
                .select('user_id, nama, kelas')
                .in('user_id', userIds);

            if (profileError) throw profileError;

            const profileMap = new Map(
                (profiles ?? []).map(profile => [profile.user_id, profile])
            );

            const formattedSubmissions: DiagnosticSubmission[] = submissions.map(item => {
                const profile = profileMap.get(item.user_id);

                return {
                    ...item,
                    answers: item.answers as Record<string, string>,
                    score: Number(item.score),
                    student_name: profile?.nama ?? 'Nama tidak ditemukan',
                    student_class: profile?.kelas ?? '-'
                };
            });

            setDiagnosticSubmissions(formattedSubmissions);
        } catch (error) {
            console.error('Gagal mengambil hasil tes diagnostik:', error);
            setDiagnosticError('Gagal memuat hasil tes diagnostik.');
        } finally {
            if (!silent) setLoadingDiagnostic(false);
        }
    };


    const fetchDiscoveryPosts = async (silent = false) => {
        if (!silent) setLoadingDiscovery(true);
        setDiscoveryError('');

        try {
            const { data: postsData, error: postsError } = await supabase
                .from('discovery_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (postsError) throw postsError;

            const posts = postsData || [];
            const postIds = posts.map(post => post.id);
            const userIds = [...new Set(posts.map(post => post.user_id))];

            let profiles: any[] = [];
            let commentsData: any[] = [];

            if (userIds.length > 0) {
                const { data, error } = await supabase
                    .from('Info login')
                    .select('user_id, nama, kelas, role')
                    .in('user_id', userIds);

                if (error) throw error;
                profiles = data || [];
            }

            if (postIds.length > 0) {
                const { data, error } = await supabase
                    .from('discovery_comments')
                    .select('*')
                    .in('post_id', postIds)
                    .order('created_at', { ascending: true });

                if (error) throw error;
                commentsData = data || [];
            }

            const commentUserIds = [
                ...new Set(commentsData.map(comment => comment.user_id))
            ];

            if (commentUserIds.length > 0) {
                const { data, error } = await supabase
                    .from('Info login')
                    .select('user_id, nama, kelas, role')
                    .in('user_id', commentUserIds);

                if (error) throw error;

                profiles = [
                    ...profiles,
                    ...(data || [])
                ];
            }

            const profileMap = new Map(
                profiles.map(profile => [profile.user_id, profile])
            );

            const formattedPosts: DiscoveryPost[] = posts.map(post => {
                const profile = profileMap.get(post.user_id);

                const postComments: DiscoveryComment[] = commentsData
                    .filter(comment => comment.post_id === post.id)
                    .map(comment => {
                        const commentProfile = profileMap.get(comment.user_id);

                        return {
                            id: comment.id,
                            user_id: comment.user_id,
                            comment: comment.comment,
                            comment_type: comment.comment_type,
                            created_at: comment.created_at,
                            name: commentProfile?.nama || 'Pengguna',
                            role: commentProfile?.role || 'student'
                        };
                    });

                return {
                    id: post.id,
                    user_id: post.user_id,
                    simulation_id: post.simulation_id,
                    simulation_title: post.simulation_title,
                    discovery: post.discovery,
                    created_at: post.created_at,
                    name: profile?.nama || 'Siswa',
                    className: profile?.kelas || '-',
                    comments: postComments
                };
            });

            setDiscoveryPosts(formattedPosts);
        } catch (error) {
            console.error('Gagal mengambil temuan Discovery Wall:', error);
            setDiscoveryError('Temuan dan tanggapan siswa gagal dimuat.');
        } finally {
            if (!silent) setLoadingDiscovery(false);
        }
    };


    const handleShowEvaluationRecap = async () => {
        setShowStudentData(false);
        setShowSubmissions(false);
        setShowDiagnostic(false);
        setShowDiscovery(false);
        setShowTeacherForm(false);
        setShowItemAnalysis(false);
        setShowEvaluationRecap(true);
        await Promise.all([fetchStudents(), fetchSubmissions(), fetchDiscoveryPosts(), fetchDiagnosticSubmissions()]);
        setTimeout(() => document.getElementById('evaluation-recap-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    };

    const handleShowSubmissions = async () => {
        setShowEvaluationRecap(false);
        setShowStudentData(false);
        setShowDiagnostic(false);
        setShowDiscovery(false);
        setShowTeacherForm(false);
        setShowItemAnalysis(false);
        setSelectedDiagnostic(null);

        setShowSubmissions(true);
        await fetchSubmissions();

        setTimeout(() => {
            document.getElementById('submissions-section')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };


    const handleShowDiagnostic = async () => {
        setShowEvaluationRecap(false);
        setShowStudentData(false);
        setShowSubmissions(false);
        setShowDiscovery(false);
        setShowTeacherForm(false);
        setSelectedDiagnostic(null);
        setShowItemAnalysis(false);

        setShowDiagnostic(true);
        await fetchDiagnosticSubmissions();
        setTimeout(() => {
            document.getElementById('diagnostic-section')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 150);
    };

    useEffect(() => {
        const checkAccess = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/login', { replace: true });
                return;
            }

            const { data: account, error } = await supabase
                .from('Info login')
                .select('nama, role')
                .eq('user_id', user.id)
                .maybeSingle();

            if (
                error ||
                !account ||
                !['admin', 'teacher'].includes(account.role)
            ) {
                await supabase.auth.signOut();
                navigate('/login', { replace: true });
                return;
            }

            setDisplayName(account.nama || 'Guru');
            setUserRole(account.role);
            setLoading(false);
        };

        void checkAccess();
    }, [navigate]);

    // Perbarui rekap secara berkala selama halaman rekap sedang dibuka.
    // Polling ini tidak memerlukan konfigurasi Supabase Realtime di dashboard/database.
    useEffect(() => {
        if (!showEvaluationRecap) return;

        const refreshEvaluationRecap = () => {
            void Promise.all([
                fetchStudents(true),
                fetchSubmissions(true),
                fetchDiscoveryPosts(true),
                fetchDiagnosticSubmissions(true),
            ]);
        };

        const refreshInterval = window.setInterval(
            refreshEvaluationRecap,
            10000
        );

        return () => window.clearInterval(refreshInterval);
    }, [showEvaluationRecap]);


    const handleShowStudents = async () => {
        setShowEvaluationRecap(false);
        setShowSubmissions(false);
        setShowDiagnostic(false);
        setShowDiscovery(false);
        setShowTeacherForm(false);
        setSelectedDiagnostic(null);

        setShowStudentData(true);
        await fetchStudents();

        setTimeout(() => {
            document.getElementById('student-data-section')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const handleShowItemAnalysis = async () => {
        setShowEvaluationRecap(false);
        setShowStudentData(false);
        setShowSubmissions(false);
        setShowDiagnostic(false);
        setShowDiscovery(false);
        setShowTeacherForm(false);
        setSelectedDiagnostic(null);
        setSelectedAnalysisQuestion(null);

        setShowItemAnalysis(true);
        await fetchItemAnalysis();

        setTimeout(() => {
            document.querySelector('.item-analysis-section')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 150);
    };

    const handleShowDiscovery = async () => {
        setShowEvaluationRecap(false);
        setShowStudentData(false);
        setShowSubmissions(false);
        setShowDiagnostic(false);
        setShowTeacherForm(false);
        setSelectedDiagnostic(null);
        setShowItemAnalysis(false);

        setShowDiscovery(true);
        await fetchDiscoveryPosts();

        setTimeout(() => {
            document.getElementById('discovery-section')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };
    const handleSubmitDiscoveryFeedback = async (postId: number) => {
        const feedback = discoveryFeedbackInputs[postId]?.trim();

        if (!feedback) {
            setDiscoveryError('Tuliskan feedback terlebih dahulu.');
            return;
        }

        const { data: userData, error: userError } =
            await supabase.auth.getUser();

        if (userError || !userData.user) {
            setDiscoveryError('Silakan login terlebih dahulu.');
            return;
        }

        const { data: profile, error: profileError } = await supabase
            .from('Info login')
            .select('role')
            .eq('user_id', userData.user.id)
            .single();

        if (profileError || !profile) {
            setDiscoveryError('Profil akun tidak ditemukan.');
            return;
        }

        if (profile.role !== 'teacher' && profile.role !== 'admin') {
            setDiscoveryError('Hanya guru yang dapat memberikan feedback.');
            return;
        }

        const { error } = await supabase
            .from('discovery_comments')
            .insert({
                post_id: postId,
                user_id: userData.user.id,
                comment: feedback,
                comment_type: 'teacher_feedback',
            });

        if (error) {
            console.error('Gagal menyimpan feedback guru:', error);
            setDiscoveryError('Feedback gagal dikirim. Silakan coba lagi.');
            return;
        }

        setDiscoveryFeedbackInputs((previous) => ({
            ...previous,
            [postId]: '',
        }));

        setDiscoveryError('');
        await fetchDiscoveryPosts();
    };
    const handleCreateTeacher = async () => {
        if (!teacherName.trim() || !teacherEmail.trim() || !teacherPassword) {
            setTeacherMessage('Nama, email, dan password wajib diisi.');
            return;
        }

        if (teacherPassword.length < 8) {
            setTeacherMessage('Password minimal 8 karakter.');
            return;
        }

        setCreatingTeacher(true);
        setTeacherMessage('');

        try {
            const { data, error } = await supabase.functions.invoke(
                'create-teacher-account',
                {
                    body: {
                        displayName: teacherName,
                        email: teacherEmail,
                        password: teacherPassword,
                    },
                }
            );

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            setTeacherMessage('Akun guru berhasil dibuat.');
            setTeacherName('');
            setTeacherEmail('');
            setTeacherPassword('');
        } catch (error) {
            setTeacherMessage(
                error instanceof Error
                    ? error.message
                    : 'Gagal membuat akun guru.'
            );
        } finally {
            setCreatingTeacher(false);
        }
    };
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login', { replace: true });
    };

    if (loading) {
        return <div style={{ padding: 40 }}>Memeriksa akses guru...</div>;
    }

    const menuItems = [
        { icon: '👥', title: 'Data Siswa', description: 'Identitas dan aktivitas siswa' },
        { icon: '🔬', title: 'Discovery Wall', description: 'Temuan dan feedback siswa' },
        { icon: '📝', title: 'Pengumpulan Tugas', description: 'Hasil pekerjaan setiap modul' },
        {
            icon: '🧪',
            title: 'Tes Diagnostik',
            description: 'Hasil asesmen awal pemahaman siswa',
        },
        {
            icon: '📈',
            title: 'Analisis Butir Soal Modul 7',
            description: 'Analisis tingkat kesulitan dan jawaban setiap soal'
        },
        { icon: '📊', title: 'Rekap Evaluasi', description: 'Hasil evaluasi pembelajaran' },
        ...(userRole === 'admin'
            ? [{
                icon: '👩‍🏫',
                title: 'Manajemen Akun Guru',
                description: 'Tambah dan kelola akun guru',
            }]
            : []),
    ];
    const module1Submissions = diagnosticSubmissions.filter(
        submission => submission.module_id === 'fenomena-air-minyak'
    );

    const diagnosticAnalysis = MODULE_1_DIAGNOSTIC.map(question => {
        const responses = module1Submissions.filter(
            submission =>
                typeof submission.answers[question.id] === 'string' &&
                submission.answers[question.id].trim() !== ''
        );

        const incorrectCount = responses.filter(
            submission =>
                submission.answers[question.id] !== question.correctOption
        ).length;

        return {
            id: question.id,
            question: question.question,
            totalResponses: responses.length,
            incorrectCount,
            incorrectPercentage: responses.length > 0
                ? (incorrectCount / responses.length) * 100
                : 0,
        };
    });

    const totalIncorrectAnswers = diagnosticAnalysis.reduce(
        (total, question) => total + question.incorrectCount,
        0
    );
    const diagnosticChartColors = [
        '#E76F51',
        '#E9C46A',
        '#2A9D8F',
        '#457B9D',
        '#9B5DE5',
    ];

    let currentPieOffset = 0;

    const diagnosticPieSegments = diagnosticAnalysis.map((question, index) => {
        const percentage = totalIncorrectAnswers > 0
            ? (question.incorrectCount / totalIncorrectAnswers) * 100
            : 0;

        const start = currentPieOffset;
        currentPieOffset += percentage;

        return {
            ...question,
            color: diagnosticChartColors[index % diagnosticChartColors.length],
            sharePercentage: percentage,
            start,
            end: currentPieOffset,
        };
    });

    const diagnosticPieGradient = totalIncorrectAnswers > 0
        ? `conic-gradient(${diagnosticPieSegments
            .filter(item => item.incorrectCount > 0)
            .map(item => `${item.color} ${item.start}% ${item.end}%`)
            .join(', ')})`
        : 'conic-gradient(#e5e7eb 0% 100%)';
    const diagnosticConceptMap: Record<
        string,
        { concept: string; recommendation: string }
    > = {
        d1: {
            concept: 'Ketidakcampuran air dan minyak',
            recommendation:
                'Ajak siswa mengamati pencampuran air dan minyak, kemudian diskusikan alasan keduanya membentuk dua lapisan.'
        },
        d2: {
            concept: 'Pencampuran sementara dan pemisahan kembali',
            recommendation:
                'Lakukan demonstrasi pengocokan air dan minyak. Minta siswa mengamati perubahan campuran sebelum dan setelah didiamkan.'
        },
        d3: {
            concept: 'Perbedaan sifat zat cair',
            recommendation:
                'Ajak siswa membandingkan karakteristik air dan minyak berdasarkan hasil pengamatan sederhana.'
        },
        d4: {
            concept: 'Massa jenis dan pembentukan lapisan',
            recommendation:
                'Gunakan demonstrasi dua lapisan cairan untuk menjelaskan hubungan massa jenis dengan posisi minyak dan air.'
        },
        d5: {
            concept: 'Peran sabun dalam pendispersian minyak',
            recommendation:
                'Demonstrasikan pencucian minyak menggunakan air saja dan air sabun. Diskusikan perbedaan hasil pengamatannya.'
        }
    };

    const diagnosticRecommendations = diagnosticAnalysis
        .filter(question => question.totalResponses > 0)
        .map(question => ({
            ...question,
            ...(diagnosticConceptMap[question.id] || {
                concept: 'Konsep belum dipetakan',
                recommendation: 'Tinjau kembali pembahasan soal ini.'
            })
        }))
        .sort((a, b) => b.incorrectPercentage - a.incorrectPercentage);

    const highestErrorQuestion = diagnosticRecommendations[0];
    const normalizeStudentKey = (name: string, className: string | null | undefined) => `${name.trim().toLowerCase()}|${(className || '').trim().toLowerCase()}`;
    const module7Keys = new Set(module7Submissions.map(item => normalizeStudentKey(item.student_name, item.student_class)));
    const essayKeys = new Set(essaySubmissions.map(item => normalizeStudentKey(item.student_name, item.student_class)));
    const discoveryKeys = new Set(discoveryPosts.map(item => normalizeStudentKey(item.name, item.className)));
    const evaluationKeys = new Set([...module7Keys, ...diagnosticSubmissions.map(item => normalizeStudentKey(item.student_name, item.student_class))]);
    const activityKeys = new Set([...module7Keys, ...essayKeys, ...discoveryKeys, ...diagnosticSubmissions.map(item => normalizeStudentKey(item.student_name, item.student_class))]);
    const completedCount = students.filter(student => module7Keys.has(normalizeStudentKey(student.nama, student.kelas))).length;
    const learningCount = students.filter(student => activityKeys.has(normalizeStudentKey(student.nama, student.kelas)) && !evaluationKeys.has(normalizeStudentKey(student.nama, student.kelas))).length;
    const evaluatedCount = students.filter(student => evaluationKeys.has(normalizeStudentKey(student.nama, student.kelas))).length;

    return (
        <main className="teacher-dashboard">
            <header className="dashboard-header">
                <div className="dashboard-brand">
                    <h1 style={{ color: '#245b46', marginBottom: 4 }}>
                        IMF Explorer
                    </h1>
                    <p style={{ color: '#718096', margin: 0 }}>
                        Dashboard Mode Guru
                    </p>
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Keluar
                </button>
            </header>

            <section className="dashboard-welcome">
                <h2>Selamat datang, {displayName}!</h2>
                <p style={{ color: '#718096' }}>
                    Pantau aktivitas dan hasil pembelajaran siswa di sini.
                </p>
            </section>

            <section className="dashboard-menu-grid">
                {menuItems.map((item) => (
                    <article
                        key={item.title}
                        className="dashboard-menu-card"
                    >
                        <div className="menu-icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p style={{ color: '#718096' }}>
                            {item.description}
                        </p>
                        {item.title === 'Data Siswa' ? (
                            <button
                                className="menu-action-button"
                                onClick={handleShowStudents}
                            >
                                Lihat Data Siswa
                            </button>
                        ) : item.title === 'Pengumpulan Tugas' ? (
                            <button
                                className="menu-action-button"
                                onClick={handleShowSubmissions}
                            >
                                Lihat Pengumpulan Tugas
                            </button>

                        ) : item.title === 'Tes Diagnostik' ? (
                            <button
                                className="menu-action-button"
                                onClick={handleShowDiagnostic}
                            >
                                Lihat Hasil Tes Diagnostik
                            </button>
                        ) : item.title === 'Discovery Wall' ? (
                            <button
                                className="menu-action-button"
                                onClick={handleShowDiscovery}
                            >
                                Lihat Discovery Wall
                            </button>
                        ) : item.title === 'Rekap Evaluasi' ? (
                            <button className="menu-action-button" onClick={handleShowEvaluationRecap}>
                                Lihat Rekap Evaluasi
                            </button>
                        ) : item.title === 'Analisis Butir Soal Modul 7' ? (
                            <button
                                className="menu-action-button"
                                onClick={handleShowItemAnalysis}
                            >
                                Lihat Analisis Butir Soal
                            </button>
                        ) : (
                            <span>Segera tersedia</span>
                        )}
                        {item.title === 'Manajemen Akun Guru' && (
                            <button
                                className="menu-action-button"
                                onClick={() => {
                                    setShowStudentData(false);
                                    setShowDiagnostic(false);
                                    setShowSubmissions(false);
                                    setSelectedDiagnostic(null);
                                    setShowTeacherForm(true);
                                    setShowItemAnalysis(false);
                                    setShowDiscovery(false);
                                }}
                                style={{ marginTop: 12 }}
                            >
                                Kelola Akun Guru
                            </button>
                        )}
                    </article>
                ))}
            </section>
            {showEvaluationRecap && (
                <section id="evaluation-recap-section" style={{ background: '#fff', padding: 24, borderRadius: 16, marginTop: 24, boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                        <div><h2 style={{ color: '#245b46', margin: '0 0 4px' }}>Rekap Evaluasi Pembelajaran</h2><p style={{ color: '#718096', margin: 0 }}>Dashboard pemantauan perkembangan belajar siswa</p></div>
                        <button className="menu-action-button" onClick={handleShowEvaluationRecap} disabled={loadingStudents || loadingSubmissions || loadingDiscovery || loadingDiagnostic}>Muat ulang</button>
                    </div>
                    {(studentError || submissionError || discoveryError || diagnosticError) && <p style={{ color: '#b91c1c' }}>{studentError || submissionError || discoveryError || diagnosticError}</p>}
                    {(loadingStudents || loadingSubmissions || loadingDiscovery || loadingDiagnostic) ? <p>Memuat data aktual siswa...</p> : <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
                            {[
                                ['Total siswa', students.length, 'Terdaftar pada data akun siswa'],
                                ['Selesai belajar', completedCount, 'Telah mengumpulkan evaluasi Modul 7'],
                                ['Sedang belajar', learningCount, 'Ada aktivitas tercatat, belum terdeteksi evaluasi'],
                                ['Sudah evaluasi', evaluatedCount, 'Mengumpulkan tes diagnostik atau Modul 7'],
                            ].map(([label, value, note]) => <div key={String(label)} style={{ padding: 18, borderRadius: 12, background: '#f0f7f3', border: '1px solid #d8e9df' }}><p style={{ margin: 0, color: '#526581' }}>{label}</p><h2 style={{ margin: '8px 0', color: '#245b46', fontSize: 30 }}>{value}</h2><small style={{ color: '#718096' }}>{note}</small></div>)}
                        </div>
                        <h3 style={{ color: '#245b46' }}>Tabel perkembangan siswa</h3>
                        <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', minWidth: 650, borderCollapse: 'collapse' }}><thead><tr style={{ background: '#eaf3ee', textAlign: 'left' }}>{['Nama siswa', 'Progres', 'Evaluasi', 'Data aktual'].map(label => <th key={label} style={{ padding: 12 }}>{label}</th>)}</tr></thead><tbody>
                            {students.map(student => { const key = normalizeStudentKey(student.nama, student.kelas); const hasActivity = activityKeys.has(key); const hasEvaluation = evaluationKeys.has(key); const isComplete = module7Keys.has(key); return <tr key={student.user_id} style={{ borderBottom: '1px solid #e5e7eb' }}><td style={{ padding: 12 }}>{student.nama}<br /><small style={{ color: '#718096' }}>{student.kelas || '-'}</small></td><td style={{ padding: 12 }}>{isComplete ? 'Selesai belajar' : hasActivity ? 'Aktivitas tercatat' : 'Belum ada aktivitas'}</td><td style={{ padding: 12 }}>{hasEvaluation ? 'Sudah evaluasi' : 'Belum evaluasi'}</td><td style={{ padding: 12 }}>{[module7Keys.has(key) ? 'Modul 7' : '', diagnosticSubmissions.some(item => normalizeStudentKey(item.student_name, item.student_class) === key) ? 'Tes diagnostik' : '', essayKeys.has(key) ? 'Esai' : '', discoveryKeys.has(key) ? 'Discovery Wall' : ''].filter(Boolean).join(', ') || 'Belum ada data'}</td></tr>; })}
                            {students.length === 0 && <tr><td colSpan={4} style={{ padding: 16, textAlign: 'center' }}>Belum ada data siswa.</td></tr>}
                        </tbody></table></div>
                        <p style={{ color: '#718096', fontSize: 12, marginTop: 14 }}>Catatan: status “Sedang belajar” di sini berarti ada aktivitas yang tercatat tetapi belum ada evaluasi, bukan indikator aktivitas real-time. Pencocokan data pengumpulan menggunakan nama dan kelas siswa.</p>
                    </>}
                    <button style={{ marginTop: 16 }} onClick={() => setShowEvaluationRecap(false)}>Tutup rekap</button>
                </section>
            )}
            {showItemAnalysis && (
                <section className="item-analysis-section">

                    {/* HEADER ANALISIS */}
                    <div className="item-analysis-header">

                        <div>
                            <h2 className="item-analysis-title">
                                Analisis Butir Soal Modul 7
                            </h2>

                            <p className="item-analysis-description">
                                Evaluasi kualitas soal berdasarkan jawaban siswa,
                                tingkat kesukaran, daya pembeda, dan efektivitas pengecoh.
                            </p>
                        </div>

                        <div className="item-analysis-actions">

                            <button
                                className="item-analysis-primary"
                                onClick={fetchItemAnalysis}
                                disabled={loadingItemAnalysis}
                            >
                                {loadingItemAnalysis ? 'Memuat...' : '↻ Muat Ulang'}
                            </button>

                            <button
                                className="item-analysis-secondary"
                                onClick={() => {
                                    setShowItemAnalysis(false);
                                    setSelectedAnalysisQuestion(null);
                                }}
                            >
                                Tutup ✕
                            </button>

                        </div>
                    </div>

                    {!loadingItemAnalysis &&
                        !itemAnalysisError &&
                        analysisSubmissions.length > 0 && (
                            <div className="item-analysis-stat-grid">
                                {/* Kartu Jumlah Peserta */}
                                <div className="item-analysis-stat-card participants">
                                    <div className="stat-card-icon">👥</div>
                                    <p>Jumlah Peserta</p>
                                    <h2>{totalParticipants} Siswa</h2>
                                    <span>Jumlah siswa yang mengikuti evaluasi</span>
                                </div>

                                {/* Kartu Rata-rata Nilai */}
                                <div className="item-analysis-stat-card average">
                                    <div className="stat-card-icon">📊</div>
                                    <p>Rata-rata Nilai</p>
                                    <h2>{averageScore.toFixed(2)} / 10</h2>
                                    <span>{averagePercentage.toFixed(1)}% dari nilai maksimal</span>
                                </div>

                                {/* Kartu Soal Paling Banyak Salah */}
                                <div className="item-analysis-stat-card difficult">
                                    <div className="stat-card-icon">⚠️</div>
                                    <p>Soal Paling Banyak Dijawab Salah</p>

                                    {mostDifficultQuestion ? (
                                        <>
                                            <h2>
                                                {mostDifficultQuestion.id.toUpperCase()}
                                            </h2>
                                            <span>
                                                {mostDifficultQuestion.incorrect} siswa salah
                                                ({mostDifficultQuestion.incorrectPercentage.toFixed(1)}%)
                                            </span>
                                        </>
                                    ) : (
                                        <span>Belum tersedia</span>
                                    )}
                                </div>
                            </div>
                        )}

                    <div className="item-analysis-table-section">
                        <div className="item-analysis-section-heading">
                            <div>
                                <h3>Peringkat Jawaban Siswa per Butir Soal</h3>
                                <p>
                                    Klik salah satu baris untuk melihat detail analisis soal.
                                </p>
                            </div>
                            <span className="item-analysis-total">
                                {itemAnalysis.length} Butir Soal
                            </span>
                        </div>

                        <div className="item-analysis-table-wrapper">
                            <table className="item-analysis-table">
                                <thead>
                                    <tr>
                                        <th>Peringkat</th>
                                        <th>Nomor Soal</th>
                                        <th className="topic-column">Topik</th>
                                        <th>Benar</th>
                                        <th>Salah</th>
                                        <th>Persentase Salah</th>
                                        <th>Tingkat Kesukaran</th>
                                        <th>Daya Pembeda</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {itemAnalysis.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => {
                                                setSelectedAnalysisQuestion(item.id);

                                                setTimeout(() => {
                                                    questionAnalysisDetailRef.current?.scrollIntoView({
                                                        behavior: 'smooth',
                                                        block: 'start'
                                                    });
                                                }, 100);
                                            }}
                                            className={
                                                selectedAnalysisQuestion === item.id
                                                    ? 'selected'
                                                    : ''
                                            }
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s ease'
                                            }}
                                            title="Klik untuk melihat ringkasan analisis soal"
                                        >
                                            <td>
                                                <span className="item-analysis-rank">
                                                    {index + 1}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="item-analysis-question-id">
                                                    {item.id.toUpperCase()}
                                                </span>
                                            </td>

                                            <td className="topic-column">
                                                {item.topic}
                                            </td>

                                            <td>
                                                <span className="item-analysis-correct">
                                                    {item.correct}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="item-analysis-incorrect">
                                                    {item.incorrect}
                                                </span>
                                            </td>

                                            <td>
                                                <span className={
                                                    item.incorrectPercentage >= 70
                                                        ? 'item-analysis-error high'
                                                        : 'item-analysis-error'
                                                }>
                                                    {item.incorrectPercentage.toFixed(1)}%
                                                </span>
                                            </td>

                                            <td>
                                                <span className="item-analysis-category">
                                                    {item.difficultyCategory}
                                                </span>
                                                <small>
                                                    P = {item.difficultyIndex !== null
                                                        ? item.difficultyIndex.toFixed(2)
                                                        : '-'}
                                                </small>
                                            </td>

                                            <td>
                                                <span className="item-analysis-category">
                                                    {item.discriminationCategory}
                                                </span>
                                                <small>
                                                    D = {item.discriminationIndex !== null
                                                        ? item.discriminationIndex.toFixed(2)
                                                        : '-'}
                                                </small>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    {selectedQuestionAnalysis && selectedQuestionDetail && (
                        <div
                            ref={questionAnalysisDetailRef}
                            className="item-analysis-question-detail"
                        >
                            <h3 style={{ color: '#245b46' }}>
                                Detail Analisis {selectedQuestionAnalysis.id.toUpperCase()}
                            </h3>

                            <p>
                                <strong>Topik:</strong> {selectedQuestionDetail.topic}
                            </p>

                            <p>
                                <strong>Stimulus:</strong>
                            </p>

                            <div style={{ whiteSpace: 'pre-line', marginBottom: 16 }}>
                                {selectedQuestionDetail.stimulus}
                            </div>

                            <p>
                                <strong>Pertanyaan:</strong>{' '}
                                {selectedQuestionDetail.question}
                            </p>

                            <p>
                                <strong>Kunci Jawaban:</strong>{' '}
                                {selectedQuestionAnalysis.correctAnswer}
                            </p>

                            <p>
                                <strong>Indikator Soal:</strong>{' '}
                                {selectedQuestionDetail.indicator}
                            </p>

                            <h4>Distribusi Pilihan Jawaban</h4>

                            {selectedQuestionAnalysis.options.map((option) => {
                                const count =
                                    selectedQuestionAnalysis.distribution[option.label];

                                const percentage =
                                    selectedQuestionAnalysis.totalAnswered > 0
                                        ? (count / selectedQuestionAnalysis.totalAnswered) * 100
                                        : 0;

                                return (
                                    <div
                                        className="item-analysis-option-header"
                                        style={{ marginBottom: 14 }}>
                                        <div
                                            className="item-analysis-option-header"
                                            style={{
                                                justifyContent: 'space-between',
                                                gap: 12,
                                            }}>
                                            <strong>
                                                {option.label}
                                                {option.label === selectedQuestionAnalysis.correctAnswer
                                                    ? ' (Kunci)'
                                                    : ''}
                                            </strong>
                                            <span>
                                                {count} siswa ({percentage.toFixed(1)}%)
                                            </span>
                                        </div>

                                        <p style={{ margin: '4px 0' }}>
                                            {option.text}
                                        </p>

                                        <div
                                            className="item-analysis-progress"
                                            style={{
                                                height: 9,
                                                background: '#e5e7eb',
                                                borderRadius: 10,
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                className="item-analysis-progress-fill"
                                                style={{
                                                    width: `${percentage}%`,
                                                    height: '100%',
                                                    background:
                                                        option.label === selectedQuestionAnalysis.correctAnswer
                                                            ? '#269b68'
                                                            : '#8b9ba8',
                                                    borderRadius: 10,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}


                            <div className="item-analysis-metric-grid">
                                {/* Kartu Analisis Tingkat Kesukaran */}
                                <div className="item-analysis-metric-card">
                                    <h4>Analisis Tingkat Kesukaran</h4>

                                    <div className="metric-value">
                                        {selectedQuestionAnalysis.difficultyIndex != null
                                            ? selectedQuestionAnalysis.difficultyIndex.toFixed(2)
                                            : '-'}
                                    </div>

                                    <p>Indeks Kesukaran (P)</p>

                                    <div className="metric-category">
                                        {selectedQuestionAnalysis.difficultyCategory}
                                    </div>
                                </div>

                                {/* Kartu Analisis Daya Pembeda */}
                                <div className="item-analysis-metric-card">
                                    <h4>Analisis Daya Pembeda</h4>

                                    <div className="metric-value">
                                        {selectedQuestionAnalysis.discriminationIndex != null
                                            ? selectedQuestionAnalysis.discriminationIndex.toFixed(2)
                                            : '-'}
                                    </div>

                                    <p>Indeks Daya Pembeda (D)</p>

                                    <div className="metric-category">
                                        {selectedQuestionAnalysis.discriminationCategory}
                                    </div>
                                </div>
                            </div>

                            <h4>Analisis Efektivitas Pengecoh</h4>

                            <p style={{ color: '#718096', fontSize: 13 }}>
                                Pengecoh dinilai berfungsi apabila dipilih minimal 5% dari
                                siswa yang memberikan jawaban valid.
                            </p>

                            <div className="distractor-analysis-wrapper">
                                <table className="distractor-analysis-table">
                                    <thead>
                                        <tr style={{ background: '#f0f7f3' }}>
                                            <th style={{ padding: 10 }}>Pilihan</th>
                                            <th style={{ padding: 10 }}>Jumlah Pemilih</th>
                                            <th style={{ padding: 10 }}>Persentase</th>
                                            <th style={{ padding: 10 }}>Keterangan</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedQuestionAnalysis.distractorAnalysis.map((option) => (
                                            <tr key={option.label}>
                                                <td style={{ padding: 10, textAlign: 'center' }}>
                                                    <strong>{option.label}</strong>
                                                </td>

                                                <td style={{ padding: 10, textAlign: 'center' }}>
                                                    {option.count} siswa
                                                </td>

                                                <td style={{ padding: 10, textAlign: 'center' }}>
                                                    {option.percentage.toFixed(1)}%
                                                </td>

                                                <td style={{ padding: 10, textAlign: 'center' }}>
                                                    {option.isCorrect ? (
                                                        <span style={{ color: '#269b68', fontWeight: 600 }}>
                                                            Kunci Jawaban
                                                        </span>
                                                    ) : option.isEffective ? (
                                                        <span style={{ color: '#269b68' }}>
                                                            Berfungsi
                                                        </span>
                                                    ) : (
                                                        <span style={{ color: '#c0392b' }}>
                                                            Kurang Berfungsi
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                            <div className="answer-summary-section">
                                <h4>Ringkasan Jawaban</h4>

                                <div className="answer-summary-grid">
                                    <div className="answer-summary-card correct">
                                        <span className="answer-summary-icon">✓</span>
                                        <p>Jawaban Benar</p>
                                        <h3>
                                            {Math.round(
                                                selectedQuestionAnalysis.totalAnswered *
                                                selectedQuestionAnalysis.correctPercentage / 100
                                            )}
                                        </h3>
                                        <span>Siswa menjawab benar</span>
                                    </div>

                                    <div className="answer-summary-card incorrect">
                                        <span className="answer-summary-icon">✕</span>
                                        <p>Jawaban Salah</p>
                                        <h3>
                                            {Math.round(
                                                selectedQuestionAnalysis.totalAnswered *
                                                selectedQuestionAnalysis.incorrectPercentage / 100
                                            )}
                                        </h3>
                                        <span>Siswa menjawab salah</span>
                                    </div>

                                    <div className="answer-summary-card correct">
                                        <span className="answer-summary-icon">%</span>
                                        <p>Persentase Benar</p>
                                        <h3>{selectedQuestionAnalysis.correctPercentage.toFixed(1)}%</h3>                                        <span>Tingkat jawaban benar</span>
                                    </div>

                                    <div className="answer-summary-card incorrect">
                                        <span className="answer-summary-icon">%</span>
                                        <p>Persentase Salah</p>
                                        <h3>{selectedQuestionAnalysis.incorrectPercentage.toFixed(1)}%</h3>                                        <span>Tingkat jawaban salah</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {loadingItemAnalysis ? (
                        <p>Memuat data jawaban siswa...</p>
                    ) : itemAnalysisError ? (
                        <p style={{ color: 'red' }}>
                            {itemAnalysisError}
                        </p>
                    ) : analysisSubmissions.length === 0 ? (
                        <p>Belum ada siswa yang mengumpulkan evaluasi Modul 7.</p>
                    ) : (
                        <p>
                            Data jawaban berhasil dimuat.
                            Jumlah peserta: {analysisSubmissions.length} siswa.
                        </p>
                    )}
                </section>
            )}
            {showStudentData && (
                <section
                    id="student-data-section"
                    style={{
                        background: '#ffffff',
                        padding: 24,
                        borderRadius: 16,
                        marginTop: 24,
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                        overflowX: 'auto',
                    }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 12,
                        marginBottom: 20,
                    }}>
                        <div>
                            <h2 style={{ color: '#245b46', marginBottom: 4 }}>
                                Data Siswa
                            </h2>
                            <p style={{ color: '#718096', margin: 0 }}>
                                Jumlah siswa terdaftar: {students.length}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <button
                                onClick={() => void fetchStudents()}
                                disabled={loadingStudents}
                            >
                                {loadingStudents ? 'Memuat...' : 'Muat Ulang'}
                            </button>

                            <button
                                onClick={() => setShowStudentData(false)}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>

                    {loadingStudents ? (
                        <p>Memuat data siswa...</p>
                    ) : studentError ? (
                        <p style={{ color: '#dc2626' }}>
                            {studentError}
                        </p>
                    ) : students.length === 0 ? (
                        <p>Belum ada siswa yang terdaftar.</p>
                    ) : (
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            minWidth: 650,
                        }}>
                            <thead>
                                <tr style={{
                                    background: '#eaf3ee',
                                    color: '#245b46',
                                    textAlign: 'left',
                                }}>
                                    <th style={{ padding: 12 }}>No.</th>
                                    <th style={{ padding: 12 }}>Nama Siswa</th>
                                    <th style={{ padding: 12 }}>Kelas</th>
                                </tr>
                            </thead>

                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={student.user_id}>
                                        <td style={{ padding: 12 }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ padding: 12 }}>
                                            {student.nama || '-'}
                                        </td>
                                        <td style={{ padding: 12 }}>
                                            {student.kelas || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            )}

            {showDiagnostic && (
                <section
                    id="diagnostic-section"
                    style={{
                        background: '#ffffff',
                        padding: 24,
                        borderRadius: 16,
                        marginTop: 24,
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                        overflowX: 'auto',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 12,
                        marginBottom: 20,
                    }}>
                        <div>
                            <h2 style={{ margin: 0 }}>Hasil Tes Diagnostik</h2>
                            <p style={{ color: '#666', marginBottom: 0 }}>
                                Rekap hasil asesmen awal pemahaman siswa
                            </p>
                        </div>

                        <span>
                            Total peserta: <strong>{diagnosticSubmissions.length} siswa</strong>
                        </span>
                    </div>

                    {loadingDiagnostic ? (
                        <p>Memuat hasil tes diagnostik...</p>
                    ) : diagnosticError ? (
                        <p style={{ color: 'red' }}>{diagnosticError}</p>
                    ) : diagnosticSubmissions.length === 0 ? (
                        <p>Belum ada siswa yang mengumpulkan tes diagnostik.</p>
                    ) : (
                        <>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(220px, 1fr) minmax(280px, 2fr)',
                                gap: 28,
                                alignItems: 'center',
                                background: '#f8faf9',
                                padding: 20,
                                borderRadius: 14,
                                marginBottom: 24,
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ color: '#245b46' }}>
                                        Proporsi Jawaban Salah
                                    </h3>

                                    <div style={{
                                        width: 190,
                                        height: 190,
                                        borderRadius: '50%',
                                        background: diagnosticPieGradient,
                                        margin: '16px auto',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <div style={{
                                            width: 105,
                                            height: 105,
                                            borderRadius: '50%',
                                            background: '#ffffff',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <strong style={{ fontSize: 28, color: '#245b46' }}>
                                                {totalIncorrectAnswers}
                                            </strong>
                                            <span style={{ fontSize: 12, color: '#718096' }}>
                                                Jawaban salah
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ color: '#245b46' }}>
                                        Analisis Kesalahan per Soal
                                    </h3>

                                    {diagnosticPieSegments.map((question, index) => (
                                        <div key={question.id} style={{ marginBottom: 14 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                gap: 12,
                                                marginBottom: 5,
                                            }}>
                                                <strong>Soal {index + 1}</strong>
                                                <span>
                                                    {question.incorrectCount} salah dari {question.totalResponses} siswa
                                                </span>
                                            </div>

                                            <div style={{
                                                height: 12,
                                                background: '#e5e7eb',
                                                borderRadius: 20,
                                                overflow: 'hidden',
                                            }}>
                                                <div style={{
                                                    width: `${question.incorrectPercentage}%`,
                                                    height: '100%',
                                                    background: question.color,
                                                    borderRadius: 20,
                                                }} />
                                            </div>

                                            <span style={{ fontSize: 13, color: '#718096' }}>
                                                {question.incorrectPercentage.toFixed(1)}% siswa menjawab salah
                                            </span>
                                        </div>
                                    ))}

                                    {diagnosticAnalysis.length > 0 && (
                                        <p style={{
                                            marginTop: 18,
                                            padding: 12,
                                            background: '#fff4e5',
                                            borderRadius: 8,
                                            color: '#8a5200',
                                        }}>
                                            <strong>Perhatian:</strong>{' '}
                                            {diagnosticAnalysis.some(q => q.totalResponses > 0)
                                                ? `Soal ${diagnosticAnalysis.reduce((highest, current) =>
                                                    current.incorrectPercentage > highest.incorrectPercentage
                                                        ? current
                                                        : highest
                                                ).id.replace('d', '')} memiliki persentase kesalahan tertinggi.`
                                                : 'Belum ada jawaban siswa untuk dianalisis.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {highestErrorQuestion && highestErrorQuestion.incorrectPercentage > 0 && (
                                <div style={{
                                    marginBottom: 24,
                                    padding: 20,
                                    background: '#fff8e8',
                                    border: '1px solid #f0d58a',
                                    borderRadius: 12,
                                }}>
                                    <h3 style={{
                                        color: '#8a5200',
                                        marginTop: 0,
                                        marginBottom: 12,
                                    }}>
                                        Rekomendasi Tindak Lanjut Pembelajaran
                                    </h3>

                                    <p>
                                        <strong>Materi yang perlu diperkuat:</strong>{' '}
                                        {highestErrorQuestion.concept}
                                    </p>

                                    <p>
                                        <strong>Persentase kesalahan:</strong>{' '}
                                        {highestErrorQuestion.incorrectPercentage.toFixed(1)}%
                                    </p>

                                    <p>
                                        <strong>Rekomendasi:</strong>{' '}
                                        {highestErrorQuestion.recommendation}
                                    </p>
                                </div>
                            )}
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                minWidth: 750,
                            }}>
                                <thead>
                                    <tr style={{ background: '#f3f4f6' }}>
                                        {[
                                            'No.',
                                            'Nama Siswa',
                                            'Kelas',
                                            'Modul',
                                            'Jawaban Benar',
                                            'Nilai',
                                            'Waktu Pengerjaan',
                                            'Aksi',
                                        ].map((heading) => (
                                            <th
                                                key={heading}
                                                style={{
                                                    padding: 12,
                                                    textAlign: 'left',
                                                    borderBottom: '1px solid #ddd',
                                                }}
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {diagnosticSubmissions.map((item, index) => (
                                        <tr key={item.id}>
                                            <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                                                {index + 1}
                                            </td>
                                            <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                                                {item.student_name}
                                            </td>
                                            <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                                                {item.student_class}
                                            </td>
                                            <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                                                {item.module_id}
                                            </td>
                                            <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                                                {item.correct_count}/{item.total_questions}
                                            </td>
                                            <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                                                {item.score.toFixed(2)}
                                            </td>
                                            <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                                                {new Date(item.submitted_at).toLocaleString('id-ID')}
                                            </td>
                                            <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                                                <button
                                                    onClick={() => setSelectedDiagnostic(item)}
                                                    style={{
                                                        padding: '8px 12px',
                                                        background: '#176b55',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        borderRadius: 8,
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Lihat Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </section>
            )}

            {showDiscovery && (
                <section
                    id="discovery-section"
                    style={{
                        background: '#ffffff',
                        padding: 24,
                        borderRadius: 16,
                        marginTop: 24,
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                    }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 12,
                        marginBottom: 20,
                    }}>
                        <div>
                            <h2 style={{ color: '#245b46', marginBottom: 4 }}>
                                Discovery Wall
                            </h2>
                            <p style={{ color: '#718096', margin: 0 }}>
                                Temuan dan tanggapan siswa selama kegiatan pembelajaran.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <button
                                onClick={() => void fetchDiscoveryPosts()}
                                disabled={loadingDiscovery}
                            >
                                {loadingDiscovery ? 'Memuat...' : 'Muat Ulang'}
                            </button>

                            <button
                                onClick={() => setShowDiscovery(false)}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>

                    <p style={{ color: '#718096' }}>
                        Jumlah temuan: {discoveryPosts.length}
                    </p>

                    {loadingDiscovery ? (
                        <p>Memuat temuan siswa...</p>
                    ) : discoveryError ? (
                        <p style={{ color: '#dc2626' }}>
                            {discoveryError}
                        </p>
                    ) : discoveryPosts.length === 0 ? (
                        <p>Belum ada temuan yang dibagikan siswa.</p>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 20,
                        }}>
                            {discoveryPosts.map((post, index) => (<article
                                key={post.id}
                                style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: 14,
                                    padding: 20,
                                    background: '#fcfdfc',
                                }}
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setExpandedDiscoveryPostId(
                                            expandedDiscoveryPostId === post.id ? null : post.id
                                        )
                                    }

                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 16,
                                        flexWrap: 'wrap',
                                        padding: '18px 20px',
                                        border: `1px solid ${[
                                            '#7DD3FC',
                                            '#F9A8D4',
                                            '#86EFAC',
                                        ][index % 3]}`,
                                        borderRadius: 10,
                                        background: [
                                            '#E0F2FE',
                                            '#FCE7F3',
                                            '#DCFCE7',
                                        ][index % 3],
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.035)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <div>
                                        <strong style={{ color: '#245b46', fontSize: 15 }}>
                                            {post.name}
                                        </strong>

                                        <p style={{
                                            color: '#718096',
                                            fontSize: 13,
                                            margin: '5px 0',
                                        }}>
                                            {post.className} ·{' '}
                                            {new Date(post.created_at).toLocaleString('id-ID')}
                                        </p>

                                        <div style={{
                                            display: 'flex',
                                            gap: 8,
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        }}>
                                            <span style={{
                                                background: '#eef2ff',
                                                color: '#4f46e5',
                                                padding: '5px 10px',
                                                borderRadius: 20,
                                                fontSize: 12,
                                            }}>
                                                {post.simulation_title}
                                            </span>

                                            <span style={{ color: '#718096', fontSize: 12 }}>
                                                {post.comments.length} tanggapan
                                            </span>
                                        </div>
                                    </div>

                                    <span style={{
                                        color: '#245b46',
                                        fontSize: 22,
                                        fontWeight: 600,
                                    }}>
                                        {expandedDiscoveryPostId === post.id ? '−' : '+'}
                                    </span>
                                </button>

                                {expandedDiscoveryPostId === post.id && (
                                    <>
                                        < div style={{
                                            marginTop: 16,
                                            lineHeight: 1.7,
                                            whiteSpace: 'pre-wrap',
                                            color: '#374151',
                                        }}>
                                            {post.discovery}
                                        </div>

                                        <div
                                            style={{
                                                borderTop: '1px solid #e5e7eb',
                                                marginTop: 18,
                                                paddingTop: 14,
                                            }}
                                        >
                                            <strong style={{ color: '#526581' }}>
                                                💬 Diskusi Penjelajah ({post.comments.length})
                                            </strong>

                                            {post.comments.length === 0 ? (
                                                <p style={{
                                                    color: '#9ca3af',
                                                    fontSize: 13,
                                                }}>
                                                    Belum ada tanggapan. Jadilah yang pertama memberikan apresiasi!
                                                </p>
                                            ) : (
                                                <div style={{
                                                    display: 'grid',
                                                    gap: 10,
                                                    marginTop: 12,
                                                }}>
                                                    {post.comments.map((comment) => {
                                                        const isTeacherFeedback =
                                                            comment.comment_type === 'teacher_feedback' ||
                                                            comment.role === 'teacher' ||
                                                            comment.role === 'admin';

                                                        return (
                                                            <div
                                                                key={comment.id}
                                                                style={{
                                                                    background: isTeacherFeedback
                                                                        ? '#ecfdf5'
                                                                        : '#f3f5ff',
                                                                    borderLeft: isTeacherFeedback
                                                                        ? '4px solid #10b981'
                                                                        : '4px solid #818cf8',
                                                                    borderRadius: 8,
                                                                    padding: 12,
                                                                }}
                                                            >
                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    flexWrap: 'wrap',
                                                                    gap: 6,
                                                                }}>
                                                                    <strong style={{
                                                                        fontSize: 13,
                                                                        color: isTeacherFeedback
                                                                            ? '#047857'
                                                                            : '#526581',
                                                                    }}>
                                                                        {isTeacherFeedback ? '🌿 ' : '💬 '}
                                                                        {comment.name}
                                                                    </strong>

                                                                    <span style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 600,
                                                                        color: isTeacherFeedback
                                                                            ? '#047857'
                                                                            : '#6366f1',
                                                                        background: isTeacherFeedback
                                                                            ? '#d1fae5'
                                                                            : '#e0e7ff',
                                                                        padding: '4px 8px',
                                                                        borderRadius: 20,
                                                                    }}>
                                                                        {isTeacherFeedback
                                                                            ? 'Feedback dari Guru'
                                                                            : 'Teman Penjelajah'}
                                                                    </span>
                                                                </div>

                                                                <p style={{
                                                                    margin: '8px 0 0',
                                                                    color: '#374151',
                                                                    fontSize: 13,
                                                                    lineHeight: 1.6,
                                                                    whiteSpace: 'pre-wrap',
                                                                }}>
                                                                    {comment.comment}
                                                                </p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        {/* Feedback dari guru */}
                                        <div style={{
                                            borderTop: '1px solid #e5e7eb',
                                            marginTop: 18,
                                            paddingTop: 14,
                                        }}>
                                            <strong style={{ color: '#245b46' }}>
                                                Feedback Guru
                                            </strong>

                                            <textarea
                                                value={discoveryFeedbackInputs[post.id] || ''}
                                                onChange={(e) =>
                                                    setDiscoveryFeedbackInputs((previous) => ({
                                                        ...previous,
                                                        [post.id]: e.target.value,
                                                    }))
                                                }
                                                placeholder="Berikan tanggapan atau arahan untuk temuan siswa..."
                                                rows={3}
                                                style={{
                                                    width: '100%',
                                                    boxSizing: 'border-box',
                                                    marginTop: 10,
                                                    padding: 12,
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: 8,
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit',
                                                }}
                                            />

                                            {discoveryError && (
                                                <p style={{
                                                    color: '#dc2626',
                                                    fontSize: 13,
                                                }}>
                                                    {discoveryError}
                                                </p>
                                            )}


                                            <button
                                                onClick={() =>
                                                    handleSubmitDiscoveryFeedback(post.id)
                                                }
                                                style={{
                                                    marginTop: 12,
                                                    padding: '11px 20px',
                                                    background: '#245b46',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s ease',
                                                }}
                                            >
                                                🌿 Kirim Feedback
                                            </button>

                                        </div>

                                    </>
                                )}
                            </article>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {selectedDiagnostic && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <section
                        style={{
                            background: '#ffffff',
                            width: '100%',
                            maxWidth: 900,
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            borderRadius: 16,
                            padding: 24,
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                            marginBottom: 20,
                        }}>
                            <div>
                                <h2 style={{ margin: 0 }}>Detail Tes Diagnostik</h2>
                                <p style={{ marginBottom: 0, color: '#666' }}>
                                    {selectedDiagnostic.student_name} — {selectedDiagnostic.student_class}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedDiagnostic(null)}
                                style={{
                                    padding: '8px 14px',
                                    border: 'none',
                                    borderRadius: 8,
                                    background: '#eeeeee',
                                    cursor: 'pointer',
                                }}
                            >
                                Tutup ✕
                            </button>
                        </div>

                        <div style={{
                            background: '#f3f7f5',
                            padding: 16,
                            borderRadius: 12,
                            marginBottom: 24,
                        }}>
                            <strong>Hasil pengerjaan</strong>

                            <h3 style={{ margin: '8px 0' }}>
                                {selectedDiagnostic.correct_count} dari {selectedDiagnostic.total_questions} jawaban benar
                            </h3>

                            Nilai: <strong>{selectedDiagnostic.score.toFixed(2)}</strong>
                        </div>

                        {MODULE_1_DIAGNOSTIC.map((question, index) => {
                            const studentAnswer = selectedDiagnostic.answers[question.id];
                            const isCorrect = studentAnswer === question.correctOption;

                            return (
                                <div
                                    key={question.id}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: 12,
                                        padding: 18,
                                        marginBottom: 18,
                                    }}
                                >
                                    <h3 style={{ marginTop: 0 }}>
                                        Pertanyaan {index + 1}
                                    </h3>

                                    <p>{question.question}</p>

                                    <div style={{ display: 'grid', gap: 8 }}>
                                        {question.options.map((option, optionIndex) => {
                                            const optionLetter = String.fromCharCode(65 + optionIndex);
                                            const isStudentChoice = studentAnswer === optionLetter;
                                            const isAnswerKey = question.correctOption === optionLetter;

                                            return (
                                                <div
                                                    key={optionIndex}
                                                    style={{
                                                        padding: 12,
                                                        borderRadius: 8,
                                                        background: isAnswerKey
                                                            ? '#e8f5e9'
                                                            : isStudentChoice
                                                                ? '#ffebee'
                                                                : '#f5f5f5',
                                                        border: isAnswerKey
                                                            ? '1px solid #4caf50'
                                                            : isStudentChoice
                                                                ? '1px solid #e57373'
                                                                : '1px solid transparent',
                                                    }}
                                                >
                                                    <strong>{optionLetter}.</strong> {option.replace(/^[A-E]\.\s*/, '')}

                                                    {isStudentChoice && (
                                                        <strong> — Jawaban siswa</strong>
                                                    )}

                                                    {isAnswerKey && (
                                                        <strong> — Kunci jawaban</strong>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <p style={{
                                        marginTop: 14,
                                        color: isCorrect ? '#2e7d32' : '#c62828',
                                        fontWeight: 'bold',
                                    }}>
                                        {studentAnswer
                                            ? isCorrect
                                                ? '✓ Jawaban siswa benar'
                                                : '✗ Jawaban siswa belum tepat'
                                            : 'Siswa tidak menjawab soal ini'}
                                    </p>

                                    <div style={{
                                        background: '#f3f7f5',
                                        padding: 14,
                                        borderRadius: 8,
                                    }}>
                                        <strong>Pembahasan:</strong>
                                        <p style={{ marginBottom: 0 }}>
                                            {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>
            )}
            {showSubmissions && (
                <section
                    id="submissions-section"
                    style={{
                        background: '#ffffff',
                        padding: 24,
                        borderRadius: 16,
                        marginTop: 24,
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                        overflowX: 'auto',
                    }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 12,
                        marginBottom: 20,
                    }}>
                        <div>
                            <h2 style={{ color: '#245b46', marginBottom: 4 }}>
                                Pengumpulan Tugas Siswa
                            </h2>
                            <p style={{ color: '#718096', margin: 0 }}>
                                Pantau hasil pekerjaan siswa dari setiap modul.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <button
                                onClick={() => void fetchSubmissions()}
                                disabled={loadingSubmissions}
                            >
                                {loadingSubmissions ? 'Memuat...' : 'Muat Ulang'}
                            </button>

                            <button
                                onClick={() => setShowSubmissions(false)}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>

                    {loadingSubmissions ? (
                        <p>Memuat data pengumpulan tugas...</p>
                    ) : submissionError ? (
                        <p style={{ color: '#dc2626' }}>
                            {submissionError}
                        </p>
                    ) : (
                        <>
                            <div style={{
                                display: 'flex',
                                gap: 12,
                                marginBottom: 24,
                                borderBottom: '1px solid #e5e7eb',
                                paddingBottom: 12,
                            }}>
                                <button
                                    onClick={() => setActiveSubmissionTab('esai')}
                                    style={{
                                        background: activeSubmissionTab === 'esai' ? '#245b46' : '#eaf3ee',
                                        color: activeSubmissionTab === 'esai' ? '#ffffff' : '#245b46',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Tugas Esai ({essaySubmissions.length})
                                </button>

                                <button
                                    onClick={() => setActiveSubmissionTab('modul7')}
                                    style={{
                                        background: activeSubmissionTab === 'modul7' ? '#245b46' : '#eaf3ee',
                                        color: activeSubmissionTab === 'modul7' ? '#ffffff' : '#245b46',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Modul 7 ({module7Submissions.length})
                                </button>
                            </div>
                            {activeSubmissionTab === 'esai' && (
                                <>
                                    {/* TUGAS ESAI */}
                                    <h3 style={{ color: '#245b46', marginTop: 24 }}>
                                        Tugas Esai
                                    </h3>
                                    <p style={{ color: '#718096' }}>
                                        Jumlah pengumpulan: {essaySubmissions.length}
                                    </p>

                                    {essaySubmissions.length === 0 ? (
                                        <p>Belum ada tugas esai yang dikumpulkan.</p>
                                    ) : (
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            minWidth: 850,
                                        }}>

                                            <thead>
                                                <tr style={{
                                                    background: '#eaf3ee',
                                                    color: '#245b46',
                                                    textAlign: 'left',
                                                }}>
                                                    <th style={{ padding: 12 }}>No.</th>
                                                    <th style={{ padding: 12 }}>Nama Siswa</th>
                                                    <th style={{ padding: 12 }}>Kelas</th>
                                                    <th style={{ padding: 12 }}>Jumlah Kata</th>
                                                    <th style={{ padding: 12 }}>Waktu Pengumpulan</th>
                                                    <th style={{ padding: 12 }}>Status</th>
                                                    <th style={{ padding: 12 }}>Nilai</th>
                                                    <th style={{ padding: 12 }}>Aksi</th>
                                                </tr>
                                            </thead>


                                            <tbody>
                                                {essaySubmissions.map((submission, index) => (
                                                    <tr key={submission.id}>
                                                        <td style={{ padding: 12 }}>{index + 1}</td>

                                                        <td style={{ padding: 12 }}>
                                                            <strong>{submission.student_name}</strong>
                                                        </td>

                                                        <td style={{ padding: 12 }}>
                                                            {submission.student_class || '-'}
                                                        </td>

                                                        <td style={{ padding: 12 }}>
                                                            {submission.word_count}
                                                        </td>

                                                        <td style={{ padding: 12 }}>
                                                            {new Date(submission.submitted_at).toLocaleString('id-ID')}
                                                        </td>

                                                        <td style={{ padding: 12 }}>
                                                            {submission.status || 'Pending'}
                                                        </td>

                                                        <td style={{ padding: 12 }}>
                                                            {submission.score ?? 'Belum dinilai'}
                                                        </td>

                                                        <td style={{ padding: 12 }}>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedEssaySubmission(submission);
                                                                    setEssayScore(
                                                                        submission.score !== null ? String(submission.score) : ''
                                                                    );
                                                                    setEssayFeedback(submission.feedback ?? '');
                                                                }}
                                                                style={{
                                                                    padding: '8px 14px',
                                                                    background: '#245b46',
                                                                    color: '#ffffff',
                                                                    border: 'none',
                                                                    borderRadius: 8,
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                Lihat Detail
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </>
                            )}
                            {activeSubmissionTab === 'modul7' && (
                                <>
                                    {/* TUGAS MODUL 7 */}
                                    <h3 style={{ color: '#245b46', marginTop: 36 }}>
                                        Pengumpulan Modul 7
                                    </h3>
                                    <p style={{ color: '#718096' }}>
                                        Jumlah pengumpulan: {module7Submissions.length}
                                    </p>

                                    {module7Submissions.length === 0 ? (
                                        <p>Belum ada tugas Modul 7 yang dikumpulkan.</p>
                                    ) : (

                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            minWidth: 650,
                                        }}>
                                            <thead>
                                                <tr style={{
                                                    background: '#eaf3ee',
                                                    color: '#245b46',
                                                    textAlign: 'left',
                                                }}>
                                                    <th style={{ padding: 14 }}>Siswa</th>
                                                    <th style={{ padding: 14 }}>Kelas</th>
                                                    <th style={{ padding: 14 }}>Absen</th>
                                                    <th style={{ padding: 14 }}>Skor PG</th>
                                                    <th style={{ padding: 14 }}>Waktu Pengumpulan</th>
                                                    <th style={{ padding: 14 }}>Aksi</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {module7Submissions.map((submission) => (
                                                    <tr key={submission.id}>
                                                        <td style={{ padding: 14 }}>
                                                            <strong>{submission.student_name}</strong>
                                                        </td>

                                                        <td style={{ padding: 14 }}>
                                                            {submission.student_class || '-'}
                                                        </td>

                                                        <td style={{ padding: 14 }}>
                                                            {submission.attendance_number ?? '-'}
                                                        </td>

                                                        <td style={{ padding: 14 }}>
                                                            {submission.mcq_score ?? 'Belum dinilai'}
                                                        </td>

                                                        <td style={{ padding: 14 }}>
                                                            {new Date(submission.submitted_at).toLocaleString('id-ID')}
                                                        </td>

                                                        <td style={{ padding: 14 }}>
                                                            <button
                                                                onClick={() => setSelectedModule7Submission(submission)}
                                                                style={{
                                                                    padding: '8px 14px',
                                                                    background: '#245b46',
                                                                    color: '#ffffff',
                                                                    border: 'none',
                                                                    borderRadius: 8,
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                Lihat Detail
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    )}
                                </>
                            )}
                        </>
                    )}
                </section>
            )}



            {showTeacherForm && userRole === 'admin' && (
                <section style={{
                    background: '#ffffff',
                    padding: 24,
                    borderRadius: 16,
                    marginTop: 24,
                    maxWidth: 500,
                }}>
                    <h2>Tambah Akun Guru</h2>

                    <input
                        type="text"
                        placeholder="Nama lengkap guru"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email guru"
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password (minimal 8 karakter)"
                        value={teacherPassword}
                        onChange={(e) => setTeacherPassword(e.target.value)}
                    />

                    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                        <button
                            onClick={handleCreateTeacher}
                            disabled={creatingTeacher}
                        >
                            {creatingTeacher ? 'Membuat akun...' : 'Buat Akun Guru'}
                        </button>

                        <button
                            onClick={() => setShowTeacherForm(false)}
                        >
                            Batal
                        </button>
                    </div>

                    {teacherMessage && (
                        <p>{teacherMessage}</p>
                    )}
                </section>
            )}


            {selectedEssaySubmission && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1100,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                    onClick={() => setSelectedEssaySubmission(null)}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="essay-detail-title"
                        onClick={(event) => event.stopPropagation()}
                        style={{
                            background: '#ffffff',
                            width: '100%',
                            maxWidth: 850,
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            borderRadius: 16,
                            padding: 24,
                            boxSizing: 'border-box',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                            marginBottom: 20,
                        }}>
                            <div>
                                <h2 id="essay-detail-title" style={{
                                    margin: 0,
                                    color: '#245b46',
                                }}>
                                    Detail Pengumpulan Tugas Esai
                                </h2>
                                <p style={{ color: '#718096', marginBottom: 0 }}>
                                    {selectedEssaySubmission.student_name} —{' '}
                                    {selectedEssaySubmission.student_class || '-'}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedEssaySubmission(null)}
                                style={{
                                    padding: '8px 14px',
                                    border: 'none',
                                    borderRadius: 8,
                                    background: '#eeeeee',
                                    cursor: 'pointer',
                                }}
                            >
                                Tutup ✕
                            </button>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: 12,
                            marginBottom: 24,
                        }}>
                            <div style={{ background: '#f3f7f5', padding: 14, borderRadius: 10 }}>
                                <small>Jumlah Kata</small>
                                <h3 style={{ margin: '6px 0 0' }}>
                                    {selectedEssaySubmission.word_count}
                                </h3>
                            </div>

                            <div style={{ background: '#f3f7f5', padding: 14, borderRadius: 10 }}>
                                <small>Status</small>
                                <h3 style={{ margin: '6px 0 0' }}>
                                    {selectedEssaySubmission.status || 'Pending'}
                                </h3>
                            </div>

                            <div style={{ background: '#f3f7f5', padding: 14, borderRadius: 10 }}>
                                <small>Waktu Pengumpulan</small>
                                <p style={{ margin: '6px 0 0' }}>
                                    {new Date(selectedEssaySubmission.submitted_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>

                        <h3 style={{
                            color: '#245b46',
                            borderBottom: '2px solid #e2e8f0',
                            paddingBottom: 10,
                        }}>
                            Jawaban Siswa
                        </h3>

                        <div style={{
                            background: '#f8faf9',
                            border: '1px solid #e2e8f0',
                            borderRadius: 10,
                            padding: 18,
                            lineHeight: 1.7,
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'anywhere',
                            minHeight: 100,
                        }}>
                            {selectedEssaySubmission.answer || 'Siswa belum mengisi jawaban.'}
                        </div>

                        <h3 style={{
                            color: '#245b46',
                            marginTop: 28,
                            borderBottom: '2px solid #e2e8f0',
                            paddingBottom: 10,
                        }}>
                            Penilaian Guru
                        </h3>

                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>
                            Nilai
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={essayScore}
                            onChange={(e) => setEssayScore(e.target.value)}
                            placeholder="Masukkan nilai siswa"
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: 12,
                                border: '1px solid #d1d5db',
                                borderRadius: 8,
                                marginBottom: 18,
                            }}
                        />

                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>
                            Feedback Guru
                        </label>

                        <textarea
                            value={essayFeedback}
                            onChange={(e) => setEssayFeedback(e.target.value)}
                            placeholder="Tuliskan apresiasi, koreksi, atau saran untuk siswa..."
                            rows={5}
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: 12,
                                border: '1px solid #d1d5db',
                                borderRadius: 8,
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                marginBottom: 16,
                            }}
                        />

                        {submissionError && (
                            <p style={{ color: '#dc2626', fontSize: 13 }}>
                                {submissionError}
                            </p>
                        )}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 10,
                            flexWrap: 'wrap',
                        }}>
                            <button
                                type="button"
                                onClick={() => setSelectedEssaySubmission(null)}
                                style={{
                                    padding: '11px 18px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: 8,
                                    background: '#ffffff',
                                    cursor: 'pointer',
                                }}
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                onClick={handleSaveEssayEvaluation}
                                style={{
                                    padding: '11px 20px',
                                    background: '#245b46',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                Simpan Penilaian
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {selectedModule7Submission && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1100,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                    onClick={() => setSelectedModule7Submission(null)}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="module7-detail-title"
                        onClick={(event) => event.stopPropagation()}
                        style={{
                            background: '#ffffff',
                            width: '100%',
                            maxWidth: 1000,
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            borderRadius: 16,
                            padding: 24,
                            boxSizing: 'border-box',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                            marginBottom: 20,
                        }}>
                            <div>
                                <h2 id="module7-detail-title" style={{ margin: 0, color: '#245b46' }}>
                                    Detail Pengumpulan Modul 7
                                </h2>
                                <p style={{ marginBottom: 0, color: '#718096' }}>
                                    {selectedModule7Submission.student_name} — {selectedModule7Submission.student_class || '-'}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedModule7Submission(null)}
                                style={{
                                    padding: '8px 14px',
                                    border: 'none',
                                    borderRadius: 8,
                                    background: '#eeeeee',
                                    cursor: 'pointer',
                                }}
                            >
                                Tutup ✕
                            </button>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                            gap: 12,
                            marginBottom: 24,
                        }}>
                            <div style={{ background: '#f3f7f5', padding: 14, borderRadius: 10 }}>
                                <small>Nomor Absen</small>
                                <h3 style={{ margin: '6px 0 0' }}>
                                    {selectedModule7Submission.attendance_number ?? '-'}
                                </h3>
                            </div>

                            <div style={{ background: '#f3f7f5', padding: 14, borderRadius: 10 }}>
                                <small>Skor Pilihan Ganda</small>
                                <h3 style={{ margin: '6px 0 0' }}>
                                    {selectedModule7Submission.mcq_score ?? 'Belum dinilai'} / {MODULE_7_QUESTIONS.length}
                                </h3>
                            </div>

                            <div style={{ background: '#f3f7f5', padding: 14, borderRadius: 10 }}>
                                <small>Waktu Pengumpulan</small>
                                <p style={{ margin: '6px 0 0' }}>
                                    {new Date(selectedModule7Submission.submitted_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>

                        <h3 style={{ color: '#245b46', borderBottom: '2px solid #e2e8f0', paddingBottom: 10 }}>
                            Jawaban Pilihan Ganda
                        </h3>

                        {MODULE_7_QUESTIONS.map((question, index) => {
                            const answers =
                                typeof selectedModule7Submission.mcq_answers === 'object' &&
                                    selectedModule7Submission.mcq_answers !== null &&
                                    !Array.isArray(selectedModule7Submission.mcq_answers)
                                    ? selectedModule7Submission.mcq_answers as Record<string, unknown>
                                    : {};

                            const studentAnswer = answers[question.id];
                            const isCorrect = studentAnswer === question.correctAnswer;

                            return (
                                <article
                                    key={question.id}
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: 12,
                                        padding: 16,
                                        marginBottom: 16,
                                    }}
                                >
                                    <h4 style={{ marginTop: 0 }}>
                                        Soal {index + 1}
                                    </h4>

                                    {question.stimulus && (
                                        <div style={{
                                            background: '#f8fafc',
                                            padding: 12,
                                            borderRadius: 8,
                                            marginBottom: 12,
                                        }}>
                                            <strong>Stimulus:</strong>
                                            <p style={{ marginBottom: 0 }}>{question.stimulus}</p>
                                        </div>
                                    )}

                                    <p style={{ fontWeight: 500 }}>{question.question}</p>

                                    {question.options.map(option => {
                                        const isStudentChoice = option.label === studentAnswer;
                                        const isAnswerKey = option.label === question.correctAnswer;

                                        return (
                                            <div
                                                key={option.label}
                                                style={{
                                                    padding: 10,
                                                    marginBottom: 8,
                                                    borderRadius: 8,
                                                    background: isAnswerKey
                                                        ? '#e8f5e9'
                                                        : isStudentChoice
                                                            ? '#ffebee'
                                                            : '#f5f5f5',
                                                    border: isAnswerKey
                                                        ? '1px solid #4caf50'
                                                        : isStudentChoice
                                                            ? '1px solid #e57373'
                                                            : '1px solid transparent',
                                                }}
                                            >
                                                <strong>{option.label}.</strong> {option.text}

                                                {isStudentChoice && (
                                                    <strong> — Jawaban siswa</strong>
                                                )}

                                                {isAnswerKey && (
                                                    <strong> — Kunci jawaban</strong>
                                                )}
                                            </div>
                                        );
                                    })}

                                    <p style={{
                                        color: typeof studentAnswer !== 'string'
                                            ? '#757575'
                                            : isCorrect ? '#2e7d32' : '#c62828',
                                        fontWeight: 'bold',
                                    }}>
                                        {typeof studentAnswer !== 'string'
                                            ? 'Siswa tidak menjawab soal ini'
                                            : isCorrect
                                                ? '✓ Jawaban siswa benar'
                                                : '✗ Jawaban siswa belum tepat'}
                                    </p>

                                    {question.explanation && (
                                        <div style={{
                                            background: '#f3f7f5',
                                            padding: 12,
                                            borderRadius: 8,
                                        }}>
                                            <strong>Pembahasan:</strong>
                                            <p style={{ marginBottom: 0 }}>{question.explanation}</p>
                                        </div>
                                    )}
                                </article>
                            );
                        })}

                        <h3 style={{
                            color: '#245b46',
                            borderBottom: '2px solid #e2e8f0',
                            paddingBottom: 10,
                            marginTop: 28,
                        }}>
                            Jawaban Esai
                        </h3>

                        {renderEssayAnswers(selectedModule7Submission.essay_answers)}
                    </section>
                </div>
            )}

        </main>
    );
};

export default TeacherDashboardPage;
