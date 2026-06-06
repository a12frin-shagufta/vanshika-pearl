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

  if (!categories || categories.length === 0) {
    return (
      <section className={`py-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4A265] mb-3">Explore</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#3D2B1F]">Our Categories</h2>
            <div className="w-12 h-px bg-[#C4A265] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-[#E8DDD3] animate-pulse" />
                <div className="mt-4 h-3 w-20 bg-[#E8DDD3] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4A265] mb-3">Explore</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#3D2B1F]">Our Categories</h2>
          <div className="w-12 h-px bg-[#C4A265] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {categoryItems.map((cat) => (
            <Link
              key={cat.id}
              to={`/collection?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center"
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#E8DDD3] group-hover:border-[#C4A265] transition-all duration-500 shadow-sm group-hover:shadow-md">
                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = "/category-placeholder.png"; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h4 className="mt-4 text-xs sm:text-sm tracking-[0.15em] uppercase text-[#5C4A32] group-hover:text-[#C4A265] transition-colors font-medium">
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
