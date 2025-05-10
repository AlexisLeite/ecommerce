"use client";

import { useProducts } from "../../../src/store/products/StoreProvider";
import Card from "../../components/ui/Card";

export const Products = () => {
  const store = useProducts();
  return (
    <div className="products">
      {store.products.map((c) => (
        <Card
          key={c.id}
          title={c.name}
          image={""}
          description={c.description === null ? "" : c.description}
          price={c.price}
          onBuy={() => console.log(`${c.name} añadido al carrito`)}
        />
      ))}
    </div>
  );
};
