import React, { useState } from "react";
import { MessageCircle, Instagram, X } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "../config/siteConfig";

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div
      id="floating-contact-container"
      className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2.5"
    >
      {/* Discreet dismissable tooltip */}
      {showTooltip && (
        <div className="bg-[#FFFFFF] border border-[#DDD3C2] text-[#242220] px-3.5 py-2 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 max-w-[250px]">
          <span className="leading-snug">
            Atendimento ágil pelo <strong>WhatsApp</strong> ou acompanhe no <strong>Instagram</strong>.
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#9E9891] hover:text-[#242220] p-0.5 rounded transition-colors"
            aria-label="Fechar dica de contato"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Buttons: Instagram & WhatsApp */}
      <div className="flex items-center gap-3">
        {/* Instagram Button */}
        <a
          id="floating-instagram-btn"
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] border border-[#C2A67E]/40 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group relative"
          aria-label="Acessar Instagram @isabela.assessoria_"
          title="Acessar Instagram @isabela.assessoria_"
        >
          <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8DFD1] transition-transform group-hover:scale-105" />
        </a>

        {/* WhatsApp Button */}
        <a
          id="floating-whatsapp-btn"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] border border-[#C2A67E]/40 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group relative"
          aria-label="Falar com a ISABELA pelo WhatsApp"
          title="Falar com a ISABELA no WhatsApp"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8DFD1] transition-transform group-hover:scale-105" />
          
          {/* Subtle status dot */}
          <span
            className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#FAF9F6]"
            title="Online para atendimento"
          />
        </a>
      </div>
    </div>
  );
};
