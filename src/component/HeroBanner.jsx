"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    tag: "Limited Time Offer",
    title: "Summer Sale",
    highlight: "50% OFF",
    subtitle: "On all summer essentials — sunscreen, hats, beachwear & more.",
    cta: "Shop Now",
    href: "/products",
    gradient: "from-sky-500 via-teal-500 to-cyan-600",
    emoji: "🌞",
  },
  {
    tag: "Today Only",
    title: "Hot Deals",
    highlight: "🔥",
    subtitle: "Flash deals on trending summer products. Don't miss out!",
    cta: "Grab Deals",
    href: "/products",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    emoji: "⚡",
  },
  {
    tag: "New Collection",
    title: "Fresh Arrivals",
    highlight: "Just In 🌊",
    subtitle: "Explore the latest summer styles added to our store.",
    cta: "Explore",
    href: "/products",
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    emoji: "✨",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className={`relative bg-gradient-to-br ${slide.gradient} transition-all duration-700 rounded-2xl overflow-hidden mx-2 sm:mx-4 mt-6 shadow-xl`}>
      <div className="absolute top-[-60px] right-[-60px] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 md:px-16 py-10 md:py-16 gap-6">
        <div className="text-white max-w-lg text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wide mb-3 sm:mb-4">
            {slide.tag}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-2">
            {slide.title}
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white/90 mb-3 sm:mb-4">
            {slide.highlight}
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md">
            {slide.subtitle}
          </p>
          <Link
            href={slide.href}
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-gray-800 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-all hover:scale-105 text-sm"
          >
            {slide.cta} →
          </Link>
        </div>

        <div className="text-[80px] sm:text-[120px] md:text-[160px] leading-none select-none">
          {slide.emoji}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/40 w-2"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
