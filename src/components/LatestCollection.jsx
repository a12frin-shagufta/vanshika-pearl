import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products = [] } = useContext(ShopContext);
const pickFirstImage = (p) => {
  return (
    p?.images?.[0] ||
    p?.variants?.[0]?.images?.[0] ||
    p?.coverImage ||
    p?.thumbnail ||
    null
  );
};


  const latestProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];

    return [...products]
      .filter((p) => {
        const okDate = p.createdAt && !isNaN(new Date(p.createdAt));
        const hasStock =
          (typeof p.stock === "number" && p.stock > 0) ||
          (Array.isArray(p.variants) &&
            p.variants.some((v) => (v?.stock ?? 0) > 0));
        return okDate && hasStock;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [products]);

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-black/80">
          NEW ARRIVAL →
        </h2>
      </div>

      {latestProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-600">
            No new arrivals right now — check back soon.
          </p>
          <Link to="/collection">
            <button className="mt-4 px-5 py-2 rounded-sm bg-[#eba5aa] text-white">
              View All
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {latestProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={pickFirstImage(item)}
              name={item.name}
              price={item.price}
              finalPrice={item.finalPrice}
              stock={item.stock}
              badgeType={item.isNew ? "new" : item.isTrending ? "trend" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestCollection;
