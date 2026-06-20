"use client";

import { useState } from "react";
import ProgressStepper from "@/components/ProgressStepper";
import { bugFlags } from "@/lib/flags";

interface Permission {
  key: string;
  buggyLabel: string;
  fixedLabel: string;
  buggyDescription: string;
  fixedDescription: string;
}

const permissions: Permission[] = [
  {
    key: "promos",
    buggyLabel: "Don't not send me promo offers",
    fixedLabel: "Send me promo offers",
    buggyDescription: "Don't not receive exclusive promotions and discounts",
    fixedDescription: "Receive exclusive promotions and discounts",
  },
  {
    key: "news",
    buggyLabel: "Don't not send me news updates",
    fixedLabel: "Send me news updates",
    buggyDescription: "Don't not hear about new outlets and menu items",
    fixedDescription: "Hear about new outlets and menu items",
  },
  {
    key: "partners",
    buggyLabel: "Don't not share with partners",
    fixedLabel: "Share with partner brands",
    buggyDescription: "Don't not let our partners send you offers too",
    fixedDescription: "Let our partner brands send you offers",
  },
  {
    key: "sms",
    buggyLabel: "Don't not SMS me",
    fixedLabel: "Send me SMS notifications",
    buggyDescription: "Don't not get text messages about your rewards",
    fixedDescription: "Get text messages about your rewards",
  },
];

export default function Permissions() {
  const buggy = bugFlags.darkpatternOptin;
  const [done, setDone] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    permissions.forEach((p) => {
      initial[p.key] = buggy;
    });
    return initial;
  });

  const handleToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFinish = () => {
    sessionStorage.setItem("bp_permissions", JSON.stringify(toggles));
    setDone(true);
  };

  if (done) {
    return (
      <div>
        <ProgressStepper currentStep={3} />
        <div className="text-center mt-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-terracotta flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 24 L20 32 L36 16" stroke="#FFF8F0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-brown-dark mb-3">
            You&apos;re in!
          </h1>
          <p className="text-brown-medium mb-2">
            Welcome to BrewPoints, {sessionStorage.getItem("bp_phone") ? "friend" : "member"}!
          </p>
          <div className="bg-beige/50 rounded-2xl p-6 mt-6 mb-4">
            <p className="text-lg font-bold text-terracotta mb-1">🎁 100 Bonus Points</p>
            <p className="text-sm text-brown-medium">
              Added to your account as a welcome gift. That&apos;s 1 free kopi on us!
            </p>
          </div>
          <div className="bg-cream-dark rounded-2xl p-4">
            <p className="text-sm text-brown-medium">
              Your digital card is ready. Show the QR code at any BrewPoints outlet to start earning.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 w-full py-3 bg-terracotta hover:bg-terracotta-dark text-cream font-bold rounded-xl transition-colors"
          >
            Start Earning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProgressStepper currentStep={3} />

      <h1 className="text-2xl font-bold text-brown-dark text-center mb-2 mt-4">
        Stay in the Loop
      </h1>
      <p className="text-brown-medium text-center mb-6">
        Choose how you&apos;d like to hear from us
      </p>

      <div className="space-y-3 mb-6">
        {permissions.map((perm) => (
          <div
            key={perm.key}
            className="flex items-start gap-3 bg-white rounded-xl p-4 border border-beige"
          >
            <button
              role="switch"
              aria-checked={toggles[perm.key]}
              onClick={() => handleToggle(perm.key)}
              className={`relative mt-0.5 w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
                toggles[perm.key] ? "bg-terracotta" : "bg-beige"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  toggles[perm.key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <p className="font-semibold text-brown-dark text-sm">
                {buggy ? perm.buggyLabel : perm.fixedLabel}
              </p>
              <p className="text-xs text-brown-medium mt-0.5">
                {buggy ? perm.buggyDescription : perm.fixedDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleFinish}
        className="w-full py-3 bg-terracotta hover:bg-terracotta-dark text-cream font-bold rounded-xl transition-colors"
      >
        Finish Sign Up
      </button>
    </div>
  );
}
