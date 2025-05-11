"use client";

import { Button } from "common";

const Card = ({
  title,
  image,
  description,
  price,
  onBuy,
}: {
  title: string;
  image: string;
  description?: string;
  price: number;
  onBuy: () => void;
}) => {
  return (
    <div className="card">
      <div className="card__imgContainer">
        <img src={image} alt={title} />
      </div>
      <div className="card__info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="card__footer">
          <span className="card__price">$ {price}</span>
          <Button variant="secondary" size="md" onClick={onBuy}>
            Al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
