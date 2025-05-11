"use client";

import {
  EndlessScrollProducts,
  TProductListData,
} from "@/src/store/products/EndlessScrollProducts";
import Card from "../../../src/components/ui/Card";
import { observer } from "mobx-react-lite";
import { TCRUDStorePagination, WhenInsideScreen } from "common";

export const ProductsRenderer = observer(
  ({ data }: { data?: TCRUDStorePagination<TProductListData> }) => {
    const store = EndlessScrollProducts.getInstance(data);

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
        <WhenInsideScreen
          onInside={() => {
            store.loadMore();
          }}
        />
      </div>
    );
  },
);

export const Products = ({
  data,
}: {
  data?: TCRUDStorePagination<TProductListData>;
}) => <ProductsRenderer data={data} />;
