import type { IMFProgress } from '../types/curriculum';

export const STORAGE_KEY = 'imf_explorer_progress';

export const INITIAL_PROGRESS: IMFProgress = {
  lastPage: 'fenomena-air-minyak',
  completedPages: [],
  completedQuizzes: {},
  evaluationStatus: {
    completed: false,
  },
  lastUpdated: new Date().toISOString(),
};

/**
 * Membaca progres belajar dari localStorage secara aman.
 * Jika data tidak tersedia atau rusak, fallback ke data awal tanpa melempar error.
 */
export function getSavedProgress(): IMFProgress {
  if (typeof window === 'undefined') {
    return INITIAL_PROGRESS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return INITIAL_PROGRESS;
    }

    return {
      lastPage: typeof parsed.lastPage === 'string' ? parsed.lastPage : INITIAL_PROGRESS.lastPage,
      completedPages: Array.isArray(parsed.completedPages) ? parsed.completedPages : [],
      completedQuizzes: typeof parsed.completedQuizzes === 'object' && parsed.completedQuizzes !== null ? parsed.completedQuizzes : {},
      evaluationStatus: parsed.evaluationStatus && typeof parsed.evaluationStatus === 'object' ? parsed.evaluationStatus : { completed: false },
      lastUpdated: typeof parsed.lastUpdated === 'string' ? parsed.lastUpdated : new Date().toISOString(),
    };
  } catch (error) {
    console.warn('[IMF Explorer] Gagal membaca progres dari localStorage, menggunakan default.', error);
    return INITIAL_PROGRESS;
  }
}

/**
 * Menyimpan seluruh objek progres ke localStorage
 */
export function saveProgress(progress: IMFProgress): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const updated: IMFProgress = {
      ...progress,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('[IMF Explorer] Gagal menyimpan progres ke localStorage', error);
    return false;
  }
}

/**
 * Memperbarui halaman terakhir yang dikunjungi peserta didik
 */
export function updateLastPage(pageId: string): IMFProgress {
  const current = getSavedProgress();
  const next: IMFProgress = {
    ...current,
    lastPage: pageId,
  };
  saveProgress(next);
  return next;
}

/**
 * Menandai modul tertentu sebagai selesai dipelajari
 */
export function markPageCompleted(pageId: string): IMFProgress {
  const current = getSavedProgress();
  if (current.completedPages.includes(pageId)) {
    return current;
  }
  const next: IMFProgress = {
    ...current,
    completedPages: [...current.completedPages, pageId],
  };
  saveProgress(next);
  return next;
}

/**
 * Menghapus progres dan mengembalikan ke status awal
 */
export function resetProgress(): IMFProgress {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('[IMF Explorer] Gagal menghapus localStorage key', e);
    }
  }
  return INITIAL_PROGRESS;
}

/**
 * Menghitung persentase progres belajar berdasarkan total modul wajib
 */
export function calculateProgressPercentage(completedPages: string[], totalModules: number = 7): number {
  if (totalModules <= 0) return 0;
  const count = completedPages.length;
  const pct = Math.round((count / totalModules) * 100);
  return Math.min(100, Math.max(0, pct));
}
