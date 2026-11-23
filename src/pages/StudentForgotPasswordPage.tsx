
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import './StudentAuth.css';

const StudentForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!isSupabaseConfigured) {
            setError('Layanan pemulihan kata sandi belum tersedia. Silakan coba kembali nanti.');
            return;
        }

        if (!email.trim()) {
            setError('Masukkan alamat email terlebih dahulu.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(
                email.trim(),
                {
                    redirectTo: `${window.location.origin}/reset-password`,
                }
            );

            if (error) throw error;

            setSuccess(
                'Jika email terdaftar, instruksi untuk mengatur ulang kata sandi akan dikirim ke email tersebut. Silakan periksa kotak masuk atau folder spam.'
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Permintaan gagal. Silakan coba kembali.'
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
                    <h2>Lupa Kata Sandi?</h2>
                    <p>
                        Masukkan email akunmu. Kami akan mengirimkan tautan
                        untuk mengatur ulang kata sandi.
                    </p>
                </div>

                <form onSubmit={handleResetPassword}>
                    <div className="student-auth-field">
                        <label htmlFor="forgot-email">Email</label>
                        <input
                            id="forgot-email"
                            type="email"
                            placeholder="Masukkan email terdaftar"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
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
                        {loading ? 'Mengirim...' : 'Kirim Tautan Reset'}
                    </button>
                </form>

                <p className="student-auth-register">
                    Ingat kata sandi? <Link to="/login">Kembali ke Login</Link>
                </p>
            </div>
        </div>
    );
};

export default StudentForgotPasswordPage;
