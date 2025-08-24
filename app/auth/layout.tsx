// import PastelGradient from "@/components/bg-2";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <main className="bg-[#FEF7EE]">
     {children}
   </main>
  )
}