import React from "react";
import { ArrowRight, Compass, Settings2, Laptop, RefreshCw } from "lucide-react";
import { getWhatsAppUrl } from "../config/siteConfig";

interface HowItWorksSectionProps {
  onOpenProposal: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenProposal }) => {
  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Entendimento da sua rotina",
      description:
        "Uma análise detalhada do funcionamento do consultório: horários de atendimento, canais utilizados, tempo médio de consulta, principais necessidades e pontos que podem ser otimizados.",
    },
    {
      num: "02",
      icon: Settings2,
      title: "Organização do processo",
      description:
        "Definição de fluxos para agendamentos, confirmações, encaixes, comunicação com pacientes e demais necessidades da rotina, de acordo com a realidade do consultório.",
    },
    {
      num: "03",
      icon: Laptop,
      title: "Gestão da rotina administrativa",
      description:
        "A partir dos alinhamentos definidos, a rotina passa a ser conduzida remotamente, com organização dos canais acordados, atenção aos pacientes e acompanhamento da agenda.",
    },
    {
      num: "04",
      icon: RefreshCw,
      title: "Acompanhamento e ajustes",
      description:
        "Os processos são acompanhados e ajustados sempre que necessário, acompanhando as mudanças e necessidades da rotina do consultório.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-20 md:py-28 bg-[#F5F2EB] border-t border-[#E8E1D5] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            Passo a passo transparente
          </p>
          <h2
            id="how-it-works-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-5"
          >
            Uma assessoria que se adapta à sua rotina.
          </h2>
          <p className="text-base sm:text-lg text-[#55504A] leading-relaxed">
            Sem burocracia complexa: uma transição suave para você delegar com segurança
            e colher os benefícios da organização desde a primeira semana.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div
          id="how-it-works-timeline"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF9F6] border border-[#DDD3C2] rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative shadow-xs hover:border-[#C5B7A0] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-3xl font-semibold text-[#A88858]/60">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] border border-[#DDD3C2] flex items-center justify-center text-[#7F643B]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#242220] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666059] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE3D6] text-[11px] font-medium text-[#8C7654] uppercase tracking-wider">
                  Etapa {item.num} de 04
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <a
            id="how-it-works-cta"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] text-sm sm:text-base font-medium px-7 py-3.5 rounded-xl border border-transparent transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Quero entender como funcionaria no meu consultório</span>
            <ArrowRight className="w-4 h-4 text-[#D4C3A3]" />
          </a>
        </div>
      </div>
    </section>
  );
};
