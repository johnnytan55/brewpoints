import Logo from "@/components/Logo";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col items-center min-h-screen bg-cream">
      <div className="w-full max-w-md mx-auto px-5 py-6">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        {children}
      </div>
    </main>
  );
}
