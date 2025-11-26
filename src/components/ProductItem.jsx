// src/components/ProductItem.jsx
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const SCALES = [320, 480, 640, 768, 960, 1200];

const buildSrc = (url, w) => {
  try {
    // Cloudinary-friendly: add params if you use Cloudinary
    // return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
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
    id, slug, image, name, category,
    price, finalPrice, stock, badgeType,
    imgWidth = 1000, imgHeight = 1250, isPriority = false,
  } = props;

  const { currency } = useContext(ShopContext);

  const placeHolder = useMemo(() =>
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='${imgWidth}' height='${imgHeight}'><rect width='100%' height='100%' fill='#f6f7f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9aa3af' font-family='Arial' font-size='14'>Preview</text></svg>`
    ), [imgWidth, imgHeight]
  );

  // Resolve incoming `image` which may be string | array | object
  const baseSrc = useMemo(() => {
    if (!image) return placeHolder;
    if (typeof image === "string") return image;
    if (Array.isArray(image) && image.length > 0) return image[0];
    if (typeof image === "object") {
      // Common Cloudinary object shapes
      return image.secure_url || image.url || image.src || image.path || image.image || placeHolder;
    }
    return placeHolder;
  }, [image, placeHolder]);

  const { src, srcSet } = useMemo(() => {
    try {
      if (!baseSrc || baseSrc.startsWith("data:") || baseSrc.startsWith("/placeholder")) {
        return { src: baseSrc, srcSet: undefined };
      }
      const set = SCALES.map(w => `${buildSrc(baseSrc, w)} ${w}w`).join(", ");
      return { src: buildSrc(baseSrc, 640), srcSet: set };
    } catch {
      return { src: baseSrc, srcSet: undefined };
    }
  }, [baseSrc]);

  const effFinal = Number(finalPrice || price || 0);
  const effPrice = Number(price || effFinal || 0);
  const hasDiscount = effFinal > 0 && effPrice > 0 && effFinal < effPrice;
  const discount = hasDiscount ? Math.round(((effPrice - effFinal) / effPrice) * 100) : 0;

  const Badge = () => {
    if (badgeType === "trend")
      return <span className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] px-2 py-1 rounded-full shadow font-bold z-10">🔥 TRENDING</span>;
    if (badgeType === "bestseller")
      return <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-[10px] px-2 py-1 rounded-full shadow font-bold z-10">⭐ BESTSELLER</span>;
    if (stock === 0)
      return <span className="absolute top-2 left-2 bg-gray-900/85 text-white text-[10px] px-2 py-1 rounded z-10">❌ Out of Stock</span>;
    return null;
  };

  return (
    <div className="rounded-md overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition mx-1">
      <Link to={`/product/${slug || id}`} className="block">
        <div className="relative aspect-[3/4] bg-gray-50">
          <img
            src={src}
            srcSet={srcSet}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt={name}
            width={imgWidth}
            height={imgHeight}
            loading={isPriority ? "eager" : "lazy"}
            fetchpriority={isPriority ? "high" : "low"}
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeHolder;
              e.currentTarget.removeAttribute("srcset");
              e.currentTarget.removeAttribute("sizes");
            }}
            className="w-full h-full object-cover transition-transform duration-300 will-change-transform hover:scale-[1.02]"
            style={{ contentVisibility: "auto" }}
          />
          <Badge />
        </div>

        <div className="px-2 py-2 sm:px-3">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] sm:text-base font-semibold text-gray-900 truncate" title={name}>{name}</p>
            {category && <p className="text-xs text-gray-500 truncate">{category}</p>}
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-900">
                {currency} {Math.round(effFinal).toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {currency} {Math.round(effPrice).toLocaleString()}
                </span>
              )}
            </div>
            {hasDiscount && (
              <div className="mt-0.5">
                <span className="text-[9px] font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-sm inline-block">
                  {discount}% OFF
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
});

export default ProductItem;
