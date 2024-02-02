"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ThemeToggle from "./theme-toggle";

export default function Header({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const router = useRouter();

  const logOut = async () => {
    try {
      const res = await fetch("/api/logout", { credentials: "same-origin" });

      const jsonData = await res.json();
      if (res.status === 400) {
        throw Error(jsonData.message);
      }

      toast.success(jsonData.message);
    } catch (e) {
      // @ts-ignore
      // toast.error(e.message);
    }
    router.push("/");
    router.refresh();
  };

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={
              "https://github.com/Nepal-College-of-Information-Technology/eapd-mini-project-abra"
            }
            target="_blank"
            className="flex gap-2 items-center"
          >
            Mini-Trello <GitHubLogoIcon />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <LogOutIcon onClick={logOut} className="cursor-pointer" />
          )}
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
