import React, { useState } from "react";

interface ProductData {
  name: string;
  description: string;
  size?: string;
  price: number;
  bestseller?: boolean;
  imgPath: string;
  modelPath: string;
  emoji?: string;
}

interface GalleryCardProps {
  size: "medium" | "large";
  data: ProductData | ProductData[];
  className?: string;
  onClick?: () => void;
  onView3D?: (product: ProductData) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  size,
  data,
  className = "",
  onClick,
  onView3D,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    width: number;
  } | null>(null);

  const products = Array.isArray(data) ? data : [data];
  const currentProduct = products[currentIndex];
  const hasMultipleProducts = products.length > 1;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMultipleProducts) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    setMousePosition({ x, width: rect.width });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  const showLeftButton =
    mousePosition && mousePosition.x < mousePosition.width / 2 - 40;
  const showRightButton =
    mousePosition && mousePosition.x > mousePosition.width / 2 + 40;

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      // No action needed
    }
  };

  const renderImageContent = () => {
    if (!currentProduct.imgPath) return null;

    return (
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <img
          src={currentProduct.imgPath}
          alt={currentProduct.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    );
  };

  const renderImageContentLarge = () => {
    if (!currentProduct.imgPath) return null;

    return (
      <div className="absolute inset-0">
        <img
          src={currentProduct.imgPath}
          alt={currentProduct.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    );
  };

  if (size === "medium") {
    return (
      <>
        <div
          className={`bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 relative group cursor-pointer ${className}`}
          onClick={handleCardClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {currentProduct.imgPath ? (
            renderImageContent()
          ) : (
            <div className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg">
              {currentProduct.emoji}
            </div>
          )}

          {hasMultipleProducts && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className={`absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/20 to-transparent transition-all duration-300 z-30 flex items-center justify-center rounded-l-3xl ${
                  showLeftButton ? "opacity-100" : "opacity-0 md:opacity-0"
                }`}
              >
                <div className="flex items-center space-x-1">
                  <div className="w-0.5 h-2 bg-white rounded-full"></div>
                  <div className="w-0.5 h-4 bg-white rounded-full"></div>
                  <div className="w-0.5 h-6 bg-white rounded-full"></div>
                </div>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className={`absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent transition-all duration-300 z-30 flex items-center justify-center rounded-r-3xl ${
                  showRightButton ? "opacity-100" : "opacity-0 md:opacity-0"
                }`}
              >
                <div className="flex items-center space-x-1">
                  <div className="w-0.5 h-6 bg-white rounded-full"></div>
                  <div className="w-0.5 h-4 bg-white rounded-full"></div>
                  <div className="w-0.5 h-2 bg-white rounded-full"></div>
                </div>
              </button>
            </>
          )}

          {hasMultipleProducts && (
            <div className="md:hidden absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-20">
              Tap to navigate
            </div>
          )}

          {hasMultipleProducts && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {products.map((_: ProductData, index: number) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {onView3D && currentProduct.modelPath && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView3D(currentProduct);
              }}
              className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white text-white rounded-full z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 pointer-events-auto overflow-hidden group/3d"
              title="Show 3D model"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
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
                <div className="w-0 group-hover/3d:w-16 transition-all duration-300 overflow-hidden">
                  <span className="text-xs whitespace-nowrap  mr-2">
                    Show 3D
                  </span>
                </div>
              </div>
            </button>
          )}

          <div className="relative z-20 text-white pointer-events-none">
            <h3 className="text-2xl font-bold mb-2">{currentProduct.name}</h3>
            <p className="text-white/90 mb-1 w-4/5">
              {currentProduct.description}
            </p>
            {currentProduct.size && (
              <p className="text-white/70 text-sm mb-2">
                Size: {currentProduct.size}
              </p>
            )}
            <span className="text-xl font-bold">${currentProduct.price}</span>
            {currentProduct.bestseller && (
              <div className="mt-11 ml-[-10px]">
                <span className="inline-block bg-yellow-400 text-amber-900 px-3 py-1 rounded-full text-sm font-bold">
                  BESTSELLER
                </span>
              </div>
            )}
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
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {currentProduct.imgPath ? (
            renderImageContentLarge()
          ) : (
            <div className="absolute inset-0 bg-black/30"></div>
          )}

          {hasMultipleProducts && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className={`absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black/30 to-transparent transition-all duration-300 z-30 flex items-center justify-center overflow-hidden ${
                  showLeftButton ? "opacity-100" : "opacity-0 md:opacity-0"
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <div className="w-1 h-4 bg-white rounded-full"></div>
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <div className="w-1 h-8 bg-white rounded-full"></div>
                </div>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className={`absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black/30 to-transparent transition-all duration-300 z-30 flex items-center justify-center overflow-hidden ${
                  showRightButton ? "opacity-100" : "opacity-0 md:opacity-0"
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <div className="w-1 h-8 bg-white rounded-full"></div>
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <div className="w-1 h-4 bg-white rounded-full"></div>
                </div>
              </button>
            </>
          )}

          {hasMultipleProducts && (
            <div className="md:hidden absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-20">
              Tap to navigate
            </div>
          )}

          {hasMultipleProducts && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
              {products.map((_: ProductData, index: number) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute bottom-10 left-8 text-white z-30 pointer-events-none">
            <div className="h-8 mb-4">
              {currentProduct.bestseller && (
                <span className="inline-block bg-yellow-400 text-amber-900 px-4 py-1 rounded-full text-sm font-bold">
                  BESTSELLER
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold mb-2">{currentProduct.name}</h3>
            <p className="text-lg opacity-90 mb-1">
              {currentProduct.description}
            </p>
            {currentProduct.size && (
              <p className="text-white/70 text-sm mb-2">
                Size: {currentProduct.size}
              </p>
            )}
            <span className="text-2xl font-bold">${currentProduct.price}</span>
          </div>

          {!currentProduct.imgPath && currentProduct.emoji && (
            <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg z-20">
              {currentProduct.emoji}
            </div>
          )}

          {onView3D && currentProduct.modelPath && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView3D(currentProduct);
              }}
              className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white text-white rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 group/3d overflow-hidden"
              title="Show 3D model"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
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
                <div className="w-0 group-hover/3d:w-24 transition-all duration-300 overflow-hidden">
                  <span className="text-sm whitespace-nowrap px-3">
                    Show 3D
                  </span>
                </div>
              </div>
            </button>
          )}
        </div>
      </>
    );
  }

  return null;
};

export default GalleryCard;
