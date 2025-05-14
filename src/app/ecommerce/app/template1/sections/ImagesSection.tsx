// src/components/ui/ImagesSection.jsx
"use client";

export const ImagesSection = () => {
  return (
    <div className="images__section">
      <div className="images__section-main">
        <img src="/images/sections/2.jpg" alt="Imagen principal" />
      </div>
      <div className="images__section-sidebar">
        <div className="images__section-thumb">
          <img src="/images/sections/1.jpg" alt="Imagen secundaria 1" />
        </div>
        <div className="images__section-thumb">
          <img src="/images/sections/3.jpg" alt="Imagen secundaria 2" />
        </div>
      </div>
    </div>
  );
};
