"use client";

import { bugFlags } from "@/lib/flags";

export default function HeroImage() {
  const buggy = bugFlags.heavyPayload;

  if (!buggy) {
    return (
      <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-terracotta-light to-terracotta flex items-center justify-center mb-6">
        <svg viewBox="0 0 120 120" className="w-20 h-20 opacity-90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 85 Q35 45 60 35 Q85 45 90 85 Z" fill="#FFF8F0" />
          <ellipse cx="60" cy="88" rx="32" ry="6" fill="#FFF8F0" opacity="0.3" />
          <path d="M45 55 Q50 40 60 38 Q70 40 75 55" stroke="#C75B39" strokeWidth="2" fill="none" />
          <path d="M55 30 Q58 20 60 18 Q62 20 65 30" stroke="#FFF8F0" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M50 33 Q54 22 57 20" stroke="#FFF8F0" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M63 20 Q66 22 70 33" stroke="#FFF8F0" strokeWidth="1.5" fill="none" opacity="0.4" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=95"
        alt="Coffee"
        width={1200}
        height={800}
        className="w-full h-48 object-cover rounded-2xl"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
