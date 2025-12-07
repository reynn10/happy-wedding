import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Themes from "../components/Themes";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    // 1. BACKGROUND UTAMA: Stone-50 (Hex #fafaf9)
    <main className="min-h-screen bg-[#fafaf9] relative overflow-x-hidden font-sans text-gray-800">
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

        {/* CTA Akhir */}
        <section className="py-32 px-6 relative" data-aos="zoom-in">
            <div className="relative max-w-5xl mx-auto">
                <div className="bg-linear-to-r from-pink-600 to-rose-700 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 opacity-20 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight">
                            Siap Mewujudkan <br/> 
                            <span className="text-pink-200 italic">Pernikahan Impian?</span>
                        </h2>
                        <p className="text-pink-100 text-lg font-light max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan pasangan bahagia lainnya. Mulai sekarang, gratis selamanya.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                            <Link href="/login" className="bg-white text-pink-600 px-10 py-4 rounded-full font-bold shadow-xl hover:bg-gray-50 hover:scale-105 transition transform">
                                Buat Undangan Gratis
                            </Link>
                            <Link href="/#harga" className="bg-transparent border border-pink-200 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition shadow-sm">
                                Lihat Harga Paket
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}