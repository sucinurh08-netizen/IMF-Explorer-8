import React, { useState } from 'react';

export const DipoleSimulation: React.FC = () => {
  // Rotation angle of Molecule B in degrees: 0, 90, 180, 270
  const [angle, setAngle] = useState<number>(0);
  const [distance, setDistance] = useState<number>(240); // center-to-center distance

  // Determine interaction state based on angle
  // 0 deg: Molecule B has H on left, Cl on right -> Molecule A (H left, Cl right) has Cl-δ⁻ near H-δ⁺ => ATTRACTION!
  // 180 deg: Molecule B has Cl on left, H on right -> Molecule A has Cl-δ⁻ near Cl-δ⁻ => REPULSION!
  // 90 or 270 deg: Neutral / Perpendicular
  let interactionType: 'attract' | 'repel' | 'neutral' = 'attract';
  if (angle === 180) {
    interactionType = 'repel';
  } else if (angle === 90 || angle === 270) {
    interactionType = 'neutral';
  }

  return (
    <div className="water-oil-sim-card">
      <div className="sim-header">
        <div className="sim-title-group">
          <span className="sim-badge">Simulasi Interaktif 5E • Explain</span>
          <h3 className="sim-main-title">Simulasi Orientasi Ruang & Interaksi Dipol HCl</h3>
        </div>

        <div className="sim-quick-controls">
          <button
            type="button"
            className={`sim-btn-pill ${angle === 0 ? 'active' : ''}`}
            onClick={() => setAngle(0)}
          >
            Orientasi Sejajar Tarik (0°)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${angle === 90 ? 'active' : ''}`}
            onClick={() => setAngle(90)}
          >
            Tegak Lurus (90°)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${angle === 180 ? 'active' : ''}`}
            onClick={() => setAngle(180)}
          >
            Berhadapan Tolak (180°)
          </button>
        </div>
      </div>

      <div className="sim-viewport">
        {/* SVG Canvas */}
        <div className="test-tube-wrapper" style={{ minHeight: '360px', width: '100%' }}>
          <svg viewBox="0 0 460 280" style={{ width: '100%', height: '260px' }} role="img" aria-label="Simulasi Dipol-Dipol HCl">
            {/* Background Field Lines */}
            <rect x="0" y="0" width="460" height="280" fill="#F7FAFC" rx="12" />

            {/* MOLECULE A (STATIONARY on LEFT) */}
            <g transform="translate(110, 140)">
              {/* Covalent bond line (Solid black/gray) */}
              <line x1="-32" y1="0" x2="30" y2="0" stroke="#2D3748" strokeWidth="6" strokeLinecap="round" />

              {/* Hydrogen Atom (White CPK with gray stroke) */}
              <circle cx="-35" cy="0" r="16" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2.5" />
              <text x="-40" y="5" fill="#2D3748" fontSize="12" fontWeight="bold">H</text>
              {/* Delta Plus badge */}
              <rect x="-56" y="-35" width="28" height="20" rx="5" fill="#ED8936" />
              <text x="-50" y="-21" fill="#FFFFFF" fontSize="11" fontWeight="bold">δ⁺</text>

              {/* Chlorine Atom (Green CPK) */}
              <circle cx="35" cy="0" r="26" fill="#38A169" stroke="#276749" strokeWidth="3" />
              <text x="27" y="6" fill="#FFFFFF" fontSize="14" fontWeight="bold">Cl</text>
              {/* Delta Minus badge */}
              <rect x="25" y="-45" width="28" height="20" rx="5" fill="#3182CE" />
              <text x="31" y="-31" fill="#FFFFFF" fontSize="11" fontWeight="bold">δ⁻</text>

              <text x="-25" y="50" fontSize="11" fill="#4A5568" fontWeight="bold">Molekul A (HCl)</text>
            </g>

            {/* INTERACTION FORCE INDICATOR BETWEEN MOLECULE A & B */}
            {interactionType === 'attract' && (
              <g>
                <line x1="175" y1="140" x2={distance - 45} y2="140" stroke="#E9A15B" strokeWidth="4" strokeDasharray="6 4" />
                <rect x="180" y="85" width="110" height="26" rx="13" fill="#245B45" />
                <text x="188" y="102" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  Tarik-Menarik δ⁻···δ⁺
                </text>
              </g>
            )}

            {interactionType === 'repel' && (
              <g>
                {/* Wavy red repulsion lines */}
                <path d={`M 175 130 Q ${(175 + distance - 45) / 2} 120 ${distance - 45} 130`} fill="none" stroke="#E53E3E" strokeWidth="3" strokeDasharray="4 3" />
                <path d={`M 175 140 Q ${(175 + distance - 45) / 2} 150 ${distance - 45} 140`} fill="none" stroke="#E53E3E" strokeWidth="3" strokeDasharray="4 3" />
                <rect x="180" y="85" width="110" height="26" rx="13" fill="#C53030" />
                <text x="190" y="102" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  Tolak-Menolak δ⁻···δ⁻
                </text>
              </g>
            )}

            {interactionType === 'neutral' && (
              <g>
                <line x1="175" y1="140" x2={distance - 45} y2="140" stroke="#A0AEC0" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <rect x="185" y="85" width="100" height="26" rx="13" fill="#718096" />
                <text x="195" y="102" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  Orientasi Miring
                </text>
              </g>
            )}

            {/* MOLECULE B (ROTATABLE on RIGHT) */}
            <g
              transform={`translate(${distance + 35}, 140) rotate(${angle})`}
              style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              {/* Covalent bond */}
              <line x1="-32" y1="0" x2="30" y2="0" stroke="#2D3748" strokeWidth="6" strokeLinecap="round" />

              {/* Hydrogen Atom */}
              <circle cx="-35" cy="0" r="16" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2.5" />
              <text x="-40" y="5" fill="#2D3748" fontSize="12" fontWeight="bold">H</text>
              {/* Delta Plus */}
              <rect x="-56" y="-35" width="28" height="20" rx="5" fill="#ED8936" />
              <text x="-50" y="-21" fill="#FFFFFF" fontSize="11" fontWeight="bold">δ⁺</text>

              {/* Chlorine Atom */}
              <circle cx="35" cy="0" r="26" fill="#38A169" stroke="#276749" strokeWidth="3" />
              <text x="27" y="6" fill="#FFFFFF" fontSize="14" fontWeight="bold">Cl</text>
              {/* Delta Minus */}
              <rect x="25" y="-45" width="28" height="20" rx="5" fill="#3182CE" />
              <text x="31" y="-31" fill="#FFFFFF" fontSize="11" fontWeight="bold">δ⁻</text>
            </g>

            {/* Rotation Angle Tag under Molecule B */}
            <text x={distance + 10} y="225" fontSize="11" fill="#4A5568" fontWeight="bold">
              Molekul B (Sudut: {angle}°)
            </text>
          </svg>

          {/* Molecule Inspector Status Bar */}
          <div className="tube-status-tags mt-2">
            <div className={`layer-tag ${interactionType === 'attract' ? 'oil-tag' : ''}`}>
              <span className={`dot ${interactionType === 'attract' ? 'gold' : interactionType === 'repel' ? 'orange' : 'teal'}`} />
              <div>
                <strong>
                  {interactionType === 'attract' && 'Gaya Tarik Dipol-Dipol Maksimum (Sistem Stabil)'}
                  {interactionType === 'repel' && 'Gaya Tolak Elektrostatik (Sistem Tidak Stabil)'}
                  {interactionType === 'neutral' && 'Interaksi Lemah (Netral / Tidak Sejajar)'}
                </strong>
                <small>
                  {interactionType === 'attract' && 'Kutub Cl(δ⁻) menarik H(δ⁺) tetangga'}
                  {interactionType === 'repel' && 'Kutub Cl(δ⁻) berhadapan dengan Cl(δ⁻) sejenis'}
                  {interactionType === 'neutral' && 'Sudut tegak lurus meniadakan interaksi dipol'}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Analysis Panel */}
        <div className="sim-analysis-panel">
          <div className="phase-indicator-header">
            <span className="phase-pill">Sudut Rotasi: {angle}°</span>
            <span className="phase-badge-title">
              {interactionType === 'attract' && 'Konfigurasi Tarik Menarik'}
              {interactionType === 'repel' && 'Konfigurasi Tolak Menolak'}
              {interactionType === 'neutral' && 'Konfigurasi Antara'}
            </span>
          </div>

          <div className="analysis-body">
            {interactionType === 'attract' && (
              <>
                <p className="analysis-lead">
                  Orientasi sejajar dengan kutub muatan berlawanan yang saling berhadapan: <strong>Cl(δ⁻) ····· H(δ⁺)</strong>.
                </p>
                <div className="micro-insight-box">
                  <p>
                    Muatan parsial negatif atom Klorin (hijau) menarik muatan parsial positif atom Hidrogen (putih) tetangganya.
                  </p>
                  <p>
                    Ini adalah konfigurasi berenergi potensial terendah (paling disukai secara alami) dalam fasa cair dan padat.
                  </p>
                </div>
              </>
            )}

            {interactionType === 'repel' && (
              <>
                <p className="analysis-lead">
                  Kutub muatan sejenis dipaksa berhadapan: <strong>Cl(δ⁻) ····· Cl(δ⁻)</strong>.
                </p>
                <div className="micro-insight-box">
                  <p>
                    Hukum Coulomb menyatakan bahwa muatan sejenis saling tolak-menolak. Konfigurasi ini memiliki energi potensial tinggi dan molekul akan secara spontan berputar mencari posisi tarik-menarik.
                  </p>
                </div>
              </>
            )}

            {interactionType === 'neutral' && (
              <>
                <p className="analysis-lead">
                  Pada sudut 90° atau 270°, kutub dipol berada pada posisi tegak lurus.
                </p>
                <div className="micro-insight-box">
                  <p>
                    Gaya tarik dan tolak elektrostatik saling meniadakan, sehingga gaya dipol-dipol netto mendekati nol.
                  </p>
                </div>
              </>
            )}

            {/* Distance Slider Control */}
            <div style={{ marginTop: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-dark-text)' }}>
                Jarak Antarmolekul: {Math.round(distance / 2)} pm
              </label>
              <input
                type="range"
                min="200"
                max="300"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.35rem' }}
              />
            </div>
          </div>

          <div className="sim-action-footer">
            <button
              type="button"
              className="btn-sim-action primary"
              onClick={() => setAngle((prev) => (prev + 90) % 360)}
            >
              🔄 Putar Molekul B (+90°)
            </button>

            <button
              type="button"
              className="btn-sim-action secondary"
              onClick={() => { setAngle(0); setDistance(240); }}
            >
              Reset Posisi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

