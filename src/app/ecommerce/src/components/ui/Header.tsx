"use client";
import "../../styles/theme/ui/header.scss";
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
    search(q).then((c) => {
      console.clear();
      c?.data.map((c) => c.name).forEach((x) => console.log(x));
    });
  });

  return (
    <header className="header">
      <div className="header__content">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img src={"/images/logo.png"}></img>
          <h2>Ferretería</h2>
        </div>
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
