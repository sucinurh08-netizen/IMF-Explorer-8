import React, { useState } from 'react';
import { MODULE_1_DATA } from '../data/module1Data';
import { WaterOilSimulation } from '../components/simulation/WaterOilSimulation';
import { ModuleQuizCard } from '../components/quiz/ModuleQuizCard';

interface Module1PageProps {
  onBackToHome: () => void;
  isCompleted?: boolean;
  onToggleComplete?: (moduleId: string) => void;
}

export const Module1Page: React.FC<Module1PageProps> = ({
  onBackToHome,
  isCompleted = false,
  onToggleComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'simulation' | 'quiz' | 'references'>('content');
  const [completedState, setCompletedState] = useState<boolean>(isCompleted);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleToggle = () => {
    const next = !completedState;
    setCompletedState(next);
    if (onToggleComplete) {
      onToggleComplete(MODULE_1_DATA.id);
    }
  };

  const handleQuizFinished = (score: number) => {
    setQuizScore(score);
    if (!completedState) {
      setCompletedState(true);
      if (onToggleComplete) {
        onToggleComplete(MODULE_1_DATA.id);
      }
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
            onClick={onBackToHome}
            aria-label="Kembali ke Beranda"
          >
            <span className="arrow-icon">←</span>
            <span>Kembali ke Beranda</span>
          </button>

          <div className="module-breadcrumbs">
            <span className="crumb" onClick={onBackToHome} style={{ cursor: 'pointer' }}>Beranda</span>
            <span className="separator">/</span>
            <span className="crumb">Tahap 1: Engage</span>
            <span className="separator">/</span>
            <span className="crumb current">{MODULE_1_DATA.title}</span>
          </div>

          <div className="module-topbar-actions">
            <button
              type="button"
              className={`btn-mark-complete ${completedState ? 'completed' : ''}`}
              onClick={handleToggle}
            >
              {completedState ? '✓ Modul Selesai' : 'Tandai Selesai'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Module Content Hero */}
      <section className="module-hero-banner">
        <div className="content-wrapper">
          <div className="module-hero-badge-row">
            <span className="curriculum-badge">{MODULE_1_DATA.curriculumBadge}</span>
            <span className="stage-badge">Tahap 1: Engage (Pembangkit Minat)</span>
            <span className="time-badge">⏱️ {MODULE_1_DATA.estimatedDurationMin} Menit Belajar</span>
          </div>

          <h1 className="module-main-title">{MODULE_1_DATA.title}</h1>
          <p className="module-main-subtitle">{MODULE_1_DATA.subtitle}</p>

          {/* Quick Tab Switcher */}
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
              🧪 Simulasi Tabung Reaksi
            </button>
            <button
              type="button"
              className={`module-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              📝 Kuis Formatif (5 Soal) {quizScore !== null && `[${quizScore}%]`}
            </button>
            <button
              type="button"
              className={`module-tab-btn ${activeTab === 'references' ? 'active' : ''}`}
              onClick={() => setActiveTab('references')}
            >
              📚 Sumber & Catatan Ahli
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="content-wrapper module-body-wrapper">
        {/* TAB 1: MATERI TIGA TINGKAT KIMIA */}
        {activeTab === 'content' && (
          <div className="module-content-grid">
            {/* Sidebar / Anchor Outline */}
            <aside className="module-sidebar">
              <div className="sidebar-sticky-box">
                <h4 className="sidebar-heading">Daftar Isi Pembelajaran</h4>
                <ul className="sidebar-toc">
                  <li><a href="#tujuan">🎯 Tujuan & Pertanyaan Pemantik</a></li>
                  <li><a href="#makroskopik">👁️ 1. Tingkat Makroskopik</a></li>
                  <li><a href="#miskonsepsi">⚠️ Miskonsepsi: Massa Jenis</a></li>
                  <li><a href="#submikroskopik">🔬 2. Tingkat Submikroskopik</a></li>
                  <li><a href="#hidrofobik">🌊 Efek Hidrofobik & Termodinamika</a></li>
                  <li><a href="#simbolik">📐 3. Tingkat Simbolik & Energi</a></li>
                  <li><a href="#pemeriksaan">🔍 Verifikasi & Angka Kimia</a></li>
                </ul>

                <div className="sidebar-quiz-cta">
                  <p>Sudah memahami naskah materi?</p>
                  <button
                    type="button"
                    className="btn-open-quiz-side"
                    onClick={() => setActiveTab('quiz')}
                  >
                    Mulai Kuis Formatif →
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Reading Column */}
            <article className="module-article">
              {/* Learning Objectives */}
              <section id="tujuan" className="article-card mb-6">
                <h2 className="article-section-title">🎯 Capaian & Tujuan Pembelajaran</h2>
                <ul className="learning-objectives-list">
                  {MODULE_1_DATA.learningObjectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>

                <div className="trigger-box mt-4">
                  <div className="trigger-icon">💡</div>
                  <div>
                    <h3 className="trigger-title">Pertanyaan Pemantik Berpikir Kritis:</h3>
                    <ul className="trigger-list">
                      {MODULE_1_DATA.triggerQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION 1: MAKROSKOPIK */}
              <section id="makroskopik" className="article-card mb-6">
                <div className="section-badge-pill">Tingkat 1 dari 3: Pengamatan Fenomena</div>
                <h2 className="article-section-title">{MODULE_1_DATA.macroscopicSection.title}</h2>
                {MODULE_1_DATA.macroscopicSection.narrative.map((p, i) => (
                  <p key={i} className="article-para">{p}</p>
                ))}

                {/* 4 Steps Experiment Grid */}
                <div className="experiment-steps-grid mt-4">
                  {MODULE_1_DATA.macroscopicSection.experimentSteps.map((step) => (
                    <div key={step.step} className="exp-step-card">
                      <div className="step-num-badge">Tahap {step.step}</div>
                      <h3 className="step-label">{step.label}</h3>
                      <p className="step-desc"><strong>Aksi:</strong> {step.description}</p>
                      <p className="step-obs"><strong>Pengamatan:</strong> {step.observation}</p>
                    </div>
                  ))}
                </div>

                {/* Inline Mini Interactive Preview CTA */}
                <div className="sim-inline-callout mt-4">
                  <div className="callout-text">
                    <strong>Ingin melihat animasi pengocokan tabung reaksi?</strong>
                    <p>Buka simulasi interaktif untuk mengamati transisi emulsi dan relaksasi pemisahan secara langsung.</p>
                  </div>
                  <button
                    type="button"
                    className="btn-sim-callout"
                    onClick={() => setActiveTab('simulation')}
                  >
                    Buka Simulasi Tabung 🧪
                  </button>
                </div>
              </section>

              {/* MISCONCEPTION WARNING CALLOUT */}
              <section id="miskonsepsi" className="misconception-card mb-6">
                <div className="misconception-header">
                  <span className="alert-emoji">⚠️</span>
                  <div>
                    <span className="misconception-tag">Pencegah Miskonsepsi Penting</span>
                    <h3 className="misconception-title">Benarkah Air dan Minyak Terpisah Hanya Karena Massa Jenis?</h3>
                  </div>
                </div>

                <div className="misconception-body">
                  <div className="wrong-fact-box">
                    <strong>❌ Pernyataan Keliru yang Sering Dipahami:</strong>
                    <p>{MODULE_1_DATA.macroscopicSection.misconceptionAlert.misconception}</p>
                  </div>

                  <div className="correct-fact-box mt-3">
                    <strong>✅ Fakta Ilmiah Sebenarnya (Raymond Chang):</strong>
                    <p>{MODULE_1_DATA.macroscopicSection.misconceptionAlert.scientificFact}</p>
                  </div>

                  <div className="analogy-box mt-3">
                    <strong>💡 Analogi Bukti Nyata:</strong>
                    <p>{MODULE_1_DATA.macroscopicSection.misconceptionAlert.analogy}</p>
                  </div>
                </div>
              </section>

              {/* SECTION 2: SUBMIKROSKOPIK */}
              <section id="submikroskopik" className="article-card mb-6">
                <div className="section-badge-pill">Tingkat 2 dari 3: Analisis Molekuler</div>
                <h2 className="article-section-title">{MODULE_1_DATA.submicroscopicSection.title}</h2>
                {MODULE_1_DATA.submicroscopicSection.narrative.map((p, i) => (
                  <p key={i} className="article-para">{p}</p>
                ))}

                {/* Molecule Analysis Comparison Cards */}
                <div className="molecule-analysis-grid mt-4">
                  {/* Water Molecule Card */}
                  <div className="mol-analysis-card water">
                    <div className="mol-card-header">
                      <span className="mol-badge blue">Molekul Polar</span>
                      <h3 className="mol-title">Air ({MODULE_1_DATA.submicroscopicSection.waterMoleculeAnalysis.formula})</h3>
                    </div>
                    <ul className="mol-spec-list">
                      <li>
                        <strong>Geometri Molekul:</strong> {MODULE_1_DATA.submicroscopicSection.waterMoleculeAnalysis.geometry}
                      </li>
                      <li>
                        <strong>Sudut Ikatan H–O–H:</strong> {MODULE_1_DATA.submicroscopicSection.waterMoleculeAnalysis.bondAngle}
                      </li>
                      <li>
                        <strong>Beda Elektronegativitas:</strong> {MODULE_1_DATA.submicroscopicSection.waterMoleculeAnalysis.electronegativityDiff}
                      </li>
                      <li>
                        <strong>Momen Dipol Permanen:</strong> {MODULE_1_DATA.submicroscopicSection.waterMoleculeAnalysis.dipoleMoment}
                      </li>
                      <li>
                        <strong>Distribusi Muatan Parsial:</strong> {MODULE_1_DATA.submicroscopicSection.waterMoleculeAnalysis.partialCharges}
                      </li>
                      <li>
                        <strong>Gaya Antarmolekul Utama:</strong> {MODULE_1_DATA.submicroscopicSection.waterMoleculeAnalysis.dominantForces}
                      </li>
                    </ul>
                  </div>

                  {/* Oil Molecule Card */}
                  <div className="mol-analysis-card oil">
                    <div className="mol-card-header">
                      <span className="mol-badge gold">Molekul Nonpolar</span>
                      <h3 className="mol-title">Minyak (Trigliserida)</h3>
                    </div>
                    <ul className="mol-spec-list">
                      <li>
                        <strong>Struktur Representatif:</strong> {MODULE_1_DATA.submicroscopicSection.oilMoleculeAnalysis.formulaRepresentative}
                      </li>
                      <li>
                        <strong>Sifat Molekul:</strong> {MODULE_1_DATA.submicroscopicSection.oilMoleculeAnalysis.molecularNature}
                      </li>
                      <li>
                        <strong>Beda Elektronegativitas C–H:</strong> {MODULE_1_DATA.submicroscopicSection.oilMoleculeAnalysis.electronegativityDiff}
                      </li>
                      <li>
                        <strong>Momen Dipol Rantai:</strong> {MODULE_1_DATA.submicroscopicSection.oilMoleculeAnalysis.dipoleMoment}
                      </li>
                      <li>
                        <strong>Gaya Antarmolekul Utama:</strong> {MODULE_1_DATA.submicroscopicSection.oilMoleculeAnalysis.dominantForces}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Hydrophobic Effect Mechanism */}
                <div id="hidrofobik" className="mechanism-block mt-6">
                  <h3 className="mechanism-title">🌊 Mengapa Keduanya Menolak untuk Menyatu? (Efek Hidrofobik)</h3>
                  <div className="mechanism-steps-list">
                    <div className="mech-item">
                      <span className="mech-step-num">1</span>
                      <p>{MODULE_1_DATA.submicroscopicSection.interactionMechanism.step1}</p>
                    </div>
                    <div className="mech-item">
                      <span className="mech-step-num">2</span>
                      <p>{MODULE_1_DATA.submicroscopicSection.interactionMechanism.step2}</p>
                    </div>
                    <div className="mech-item">
                      <span className="mech-step-num">3</span>
                      <p>{MODULE_1_DATA.submicroscopicSection.interactionMechanism.step3}</p>
                    </div>
                    <div className="mech-item highlight">
                      <span className="mech-step-num">★</span>
                      <p><strong>{MODULE_1_DATA.submicroscopicSection.interactionMechanism.hydrophobicEffect}</strong></p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: SIMBOLIK & TABEL ENERGI */}
              <section id="simbolik" className="article-card mb-6">
                <div className="section-badge-pill">Tingkat 3 dari 3: Notasi & Kuantitas Sains</div>
                <h2 className="article-section-title">{MODULE_1_DATA.symbolicSection.title}</h2>

                {/* Chemical Equations Formula Bar */}
                <div className="chem-equation-box">
                  {MODULE_1_DATA.symbolicSection.chemicalEquations.map((eq, i) => (
                    <div key={i} className="eq-line">
                      <span className="eq-dot">🔹</span>
                      <code>{eq}</code>
                    </div>
                  ))}
                </div>

                {/* Energy Comparison Cards */}
                <div className="energy-ratio-card mt-4">
                  <h3 className="energy-card-title">Perbandingan Energi Ikatan Kimia (Raymond Chang 12th Ed.)</h3>
                  <div className="energy-stat-grid">
                    <div className="stat-card covalent">
                      <span className="stat-label">Ikatan Kovalen Intramolekul (O–H)</span>
                      <span className="stat-number">{MODULE_1_DATA.symbolicSection.energyComparison.covalentBondOH}</span>
                      <small className="stat-note">Membutuhkan suhu ribuan derajat untuk memutus</small>
                    </div>
                    <div className="stat-card hbond">
                      <span className="stat-label">Ikatan Hidrogen Antarmolekul (H₂O···H₂O)</span>
                      <span className="stat-number">{MODULE_1_DATA.symbolicSection.energyComparison.hydrogenBondWater}</span>
                      <small className="stat-note">Dapat diputus saat air mendidih (100 °C)</small>
                    </div>
                    <div className="stat-card london">
                      <span className="stat-label">Gaya Dispersi London Minyak</span>
                      <span className="stat-number">{MODULE_1_DATA.symbolicSection.energyComparison.londonForceHydrocarbon}</span>
                      <small className="stat-note">Gaya fluktuasi sesaat antar rantai C–H</small>
                    </div>
                  </div>
                  <p className="energy-ratio-summary mt-3">
                    📌 <strong>Kesimpulan Konseptual:</strong> {MODULE_1_DATA.symbolicSection.energyComparison.ratioDescription}
                  </p>
                </div>

                {/* Quantitative Comparison Table */}
                <div className="table-responsive-wrapper mt-5">
                  <h3 className="table-heading">Tabel Perbandingan Sifat Fisik & Kimiawi Air vs Minyak</h3>
                  <table className="chem-data-table">
                    <thead>
                      <tr>
                        <th>Parameter Fisikokimia</th>
                        <th>Air (H₂O)</th>
                        <th>Minyak Goreng Nabati</th>
                        <th>Satuan / Jenis</th>
                        <th>Catatan Rujukan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODULE_1_DATA.symbolicSection.comparisonTable.map((row, idx) => (
                        <tr key={idx}>
                          <td><strong>{row.property}</strong></td>
                          <td className="text-water"><code>{row.water}</code></td>
                          <td className="text-oil"><code>{row.oil}</code></td>
                          <td><span className="badge-unit">{row.scientificUnit}</span></td>
                          <td><small className="text-muted">{row.literatureNote}</small></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* VERIFICATION & SCIENTIFIC AUDIT BOX */}
              <section id="pemeriksaan" className="verification-card mb-6">
                <div className="verification-header">
                  <span className="verify-icon">🔍</span>
                  <div>
                    <h3 className="verify-title">Catatan & Penanda Pemeriksaan Ilmiah</h3>
                    <p className="verify-desc">
                      Sesuai pedoman PRD & AGENTS, setiap parameter kimia diverifikasi terhadap literatur standar dan ditandai jika memerlukan validasi laboratorium.
                    </p>
                  </div>
                </div>

                <div className="verify-list mt-3">
                  {MODULE_1_DATA.verificationAlerts.map((alert) => (
                    <div key={alert.id} className="verify-item">
                      <div className="verify-param-title">
                        <strong>{alert.parameter}</strong>: <code>{alert.currentValue}</code>
                      </div>
                      <p className="verify-reason">{alert.reason}</p>
                      <div className="verify-action-tag">{alert.suggestedAction}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom Navigation CTA */}
              <div className="module-bottom-nav">
                <button
                  type="button"
                  className="btn-bottom-back"
                  onClick={onBackToHome}
                >
                  ← Kembali ke Beranda
                </button>

                <button
                  type="button"
                  className="btn-bottom-quiz"
                  onClick={() => setActiveTab('quiz')}
                >
                  Lanjut ke Kuis Formatif (5 Soal) →
                </button>
              </div>
            </article>
          </div>
        )}

        {/* TAB 2: SIMULASI TABUNG REAKSI */}
        {activeTab === 'simulation' && (
          <div className="simulation-tab-container">
            <WaterOilSimulation />

            <div className="sim-guidance-card mt-6">
              <h3 className="guidance-title">📖 Panduan Pedagogis Simulasi Air & Minyak</h3>
              <p>
                Simulasi ini dirancang untuk mendemonstrasikan bagaimana gaya mekanis luar (pengocokan) dapat memaksakan dispersi tetesan minyak di antara molekul air, dan bagaimana sifat termodinamika alami molekul air (re-pembentukan ikatan hidrogen kohesif) secara spontan memisahkan kembali kedua fasa tersebut saat didiamkan.
              </p>
              <div className="guidance-btn-row mt-4">
                <button
                  type="button"
                  className="btn-sim-action primary"
                  onClick={() => setActiveTab('content')}
                >
                  ← Kembali Membaca Teori Tiga Tingkat
                </button>
                <button
                  type="button"
                  className="btn-sim-action secondary"
                  onClick={() => setActiveTab('quiz')}
                >
                  Uji Pemahaman di Kuis Formatif →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KUIS FORMATIF INTERAKTIF */}
        {activeTab === 'quiz' && (
          <div className="quiz-tab-container">
            <ModuleQuizCard
              moduleId={MODULE_1_DATA.id}
              onCompleteQuiz={handleQuizFinished}
            />

            <div className="quiz-bottom-actions mt-6">
              <button
                type="button"
                className="btn-bottom-back"
                onClick={() => setActiveTab('content')}
              >
                ← Kembali ke Ringkasan Materi
              </button>
              <button
                type="button"
                className="btn-bottom-complete"
                onClick={onBackToHome}
              >
                🏠 Selesai & Kembali ke Beranda
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SUMBER PUSTAKA & CATATAN AKADEMIK */}
        {activeTab === 'references' && (
          <div className="references-tab-container article-card">
            <h2 className="article-section-title">📚 Daftar Rujukan Akademik & Pustaka Kimia</h2>
            <p className="article-para">
              Seluruh konsep kimia, rumus, notasi, dan data numerik pada modul ini disusun berdasarkan buku teks standar internasional dan kurikulum nasional:
            </p>

            <div className="references-list mt-4">
              {MODULE_1_DATA.academicReferences.map((ref, idx) => (
                <div key={idx} className="reference-item-card">
                  <span className="ref-index">[{idx + 1}]</span>
                  <div className="ref-body">
                    <h3 className="ref-book-title">{ref.title}</h3>
                    <p className="ref-authors">
                      <strong>Penulis:</strong> {ref.authors} ({ref.year})
                    </p>
                    <p className="ref-publisher">
                      <strong>Penerbit:</strong> {ref.publisher}
                    </p>
                    <p className="ref-section">
                      <strong>Bagian Relevan:</strong> {ref.relevantSection}
                    </p>
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
      </main>
    </div>
  );
};
