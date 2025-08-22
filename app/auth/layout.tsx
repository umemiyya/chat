import PastelGradient from "@/components/bg-2";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <PastelGradient>
     {children}
   </PastelGradient>
  )
}