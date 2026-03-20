"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, Loader2 } from "lucide-react";
import { useSession , signIn } from "next-auth/react";
import Image from "next/image";

const Events = () => {
  const { data: session } = useSession();
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/events");
        setPastEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session]);
  

if (!session) {
    return (
      <div className="mt-10 text-center">
        <p className="text-slate-600 mb-3">
          Please login to view your history
        </p>
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Login with Google
        </button>
      </div>
    );
  }
  if (!loading && pastEvents.length === 0) {
  return (
    <p className="mt-6 text-center text-slate-500">
      No events yet
    </p>
  );
}
 
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {pastEvents.map((pastEvent, index) => (
        <motion.div
          key={pastEvent._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative flex flex-col gap-3 p-5 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 hover:ring-primary/30 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-slate-900 text-lg">
                {pastEvent.venueName}
              </h4>

              <div className="flex items-center gap-1 text-slate-500 mt-1">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{pastEvent.location}</span>
              </div>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-emerald-50 text-emerald-600">
              SAVED
            </span>
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 italic leading-relaxed">
            {pastEvent.whyItFits}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              
              <div className="h-10 w-10 rounded-xl overflow-hidden bg-slate-100">
                <Image
                  className="w-full h-full object-cover"
                  src={pastEvent.imageUrl}
                  alt={pastEvent.venueName}
                  width={40}
                  height={40}
                />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  {pastEvent.venueName}
                </p>
                <p className="text-[10px] text-slate-400">
                  {new Date(pastEvent.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Events;