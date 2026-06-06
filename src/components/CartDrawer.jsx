import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";

const PLACEHOLDER_THUMB =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='#F5F0EB'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#C4B5A5' font-family='serif' font-size='14'>No media</text></svg>`
  );

const urlFromAny = (val) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (Array.isArray(val)) { for (const it of val) { const u = urlFromAny(it); if (u) return u; } return null; }
  if (typeof val === "object") return urlFromAny(val.secure_url) || urlFromAny(val.url) || urlFromAny(val.src) || urlFromAny(val.path) || urlFromAny(val.image) || null;
  return null;
};

const pickThumbMedia = (product, variant) => {
  const img = urlFromAny(variant?.images?.[0]) || urlFromAny(product?.image) || null;
  return { image: img, poster: img || PLACEHOLDER_THUMB };
};

const CartDrawer = ({ isOpen, onClose }) => {
  const { products, currency, cartItems, delivery_fee, navigate, updateQuantityByKey, removeFromCartByKey } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const items = (cartItems || []).map((ci) => {
      const product = products.find((p) => String(p._id) === String(ci.productId));
      if (!product) return null;
      let variant = null;
      if (ci.variantId) variant = product.variants?.find((v) => String(v._id) === String(ci.variantId));
      const { image, poster } = pickThumbMedia(product, variant);
      const priceToUse = product.finalPrice ?? product.price;
      const quantity = Math.max(1, Number(ci.quantity) || 1);
      return { cartKey: ci.cartKey, productId: ci.productId, name: product.name, image, poster, quantity, priceToUse, total: Number((quantity * priceToUse).toFixed(2)) };
    }).filter(Boolean);
    setCartData(items);
  }, [cartItems, products]);

  const subtotal = useMemo(() => cartData.reduce((sum, item) => sum + Number(item.total || 0), 0), [cartData]);
  const shipping = subtotal > 3000 ? 0 : Number(delivery_fee || 0);
  const grandTotal = subtotal + shipping;

  const handleCheckout = () => { onClose?.(); navigate("/place-order"); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-[#3D2B1F]/50 z-50" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            className="fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-[#FFFBF5] z-50 shadow-2xl flex flex-col"
            initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E8DDD3] flex items-center justify-between">
              <h3 className="text-lg font-light text-[#3D2B1F] tracking-wide">Your Cart ({cartData.length})</h3>
              <button onClick={onClose} className="p-2 text-[#8B7355] hover:text-[#3D2B1F] transition-colors"><FiX className="text-lg" /></button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartData.length === 0 ? (
                <div className="text-center py-12 text-[#C4B5A5] text-sm">Your cart is empty</div>
              ) : (
                cartData.map((item) => (
                  <div key={item.cartKey} className="flex gap-3 p-3 bg-white border border-[#E8DDD3]">
                    <img src={item.image || item.poster} alt={item.name} className="w-16 h-16 object-cover" onError={(e) => { e.currentTarget.src = item.poster || PLACEHOLDER_THUMB; }} />
                    <div className="flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="text-xs font-medium text-[#3D2B1F] leading-snug">{item.name}</p>
                        <button onClick={() => removeFromCartByKey(item.cartKey)} className="text-[#C4B5A5] hover:text-[#8B7355] transition-colors"><FiTrash2 className="w-3.5 h-3.5" /></button>
                      </div>
                      <p className="text-xs text-[#8B7355] mt-1">{currency} {item.priceToUse}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#E8DDD3]">
                          <button onClick={() => updateQuantityByKey(item.cartKey, item.quantity - 1)} className="px-2.5 py-1 text-xs text-[#8B7355] hover:bg-[#F5F0EB]">-</button>
                          <span className="px-2.5 text-xs text-[#3D2B1F]">{item.quantity}</span>
                          <button onClick={() => updateQuantityByKey(item.cartKey, item.quantity + 1)} className="px-2.5 py-1 text-xs text-[#8B7355] hover:bg-[#F5F0EB]">+</button>
                        </div>
                        <p className="text-xs font-medium text-[#C4A265]">{currency} {item.total}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#E8DDD3] p-5 space-y-3">
              <div className="flex justify-between text-xs text-[#5C4A32]"><span>Subtotal</span><span>{currency} {subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-xs text-[#5C4A32]"><span>Delivery</span><span>{currency} {shipping}</span></div>
              <div className="flex justify-between text-sm font-medium text-[#3D2B1F] pt-2 border-t border-[#E8DDD3]"><span>Total</span><span>{currency} {grandTotal.toFixed(2)}</span></div>

              <button onClick={handleCheckout} disabled={cartData.length === 0}
                className={`w-full py-3 text-xs tracking-[0.2em] uppercase transition-all ${cartData.length === 0 ? "bg-[#E8DDD3] text-[#C4B5A5] cursor-not-allowed" : "bg-[#3D2B1F] text-white hover:bg-[#5C4A32]"}`}>
                Checkout
              </button>
              <button onClick={onClose} className="w-full py-3 text-xs tracking-[0.15em] uppercase border border-[#E8DDD3] text-[#5C4A32] hover:bg-[#F5F0EB] transition-colors">
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
