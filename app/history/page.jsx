"use client";
import Events from "../components/Events";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HistoryPage() {
  return (
    <>
   <Header/>
    <div className="min-h-screen bg-background-light p-4">
      <h2 className="text-xl font-bold mb-4">History</h2>
      <Events />
    </div>
    <Footer/>
     </>
  );
}