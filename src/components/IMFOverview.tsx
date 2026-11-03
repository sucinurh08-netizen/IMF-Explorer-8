import React from 'react';
import { IMF_TYPES } from '../data/curriculumData';

interface IMFOverviewProps {
  onSelectIMF: (imfId: string) => void;
}

export const IMFOverview: React.FC<IMFOverviewProps> = ({ onSelectIMF }) => {
  return (
    <section id="tiga-gaya" className="section">
      <div className="content-wrapper">
        <div className="section-header-center">
          <span className="section-eyebrow">Tiga Pilar Gaya Antarmolekul</span>
          <h2 className="section-title">Kenali 3 Gaya Utama Antarpartikel</h2>
          <p className="section-subtitle">
            Gaya antarmolekul bekerja antarmolekul independen dan jauh lebih lemah dibanding ikatan kovalen, 
            namun menjadi penentu utama wujud zat, kelarutan, titik didih, dan viskositas di alam.
          </p>
        </div>

        <div className="imf-pillars-grid">
          {IMF_TYPES.map((imf) => (
            <div key={imf.id} className="pillar-card">
              <div className="pillar-card-header" style={{ borderTop: `4px solid ${imf.accentColor}` }}>
                <span
                  className="pillar-badge-top"
                  style={{ backgroundColor: imf.lightBg, color: imf.accentColor }}
                >
                  {imf.id === 'london' ? 'Universal Pada Semua Molekul' : imf.id === 'dipol-dipol' ? 'Molekul Polar (μ > 0)' : 'Interaksi Spesial H–(F,O,N)'}
                </span>
                <h3 className="pillar-title">{imf.name}</h3>
                <span className="pillar-alias">{imf.alias}</span>
              </div>

              {/* Mini Diagram Graphic */}
              <div className="pillar-diagram-preview">
                {imf.id === 'london' && (
                  <svg viewBox="0 0 200 90" width="180" height="80">
                    <ellipse cx="60" cy="45" rx="36" ry="28" fill="#EAF2E6" stroke="#39765A" strokeWidth="1.2" strokeDasharray="3 2" />
                    <circle cx="60" cy="45" r="10" fill="#39765A" />
                    <ellipse cx="140" cy="45" rx="36" ry="28" fill="#EAF2E6" stroke="#39765A" strokeWidth="1.2" strokeDasharray="3 2" />
                    <circle cx="140" cy="45" r="10" fill="#39765A" />
                    <line x1="96" y1="45" x2="104" y2="45" stroke="#39765A" strokeWidth="2.5" strokeDasharray="2 2" />
                    <text x="50" y="25" fontSize="9" fontWeight="700" fill="#245B45">δ⁺</text>
                    <text x="70" y="25" fontSize="9" fontWeight="700" fill="#B85C45">δ⁻</text>
                    <text x="130" y="25" fontSize="9" fontWeight="700" fill="#245B45">δ⁺</text>
                    <text x="150" y="25" fontSize="9" fontWeight="700" fill="#B85C45">δ⁻</text>
                  </svg>
                )}

                {imf.id === 'dipol-dipol' && (
                  <svg viewBox="0 0 200 90" width="180" height="80">
                    <rect x="25" y="25" width="65" height="40" rx="20" fill="#FAF7ED" stroke="#245B45" strokeWidth="1.2" />
                    <circle cx="45" cy="45" r="10" fill="#FAF7ED" stroke="#647267" strokeWidth="1.5" />
                    <circle cx="70" cy="45" r="14" fill="#245B45" />
                    <rect x="110" y="25" width="65" height="40" rx="20" fill="#FAF7ED" stroke="#245B45" strokeWidth="1.2" />
                    <circle cx="130" cy="45" r="10" fill="#FAF7ED" stroke="#647267" strokeWidth="1.5" />
                    <circle cx="155" cy="45" r="14" fill="#245B45" />
                    <line x1="90" y1="45" x2="110" y2="45" stroke="#245B45" strokeWidth="2.5" strokeDasharray="3 2" />
                    <text x="100" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#245B45">Tarik</text>
                  </svg>
                )}

                {imf.id === 'ikatan-hidrogen' && (
                  <svg viewBox="0 0 200 90" width="180" height="80">
                    <circle cx="50" cy="45" r="18" fill="#E8765A" />
                    <text x="50" y="49" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">O</text>
                    <circle cx="28" cy="28" r="8" fill="#EAF2E6" stroke="#4C855F" />
                    <line x1="40" y1="36" x2="32" y2="30" stroke="#27352D" strokeWidth="2" />
                    
                    <line x1="68" y1="45" x2="125" y2="45" stroke="#E9A15B" strokeWidth="3" strokeDasharray="4 3" />
                    <text x="96" y="35" textAnchor="middle" fontSize="8" fontWeight="800" fill="#B85C45">H-Bond</text>

                    <circle cx="135" cy="45" r="9" fill="#EAF2E6" stroke="#4C855F" />
                    <text x="135" y="48" textAnchor="middle" fill="#245B45" fontSize="9" fontWeight="800">H</text>
                    <circle cx="165" cy="45" r="18" fill="#E8765A" />
                    <line x1="144" y1="45" x2="150" y2="45" stroke="#27352D" strokeWidth="2" />
                    <text x="165" y="49" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">O</text>
                  </svg>
                )}
              </div>

              <div className="pillar-body">
                <div className="pillar-feature-item">
                  <span className="feature-label">Mekanisme Pembentukan:</span>
                  <p className="feature-value">{imf.mechanism}</p>
                </div>

                <div className="pillar-feature-item">
                  <span className="feature-label">Keberadaan / Syarat:</span>
                  <p className="feature-value"><strong>{imf.occurIn}</strong></p>
                </div>

                <div className="pillar-feature-item">
                  <span className="feature-label">Faktor Penentu:</span>
                  <p className="feature-value">{imf.keyFactors}</p>
                </div>

                <div className="pillar-feature-item">
                  <span className="feature-label">Contoh Molekul:</span>
                  <div className="molecule-pills-row">
                    {imf.exampleMolecules.map((mol, idx) => (
                      <span key={idx} className="mol-pill">{mol}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pillar-footer">
                <button
                  type="button"
                  className="btn-pillar-explore"
                  onClick={() => onSelectIMF(imf.id === 'london' ? 'gaya-london' : imf.id === 'dipol-dipol' ? 'gaya-dipol-dipol' : 'ikatan-hidrogen')}
                >
                  <span>Pelajari Modul Ini</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
