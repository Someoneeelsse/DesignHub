import React, { useState, lazy, Suspense } from "react";
import GalleryCard from "./GalleryCard";
import productsData from "../data/products.json";

const Product3DViewer = lazy(() => import("./Product3DViewer"));

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

const PartsCollectionShowcase: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [show3DViewer, setShow3DViewer] = useState(false);

  const scrollToJourney = () => {
    const journeySection = document.querySelector('[data-section="journey"]');
    journeySection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleView3D = (product: ProductData) => {
    setSelectedProduct(product);
    setShow3DViewer(true);
  };

  const close3DViewer = () => {
    setShow3DViewer(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-20  bg-white px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
            Individual Pieces
          </h2>
          <p className="text-amber-700 text-xl">
            Standalone designs for your unique collections
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
          <div className="lg:col-span-8">
            <GalleryCard
              size="large"
              data={[
                productsData.jackets.jacket1,
                productsData.jackets.jacket2,
                productsData.jackets.jacket3,
                productsData.jackets.jacket4,
              ]}
              className="h-[400px] lg:h-full"
              onView3D={handleView3D}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <GalleryCard
              size="medium"
              data={[
                productsData.pants.pants1,
                productsData.pants.pants2,
                productsData.pants.pants3,
                productsData.pants.pants4,
              ]}
              className="flex-1"
              onView3D={handleView3D}
            />
            <GalleryCard
              size="medium"
              data={[
                productsData.backpacks.backpack1,
                productsData.backpacks.backpack2,
                productsData.backpacks.backpack3,
                productsData.backpacks.backpack4,
              ]}
              className="flex-1"
              onView3D={handleView3D}
            />
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={scrollToJourney}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl"
          >
            Ready to launch your brand?
          </button>
        </div>
      </div>
      {show3DViewer && selectedProduct && (
        <Suspense fallback={<div>Loading 3D Viewer...</div>}>
          <Product3DViewer
            modelPath={selectedProduct.modelPath}
            product={selectedProduct}
            onClose={close3DViewer}
          />
        </Suspense>
      )}
    </section>
  );
};

export default PartsCollectionShowcase;
