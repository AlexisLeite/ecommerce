"use client";
import { Header } from "@/src/components/ui/Header";
import { Carousel } from "../../src/components/ui/Carousel";
import { Products } from "./sections/Products";
import "../../src/styles/theme/landing.css";
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
      <Products />
      <ImagesSection />
      <Header />
      <Carousel />
      <Products data={data} />
    </div>
  );
};
