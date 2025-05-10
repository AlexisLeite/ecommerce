"use client";
import { useState } from "react";
import { Button } from "./Button";
import "../../styles/components/ui/carousel.css";

export const Carousel = () => {
  const slides = [
    "/images/slide1.jpg",
    "/images/slide2.png",
    "/images/slide3.png",
  ];
  const [current, setCurrent] = useState(0);
  const len = slides.length;

  const prev = () => setCurrent((current - 1 + len) % len);
  const next = () => setCurrent((current + 1) % len);

  return (
    <div className="carousel">
      <div className="carousel__imgContainer">
        <img src={slides[current]} alt={`Slide ${current + 1}`} />
      </div>

      <Button onClick={prev} variant="primary" className="carousel__prev">
        ‹
      </Button>
      <Button className="carousel__next" onClick={next} variant="primary">
        ›
      </Button>
    </div>
  );
};
