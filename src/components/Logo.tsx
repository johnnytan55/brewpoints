export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 32 32"
        className={`${size === "sm" ? "w-6 h-6" : size === "lg" ? "w-10 h-10" : "w-8 h-8"}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="16" cy="16" rx="10" ry="14" fill="#C75B39" />
        <path
          d="M16 4 C14 10, 14 22, 16 28"
          stroke="#FFF8F0"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <span className={`font-bold text-terracotta ${sizes[size]}`}>
        BrewPoints
      </span>
    </div>
  );
}
