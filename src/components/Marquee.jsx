import { useNavigate, useLocation } from "react-router-dom";

/**
 * Marquee — infinite scrolling ribbon with gold diamond separators.
 * Used between sections for a premium couture feel.
 */
export default function Marquee({ items, dark = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleItemClick = (item) => {
    // Navigate or scroll based on item
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector("#classes");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const el = document.querySelector("#classes");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // We duplicate enough times to ensure seamless infinite scroll
  const row = [...items, ...items, ...items, ...items];
  
  return (
    <div className={`tct-marquee ${dark ? "tct-marquee--dark" : ""}`} aria-hidden="true">
      <div className="tct-marquee__track">
        {row.map((item, i) => (
          <span 
            className="tct-marquee__item" 
            key={i}
            onClick={() => handleItemClick(item)}
            style={{ cursor: "pointer" }}
          >
            {item}
            <span className="tct-marquee__diamond">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
