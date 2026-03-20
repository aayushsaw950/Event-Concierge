"use client";

import { Sparkles, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-background px-4 py-3 border-b-2 border-border">
      <div className="flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Sparkles className="text-primary w-5 h-5" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900">
            AI Event Concierge
          </h1>
        </div>

        {/* Right Section */}
        {session ? (
          <div className="flex items-center gap-3">
            {/* User Image */}
            <Image
              src={session.user.image}
              alt="user"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />

            {/* Logout */}
            <button
              onClick={() => signOut()}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}