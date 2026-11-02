import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "../types";

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      question: "A assessoria é totalmente remota?",
      answer:
        "Sim. Todas as atividades contratadas são realizadas de maneira remota, por meio de ferramentas digitais e canais combinados. Os fluxos são definidos e alinhados de acordo com a rotina e as necessidades do seu consultório.",
    },
    {
      id: "faq-2",
      question: "A assessoria atende apenas médicos?",
      answer:
        "O foco principal e a especialização são em médicos e profissionais da saúde (como psicólogos, fisioterapeutas, nutricionistas e odontologistas). Outras demandas na área de saúde podem ser avaliadas individualmente.",
    },
    {
      id: "faq-3",
      question: "Vocês atendem os pacientes pelo WhatsApp?",
      answer:
        "Sim. O atendimento administrativo via WhatsApp pode fazer parte do pacote de serviços contratado, cobrindo recepção de novas mensagens, esclarecimento de dúvidas sobre consultas e orientações de preparo.",
    },
    {
      id: "faq-4",
      question: "A assessoria substitui uma secretária presencial?",
      answer:
        "Depende da rotina e do modelo de funcionamento do consultório. Muitas atividades administrativas, agendamentos e confirmações são perfeitamente executadas de forma remota com alto ganho de eficiência, enquanto funções que exigem presença física direta continuam demandando equipe local.",
    },
    {
      id: "faq-5",
      question: "Posso contratar apenas alguns serviços?",
      answer:
        "Sim. A proposta é personalizada. Você pode contratar apenas a gestão de agenda e confirmações, ou somar o atendimento de WhatsApp e organização administrativa conforme a sua necessidade real.",
    },
    {
      id: "faq-6",
      question: "Como são definidos os valores?",
      answer:
        "Os valores dependem do volume de pacientes, complexidade da agenda, canais de atendimento e serviços selecionados. Após uma conversa inicial para entender sua rotina, apresentamos uma proposta transparente e detalhada.",
    },
    {
      id: "faq-7",
      question: "Vocês têm acesso a informações médicas dos pacientes?",
      answer:
        "Não. A assessoria trabalha estritamente com os dados essenciais para o exercício administrativo (nome, telefone de contato, data de agendamento e informações práticas). Não solicitamos nem gerenciamos prontuários clínicos, diagnósticos ou laudos médicos.",
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            Esclarecimentos
          </p>
          <h2
            id="faq-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-5"
          >
            Dúvidas frequentes
          </h2>
          <p className="text-base sm:text-lg text-[#55504A] leading-relaxed">
            Respostas diretas para as perguntas mais comuns sobre o funcionamento
            e a contratação da assessoria médica remota.
          </p>
        </div>

        {/* Accordion List */}
        <div id="faq-accordion-list" className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#FFFFFF] border-[#C5B7A0] shadow-xs"
                    : "bg-[#FFFFFF]/70 border-[#E8E2D8] hover:border-[#D6CAB8]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A67E]"
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-content`}
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#242220]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#EFE8DC] text-[#7F643B]" : "bg-[#F7F3EB] text-[#8C7550]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`${faq.id}-content`}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#59544E] leading-relaxed border-t border-[#F4EFE6]"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
