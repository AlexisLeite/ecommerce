"use client";
import { Header } from "@/src/components/ui/Header";
import { Carousel } from "../../src/components/ui/Carousel";
import { Products } from "./sections/Products";
import { TProductListData } from "@/src/store/products/ProductsStore";
import { TCRUDStorePagination } from "common";

export const LandingPage = ({
  data,
}: {
  data?: TCRUDStorePagination<TProductListData>;
}) => {
  return (
    <div className="landingPage">
      <Header />
      <Carousel />
      <Products data={data} />
    </div>
  );
};
