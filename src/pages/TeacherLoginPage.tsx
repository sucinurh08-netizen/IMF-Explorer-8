
import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

const TeacherLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });

            if (error) throw error;

            const { data: teacher, error: teacherError } = await supabase
                .from('teacher_accounts')
                .select('display_name, role')
                .eq('user_id', data.user.id)
                .single();

            if (teacherError || !teacher) {
                await supabase.auth.signOut();
                throw new Error('Akun ini tidak memiliki akses Mode Guru.');
            }

            if (!['admin', 'teacher'].includes(teacher.role)) {
                await supabase.auth.signOut();
                throw new Error('Role akun tidak diizinkan masuk.');
            }

            window.location.href = '/guru/dashboard';
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : 'Terjadi kesalahan saat login.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f8f3',
            padding: '24px',
        }}>
            <form
                onSubmit={handleLogin}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    background: '#ffffff',
                    padding: '36px',
                    borderRadius: '20px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ fontSize: '42px' }}>⚗️</div>
                    <h1 style={{ color: '#245b46', marginBottom: '8px' }}>
                        Mode Guru
                    </h1>
                    <p style={{ color: '#718096' }}>
                        IMF Explorer · Dashboard Pembelajaran Kimia
                    </p>
                </div>

                <label htmlFor="teacher-email">Email</label>
                <input
                    id="teacher-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Masukkan email"
                    required
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '13px',
                        margin: '8px 0 20px',
                        border: '1px solid #d5ded8',
                        borderRadius: '10px',
                    }}
                />

                <label htmlFor="teacher-password">Password</label>
                <input
                    id="teacher-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password"
                    required
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '13px',
                        margin: '8px 0 20px',
                        border: '1px solid #d5ded8',
                        borderRadius: '10px',
                    }}
                />

                {message && (
                    <p role="alert" style={{ color: '#c0392b' }}>
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        border: 'none',
                        borderRadius: '10px',
                        background: '#245b46',
                        color: '#ffffff',
                        fontWeight: 700,
                        cursor: loading ? 'wait' : 'pointer',
                    }}
                >
                    {loading ? 'Memeriksa akun...' : 'Masuk sebagai Guru'}
                </button>
            </form>
        </main>
    );
};

export default TeacherLoginPage;
