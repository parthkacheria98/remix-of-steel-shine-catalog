import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  blend?: boolean;
}

export const ProductGallery = ({ images, productName, blend = false }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const blendClass = blend ? "mix-blend-multiply" : "";
  const hasMultiple = images.length > 1;

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-muted overflow-hidden border border-border group">
        <img
          src={images[activeIndex]}
          alt={productName}
          className={`w-full h-full object-cover ${blendClass}`}
        />
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/90 hover:bg-background border border-border rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/90 hover:bg-background border border-border rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/90 border border-border text-[11px] font-mono tracking-wider">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      {hasMultiple && (
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
