import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu must never stay expanded after navigation or Escape
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Smooth-scroll to a home-page section from ANY page. */
  const gotoSection = (targetHash) => (e) => {
    e.preventDefault();
    setOpen(false);
    const scrollThere = () => {
      const el = document.querySelector(targetHash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (pathname === "/") {
      scrollThere();
      window.history.replaceState(null, "", targetHash);
      // Manually dispatch a popstate event so useLocation updates the hash
      window.dispatchEvent(new Event("popstate"));
      return;
    }
    // Coming from another page
    navigate("/" + targetHash);
    let tries = 0;
    const waitThenScroll = () => {
      if (document.querySelector(targetHash)) {
        scrollThere();
      } else if (tries++ < 40) {
        setTimeout(waitThenScroll, 100);
      }
    };
    setTimeout(waitThenScroll, 120);
  };

  const homeAnchor = (targetHash, label) => (
    <a
      className={`nav-link tct-nav-link ${pathname === "/" && hash === targetHash ? "active" : ""}`}
      href={`/${targetHash}`}
      onClick={gotoSection(targetHash)}
    >
      {label}
    </a>
  );

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top tct-navbar ${scrolled ? "tct-navbar--scrolled" : ""}`}
    >
      <div className="container">
        <Link
          className="navbar-brand tct-brand"
          to="/"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/Logo.jpeg"
            alt="TCT Fashion Hub logo"
            className="tct-brand__logo"
          />
          <span className="tct-brand__text">
            TCT Fashion <em>Hub</em>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link
                className={`nav-link tct-nav-link ${pathname === "/" && (hash === "" || hash === "#home") ? "active" : ""}`}
                to="/"
                onClick={(e) => {
                  setOpen(false);
                  if (pathname === "/") {
                     window.scrollTo({ top: 0, behavior: "smooth" });
                     window.history.replaceState(null, "", "/");
                     window.dispatchEvent(new Event("popstate"));
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">{homeAnchor("#classes", "Single Classes")}</li>
            <li className="nav-item">{homeAnchor("#combos", "Combos")}</li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link tct-nav-link ${isActive ? "active" : ""}`
                }
                to="/workshop"
                onClick={() => setOpen(false)}
              >
                Workshop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link tct-nav-link ${isActive ? "active" : ""}`
                }
                to="/about"
                onClick={() => setOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2 my-2 my-lg-0">
              <ThemeToggle />
            </li>
            <li className="nav-item ms-lg-3 my-2 my-lg-0">
              <Link
                to="/enquire"
                className="btn tct-btn-gold tct-btn-sm-nav"
                onClick={() => setOpen(false)}
              >
                Enquire Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
