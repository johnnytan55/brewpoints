export const bugFlags = {
  dropdownOverflow: process.env.NEXT_PUBLIC_BUG_DROPDOWN_OVERFLOW !== "off",
  birthdayConfuse: process.env.NEXT_PUBLIC_BUG_BIRTHDAY_CONFUSE !== "off",
  otpAutoadvance: process.env.NEXT_PUBLIC_BUG_OTP_AUTOADVANCE !== "off",
  darkpatternOptin: process.env.NEXT_PUBLIC_BUG_DARKPATTERN_OPTIN !== "off",
  heavyPayload: process.env.NEXT_PUBLIC_BUG_HEAVY_PAYLOAD !== "off",
  noErrorRecovery: process.env.NEXT_PUBLIC_BUG_NO_ERROR_RECOVERY !== "off",
  tinyOtpBoxes: process.env.NEXT_PUBLIC_BUG_TINY_OTP_BOXES !== "off",
} as const;

export type BugFlagKey = keyof typeof bugFlags;

export const bugDescriptions: Record<BugFlagKey, { name: string; description: string; targets: string }> = {
  dropdownOverflow: {
    name: "BUG_DROPDOWN_OVERFLOW",
    description: "Favourite outlet dropdown has 40+ items, no search, overflows viewport on mobile",
    targets: "motor, low-end",
  },
  birthdayConfuse: {
    name: "BUG_BIRTHDAY_CONFUSE",
    description: "Birthday picker defaults to current year, requires scrolling decades, tiny controls, no typing",
    targets: "elderly, motor",
  },
  otpAutoadvance: {
    name: "BUG_OTP_AUTOADVANCE",
    description: "OTP inputs auto-advance but break on paste and trap focus, hard to correct typos",
    targets: "elderly, low-literacy",
  },
  darkpatternOptin: {
    name: "BUG_DARKPATTERN_OPTIN",
    description: "Marketing opt-in toggles default ON with confusing double-negative copy",
    targets: "low-literacy, non-native",
  },
  heavyPayload: {
    name: "BUG_HEAVY_PAYLOAD",
    description: "Loads large unoptimised hero image / heavy bundle, slow on throttled connections",
    targets: "low-end device + slow network",
  },
  noErrorRecovery: {
    name: "BUG_NO_ERROR_RECOVERY",
    description: "Invalid phone shows red border but NO message explaining what is wrong",
    targets: "non-native, low-literacy",
  },
  tinyOtpBoxes: {
    name: "BUG_TINY_OTP_BOXES",
    description: "The 4 OTP code boxes are small and tightly spaced",
    targets: "motor",
  },
};
