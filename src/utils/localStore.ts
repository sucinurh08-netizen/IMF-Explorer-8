

/** Helper for safe localStorage access */
export const safeGet = (key: string): any => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Gagal membaca localStorage', e);
    return null;
  }
};

export const safeSet = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Gagal menyimpan ke localStorage', e);
    // tidak menampilkan pesan berhasil
  }
};

export const safeRemove = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Gagal menghapus key localStorage', e);
  }
};

