"use client";
import { Carousel } from "../components/ui/Carousel";
import { Products } from "./sections/Products";
import "../styles/landing.css";

export const LandingPage = () => {
  return (
    <div className="landingPage">
      <Carousel />
      <Products />
    </div>
  );
};
