import { useState } from "react";
import PaymentOptions from "./PaymentOptions.jsx";
import ClassInfoModal from "./ClassInfoModal.jsx";
import Reveal from "./Reveal.jsx";

const PREMIUM_IMAGES = {
  "Tailoring Class": "/images/Tailoring%20class.webp",
  "Embroidery Class": "/images/Intricate%20Indian%20Wedding%20Embroidery%20Setup.png",
  "Aari Work Class": "/images/Aari%20Work.jpg",
  "Jewellery Making": "/images/jewellery.jpg",
  "Saree Pre-Pleating": "/images/saree.jpg",
  "Mehndi Class": "/images/Mehandi.jpg",
  "Resin Art": "https://images.unsplash.com/photo-1628156107310-85f269baab37?auto=format&fit=crop&q=80&w=800"
};

export default function SingleClasses({ classes }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [infoClass, setInfoClass] = useState(null);

  return (
    <>
      <section id="classes" className="tct-premium-section">
      <div className="container">
        <Reveal className="text-center mb-5">
          <p className="tct-premium-eyebrow">LEARN A CRAFT</p>
          <h2 className="tct-premium-title">Discover Your Creative Side</h2>
          <p className="tct-premium-sub">
            Learn beautiful skills with expert guidance and hands-on training.
          </p>
        </Reveal>

        <div className="row g-4 justify-content-center">
          {classes.map((c, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={c.id}>
              <Reveal delay={i * 90} className="h-100">
                <article
                  className="card tct-premium-card h-100"
                  onClick={() => setInfoClass(c)}
                >
                  <div className="tct-card-photo-wrapper">
                    <img
                      src={PREMIUM_IMAGES[c.name] || c.image}
                      alt={c.name}
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
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <h3 className="tct-card-title m-0">{c.name}</h3>
                      <span className="tct-level-badge">{c.level}</span>
                    </div>
                    
                    
                    <ul className="tct-meta list-unstyled mb-2">
                      <li>
                        <i className="bi bi-clock tct-orange-icon" /> {c.duration}
                      </li>
                      <li>
                        <i className="bi bi-gift tct-orange-icon" /> {c.gift.replace(/ worth Rs \d+(,\d+)?/i, '')}
                      </li>
                    </ul>
                    
                    <div className="mt-auto pt-3 d-flex flex-column gap-2">
                      <button
                        type="button"
                        className="btn tct-btn-text w-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInfoClass(c);
                        }}
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        className="btn tct-btn-primary w-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClass(c);
                        }}
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
      </section>
      {infoClass && (
        <ClassInfoModal
          item={infoClass}
          onClose={() => setInfoClass(null)}
          onPay={() => {
            setInfoClass(null);
            setSelectedClass(infoClass);
          }}
        />
      )}
      {selectedClass && (
        <PaymentOptions
          course={selectedClass.name}
          price={selectedClass.price}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </>
  );
}
