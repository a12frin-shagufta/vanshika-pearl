import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const pickFirstImage = (p) => p?.variants?.flatMap(v => v?.images || [])?.[0] || p?.images?.[0] || p?.image?.[0] || p?.image || p?.coverImage || p?.thumbnail || null;

const BestSeller = () => {
  const { products = [] } = useContext(ShopContext);

  const bestSeller = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products
      .filter((p) => p.bestseller)
      .filter((p) => {
        const okDate = p.createdAt && !isNaN(new Date(p.createdAt));
        const hasStock = (p.stock ?? 0) > 0 || p?.variants?.some((v) => (v?.stock ?? 0) > 0);
        return okDate && hasStock;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [products]);

  return (
    <section className="py-16 md:py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4A265] mb-3">Most Loved</p>
        <h2 className="text-3xl md:text-4xl font-light text-[#3D2B1F]">Bestsellers</h2>
        <div className="w-12 h-px bg-[#C4A265] mx-auto mt-4" />
      </div>

      {bestSeller.length === 0 ? (
        <div className="text-center py-14 bg-[#FAF6F1] border border-[#E8DDD3]">
          <p className="text-[#8B7355] text-sm">No bestsellers yet — check back soon.</p>
          <Link to="/collection">
            <button className="mt-5 px-6 py-2.5 text-xs tracking-[0.2em] uppercase bg-[#3D2B1F] text-white hover:bg-[#5C4A32] transition-colors">View All</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestSeller.map((item) => (
            <ProductItem key={item._id} id={item._id} image={pickFirstImage(item)} name={item.name} price={item.price} finalPrice={item.finalPrice} stock={item?.variants?.some(v => v.stock > 0) || item.stock > 0 ? 1 : 0} badgeType="bestseller" />
          ))}
        </div>
      )}

      {bestSeller.length > 0 && (
        <div className="text-center mt-10">
          <Link to="/collection?filter=bestseller">
            <button className="px-8 py-3 text-xs tracking-[0.2em] uppercase border border-[#3D2B1F] text-[#3D2B1F] hover:bg-[#3D2B1F] hover:text-white transition-all duration-300">
              View All Bestsellers
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default BestSeller;
