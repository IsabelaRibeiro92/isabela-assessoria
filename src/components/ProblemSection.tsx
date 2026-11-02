import React from "react";
import {
  MessageSquareWarning,
  Clock,
  CalendarX,
  AlertCircle,
  FileWarning,
  Shuffle,
  ClipboardList,
  Layers,
  ArrowDownRight,
} from "lucide-react";

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: MessageSquareWarning,
      title: "Mensagens acumuladas no WhatsApp",
      description: "Notificações sem parar tirando sua concentração durante os atendimentos.",
    },
    {
      icon: Clock,
      title: "Pacientes aguardando resposta",
      description: "Demora no primeiro contato que gera frustração e perda de novas consultas.",
    },
    {
      icon: CalendarX,
      title: "Confirmações em cima da hora",
      description: "Mensagens enviadas tarde demais, resultando em faltas e buracos na agenda.",
    },
    {
      icon: AlertCircle,
      title: "Horários vagos sem acompanhamento",
      description: "Desistências de última hora que poderiam ser preenchidas com busca ativa.",
    },
    {
      icon: Shuffle,
      title: "Encaixes desorganizados",
      description: "Superposição de horários que gera atrasos e desconforto na sala de espera.",
    },
    {
      icon: FileWarning,
      title: "Recados perdidos",
      description: "Informações importantes de pacientes dispersas em conversas pessoais.",
    },
    {
      icon: ClipboardList,
      title: "Dificuldade com pendências",
      description: "Falta de controle centralizado sobre guias, retornos e solicitações.",
    },
    {
      icon: Layers,
      title: "Excesso de tarefas burocráticas",
      description: "Tempo que deveria ser de descanso sendo gasto respondendo mensagens à noite.",
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="problema"
      className="py-20 md:py-28 bg-[#FAF9F6] border-t border-[#EDE7DE] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            A realidade dos consultórios
          </p>
          <h2
            id="problem-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal leading-tight tracking-tight mb-5"
          >
            Seu tempo deveria estar nos pacientes —{" "}
            <span className="italic font-light text-[#635C54]">
              não no caos da agenda.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#55504A] leading-relaxed">
            Uma rotina administrativa mal organizada consome energia, sobrecarrega o
            médico e prejudica a experiência e a confiança do paciente que busca seu cuidado.
          </p>
        </div>

        {/* 8 Friction Points Grid */}
        <div
          id="problem-cards-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-14"
        >
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] rounded-xl p-5 border border-[#E8E2D8] hover:border-[#D6CAB8] transition-all duration-200 flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#F7F3EB] border border-[#EAE3D6] flex items-center justify-center text-[#7F643B] mb-3.5 group-hover:bg-[#EFE8DC] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-[#242220] mb-2 leading-snug">
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

        {/* Transition to Solution Card */}
        <div
          id="problem-solution-transition"
          className="bg-[#F4EFE6] border border-[#DDD3C2] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3F] mb-1">
              Mudança de paradigma
            </p>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#242220] font-normal tracking-tight mb-2">
              É justamente aí que entra a ISABELA Assessoria <span className="font-serif-classic font-normal not-italic">&</span> Gestão Médica.
            </h3>
            <p className="text-sm sm:text-base text-[#524E48] leading-relaxed">
              Você ganha tranquilidade técnica para focar nas consultas e na sua vida pessoal,
              enquanto seus bastidores operam com método, pontualidade e acolhimento de alto padrão.
            </p>
          </div>

          <button
            onClick={() => scrollToSection("sobre")}
            className="inline-flex items-center gap-2 bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] text-sm font-medium px-5 py-3 rounded-xl transition-all shrink-0 active:scale-[0.98]"
          >
            <span>Conhecer a assessoria</span>
            <ArrowDownRight className="w-4 h-4 text-[#D4C3A3]" />
          </button>
        </div>
      </div>
    </section>
  );
};
