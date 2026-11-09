import React, { useState, useEffect } from 'react';
import { ALL_MODULES_DATA, type DetailedModuleData } from '../data/modulesData';
import { LEARNING_MODULES } from '../data/curriculumData';

// Import all 6 interactive simulations
import { WaterOilSimulation } from '../components/simulation/WaterOilSimulation';
import { EvaporationSimulation } from '../components/simulation/EvaporationSimulation';
import { LondonSimulation } from '../components/simulation/LondonSimulation';
import { DipoleSimulation } from '../components/simulation/DipoleSimulation';
import { HydrogenBondSimulation } from '../components/simulation/HydrogenBondSimulation';
import { BoilingPointSimulation } from '../components/simulation/BoilingPointSimulation';

// Import Module 1 Quiz (Honest marker for Meeting 3)
import { ModuleQuizCard } from '../components/quiz/ModuleQuizCard';

interface UniversalModulePageProps {
  moduleId: string;
  onNavigateHome: () => void;
  onNavigateModule: (targetModuleId: string) => void;
  completedPages: string[];
  onToggleComplete: (moduleId: string) => void;
}

export const UniversalModulePage: React.FC<UniversalModulePageProps> = ({
  moduleId,
  onNavigateHome,
  onNavigateModule,
  completedPages,
  onToggleComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'simulation' | 'applications' | 'references' | 'quiz'>('content');

  // Scroll to top whenever moduleId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [moduleId]);

  const moduleData: DetailedModuleData = ALL_MODULES_DATA[moduleId] || ALL_MODULES_DATA['fenomena-air-minyak'];
  const isCompleted = completedPages.includes(moduleId);

  // Find previous and next module in 5E sequence (Modules 1 to 6)
  const activeModules = LEARNING_MODULES.filter((m) => m.id !== 'evaluasi-akhir');
  const currentIndex = activeModules.findIndex((m) => m.id === moduleId);
  const prevModule = currentIndex > 0 ? activeModules[currentIndex - 1] : null;
  const nextModule = currentIndex < activeModules.length - 1 ? activeModules[currentIndex + 1] : null;

  // Render appropriate simulation component dynamically
  const renderSimulation = () => {
    switch (moduleData.simulationType) {
      case 'water-oil':
        return <WaterOilSimulation />;
      case 'evaporation':
        return <EvaporationSimulation />;
      case 'london':
        return <LondonSimulation />;
      case 'dipole':
        return <DipoleSimulation />;
      case 'hydrogen-bond':
        return <HydrogenBondSimulation />;
      case 'boiling-point':
        return <BoilingPointSimulation />;
      default:
        return <WaterOilSimulation />;
    }
  };

  return (
    <div className="module-page-container">
      {/* Top Sticky Navigation Bar */}
      <header className="module-topbar">
        <div className="content-wrapper module-topbar-inner">
          <button
            type="button"
            className="btn-back-home"
            onClick={onNavigateHome}
            aria-label="Kembali ke Beranda"
          >
            <span className="arrow-icon">←</span>
            <span>Kembali ke Beranda</span>
          </button>

          <div className="module-breadcrumbs">
            <span className="crumb" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>Beranda</span>
            <span className="separator">/</span>
            <span className="crumb">{moduleData.stageTitle}</span>
            <span className="separator">/</span>
            <span className="crumb current">{moduleData.title}</span>
          </div>

          <div className="module-topbar-actions">
            {/* Quick Module Switcher Dropdown */}
            <select
              className="module-switcher-select"
              value={moduleId}
              onChange={(e) => onNavigateModule(e.target.value)}
              aria-label="Pilih Modul Pembelajaran"
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--color-soft-border)',
                background: '#ffffff',
                color: 'var(--color-deep-forest)',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
              }}
            >
              {activeModules.map((m, idx) => (
                <option key={m.id} value={m.id}>
                  Modul {idx + 1}: {m.title}
                </option>
              ))}
            </select>

            <button
              type="button"
              className={`btn-mark-complete ${isCompleted ? 'completed' : ''}`}
              onClick={() => onToggleComplete(moduleId)}
            >
              {isCompleted ? '✓ Telah Selesai' : 'Tandai Selesai'}
            </button>
          </div>
        </div>
      </header>

      {/* Module Hero Banner */}
      <section className="module-hero-banner">
        <div className="content-wrapper">
          <div className="module-hero-badge-row">
            <span className="curriculum-badge">{moduleData.curriculumBadge}</span>
            <span className="stage-badge">{moduleData.stageTitle}</span>
            <span className="time-badge">⏱️ {moduleData.estimatedDurationMin} Menit Belajar</span>
          </div>

          <h1 className="module-main-title">{moduleData.title}</h1>
          <p className="module-main-subtitle">{moduleData.subtitle}</p>

          {/* Tab Navigation Switcher */}
          <div className="module-tab-nav" role="tablist">
            <button
              type="button"
              className={`module-tab-btn ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              📖 Materi Tiga Tingkat Kimia
            </button>
            <button
              type="button"
              className={`module-tab-btn ${activeTab === 'simulation' ? 'active' : ''}`}
              onClick={() => setActiveTab('simulation')}
            >
              🧪 {moduleData.simulationName}
            </button>
            <button
              type="button"
              className={`module-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              🌟 Penerapan Kehidupan ({moduleData.everydayApplications.length})
            </button>
            <button
              type="button"
              className={`module-tab-btn ${activeTab === 'references' ? 'active' : ''}`}
              onClick={() => setActiveTab('references')}
            >
              📚 Rujukan Pustaka & Audit
            </button>
            {moduleId === 'fenomena-air-minyak' && (
              <button
                type="button"
                className={`module-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                onClick={() => setActiveTab('quiz')}
              >
                📝 Latihan Kuis (Penanda Jujur)
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="content-wrapper module-body-wrapper">
        {/* TAB 1: MATERI TIGA TINGKAT KIMIA */}
        {activeTab === 'content' && (
          <div className="module-content-grid">
            {/* Sidebar Table of Contents */}
            <aside className="module-sidebar">
              <div className="sidebar-sticky-box">
                <h4 className="sidebar-heading">Daftar Isi Materi</h4>
                <ul className="sidebar-toc">
                  <li><a href="#tujuan">🎯 Capaian Belajar</a></li>
                  <li><a href="#makroskopik">👁️ 1. Tingkat Makroskopik</a></li>
                  <li><a href="#miskonsepsi">⚠️ Miskonsepsi Penting</a></li>
                  <li><a href="#submikroskopik">🔬 2. Tingkat Submikroskopik</a></li>
                  <li><a href="#mekanisme">⚙️ Mekanisme Pembentukan</a></li>
                  <li><a href="#simbolik">📐 3. Tingkat Simbolik & Energi</a></li>
                  <li><a href="#verifikasi">🔍 Audit Data Ilmiah</a></li>
                </ul>

                <div className="sidebar-quiz-cta">
                  <p>Coba simulasi interaktif untuk konsep ini:</p>
                  <button
                    type="button"
                    className="btn-open-quiz-side"
                    onClick={() => setActiveTab('simulation')}
                  >
                    Buka Simulasi Molekul 🧪
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Article Content */}
            <article className="module-article">
              {/* Learning Objectives */}
              <section id="tujuan" className="article-card mb-6">
                <h2 className="article-section-title">🎯 Capaian & Tujuan Pembelajaran</h2>
                <ul className="learning-objectives-list">
                  {moduleData.learningObjectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>

                <div className="trigger-box mt-4">
                  <div className="trigger-icon">💡</div>
                  <div>
                    <h3 className="trigger-title">Pertanyaan Pemantik Berpikir Kritis:</h3>
                    <ul className="trigger-list">
                      {moduleData.triggerQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION 1: MAKROSKOPIK */}
              <section id="makroskopik" className="article-card mb-6">
                <div className="section-badge-pill">Tingkat 1 dari 3: Pengamatan Makroskopik</div>
                <h2 className="article-section-title">{moduleData.macroscopic.title}</h2>
                {moduleData.macroscopic.narrative.map((p, i) => (
                  <p key={i} className="article-para">{p}</p>
                ))}

                <div className="trigger-box mt-3 mb-4" style={{ background: '#F8FBF7', borderColor: 'var(--color-sage-green)' }}>
                  <div className="trigger-icon">🔎</div>
                  <div>
                    <h4 style={{ color: 'var(--color-deep-forest)', fontWeight: 700, marginBottom: '0.25rem' }}>Contoh Fenomena Riil:</h4>
                    <p style={{ margin: 0, fontSize: '0.94rem', color: '#27352D' }}>{moduleData.macroscopic.phenomenonExample}</p>
                  </div>
                </div>

                {/* Experiment Points Grid */}
                <div className="experiment-steps-grid mt-4">
                  {moduleData.macroscopic.experimentPoints.map((pt) => (
                    <div key={pt.step} className="exp-step-card">
                      <div className="step-num-badge">Tahap {pt.step}</div>
                      <h3 className="step-label">{pt.label}</h3>
                      <p className="step-desc"><strong>Aksi:</strong> {pt.description}</p>
                      <p className="step-obs"><strong>Pengamatan:</strong> {pt.observation}</p>
                    </div>
                  ))}
                </div>

                <div className="sim-inline-callout mt-4">
                  <div className="callout-text">
                    <strong>Ingin mengamati visualisasi interaktif konsep ini?</strong>
                    <p>Buka tab simulasi untuk menggerakkan partikel, merotasi orientasi molekul, dan melihat animasi pembentukan gayanya.</p>
                  </div>
                  <button
                    type="button"
                    className="btn-sim-callout"
                    onClick={() => setActiveTab('simulation')}
                  >
                    Buka {moduleData.simulationName} 🧪
                  </button>
                </div>
              </section>

              {/* MISCONCEPTION ALERT */}
              <section id="miskonsepsi" className="misconception-card mb-6">
                <div className="misconception-header">
                  <span className="alert-emoji">⚠️</span>
                  <div>
                    <span className="misconception-tag">Pencegah Miskonsepsi Penting</span>
                    <h3 className="misconception-title">Perhatian Ilmiah: Bebas dari Miskonsepsi</h3>
                  </div>
                </div>

                <div className="misconception-body">
                  <div className="wrong-fact-box">
                    <strong>❌ Pernyataan Keliru yang Sering Dipahami Siswa:</strong>
                    <p>{moduleData.macroscopic.misconceptionAlert.misconception}</p>
                  </div>

                  <div className="correct-fact-box mt-3">
                    <strong>✅ Fakta Ilmiah Sebenarnya (Raymond Chang):</strong>
                    <p>{moduleData.macroscopic.misconceptionAlert.scientificFact}</p>
                  </div>

                  <div className="analogy-box mt-3">
                    <strong>💡 Analogi Bukti Nyata:</strong>
                    <p>{moduleData.macroscopic.misconceptionAlert.analogy}</p>
                  </div>
                </div>
              </section>

              {/* SECTION 2: SUBMIKROSKOPIK */}
              <section id="submikroskopik" className="article-card mb-6">
                <div className="section-badge-pill">Tingkat 2 dari 3: Analisis Molekuler Submikroskopik</div>
                <h2 className="article-section-title">{moduleData.submicroscopic.title}</h2>
                {moduleData.submicroscopic.narrative.map((p, i) => (
                  <p key={i} className="article-para">{p}</p>
                ))}

                {/* Molecule Details Cards */}
                <div className="molecule-analysis-grid mt-4">
                  {moduleData.submicroscopic.moleculeDetails.map((mol, idx) => (
                    <div key={idx} className={`mol-analysis-card ${idx % 2 === 0 ? 'water' : 'oil'}`}>
                      <div className="mol-card-header">
                        <span className={`mol-badge ${idx % 2 === 0 ? 'blue' : 'gold'}`}>Molekul Representatif</span>
                        <h3 className="mol-title">{mol.name} ({mol.formula})</h3>
                      </div>
                      <ul className="mol-spec-list">
                        <li><strong>Geometri Bentuk:</strong> {mol.shape}</li>
                        <li><strong>Sifat Kepolaran:</strong> {mol.polarity}</li>
                        <li><strong>Muatan Parsial:</strong> {mol.charges}</li>
                        <li><strong>Gaya Utama:</strong> {mol.dominantForces}</li>
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Mechanism Steps */}
                <div id="mekanisme" className="mechanism-block mt-6">
                  <h3 className="mechanism-title">⚙️ Tahapan Terbentuknya Interaksi Antarmolekul</h3>
                  <div className="mechanism-steps-list">
                    {moduleData.submicroscopic.mechanismSteps.map((m) => (
                      <div key={m.step} className="mech-item">
                        <span className="mech-step-num">{m.step}</span>
                        <div>
                          <strong>{m.title}:</strong> {m.explanation}
                        </div>
                      </div>
                    ))}
                    <div className="mech-item highlight">
                      <span className="mech-step-num">★</span>
                      <p><strong>Poin Kunci Konsep:</strong> {moduleData.submicroscopic.coreTakeaway}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: SIMBOLIK & KUANTITATIF */}
              <section id="simbolik" className="article-card mb-6">
                <div className="section-badge-pill">Tingkat 3 dari 3: Notasi Simbolik & Energi Kuantitatif</div>
                <h2 className="article-section-title">{moduleData.symbolic.title}</h2>

                {/* Chemical Equations */}
                <div className="chem-equation-box">
                  {moduleData.symbolic.equations.map((eq, i) => (
                    <div key={i} className="eq-line">
                      <span className="eq-dot">🔹</span>
                      <code>{eq}</code>
                    </div>
                  ))}
                </div>

                {/* Energy Data Cards */}
                <div className="energy-ratio-card mt-4">
                  <h3 className="energy-card-title">Kuantitas Energi Kimia (Buku Raymond Chang Bab 11)</h3>
                  <div className="energy-stat-grid">
                    {moduleData.symbolic.energyData.map((en, idx) => (
                      <div key={idx} className={`stat-card ${en.category}`}>
                        <span className="stat-label">{en.label}</span>
                        <span className="stat-number">{en.value}</span>
                        <small className="stat-note">{en.description}</small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Table if present */}
                {moduleData.symbolic.comparisonTable && moduleData.symbolic.comparisonTable.length > 0 && (
                  <div className="table-responsive-wrapper mt-5">
                    <h3 className="table-heading">Tabel Perbandingan Sifat Fisikokimia</h3>
                    <table className="chem-data-table">
                      <thead>
                        <tr>
                          <th>Parameter</th>
                          <th>Karakteristik A</th>
                          <th>Karakteristik B</th>
                          <th>Satuan / Status</th>
                          <th>Catatan Rujukan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {moduleData.symbolic.comparisonTable.map((row, idx) => (
                          <tr key={idx}>
                            <td><strong>{row.property}</strong></td>
                            <td className="text-water"><code>{row.waterOrItemA}</code></td>
                            <td className="text-oil"><code>{row.oilOrItemB}</code></td>
                            <td><span className="badge-unit">{row.scientificUnit}</span></td>
                            <td><small className="text-muted">{row.literatureNote}</small></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {/* VERIFICATION AUDIT BOX */}
              <section id="verifikasi" className="verification-card mb-6">
                <div className="verification-header">
                  <span className="verify-icon">🔍</span>
                  <div>
                    <h3 className="verify-title">Catatan & Penanda Pemeriksaan Ilmiah</h3>
                    <p className="verify-desc">
                      Sesuai pedoman AGENTS & PRD, setiap angka, satuan, dan parameter kimia telah diverifikasi terhadap literatur standar.
                    </p>
                  </div>
                </div>

                <div className="verify-list mt-3">
                  {moduleData.verificationAlerts.map((al) => (
                    <div key={al.id} className="verify-item">
                      <div className="verify-param-title">
                        <strong>{al.parameter}</strong>: <code>{al.currentValue}</code>
                      </div>
                      <p className="verify-reason">{al.reason}</p>
                      <div className="verify-action-tag">{al.suggestedAction}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom Navigation Buttons */}
              <div className="module-bottom-nav">
                {prevModule ? (
                  <button
                    type="button"
                    className="btn-bottom-back"
                    onClick={() => onNavigateModule(prevModule.id)}
                  >
                    ← Modul {currentIndex}: {prevModule.title}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-bottom-back"
                    onClick={onNavigateHome}
                  >
                    ← Kembali ke Beranda
                  </button>
                )}

                {nextModule ? (
                  <button
                    type="button"
                    className="btn-bottom-quiz"
                    onClick={() => onNavigateModule(nextModule.id)}
                  >
                    Lanjut ke Modul {currentIndex + 2}: {nextModule.title} →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-bottom-quiz"
                    onClick={onNavigateHome}
                  >
                    🎉 Selesai Seluruh Modul (Kembali ke Beranda)
                  </button>
                )}
              </div>
            </article>
          </div>
        )}

        {/* TAB 2: SIMULASI INTERAKTIF */}
        {activeTab === 'simulation' && (
          <div className="simulation-tab-container">
            {renderSimulation()}

            <div className="sim-guidance-card mt-6">
              <h3 className="guidance-title">📖 Panduan Pedagogis Simulasi Interaktif</h3>
              <p>
                Gunakan tombol-tombol interaktif di atas untuk mengubah kondisi suhu, memutar orientasi molekul, atau memicu fluktuasi awan elektron. Amati bagaimana gaya elektrostatik berubah secara nyata dan catat perbedaannya dengan ikatan kovalen di dalam molekul.
              </p>
              <div className="guidance-btn-row mt-4">
                <button
                  type="button"
                  className="btn-sim-action primary"
                  onClick={() => setActiveTab('content')}
                >
                  ← Kembali ke Naskah Teori
                </button>
                <button
                  type="button"
                  className="btn-sim-action secondary"
                  onClick={() => setActiveTab('applications')}
                >
                  Lihat Penerapan dalam Kehidupan Nyata →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PENERAPAN DALAM KEHIDUPAN NYATA */}
        {activeTab === 'applications' && (
          <div className="article-card">
            <h2 className="article-section-title">🌟 Penerapan Konsep dalam Kehidupan Sehari-hari</h2>
            <p className="article-para">
              Gaya antarmolekul bukan sekadar teori kimia di atas kertas, melainkan fondasi bekerjanya berbagai teknologi, struktur biologis, dan fenomena alam di sekitar kita:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {moduleData.everydayApplications.map((app, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FAFDF9',
                    border: '1.5px solid var(--color-sage-green)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ fontSize: '2.2rem' }}>{app.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--color-deep-forest)', fontWeight: 700 }}>
                    {app.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#38483E', margin: 0 }}>
                    {app.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="btn-bottom-back"
                onClick={() => setActiveTab('content')}
              >
                ← Kembali ke Naskah Materi
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SUMBER PUSTAKA */}
        {activeTab === 'references' && (
          <div className="article-card">
            <h2 className="article-section-title">📚 Daftar Rujukan Pustaka Akademik</h2>
            <p className="article-para">
              Seluruh materi, rumus, notasi, dan data kuantitatif energi pada modul ini merujuk langsung pada literatur kimia standar internasional dan kurikulum nasional:
            </p>

            <div className="references-list mt-4">
              {moduleData.references.map((ref, idx) => (
                <div key={idx} className="reference-item-card">
                  <span className="ref-index">[{idx + 1}]</span>
                  <div className="ref-body">
                    <h3 className="ref-book-title">{ref.title}</h3>
                    <p className="ref-authors"><strong>Penulis:</strong> {ref.authors} ({ref.year})</p>
                    <p className="ref-publisher"><strong>Penerbit:</strong> {ref.publisher}</p>
                    <p className="ref-section"><strong>Bagian Relevan:</strong> {ref.relevantSection}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="btn-bottom-back"
                onClick={() => setActiveTab('content')}
              >
                ← Kembali ke Naskah Materi
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: LATIHAN KUIS (Untuk Modul 1 Penanda Jujur) */}
        {activeTab === 'quiz' && moduleId === 'fenomena-air-minyak' && (
          <div className="quiz-tab-container">
            <ModuleQuizCard
              moduleId={moduleId}
              onCompleteQuiz={() => {}}
            />
            <div className="quiz-bottom-actions mt-6">
              <button
                type="button"
                className="btn-bottom-back"
                onClick={() => setActiveTab('content')}
              >
                ← Kembali ke Materi Teori
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
