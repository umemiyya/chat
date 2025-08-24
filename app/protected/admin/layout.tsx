import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex gap-5 items-center pb-4 font-semibold">
        <Link className="text-sm underline" href={"/protected/admin"}>Input</Link>
        <Link className="text-sm underline" href={"/protected/upload"}>Upload</Link>
      </div>
      <main className="">{children}</main>
    </div>
  );
}
