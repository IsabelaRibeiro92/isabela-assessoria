import React from "react";
import { ArrowRight, MessageCircle, Instagram, Sparkles } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "../config/siteConfig";

interface FinalCtaSectionProps {
  onOpenProposal: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenProposal }) => {
  return (
    <section className="py-20 md:py-28 bg-[#F5F2EB] border-t border-[#E8E1D5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-[#DDD4C4] text-xs font-semibold uppercase tracking-wider text-[#7A6340] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#A5824E]" />
          <span>Dê o próximo passo</span>
        </div>

        <h2
          id="final-cta-headline"
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#242220] font-normal tracking-tight leading-tight max-w-3xl mx-auto mb-6"
        >
          Seu consultório não precisa depender de você para tudo.
        </h2>

        <p
          id="final-cta-text"
          className="text-base sm:text-lg text-[#55504A] leading-relaxed max-w-2xl mx-auto mb-10 font-normal"
        >
          Vamos entender sua rotina e descobrir como a ISABELA pode ajudar a deixar
          o atendimento e a gestão do seu consultório mais organizados e profissionais.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="final-cta-proposal-btn"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] text-base font-medium px-8 py-4 rounded-xl border border-transparent shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span>Solicitar uma proposta</span>
            <ArrowRight className="w-4 h-4 text-[#D4C3A3]" />
          </a>

          <a
            id="final-cta-whatsapp-btn"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#2E2B28] text-base font-medium px-6 py-4 rounded-xl border border-[#D5C9B6] transition-all hover:border-[#BFAF98]"
          >
            <MessageCircle className="w-4 h-4 text-[#8C6D3F]" />
            <span>Falar pelo WhatsApp</span>
          </a>

          <a
            id="final-cta-instagram-btn"
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#2E2B28] text-base font-medium px-6 py-4 rounded-xl border border-[#D5C9B6] transition-all hover:border-[#BFAF98]"
            title="Acessar Instagram @isabela.assessoria_"
            aria-label="Acessar Instagram @isabela.assessoria_"
          >
            <Instagram className="w-4 h-4 text-[#8C6D3F]" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
