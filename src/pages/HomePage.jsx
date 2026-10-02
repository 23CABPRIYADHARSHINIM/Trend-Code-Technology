import { useEffect, useMemo, useState } from "react";
import SingleClasses from "../components/SingleClasses.jsx";
import ComboClasses from "../components/ComboClasses.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Marquee from "../components/Marquee.jsx";
import Divider from "../components/Divider.jsx";
import Starfield from "../components/Starfield.jsx";

const CRAFTS = [
  "Tailoring",
  "Embroidery",
  "Aari Work",
  "Jewellery Making",
  "Saree Pre-Pleating",
  "Mehndi",
  "Resin Art",
];

export default function HomePage() {
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    // The Node API provides the pricing data through the Vite proxy
    fetch("/api/pricing")
      .then((r) => r.json())
      .then(setPricing)
      .catch(() =>
        setPricing({ singleClasses: [], comboClasses: [], studio: null })
      );
  }, []);

  return (
    <>
      <Hero />
      <Marquee items={CRAFTS} dark />
      <Divider />
      {pricing ? (
        <>
          <SingleClasses classes={pricing.singleClasses} />
          <Divider />
          <ComboClasses combos={pricing.comboClasses} />
        </>
      ) : (
        <div className="container py-5 text-center">
          <div className="spinner-border" role="status" style={{ color: "#b98a2f" }}>
            <span className="visually-hidden">Loading…</span>
          </div>
        </div>
      )}
      <Divider />
      <CtaBand />
    </>
  );
}

function GoldDust() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 14,
        duration: 11 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 160,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className="tct-golddust" aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            "--drift": `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Only apply on desktop sizes to prevent jank on mobile
    if (window.innerWidth > 992) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    }
  };

  const words = [
    { text: "TCT", gold: false },
    { text: "Fashion", gold: false },
    { text: "Hub", gold: true },
  ];
  let letterIndex = 0;

  return (
    <header 
      id="home" 
      className="tct-hero d-flex align-items-center"
      onMouseMove={handleMouseMove}
    >
      <div 
        className="tct-hero-bg-parallax" 
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
      >
        <Starfield />
        <GoldDust />
        <span className="tct-hero-orb tct-hero-orb--1" aria-hidden="true" />
        <span className="tct-hero-orb tct-hero-orb--2" aria-hidden="true" />
      </div>

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          <div className="col-lg-8">
            <p className="tct-eyebrow tct-anim-1">
              Ganapathy, Coimbatore · Since 2021
            </p>
            <h1 className="tct-hero-title" aria-label="TCT Fashion Hub">
              {words.map((word, wi) => (
                <span className="tct-hero-word" key={wi}>
                  {word.text.split("").map((ch) => {
                    const d = 200 + letterIndex++ * 60;
                    return (
                      <span
                        key={letterIndex}
                        className={`tct-hero-letter ${word.gold ? "is-gold" : ""}`}
                        style={{ animationDelay: `${d}ms` }}
                        aria-hidden="true"
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
            <p className="tct-hero-rule tct-anim-3" aria-hidden="true">
              ✦
            </p>
            <p className="tct-hero-sub tct-anim-4">
              Master the art of tailoring, embroidery, aari work, jewellery,
              mehndi, saree pre-pleating &amp; resin art — every class begins
              with a <strong>starter kit gift</strong> just for you.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4 tct-anim-5">
              <a href="#classes" className="btn tct-btn-premium-gold tct-btn-lg">
                View Class Pricing
              </a>
              <a href="#combos" className="btn tct-btn-premium-outline tct-btn-lg">
                Explore Combos
              </a>
            </div>
          </div>
          <div className="col-lg-4 d-none d-lg-block text-center">
            <div 
              className="tct-hero-logo-frame tct-hero-arrive"
              style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
            >
              <img
                src="/images/Logo.jpeg"
                alt="TCT Fashion Hub logo"
                className="tct-hero-logo"
              />
              <div className="tct-hero-logo-glow"></div>
            </div>
          </div>
        </div>
      </div>

      <a href="#classes" className="tct-scroll-cue-premium" aria-label="Scroll to classes">
        <span className="tct-scroll-cue__mouse-premium" aria-hidden="true">
          <span className="tct-scroll-cue__wheel"></span>
        </span>
      </a>
    </header>
  );
}
