import React, { useState, useEffect } from 'react';

export type SimulationPhase = 'separated' | 'shaking' | 'emulsion' | 'settling';

interface WaterOilSimulationProps {
  onPhaseChange?: (phase: SimulationPhase) => void;
}

export const WaterOilSimulation: React.FC<WaterOilSimulationProps> = ({ onPhaseChange }) => {
  const [phase, setPhase] = useState<SimulationPhase>('separated');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (onPhaseChange) {
      onPhaseChange(phase);
    }
  }, [phase, onPhaseChange]);

  const handleAction = (target: SimulationPhase) => {
    setIsAutoPlaying(false);
    if (target === 'settling') {
      setTimerSeconds(4);
    }
    setPhase(target);
  };

  // Handle settling countdown
  useEffect(() => {
    let interval: any;
    if (phase === 'settling') {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setPhase('separated');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase]);

  // Handle auto-play cycle
  useEffect(() => {
    let timeout: any;
    if (isAutoPlaying) {
      if (phase === 'separated') {
        timeout = setTimeout(() => handleAction('shaking'), 2500);
      } else if (phase === 'shaking') {
        timeout = setTimeout(() => handleAction('emulsion'), 3000);
      } else if (phase === 'emulsion') {
        timeout = setTimeout(() => handleAction('settling'), 2500);
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, isAutoPlaying]);

  return (
    <div className="water-oil-sim-card">
      {/* Simulation Header */}
      <div className="sim-header">
        <div className="sim-title-group">
          <span className="sim-badge">Simulasi Interaktif 5E • Engage</span>
          <h3 className="sim-main-title">Eksperimen Pengocokan Tabung Air & Minyak</h3>
        </div>

        <div className="sim-quick-controls">
          <button
            type="button"
            className={`sim-btn-pill ${phase === 'separated' ? 'active' : ''}`}
            onClick={() => handleAction('separated')}
          >
            1. Keadaan Awal
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${phase === 'shaking' ? 'active' : ''}`}
            onClick={() => handleAction('shaking')}
          >
            2. Kocok Kuat
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${phase === 'emulsion' ? 'active' : ''}`}
            onClick={() => handleAction('emulsion')}
          >
            3. Emulsi Sementara
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${phase === 'settling' ? 'active' : ''}`}
            onClick={() => handleAction('settling')}
          >
            4. Didiamkan {phase === 'settling' && `(${timerSeconds}s)`}
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport (SVG Stage) */}
      <div className="sim-viewport">
        {/* Left Side: Test Tube Macro View */}
        <div className="test-tube-wrapper">
          <svg viewBox="0 0 200 420" className="test-tube-svg" role="img" aria-label="Tabung Reaksi Air dan Minyak">
            <defs>
              {/* Gradients */}
              <linearGradient id="oilGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5D061" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#F3D77A" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E5B942" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#68B4D9" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#7CC6EB" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#559EC4" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="emulsionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B3D3B5" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#DFE8BD" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A4C7BD" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="glassGloss" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.08" />
                <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
              </linearGradient>

              {/* Clip path for liquid inside rounded tube */}
              <clipPath id="tubeInterior">
                <path d="M 40 40 L 40 330 A 60 60 0 0 0 160 330 L 160 40 Z" />
              </clipPath>
            </defs>

            {/* Test Tube Rim & Stand Shadow */}
            <ellipse cx="100" cy="405" rx="55" ry="10" fill="rgba(36, 91, 69, 0.12)" />

            {/* Background Liquid Clip Region */}
            <g clipPath="url(#tubeInterior)">
              {phase === 'separated' && (
                <>
                  {/* Oil Layer (Top) */}
                  <rect x="40" y="80" width="120" height="120" fill="url(#oilGradient)" />
                  {/* Meniscus / Boundary line */}
                  <path d="M 40 200 Q 100 208 160 200" fill="none" stroke="#245B45" strokeWidth="2.5" opacity="0.6" />
                  {/* Water Layer (Bottom) */}
                  <rect x="40" y="200" width="120" height="180" fill="url(#waterGradient)" />

                  {/* Oil molecules / droplet bubbles in oil */}
                  <circle cx="70" cy="120" r="10" fill="#E9A15B" opacity="0.6" />
                  <circle cx="120" cy="140" r="14" fill="#E9A15B" opacity="0.5" />
                  <circle cx="95" cy="105" r="8" fill="#E9A15B" opacity="0.7" />
                  <circle cx="135" cy="165" r="9" fill="#E9A15B" opacity="0.6" />

                  {/* Water particles in water */}
                  <circle cx="80" cy="240" r="9" fill="#245B45" opacity="0.3" />
                  <circle cx="125" cy="270" r="8" fill="#245B45" opacity="0.3" />
                  <circle cx="65" cy="310" r="10" fill="#245B45" opacity="0.3" />
                  <circle cx="110" cy="335" r="9" fill="#245B45" opacity="0.3" />
                </>
              )}

              {phase === 'shaking' && (
                <g className="shaking-liquid-anim">
                  {/* Turbulent mixture */}
                  <rect x="40" y="80" width="120" height="300" fill="url(#emulsionGradient)" />
                  {/* Rapid moving particles */}
                  <circle cx="70" cy="110" r="12" fill="#E9A15B" opacity="0.8" />
                  <circle cx="130" cy="140" r="15" fill="#4C855F" opacity="0.7" />
                  <circle cx="90" cy="180" r="18" fill="#E9A15B" opacity="0.7" />
                  <circle cx="120" cy="230" r="14" fill="#4C855F" opacity="0.8" />
                  <circle cx="65" cy="280" r="16" fill="#E9A15B" opacity="0.8" />
                  <circle cx="115" cy="320" r="13" fill="#4C855F" opacity="0.7" />
                  <circle cx="80" cy="340" r="11" fill="#E9A15B" opacity="0.7" />
                  {/* Motion swish lines */}
                  <path d="M 50 160 Q 100 130 150 160" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
                  <path d="M 50 240 Q 100 270 150 240" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
                </g>
              )}

              {phase === 'emulsion' && (
                <>
                  {/* Cloudy Emulsion */}
                  <rect x="40" y="80" width="120" height="300" fill="url(#emulsionGradient)" />
                  {/* Micro-droplets of oil suspended */}
                  <circle cx="60" cy="110" r="8" fill="#E9A15B" opacity="0.8" />
                  <circle cx="130" cy="120" r="7" fill="#E9A15B" opacity="0.8" />
                  <circle cx="95" cy="150" r="9" fill="#E9A15B" opacity="0.8" />
                  <circle cx="70" cy="190" r="11" fill="#E9A15B" opacity="0.8" />
                  <circle cx="135" cy="210" r="8" fill="#E9A15B" opacity="0.8" />
                  <circle cx="90" cy="250" r="10" fill="#E9A15B" opacity="0.8" />
                  <circle cx="120" cy="290" r="9" fill="#E9A15B" opacity="0.8" />
                  <circle cx="65" cy="330" r="8" fill="#E9A15B" opacity="0.8" />
                  <circle cx="105" cy="345" r="7" fill="#E9A15B" opacity="0.8" />
                </>
              )}

              {phase === 'settling' && (
                <>
                  {/* Settling: Oil droplets coalescing and moving upward */}
                  <rect x="40" y="80" width="120" height="300" fill="url(#emulsionGradient)" />
                  {/* Growing oil top layer */}
                  <rect x="40" y="80" width="120" height="60" fill="url(#oilGradient)" opacity="0.8" />
                  {/* Clarifying water bottom layer */}
                  <rect x="40" y="260" width="120" height="120" fill="url(#waterGradient)" opacity="0.8" />

                  {/* Upward floating oil droplets */}
                  <g className="rising-droplets">
                    <circle cx="75" cy="170" r="11" fill="#E9A15B" opacity="0.85" />
                    <circle cx="120" cy="190" r="13" fill="#E9A15B" opacity="0.85" />
                    <circle cx="90" cy="225" r="9" fill="#E9A15B" opacity="0.8" />
                  </g>
                </>
              )}
            </g>

            {/* Test Tube Glass Outline & Lip */}
            <path
              d="M 36 36 L 40 40 L 40 330 A 60 60 0 0 0 160 330 L 160 40 L 164 36"
              fill="none"
              stroke="#245B45"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Top Lip flange */}
            <rect x="33" y="30" width="134" height="8" rx="3" fill="#FFFFFF" stroke="#245B45" strokeWidth="3" />

            {/* Glass Glare Highlights */}
            <rect x="40" y="40" width="120" height="340" fill="url(#glassGloss)" clipPath="url(#tubeInterior)" pointerEvents="none" />
            <path d="M 50 60 L 50 320" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
            <path d="M 60 70 L 60 140" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

            {/* Scale Markings */}
            <line x1="145" y1="100" x2="155" y2="100" stroke="#245B45" strokeWidth="2" opacity="0.5" />
            <line x1="148" y1="130" x2="155" y2="130" stroke="#245B45" strokeWidth="1.5" opacity="0.5" />
            <line x1="148" y1="160" x2="155" y2="160" stroke="#245B45" strokeWidth="1.5" opacity="0.5" />
            <line x1="145" y1="190" x2="155" y2="190" stroke="#245B45" strokeWidth="2" opacity="0.5" />
            <line x1="148" y1="220" x2="155" y2="220" stroke="#245B45" strokeWidth="1.5" opacity="0.5" />
            <line x1="148" y1="250" x2="155" y2="250" stroke="#245B45" strokeWidth="1.5" opacity="0.5" />
            <line x1="145" y1="280" x2="155" y2="280" stroke="#245B45" strokeWidth="2" opacity="0.5" />
          </svg>

          {/* Layer Labels (Dynamic) */}
          <div className="tube-status-tags">
            {phase === 'separated' && (
              <>
                <div className="layer-tag oil-tag">
                  <span className="dot gold" />
                  <div>
                    <strong>Lapisan Minyak</strong>
                    <small>Nonpolar • ρ ≈ 0,92 g/cm³</small>
                  </div>
                </div>
                <div className="layer-tag water-tag">
                  <span className="dot teal" />
                  <div>
                    <strong>Lapisan Air</strong>
                    <small>Polar (Ikatan H) • ρ ≈ 1,00 g/cm³</small>
                  </div>
                </div>
              </>
            )}

            {phase === 'shaking' && (
              <div className="layer-tag alert-tag">
                <span className="dot orange" />
                <div>
                  <strong>Sedang Dikocok Kuat!</strong>
                  <small>Gaya mekanis memecah minyak jadi tetesan</small>
                </div>
              </div>
            )}

            {phase === 'emulsion' && (
              <div className="layer-tag alert-tag">
                <span className="dot yellow" />
                <div>
                  <strong>Emulsi Sementara</strong>
                  <small>Tetesan minyak terperangkap di sela air</small>
                </div>
              </div>
            )}

            {phase === 'settling' && (
              <div className="layer-tag alert-tag">
                <span className="dot teal" />
                <div>
                  <strong>Proses Koalesensi ({timerSeconds} detik)</strong>
                  <small>Air saling menarik; memeras minyak ke atas</small>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Microscopic & Submicroscopic Insight Panel */}
        <div className="sim-analysis-panel">
          <div className="analysis-card-inner">
            <div className="phase-indicator-header">
              <span className="phase-pill">
                Fase {phase === 'separated' ? '1/4: Terpisah' : phase === 'shaking' ? '2/4: Pengocokan' : phase === 'emulsion' ? '3/4: Emulsi' : '4/4: Relaksasi'}
              </span>
              <span className="phase-badge-title">
                {phase === 'separated' && 'Keadaan Setimbang Termodinamika'}
                {phase === 'shaking' && 'Pemberian Energi Kinetik Luar'}
                {phase === 'emulsion' && 'Emulsi Mekanis Tidak Stabil'}
                {phase === 'settling' && 'Efek Hidrofobik Berlangsung'}
              </span>
            </div>

            <div className="analysis-body">
              {phase === 'separated' && (
                <>
                  <p className="analysis-lead">
                    Dua lapisan cairan terpisah secara stabil. Mengapa minyak berada di atas dan tidak bercampur ke dalam air?
                  </p>
                  <div className="micro-insight-box">
                    <div className="insight-row">
                      <span className="chip-polar">Molekul H₂O (Air)</span>
                      <p>
                        Saling mengikat sangat kuat dengan tetangganya membentuk <strong>jaringan ikatan hidrogen 3D</strong> (~20–25 kJ/mol). Air bersifat sangat kohesif (menyukai sesama air).
                      </p>
                    </div>
                    <div className="insight-row">
                      <span className="chip-nonpolar">Molekul Minyak (Trigliserida)</span>
                      <p>
                        Rantai hidrokarbon panjang nonpolar (tanpa momen dipol). Hanya memiliki <strong>gaya dispersi London yang lemah</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="key-takeaway-note">
                    💡 <em>Massa jenis yang lebih ringan (0,92 g/cm³) hanya membuat minyak terapung di atas, BUKAN alasan mengapa ia tidak larut!</em>
                  </div>
                </>
              )}

              {phase === 'shaking' && (
                <>
                  <p className="analysis-lead">
                    Saat dikocok, gaya mekanis tangan Anda menyuplai energi kinetik yang memecah lapisan minyak menjadi jutaan butiran mikro (mikrodroplet).
                  </p>
                  <div className="micro-insight-box">
                    <p>
                      Molekul air terpaksa meregang dan memutus sebagian ikatan hidrogennya untuk memberi jalan bagi butiran minyak.
                    </p>
                    <p>
                      Namun, <strong>keadaan ini berenergi tinggi dan tidak stabil</strong> secara termodinamika karena minyak tidak mampu membentuk ikatan hidrogen dengan air.
                    </p>
                  </div>
                </>
              )}

              {phase === 'emulsion' && (
                <>
                  <p className="analysis-lead">
                    Tampilan cairan menjadi keruh keputihan. Ini disebut <strong>emulsi sementara</strong> (suspensi minyak dalam air).
                  </p>
                  <div className="micro-insight-box">
                    <p>
                      Di tingkat molekuler, molekul air yang mengelilingi butiran minyak berada dalam kondisi tegang (kehilangan kestabilan ikatan hidrogen sesama air).
                    </p>
                    <p>
                      Sistem kimiawi selalu secara alami berusaha menuju ke tingkat energi potensial yang paling rendah (paling stabil).
                    </p>
                  </div>
                </>
              )}

              {phase === 'settling' && (
                <>
                  <p className="analysis-lead">
                    Saat didiamkan, <strong>Efek Hidrofobik</strong> bekerja secara spontan!
                  </p>
                  <div className="micro-insight-box">
                    <p>
                      Molekul-molekul air kembali saling tarik-menarik membentuk ikatan hidrogen yang rapat. Tarikan kuat antarmolekul air ini secara efektif <em>"memeras"</em> dan menolak butiran minyak nonpolar keluar dari jaringan air.
                    </p>
                    <p>
                      Butiran-butiran minyak kemudian saling menyatu kembali (koalesensi) dan karena densitasnya lebih kecil, lapisan minyak terdorong naik ke atas.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Interactive Step Buttons */}
            <div className="sim-action-footer">
              <button
                type="button"
                className="btn-sim-action primary"
                onClick={() => {
                  if (phase === 'separated') handleAction('shaking');
                  else if (phase === 'shaking') handleAction('emulsion');
                  else if (phase === 'emulsion') handleAction('settling');
                  else handleAction('separated');
                }}
              >
                {phase === 'separated' && '⚡ Kocok Campuran Sekarang'}
                {phase === 'shaking' && '🧪 Lihat Hasil Emulsi'}
                {phase === 'emulsion' && '⏳ Diamkan & Amati Pemisahan'}
                {phase === 'settling' && '🔄 Ulangi Eksperimen Awal'}
              </button>

              <button
                type="button"
                className="btn-sim-action secondary"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              >
                {isAutoPlaying ? '⏸️ Jeda Otomatis' : '▶️ Siklus Otomatis'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
