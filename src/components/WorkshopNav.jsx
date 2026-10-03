import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const WORKSHOP_ITEMS = [
  { name: "Tailoring", icon: "bi-scissors" },
  { name: "Embroidery", icon: "bi-flower1" },
  { name: "Aari Work", icon: "bi-stars" },
  { name: "Jewellery Making", icon: "bi-gem" },
  { name: "Saree Pre-Pleating", icon: "bi-person" },
  { name: "Mehndi", icon: "bi-palette" }
];

export default function WorkshopNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState(WORKSHOP_ITEMS[0].name);

  const handleItemClick = (item) => {
    setActiveItem(item.name);
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

  const row = [...WORKSHOP_ITEMS, ...WORKSHOP_ITEMS, ...WORKSHOP_ITEMS, ...WORKSHOP_ITEMS];

  return (
    <div className="tct-workshop-nav-container">
      <div className="container py-4">
        <div className="tct-workshop-nav">
          <div className="tct-workshop-nav__track">
            {row.map((item, index) => (
              <div key={`${item.name}-${index}`} className="tct-workshop-nav__wrapper">
                <button
                  className={`tct-workshop-nav__item ${activeItem === item.name ? "active" : ""}`}
                  onClick={() => handleItemClick(item)}
                >
                  <i className={`bi ${item.icon} tct-workshop-nav__icon`}></i>
                  <span>{item.name}</span>
                </button>
                <div className="tct-workshop-nav__divider"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
