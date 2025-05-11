"use client";
import "../../styles/theme/ui/header.scss";
const navItems = [
  { label: "Inicio", selected: true },
  { label: "Categorías", selected: false },
  { label: "Ofertas", selected: false },
  { label: "Contacto", selected: false },
];
export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img src={'/images/logo.png'}></img>
          <h2>Ferretería</h2>
        </div>
        <input
          type="text"
          placeholder="Buscar productos..."
          className="header__searchBar"
        />

        <nav>
          {navItems.map((c) => (
            <span
              className={`${c.selected ? "selected" : ""}`}
              key={c.label}
              onClick={() => { }}
            >
              {c.label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
};
