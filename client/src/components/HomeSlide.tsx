import { useState } from "react";
import "../styles/home.css";

function HomeSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/DesktopHome0.png",
      title: "Suivez votre budget",
      text: "Visualisez votre solde et vos dépenses en un coup d’œil.",
    },
    {
      image: "/DesktopHome1.png",
      title: "Analysez vos dépenses",
      text: "Comprenez où part votre argent facilement.",
    },
    {
      image: "/DesktopHome2.png",
      title: "Prenez de meilleures décisions",
      text: "Anticipez et optimisez votre budget.",
    },
  ];

  return (
    <div className="home-slide">
      {/* Image des slides */}
      <img
        src={slides[currentSlide].image}
        alt="slide"
        className="home-slide__image"
      />

      {/* Titre et description */}
      <h2>{slides[currentSlide].title}</h2>
      <p>{slides[currentSlide].text}</p>

      {/* Dots */}
      <div className="home-slide__dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeSlide;