"use client";
import { Products } from "./sections/Products";
import { SlideSection } from "./sections/SlideSection";
import { Categories } from "./sections/Categories";
import { ImagesSection } from "./sections/ImagesSection";
import { TProductListData } from "@/src/store/products/ProductsStore";
import { TCRUDStorePagination } from "common";

export const LandingPage = ({
  data,
}: {
  data?: TCRUDStorePagination<TProductListData>;
}) => {
  return (
    <div className="landingPage">
      <SlideSection />
      <Categories />
      <ImagesSection />
      <Products data={data} />
    </div>
  );
};
