import React, { useState } from 'react';

type MoleculeChoice = 'water' | 'ammonia' | 'hf' | 'ice-lattice';

export const HydrogenBondSimulation: React.FC = () => {
  const [molecule, setMolecule] = useState<MoleculeChoice>('water');
  const [showLonePairs, setShowLonePairs] = useState<boolean>(true);

  return (
    <div className="water-oil-sim-card">
      <div className="sim-header">
        <div className="sim-title-group">
          <span className="sim-badge">Simulasi Interaktif 5E • Explain</span>
          <h3 className="sim-main-title">Simulasi Ikatan Hidrogen Antarmolekul</h3>
        </div>

        <div className="sim-quick-controls">
          <button
            type="button"
            className={`sim-btn-pill ${molecule === 'water' ? 'active' : ''}`}
            onClick={() => setMolecule('water')}
          >
            Air (H₂O)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${molecule === 'ammonia' ? 'active' : ''}`}
            onClick={() => setMolecule('ammonia')}
          >
            Amonia (NH₃)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${molecule === 'hf' ? 'active' : ''}`}
            onClick={() => setMolecule('hf')}
          >
            Fluorida (HF)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${molecule === 'ice-lattice' ? 'active' : ''}`}
            onClick={() => setMolecule('ice-lattice')}
          >
            Anomali Kisi Es Heksagonal 🧊
          </button>
        </div>
      </div>

      <div className="sim-viewport">
        {/* SVG Canvas */}
        <div className="test-tube-wrapper" style={{ minHeight: '380px', width: '100%' }}>
          <svg viewBox="0 0 460 320" style={{ width: '100%', height: '300px' }} role="img" aria-label="Simulasi Ikatan Hidrogen">
            <rect x="0" y="0" width="460" height="320" fill="#F7FAFC" rx="12" />

            {/* 1. WATER (H2O) MODE: 2 MOLECULES LINKED BY HYDROGEN BOND */}
            {molecule === 'water' && (
              <g>
                {/* Molecule 1 (Left Donor) */}
                <g transform="translate(140, 160)">
                  {/* Oxygen (Red CPK) */}
                  <circle cx="0" cy="0" r="22" fill="#E53E3E" stroke="#C53030" strokeWidth="3" />
                  <text x="-6" y="6" fill="#FFFFFF" fontSize="14" fontWeight="bold">O</text>
                  <text x="-4" y="-28" fill="#3182CE" fontSize="11" fontWeight="bold">δ⁻</text>

                  {/* Left H */}
                  <line x1="-15" y1="15" x2="-35" y2="35" stroke="#2D3748" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="-35" cy="35" r="11" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2.5" />
                  <text x="-39" y="39" fill="#2D3748" fontSize="10" fontWeight="bold">H</text>
                  <text x="-52" y="32" fill="#ED8936" fontSize="10" fontWeight="bold">δ⁺</text>

                  {/* Right H (Bridge Donor) */}
                  <line x1="16" y1="-8" x2="42" y2="-18" stroke="#2D3748" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="42" cy="-18" r="11" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2.5" />
                  <text x="38" y="-14" fill="#2D3748" fontSize="10" fontWeight="bold">H</text>
                  <text x="38" y="-32" fill="#ED8936" fontSize="10" fontWeight="bold">δ⁺</text>

                  {/* Two Lone Pairs (PEB) on Oxygen */}
                  {showLonePairs && (
                    <g>
                      <circle cx="-16" cy="-16" r="3.5" fill="#F6AD55" />
                      <circle cx="-8" cy="-22" r="3.5" fill="#F6AD55" />
                      <circle cx="8" cy="-22" r="3.5" fill="#F6AD55" />
                      <circle cx="16" cy="-16" r="3.5" fill="#F6AD55" />
                      <text x="-24" y="-32" fill="#C05621" fontSize="9" fontWeight="bold">2 PEB</text>
                    </g>
                  )}
                  <text x="-35" y="68" fontSize="11" fill="#4A5568" fontWeight="bold">Molekul 1 (Donor H)</text>
                </g>

                {/* Hydrogen Bond Line (Dashed Orange) */}
                <line x1="182" y1="142" x2="280" y2="155" stroke="#E9A15B" strokeWidth="4" strokeDasharray="6 4" />
                <rect x="195" y="105" width="115" height="24" rx="12" fill="#245B45" />
                <text x="202" y="121" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  Ikatan H (~20 kJ)
                </text>

                {/* Molecule 2 (Right Acceptor) */}
                <g transform="translate(300, 160)">
                  <circle cx="0" cy="0" r="22" fill="#E53E3E" stroke="#C53030" strokeWidth="3" />
                  <text x="-6" y="6" fill="#FFFFFF" fontSize="14" fontWeight="bold">O</text>
                  <text x="-4" y="-28" fill="#3182CE" fontSize="11" fontWeight="bold">δ⁻</text>

                  {/* H atoms */}
                  <line x1="15" y1="15" x2="35" y2="35" stroke="#2D3748" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="35" cy="35" r="11" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2.5" />
                  <text x="31" y="39" fill="#2D3748" fontSize="10" fontWeight="bold">H</text>

                  <line x1="-12" y1="17" x2="-25" y2="38" stroke="#2D3748" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="-25" cy="38" r="11" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="2.5" />
                  <text x="-29" y="42" fill="#2D3748" fontSize="10" fontWeight="bold">H</text>

                  {/* Lone pairs receiving hydrogen bond */}
                  {showLonePairs && (
                    <g>
                      <circle cx="-16" cy="-12" r="3.5" fill="#F6AD55" />
                      <circle cx="-12" cy="-18" r="3.5" fill="#F6AD55" />
                      <text x="-32" y="-24" fill="#C05621" fontSize="9" fontWeight="bold">PEB Akseptor</text>
                    </g>
                  )}
                  <text x="-35" y="68" fontSize="11" fill="#4A5568" fontWeight="bold">Molekul 2 (Akseptor PEB)</text>
                </g>
              </g>
            )}

            {/* 2. AMMONIA (NH3) MODE */}
            {molecule === 'ammonia' && (
              <g>
                {/* NH3 Molecule 1 */}
                <g transform="translate(140, 160)">
                  <circle cx="0" cy="0" r="22" fill="#3182CE" stroke="#2B6CB0" strokeWidth="3" />
                  <text x="-5" y="6" fill="#FFFFFF" fontSize="14" fontWeight="bold">N</text>

                  {/* 3 Hydrogen atoms */}
                  <line x1="-15" y1="15" x2="-35" y2="35" stroke="#2D3748" strokeWidth="3.5" />
                  <circle cx="-35" cy="35" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-39" y="39" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  <line x1="0" y1="20" x2="0" y2="45" stroke="#2D3748" strokeWidth="3.5" />
                  <circle cx="0" cy="45" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-4" y="49" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  <line x1="16" y1="-5" x2="42" y2="-12" stroke="#2D3748" strokeWidth="3.5" />
                  <circle cx="42" cy="-12" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="38" y="-8" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  {showLonePairs && (
                    <g>
                      <circle cx="-5" cy="-22" r="3.5" fill="#F6AD55" />
                      <circle cx="5" cy="-22" r="3.5" fill="#F6AD55" />
                      <text x="-16" y="-30" fill="#C05621" fontSize="9" fontWeight="bold">1 PEB</text>
                    </g>
                  )}
                  <text x="-25" y="70" fontSize="11" fill="#4A5568" fontWeight="bold">NH₃ (Donor H)</text>
                </g>

                <line x1="182" y1="148" x2="280" y2="155" stroke="#E9A15B" strokeWidth="3.5" strokeDasharray="6 4" />
                <rect x="200" y="110" width="105" height="22" rx="11" fill="#245B45" />
                <text x="207" y="125" fill="#FFFFFF" fontSize="10" fontWeight="bold">Ikatan H (~13 kJ)</text>

                {/* NH3 Molecule 2 */}
                <g transform="translate(300, 160)">
                  <circle cx="0" cy="0" r="22" fill="#3182CE" stroke="#2B6CB0" strokeWidth="3" />
                  <text x="-5" y="6" fill="#FFFFFF" fontSize="14" fontWeight="bold">N</text>

                  <line x1="15" y1="15" x2="35" y2="35" stroke="#2D3748" strokeWidth="3.5" />
                  <circle cx="35" cy="35" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="31" y="39" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  <line x1="-12" y1="17" x2="-25" y2="40" stroke="#2D3748" strokeWidth="3.5" />
                  <circle cx="-25" cy="40" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-29" y="44" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  {showLonePairs && (
                    <g>
                      <circle cx="-14" cy="-14" r="3.5" fill="#F6AD55" />
                      <circle cx="-8" cy="-20" r="3.5" fill="#F6AD55" />
                    </g>
                  )}
                  <text x="-30" y="70" fontSize="11" fill="#4A5568" fontWeight="bold">NH₃ (Akseptor PEB)</text>
                </g>
              </g>
            )}

            {/* 3. HYDROGEN FLUORIDE (HF) MODE */}
            {molecule === 'hf' && (
              <g>
                <g transform="translate(130, 160)">
                  <line x1="-30" y1="0" x2="25" y2="0" stroke="#2D3748" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="-35" cy="0" r="12" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-39" y="4" fill="#2D3748" fontSize="10" fontWeight="bold">H</text>
                  <circle cx="28" cy="0" r="20" fill="#319795" stroke="#234E52" strokeWidth="3" />
                  <text x="23" y="6" fill="#FFFFFF" fontSize="13" fontWeight="bold">F</text>
                  <text x="-20" y="45" fontSize="11" fill="#4A5568" fontWeight="bold">HF Molekul 1</text>
                </g>

                <line x1="158" y1="160" x2="265" y2="160" stroke="#E9A15B" strokeWidth="4" strokeDasharray="6 4" />
                <rect x="180" y="115" width="115" height="24" rx="12" fill="#245B45" />
                <text x="188" y="131" fill="#FFFFFF" fontSize="10" fontWeight="bold">Ikatan H (~29 kJ)</text>

                <g transform="translate(300, 160)">
                  <line x1="-30" y1="0" x2="25" y2="0" stroke="#2D3748" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="-35" cy="0" r="12" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-39" y="4" fill="#2D3748" fontSize="10" fontWeight="bold">H</text>
                  <circle cx="28" cy="0" r="20" fill="#319795" stroke="#234E52" strokeWidth="3" />
                  <text x="23" y="6" fill="#FFFFFF" fontSize="13" fontWeight="bold">F</text>
                  <text x="-20" y="45" fontSize="11" fill="#4A5568" fontWeight="bold">HF Molekul 2</text>
                </g>
              </g>
            )}

            {/* 4. ICE LATTICE ANOMALY MODE */}
            {molecule === 'ice-lattice' && (
              <g transform="translate(230, 150)">
                {/* Hexagonal Open Ring */}
                <polygon
                  points="0,-80 70,-40 70,40 0,80 -70,40 -70,-40"
                  fill="none"
                  stroke="#E9A15B"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                />

                {/* Central Open Hole Label */}
                <circle cx="0" cy="0" r="32" fill="#EBF8FF" stroke="#90CDF4" strokeWidth="2" strokeDasharray="4 3" />
                <text x="-25" y="-5" fontSize="10" fill="#2B6CB0" fontWeight="bold">Rongga</text>
                <text x="-28" y="12" fontSize="9" fill="#2B6CB0">Kosong (Es)</text>

                {/* 6 H2O Nodes on Hexagon vertices */}
                {[
                  { x: 0, y: -80 },
                  { x: 70, y: -40 },
                  { x: 70, y: 40 },
                  { x: 0, y: 80 },
                  { x: -70, y: 40 },
                  { x: -70, y: -40 },
                ].map((pos, i) => (
                  <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                    <circle cx="0" cy="0" r="14" fill="#E53E3E" stroke="#C53030" strokeWidth="2" />
                    <text x="-4" y="4" fill="#FFFFFF" fontSize="9" fontWeight="bold">O</text>
                    <circle cx="-10" cy="-10" r="6" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="1.5" />
                    <circle cx="10" cy="-10" r="6" fill="#FFFFFF" stroke="#A0AEC0" strokeWidth="1.5" />
                  </g>
                ))}

                <text x="-140" y="115" fontSize="11" fill="#245B45" fontWeight="bold">
                  Kisi Kristal Es Heksagonal Terbuka (Volumenya Mengembang ~9%)
                </text>
              </g>
            )}
          </svg>

          <div className="tube-status-tags mt-2">
            <div className="layer-tag">
              <span className="dot gold" />
              <div>
                <strong>
                  {molecule === 'water' && 'Air (H₂O): 2 Donor H + 2 Akseptor PEB'}
                  {molecule === 'ammonia' && 'Amonia (NH₃): 3 Donor H + 1 Akseptor PEB (Terbatas)'}
                  {molecule === 'hf' && 'Hidrogen Fluorida (HF): 1 Donor H + 3 Akseptor PEB (Rantai 1D)'}
                  {molecule === 'ice-lattice' && 'Anomali Densitas Es: Mengapung karena Rongga Kisi Terbuka'}
                </strong>
                <small>Garis putus-putus emas = Ikatan Hidrogen antarmolekul</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Analysis */}
        <div className="sim-analysis-panel">
          <div className="phase-indicator-header">
            <span className="phase-pill">
              {molecule === 'water' ? 'H₂O' : molecule === 'ammonia' ? 'NH₃' : molecule === 'hf' ? 'HF' : 'Kisi Es'}
            </span>
            <span className="phase-badge-title">Analisis Kimia Submikroskopik</span>
          </div>

          <div className="analysis-body">
            {molecule === 'water' && (
              <>
                <p className="analysis-lead">
                  Molekul air adalah juara ikatan hidrogen karena memiliki perbandingan donor-akseptor sempurna (2 atom H dan 2 Pasangan Elektron Bebas pada atom O).
                </p>
                <div className="micro-insight-box">
                  <p>
                    Setiap molekul H₂O dapat mengikat 4 tetangganya membentuk jaringan 3D yang sangat kokoh. Inilah alasan mengapa titik didih air melonjak hingga 100 °C!
                  </p>
                </div>
              </>
            )}

            {molecule === 'ammonia' && (
              <>
                <p className="analysis-lead">
                  Amonia (NH₃) memiliki 3 atom Hidrogen, tetapi hanya memiliki 1 Pasangan Elektron Bebas (PEB) pada atom Nitrogen.
                </p>
                <div className="micro-insight-box">
                  <p>
                    Keterbatasan akseptor ini menyebabkan NH₃ tidak mampu membentuk jaringan ikatan hidrogen 3D serapat air. Akibatnya titik didih NH₃ lebih rendah (–33 °C).
                  </p>
                </div>
              </>
            )}

            {molecule === 'hf' && (
              <>
                <p className="analysis-lead">
                  Ikatan hidrogen H–F···H memiliki energi per kontak paling kuat (~29 kJ/mol) karena Fluorin adalah unsur paling elektronegatif.
                </p>
                <div className="micro-insight-box">
                  <p>
                    Namun, karena HF hanya memiliki 1 atom H per molekul, HF hanya membentuk rantai zigzag satu dimensi, bukan kisi 3 dimensi seperti air.
                  </p>
                </div>
              </>
            )}

            {molecule === 'ice-lattice' && (
              <>
                <p className="analysis-lead">
                  Mengapa es batu terapung di air?
                </p>
                <div className="micro-insight-box">
                  <p>
                    Saat membeku pada 0 °C, ikatan hidrogen mengunci molekul air ke dalam <strong>cincin heksagonal terbuka</strong> dengan rongga kosong di tengahnya.
                  </p>
                  <p>
                    Rongga ini menyebabkan massa jenis es (0,917 g/cm³) lebih kecil daripada air cair (1,000 g/cm³), sehingga es mengapung dan melindungi kehidupan biota perairan di bawahnya!
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
                if (molecule === 'water') setMolecule('ammonia');
                else if (molecule === 'ammonia') setMolecule('hf');
                else if (molecule === 'hf') setMolecule('ice-lattice');
                else setMolecule('water');
              }}
            >
              🔄 Ganti Molekul / Mode Berikutnya
            </button>

            <button
              type="button"
              className="btn-sim-action secondary"
              onClick={() => setShowLonePairs(!showLonePairs)}
            >
              {showLonePairs ? 'Sembunyikan PEB' : 'Tampilkan PEB (Elektron Bebas)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

