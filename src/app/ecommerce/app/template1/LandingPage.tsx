"use client";
import { Carousel } from "../../src/components/ui/Carousel";
import { Products } from "./sections/Products";
import "../../src/styles/theme/landing.css";
import { SlideSection } from "./sections/SlideSection";
import { Categories } from "./sections/Categories";
import { ImagesSection } from "./sections/ImagesSection";

export const LandingPage = () => {
  return (
    <div className="landingPage">
      <SlideSection />
      <Categories />
      <Products />
      <ImagesSection />
    </div>
  );
};
