import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-700">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Privacy Policy
      </h1>

      <p className="mb-6">
        At <span className="font-semibold">Vanshine Collection</span>, your privacy 
        matters to us. This policy explains what information we collect, how we use it, 
        and how we keep it safe.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Information We Collect
        </h2>

        <p className="mb-3">
          When you visit our site or place an order, we may collect:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Contact details</span> — your name, email 
            address, phone number, and shipping address.
          </li>
          <li>
            <span className="font-medium">Order details</span> — the items you purchase 
            and your order history.
          </li>
          <li>
            <span className="font-medium">Payment information</span> — processed securely 
            by our payment provider. We do not store your full card details on our website.
          </li>
          <li>
            <span className="font-medium">Browsing information</span> — basic data such as 
            your device type and how you use our site, which may be collected automatically 
            through cookies.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          How We Use Your Information
        </h2>

        <p className="mb-3">We use your information to:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Process and ship your orders.</li>
          <li>Send you order confirmations and updates.</li>
          <li>Respond to your questions and provide customer support.</li>
          <li>
            Send you marketing emails or newsletters only if you have opted in. 
            You can unsubscribe at any time using the link in our emails.
          </li>
          <li>Improve our website and overall customer experience.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          How We Share Your Information
        </h2>

        <p className="mb-3">
          We do not sell or rent your personal information.
        </p>

        <p className="mb-3">
          We only share it with trusted third parties who help us run our business, such as:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Our payment processor, to securely handle your payment.</li>
          <li>Our shipping carriers, to deliver your order.</li>
        </ul>

        <p className="mt-4">
          We may also share information if required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Cookies
        </h2>

        <p>
          Our website may use cookies to help it function properly and to understand 
          how visitors use the site. You can adjust your browser settings to limit 
          or block cookies, though some features may not work as well if you do.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Data Retention
        </h2>

        <p>
          We keep your information only as long as needed to fulfill your orders, 
          provide support, and meet legal or accounting requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Your Rights
        </h2>

        <p>
          You may request to access, correct, or delete the personal information we 
          hold about you. Just contact us using the details below and we’ll be glad 
          to help.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Children’s Privacy
        </h2>

        <p>
          Our website and products are not directed at children under{" "}
          <span className="font-semibold">13 years old</span>, and we do not knowingly 
          collect personal information from them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Changes to This Policy
        </h2>

        <p>
          We may update this Privacy Policy from time to time. Any changes take effect 
          as soon as they are posted on this page.
        </p>
      </section>

      <section className="border-t pt-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Contact Us
        </h2>

        <p className="mb-2">
          If you have any questions about this policy or your information, reach out:
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

export default PrivacyPolicy;