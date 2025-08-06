import React from "react";

interface InfoPathCardProps {
  stepNumber: string;
  title: string;
  description: string;
  emoji: string;
  borderColor?: string;
  className?: string;
  onClick?: () => void;
}

const InfoPathCard: React.FC<InfoPathCardProps> = ({
  stepNumber,
  title,
  description,
  emoji,
  borderColor = "border-yellow-400",
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`relative group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div
        className={`bg-white rounded-2xl p-6 sm:p-8 h-56 sm:h-64 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border-l-4 ${borderColor}`}
      >
        <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{stepNumber}</div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-amber-800 mb-2">
            {title}
          </h3>
          <p className="text-amber-700 text-xs sm:text-sm">{description}</p>
        </div>
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm sm:text-lg">
        {emoji}
      </div>
    </div>
  );
};

export default InfoPathCard;
