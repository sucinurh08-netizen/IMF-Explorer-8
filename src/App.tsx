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
import { ModuleDetailModal } from './components/ModuleDetailModal';

export const App: React.FC = () => {
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

  // Launch module action
  const handleLaunchModule = (moduleId: string) => {
    const mod = LEARNING_MODULES.find((m) => m.id === moduleId);
    setIsModuleModalOpen(false);
    const updated = updateLastPage(moduleId);
    setProgress(updated);
    showToast(`Membuka pembelajaran: ${mod ? mod.title : moduleId}`);
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
  );
};

export default App;
