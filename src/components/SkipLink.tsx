import { bugFlags } from "@/lib/flags";

export default function SkipLink({ href = "/signup/permissions" }: { href?: string }) {
  const buggy = bugFlags.lowcontrastSkip;

  return (
    <a
      href={href}
      className={`text-sm underline text-center block mt-4 ${
        buggy
          ? "text-skip-cream"
          : "text-brown-medium hover:text-terracotta"
      }`}
    >
      Skip for now
    </a>
  );
}
