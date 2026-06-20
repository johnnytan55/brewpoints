const steps = ["Phone", "Verify", "Profile", "Rewards"];

export default function ProgressStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-1 px-4 py-3">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < currentStep
                  ? "bg-terracotta text-cream"
                  : i === currentStep
                    ? "bg-terracotta text-cream"
                    : "bg-beige text-brown-medium"
              }`}
            >
              {i < currentStep ? "✓" : i + 1}
            </div>
            <span className="text-[10px] mt-1 text-brown-medium">{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 h-0.5 mb-4 ${
                i < currentStep ? "bg-terracotta" : "bg-beige"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
