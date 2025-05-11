"use client";

const dummyCategories = [
  {
    id: 1,
    name: "Herramientas",
    description: "Variedad de herramientas manuales y eléctricas",
    src: "/images/tools.png",
  },
  {
    id: 2,
    name: "Plomería",
    description: "Accesorios y tuberías para instalaciones sanitarias",
    src: "/images/sanitary.png",
  },
  {
    id: 3,
    name: "Pintura",
    description: "Pinceles, rodillos y cubetas de pintura",
    src: "/images/paint.png",
  },
  {
    id: 4,
    name: "Electricidad",
    description: "Luces, cables y accesorios eléctricos",
    src: "/images/light.png",
  },
  {
    id: 5,
    name: "Construcción",
    description: "Materiales y equipos para obra civil",
    src: "/images/construction.png",
  },
  {
    id: 6,
    name: "Carpintería",
    description: "Maderas y herramientas para carpintería",
    src: "/images/carpentry.png",
  },
];

export const Categories = () => {
  return (
    <div className="categories">
      {dummyCategories.map((cat) => (
        <div key={cat.id} className="category category__card">
          <div className="category__icon">
            <img
              src={cat.src}
              alt={cat.name}
            />
          </div>
          <h4 className="category__name">{cat.name}</h4>
          <p className="category__desc">{cat.description}</p>
        </div>
      ))}
    </div>
  );
};
