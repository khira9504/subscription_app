import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import React from "react";import { UserNavigation } from "../auth/UserNavigation";

export const Navigation = async () => {
  const session = await getAuthSession();
  return (
    <header className="bg-white mb-8 text-gray-800 shadow-lg">
      <div className="flex items-center justify-between h-16 px-12">
        <div>
          <Link href="/" className="text-xl font-bold">
            CheckOUT
          </Link>
        </div>
        <div>
          {session?.user ? (
            <UserNavigation user={session.user} />
          ) : (
            <Link
              href="/login"
              className="rounded bg-sky-500 px-4 py-2 text-white hover:bg-sky-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};