import React, { useState, useEffect } from "react";

interface CollectionCardProps {
  size: "medium" | "large";
  title: string;
  description: string;
  price?: string;
  bestseller?: boolean;
  emoji?: string;
  component?: React.ReactNode;
  image?: string | string[];
  models?: string | string[];
  className?: string;
  onClick?: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  size,
  title,
  description,
  price,
  bestseller = false,
  emoji,
  component,
  image,
  models,
  className = "",
  onClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (Array.isArray(image) && image.length > 1) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % image.length;
        setNextImageIndex(nextIndex);
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setIsTransitioning(false);
        }, 800);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [image, currentIndex]);

  const getCurrentImage = () => {
    if (!image) return null;
    if (Array.isArray(image)) {
      return image[currentIndex] || image[0];
    }
    return image;
  };

  const getNextImage = () => {
    if (!Array.isArray(image) || image.length <= 1) return null;
    return image[nextImageIndex];
  };

  const handleCardClick = () => {
    if ((Array.isArray(image) && image.length > 0) || models) {
      // Handle image/model click - could be expanded in future
    } else if (onClick) {
      onClick();
    } else {
      // No action needed
    }
  };

  const currentImage = getCurrentImage();
  const nextImage = getNextImage();
  const isClickable = (Array.isArray(image) && image.length > 0) || !!models;

  const renderImageContent = () => {
    if (!currentImage) return null;

    return (
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <img
          src={currentImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {nextImage && (
          <img
            src={nextImage}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              isTransitioning ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300 z-10"></div>

        {isClickable && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg">
              <svg
                className="w-8 h-8 text-amber-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderImageContentLarge = () => {
    if (!currentImage) return null;

    return (
      <div className="absolute inset-0">
        <img
          src={currentImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {nextImage && (
          <img
            src={nextImage}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              isTransitioning ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300 z-10"></div>

        {isClickable && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg">
              <svg
                className="w-12 h-12 text-amber-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (size === "medium") {
    return (
      <>
        <div
          className={`bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 relative group cursor-pointer ${className}`}
          onClick={handleCardClick}
        >
          {component ? (
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              {component}
            </div>
          ) : currentImage ? (
            renderImageContent()
          ) : (
            <div className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg">
              {emoji}
            </div>
          )}

          {Array.isArray(image) && image.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {image.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {bestseller && (
            <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-20">
              BESTSELLER
            </span>
          )}

          <div className="relative z-20 text-white">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-white/90 mb-4">{description}</p>
            {price && <span className="text-xl font-bold">{price}</span>}
          </div>
        </div>
      </>
    );
  }

  if (size === "large") {
    return (
      <>
        <div
          className={`bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl relative overflow-hidden group cursor-pointer ${className}`}
          onClick={handleCardClick}
        >
          {component ? (
            <div className="absolute inset-0">{component}</div>
          ) : currentImage ? (
            renderImageContentLarge()
          ) : (
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
          )}

          {Array.isArray(image) && image.length > 1 && (
            <div className="absolute bottom-16 left-8 flex space-x-2 z-30">
              {image.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute bottom-8 left-8 text-white z-30">
            {bestseller && (
              <span className="inline-block bg-yellow-400 text-amber-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                BESTSELLER
              </span>
            )}
            <h3 className="text-3xl font-bold mb-2">{title}</h3>
            <p className="text-lg opacity-90 mb-4">{description}</p>
            {price && <span className="text-2xl font-bold">{price}</span>}
          </div>

          {!component && !currentImage && emoji && (
            <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg z-20">
              {emoji}
            </div>
          )}
        </div>
      </>
    );
  }

  return null;
};

export default CollectionCard;
