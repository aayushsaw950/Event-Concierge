import { Sparkles, User } from "lucide-react";

export default function Header() {
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
    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
      <User className="w-5 h-5" />
    </button>

  </div>
</header>
    )
}