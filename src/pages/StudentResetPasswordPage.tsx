
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import './StudentAuth.css';

const StudentResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!isSupabaseConfigured) {
            setError('Layanan pengaturan ulang kata sandi belum tersedia. Silakan coba kembali nanti.');
            return;
        }

        if (password.length < 8) {
            setError('Kata sandi minimal 8 karakter.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Konfirmasi kata sandi tidak cocok.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password,
            });

            if (error) throw error;

            setSuccess('Kata sandi berhasil diperbarui. Silakan login kembali.');

            await supabase.auth.signOut();

            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1800);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Gagal memperbarui kata sandi.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="student-auth-page">
            <div className="student-auth-card">
                <div className="student-auth-brand">
                    <div className="student-auth-logo">IMF</div>
                    <h1>IMF Explorer</h1>
                    <p>Jelajahi Dunia Gaya Antarmolekul</p>
                </div>

                <div className="student-auth-heading">
                    <h2>Buat Kata Sandi Baru</h2>
                    <p>Masukkan kata sandi baru untuk akunmu.</p>
                </div>

                <form onSubmit={handleUpdatePassword}>
                    <div className="student-auth-field">
                        <label htmlFor="new-password">Kata Sandi Baru</label>
                        <input
                            id="new-password"
                            type="password"
                            placeholder="Minimal 8 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="student-auth-field">
                        <label htmlFor="confirm-new-password">
                            Konfirmasi Kata Sandi
                        </label>
                        <input
                            id="confirm-new-password"
                            type="password"
                            placeholder="Ulangi kata sandi baru"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="student-auth-error" role="alert">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="student-auth-success" role="status">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="student-auth-primary"
                        disabled={loading}
                    >
                        {loading ? 'Memproses...' : 'Simpan Kata Sandi Baru'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentResetPasswordPage;
