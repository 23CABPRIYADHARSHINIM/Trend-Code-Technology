import { useState } from "react";
import Counter from "../components/Counter.jsx";
import Marquee from "../components/Marquee.jsx";
import Reveal from "../components/Reveal.jsx";
import ClassInfoModal from "../components/ClassInfoModal.jsx";

const WORKSHOPS = [
  {
    id: "ws-saree-pleating",
    name: "Saree Pre-Pleating",
    image: "/images/Saree%20pre%20pleating.jpg",
    level: "Beginner friendly",
    duration: "1 Day",
    gift: "Kit gift: pleating board & measurement guide",
    price: 1500, // Optional price for view details
  },
  {
    id: "ws-saree-draping",
    name: "Saree Draping",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d61dc9?w=800&q=80",
    level: "All levels",
    duration: "1 Day",
    gift: "Kit gift: safety pin set & draping manual",
    price: 1500,
  },
  {
    id: "ws-mehndi",
    name: "Mehndi",
    image: "/images/Mehandi.jpg",
    level: "Beginner friendly",
    duration: "2 Days",
    gift: "Kit gift: organic cones, practice sheets",
    price: 2000,
  },
  {
    id: "ws-aari",
    name: "Aari Work",
    image: "/images/Aari%20Work.jpg",
    level: "All levels",
    duration: "2 Days",
    gift: "Kit gift: aari needles, frame & threads",
    price: 2500,
  },
  {
    id: "ws-embroidery",
    name: "Embroidery",
    image: "/images/Embrading.webp",
    level: "All levels",
    duration: "2 Days",
    gift: "Kit gift: 12-skein threads, needles",
    price: 2000,
  }
];

export default function WorkshopPage() {
  const [infoClass, setInfoClass] = useState(null);

  const workshopFeatures = [
    ["bi-tools", "Hands-on Experience", "Practical sessions with expert guidance."],
    ["bi-chat-heart", "Interactive Q&A", "Directly interact with industry professionals."],
    ["bi-star", "Skill Building", "Learn new techniques in a focused environment."],
    ["bi-award", "Certificate of Completion", "Get certified for the skills you acquire."],
  ];

  return (
    <>
      {/* Page hero */}
      <section className="tct-page-hero">
        <div className="container text-center">
          <img
            src="/images/Logo.jpeg"
            alt="TCT Fashion Hub logo"
            className="tct-page-hero__logo"
          />
          <p className="tct-eyebrow">Learn and Create</p>
          <h1 className="tct-page-title">Workshops</h1>
          <p className="tct-section-sub">
            Join our immersive workshops to elevate your crafting skills with professional techniques.
          </p>
        </div>
      </section>

      {/* Workshop Categories */}
      <section className="tct-premium-section">
        <div className="container">
          <Reveal className="text-center mb-5">
            <p className="tct-premium-eyebrow">EXPLORE SESSIONS</p>
            <h2 className="tct-premium-title">Available Workshops</h2>
            <p className="tct-premium-sub">
              Hands-on 1 and 2 day sessions focused on specific crafts and skills.
            </p>
          </Reveal>

          <div className="row g-4 justify-content-center">
            {WORKSHOPS.map((w, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={w.id}>
                <Reveal delay={i * 90} className="h-100">
                  <article
                    className="card tct-premium-card h-100"
                    onClick={() => setInfoClass(w)}
                  >
                    <div className="tct-card-photo-wrapper">
                      <img
                        src={w.image}
                        alt={w.name}
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
                        <h3 className="tct-card-title m-0">{w.name}</h3>
                        <span className="tct-level-badge">{w.level}</span>
                      </div>
                      
                      <ul className="tct-meta list-unstyled mb-2">
                        <li>
                          <i className="bi bi-clock tct-orange-icon" /> {w.duration}
                        </li>
                        <li>
                          <i className="bi bi-gift tct-orange-icon" /> {w.gift}
                        </li>
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop details */}
      <section className="tct-section pt-0">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7">
              <p className="tct-eyebrow">Upcoming Sessions</p>
              <h2 className="tct-section-title text-start">
                Immersive Crafting Experiences
              </h2>
              <p className="tct-section-sub text-start">
                Our workshops are designed to provide intensive, hands-on learning in a collaborative environment. Whether you are a beginner looking to explore a new hobby or an experienced crafter wanting to refine your techniques, our specialized sessions cater to all levels.
              </p>
              <p className="tct-section-sub text-start">
                Each workshop is led by industry experts who bring years of experience and passion to the table, ensuring you leave with not just new skills, but also the confidence to create.
              </p>
              <div className="row g-3 mt-4">
                {[
                  [10, "+", "Workshops Conducted"],
                  [300, "+", "Happy Participants"],
                  [100, "%", "Hands-on Learning"],
                ].map(([num, suffix, label]) => (
                  <div className="col-4" key={label}>
                    <div className="tct-stat">
                      <strong>
                        <Counter value={num} suffix={suffix} />
                      </strong>
                      <span>{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="tct-about-panel">
                <blockquote className="tct-quote">
                  “The workshop was a transformative experience. I learned so much in just one day and felt completely supported.”
                </blockquote>
                <p className="tct-quote-by">— Anjali K., Workshop Attendee</p>
                <div className="tct-about-panel__logo mt-4">
                  <img
                    src="/images/Logo.jpeg"
                    alt="TCT Fashion Hub emblem"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="tct-section tct-section--skyblue">
        <div className="container">
          <div className="text-center mb-5">
            <p className="tct-eyebrow">Why Join</p>
            <h2 className="tct-section-title">Workshop Highlights</h2>
          </div>
          <div className="row g-4">
            {workshopFeatures.map(([icon, title, text], i) => (
              <div className="col-sm-6 col-lg-3" key={title}>
                <Reveal delay={i * 100} className="h-100">
                  <div className="tct-value-card">
                    <i className={`bi ${icon}`} />
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Hands-on Learning",
          "Expert Instructors",
          "Creative Environment",
          "Networking Opportunities",
          "All Materials Provided",
        ]}
      />

      {infoClass && (
        <ClassInfoModal
          item={infoClass}
          onClose={() => setInfoClass(null)}
          onPay={() => {
             // Optional logic for workshop payment
             setInfoClass(null);
          }}
        />
      )}
    </>
  );
}
