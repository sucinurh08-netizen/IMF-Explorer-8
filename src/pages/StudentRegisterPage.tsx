
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import './StudentAuth.css';

const StudentRegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!nama.trim() || !email.trim() || !password) {
            setError('Semua kolom wajib diisi.');
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
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    data: {
                        nama: nama.trim(),
                        account_type: 'student',
                    },
                },
            });

            if (signUpError) throw signUpError;


            if (data.session) {
                setSuccess('Pendaftaran berhasil! Mengarahkan ke halaman utama...');
                setTimeout(() => navigate('/', { replace: true }), 1500);
            } else {
                setSuccess(
                    'Pendaftaran berhasil. Silakan periksa email untuk konfirmasi akun sebelum login.'
                );
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Pendaftaran gagal. Silakan coba kembali.'
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
                    <h2>Buat Akun Siswa</h2>
                    <p>Daftar untuk menyimpan perjalanan belajarmu.</p>
                </div>

                <form onSubmit={handleRegister}>
                    <div className="student-auth-field">
                        <label htmlFor="register-name">Nama Lengkap</label>
                        <input
                            id="register-name"
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="student-auth-field">
                        <label htmlFor="register-email">Email</label>
                        <input
                            id="register-email"
                            type="email"
                            placeholder="Masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="student-auth-field">
                        <label htmlFor="register-password">Kata Sandi</label>
                        <input
                            id="register-password"
                            type="password"
                            placeholder="Minimal 8 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="student-auth-field">
                        <label htmlFor="register-confirm-password">
                            Konfirmasi Kata Sandi
                        </label>
                        <input
                            id="register-confirm-password"
                            type="password"
                            placeholder="Ulangi kata sandi"
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
                        {loading ? 'Memproses...' : 'Daftar'}
                    </button>
                </form>

                <p className="student-auth-register">
                    Sudah punya akun? <Link to="/login">Masuk sekarang</Link>
                </p>
            </div>
        </div>
    );
};

export default StudentRegisterPage;
