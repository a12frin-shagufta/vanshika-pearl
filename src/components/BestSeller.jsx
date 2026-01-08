import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const pickFirstImage = (p) => {
  return (
    p?.variants?.flatMap(v => v?.images || [])?.[0] ||
    p?.images?.[0] ||
    p?.image?.[0] ||
    p?.image ||
    p?.coverImage ||
    p?.thumbnail ||
    null
  );
};

const BestSeller = () => {
  const { products = [] } = useContext(ShopContext);

  const bestSeller = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products
      .filter((p) => p.bestseller)
      .filter((p) => {
        const okDate = p.createdAt && !isNaN(new Date(p.createdAt));
        const hasStock =
          (p.stock ?? 0) > 0 ||
          p?.variants?.some((v) => (v?.stock ?? 0) > 0);
        return okDate && hasStock;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [products]);

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-black/80">
          SHOP OUR BESTSELLER →
        </h2>
      </div>

      {bestSeller.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-600">No bestsellers yet — check back soon.</p>
          <Link to="/collection">
            <button className="mt-4 px-5 py-2 rounded-sm bg-[#eba5aa] text-white">
              View All
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={pickFirstImage(item)}
              name={item.name}
              price={item.price}
              finalPrice={item.finalPrice}
              stock={
                item?.variants?.some(v => v.stock > 0) || item.stock > 0 ? 1 : 0
              }
              badgeType="bestseller"
            />
          ))}
        </div>
      )}

      {bestSeller.length > 0 && (
        <div className="text-center mt-8">
          <Link to="/collection?filter=bestseller">
            <button className="px-6 py-2 rounded-sm bg-[#eba5aa] text-white">
              View All Bestsellers
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default BestSeller;
