// src/pages/PlaceOrder.jsx
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { motion } from "framer-motion";

const API_ORIGIN =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "");

const PlaceOrder = () => {
  const { cartItems, products, currency, delivery_fee, clearCart } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "US",      // 🌎 default country
    postalCode: "",
    note: "",
    paymentMethod: "stripe",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Map cart items to display + payload
  useEffect(() => {
    const items =
      (cartItems || [])
        .map((ci) => {
          const product = products?.find(
            (p) => String(p._id) === String(ci.productId)
          );
          if (!product) return null;

          const unitPrice = product.finalPrice ?? product.price ?? 0;
          const quantity = Math.max(0, Number(ci.quantity || 0));
          const engravingFirstName = (ci.engravingFirstName || "").trim();
          const engravingLastName = (ci.engravingLastName || "").trim();
          const cartKey =
            ci.cartKey ||
            `${ci.productId}__${ci.variantId || ci.variantColor || "default"}__fn_${engravingFirstName.toLowerCase()}__ln_${engravingLastName.toLowerCase()}`;

          return {
            _id: cartKey,
            productId: ci.productId,
            name: product.name,
            image:
              product?.variants?.[0]?.images?.[0] || product.image || null,
            unitPrice,
            quantity,
            total: unitPrice * quantity,
            engravingFirstName,
            engravingLastName,
            variantColor: ci.variantColor || "",
          };
        })
        .filter(Boolean) || [];

    setCartData(items);
  }, [cartItems, products]);

  const subtotal = cartData.reduce(
    (s, it) => s + (Number(it.total) || 0),
    0
  );
  const shipping = subtotal >= 3000 ? 0 : Number(delivery_fee || 0);
  const total = subtotal + shipping;

  const isValidEmail = (e) =>
    /^\S+@\S+\.[A-Za-z]{2,}$/.test((e || "").trim());

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // 🌎 Phone with all flags, default US
  const handlePhoneChange = (value) => {
    const formatted = value.startsWith("+") ? value : `+${value}`;
    setForm((p) => ({ ...p, phone: formatted }));
  };

  // Zip / postal validation for US & Canada
  const validatePostalCode = () => {
    const code = (form.postalCode || "").trim();
    if (!code) {
      toast.error("Please enter your ZIP / postal code.");
      return false;
    }

    if (form.country === "US") {
      // 12345 or 12345-6789
      const usZip = /^\d{5}(-\d{4})?$/;
      if (!usZip.test(code)) {
        toast.error("Please enter a valid US ZIP code (e.g. 10001 or 10001-1234).");
        return false;
      }
    }

    if (form.country === "CA") {
      // A1A 1A1 or A1A1A1
      const caPost = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      if (!caPost.test(code)) {
        toast.error("Please enter a valid Canadian postal code (e.g. A1A 1A1).");
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartData.length === 0) return toast.error("Your cart is empty.");
    if (!isValidEmail(form.email))
      return toast.error("Please enter a valid email.");

    if (!form.name || !form.address || !form.city || !form.state) {
      return toast.error("Please complete shipping details.");
    }

    // 🌎 Only allow US & Canada
    const allowedCountries = ["US", "CA"];
    if (!allowedCountries.includes(form.country)) {
      return toast.error("We currently only deliver within the United States and Canada.");
    }

    if (!validatePostalCode()) return;

    setIsSubmitting(true);
    try {
      const itemsPayload = cartData.map((it) => ({
        productId: it.productId,
        key: it._id,
        name: it.name,
        image: it.image,
        variantColor: it.variantColor || "",
        quantity: Number(it.quantity),
        unitPrice: Number(it.unitPrice),
        total: Number(it.total),
        engravingFirstName: it.engravingFirstName || "",
        engravingLastName: it.engravingLastName || "",
      }));

      const orderPayload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,       // 🌎 send country
        postalCode: form.postalCode, // 🌎 send postal
        note: form.note,
        items: itemsPayload,
        subtotal,
        shipping,
        total,
      };

      // 1) create DB order
      const createRes = await axios.post(
        `${API_ORIGIN}/api/order/create`,
        orderPayload,
        { timeout: 60000 }
      );
      if (!createRes?.data?.success)
        throw new Error(
          createRes?.data?.message || "Order creation failed"
        );

      const orderId = createRes.data.orderId;
      if (!orderId) throw new Error("Server didn't return orderId");

      // 2) request Stripe checkout session URL
      const checkoutRes = await axios.post(
        `${API_ORIGIN}/api/order/payment/stripe-checkout`,
        {
          orderId,
          redirectPath: "thank-you",
        },
        { timeout: 60000 }
      );

      if (
        !checkoutRes?.data?.success ||
        !checkoutRes.data.checkoutUrl
      ) {
        throw new Error(
          checkoutRes?.data?.message ||
            "Failed to create Stripe checkout"
        );
      }

      // clear cart locally (optional – or clear after success page)
      clearCart && clearCart();

      // Redirect to Stripe Checkout
      window.location.href = checkoutRes.data.checkoutUrl;
    } catch (err) {
      console.error("PlaceOrder error:", err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to place order"
      );
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    cartData.length > 0 &&
    isValidEmail(form.email) &&
    form.name &&
    form.address &&
    form.city &&
    form.state &&
    form.postalCode &&
    form.country;

  return (
    <div className="max-w-6xl mx-auto px-2 py-5">
      <div className="bg-white p-2 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Complete Your Order
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <form
              onSubmit={handlePlaceOrder}
              className="space-y-6"
            >
              {/* Contact info */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInput}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"us"}                 // 🇺🇸 default
                      enableSearch={true}           // search all countries
                      countryCodeEditable={false}
                      value={form.phone}
                      onChange={handlePhoneChange}
                      inputClass="w-full p-3 border rounded-md focus:ring-amber-500 focus:border-amber-500"
                      buttonClass="border border-gray-300"
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleInput}
                      required
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  {/* Country + Postal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleInput}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleInput}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleInput}
                      required
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleInput}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State / Province
                      </label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleInput}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="">Select state / province</option>
                        {/* US states (common) */}
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>Arizona</option>
                        <option>California</option>
                        <option>Colorado</option>
                        <option>Florida</option>
                        <option>Georgia</option>
                        <option>Illinois</option>
                        <option>Massachusetts</option>
                        <option>New Jersey</option>
                        <option>New York</option>
                        <option>Ohio</option>
                        <option>Pennsylvania</option>
                        <option>Texas</option>
                        <option>Washington</option>
                        {/* Canada (a few main) */}
                        <option>Ontario</option>
                        <option>Quebec</option>
                        <option>British Columbia</option>
                        <option>Alberta</option>
                        <option>Manitoba</option>
                        <option>Nova Scotia</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="note"
                      value={form.note}
                      onChange={handleInput}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                whileTap={{ scale: canSubmit && !isSubmitting ? 0.97 : 1 }}
                className={`w-full py-3 rounded-md font-medium text-lg ${
                  !canSubmit || isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                } transition-colors`}
              >
                {isSubmitting
                  ? "Processing..."
                  : `Pay ${currency} ${total.toFixed(2)} (Stripe)`}
              </motion.button>
            </form>
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="mb-4 max-h-64 overflow-y-auto">
                {cartData.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-800">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {item.total.toFixed(2)} {currency}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {subtotal.toFixed(2)} {currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping.toFixed(2)} {currency}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-800">
                    Total
                  </span>
                  <span className="text-lg font-bold text-amber-700">
                    {currency} {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-md">
                <p className="text-sm text-amber-800 text-center">
                  You will be redirected to Stripe to complete secure
                  payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
