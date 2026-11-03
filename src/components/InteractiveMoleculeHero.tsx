import React, { useState } from 'react';

type SimulationMode = 'ikatan-hidrogen' | 'dipol-dipol' | 'gaya-london' | 'air-minyak';

export const InteractiveMoleculeHero: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SimulationMode>('ikatan-hidrogen');
  const [showCharges, setShowCharges] = useState<boolean>(true);
  const [hclOrientation, setHclOrientation] = useState<'attract' | 'repel'>('attract');
  const [londonStep, setLondonStep] = useState<number>(1); // 1: simetris, 2: fluktuasi sesaat, 3: terinduksi

  return (
    <div className="molecule-stage-card">
      {/* Header with tabs */}
      <div className="molecule-stage-header">
        <div className="stage-title-wrap">
          <span className="stage-indicator-dot" />
          <span className="stage-title">Simulasi Submikroskopik</span>
        </div>
        <div className="stage-tab-group" role="tablist">
          <button
            type="button"
            className={`stage-tab-btn ${activeMode === 'ikatan-hidrogen' ? 'active' : ''}`}
            onClick={() => setActiveMode('ikatan-hidrogen')}
            title="Model Ikatan Hidrogen pada Molekul H₂O"
          >
            H₂O (Hidrogen)
          </button>
          <button
            type="button"
            className={`stage-tab-btn ${activeMode === 'dipol-dipol' ? 'active' : ''}`}
            onClick={() => setActiveMode('dipol-dipol')}
            title="Model Interaksi Dipol-Dipol pada HCl"
          >
            HCl (Dipol)
          </button>
          <button
            type="button"
            className={`stage-tab-btn ${activeMode === 'gaya-london' ? 'active' : ''}`}
            onClick={() => setActiveMode('gaya-london')}
            title="Model Gaya London pada CH₄ Nonpolar"
          >
            CH₄ (London)
          </button>
          <button
            type="button"
            className={`stage-tab-btn ${activeMode === 'air-minyak' ? 'active' : ''}`}
            onClick={() => setActiveMode('air-minyak')}
            title="Fenomena Air dan Minyak"
          >
            Air & Minyak
          </button>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="molecule-canvas-box">
        {activeMode === 'ikatan-hidrogen' && (
          <svg viewBox="0 0 460 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="oGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#E8765A" />
                <stop offset="100%" stop-color="#B83A20" />
              </radialGradient>
              <radialGradient id="hGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="100%" stop-color="#A8C3A0" />
              </radialGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Molecule 1: Left Water (H2O) */}
            <g transform="translate(115, 135)">
              {/* Covalent bonds (solid lines) */}
              <line x1="0" y1="0" x2="-48" y2="-42" stroke="#27352D" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="-48" y2="42" stroke="#27352D" strokeWidth="4.5" strokeLinecap="round" />

              {/* Central Oxygen */}
              <circle cx="0" cy="0" r="28" fill="url(#oGrad)" stroke="#8C2510" strokeWidth="1.5" />
              <text x="0" y="7" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="16" fontFamily="sans-serif">O</text>

              {/* Lone pairs (PEB) on Oxygen */}
              <circle cx="16" cy="-14" r="3.5" fill="#F3D77A" opacity="0.95" />
              <circle cx="23" cy="-7" r="3.5" fill="#F3D77A" opacity="0.95" />
              <circle cx="16" cy="14" r="3.5" fill="#F3D77A" opacity="0.95" />
              <circle cx="23" cy="7" r="3.5" fill="#F3D77A" opacity="0.95" />

              {/* Hydrogens */}
              <circle cx="-48" cy="-42" r="15" fill="url(#hGrad)" stroke="#5A7854" strokeWidth="1.5" />
              <text x="-48" y="-37" textAnchor="middle" fill="#245B45" fontWeight="800" fontSize="12" fontFamily="sans-serif">H</text>

              <circle cx="-48" cy="42" r="15" fill="url(#hGrad)" stroke="#5A7854" strokeWidth="1.5" />
              <text x="-48" y="47" textAnchor="middle" fill="#245B45" fontWeight="800" fontSize="12" fontFamily="sans-serif">H</text>

              {/* Partial charge badges */}
              {showCharges && (
                <>
                  <rect x="-14" y="-36" width="28" height="16" rx="4" fill="#FDEDEA" stroke="#E8765A" strokeWidth="1" />
                  <text x="0" y="-24" textAnchor="middle" fill="#B83A20" fontWeight="700" fontSize="10">2δ⁻</text>

                  <rect x="-70" y="-68" width="26" height="15" rx="4" fill="#E8F5EC" stroke="#4C855F" strokeWidth="1" />
                  <text x="-57" y="-57" textAnchor="middle" fill="#245B45" fontWeight="700" fontSize="10">δ⁺</text>

                  <rect x="-70" y="55" width="26" height="15" rx="4" fill="#E8F5EC" stroke="#4C855F" strokeWidth="1" />
                  <text x="-57" y="66" textAnchor="middle" fill="#245B45" fontWeight="700" fontSize="10">δ⁺</text>
                </>
              )}
            </g>

            {/* Hydrogen Bond (Dashed Amber Line) */}
            <g>
              <line
                x1="138"
                y1="135"
                x2="280"
                y2="135"
                stroke="#E9A15B"
                strokeWidth="4"
                strokeDasharray="6 5"
                strokeLinecap="round"
                filter="url(#glowEffect)"
              />
              {/* Attraction pulse annotation */}
              <rect x="160" y="100" width="100" height="22" rx="11" fill="#FFF2E5" stroke="#E9A15B" strokeWidth="1.2" />
              <text x="210" y="115" textAnchor="middle" fill="#B85C45" fontWeight="700" fontSize="10.5">
                Ikatan Hidrogen
              </text>
            </g>

            {/* Molecule 2: Right Water (H2O) */}
            <g transform="translate(330, 135)">
              {/* Hydrogen pointing towards O of left molecule */}
              <line x1="-50" y1="0" x2="0" y2="0" stroke="#27352D" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="42" y2="44" stroke="#27352D" strokeWidth="4.5" strokeLinecap="round" />

              {/* H atom interacting */}
              <circle cx="-50" cy="0" r="15" fill="url(#hGrad)" stroke="#5A7854" strokeWidth="1.5" />
              <text x="-50" y="5" textAnchor="middle" fill="#245B45" fontWeight="800" fontSize="12" fontFamily="sans-serif">H</text>

              {/* Central Oxygen */}
              <circle cx="0" cy="0" r="28" fill="url(#oGrad)" stroke="#8C2510" strokeWidth="1.5" />
              <text x="0" y="7" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="16" fontFamily="sans-serif">O</text>

              {/* Other H atom */}
              <circle cx="42" cy="44" r="15" fill="url(#hGrad)" stroke="#5A7854" strokeWidth="1.5" />
              <text x="42" y="49" textAnchor="middle" fill="#245B45" fontWeight="800" fontSize="12" fontFamily="sans-serif">H</text>

              {showCharges && (
                <>
                  <rect x="-64" y="-24" width="26" height="15" rx="4" fill="#E8F5EC" stroke="#4C855F" strokeWidth="1" />
                  <text x="-51" y="-13" textAnchor="middle" fill="#245B45" fontWeight="700" fontSize="10">δ⁺</text>

                  <rect x="-14" y="-36" width="28" height="16" rx="4" fill="#FDEDEA" stroke="#E8765A" strokeWidth="1" />
                  <text x="0" y="-24" textAnchor="middle" fill="#B83A20" fontWeight="700" fontSize="10">2δ⁻</text>
                </>
              )}
            </g>

            {/* Scientific Distinction Banner */}
            <rect x="25" y="235" width="410" height="26" rx="6" fill="#F4F8F1" stroke="#D8E2D5" strokeWidth="1" />
            <text x="230" y="252" textAnchor="middle" fill="#245B45" fontSize="11" fontWeight="600">
              Garis padat = Ikatan Kovalen (Kuat) | Garis putus-putus = Ikatan Hidrogen (Antarmolekul)
            </text>
          </svg>
        )}

        {activeMode === 'dipol-dipol' && (
          <svg viewBox="0 0 460 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="clGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#4C855F" />
                <stop offset="100%" stop-color="#245B45" />
              </radialGradient>
              <radialGradient id="hDipoleGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="100%" stop-color="#D8E2D5" />
              </radialGradient>
            </defs>

            {/* Molecule 1: Left HCl (Fixed: H on left, Cl on right) */}
            <g transform="translate(125, 125)">
              <rect x="-65" y="-30" width="130" height="60" rx="30" fill="#EAF2E6" stroke="#A8C3A0" strokeWidth="1.5" />
              <line x1="-28" y1="0" x2="26" y2="0" stroke="#27352D" strokeWidth="4.5" strokeLinecap="round" />

              {/* H atom */}
              <circle cx="-32" cy="0" r="16" fill="url(#hDipoleGrad)" stroke="#647267" strokeWidth="1.5" />
              <text x="-32" y="5" textAnchor="middle" fill="#27352D" fontWeight="800" fontSize="13">H</text>
              <text x="-32" y="-22" textAnchor="middle" fill="#39765A" fontWeight="700" fontSize="11">δ⁺</text>

              {/* Cl atom */}
              <circle cx="28" cy="0" r="26" fill="url(#clGrad)" stroke="#1A4232" strokeWidth="1.5" />
              <text x="28" y="6" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="14">Cl</text>
              <text x="28" y="-32" textAnchor="middle" fill="#B85C45" fontWeight="700" fontSize="11">δ⁻</text>
            </g>

            {/* Molecule 2: Right HCl (Depends on hclOrientation) */}
            <g transform={`translate(325, 125) ${hclOrientation === 'repel' ? 'rotate(180)' : ''}`}>
              <rect x="-65" y="-30" width="130" height="60" rx="30" fill="#EAF2E6" stroke="#A8C3A0" strokeWidth="1.5" />
              <line x1="-28" y1="0" x2="26" y2="0" stroke="#27352D" strokeWidth="4.5" strokeLinecap="round" />

              {/* H atom (on left if attract) */}
              <circle cx="-32" cy="0" r="16" fill="url(#hDipoleGrad)" stroke="#647267" strokeWidth="1.5" />
              <text x="-32" y="5" textAnchor="middle" fill="#27352D" fontWeight="800" fontSize="13">H</text>
              <text x="-32" y={hclOrientation === 'repel' ? '30' : '-22'} textAnchor="middle" fill="#39765A" fontWeight="700" fontSize="11" transform={hclOrientation === 'repel' ? 'rotate(180 -32 26)' : ''}>δ⁺</text>

              {/* Cl atom (on right if attract) */}
              <circle cx="28" cy="0" r="26" fill="url(#clGrad)" stroke="#1A4232" strokeWidth="1.5" />
              <text x="28" y="6" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="14">Cl</text>
              <text x="28" y={hclOrientation === 'repel' ? '40' : '-32'} textAnchor="middle" fill="#B85C45" fontWeight="700" fontSize="11" transform={hclOrientation === 'repel' ? 'rotate(180 28 35)' : ''}>δ⁻</text>
            </g>

            {/* Interactive Force Line */}
            {hclOrientation === 'attract' ? (
              <g>
                <line x1="180" y1="125" x2="265" y2="125" stroke="#39765A" strokeWidth="3.5" strokeDasharray="5 4" />
                <rect x="180" y="80" width="90" height="24" rx="12" fill="#E8F5EC" stroke="#4C855F" strokeWidth="1.2" />
                <text x="225" y="96" textAnchor="middle" fill="#245B45" fontWeight="700" fontSize="11">
                  TARIKAN (δ⁻···δ⁺)
                </text>
              </g>
            ) : (
              <g>
                <path d="M 185 110 Q 225 125 185 140" fill="none" stroke="#B85C45" strokeWidth="3" />
                <path d="M 265 110 Q 225 125 265 140" fill="none" stroke="#B85C45" strokeWidth="3" />
                <rect x="180" y="80" width="90" height="24" rx="12" fill="#FDEDEA" stroke="#B85C45" strokeWidth="1.2" />
                <text x="225" y="96" textAnchor="middle" fill="#B85C45" fontWeight="700" fontSize="11">
                  TOLAKAN (δ⁻···δ⁻)
                </text>
              </g>
            )}

            <rect x="25" y="235" width="410" height="26" rx="6" fill="#FAFDF9" stroke="#D8E2D5" strokeWidth="1" />
            <text x="230" y="252" textAnchor="middle" fill="#27352D" fontSize="11" fontWeight="600">
              Gaya Dipol-Dipol: Orientasi kutub berlawanan menghasilkan tarikan elektrostatik
            </text>
          </svg>
        )}

        {activeMode === 'gaya-london' && (
          <svg viewBox="0 0 460 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="fluctGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color={londonStep >= 2 ? '#E8F5EC' : '#F2F6F1'} />
                <stop offset="100%" stop-color={londonStep >= 2 ? '#FDEDEA' : '#F2F6F1'} />
              </linearGradient>
              <linearGradient id="fluctGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color={londonStep >= 3 ? '#E8F5EC' : '#F2F6F1'} />
                <stop offset="100%" stop-color={londonStep >= 3 ? '#FDEDEA' : '#F2F6F1'} />
              </linearGradient>
            </defs>

            {/* Molecule 1: CH4 Left */}
            <g transform="translate(130, 125)">
              {/* Electron cloud boundary */}
              <ellipse cx="0" cy="0" rx="62" ry="52" fill="url(#fluctGrad1)" stroke="#A8C3A0" strokeWidth="1.5" strokeDasharray="4 3" />
              {/* Carbon center */}
              <circle cx="0" cy="0" r="18" fill="#39765A" />
              <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="13">C</text>
              {/* 4 Hydrogens */}
              <circle cx="-32" cy="-24" r="10" fill="#FFFFFF" stroke="#5A7854" strokeWidth="1.2" />
              <circle cx="32" cy="-24" r="10" fill="#FFFFFF" stroke="#5A7854" strokeWidth="1.2" />
              <circle cx="-32" cy="24" r="10" fill="#FFFFFF" stroke="#5A7854" strokeWidth="1.2" />
              <circle cx="32" cy="24" r="10" fill="#FFFFFF" stroke="#5A7854" strokeWidth="1.2" />

              {londonStep >= 2 && (
                <>
                  <text x="-48" y="-38" fill="#245B45" fontWeight="800" fontSize="12">δ⁺</text>
                  <text x="40" y="-38" fill="#B85C45" fontWeight="800" fontSize="12">δ⁻</text>
                  <text x="0" y="44" textAnchor="middle" fill="#647267" fontSize="10" fontWeight="600">Dipol Sesaat</text>
                </>
              )}
            </g>

            {/* Attraction link */}
            {londonStep >= 3 ? (
              <g>
                <line x1="195" y1="125" x2="260" y2="125" stroke="#39765A" strokeWidth="3" strokeDasharray="4 3" />
                <rect x="180" y="80" width="100" height="22" rx="11" fill="#EAF2E6" stroke="#39765A" strokeWidth="1.2" />
                <text x="230" y="95" textAnchor="middle" fill="#245B45" fontWeight="700" fontSize="10">
                  Gaya London
                </text>
              </g>
            ) : (
              <line x1="195" y1="125" x2="260" y2="125" stroke="#D8E2D5" strokeWidth="1.5" strokeDasharray="2 3" />
            )}

            {/* Molecule 2: CH4 Right */}
            <g transform="translate(325, 125)">
              <ellipse cx="0" cy="0" rx="62" ry="52" fill="url(#fluctGrad2)" stroke="#A8C3A0" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="18" fill="#39765A" />
              <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="13">C</text>
              <circle cx="-32" cy="-24" r="10" fill="#FFFFFF" stroke="#5A7854" strokeWidth="1.2" />
              <circle cx="32" cy="-24" r="10" fill="#FFFFFF" stroke="#5A7854" strokeWidth="1.2" />
              <circle cx="-32" cy="24" r="10" fill="#FFFFFF" stroke="#5A7854" strokeWidth="1.2" />
              <circle cx="32" cy="24" r="10" fill="#FFFFFF" stroke="#5A7854" strokeWidth="1.2" />

              {londonStep >= 3 && (
                <>
                  <text x="-48" y="-38" fill="#245B45" fontWeight="800" fontSize="12">δ⁺</text>
                  <text x="40" y="-38" fill="#B85C45" fontWeight="800" fontSize="12">δ⁻</text>
                  <text x="0" y="44" textAnchor="middle" fill="#647267" fontSize="10" fontWeight="600">Dipol Terinduksi</text>
                </>
              )}
            </g>

            <rect x="25" y="235" width="410" height="26" rx="6" fill="#FAFDF9" stroke="#D8E2D5" strokeWidth="1" />
            <text x="230" y="252" textAnchor="middle" fill="#27352D" fontSize="11" fontWeight="600">
              {londonStep === 1 && 'Tahap 1: Awan elektron berfluktuasi secara simetris'}
              {londonStep === 2 && 'Tahap 2: Fluktuasi sesaat menciptakan dipol sesaat (δ⁺/δ⁻)'}
              {londonStep >= 3 && 'Tahap 3: Dipol sesaat menginduksi molekul tetangga -> Tarikan London!'}
            </text>
          </svg>
        )}

        {activeMode === 'air-minyak' && (
          <svg viewBox="0 0 460 270" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="oilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFF2CE" />
                <stop offset="100%" stop-color="#F3D77A" />
              </linearGradient>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#EAF2E6" />
                <stop offset="100%" stop-color="#C2DCBD" />
              </linearGradient>
            </defs>

            {/* Beaker container */}
            <rect x="130" y="40" width="200" height="180" rx="8" fill="none" stroke="#647267" strokeWidth="3" />
            <line x1="120" y1="40" x2="340" y2="40" stroke="#647267" strokeWidth="3" strokeLinecap="round" />

            {/* Bottom layer: Water */}
            <rect x="133" y="125" width="194" height="92" rx="4" fill="url(#waterGrad)" opacity="0.9" />
            {/* Top layer: Oil */}
            <rect x="133" y="65" width="194" height="60" rx="4" fill="url(#oilGrad)" opacity="0.85" />

            {/* Meniscus / Boundary line */}
            <line x1="133" y1="125" x2="327" y2="125" stroke="#39765A" strokeWidth="2.5" strokeDasharray="3 2" />

            {/* Layer annotations */}
            <text x="230" y="98" textAnchor="middle" fill="#8C6615" fontWeight="700" fontSize="13">
              Lapisan Minyak (Nonpolar)
            </text>
            <text x="230" y="165" textAnchor="middle" fill="#245B45" fontWeight="700" fontSize="13">
              Lapisan Air (Polar)
            </text>
            <text x="230" y="185" textAnchor="middle" fill="#39765A" fontWeight="600" fontSize="11">
              Jejaring Ikatan Hidrogen Kuat
            </text>

            <rect x="25" y="235" width="410" height="26" rx="6" fill="#FAFDF9" stroke="#D8E2D5" strokeWidth="1" />
            <text x="230" y="252" textAnchor="middle" fill="#27352D" fontSize="11" fontWeight="600">
              Ketidakcampuran didorong oleh ketidakcocokan polaritas & interaksi molekuler
            </text>
          </svg>
        )}
      </div>

      {/* Caption & Interactive Controls */}
      <div className="stage-caption-bar">
        <div className="caption-text">
          {activeMode === 'ikatan-hidrogen' && (
            <span>
              <strong className="caption-tag">Ikatan Hidrogen:</strong> Tarikan kuat antara H (δ⁺) dan PEB pada atom O (δ⁻).
            </span>
          )}
          {activeMode === 'dipol-dipol' && (
            <span>
              <strong className="caption-tag">Dipol-Dipol:</strong> Interaksi kutub permanen molekul polar HCl.
            </span>
          )}
          {activeMode === 'gaya-london' && (
            <span>
              <strong className="caption-tag">Gaya London:</strong> Dipol sesaat menginduksi dipol molekul tetangga.
            </span>
          )}
          {activeMode === 'air-minyak' && (
            <span>
              <strong className="caption-tag">Fenomena Engage:</strong> Ketidakcampuran air dan minyak secara molekuler.
            </span>
          )}
        </div>

        <div className="stage-controls">
          {activeMode === 'ikatan-hidrogen' && (
            <button
              type="button"
              className="stage-btn-mini"
              onClick={() => setShowCharges(!showCharges)}
            >
              {showCharges ? 'Sembunyikan δ' : 'Tampilkan δ⁺/δ⁻'}
            </button>
          )}

          {activeMode === 'dipol-dipol' && (
            <button
              type="button"
              className="stage-btn-mini"
              onClick={() => setHclOrientation(hclOrientation === 'attract' ? 'repel' : 'attract')}
            >
              {hclOrientation === 'attract' ? 'Putar Kutub (Tolak)' : 'Putar Kutub (Tarik)'}
            </button>
          )}

          {activeMode === 'gaya-london' && (
            <button
              type="button"
              className="stage-btn-mini"
              onClick={() => setLondonStep((prev) => (prev >= 3 ? 1 : prev + 1))}
            >
              Langkah {londonStep}/3 ↻
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
