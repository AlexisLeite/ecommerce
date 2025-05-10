"use client";
import { Carousel } from "../../../../../app/components/ui/Carousel";
import { Products } from "./sections/Products";

export const LandingPage = () => {
  return (
    <div className="landingPage">
      <Carousel />
      <Products />
    </div>
  );
};
