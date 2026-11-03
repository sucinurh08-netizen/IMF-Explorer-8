import React from 'react';
import { LEARNING_MODULES } from '../data/curriculumData';

interface FooterProps {
  onSelectModule: (moduleId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectModule }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="content-wrapper">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <h4 className="footer-brand-title">IMF Explorer: Jelajah Gaya Antarmolekul</h4>
            <p className="footer-brand-desc">
              Website pembelajaran kimia interaktif untuk peserta didik SMA/MA kelas XI (Fase F). 
              Menghubungkan fenomena makroskopik dengan pemodelan submikroskopik dan representasi simbolik.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#A8C3A0', lineHeight: 1.5 }}>
              🔒 <strong>Privasi & Penyimpanan:</strong> Progres belajar disimpan secara mandiri dan anonim di peramban web lokal Anda melalui <code>localStorage</code>.
            </div>
          </div>

          {/* Module Links */}
          <div>
            <h5 className="footer-heading">Modul Pembelajaran</h5>
            <ul className="footer-links-list">
              {LEARNING_MODULES.map((m) => (
                <li key={m.id} className="footer-link-item">
                  <a
                    href={`#${m.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectModule(m.id);
                    }}
                  >
                    {m.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation & Framework */}
          <div>
            <h5 className="footer-heading">Navigasi Halaman</h5>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#beranda" onClick={(e) => { e.preventDefault(); scrollTo('beranda'); }}>
                  Beranda Utama
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#progres" onClick={(e) => { e.preventDefault(); scrollTo('progres'); }}>
                  Indikator Progres
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#tiga-gaya" onClick={(e) => { e.preventDefault(); scrollTo('tiga-gaya'); }}>
                  3 Gaya Antarmolekul
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#alur-belajar" onClick={(e) => { e.preventDefault(); scrollTo('alur-belajar'); }}>
                  Alur Siklus 5E
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#prasyarat" onClick={(e) => { e.preventDefault(); scrollTo('prasyarat'); }}>
                  Pengingat Prasyarat
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#pedagogi" onClick={(e) => { e.preventDefault(); scrollTo('pedagogi'); }}>
                  Kerangka Representasi Kimia
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>&copy; 2026 IMF Explorer • Media Pembelajaran Kimia Interaktif Kelas XI</span>
          <span>Disesuaikan dengan Capaian Pembelajaran Kimia Fase F (Kurikulum Merdeka)</span>
        </div>
      </div>
    </footer>
  );
};
