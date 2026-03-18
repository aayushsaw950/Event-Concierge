"use client";

import { useState } from "react";
import axios from "axios";
import { motion , AnimatePresence} from "framer-motion";
import { Sparkles, Loader2 , MapPin} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./components/Events";
import Image from "next/image";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setIsGenerating(true);

      const res = await axios.post("/api/generate", {
        prompt,
      });
      console.log("API Response:", res.data);
      setResult(res.data.result);

    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <Header />

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="pt-8 pb-8"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-3xl font-bold mb-3 text-slate-900"
          >
            Plan your perfect corporate offsite with AI
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-slate-500"
          >
            Describe your vision and let our AI handle the logistics, venues, and scheduling.
          </motion.p>
        </motion.div>

        <div className="px-6 pb-24">

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-2 px-1">
            Event Details
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your event (e.g., 10-person retreat in mountains for 3 days, $4000 budget)"
            className="w-full min-h-[160px] p-5 rounded-2xl border-none ring-1 ring-slate-200 bg-white focus:ring-2 focus:ring-primary text-base placeholder:text-slate-400 transition-all shadow-sm resize-none"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-[#8b5cf6] text-white font-bold text-lg shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Plan
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Result Section */}
      <AnimatePresence>
  {result && (
    <motion.div
      key={result.venueName}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="mt-8 rounded-2xl bg-white border border-primary/20 shadow-xl shadow-primary/5 overflow-hidden"
    >
      
     
      {result.imageUrl && (
        <Image
          src={result.imageUrl}
          alt="venue"
          className="w-full h-48 object-cover"
          width={40}
          height={40}
        />
      )}

      {/* Content */}
      <div className="p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary">
            AI Recommendation
          </h3>

          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-primary/10 text-primary">
            New
          </span>
        </div>

        {/* Venue Name */}
        <h4 className="text-xl font-bold mb-1">
          {result.venueName}
        </h4>

        {/* Location */}
        <div className="flex items-center gap-1 text-slate-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {result.location}
          </span>
        </div>

        {/* Estimated Cost */}
        <p className="text-sm font-semibold text-primary mb-4">
          💰 Estimated Cost: {result.estimatedCost}
        </p>

        {/* Why It Fits */}
        <div className="bg-slate-50 p-4 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">
            Why This Fits
          </p>
          <p className="text-sm text-slate-700">
            {result.whyItFits}
          </p>
        </div>

      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div>

     <h2 className="text-xl font-bold mb-4">History</h2>
      <Events />
      
      </main>
      
       

      <Footer/>
    </div>
  );
}