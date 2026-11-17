
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import './StudentAuth.css';

const StudentLoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password) {
            setError('Email dan kata sandi wajib diisi.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });

            if (error) throw error;

            navigate('/', { replace: true });
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Login gagal. Silakan coba kembali.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/`,
                },
            });

            if (error) throw error;
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Login Google gagal.'
            );
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
                    <h2>Selamat Datang Kembali!</h2>
                    <p>Masuk untuk melanjutkan perjalanan belajarmu.</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="student-auth-field">
                        <label htmlFor="student-email">Email</label>
                        <input
                            id="student-email"
                            type="email"
                            placeholder="Masukkan email kamu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="student-auth-field">
                        <label htmlFor="student-password">Kata Sandi</label>
                        <div className="student-password-wrapper">
                            <input
                                id="student-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Masukkan kata sandi"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className="student-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                            >
                                {showPassword ? 'Sembunyikan' : 'Lihat'}
                            </button>
                        </div>
                    </div>

                    <div className="student-auth-forgot">
                        <Link to="/forgot-password">Lupa Kata Sandi?</Link>
                    </div>

                    {error && (
                        <div className="student-auth-error" role="alert">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="student-auth-primary"
                        disabled={loading}
                    >
                        {loading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <div className="student-auth-divider">
                    <span>atau</span>
                </div>

                <button
                    type="button"
                    className="student-auth-google"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    <span aria-hidden="true">G</span>
                    Masuk dengan Google
                </button>

                <p className="student-auth-register">
                    Belum punya akun? <Link to="/register">Daftar sekarang</Link>
                </p>

                <button
                    type="button"
                    className="student-auth-guest"
                    onClick={() => navigate('/', { replace: true })}
                >
                    Masuk sebagai Tamu
                </button>

                <p className="student-auth-teacher">
                    Guru atau admin? <Link to="/guru/login">Login Guru</Link>
                </p>
            </div>
        </div>
    );
};

export default StudentLoginPage;
