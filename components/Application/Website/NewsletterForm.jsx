// components/Application/Website/NewsletterForm.jsx
'use client'
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Please enter an email.");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setMessage(data.message || "Failed to subscribe.");
      }
    } catch {
      setMessage("Error occurred. Try again.");
    }
  };

  return (
    <section className="bg-pink-50 py-10 text-center rounded-xl my-10">
      <h3 className="text-xl font-semibold mb-3">Stay Updated!</h3>
      <p className="text-gray-600 mb-4">
        Subscribe to our newsletter for latest deals and offers.
      </p>
      <form onSubmit={handleSubmit} className="flex justify-center gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-l border border-pink-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-pink-500 text-white px-4 rounded-r hover:bg-pink-600 transition">
          Subscribe
        </button>
      </form>
      {message && <p className="mt-3 text-gray-700">{message}</p>}
    </section>
  );
}
