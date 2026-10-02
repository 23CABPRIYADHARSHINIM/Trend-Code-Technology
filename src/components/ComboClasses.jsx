import { useState } from "react";
import PaymentOptions from "./PaymentOptions.jsx";
import ClassInfoModal from "./ClassInfoModal.jsx";
import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";

const INDIVIDUAL_PRICES = {
  "Tailoring Class": 8000,
  "Embroidery Class": 7000,
  "Jewellery Making": 6000,
  "Saree Pre-Pleating": 2000,
  "Mehndi Class": 4000,
  "Aari Work Class": 7000,
};

export default function ComboClasses({ combos }) {
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [infoCombo, setInfoCombo] = useState(null);

  const savingsFor = (combo) => {
    const sum = combo.items.reduce(
      (acc, item) => acc + (INDIVIDUAL_PRICES[item] || 0),
      0
    );
    return sum > 0 ? sum - combo.total : null;
  };

  return (
    <>
      <section id="combos" className="tct-section tct-section-light">
        <div className="container">
          <Reveal className="text-center mb-5">
            <p className="tct-eyebrow">Save more, learn more</p>
            <h2 className="tct-section-title">Combo Classes</h2>
            <p className="tct-section-sub">
              Curated bundles at special prices — bigger kits, bigger savings.
            </p>
          </Reveal>

          <div className="row g-4 justify-content-center">
            {combos.map((combo, i) => {
              const save = savingsFor(combo);
              return (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={combo.id}
                >
                  <Reveal delay={i * 90} className="h-100">
                    <article
                      className={`card h-100 tct-premium-card ${combo.featured ? 'tct-card-featured' : ''}`}
                      onClick={() => setInfoCombo(combo)}
                    >
                      <div className="tct-card-photo-wrapper">
                        {combo.badge && (
                          <span className="tct-badge-floating">{combo.badge}</span>
                        )}
                        <img
                          src={combo.image}
                          alt={combo.name}
                          className="tct-card-img"
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fallback) {
                              e.currentTarget.dataset.fallback = "1";
                              e.currentTarget.src = "/images/placeholder.svg";
                            }
                          }}
                        />
                      </div>
                      
                      <div className="card-body d-flex flex-column tct-card-body">
                        <span className="tct-card-category">CRAFT COMBO</span>
                        <h3 className="tct-card-title">{combo.name}</h3>
                        
                        
                        <ul className="tct-compact-list list-unstyled">
                          {combo.items.map((item) => (
                            <li key={item}>
                              <i className="bi bi-check2 tct-check-icon" /> {item}
                            </li>
                          ))}
                        </ul>
                        
                        <p className="tct-gift-note mt-2">
                          <i className="bi bi-gift-fill tct-orange-icon" /> {combo.gift.replace(/ worth Rs \d+(,\d+)?/i, '')}
                        </p>
                        
                        <div className="mt-auto pt-3 d-flex flex-column gap-2">
                          <button
                            type="button"
                            className="btn tct-btn-text w-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInfoCombo(combo);
                            }}
                          >
                            View details
                          </button>
                          <button
                            type="button"
                            className="btn tct-btn-primary w-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCombo(combo);
                            }}
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {infoCombo && (
        <ClassInfoModal
          item={infoCombo}
          onClose={() => setInfoCombo(null)}
          onPay={() => {
            setInfoCombo(null);
            setSelectedCombo(infoCombo);
          }}
        />
      )}
      {selectedCombo && (
        <PaymentOptions
          course={selectedCombo.name}
          price={selectedCombo.total}
          onClose={() => setSelectedCombo(null)}
        />
      )}
    </>
  );
}
