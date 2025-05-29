import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Pricing = () => {
  const handleCheckout = async (plan) => {
    if (plan === "Free") {
      alert("You selected the Free plan!");
      return;
    }

    const res = await fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
          Simple & Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { plan: "Free", price: "0", features: ["1 Room", "Basic Support"] },
            {
              plan: "Pro",
              price: "9.99",
              features: ["Unlimited Rooms", "Priority Support"],
              popular: true,
            },
            {
              plan: "Team",
              price: "29.99",
              features: ["Collaboration", "Analytics", "Team Roles"],
            },
          ].map((tier, i) => (
            <div
              key={i}
              className={`relative bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md transition hover:shadow-xl ${
                tier.popular ? "border-4 border-indigo-500" : ""
              }`}
            >
              {tier.popular && (
                <span className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                {tier.plan}
              </h3>
              <p className="text-4xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
                ${tier.price}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> /mo</span>
              </p>
              <ul className="text-left space-y-3 text-gray-700 dark:text-gray-300">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span className="text-green-500">✔</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(tier.plan)}
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
