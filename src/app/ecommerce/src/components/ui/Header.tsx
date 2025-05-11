"use client";

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
        <h2>Home</h2>
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
              onClick={() => {}}
            >
              {c.label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
};
