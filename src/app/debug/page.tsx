import type { Metadata } from "next";
import { bugFlags, bugDescriptions, type BugFlagKey } from "@/lib/flags";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DebugPage() {
  const flags = Object.entries(bugFlags) as [BugFlagKey, boolean][];

  return (
    <main className="min-h-screen bg-cream p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-brown-dark mb-2">BrewPoints Debug Panel</h1>
        <p className="text-brown-medium mb-6 text-sm">
          Toggle bug flags in <code className="bg-beige px-1.5 py-0.5 rounded">.env.local</code> and restart the dev server.
          Set a flag to <code className="bg-beige px-1.5 py-0.5 rounded">off</code> to see the fixed version.
        </p>

        <div className="space-y-3">
          {flags.map(([key, isOn]) => {
            const info = bugDescriptions[key];
            return (
              <div
                key={key}
                className={`rounded-xl border p-4 ${
                  isOn ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm font-bold text-brown-dark">
                    {info.name}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isOn ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
                    }`}
                  >
                    {isOn ? "BUG ON" : "FIXED"}
                  </span>
                </div>
                <p className="text-sm text-brown-medium">{info.description}</p>
                <p className="text-xs text-brown-medium mt-1">
                  Targets: <span className="font-semibold">{info.targets}</span>
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-beige/50 rounded-xl">
          <h2 className="font-bold text-brown-dark mb-2">Env Variable Names</h2>
          <ul className="text-xs font-mono space-y-1 text-brown-medium">
            <li>NEXT_PUBLIC_BUG_DROPDOWN_OVERFLOW</li>
            <li>NEXT_PUBLIC_BUG_BIRTHDAY_CONFUSE</li>
            <li>NEXT_PUBLIC_BUG_OTP_AUTOADVANCE</li>
            <li>NEXT_PUBLIC_BUG_DARKPATTERN_OPTIN</li>
            <li>NEXT_PUBLIC_BUG_HEAVY_PAYLOAD</li>
            <li>NEXT_PUBLIC_BUG_NO_ERROR_RECOVERY</li>
            <li>NEXT_PUBLIC_BUG_TINY_OTP_BOXES</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
