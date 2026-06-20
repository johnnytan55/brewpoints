"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressStepper from "@/components/ProgressStepper";
import SkipLink from "@/components/SkipLink";
import { bugFlags } from "@/lib/flags";

const OTP_CODE = "1234";

export default function OtpVerify() {
  const router = useRouter();
  const buggyAdvance = bugFlags.otpAutoadvance;
  const buggyTiny = bugFlags.tinyOtpBoxes;
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (buggyAdvance) {
      if (value.length > 1) {
        return;
      }
      const next = [...digits];
      next[index] = value.replace(/\D/g, "").slice(-1);
      setDigits(next);
      setError("");
      if (value && index < 3) {
        focusInput(index + 1);
      }
    } else {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 4) {
        const pasted = cleaned.slice(0, 4).split("");
        const next = [...digits];
        pasted.forEach((d, i) => {
          if (i < 4) next[i] = d;
        });
        setDigits(next);
        setError("");
        focusInput(Math.min(pasted.length, 3));
        return;
      }
      const next = [...digits];
      next[index] = cleaned.slice(-1);
      setDigits(next);
      setError("");
      if (cleaned && index < 3) {
        focusInput(index + 1);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (buggyAdvance) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length > 0) {
      const next = [...digits];
      pasted.split("").forEach((d, i) => {
        if (i < 4) next[i] = d;
      });
      setDigits(next);
      setError("");
      focusInput(Math.min(pasted.length, 3));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code === OTP_CODE) {
      sessionStorage.setItem("bp_verified", "true");
      router.push("/signup/profile");
    } else {
      setError("Incorrect code. Please try again.");
    }
  };

  const boxSize = buggyTiny ? "w-10 h-10 text-lg" : "w-14 h-14 text-2xl";
  const boxGap = buggyTiny ? "gap-1.5" : "gap-3";

  return (
    <div>
      <ProgressStepper currentStep={1} />

      <h1 className="text-2xl font-bold text-brown-dark text-center mb-2 mt-6">
        Verify Your Number
      </h1>
      <p className="text-brown-medium text-center mb-8">
        We sent a 4-digit code to your phone
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`flex justify-center ${boxGap}`}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={buggyAdvance ? 1 : 4}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className={`${boxSize} text-center font-bold rounded-xl border-2 border-beige bg-white text-brown-dark focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/30`}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-red-600" role="alert">{error}</p>
        )}

        <p className="text-center text-sm text-brown-medium">
          Hint: the code is <span className="font-mono font-bold">1234</span>
        </p>

        <button
          type="submit"
          className="w-full py-3 bg-terracotta hover:bg-terracotta-dark text-cream font-bold rounded-xl transition-colors"
        >
          Verify
        </button>
      </form>

      <SkipLink />
    </div>
  );
}
