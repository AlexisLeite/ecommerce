"use client";

import { useProducts } from "@/src/store/products/StoreProvider";
import { observer } from "mobx-react-lite";
import Link from "next/link";

export const ProductsList = observer(() => {
  const store = useProducts();

  return (
    <div
      className="products"
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          disabled={store.isLoading}
          style={{ background: store.isLoading ? "red" : undefined }}
          onClick={() => store.refresh()}
        >
          Refresh
        </button>
        {store.hasPrevious && (
          <Link
            style={{ background: store.isLoading ? "red" : undefined }}
            onClick={() => store.next()}
            href={`/page/${store.currentPage - 1}`}
          >
            Prev
          </Link>
        )}
        {store.hasMore && (
          <Link
            style={{ background: store.isLoading ? "red" : undefined }}
            onClick={() => store.next()}
            href={`/page/${store.currentPage + 1}`}
          >
            Next
          </Link>
        )}
      </div>
      <div>
        {store.products.map((c) => (
          <div className="product" key={c.id}>
            <button
              disabled={store.isLoading}
              style={{ background: store.isLoading ? "red" : undefined }}
              onClick={() => {
                store.remove(c.id);
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
