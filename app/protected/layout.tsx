import { AuthButton } from "@/components/auth-button";
import Link from "next/link";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  //  <PastelGradient>
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-10 items-center">
        <nav className="w-full bg-[#FEF7EE] flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/protected"}>Chat</Link>
            </div>
            <AuthButton />
          </div>
        </nav>
        <div className="w-full max-w-5xl px-5 flex-1 flex flex-col gap-20">
          {children}
        </div>
      </div>
    </main>
    // </PastelGradient>
  );
}
