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
      <div className="card__main">
        <div className="card__imgContainer">
          <img src={image} alt={title} />
        </div>
        <div className="card__info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="card__footer">
        <span className="card__price">$ {price}</span>
        <Button variant="primary" onClick={onBuy}>
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default Card;
