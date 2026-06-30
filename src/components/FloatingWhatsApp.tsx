
"use client";

import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/447342322206"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-[60] group flex items-center gap-3 md:bottom-8"
    >
      <div className="bg-white text-slate-900 py-2 px-4 rounded-2xl shadow-2xl text-xs font-black opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 hidden md:block border border-slate-100">
        تحدث مع شريف للاشتراك
      </div>
      <div className="bg-[#25D366] text-white p-4 rounded-[1.5rem] shadow-[0_15px_30px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95 animate-bounce">
        <MessageCircle className="h-8 w-8" />
      </div>
    </a>
  );
}
