import React, { useState } from 'react';
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

// Pages
import { UniversalModulePage } from './pages/UniversalModulePage';
import { EvaluatePlaceholderPage } from './pages/EvaluatePlaceholderPage';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<IMFProgress>(() => getSavedProgress());
  const [currentView, setCurrentView] = useState<string>('home'); // 'home' | moduleId
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Navigate to any module
  const handleNavigateModule = (targetModuleId: string) => {
    if (targetModuleId === 'evaluasi-akhir') {
      setCurrentView('evaluasi-akhir');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const mod = LEARNING_MODULES.find((m) => m.id === targetModuleId);
    setCurrentView(targetModuleId);
    const updated = updateLastPage(targetModuleId);
    setProgress(updated);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Membuka pembelajaran: ${mod ? mod.title : targetModuleId}`);
  };

  // Launch or resume learning from CTA
  const handleStartOrResume = () => {
    const targetModuleId = progress.lastPage || LEARNING_MODULES[0].id;
    if (targetModuleId === 'evaluasi-akhir') {
      handleNavigateModule('fenomena-air-minyak');
    } else {
      handleNavigateModule(targetModuleId);
    }
  };

  // Open module from Roadmap or Overview
  const handleOpenModule = (mod: LearningModule) => {
    if (mod.id === 'evaluasi-akhir') {
      setCurrentView('evaluasi-akhir');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleNavigateModule(mod.id);
    }
  };

  const handleSelectModuleById = (moduleId: string) => {
    handleNavigateModule(moduleId);
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
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Progres pembelajaran berhasil diatur ulang ke awal.');
  };

  return (
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

      {/* Global Navbar */}
      <Navbar
        progress={progress}
        currentView={currentView}
        onNavigateHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        onStartLearning={handleStartOrResume}
      />

      {/* Conditional View Routing: Home vs Evaluate vs UniversalModulePage */}
      {currentView === 'home' && (
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
      )}

      {currentView === 'evaluasi-akhir' && (
        <EvaluatePlaceholderPage
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenElaborate={() => handleNavigateModule('perbandingan-gaya')}
        />
      )}

      {currentView !== 'home' && currentView !== 'evaluasi-akhir' && (
        <UniversalModulePage
          key={currentView}
          moduleId={currentView}
          onNavigateHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateModule={handleNavigateModule}
          completedPages={progress.completedPages}
          onToggleComplete={handleToggleComplete}
        />
      )}

      {/* Global Footer */}
      <Footer onSelectModule={handleSelectModuleById} />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
      />
    </div>
  );
};

export default App;
