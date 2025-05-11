"use client";

import Card from "../../../src/components/ui/Card";
import { ProductsListStore } from "@/src/store/products/ProductsStore";
import { observer } from "mobx-react-lite";

export const ProductsRenderer = observer(() => {
  const store = ProductsListStore.getInstance();

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
});

export const Products = () => <ProductsRenderer />;
