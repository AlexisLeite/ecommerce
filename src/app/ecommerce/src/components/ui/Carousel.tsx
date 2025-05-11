"use client";

import { useState } from "react";
import { Button } from "common";
import Image from "next/image";

export const Carousel = () => {
  const slides = [
    "/images/slide1.png",
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
        <Image
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          width={1600}
          height={1200}
        />
      </div>

      <Button onClick={prev} variant="ghost" className="carousel__prev">
        ‹
      </Button>
      <Button className="carousel__next" onClick={next} variant="primary">
        ›
      </Button>
    </div>
  );
};
