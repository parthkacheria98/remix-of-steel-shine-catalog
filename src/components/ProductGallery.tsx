import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  blend?: boolean;
}

export const ProductGallery = ({ images, productName, blend = false }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const blendClass = blend ? "mix-blend-multiply" : "";

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted overflow-hidden border border-border">
        <img
          src={images[activeIndex]}
          alt={productName}
          className={`w-full h-full object-cover ${blendClass}`}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-20 h-20 border overflow-hidden transition-all ${
                i === activeIndex ? "border-primary shadow-soft" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`${productName} ${i + 1}`} className={`w-full h-full object-cover ${blendClass}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
