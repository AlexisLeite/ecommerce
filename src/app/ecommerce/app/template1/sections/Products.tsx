"use client";

import { useState, useEffect, useRef } from "react";
import { EndlessScrollProducts } from "@/src/store/EndlessScrollProducts";
import Card from "../../../src/components/ui/Card";
import { observer } from "mobx-react-lite";
import { IconButton, TCRUDStorePagination } from "common";
import { CgSpinner } from "@meronex/icons/cg";
import { FaAngleLeft, FaAngleRight } from "@meronex/icons/fa";
import { TProductListData } from "@/src/store/server/ProductsServer";

export const ProductsRenderer = observer(
  ({ data }: { data?: TCRUDStorePagination<TProductListData> }) => {
    const store = EndlessScrollProducts.getInstance(data);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);
    const [pageWidth, setPageWidth] = useState(0);

    useEffect(() => {
      const measure = () => {
        if (carouselRef.current) {
          setPageWidth(carouselRef.current.clientWidth);
        }
      };
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }, []);

    const totalPages = Math.ceil(store.products.length / 5);
    const pagedProducts = store.products;

    const prevPage = () => setPage((p) => (p - 1 + totalPages) % totalPages);
    const nextPage = () => setPage((p) => (p + 1) % totalPages);

    return (
      <div className="products-wrapper">
        <div className="products">
          <IconButton onClick={prevPage} variant="primary">
            <FaAngleLeft />
          </IconButton>

          <div className="products__carousel" ref={carouselRef}>
            <div
              className="products__list"
              style={{
                transform: `translateX(-${page * pageWidth}px)`,
              }}
            >
              {pagedProducts.map((c) => (
                <Card
                  key={c.id}
                  title={c.name}
                  image={
                    c.images[0]?.id
                      ? `/api/images/${c.images[0]?.id}`
                      : "/no-product.jpg"
                  }
                  description={c.description || ""}
                  price={c.price}
                  onBuy={() => console.log(`${c.name} añadido al carrito`)}
                />
              ))}
            </div>
          </div>

          <IconButton onClick={nextPage} variant="primary">
            <FaAngleRight />
          </IconButton>
        </div>
        {store.isLoading && <CgSpinner />}
      </div>
    );
  },
);

export const Products = ({
  data,
}: {
  data?: TCRUDStorePagination<TProductListData>;
}) => <ProductsRenderer data={data} />;
