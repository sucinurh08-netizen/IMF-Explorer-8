
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

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

    useEffect(() => {
        const checkAccess = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/guru/login', { replace: true });
                return;
            }

            const { data: teacher, error } = await supabase
                .from('teacher_accounts')
                .select('display_name, role')
                .eq('user_id', user.id)
                .single();

            if (error || !teacher || !['admin', 'teacher'].includes(teacher.role)) {
                await supabase.auth.signOut();
                navigate('/guru/login', { replace: true });
                return;
            }

            setDisplayName(teacher.display_name);
            setUserRole(teacher.role);
            setLoading(false);
        };

        void checkAccess();
    }, [navigate]);

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
        navigate('/guru/login', { replace: true });
    };

    if (loading) {
        return <div style={{ padding: 40 }}>Memeriksa akses guru...</div>;
    }

    const menuItems = [
        { icon: '👥', title: 'Data Siswa', description: 'Identitas dan aktivitas siswa' },
        { icon: '🔬', title: 'Discovery Wall', description: 'Temuan dan feedback siswa' },
        { icon: '📝', title: 'Pengumpulan Tugas', description: 'Hasil pekerjaan setiap modul' },
        { icon: '📊', title: 'Rekap Evaluasi', description: 'Hasil evaluasi pembelajaran' },
        ...(userRole === 'admin'
            ? [{
                icon: '👩‍🏫',
                title: 'Manajemen Akun Guru',
                description: 'Tambah dan kelola akun guru',
            }]
            : []),
    ];

    return (
        <main style={{
            minHeight: '100vh',
            background: '#f5f8f3',
            padding: '32px',
        }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
                marginBottom: 40,
            }}>
                <div>
                    <h1 style={{ color: '#245b46', marginBottom: 4 }}>
                        IMF Explorer
                    </h1>
                    <p style={{ color: '#718096', margin: 0 }}>
                        Dashboard Mode Guru
                    </p>
                </div>

                <button onClick={handleLogout}>
                    Keluar
                </button>
            </header>

            <section style={{ marginBottom: 32 }}>
                <h2>Selamat datang, {displayName}!</h2>
                <p style={{ color: '#718096' }}>
                    Pantau aktivitas dan hasil pembelajaran siswa di sini.
                </p>
            </section>

            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 20,
            }}>
                {menuItems.map((item) => (
                    <article
                        key={item.title}
                        style={{
                            background: '#ffffff',
                            padding: 24,
                            borderRadius: 16,
                            boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                        }}
                    >
                        <div style={{ fontSize: 32 }}>{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p style={{ color: '#718096' }}>
                            {item.description}
                        </p>
                        <span style={{ color: '#245b46', fontWeight: 600 }}>
                            Segera tersedia
                        </span>
                        {item.title === 'Manajemen Akun Guru' && (
                            <button
                                onClick={() => setShowTeacherForm(true)}
                                style={{ marginTop: 12 }}
                            >
                                Kelola Akun Guru
                            </button>
                        )}
                    </article>
                ))}
            </section>
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
        </main>
    );
};

export default TeacherDashboardPage;
