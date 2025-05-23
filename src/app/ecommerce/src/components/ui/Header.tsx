"use client";

import { search } from "@/src/store/server/ProductsServer";
import { useBouncedFn } from "common";
import { toJS } from "mobx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { link: "/", label: "Inicio", selected: true },
  { link: "/admin", label: "Admin", selected: false },
  { link: "/categories", label: "Categorías", selected: false },
  { link: "/offers", label: "Ofertas", selected: false },
  { link: "/contact", label: "Contacto", selected: false },
];

typeof window !== "undefined" &&
  (() => {
    (window as any).tojs = toJS;
  })();

export const Header = () => {
  const path = usePathname();
  const fn = useBouncedFn((q: string) => {
    search(q).then((c) => {
      console.clear();
      c?.data.map((c) => c.name).forEach((x) => console.log(x));
    });
  });
  if (path.startsWith("/admin")) return null;

  return (
    <header className="main_header">
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
