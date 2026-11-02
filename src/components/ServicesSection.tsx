import React from "react";
import {
  CalendarDays,
  MessageCircle,
  CalendarCheck,
  FolderKanban,
  Sliders,
  Check,
  Info,
  ArrowRight,
} from "lucide-react";
import { getWhatsAppUrl } from "../config/siteConfig";

interface ServicesSectionProps {
  onOpenProposal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenProposal }) => {
  const services = [
    {
      id: "gestao-agenda",
      icon: CalendarDays,
      title: "Gestão de agenda",
      desc: "Organização criteriosa e dinâmica dos seus horários para otimizar o dia a dia.",
      items: [
        "Organização completa e estruturação da agenda",
        "Novos agendamentos e cadastros com critérios definidos",
        "Confirmações ativas com antecedência estratégica",
        "Reagendamentos e cancelamentos ágeis",
        "Gestão criteriosa de encaixes para evitar sobrecarga",
        "Acompanhamento contínuo e preenchimento de horários vagos",
      ],
    },
    {
      id: "atendimento-whatsapp",
      icon: MessageCircle,
      title: "Atendimento via WhatsApp",
      desc: "Comunicação empática, pontual e profissional com os seus pacientes.",
      items: [
        "Recepção e atendimento inicial aos pacientes",
        "Fornecimento de informações claras sobre consultas",
        "Orientações administrativas (preparo, pontualidade, localização)",
        "Direcionamento assertivo de dúvidas ao médico quando necessário",
        "Monitoramento contínuo de mensagens e pendências em aberto",
      ],
    },
    {
      id: "confirmacao-acompanhamento",
      icon: CalendarCheck,
      title: "Confirmação e acompanhamento",
      desc: "Processos para reduzir absenteísmo e garantir o ciclo de cuidado do paciente.",
      items: [
        "Confirmação prévia de consultas para mitigar faltas",
        "Acompanhamento do paciente antes e depois do atendimento",
        "Organização proativa da janela de retornos e revisões",
        "Controle rigoroso de pendências administrativas e pedidos",
      ],
    },
    {
      id: "organizacao-administrativa",
      icon: FolderKanban,
      title: "Organização administrativa",
      desc: "Registros e controles claros para o consultório operar sem percalços.",
      items: [
        "Controles internos e relatórios de fluxo de pacientes",
        "Planilhas organizadas e atualizadas com pontualidade",
        "Registro seguro de informações e demandas operacionais",
        "Organização e padronização dos dados do consultório",
        "Acompanhamento de rotinas e solicitações de fornecedores",
        "Emissão de notas fiscais para os serviços prestados",
      ],
    },
    {
      id: "suporte-personalizado",
      icon: Sliders,
      title: "Suporte personalizado ao médico",
      desc: "Assessoria moldada exatamente para o formato da sua especialidade.",
      items: [
        "Adaptação conforme a especialidade e tempo de consulta",
        "Flexibilidade de acordo com o volume de pacientes",
        "Canal direto de alinhamento ágil entre médico e assessoria",
        "Ajuste contínuo aos protocolos e preferências do profissional",
      ],
    },
  ];

  return (
    <section id="servicos" className="py-20 md:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            Serviços especializados
          </p>
          <h2
            id="services-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-5"
          >
            O suporte que acontece nos bastidores para o consultório funcionar melhor.
          </h2>
          <p className="text-base sm:text-lg text-[#55504A] leading-relaxed">
            Estrutura administrativa remota, desenhada sob medida para que você tenha
            previsibilidade, menos interrupções e um atendimento de padrão superior.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div
          id="services-cards-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFullOnLg = index === 4; // 5th card spans nicely or remains balanced
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`bg-[#FFFFFF] border border-[#E8E2D8] hover:border-[#CDBFA9] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md ${
                  isFullOnLg ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#F7F3EB] border border-[#EBE4D8] flex items-center justify-center text-[#7F643B] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-xl text-[#242220] font-medium mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666059] leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#F2ECE1]">
                    {service.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#383531]">
                        <Check className="w-3.5 h-3.5 text-[#A5824E] shrink-0 mt-1" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#8C6D3F] hover:text-[#5E4723] inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>Incluir na proposta</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Administrative Disclaimer Banner (MANDATORY REQUIREMENT) */}
        <div
          id="services-admin-disclaimer"
          className="bg-[#F8F6F0] border border-[#E5DFC5] rounded-xl p-4 sm:p-5 flex items-start gap-3.5 max-w-3xl"
        >
          <Info className="w-5 h-5 text-[#8C6D3F] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#57524C] leading-relaxed">
            <strong className="text-[#2E2B28] font-semibold block mb-0.5">
              Escopo Exclusivamente Administrativo:
            </strong>
            A ISABELA Assessoria & Gestão Médica atua estritamente na gestão de rotinas, assessoria
            administrativa, confirmação de horários e acolhimento aos pacientes. Não emitimos condutas médicas,
            diagnósticos, prescrições ou orientações de natureza clínica.
          </div>
        </div>
      </div>
    </section>
  );
};
