"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressStepper from "@/components/ProgressStepper";
import HeroImage from "@/components/HeroImage";
import SkipLink from "@/components/SkipLink";
import { bugFlags } from "@/lib/flags";

export default function PhoneSignup() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const buggy = bugFlags.noErrorRecovery;

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/[\s-]/g, "");
    return /^(\+?6)?0?1[0-9]{8,9}$/.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError(true);
      return;
    }
    setError(false);
    sessionStorage.setItem("bp_phone", phone);
    router.push("/signup/otp");
  };

  return (
    <div>
      <ProgressStepper currentStep={0} />
      <HeroImage />

      <h1 className="text-2xl font-bold text-brown-dark text-center mb-2">
        Join BrewPoints
      </h1>
      <p className="text-brown-medium text-center mb-6">
        Earn rewards with every cup. Enter your mobile number to get started.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brown-dark mb-1">
            Mobile Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-beige rounded-l-xl text-brown-medium text-sm border border-r-0 border-beige">
              +60
            </span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="12-345 6789"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError(false);
              }}
              className={`flex-1 px-4 py-3 rounded-r-xl border text-brown-dark bg-white placeholder:text-brown-medium/50 focus:outline-none focus:ring-2 focus:ring-terracotta ${
                error ? "border-red-500" : "border-beige"
              }`}
            />
          </div>
          {error && !buggy && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              Please enter a valid Malaysian mobile number (e.g. 012-345 6789)
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-terracotta hover:bg-terracotta-dark text-cream font-bold rounded-xl transition-colors"
        >
          Continue
        </button>
      </form>

      <SkipLink />
    </div>
  );
}
