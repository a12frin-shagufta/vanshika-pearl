import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";

const PLACEHOLDER_THUMB =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
       <rect width='100%' height='100%' fill='#f3f4f6'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
         fill='#9ca3af' font-family='Arial' font-size='14'>No media</text>
     </svg>`
  );

const urlFromAny = (val) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    for (const it of val) {
      const u = urlFromAny(it);
      if (u) return u;
    }
    return null;
  }
  if (typeof val === "object") {
    return (
      urlFromAny(val.secure_url) ||
      urlFromAny(val.url) ||
      urlFromAny(val.src) ||
      urlFromAny(val.path) ||
      urlFromAny(val.image) ||
      null
    );
  }
  return null;
};

const pickThumbMedia = (product, variant) => {
  const img = urlFromAny(variant?.images?.[0]) || urlFromAny(product?.image) || null;
  return { image: img, poster: img || PLACEHOLDER_THUMB };
};

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    products,
    currency,
    cartItems,
    delivery_fee,
    navigate,
    updateQuantityByKey,
    removeFromCartByKey,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const items = (cartItems || [])
      .map((ci) => {
        const product = products.find((p) => String(p._id) === String(ci.productId));
        if (!product) return null;

        let variant = null;
        if (ci.variantId) {
          variant = product.variants?.find((v) => String(v._id) === String(ci.variantId));
        }

        const { image, poster } = pickThumbMedia(product, variant);

        const priceToUse = product.finalPrice ?? product.price;
        const quantity = Math.max(1, Number(ci.quantity) || 1);

        return {
          cartKey: ci.cartKey,
          productId: ci.productId,
          name: product.name,
          image,
          poster,
          quantity,
          priceToUse,
          total: Number((quantity * priceToUse).toFixed(2)),
        };
      })
      .filter(Boolean);

    setCartData(items);
  }, [cartItems, products]);

  const subtotal = useMemo(() => {
    return cartData.reduce((sum, item) => sum + Number(item.total || 0), 0);
  }, [cartData]);

  const shipping = subtotal > 3000 ? 0 : Number(delivery_fee || 0);
  const grandTotal = subtotal + shipping;

  const handleCheckout = () => {
    onClose?.();
    navigate("/place-order");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[90%] sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-black/80">
                Your Cart ({cartData.length})
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close cart"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartData.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Your cart is empty 🛍️
                </div>
              ) : (
                cartData.map((item) => (
                  <div key={item.cartKey} className="flex gap-3 border p-3 rounded-lg">
                    <img
                      src={item.image || item.poster}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                      onError={(e) => {
                        e.currentTarget.src = item.poster || PLACEHOLDER_THUMB;
                      }}
                    />

                    <div className="flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="font-medium text-black/80 text-sm">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeFromCartByKey(item.cartKey)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        {currency} {item.priceToUse}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantityByKey(item.cartKey, item.quantity - 1)
                            }
                            className="px-3 py-1 hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantityByKey(item.cartKey, item.quantity + 1)
                            }
                            className="px-3 py-1 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-sm font-semibold text-[#eba5aa]">
                          {currency} {item.total}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer totals */}
            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">
                  {currency} {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <span>Delivery</span>
                <span className="font-medium">
                  {currency} {shipping}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-black/80">
                <span>Total</span>
                <span>
                  {currency} {grandTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cartData.length === 0}
                className={`w-full py-3 rounded-sm font-semibold transition ${
                  cartData.length === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#eba5aa] text-white hover:bg-amber-700"
                }`}
              >
                Checkout
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-sm font-medium border hover:bg-gray-50"
              >
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
