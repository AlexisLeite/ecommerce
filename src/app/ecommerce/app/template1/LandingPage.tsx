"use client";
import { Header } from "@/src/components/ui/Header";
import { Carousel } from "../../src/components/ui/Carousel";
import { Products } from "./sections/Products";

export const LandingPage = () => {
  return (
    <div className="landingPage">
      <Header />
      <Carousel />
      <Products />
    </div>
  );
};
