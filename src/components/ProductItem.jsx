import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const SCALES = [320, 480, 640, 768, 960, 1200];

const buildSrc = (url, w) => {
  try {
    const u = new URL(url, window.location.origin);
    u.searchParams.set("w", String(w));
    u.searchParams.set("q", "70");
    u.searchParams.set("auto", "format");
    return u.toString();
  } catch {
    return url;
  }
};

const ProductItem = React.memo(function ProductItem(props) {
  const {
    id, slug, image, name, category, price, finalPrice, stock, badgeType,
    imgWidth = 1000, imgHeight = 1250, isPriority = false,
  } = props;

  const { currency } = useContext(ShopContext);

  const placeHolder = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${imgWidth}' height='${imgHeight}'><rect width='100%' height='100%' fill='#F5F0EB'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#C4B5A5' font-family='serif' font-size='14'>Preview</text></svg>`
      ),
    [imgWidth, imgHeight]
  );

  const baseSrc = useMemo(() => {
    if (!image) return placeHolder;
    if (typeof image === "string") return image;
    if (Array.isArray(image) && image.length > 0) return image[0];
    if (typeof image === "object") {
      return image.secure_url || image.url || image.src || image.path || image.image || placeHolder;
    }
    return placeHolder;
  }, [image, placeHolder]);

  const { src, srcSet } = useMemo(() => {
    try {
      if (!baseSrc || baseSrc.startsWith("data:")) return { src: baseSrc, srcSet: undefined };
      const set = SCALES.map((w) => `${buildSrc(baseSrc, w)} ${w}w`).join(", ");
      return { src: buildSrc(baseSrc, 640), srcSet: set };
    } catch {
      return { src: baseSrc, srcSet: undefined };
    }
  }, [baseSrc]);

  const effFinal = Number(finalPrice || price || 0);
  const effPrice = Number(price || effFinal || 0);
  const hasDiscount = effFinal < effPrice;
  const discount = hasDiscount ? Math.round(((effPrice - effFinal) / effPrice) * 100) : 0;

  const Badge = () => {
    if (badgeType === "trend")
      return <span className="absolute top-3 left-3 bg-[#C4A265] text-white text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 z-10">Trending</span>;
    if (badgeType === "bestseller")
      return <span className="absolute top-3 left-3 bg-[#5C4A32] text-white text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 z-10">Bestseller</span>;
    if (stock === 0)
      return <span className="absolute top-3 left-3 bg-[#3D2B1F]/80 text-white text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 z-10">Sold Out</span>;
    return null;
  };

  return (
    <div className="h-full flex flex-col bg-[#FAF6F1] group">
      <Link to={`/product/${slug || id}`} className="block h-full flex flex-col">
        <div className="relative h-56 sm:h-64 md:h-72 bg-[#F5F0EB] overflow-hidden">
          <img
            src={src}
            srcSet={srcSet}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt={name}
            loading={isPriority ? "eager" : "lazy"}
            fetchpriority={isPriority ? "high" : "low"}
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeHolder;
              e.currentTarget.removeAttribute("srcset");
              e.currentTarget.removeAttribute("sizes");
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Badge />
        </div>

        <div className="px-3 py-3 sm:px-4 sm:py-4 flex flex-col flex-grow">
          <p className="text-[12px] sm:text-[13px] tracking-wide text-[#3D2B1F] line-clamp-2 leading-relaxed font-medium" title={name}>
            {name}
          </p>

          {category && (
            <p className="mt-1 text-[10px] tracking-[0.1em] uppercase text-[#C4B5A5]">{category}</p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-medium text-[#3D2B1F]">
              {currency} {Math.round(effFinal).toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-[#C4B5A5] line-through">
                {currency} {Math.round(effPrice).toLocaleString()}
              </span>
            )}
          </div>

          {hasDiscount && (
            <span className="mt-1.5 text-[9px] tracking-[0.1em] uppercase font-medium text-[#C4A265] bg-[#C4A265]/10 px-2 py-0.5 inline-block w-fit">
              {discount}% off
            </span>
          )}
        </div>
      </Link>
    </div>
  );
});

export default ProductItem;
