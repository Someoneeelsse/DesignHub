import React, { useState, useEffect, useRef } from "react";

interface CollectionData {
  src: string;
  title: string;
  description: string;
}

interface CollectionsProps {
  onViewParts?: () => void;
}

const Collections: React.FC<CollectionsProps> = ({ onViewParts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const collections: CollectionData[] = [
    {
      src: "/images/Collections/BlueCollection.png",
      title: "Overland Signal Collection",
      description: "Crafted for Movement, Styled for Intent",
    },
    {
      src: "/images/Collections/OrangeCollection.png",
      title: "Urban Atlas Collection",
      description: "For the Modern Wayfarer",
    },
    {
      src: "/images/Collections/GrayCollection.png",
      title: "Metro Stillness Collection",
      description: "Quiet Confidence, Built for the City Pulse",
    },
    {
      src: "/images/Collections/YellowCollection.png",
      title: "Fieldform Archive Collection",
      description: "Purpose-Built, City-Ready",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % collections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [collections.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % collections.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + collections.length) % collections.length
    );
  };

  const currentCollection = collections[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={currentCollection.src}
          alt={currentCollection.title}
          className="w-full h-full object-cover transition-all duration-1000"
        />

        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div
        className={`absolute top-0 left-0 z-30 p-4 pt-16 sm:pt-20 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white leading-tight mb-4 sm:mb-6">
          {currentCollection.title}
        </h2>

        <p className="text-base sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-[300px] sm:max-w-[500px] mb-6 sm:mb-8">
          {currentCollection.description}
        </p>
      </div>

      <div
        className={`absolute bottom-0 left-0 z-30 p-4 pb-16 sm:pb-20 transition-all duration-1000 ease-out delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <button
          onClick={onViewParts}
          className="bg-white text-amber-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform duration-300 shadow-xl"
        >
          View Parts →
        </button>
      </div>

      <div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex space-x-2 sm:space-x-3">
          {collections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full h-full">
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="relative h-full max-w-7xl mx-auto">
            <button
              onClick={goToPrevious}
              className={`absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 pointer-events-auto bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-1000 ease-out delay-200 hover:scale-110 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className={`absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-1000 ease-out delay-200 hover:scale-110 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
