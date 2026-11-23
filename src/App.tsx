
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Module1Page from './pages/Module1Page';
import Module2Page from './pages/Module2Page';
import Module3Page from './pages/Module3Page';
import Module4Page from './pages/Module4Page';
import Module5Page from './pages/Module5Page';
import Module6Page from './pages/Module6Page';
import Module7Page from './pages/Module7Page';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import StudentForgotPasswordPage from './pages/StudentForgotPasswordPage';
import StudentResetPasswordPage from './pages/StudentResetPasswordPage';
import { supabase } from './utils/supabase';
import type { IMFProgress, LearningModule } from './types/curriculum';
import { LEARNING_MODULES } from './data/curriculumData';
import {
  getSavedProgress,
  saveProgress,
  updateLastPage,
  markPageCompleted,
  resetProgress,
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProgressCard } from './components/ProgressCard';
import { IMFOverview } from './components/IMFOverview';
import { LearningRoadmap } from './components/LearningRoadmap';
import { PrerequisitesSection } from './components/PrerequisitesSection';
import { PedagogyBanner } from './components/PedagogyBanner';
import { Footer } from './components/Footer';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { ModuleDetailModal } from './components/ModuleDetailModal';


const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { user }, error } =
          await supabase.auth.getUser();

        if (error || !user) {
          navigate('/login', { replace: true });
          return;
        }

        const { data: teacher, error: teacherError } =
          await supabase
            .from('teacher_accounts')
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();

        if (teacherError) throw teacherError;

        if (teacher && ['admin', 'teacher'].includes(teacher.role)) {
          navigate('/guru/dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Gagal memeriksa akun:', error);
        navigate('/login', { replace: true });
      }
    };

    checkUserRole();
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      Memeriksa akun, mohon tunggu...
    </div>
  );
};


