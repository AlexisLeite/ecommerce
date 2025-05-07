"use client";

import { useProducts } from "@/src/store/products/StoreProvider";
import { observer } from "mobx-react-lite";

export const ProductsList = observer(() => {
  const store = useProducts();

  return (
    <div
      className="products"
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        {store.hasPrevious && (
          <button
            disabled={store.isLoading}
            style={{ background: store.isLoading ? "red" : undefined }}
            onClick={() => store.previous()}
          >
            Prev
          </button>
        )}
        <button
          disabled={store.isLoading}
          style={{ background: store.isLoading ? "red" : undefined }}
          onClick={() => store.refresh()}
        >
          Refresh
        </button>
        {store.hasMore && (
          <button
            disabled={store.isLoading}
            style={{ background: store.isLoading ? "red" : undefined }}
            onClick={() => store.next()}
          >
            Next
          </button>
        )}
      </div>
      <div>
        {store.products.map((c) => (
          <div className="product" key={c.id}>
            <button
              disabled={store.isLoading}
              style={{ background: store.isLoading ? "red" : undefined }}
              onClick={() => {
                store.remove(c);
              }}
            >
              x
            </button>{" "}
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
});
