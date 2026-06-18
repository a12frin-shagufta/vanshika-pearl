import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-700">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Terms & Conditions
      </h1>

      <p className="mb-6">
        Welcome to <span className="font-semibold">Vanshine Collection</span>. 
        By browsing our website and placing an order, you agree to the terms below. 
        Please read them carefully.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          About Our Products
        </h2>
        <p className="mb-4">
          Every item we sell is handmade resin art. Because each piece is made by hand, 
          no two are exactly alike.
        </p>
        <p>
          Small bubbles, slight color variations, and minor natural imperfections are 
          normal characteristics of handmade resin and are not considered defects.
          Colors may also appear slightly different in person than they do on your 
          screen, depending on your device and lighting.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Product Care & Safety
        </h2>

        <p className="mb-3">
          Resin pieces are decorative. To keep your item looking its best:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Keep it out of direct, prolonged sunlight, as resin can yellow over time.</li>
          <li>Avoid exposing it to excessive heat.</li>
          <li>Clean gently with a soft, dry cloth.</li>
          <li>
            Unless a product is clearly labeled as food-safe, please do not use it 
            for food or drink.
          </li>
          <li>Keep small pieces away from young children and pets.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Pricing & Payment
        </h2>
        <p className="mb-4">
          All prices are listed in <span className="font-semibold">US Dollars (USD)</span>.
        </p>
        <p>
          We reserve the right to update prices, products, and availability at any time. 
          Payment is processed securely at checkout, and your order is confirmed once 
          payment is received.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Shipping
        </h2>
        <p className="mb-4">
          We currently ship within the <span className="font-semibold">United States only</span>.
        </p>
        <p className="mb-4">
          Estimated delivery times are provided at checkout and are not guaranteed, 
          as delays can occur with the carrier.
        </p>
        <p>
          If your item arrives damaged, it is covered under our Refund Policy. 
          Please review that policy for full details on how to file a claim.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Returns & Refunds
        </h2>
        <p>
          Because our pieces are handmade and one of a kind, all sales are final. 
          Refunds and replacements are only offered for items damaged in transit, 
          as described in our Refund Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Intellectual Property
        </h2>
        <p>
          All content on this website — including designs, photos, text, and our logo — 
          belongs to <span className="font-semibold">Vanshine Collection</span>. 
          Please do not copy, reproduce, or use our content or designs without our 
          written permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Limitation of Liability
        </h2>
        <p>
          Our products are intended for decorative use. To the fullest extent permitted 
          by law, Vanshine Collection is not liable for any indirect or incidental damages 
          arising from the use or misuse of our products.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Changes to These Terms
        </h2>
        <p>
          We may update these Terms & Conditions from time to time. Any changes take 
          effect as soon as they are posted on this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Governing Law
        </h2>
        <p>
          These terms are governed by the laws of the{" "}
          <span className="font-semibold">
            State of New Jersey, United States
          </span>.
        </p>
      </section>

      <section className="border-t pt-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Contact Us
        </h2>
        <p className="mb-2">Questions about these terms? Get in touch:</p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          vanshinecollection@gmail.com
        </p>

        <p>
          <span className="font-semibold">Phone:</span>{" "}
          +1 (973) 974-0185
        </p>
      </section>
    </div>
  );
};

export default TermsConditions;