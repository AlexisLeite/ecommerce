"use client";

import { useState } from "react";
import { IconButton } from "common";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "@meronex/icons/fa";

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
          width={1200}
          height={600}
        />
      </div>

      <IconButton onClick={prev} variant="primary" className="carousel__prev">
        <FaAngleLeft />
      </IconButton>
      <IconButton className="carousel__next" variant="primary" onClick={next}>
        <FaAngleRight />
      </IconButton>
    </div>
  );
};
