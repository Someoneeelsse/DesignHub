import React from "react";
import GalleryCard from "./GalleryCard";
import productsData from "../data/products.json";

const SignatureCollections: React.FC = () => {
  return (
    <section className="py-20 bg-white px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
            Signature Collections
          </h2>
          <p className="text-amber-700 text-xl">
            Curated gear for every type of explorer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
          <GalleryCard
            size="large"
            data={[
              productsData.jackets.jacket1,
              productsData.jackets.jacket2,
              productsData.jackets.jacket3,
              productsData.jackets.jacket4,
            ]}
            className="lg:col-span-8"
          />

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
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureCollections;
