import React from "react";
import {
  Building2,
  GitFork,
  Smartphone,
  Sparkle,
  MessagesSquare,
  ShieldAlert,
} from "lucide-react";

export const ForWhomSection: React.FC = () => {
  const audiences = [
    {
      icon: Building2,
      title: "Médicos com consultório particular",
      description:
        "Profissionais que buscam padronizar a qualidade do atendimento e oferecer uma experiência refinada desde o primeiro contato do paciente.",
    },
    {
      icon: GitFork,
      title: "Médicos que atendem em diferentes clínicas",
      description:
        "Especialistas que dividem horários entre vários locais e precisam de uma gestão centralizada para não haver choques de agenda.",
    },
    {
      icon: Smartphone,
      title: "Profissionais que administram a própria agenda",
      description:
        "Quem hoje perde pausas entre consultas respondendo WhatsApp e deseja retomar o controle do seu tempo livre.",
    },
    {
      icon: Sparkle,
      title: "Consultórios que precisam melhorar o atendimento",
      description:
        "Locais que já operam, mas sentem necessidade de mais agilidade, empatia e acompanhamento pontual com os pacientes.",
    },
    {
      icon: MessagesSquare,
      title: "Profissionais com alto volume de mensagens",
      description:
        "Médicos que recebem dezenas de mensagens diárias com dúvidas administrativas e não conseguem responder a tempo.",
    },
    {
      icon: ShieldAlert,
      title: "Sem necessidade de secretária presencial exclusiva",
      description:
        "Consultórios que necessitam de excelência administrativa sem arcar com custos fixos e complexidade trabalhista presencial.",
    },
  ];

  return (
    <section id="para-quem" className="py-20 md:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            Público-alvo
          </p>
          <h2
            id="for-whom-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-5"
          >
            Para profissionais que querem crescer sem transformar a rotina em caos.
          </h2>
          <p className="text-base sm:text-lg text-[#55504A] leading-relaxed">
            Seja você um médico em expansão ou um profissional consolidado buscando mais paz de
            espírito, a assessoria remota entrega suporte flexível e personalizado.
          </p>
        </div>

        {/* 6 Audience Cards Grid */}
        <div
          id="for-whom-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {audiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] border border-[#E8E2D8] hover:border-[#CDBFA9] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F7F3EB] border border-[#EBE3D6] flex items-center justify-center text-[#7F643B] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#242220] mb-2.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666059] leading-relaxed">
                    {item.description}
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
