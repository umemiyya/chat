"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <>
    <Button className="hidden md:inline-block" onClick={logout}>
      <span>Keluar</span>
    </Button>
    <Button className="" variant={'ghost'} size={'icon'} onClick={logout}>
      <LogOut className="inline md:hidden" />
    </Button>
  </>
}
