import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products = [] } = useContext(ShopContext);
  const pickFirstImage = (p) => p?.images?.[0] || p?.variants?.[0]?.images?.[0] || p?.coverImage || p?.thumbnail || null;

  const latestProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];
    return [...products]
      .filter((p) => {
        const okDate = p.createdAt && !isNaN(new Date(p.createdAt));
        const hasStock = (typeof p.stock === "number" && p.stock > 0) || (Array.isArray(p.variants) && p.variants.some((v) => (v?.stock ?? 0) > 0));
        return okDate && hasStock;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [products]);

  return (
    <section className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4A265] mb-3">Just In</p>
        <h2 className="text-3xl md:text-4xl font-light text-[#3D2B1F]">New Arrivals</h2>
        <div className="w-12 h-px bg-[#C4A265] mx-auto mt-4" />
      </div>

      {latestProducts.length === 0 ? (
        <div className="text-center py-14 bg-[#FAF6F1] border border-[#E8DDD3]">
          <p className="text-[#8B7355] text-sm">No new arrivals right now — check back soon.</p>
          <Link to="/collection">
            <button className="mt-5 px-6 py-2.5 text-xs tracking-[0.2em] uppercase bg-[#3D2B1F] text-white hover:bg-[#5C4A32] transition-colors">
              View All
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {latestProducts.map((item) => (
            <ProductItem key={item._id} id={item._id} image={pickFirstImage(item)} name={item.name} price={item.price} finalPrice={item.finalPrice} stock={item.stock} badgeType={item.isNew ? "new" : item.isTrending ? "trend" : undefined} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestCollection;
