import React, { useState } from 'react';

type TemperatureState = 25 | 60 | 100;

export const EvaporationSimulation: React.FC = () => {
  const [temp, setTemp] = useState<TemperatureState>(25);
  const [showBondLabels, setShowBondLabels] = useState<boolean>(true);

  return (
    <div className="water-oil-sim-card">
      {/* Header */}
      <div className="sim-header">
        <div className="sim-title-group">
          <span className="sim-badge">Simulasi Interaktif 5E • Explore</span>
          <h3 className="sim-main-title">Simulasi Pemanasan & Penguapan Air (H₂O)</h3>
        </div>

        <div className="sim-quick-controls">
          <button
            type="button"
            className={`sim-btn-pill ${temp === 25 ? 'active' : ''}`}
            onClick={() => setTemp(25)}
          >
            25 °C (Cairan Dingin)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${temp === 60 ? 'active' : ''}`}
            onClick={() => setTemp(60)}
          >
            60 °C (Mulai Hangat)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${temp === 100 ? 'active' : ''}`}
            onClick={() => setTemp(100)}
          >
            100 °C (Mendidih & Menguap)
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="sim-viewport">
        {/* SVG Beaker Stage */}
        <div className="test-tube-wrapper" style={{ minHeight: '380px' }}>
          <svg viewBox="0 0 320 380" className="test-tube-svg" style={{ width: '100%', height: '360px' }} role="img" aria-label="Simulasi Penguapan Air">
            <defs>
              <linearGradient id="beakerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
              </linearGradient>

              <linearGradient id="liquidWater" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#90CDF4" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#3182CE" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Beaker Glassware */}
            <rect x="50" y="80" width="220" height="230" rx="12" fill="url(#liquidWater)" opacity={temp === 100 ? 0.5 : 0.8} />
            <path d="M 40 50 L 50 60 L 50 310 A 15 15 0 0 0 65 325 L 255 325 A 15 15 0 0 0 270 310 L 270 60 L 280 50" fill="none" stroke="#245B45" strokeWidth="4" strokeLinecap="round" />
            <rect x="50" y="60" width="220" height="260" fill="url(#beakerGrad)" pointerEvents="none" />

            {/* Scale markings on beaker */}
            <line x1="50" y1="120" x2="70" y2="120" stroke="#245B45" strokeWidth="2" opacity="0.6" />
            <text x="75" y="125" fontSize="11" fill="#245B45" fontWeight="bold">200 mL</text>
            <line x1="50" y1="180" x2="70" y2="180" stroke="#245B45" strokeWidth="2" opacity="0.6" />
            <text x="75" y="185" fontSize="11" fill="#245B45" fontWeight="bold">150 mL</text>
            <line x1="50" y1="240" x2="70" y2="240" stroke="#245B45" strokeWidth="2" opacity="0.6" />
            <text x="75" y="245" fontSize="11" fill="#245B45" fontWeight="bold">100 mL</text>

            {/* Liquid Molecules Cluster (H2O) */}
            {/* Molecule 1 */}
            <g transform={`translate(${temp === 100 ? 90 : 100}, ${temp === 100 ? 250 : 260})`} className={temp === 100 ? 'shaking-liquid-anim' : ''}>
              {/* Oxygen: Red */}
              <circle cx="0" cy="0" r="14" fill="#E53E3E" stroke="#C53030" strokeWidth="2" />
              <text x="-4" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold">O</text>
              {/* Hydrogen 1: White */}
              <line x1="-8" y1="-8" x2="-16" y2="-16" stroke="#245B45" strokeWidth="3" />
              <circle cx="-16" cy="-16" r="8" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2" />
              <text x="-19" y="-13" fill="#2D3748" fontSize="8" fontWeight="bold">H</text>
              {/* Hydrogen 2: White */}
              <line x1="8" y1="-8" x2="16" y2="-16" stroke="#245B45" strokeWidth="3" />
              <circle cx="16" cy="-16" r="8" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2" />
              <text x="13" y="-13" fill="#2D3748" fontSize="8" fontWeight="bold">H</text>
            </g>

            {/* Molecule 2 */}
            <g transform={`translate(${temp === 100 ? 190 : 180}, ${temp === 100 ? 245 : 255})`} className={temp === 100 ? 'shaking-liquid-anim' : ''}>
              <circle cx="0" cy="0" r="14" fill="#E53E3E" stroke="#C53030" strokeWidth="2" />
              <text x="-4" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold">O</text>
              <line x1="-8" y1="-8" x2="-16" y2="-16" stroke="#245B45" strokeWidth="3" />
              <circle cx="-16" cy="-16" r="8" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2" />
              <line x1="8" y1="-8" x2="16" y2="-16" stroke="#245B45" strokeWidth="3" />
              <circle cx="16" cy="-16" r="8" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2" />
            </g>

            {/* Hydrogen Bond Between Molecule 1 and 2 in liquid */}
            {temp < 100 && (
              <g>
                <line x1="116" y1="244" x2="166" y2="252" stroke="#E9A15B" strokeWidth="3" strokeDasharray="5 4" />
                {showBondLabels && (
                  <text x="122" y="235" fontSize="9" fill="#C05621" fontWeight="bold">
                    Ikatan H (~20 kJ)
                  </text>
                )}
              </g>
            )}

            {/* Molecule 3 (In liquid or escaping as vapor) */}
            <g
              transform={`translate(${temp === 100 ? 110 : 140}, ${temp === 100 ? 40 : 170})`}
              className={temp === 100 ? 'rising-droplets' : ''}
              style={{ transition: 'transform 0.8s ease' }}
            >
              <circle cx="0" cy="0" r="14" fill="#E53E3E" stroke="#C53030" strokeWidth="2" />
              <text x="-4" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold">O</text>
              <line x1="-8" y1="-8" x2="-16" y2="-16" stroke="#245B45" strokeWidth="3" />
              <circle cx="-16" cy="-16" r="8" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2" />
              <line x1="8" y1="-8" x2="16" y2="-16" stroke="#245B45" strokeWidth="3" />
              <circle cx="16" cy="-16" r="8" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2" />
            </g>

            {/* Molecule 4 (Escaping as gas vapor when 100 °C) */}
            <g
              transform={`translate(${temp === 100 ? 210 : 200}, ${temp === 100 ? 25 : 180})`}
              className={temp === 100 ? 'rising-droplets' : ''}
              style={{ transition: 'transform 0.8s ease' }}
            >
              <circle cx="0" cy="0" r="14" fill="#E53E3E" stroke="#C53030" strokeWidth="2" />
              <text x="-4" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold">O</text>
              <line x1="-8" y1="-8" x2="-16" y2="-16" stroke="#245B45" strokeWidth="3" />
              <circle cx="-16" cy="-16" r="8" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2" />
              <line x1="8" y1="-8" x2="16" y2="-16" stroke="#245B45" strokeWidth="3" />
              <circle cx="16" cy="-16" r="8" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2" />
            </g>

            {/* Hydrogen Bond Between 1 and 3 in liquid */}
            {temp < 100 && (
              <line x1="100" y1="244" x2="130" y2="182" stroke="#E9A15B" strokeWidth="3" strokeDasharray="5 4" />
            )}

            {/* Hydrogen Bond Between 2 and 4 in liquid */}
            {temp < 100 && (
              <line x1="180" y1="239" x2="195" y2="192" stroke="#E9A15B" strokeWidth="3" strokeDasharray="5 4" />
            )}

            {/* Escaping Vapor Label at 100 °C */}
            {temp === 100 && (
              <g>
                <rect x="70" y="5" width="180" height="24" rx="12" fill="#245B45" />
                <text x="80" y="21" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                  Uap Gas H₂O (Molekul Utuh!)
                </text>
              </g>
            )}

            {/* Heat Source (Bunsen Burner Flame) */}
            <g transform="translate(160, 350)">
              {temp > 25 && (
                <>
                  <ellipse cx="0" cy="0" rx="25" ry="12" fill="#E9A15B" opacity="0.8" />
                  <ellipse cx="0" cy="-4" rx="15" ry="18" fill="#F3D77A" opacity="0.95" />
                  <ellipse cx="0" cy="-6" rx="8" ry="12" fill="#3182CE" opacity="0.7" />
                </>
              )}
              <rect x="-35" y="10" width="70" height="8" rx="3" fill="#718096" />
            </g>
          </svg>

          {/* Quick Indicator Tags */}
          <div className="tube-status-tags mt-2">
            <div className="layer-tag">
              <span className="dot teal" />
              <div>
                <strong>Fase: {temp === 100 ? 'Gas & Uap (Mendidih)' : 'Cairan Murni'}</strong>
                <small>Suhu Sistem: {temp} °C | Tekanan: 1 atm</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Analysis Panel */}
        <div className="sim-analysis-panel">
          <div className="phase-indicator-header">
            <span className="phase-pill">Eksplorasi Termal: {temp} °C</span>
            <span className="phase-badge-title">
              {temp === 25 && 'Fase Cair: Ikatan Hidrogen Terbentuk Stabil'}
              {temp === 60 && 'Pemanasan: Energi Kinetik Molekul Meningkat'}
              {temp === 100 && 'Mendidih: Pemutusan Ikatan Antarmolekul'}
            </span>
          </div>

          <div className="analysis-body">
            {temp === 25 && (
              <>
                <p className="analysis-lead">
                  Pada suhu kamar 25 °C, molekul air berada dalam fase cair yang saling terikat rapat oleh jaringan ikatan hidrogen dinamis (~20–25 kJ/mol).
                </p>
                <div className="micro-insight-box">
                  <p>
                    <strong>Garis Putus-Putus Oranye:</strong> Menunjukkan <em>Gaya Antarmolekul</em> (Ikatan Hidrogen) yang menghubungkan atom H-δ⁺ dengan PEB atom O tetangga.
                  </p>
                  <p>
                    <strong>Garis Solid Hitam:</strong> Menunjukkan <em>Ikatan Kovalen Intramolekul</em> (O–H) yang mengikat atom secara kimia di dalam molekul (~460 kJ/mol).
                  </p>
                </div>
              </>
            )}

            {temp === 60 && (
              <>
                <p className="analysis-lead">
                  Kalor yang diserap meningkatkan energi kinetik partikel. Molekul bergetar dan bergerak lebih cepat.
                </p>
                <div className="micro-insight-box">
                  <p>
                    Ikatan hidrogen antarmolekul mulai meregang dan mengalami pemutusan sesaat lebih sering, namun gaya kohesi cairan masih mampu menahan molekul dalam fase cair.
                  </p>
                </div>
              </>
            )}

            {temp === 100 && (
              <>
                <p className="analysis-lead">
                  Pada titik didih 100 °C, energi kinetik molekul melampaui energi gaya tarik antarmolekul!
                </p>
                <div className="micro-insight-box">
                  <p style={{ color: '#245B45', fontWeight: 700 }}>
                    ✅ FAKTA ILMIAH PENTING:
                  </p>
                  <p>
                    Ikatan hidrogen antarmolekul putus, sehingga molekul-molekul H₂O terpisah dan terbang ke udara sebagai <strong>UAP AIR</strong>.
                  </p>
                  <p style={{ color: '#C53030' }}>
                    ❌ Ikatan kovalen O–H di dalam molekul <strong>TIDAK PERNAH PUTUS</strong>! Molekul air di fase gas tetap berupa H₂O yang utuh, BUKAN gas H₂ atau O₂.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="sim-action-footer">
            <button
              type="button"
              className="btn-sim-action primary"
              onClick={() => {
                if (temp === 25) setTemp(60);
                else if (temp === 60) setTemp(100);
                else setTemp(25);
              }}
            >
              {temp === 25 && '🔥 Panaskan ke 60 °C'}
              {temp === 60 && '🔥 Panaskan ke Titik Didih 100 °C'}
              {temp === 100 && '❄️ Dinginkan Kembali ke 25 °C'}
            </button>

            <button
              type="button"
              className="btn-sim-action secondary"
              onClick={() => setShowBondLabels(!showBondLabels)}
            >
              {showBondLabels ? 'Sembunyikan Label Ikatan' : 'Tampilkan Label Ikatan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

