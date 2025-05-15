"use client";
import { Products } from "./sections/Products";
import { Categories } from "./sections/Categories";
import { ImagesSection } from "./sections/ImagesSection";
import { TCRUDStorePagination } from "common";
import { Carousel } from "../../src/components/ui/Carousel";
import { TProductListData } from "@/src/store/server/ProductsServer";

export const LandingPage = ({
  data,
}: {
  data?: TCRUDStorePagination<TProductListData>;
}) => {
  return (
    <div className="landingPage">
      <Carousel />
      <Categories />
      <Products data={data} />
      <ImagesSection />
    </div>
  );
};
