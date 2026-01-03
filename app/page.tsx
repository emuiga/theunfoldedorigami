"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { VideoBackground } from "@/components/VideoBackground";
import { PageHeader } from "@/components/PageHeader";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <VideoBackground />
      <PageHeader />
      {/* Blurred background heading */}
      <div className="fixed top-32 left-1/2 transform -translate-x-1/2 w-full z-0 pointer-events-none">
        <h1 className="text-4xl md:text-7xl lg:text-9xl font-light tracking-tight text-[var(--color-text-primary)] text-center blur-md md:blur opacity-30 md:opacity-40 px-4 md:px-6">
          Learning is a form of humility.
        </h1>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-56 pb-10">

        {/* Main Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-8"
        >
          <Image
            src="/pexels-padrinan-1272838-removebg-preview.png"
            alt="Origami"
            width={400}
            height={400}
            className="w-auto h-64 md:h-80 object-contain"
            priority
          />
        </motion.div>

        {/* Subtitle and CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="text-lg md:text-xl max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 300, fontStyle: 'italic', color: 'rgb(230, 213, 172)' }}>
            <p>Dust if you must, but wouldn't it be better<br/>
To paint a picture, or write a letter,<br/>
Bake a cake, or plant a seed;<br/>
Ponder the difference between want and need?</p>
            <p>Dust if you must, but there's not much time,<br/>
With rivers to swim, and mountains to climb;<br/>
Music to hear, and books to read;<br/>
Friends to cherish, and life to lead.</p>
            <p>Dust if you must, but the world's out there<br/>
With the sun in your eyes, and the wind in your hair;<br/>
A flutter of snow, a shower of rain,<br/>
This day will not come around again.</p>
            <p>Dust if you must, but bear in mind,<br/>
Old age will come and it's not kind.<br/>
And when you go (and go you must)<br/>
You, yourself, will make more dust.</p>
          </div>
          <p className="text-sm text-[rgb(230,213,172)] mt-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 300, fontStyle: 'italic' }}>
            ~ Rose Milligan
          </p>
          
          {/* Newsletter Subscription - Centered */}
          <div className="flex flex-col items-center gap-6 mt-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  disabled={loading}
                  className="px-6 py-3 bg-transparent border-2 border-[var(--color-button)] text-[var(--color-text-primary)] placeholder-[#666] focus:outline-none focus:border-[var(--color-accent-1)] transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-[var(--color-button)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-accent-2)] transition-colors rounded-full whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-[var(--color-accent-1)] text-lg">Thanks for subscribing!</p>
              </div>
            )}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
