import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted overflow-hidden border border-border">
        <img
          src={images[activeIndex]}
          alt={productName}
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-20 h-20 border overflow-hidden transition-all ${
                i === activeIndex ? "border-primary shadow-soft" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`${productName} ${i + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
