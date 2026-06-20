"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressStepper from "@/components/ProgressStepper";
import SkipLink from "@/components/SkipLink";
import { bugFlags } from "@/lib/flags";
import { outlets } from "@/lib/outlets";

export default function Profile() {
  const router = useRouter();
  const buggyDropdown = bugFlags.dropdownOverflow;
  const buggyBirthday = bugFlags.birthdayConfuse;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [outlet, setOutlet] = useState("");
  const [birthday, setBirthday] = useState("");
  const [outletSearch, setOutletSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredOutlets = outlets.filter((o) =>
    o.toLowerCase().includes(outletSearch.toLowerCase())
  );

  const today = new Date();
  const currentYear = today.getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    if (!outlet) newErrors.outlet = "Please select your favourite outlet";
    if (!birthday) newErrors.birthday = "Please enter your birthday";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sessionStorage.setItem("bp_profile", JSON.stringify({ name, email, outlet, birthday }));
    router.push("/signup/permissions");
  };

  return (
    <div>
      <ProgressStepper currentStep={2} />

      <h1 className="text-2xl font-bold text-brown-dark text-center mb-2 mt-4">
        Tell Us About You
      </h1>
      <p className="text-brown-medium text-center mb-6">
        Help us personalise your BrewPoints experience
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brown-dark mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ahmad bin Ismail"
            className="w-full px-4 py-3 rounded-xl border border-beige bg-white text-brown-dark placeholder:text-brown-medium/50 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brown-dark mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-beige bg-white text-brown-dark placeholder:text-brown-medium/50 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="relative">
          <label htmlFor="outlet" className="block text-sm font-semibold text-brown-dark mb-1">
            Favourite Outlet
          </label>

          {buggyDropdown ? (
            <>
              <select
                id="outlet"
                value={outlet}
                onChange={(e) => setOutlet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-beige bg-white text-brown-dark focus:outline-none focus:ring-2 focus:ring-terracotta appearance-none"
                style={{ maxHeight: "100vh" }}
              >
                <option value="">Select an outlet...</option>
                {outlets.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </>
          ) : (
            <>
              <input
                id="outlet"
                type="text"
                value={outlet || outletSearch}
                onChange={(e) => {
                  setOutletSearch(e.target.value);
                  setOutlet("");
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search outlets..."
                className="w-full px-4 py-3 rounded-xl border border-beige bg-white text-brown-dark placeholder:text-brown-medium/50 focus:outline-none focus:ring-2 focus:ring-terracotta"
                autoComplete="off"
              />
              {showDropdown && (
                <ul className="absolute z-50 w-full mt-1 bg-white border border-beige rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {filteredOutlets.length === 0 ? (
                    <li className="px-4 py-2 text-brown-medium text-sm">No outlets found</li>
                  ) : (
                    filteredOutlets.map((o) => (
                      <li
                        key={o}
                        className="px-4 py-2 hover:bg-cream-dark cursor-pointer text-sm text-brown-dark"
                        onClick={() => {
                          setOutlet(o);
                          setOutletSearch(o);
                          setShowDropdown(false);
                        }}
                      >
                        {o}
                      </li>
                    ))
                  )}
                </ul>
              )}
            </>
          )}
          {errors.outlet && <p className="mt-1 text-sm text-red-600">{errors.outlet}</p>}
        </div>

        <div>
          <label htmlFor="birthday" className="block text-sm font-semibold text-brown-dark mb-1">
            Birthday <span className="font-normal text-brown-medium">(for rewards!)</span>
          </label>

          {buggyBirthday ? (
            <div className="flex gap-2">
              <select
                className="flex-1 px-2 py-3 rounded-xl border border-beige bg-white text-brown-dark text-xs focus:outline-none focus:ring-2 focus:ring-terracotta"
                defaultValue=""
                onChange={(e) => {
                  const parts = birthday.split("-");
                  parts[0] = e.target.value;
                  setBirthday(parts.filter(Boolean).join("-"));
                }}
              >
                <option value="" disabled>YYYY</option>
                {Array.from({ length: 100 }, (_, i) => currentYear - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select
                className="flex-1 px-2 py-3 rounded-xl border border-beige bg-white text-brown-dark text-xs focus:outline-none focus:ring-2 focus:ring-terracotta"
                defaultValue=""
                onChange={(e) => {
                  const parts = birthday.split("-");
                  parts[1] = e.target.value;
                  setBirthday(parts.filter(Boolean).join("-"));
                }}
              >
                <option value="" disabled>MM</option>
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                className="flex-1 px-2 py-3 rounded-xl border border-beige bg-white text-brown-dark text-xs focus:outline-none focus:ring-2 focus:ring-terracotta"
                defaultValue=""
                onChange={(e) => {
                  const parts = birthday.split("-");
                  parts[2] = e.target.value;
                  setBirthday(parts.filter(Boolean).join("-"));
                }}
              >
                <option value="" disabled>DD</option>
                {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          ) : (
            <input
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              max={`${currentYear - 13}-12-31`}
              min="1920-01-01"
              className="w-full px-4 py-3 rounded-xl border border-beige bg-white text-brown-dark focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          )}
          {errors.birthday && <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>}
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
