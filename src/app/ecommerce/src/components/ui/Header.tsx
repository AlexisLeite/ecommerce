"use client";

import { search } from "@/src/store/products/server/ProductsServer";
import { useBouncedFn } from "common";

const navItems = [
  { label: "Inicio", selected: true },
  { label: "Categorías", selected: false },
  { label: "Ofertas", selected: false },
  { label: "Contacto", selected: false },
];

export const Header = () => {
  const fn = useBouncedFn((q: string) => {
    search(q).then((c) => console.log(c?.data.map((c) => c.name).join(", ")));
  });

  return (
    <header className="header">
      <div className="header__content">
        <h2>Home</h2>
        <input
          type="text"
          placeholder="Buscar productos..."
          className="header__searchBar"
          onChange={(ev) => {
            fn(ev.target.value);
          }}
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
