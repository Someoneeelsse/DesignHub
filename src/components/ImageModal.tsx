import React, { useState } from "react";

interface CollectionData {
  src: string;
  title: string;
  description: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  collections: CollectionData[];
  initialIndex?: number;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  collections,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    width: number;
  } | null>(null);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const currentCollection = collections[currentIndex];
  const hasMultipleCollections = collections.length > 1;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % collections.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + collections.length) % collections.length
    );
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMultipleCollections) return;

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative max-w-4xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 bg-white/90 hover:bg-white text-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          ✕
        </button>

        <div
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={currentCollection.src}
            alt={currentCollection.title}
            className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain"
          />

          {hasMultipleCollections && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className={`absolute left-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-r from-black/30 to-transparent transition-all duration-300 z-30 flex items-center justify-center overflow-hidden ${
                  showLeftButton ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center space-x-1 sm:space-x-1.5">
                  <div className="w-0.5 h-3 sm:h-4 bg-white rounded-full"></div>
                  <div className="w-0.5 h-4 sm:h-6 bg-white rounded-full"></div>
                  <div className="w-0.5 h-5 sm:h-8 bg-white rounded-full"></div>
                </div>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className={`absolute right-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-l from-black/30 to-transparent transition-all duration-300 z-30 flex items-center justify-center overflow-hidden ${
                  showRightButton ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center space-x-1 sm:space-x-1.5">
                  <div className="w-0.5 h-5 sm:h-8 bg-white rounded-full"></div>
                  <div className="w-0.5 h-4 sm:h-6 bg-white rounded-full"></div>
                  <div className="w-0.5 h-3 sm:h-4 bg-white rounded-full"></div>
                </div>
              </button>
            </>
          )}

          {hasMultipleCollections && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-30">
              {collections.map((_: CollectionData, index: number) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToIndex(index);
                  }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-8 bg-gradient-to-r from-orange-50 to-yellow-50">
          <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-3 sm:mb-4">
            {currentCollection.title}
          </h3>
          <p className="text-amber-700 text-base sm:text-lg leading-relaxed">
            {currentCollection.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
