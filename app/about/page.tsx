import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />
      <div className="py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-serif mb-6 text-gray-900">Tentang Happy Wedding</h1>
        <div className="prose prose-pink lg:prose-lg text-gray-600 space-y-6">
          <p>
            Happy Wedding adalah platform undangan pernikahan digital yang didirikan dengan misi sederhana: 
            <strong> Membantu calon pengantin membagikan kebahagiaan mereka dengan cara yang lebih mudah, elegan, dan ramah lingkungan.</strong>
          </p>
          <p>
            Kami percaya bahwa undangan pernikahan tidak harus mahal dan membuang banyak kertas. Dengan teknologi, 
            kami menghadirkan pengalaman undangan yang interaktif, bisa diakses dari mana saja, dan memiliki fitur canggih 
            seperti manajemen tamu dan amplop digital.
          </p>
          <h3 className="text-2xl font-bold text-gray-800 mt-8">Visi Kami</h3>
          <p>
            Menjadi platform pernikahan digital nomor 1 di Indonesia yang menjadi sahabat terbaik setiap pasangan dalam merencanakan hari bahagia mereka.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}