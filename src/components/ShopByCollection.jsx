import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopByCollection = ({ className = "" }) => {
  const { categories } = useContext(ShopContext);

  const categoryItems = useMemo(() => {
    return (categories || []).map((cat) => ({
      id: cat._id,
      name: cat.name,
      img: cat.image ? `${backendUrl}${cat.image}` : "/category-placeholder.png",
    }));
  }, [categories]);

  // ✅ Show loader instead of returning null
  if (!categories || categories.length === 0) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-black/80 font-light">
              SHOP OUR <span>CATEGORIES →</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-4 border-[#eba5aa] shadow-md bg-gray-200 animate-pulse" />
                <div className="mt-3 h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-black/80 font-light">
            SHOP OUR <span>CATEGORIES →</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryItems.map((cat) => (
            <Link
              key={cat.id}
              to={`/collection?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#eba5aa] shadow-md group-hover:shadow-lg transition">
                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/category-placeholder.png";
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h4 className="mt-3 text-sm sm:text-base md:text-lg font-semibold capitalize">
                {cat.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;
