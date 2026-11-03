import React from 'react';

export const PedagogyBanner: React.FC = () => {
  return (
    <section id="pedagogi" className="section" style={{ paddingBottom: '5rem' }}>
      <div className="content-wrapper">
        <div className="pedagogy-card">
          <div className="pedagogy-header">
            <span className="pedagogy-tag">Kerangka Kimia Terpadu</span>
            <h2 className="pedagogy-title">Tiga Tingkat Representasi Kimia</h2>
            <p className="pedagogy-desc">
              IMF Explorer membantu peserta didik menjembatani kesulitan konseptual dengan menghubungkan fenomena 
              nyata ke pemodelan partikel tak kasat mata dan simbol kimia baku.
            </p>
          </div>

          <div className="pedagogy-grid">
            <div className="pedagogy-item">
              <span className="pedagogy-item-icon">👁️</span>
              <h3 className="pedagogy-item-title">1. Makroskopik</h3>
              <p className="pedagogy-item-text">
                Mengamati fenomena nyata sehari-hari: ketidakcampuran air dan minyak, tetesan embun, tegangan permukaan serangga di atas air, dan perbedaan titik didih zat cair.
              </p>
            </div>

            <div className="pedagogy-item">
              <span className="pedagogy-item-icon">🔬</span>
              <h3 className="pedagogy-item-title">2. Submikroskopik</h3>
              <p className="pedagogy-item-text">
                Memvisualisasikan fluktuasi awan elektron sesaat (London), interaksi orientasi kutub positif-negatif (Dipol-Dipol), serta jembatan hidrogen antarmolekul.
              </p>
            </div>

            <div className="pedagogy-item">
              <span className="pedagogy-item-icon">✍️</span>
              <h3 className="pedagogy-item-title">3. Simbolik</h3>
              <p className="pedagogy-item-text">
                Menguasai notasi ilmiah kimia: rumus molekul, penulisan muatan parsial (δ⁺ dan δ⁻), struktur titik elektron Lewis (PEB), serta grafik titik didih hidrida golongan 14–17.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
