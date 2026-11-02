import React from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "../config/siteConfig";

interface ComparisonSectionProps {
  onOpenProposal: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOpenProposal }) => {
  const beforePoints = [
    "WhatsApp acumulado com dezenas de mensagens não lidas",
    "Agenda confusa e horários vagos que passam despercebidos",
    "Pacientes sem retorno rápido e que procuram outros consultórios",
    "Recados espalhados em papéis, anotações e mensagens soltas",
    "Médico gastando momentos de descanso resolvendo burocracia",
    "Falta de acompanhamento estruturado para retornos e revisões",
  ];

  const afterPoints = [
    "Atendimento ágil, organizado e com padrão humanizado",
    "Agenda monitorada de perto, com confirmações ativas",
    "Comunicação centralizada em um canal estruturado e profissional",
    "Pendências, guias e solicitações devidamente monitoradas",
    "Processos definidos que respeitam o seu tempo e suas regras",
    "Mais tranquilidade e tempo livre para você focar nos pacientes",
  ];

  return (
    <section id="comparacao" className="py-20 md:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            Impacto real no seu dia a dia
          </p>
          <h2
            id="comparison-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-5"
          >
            Antes da assessoria{" "}
            <span className="font-serif italic text-[#8C6D3F] font-light">
              vs.
            </span>{" "}
            Com a assessoria
          </h2>
          <p className="text-base sm:text-lg text-[#55504A] leading-relaxed max-w-2xl mx-auto">
            A diferença visual e prática entre uma rotina sobrecarregada e um consultório que
            opera com método, atenção e tranquilidade.
          </p>
        </div>

        {/* 2 Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Card: Antes */}
          <div
            id="comparison-before-card"
            className="bg-[#F6F3EF] border border-[#E5DFD4] rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E1D5] mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7662]">
                    Cenário atual
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2E2B28] font-medium mt-0.5">
                    Antes da assessoria
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#ECE4D8] text-[#826A50] flex items-center justify-center font-bold text-sm">
                  <X className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-4">
                {beforePoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#57524C]">
                    <div className="w-4 h-4 rounded-full bg-[#EADDC9] text-[#7A6245] flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E8E1D5] text-[11px] text-[#78716A]">
              Sobrecarga operacional e cansaço mental ao final do expediente.
            </div>
          </div>

          {/* Card: Com a assessoria */}
          <div
            id="comparison-after-card"
            className="bg-[#FFFFFF] border-2 border-[#C2A67E]/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            {/* Subtle top badge */}
            <div className="absolute top-0 right-0 bg-[#F5EFE6] text-[#7F643B] text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-bl-xl border-l border-b border-[#E5DEC9]">
              Rotina Otimizada
            </div>

            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#F0EAE1] mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D3F]">
                    Com a ISABELA
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#242220] font-medium mt-0.5">
                    Consultório organizado
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#F3EFE6] text-[#8C6D3F] flex items-center justify-center font-bold text-sm">
                  <Check className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {afterPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#2E2B28]">
                    <div className="w-4 h-4 rounded-full bg-[#EFE8DC] text-[#7A5F35] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                    <span className="font-medium leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F0EAE1] text-[11px] text-[#8A7553] font-medium">
              Bastidores organizados com método, clareza e acolhimento humano.
            </div>
          </div>
        </div>

        {/* CTA underneath */}
        <div className="text-center">
          <a
            id="comparison-cta"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] text-sm font-medium px-6 py-3 rounded-xl transition-all shadow-xs active:scale-[0.98]"
          >
            <span>Quero essa organização no meu consultório</span>
            <ArrowRight className="w-4 h-4 text-[#D4C3A3]" />
          </a>
        </div>
      </div>
    </section>
  );
};
