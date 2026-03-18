"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, History, Compass, Settings } from "lucide-react";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "History", icon: History, path: "/history" },
    { name: "Explore", icon: Compass, path: "/explore" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
      
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center transition ${
              isActive
                ? "text-primary"
                : "text-slate-400 hover:text-primary"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">
              {item.name}
            </span>
          </button>
        );
      })}

    </div>
  );
};

export default BottomNav;