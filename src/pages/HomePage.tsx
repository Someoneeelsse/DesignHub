import React from "react";
import ImageModal from "../components/ImageModal";
import Collections from "../components/Collections";
import PartsCollectionShowcase from "../components/PartsCollectionShowcase";
import JourneyAndContact from "../components/JourneyAndContact";

const HomePage: React.FC = () => {
  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    initialIndex: number;
  }>({
    isOpen: false,
    initialIndex: 0,
  });

  const [floatingLights, setFloatingLights] = React.useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
      path: number;
    }>
  >([]);

  React.useEffect(() => {
    const generateRandomLights = () => {
      const lights = [];
      for (let i = 0; i < 30; i++) {
        lights.push({
          id: i,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 3,
          duration: Math.random() * 8 + 6,
          path: Math.floor(Math.random() * 8) + 1,
        });
      }
      setFloatingLights(lights);
    };

    generateRandomLights();
  }, []);

  const openModal = (initialIndex: number) => {
    setModalState({
      isOpen: true,
      initialIndex,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const collectionsSectionRef = React.useRef<HTMLDivElement>(null);
  const collectionsComponentRef = React.useRef<HTMLDivElement>(null);
  const partsCollectionRef = React.useRef<HTMLDivElement>(null);

  const scrollToCollections = () => {
    collectionsComponentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToPartsCollection = () => {
    partsCollectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToJourney = () => {
    const journeySection = document.querySelector('[data-section="journey"]');
    journeySection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const collections = [
    {
      src: "/images/Collections/BlueCollection.png",
      title: "Overland Signal Collection",
      description:
        "The Overland Signal Collection is built for functional roamers — those who cross campus paths, metro stations, and wooded shortcuts all in one day. Drawing from tactical gear and expedition influence, this look balances deep color contrasts, performance textures, and gear-forward aesthetics. With layered tones and rugged accents, it carries the weight of travel without sacrificing the ease of wear, ideal for students, tech creatives, or off-grid thinkers who need their gear to move as hard as they do.",
    },
    {
      src: "/images/Collections/OrangeCollection.png",
      title: "Urban Atlas Collection",
      description:
        "The Urban Atlas Collection is built for those who navigate the edges between grit and grace, where cobblestone backstreets meet art gallery openings and coffee-fueled mornings lead to rooftop nights. Drawing its spirit from the functionality of military wear and the charm of lived-in textures, this lineup isn’t just for travel — it’s for presence. Designed for creatives, explorers, and thinkers who never quite sit still, the collection balances raw material warmth with structured design, offering gear that feels just as at home in the back of a train as it does in a corner booth or studio floor.",
    },
    {
      src: "/images/Collections/GrayCollection.png",
      title: "Metro Stillness Collection",
      description:
        "The Metro Stillness Collection captures the simplicity of focus in a world that moves fast — muted tones, clean silhouettes, and smart textures that let the wearer speak before the clothes do. Designed for early train rides, after-hours edits, or any setting where sharp composure and quiet clarity matter more than noise, this look leans into refined minimalism with edge. It's not trying to be seen — but it always is.",
    },
    {
      src: "/images/Collections/YellowCollection.png",
      title: "Fieldform Archive Collection",
      description:
        "The Fieldform Archive Collection channels the utility of military surplus with a stripped-down, everyday twist — strong silhouettes, industrial touches, and tones that speak quietly but command space. This fit feels at home in motion: biking to a warehouse gig, walking through the edge of an industrial district, or catching golden-hour light across rooftops. Functional, firm, and grounded in purpose, it’s for the wearer who doesn’t follow trends — they sharpen them.",
    },
  ];

  const getColorClass = (title: string) => {
    switch (title) {
      case "Overland Signal Collection":
        return "blue";
      case "Urban Atlas Collection":
        return "orange";
      case "Metro Stillness Collection":
        return "gray";
      case "Bold Collection":
        return "yellow";
      default:
        return "gray";
    }
  };

  const getShortDescription = (title: string) => {
    switch (title) {
      case "Overland Signal Collection":
        return "Streetwear & urban style";
      case "Urban Atlas Collection":
        return "Retro-inspired designs";
      case "Metro Stillness Collection":
        return "Clean & sophisticated";
      case "Bold Collection":
        return "Statement pieces";
      default:
        return "Explore this collection";
    }
  };

  return (
    <div className="font-sans text-amber-900 overflow-x-hidden">
      <section className="relative min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingLights.map((light) => (
            <React.Fragment key={light.id}>
              <div
                className={`absolute rounded-full bg-orange-300 opacity-60 ${
                  light.size <= 3
                    ? "w-2 h-2"
                    : light.size <= 4
                    ? "w-3 h-3"
                    : light.size <= 5
                    ? "w-4 h-4"
                    : "w-5 h-5"
                }`}
                style={{
                  top: `${light.y}%`,
                  left: `${light.x}%`,
                  animation: `float-${light.path} ${light.duration}s ease-in-out infinite ${light.delay}s`,
                }}
              ></div>

              <div
                className={`absolute rounded-full bg-yellow-300 opacity-80 ${
                  light.size <= 3
                    ? "w-1 h-1"
                    : light.size <= 4
                    ? "w-1.5 h-1.5"
                    : light.size <= 5
                    ? "w-2 h-2"
                    : "w-2.5 h-2.5"
                }`}
                style={{
                  top: `${light.y}%`,
                  left: `${light.x}%`,
                  animation: `float-${light.path} ${
                    light.duration
                  }s ease-in-out infinite ${light.delay + 0.5}s`,
                }}
              ></div>
            </React.Fragment>
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 text-center text-white">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block bg-yellow-400 text-amber-900 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              Design • Showcase • Sell
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-4 sm:mb-6 leading-none">
            DESIGN<span className="text-yellow-300">HUB</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl font-light leading-relaxed px-4">
            Showcase your designs. Build your brand. Connect with buyers
            worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <button
              className="bg-white text-amber-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform duration-300 shadow-xl"
              onClick={scrollToJourney}
            >
              Showcase Your Designs →
            </button>
            <button
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-amber-900 transition-all duration-300"
              onClick={scrollToCollections}
            >
              Months Collections
            </button>
          </div>
        </div>
      </section>

      <div ref={collectionsComponentRef}>
        <Collections onViewParts={scrollToPartsCollection} />
      </div>

      <div ref={partsCollectionRef}>
        <PartsCollectionShowcase />
      </div>

      <JourneyAndContact />

      <section
        ref={collectionsSectionRef}
        className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 rounded-2xl p-6 sm:p-8 shadow-2xl border-4 border-white">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4">
                Designer Collections
              </h2>
              <p className="text-white/90 text-lg sm:text-xl font-medium">
                Showcase Your Style • Connect With Buyers • Build Your Brand
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {collections.map((collection, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-${getColorClass(
                    collection.title
                  )}-900/80 via-${getColorClass(
                    collection.title
                  )}-600/40 to-transparent z-10`}
                ></div>
                <img
                  src={collection.src}
                  alt={collection.title}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                    {collection.title}
                  </h3>
                  <p
                    className={`text-${getColorClass(
                      collection.title
                    )}-100 text-xs sm:text-sm`}
                  >
                    {getShortDescription(collection.title)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 sm:mt-22">
            <button
              className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl"
              onClick={() => openModal(0)}
            >
              Explore All Collections →
            </button>
            <div className="mt-4">
              <button
                className="border-2 border-orange-400 text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-orange-400 hover:text-white transition-all duration-300"
                onClick={() => {
                  const journeySection = document.querySelector(
                    '[data-section="journey"]'
                  );
                  journeySection?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                Journey Path
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8">
            Join Our Fast Growing Design Community
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 opacity-90">
            Share your designs, inspire others, build your collections.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-2">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-yellow-200">
                11
              </div>
              <div className="text-xs sm:text-sm opacity-80">
                Countries Selling
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-yellow-200">
                100K+
              </div>
              <div className="text-xs sm:text-sm opacity-80">Designs Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-yellow-200">
                50K+
              </div>
              <div className="text-xs sm:text-sm opacity-80">
                Happy Designers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-yellow-200">
                4.5★
              </div>
              <div className="text-xs sm:text-sm opacity-80">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Floating Lights Animations */
        @keyframes float-1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(25px, -20px) rotate(90deg); }
          50% { transform: translate(-15px, -35px) rotate(180deg); }
          75% { transform: translate(-20px, 15px) rotate(270deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(-35px, -25px) rotate(120deg); }
          66% { transform: translate(20px, -45px) rotate(240deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(40px, -15px) rotate(60deg); }
          50% { transform: translate(15px, -55px) rotate(120deg); }
          75% { transform: translate(-25px, -20px) rotate(180deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(-20px, -40px) rotate(90deg); }
          66% { transform: translate(35px, -30px) rotate(180deg); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(30px, -45px) rotate(45deg); }
          50% { transform: translate(-15px, -65px) rotate(90deg); }
          75% { transform: translate(-40px, -15px) rotate(135deg); }
        }
        
        @keyframes float-6 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(-45px, -20px) rotate(60deg); }
          66% { transform: translate(25px, -55px) rotate(120deg); }
        }
        
        @keyframes float-7 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(35px, -30px) rotate(30deg); }
          50% { transform: translate(-20px, -50px) rotate(60deg); }
          75% { transform: translate(-30px, -5px) rotate(90deg); }
        }
        
        @keyframes float-8 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(-30px, -35px) rotate(75deg); }
          66% { transform: translate(45px, -25px) rotate(150deg); }
        }
      `}</style>

      <ImageModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        collections={collections}
        initialIndex={modalState.initialIndex}
      />
    </div>
  );
};

export default HomePage;
