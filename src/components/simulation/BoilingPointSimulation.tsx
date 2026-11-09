import React, { useState } from 'react';

interface DataPoint {
  formula: string;
  group: 14 | 15 | 16 | 17;
  period: 2 | 3 | 4 | 5;
  bp: number; // in Celsius
  imf: string;
  hasHBond: boolean;
  notes: string;
}

const HYDRIDE_DATA: DataPoint[] = [
  // Group 14
  { formula: 'CH₄', group: 14, period: 2, bp: -161, imf: 'Gaya London', hasHBond: false, notes: 'Nonpolar simetris, molekul paling kecil di Golongan 14.' },
  { formula: 'SiH₄', group: 14, period: 3, bp: -112, imf: 'Gaya London', hasHBond: false, notes: 'Jumlah elektron bertambah, polarisabilitas meningkat.' },
  { formula: 'GeH₄', group: 14, period: 4, bp: -88, imf: 'Gaya London', hasHBond: false, notes: 'Gaya London semakin kuat seiring kenaikan massa molar.' },
  { formula: 'SnH₄', group: 14, period: 5, bp: -52, imf: 'Gaya London', hasHBond: false, notes: 'Titik didih tertinggi di Golongan 14 karena ukuran atom Sn paling besar.' },

  // Group 15
  { formula: 'NH₃', group: 15, period: 2, bp: -33, imf: 'Ikatan Hidrogen + London', hasHBond: true, notes: 'ANOMALI LONJAKAN! Membentuk ikatan hidrogen antarmolekul berkat atom N dan 1 PEB.' },
  { formula: 'PH₃', group: 15, period: 3, bp: -88, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Tidak ada ikatan hidrogen karena atom P kurang elektronegatif.' },
  { formula: 'AsH₃', group: 15, period: 4, bp: -62, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Titik didih naik kembali karena gaya London meningkat.' },
  { formula: 'SbH₃', group: 15, period: 5, bp: -17, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Massa molar besar mendominasi kenaikan titik didih.' },

  // Group 16
  { formula: 'H₂O', group: 16, period: 2, bp: 100, imf: 'Jaringan 4 Ikatan Hidrogen 3D', hasHBond: true, notes: 'ANOMALI SPEKTAKULER! Titik didih melonjak +160 °C di atas tren hidrida sejenisnya karena 4 ikatan hidrogen 3D per molekul.' },
  { formula: 'H₂S', group: 16, period: 3, bp: -60, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Hanya memiliki gaya dipol-dipol lemah, tidak ada ikatan hidrogen.' },
  { formula: 'H₂Se', group: 16, period: 4, bp: -41, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Massa molar meningkat, gaya London memperkuat tarikan.' },
  { formula: 'H₂Te', group: 16, period: 5, bp: -2, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Titik didih mendekati 0 °C berkat ukuran atom Te yang sangat besar.' },

  // Group 17
  { formula: 'HF', group: 17, period: 2, bp: 20, imf: 'Ikatan Hidrogen Rantai + London', hasHBond: true, notes: 'ANOMALI LONJAKAN! Fluorin sangat elektronegatif menghasilkan ikatan hidrogen terkuat per kontak (~29 kJ/mol).' },
  { formula: 'HCl', group: 17, period: 3, bp: -85, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Atom Cl terlalu besar untuk membentuk ikatan hidrogen sejati.' },
  { formula: 'HBr', group: 17, period: 4, bp: -66, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Gaya London meningkat seiring penambahan elektron.' },
  { formula: 'HI', group: 17, period: 5, bp: -35, imf: 'Gaya Dipol-Dipol + London', hasHBond: false, notes: 'Ukuran atom iodin besar memberikan gaya dispersi kuat.' },
];

export const BoilingPointSimulation: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
  const [selectedPoint, setSelectedPoint] = useState<DataPoint>(HYDRIDE_DATA[8]); // Default H2O

  // SVG Chart Coordinate mapping
  // X: Period 2 to 5 -> mapping to 80, 180, 280, 380
  // Y: -200 °C to +120 °C (range 320) -> height 260
  const getX = (period: number) => 80 + (period - 2) * 100;
  const getY = (bp: number) => 240 - ((bp + 180) / 300) * 200;

  const groupColors = {
    14: '#4A5568', // Gray/Black for Carbon group (London)
    15: '#3182CE', // Blue for Nitrogen group
    16: '#E53E3E', // Red for Oxygen group
    17: '#38A169', // Green for Halogen group
  };

  const groupNames = {
    14: 'Golongan 14 (CH₄, SiH₄, GeH₄, SnH₄)',
    15: 'Golongan 15 (NH₃, PH₃, AsH₃, SbH₃)',
    16: 'Golongan 16 (H₂O, H₂S, H₂Se, H₂Te)',
    17: 'Golongan 17 (HF, HCl, HBr, HI)',
  };

  return (
    <div className="water-oil-sim-card">
      <div className="sim-header">
        <div className="sim-title-group">
          <span className="sim-badge">Simulasi Interaktif 5E • Elaborate</span>
          <h3 className="sim-main-title">Kurva Titik Didih Hidrida Nonlogam (Raymond Chang Bab 11)</h3>
        </div>

        <div className="sim-quick-controls">
          <button
            type="button"
            className={`sim-btn-pill ${selectedGroup === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedGroup('all')}
          >
            Semua Golongan
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${selectedGroup === 16 ? 'active' : ''}`}
            onClick={() => setSelectedGroup(16)}
          >
            Gol 16 (H₂O Anomali)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${selectedGroup === 17 ? 'active' : ''}`}
            onClick={() => setSelectedGroup(17)}
          >
            Gol 17 (HF)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${selectedGroup === 15 ? 'active' : ''}`}
            onClick={() => setSelectedGroup(15)}
          >
            Gol 15 (NH₃)
          </button>
          <button
            type="button"
            className={`sim-btn-pill ${selectedGroup === 14 ? 'active' : ''}`}
            onClick={() => setSelectedGroup(14)}
          >
            Gol 14 (Murni London)
          </button>
        </div>
      </div>

      <div className="sim-viewport">
        {/* SVG Chart Stage */}
        <div className="test-tube-wrapper" style={{ minHeight: '380px', width: '100%', padding: '1.25rem' }}>
          <svg viewBox="0 0 460 320" style={{ width: '100%', height: '300px' }} role="img" aria-label="Grafik Titik Didih Hidrida">
            {/* Chart Grid Lines */}
            <rect x="50" y="20" width="370" height="250" fill="#FFFFFF" rx="8" stroke="#E2E8F0" />

            {/* Horizontal Grid lines for temperatures: -150, -100, -50, 0, 50, 100 */}
            {[-150, -100, -50, 0, 50, 100].map((t) => (
              <g key={t}>
                <line x1="50" y1={getY(t)} x2="420" y2={getY(t)} stroke={t === 0 ? '#CBD5E0' : '#EDF2F7'} strokeWidth={t === 0 ? 1.5 : 1} strokeDasharray={t === 0 ? 'none' : '3 3'} />
                <text x="18" y={getY(t) + 4} fontSize="9" fill="#718096" fontWeight={t === 0 ? 'bold' : 'normal'}>
                  {t > 0 ? `+${t}` : t}°C
                </text>
              </g>
            ))}

            {/* Vertical Grid lines for Periods 2, 3, 4, 5 */}
            {[2, 3, 4, 5].map((p) => (
              <g key={p}>
                <line x1={getX(p)} y1="20" x2={getX(p)} y2="270" stroke="#EDF2F7" strokeWidth="1" strokeDasharray="3 3" />
                <text x={getX(p) - 18} y="285" fontSize="10" fill="#4A5568" fontWeight="bold">
                  Periode {p}
                </text>
              </g>
            ))}

            {/* Lines connecting hydrides for each group */}
            {[14, 15, 16, 17].map((grp) => {
              if (selectedGroup !== 'all' && selectedGroup !== grp) return null;
              const points = HYDRIDE_DATA.filter((d) => d.group === grp);
              const pathStr = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.period)} ${getY(p.bp)}`).join(' ');

              return (
                <path
                  key={grp}
                  d={pathStr}
                  fill="none"
                  stroke={groupColors[grp as 14 | 15 | 16 | 17]}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}

            {/* Data Points */}
            {HYDRIDE_DATA.map((pt) => {
              if (selectedGroup !== 'all' && selectedGroup !== pt.group) return null;
              const cx = getX(pt.period);
              const cy = getY(pt.bp);
              const isSelected = selectedPoint.formula === pt.formula;

              return (
                <g
                  key={pt.formula}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPoint(pt)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 9 : pt.hasHBond ? 7 : 5.5}
                    fill={pt.hasHBond ? '#E9A15B' : groupColors[pt.group]}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 3 : 2}
                  />

                  {/* Formula label */}
                  <text
                    x={cx + (pt.period === 2 ? 8 : -14)}
                    y={cy - 8}
                    fontSize={isSelected ? '12' : '10'}
                    fontWeight="bold"
                    fill={isSelected ? '#245B45' : '#2D3748'}
                  >
                    {pt.formula}
                  </text>
                </g>
              );
            })}

            {/* Anomaly Callout Box for H2O */}
            <g transform="translate(100, 30)">
              <rect x="0" y="0" width="125" height="22" rx="11" fill="#E9A15B" />
              <text x="10" y="15" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                ★ H₂O Anomali (+100 °C)
              </text>
            </g>
          </svg>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap', fontSize: '0.82rem' }}>
            <span style={{ color: groupColors[16], fontWeight: 700 }}>■ Gol 16 (H₂O)</span>
            <span style={{ color: groupColors[17], fontWeight: 700 }}>■ Gol 17 (HF)</span>
            <span style={{ color: groupColors[15], fontWeight: 700 }}>■ Gol 15 (NH₃)</span>
            <span style={{ color: groupColors[14], fontWeight: 700 }}>■ Gol 14 (CH₄)</span>
            <span style={{ color: '#E9A15B', fontWeight: 700 }}>● Titik Oranye: Memiliki Ikatan Hidrogen</span>
          </div>
        </div>

        {/* Right Side Analysis of Selected Hydride */}
        <div className="sim-analysis-panel">
          <div className="phase-indicator-header">
            <span className="phase-pill" style={{ background: groupColors[selectedPoint.group] }}>
              {selectedPoint.formula}
            </span>
            <span className="phase-badge-title">
              Titik Didih: {selectedPoint.bp > 0 ? `+${selectedPoint.bp}` : selectedPoint.bp} °C
            </span>
          </div>

          <div className="analysis-body">
            <p className="analysis-lead">
              {groupNames[selectedPoint.group]} — Periode {selectedPoint.period}
            </p>

            <div className="micro-insight-box">
              <p>
                <strong>Jenis Gaya Antarmolekul:</strong> <span style={{ color: '#245B45', fontWeight: 700 }}>{selectedPoint.imf}</span>
              </p>
              <p>
                <strong>Status Ikatan Hidrogen:</strong> {selectedPoint.hasHBond ? '✅ Ya, Memiliki Ikatan Hidrogen Kuat' : '❌ Tidak (Hanya Van der Waals / London)'}
              </p>
              <p style={{ marginTop: '0.5rem', lineHeight: 1.6 }}>
                💡 <strong>Penjelasan Ilmiah (Raymond Chang):</strong> {selectedPoint.notes}
              </p>
            </div>

            {selectedPoint.group === 14 && (
              <div className="key-takeaway-note" style={{ marginTop: '0.75rem' }}>
                📌 <em>Golongan 14 (CH₄ hingga SnH₄) adalah molekul nonpolar simetris. Kenaikan titik didihnya yang teratur membuktikan peningkatan kekuatan gaya dispersi London seiring bertambahnya jumlah elektron.</em>
              </div>
            )}

            {selectedPoint.hasHBond && (
              <div className="key-takeaway-note" style={{ marginTop: '0.75rem', background: '#FFF6EE', borderColor: '#E9A15B', color: '#7A3516' }}>
                🌟 <em>Senyawa ini memiliki titik didih yang melonjak sangat tinggi di luar tren golongannya karena ikatan hidrogen antarmolekul membutuhkan modal energi kalor yang sangat besar untuk diputus.</em>
              </div>
            )}
          </div>

          <div className="sim-action-footer">
            <button
              type="button"
              className="btn-sim-action primary"
              onClick={() => {
                const nextIdx = (HYDRIDE_DATA.findIndex((d) => d.formula === selectedPoint.formula) + 1) % HYDRIDE_DATA.length;
                setSelectedPoint(HYDRIDE_DATA[nextIdx]);
              }}
            >
              🔍 Periksa Senyawa Berikutnya →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

