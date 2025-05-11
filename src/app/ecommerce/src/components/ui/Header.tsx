"use client";

import { search } from "@/src/store/products/server/ProductsServer";
import { useBouncedFn } from "common";
import Link from "next/link";

const navItems = [
  { link: "/", label: "Inicio", selected: true },
  { link: "/admin", label: "Admin", selected: false },
  { link: "/categories", label: "Categorías", selected: false },
  { link: "/offers", label: "Ofertas", selected: false },
  { link: "/contact", label: "Contacto", selected: false },
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
            <Link
              className={`${c.selected ? "selected" : ""}`}
              key={c.label}
              href={c.link}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
