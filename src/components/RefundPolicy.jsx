import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-700">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Refund Policy
      </h1>

      <p className="mb-6">
        Thank you for supporting <span className="font-semibold">Vanshine Collection</span>. 
        Each piece is handmade with care, so please read our policy below before purchasing.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          All Sales Are Final
        </h2>
        <p className="mb-4">
          Because every item is handmade and one of a kind, all sales are final. 
          We do not accept returns or exchanges for change of mind, buyer’s remorse, 
          or if you no longer want the item.
        </p>
        <p>
          Please note that resin is a handmade material. Small bubbles, slight color 
          variation, and minor natural imperfections are part of the art and are not 
          considered defects.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Damaged or Broken in Transit
        </h2>
        <p className="mb-4">
          We package every order carefully, but accidents can happen in shipping. 
          If your item arrives damaged or broken, we’ll make it right with a full 
          refund or a replacement — your choice.
        </p>

        <p className="mb-3 font-medium">
          To qualify for a refund or replacement, you must:
        </p>

        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li>
            Record an unboxing video that clearly shows the package being opened, 
            with the damage visible.
          </li>
          <li>
            Contact us and email the unboxing video along with clear photos of 
            the damage within <span className="font-semibold">48 hours of delivery</span>.
          </li>
        </ol>

        <p className="mb-4">
          The unboxing video is required. Without it, we are unable to approve a claim.
        </p>

        <p>
          We recommend filming your unboxing as soon as your package arrives. Once 
          we receive your video and photos, we’ll review your claim and respond as 
          quickly as possible.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Refunds
        </h2>
        <p className="mb-4">
          If your claim is approved and you choose a refund, it will be issued to 
          your original payment method within <span className="font-semibold">3–5 business days</span>.
        </p>

        <p className="mb-4">
          Depending on your bank or card provider, it may take a few additional days 
          for the funds to appear in your account.
        </p>

        <p>
          If you choose a replacement, we’ll send your new piece out as soon as possible 
          and share tracking details with you.
        </p>
      </section>

      <section className="border-t pt-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Contact Us
        </h2>
        <p className="mb-2">
          Have a question or need to report an issue? Reach out and we’ll be happy to help.
        </p>

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

export default RefundPolicy;