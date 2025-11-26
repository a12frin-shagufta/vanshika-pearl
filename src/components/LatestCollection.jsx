// LatestCollection.jsx
import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", damping: 16, stiffness: 120 } },
};

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const LatestCollection = () => {
  const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'>
       <rect width='100%' height='100%' fill='#f3f4f6'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
         fill='#9ca3af' font-family='Arial' font-size='28'>Preview</text>
     </svg>`
  );
  const { products = [] } = useContext(ShopContext);
  // helper right before return/map (inline or as a small function)
// Put these above latestProducts useMemo
const urlFromAny = (val) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    for (const item of val) {
      const u = urlFromAny(item);
      if (u) return u;
    }
    return null;
  }
  if (typeof val === "object") {
    // handle common shapes: Cloudinary, generic objects, nested
    return (
      urlFromAny(val.secure_url) ||
      urlFromAny(val.url) ||
      urlFromAny(val.src) ||
      urlFromAny(val.path) ||
      urlFromAny(val.image) ||
      urlFromAny(val.previewUrl) ||
      null
    );
  }
  return null;
};

const pickFirstImage = (p) => {
  const candidates = [
    ...(p.variants?.flatMap(v => v?.images ?? []) ?? []),
    p.images,
    p.image,
    p.gallery,
    p.coverImage,
    p.thumbnail,
  ];
  for (const c of candidates) {
    const u = urlFromAny(c);
    if (u) return u;
  }
  return null;
};

const pickFirstVideo = (p) => {
  const candidates = [
    ...(p.variants?.flatMap(v => v?.videos ?? []) ?? []),
    p.videos,
    p.video,
    p.media,
  ];
  for (const c of candidates) {
    const u = urlFromAny(c);
    if (u) return u;
  }
  return null;
};



  // derive latestProducts (auto-updates when `products` changes)
  const latestProducts = useMemo(() => {
    
    if (!Array.isArray(products) || products.length === 0) return [];

    return [...products]
      .filter((p) => {
        // ensure valid date and available stock (either top-level stock or at least one variant in stock)
        const okDate = p.createdAt && !isNaN(new Date(p.createdAt));
        const hasStock =
          (typeof p.stock === "number" && p.stock > 0) ||
          (Array.isArray(p.variants) && p.variants.some((v) => typeof v.stock === "number" ? v.stock > 0 : (v?.stock > 0)));
        return okDate && hasStock;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4); // <-- only keep up to 4 newest
  }, [products]);
  console.log("🔥 Latest Products (after filtering):", latestProducts);


  // lightweight loading / empty handling
  if (!products) {
    return null; // or skeleton
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div variants={fadeInUp} className="text-center mb-8">
         <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-black/80 mb-4">
          NEW <span className=" bg-clip-text ">ARRIVAL  →</span>
        </h2>
        {/* <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Freshly added - our latest handcrafted pieces.
        </p> */}
      </motion.div>

      {latestProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-600">No new arrivals right now — check back soon.</p>
          <Link to="/collection">
            <button className="mt-4 px-5 py-2 rounded-full bg-amber-600 text-white">View All</button>
          </Link>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
        >
       {latestProducts.map((item, idx) => {
  const img = pickFirstImage(item) || PLACEHOLDER;   // <-- ensure fallback
  const vid = pickFirstVideo(item) || null;
  
  console.log("Resolved image for", item.name, "=>", img);
  console.log("🖼️ Image resolved:", {
  name: item.name,
  img,
  rawImage: item.image,
  rawImages: item.images,
  variants: item.variants,
});
// should show the list of product card elements
document.querySelectorAll('.group').length

  return (
    <motion.div key={item._id || idx} variants={itemVariants} whileHover={{ y: -6 }}>
      <ProductItem
        id={item._id}
        image={img}
        video={vid}
        name={item.name}
        price={item.price}
        finalPrice={item.finalPrice ?? item.price}
        stock={item.stock}
        badgeType={item.isNew ? "new" : item.isTrending ? "trend" : undefined}
      />
    </motion.div>
  );
})}


        </motion.div>
      )}

      {/* optional CTA */}
      
    </motion.section>
  );
};

export default LatestCollection;
