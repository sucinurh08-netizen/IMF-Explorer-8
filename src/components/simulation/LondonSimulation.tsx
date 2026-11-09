import React, { useState, useEffect } from 'react';

type LondonStep = 1 | 2 | 3 | 4;
type MoleculeChoice = 'argon' | 'methane';

export const LondonSimulation: React.FC = () => {
  const [step, setStep] = useState<LondonStep>(1);
  const [molecule, setMolecule] = useState<MoleculeChoice>('methane');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-step timer when playing
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep((prev) => (prev >= 4 ? 1 : ((prev + 1) as LondonStep)));
      }, 2800);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="water-oil-sim-card">
      {/* Simulation Header */}
      <div className="sim-header">
        <div className="sim-title-group">
          <span className="sim-badge">Simulasi Interaktif 5E • Explain</span>
          <h3 className="sim-main-title">Simulasi Mekanisme Gaya Dispersi London</h3>
        </div>

        <div className="sim-quick-controls">
          <button
            type="button"
            className={`sim-btn-pill ${molecule === 'methane' ? 'active' : ''}`}
            onClick={() => setMolecule('methane')}
          >
            Metana (CH₄)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${molecule === 'argon' ? 'active' : ''}`}
            onClick={() => setMolecule('argon')}
          >
            Argon (Ar)
          </button>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`sim-btn-pill ${step === 1 ? 'active' : ''}`}
          onClick={() => { setIsPlaying(false); setStep(1); }}
        >
          Tahap 1: Awan Elektron Simetris
        </button>
        <button
          type="button"
          className={`sim-btn-pill ${step === 2 ? 'active' : ''}`}
          onClick={() => { setIsPlaying(false); setStep(2); }}
        >
          Tahap 2: Dipol Sesaat Terbentuk
        </button>
        <button
          type="button"
          className={`sim-btn-pill ${step === 3 ? 'active' : ''}`}
          onClick={() => { setIsPlaying(false); setStep(3); }}
        >
          Tahap 3: Induksi Molekul Tetangga
        </button>
        <button
          type="button"
          className={`sim-btn-pill ${step === 4 ? 'active' : ''}`}
          onClick={() => { setIsPlaying(false); setStep(4); }}
        >
          Tahap 4: Gaya Tarik London
        </button>
      </div>

      {/* Main Viewport */}
      <div className="sim-viewport">
        {/* SVG Canvas */}
        <div className="test-tube-wrapper" style={{ minHeight: '360px', width: '100%' }}>
          <svg viewBox="0 0 460 300" style={{ width: '100%', height: '280px' }} role="img" aria-label="Simulasi Gaya London">
            <defs>
              {/* Radial gradient for symmetric electron cloud */}
              <radialGradient id="cloudSymmetric" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#81E6D9" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#4FD1C5" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#319795" stopOpacity="0.05" />
              </radialGradient>

              {/* Gradient for shifted electron cloud (Left: delta plus, Right: delta minus) */}
              <linearGradient id="cloudShifted" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CBD5E0" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#4FD1C5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3182CE" stopOpacity="0.85" />
              </linearGradient>

              {/* Gradient for induced cloud (Left: delta plus, Right: delta minus) */}
              <linearGradient id="cloudInduced" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CBD5E0" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#4FD1C5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3182CE" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* PARTICLE 1 (LEFT MOLECULE / ATOM) */}
            <g transform="translate(130, 150)">
              {/* Electron Cloud Oval */}
              {step === 1 ? (
                <ellipse cx="0" cy="0" rx="65" ry="60" fill="url(#cloudSymmetric)" />
              ) : (
                <ellipse
                  cx="10"
                  cy="0"
                  rx="75"
                  ry="60"
                  fill="url(#cloudShifted)"
                  style={{ transition: 'all 0.6s ease' }}
                />
              )}

              {/* Molecule Core */}
              {molecule === 'methane' ? (
                <g>
                  {/* Carbon atom (Black CPK) */}
                  <circle cx="0" cy="0" r="18" fill="#1A202C" stroke="#2D3748" strokeWidth="2.5" />
                  <text x="-5" y="5" fill="#FFFFFF" fontSize="12" fontWeight="bold">C</text>

                  {/* 4 Hydrogen atoms (White CPK) */}
                  {/* Top H */}
                  <line x1="0" y1="-18" x2="0" y2="-38" stroke="#718096" strokeWidth="3" />
                  <circle cx="0" cy="-38" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-4" y="-34" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  {/* Bottom H */}
                  <line x1="0" y1="18" x2="0" y2="38" stroke="#718096" strokeWidth="3" />
                  <circle cx="0" cy="38" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-4" y="42" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  {/* Left H */}
                  <line x1="-18" y1="0" x2="-38" y2="0" stroke="#718096" strokeWidth="3" />
                  <circle cx="-38" cy="0" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-42" y="4" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  {/* Right H */}
                  <line x1="18" y1="0" x2="38" y2="0" stroke="#718096" strokeWidth="3" />
                  <circle cx="38" cy="0" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="34" y="4" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>
                </g>
              ) : (
                <g>
                  {/* Argon Atom */}
                  <circle cx="0" cy="0" r="24" fill="#805AD5" stroke="#6B46C1" strokeWidth="3" />
                  <text x="-8" y="5" fill="#FFFFFF" fontSize="12" fontWeight="bold">Ar</text>
                </g>
              )}

              {/* Partial charge badges for Left Particle */}
              {step >= 2 && (
                <>
                  <rect x="-70" y="-14" width="28" height="24" rx="6" fill="#ED8936" />
                  <text x="-64" y="3" fill="#FFFFFF" fontSize="12" fontWeight="bold">δ⁺</text>

                  <rect x="55" y="-14" width="28" height="24" rx="6" fill="#3182CE" />
                  <text x="61" y="3" fill="#FFFFFF" fontSize="12" fontWeight="bold">δ⁻</text>
                </>
              )}
            </g>

            {/* PARTICLE 2 (RIGHT MOLECULE / ATOM) */}
            <g transform="translate(330, 150)">
              {/* Electron Cloud */}
              {step < 3 ? (
                <ellipse cx="0" cy="0" rx="65" ry="60" fill="url(#cloudSymmetric)" />
              ) : (
                <ellipse
                  cx="12"
                  cy="0"
                  rx="75"
                  ry="60"
                  fill="url(#cloudInduced)"
                  style={{ transition: 'all 0.6s ease' }}
                />
              )}

              {/* Molecule Core */}
              {molecule === 'methane' ? (
                <g>
                  <circle cx="0" cy="0" r="18" fill="#1A202C" stroke="#2D3748" strokeWidth="2.5" />
                  <text x="-5" y="5" fill="#FFFFFF" fontSize="12" fontWeight="bold">C</text>

                  <line x1="0" y1="-18" x2="0" y2="-38" stroke="#718096" strokeWidth="3" />
                  <circle cx="0" cy="-38" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-4" y="-34" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  <line x1="0" y1="18" x2="0" y2="38" stroke="#718096" strokeWidth="3" />
                  <circle cx="0" cy="38" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-4" y="42" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  <line x1="-18" y1="0" x2="-38" y2="0" stroke="#718096" strokeWidth="3" />
                  <circle cx="-38" cy="0" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="-42" y="4" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>

                  <line x1="18" y1="0" x2="38" y2="0" stroke="#718096" strokeWidth="3" />
                  <circle cx="38" cy="0" r="10" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
                  <text x="34" y="4" fill="#2D3748" fontSize="9" fontWeight="bold">H</text>
                </g>
              ) : (
                <g>
                  <circle cx="0" cy="0" r="24" fill="#805AD5" stroke="#6B46C1" strokeWidth="3" />
                  <text x="-8" y="5" fill="#FFFFFF" fontSize="12" fontWeight="bold">Ar</text>
                </g>
              )}

              {/* Partial charge badges for Right Particle */}
              {step >= 3 && (
                <>
                  <rect x="-70" y="-14" width="28" height="24" rx="6" fill="#ED8936" />
                  <text x="-64" y="3" fill="#FFFFFF" fontSize="12" fontWeight="bold">δ⁺</text>

                  <rect x="55" y="-14" width="28" height="24" rx="6" fill="#3182CE" />
                  <text x="61" y="3" fill="#FFFFFF" fontSize="12" fontWeight="bold">δ⁻</text>
                </>
              )}
            </g>

            {/* INTERMOLECULAR LONDON FORCE ATTRACTION LINE (STEP 4) */}
            {step === 4 && (
              <g>
                <line x1="210" y1="150" x2="250" y2="150" stroke="#E9A15B" strokeWidth="4" strokeDasharray="6 4" />
                <rect x="180" y="85" width="100" height="26" rx="13" fill="#245B45" />
                <text x="188" y="102" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  Gaya London!
                </text>
                {/* Electric field arrow indicator */}
                <path d="M 210 135 L 250 135" stroke="#E9A15B" strokeWidth="2" markerEnd="url(#arrow)" />
              </g>
            )}

            {/* Labels under particles */}
            <text x="80" y="250" fontSize="12" fill="#2D3748" fontWeight="bold">
              Molekul A {step >= 2 ? '(Dipol Sesaat)' : '(Nonpolar Netral)'}
            </text>
            <text x="280" y="250" fontSize="12" fill="#2D3748" fontWeight="bold">
              Molekul B {step >= 3 ? '(Dipol Terinduksi)' : '(Nonpolar Netral)'}
            </text>
          </svg>
        </div>

        {/* Right Side Step Narrative */}
        <div className="sim-analysis-panel">
          <div className="phase-indicator-header">
            <span className="phase-pill">Tahap {step} dari 4</span>
            <span className="phase-badge-title">
              {step === 1 && '1. Awan Elektron Simetris Rata'}
              {step === 2 && '2. Fluktuasi Menghasilkan Dipol Sesaat'}
              {step === 3 && '3. Pembentukan Dipol Terinduksi'}
              {step === 4 && '4. Gaya Tarik Dispersi London Terjadi!'}
            </span>
          </div>

          <div className="analysis-body">
            {step === 1 && (
              <>
                <p className="analysis-lead">
                  Dalam kondisi rata-rata waktu, kerapatan awan elektron pada molekul nonpolar (CH₄ atau Ar) terdistribusi simetris sempurna di sekitar inti.
                </p>
                <div className="micro-insight-box">
                  <p>
                    Muatan positif inti diseimbangkan sempurna oleh muatan negatif elektron. Tidak ada kutub muatan (momen dipol netto μ = 0 D).
                  </p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="analysis-lead">
                  Elektron terus bergerak secara acak. Pada satu momen sesaat (sepersekian femtodetik), terjadi ketidakseimbangan kerapatan elektron!
                </p>
                <div className="micro-insight-box">
                  <p>
                    Sisi kanan yang kelebihan elektron menjadi bermuatan <strong>parsial negatif (δ⁻)</strong>, sedangkan sisi kiri yang kekurangan elektron menjadi <strong>parsial positif (δ⁺)</strong>. Inilah yang disebut <strong>DIPOL SESAAT</strong>.
                  </p>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="analysis-lead">
                  Kutub negatif (δ⁻) dari dipol sesaat pada Molekul A menolak awan elektron pada Molekul B di dekatnya!
                </p>
                <div className="micro-insight-box">
                  <p>
                    Penolakan ini mendorong elektron Molekul B bergeser ke sisi kanan, menciptakan <strong>DIPOL TERINDUKSI</strong> pada Molekul B (sisi kiri menjadi δ⁺, sisi kanan menjadi δ⁻).
                  </p>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p className="analysis-lead">
                  Terjadi tarik-menarik elektrostatik antara kutub δ⁻ Molekul A dengan kutub δ⁺ Molekul B!
                </p>
                <div className="micro-insight-box">
                  <p>
                    Tarik-menarik inilah yang dinamakan <strong>GAYA DISPERSI LONDON</strong> (garis putus-putus oranye). Meskipun dipol sesaat ini berganti arah dalam sekejap, tarikan netto selalu tercipta secara terus-menerus.
                  </p>
                  <p style={{ color: '#245B45', fontWeight: 700 }}>
                    💡 Fakta Kunci: Semakin banyak elektron (makin besar massa molar), semakin mudah awan elektron terpolarisasi (polarisabilitas tinggi), sehingga gaya London semakin kuat!
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="sim-action-footer">
            <button
              type="button"
              className="btn-sim-action primary"
              onClick={() => setStep((prev) => (prev >= 4 ? 1 : ((prev + 1) as LondonStep)))}
            >
              {step === 4 ? '🔄 Ulangi dari Tahap 1' : 'Lanjut ke Tahap Berikutnya →'}
            </button>

            <button
              type="button"
              className="btn-sim-action secondary"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸️ Jeda Otomatis' : '▶️ Putar Otomatis'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

