import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Themes from "../components/Themes";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import Link from "next/link";

export default function Home() {
  return (
    // 1. BACKGROUND UTAMA: Stone-50 (Hex #fafaf9)
    <main className="min-h-screen bg-[#fafaf9] relative overflow-hidden font-sans text-gray-800">
      <Navbar />
      
      <Hero />
      
      {/* --- GLOBAL DECORATION BLOBS (Posisi Diatur Ulang) --- */}
      
      {/* Blob 1: DITURUNKAN ke 140vh agar area bawah Hero bersih */}
      <div className="absolute top-[140vh] left-0 w-[800px] h-[800px] bg-pink-200/30 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none z-0"></div>
      
      {/* Blob 2: Area Testimoni */}
      <div className="absolute top-[250vh] right-0 w-[1000px] h-[1000px] bg-rose-200/20 rounded-full blur-[150px] translate-x-1/3 pointer-events-none z-0"></div>
      
      {/* Blob 3: Area Bawah */}
      <div className="absolute bottom-0 left-1/2 w-[1200px] h-[1200px] bg-pink-100/40 rounded-full blur-[200px] -translate-x-1/2 translate-y-1/2 pointer-events-none z-0"></div>

      {/* --- KONTEN SECTION --- */}
      <div className="relative z-10 space-y-0">
        
        <div data-aos="fade-up" data-aos-duration="1000">
          <Features />
        </div>
        
        <div data-aos="fade-left" data-aos-duration="1000">
          <Themes />
        </div>
        
        <div data-aos="fade-up" data-aos-duration="1200">
          <Testimonials />
        </div>
        
        <div data-aos="zoom-in-up" data-aos-duration="1000">
          <Pricing />
        </div>
        
        <div data-aos="fade-up">
          <FAQ />
        </div> 
        <div data-aos="fade-up">
          <FAQ />
        </div> 
        <div>
          <CTA />
        </div>
        
        </div>

      <Footer />
    </main>
  );
}