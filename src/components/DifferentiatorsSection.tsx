import React from "react";
import {
  Stethoscope,
  HeartHandshake,
  CheckCheck,
  UserCheck,
  PhoneCall,
  Lock,
} from "lucide-react";

export const DifferentiatorsSection: React.FC = () => {
  const differentiators = [
    {
      icon: Stethoscope,
      title: "Experiência com rotina médica",
      description:
        "Conhecimento prático e vivenciado das necessidades administrativas de consultórios, tempo de consulta e comportamento dos pacientes.",
    },
    {
      icon: HeartHandshake,
      title: "Atendimento humanizado",
      description:
        "Cada paciente é atendido com cordialidade, paciência e respeito, transmitindo a seriedade e o acolhimento do seu consultório.",
    },
    {
      icon: CheckCheck,
      title: "Organização rigorosa",
      description:
        "Processos bem definidos para reduzir esquecimentos, eliminar mensagens sem retorno e prevenir falhas de comunicação.",
    },
    {
      icon: UserCheck,
      title: "Personalização integral",
      description:
        "O serviço não segue um roteiro genérico ou robotizado; ele se molda à sua dinâmica de atendimento e às suas preferências.",
    },
    {
      icon: PhoneCall,
      title: "Comunicação próxima",
      description:
        "Contato fluido e direto com o médico para alinhamento de prioridades, avisos imediatos e situações que demandam atenção especial.",
    },
    {
      icon: Lock,
      title: "Confidencialidade e discrição",
      description:
        "Tratamento ético, responsável e discreto das rotinas, contatos e informações operacionais do seu consultório.",
    },
  ];

  return (
    <section
      id="diferenciais"
      className="py-20 md:py-28 bg-[#F5F2EB] border-t border-[#E8E1D5] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            Nossos pilares
          </p>
          <h2
            id="differentiators-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-5"
          >
            Atendimento próximo, mesmo à distância.
          </h2>
          <p className="text-base sm:text-lg text-[#55504A] leading-relaxed">
            Mais do que executar tarefas, meu propósito é ser um braço direito de confiança para que você
            e seus pacientes sintam o cuidado em cada detalhe.
          </p>
        </div>

        {/* 6 Differentiators Cards Grid */}
        <div
          id="differentiators-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF9F6] border border-[#DDD3C2] hover:border-[#C5B7A0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-xs"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] border border-[#DCD1BF] flex items-center justify-center text-[#7F643B] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#242220] mb-2.5 leading-snug">
                    {diff.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666059] leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
