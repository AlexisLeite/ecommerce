"use client";
import { Products } from "./sections/Products";
import { Categories } from "./sections/Categories";
import { ImagesSection } from "./sections/ImagesSection";
import { TProductListData } from "@/src/store/ProductsStore";
import { TCRUDStorePagination } from "common";
import { Carousel } from "../../src/components/ui/Carousel";
import { TCategoryListData } from "@/src/store/CategoriesStore";

export const LandingPage = ({
  data,
  data2,
}: {
  data?: TCRUDStorePagination<TProductListData>;
  data2?: TCRUDStorePagination<TCategoryListData>;
}) => {
  return (
    <div className="landingPage">
      {data2?.data.map((c) => c.name)}
      <Carousel />;
      <Categories />
      <Products data={data} />
      <ImagesSection />
    </div>
  );
};