export const App: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<IMFProgress>(() => getSavedProgress());
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Launch or resume learning from CTA
  const handleStartOrResume = () => {
    const targetModuleId = progress.lastPage || LEARNING_MODULES[0].id;
    const targetMod = LEARNING_MODULES.find((m) => m.id === targetModuleId) || LEARNING_MODULES[0];
    setSelectedModule(targetMod);
    setIsModuleModalOpen(true);
    updateLastPage(targetMod.id);
  };

  // Select module from roadmap or overview
  const handleOpenModule = (mod: LearningModule) => {
    setSelectedModule(mod);
    setIsModuleModalOpen(true);
    const updated = updateLastPage(mod.id);
    setProgress(updated);
  };

  const handleSelectModuleById = (moduleId: string) => {
    const mod = LEARNING_MODULES.find((m) => m.id === moduleId);
    if (mod) {
      handleOpenModule(mod);
    }
  };

  // Toggle completion of a module
  const handleToggleComplete = (moduleId: string) => {
    const isCompleted = progress.completedPages.includes(moduleId);
    let nextProgress: IMFProgress;

    if (isCompleted) {
      nextProgress = {
        ...progress,
        completedPages: progress.completedPages.filter((id) => id !== moduleId),
        lastUpdated: new Date().toISOString(),
      };
      saveProgress(nextProgress);
      showToast('Status modul diperbarui ke belum selesai.');
    } else {
      nextProgress = markPageCompleted(moduleId);
      showToast('Bagus! Modul berhasil ditandai selesai.');
    }

    setProgress(nextProgress);
  };

  // Confirm progress reset
  const handleConfirmReset = () => {
    const fresh = resetProgress();
    setProgress(fresh);
    setIsResetModalOpen(false);
    showToast('Progres pembelajaran berhasil diatur ulang ke awal.');
  };

  const handleLaunchModule = (moduleId: string) => {
    const mod = LEARNING_MODULES.find((m) => m.id === moduleId);

    if (moduleId === 'fenomena-air-minyak') {
      setIsModuleModalOpen(false);
      const updated = updateLastPage(moduleId);
      setProgress(updated);
      navigate('/module-1');
      return;
    }

    if (moduleId === 'pengantar-gaya') {
      setIsModuleModalOpen(false);
      const updated = updateLastPage(moduleId);
      setProgress(updated);
      navigate('/module-2');
      return;
    }

    if (moduleId === 'gaya-london') {
      setIsModuleModalOpen(false);
      const updated = updateLastPage(moduleId);
      setProgress(updated);
      navigate('/module-3');
      return;
    }

    if (moduleId === 'gaya-dipol-dipol') {
      setIsModuleModalOpen(false);
      const updated = updateLastPage(moduleId);
      setProgress(updated);
      navigate('/module-4');
      return;
    }

    if (moduleId === 'ikatan-hidrogen') {
      setIsModuleModalOpen(false);
      const updated = updateLastPage(moduleId);
      setProgress(updated);
      navigate('/module-5');
      return;
    }
    if (moduleId === 'perbandingan-gaya') {
      setIsModuleModalOpen(false);
      const updated = updateLastPage(moduleId);
      setProgress(updated);
      navigate('/module-6');
      return;
    }

    if (moduleId === 'evaluasi-akhir') {
      setIsModuleModalOpen(false);
      const updated = updateLastPage(moduleId);
      setProgress(updated);
      navigate('/module-7');
      return;
    }

    setIsModuleModalOpen(false);
    showToast(
      `Halaman materi ${mod ? mod.title : moduleId} belum tersedia.`
    );
  };

  return (
    <Routes>
      <Route path="/login" element={<StudentLoginPage />} />
      <Route path="/register" element={<StudentRegisterPage />} />
      <Route path="/forgot-password" element={<StudentForgotPasswordPage />} />
      <Route path="/reset-password" element={<StudentResetPasswordPage />} />
      <Route
        path="/"
        element={
          <div className="app-container">
            {/* Toast notification */}
            {toastMessage && (
              <div
                style={{
                  position: 'fixed',
                  bottom: '24px',
                  right: '24px',
                  zIndex: 1100,
                  background: 'var(--color-deep-forest)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.35rem',
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: 'var(--shadow-xl)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  animation: 'fadeIn 0.25s ease',
                }}
              >
                <span>✨</span>
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Header & Navbar */}
            <Navbar
              progress={progress}
              onOpenResetModal={() => setIsResetModalOpen(true)}
              onStartLearning={handleStartOrResume}
            />

            <main>
              {/* Hero Section */}
              <HeroSection
                progress={progress}
                onStartLearning={handleStartOrResume}
              />

              {/* Learning Progress Card */}
              <div className="content-wrapper">
                <ProgressCard
                  progress={progress}
                  onOpenResetModal={() => setIsResetModalOpen(true)}
                  onResumeModule={handleSelectModuleById}
                />
              </div>

              {/* 3 Intermolecular Forces Overview */}
              <IMFOverview onSelectIMF={handleSelectModuleById} />

              {/* 5E Learning Roadmap */}
              <LearningRoadmap
                progress={progress}
                onOpenModule={handleOpenModule}
                onToggleComplete={handleToggleComplete}
              />

              {/* Prerequisites Refresher */}
              <PrerequisitesSection />

              {/* Pedagogical Framework Banner */}
              <PedagogyBanner />
            </main>

            {/* Footer */}
            <Footer onSelectModule={handleSelectModuleById} />

            {/* Modals */}
            <ResetConfirmModal
              isOpen={isResetModalOpen}
              onClose={() => setIsResetModalOpen(false)}
              onConfirmReset={handleConfirmReset}
            />

            <ModuleDetailModal
              module={selectedModule}
              isOpen={isModuleModalOpen}
              isCompleted={selectedModule ? progress.completedPages.includes(selectedModule.id) : false}
              onClose={() => setIsModuleModalOpen(false)}
              onLaunchModule={handleLaunchModule}
              onToggleCompleted={handleToggleComplete}
            />
          </div>
        }
      />
      <Route path="/module-1" element={<Module1Page />} />
      <Route path="/module-2" element={<Module2Page />} />
      <Route path="/module-3" element={<Module3Page />} />
      <Route path="/module-4" element={<Module4Page />} />
      <Route path="/module-5" element={<Module5Page />} />
      <Route path="/module-6" element={<Module6Page />} />
      <Route path="/module-7" element={<Module7Page />} />

      {/* Teacher Mode */}
      <Route path="/guru" element={<Navigate to="/login" replace />} />
      <Route path="/guru/dashboard" element={<TeacherDashboardPage />} />

      {/* Google Login Callback */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Route tidak ditemukan */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
