import React from "react";
import { ShieldCheck, MessageSquareQuote, Lock } from "lucide-react";
import { TestimonialItem } from "../types";

/**
 * INSTRUÇÃO PARA AVALIAÇÕES REAIS:
 * Conforme diretriz de integridade e ética, não inventamos nomes ou depoimentos fictícios de médicos.
 * Quando médicos ou clínicas parceiras autorizarem a publicação de seus depoimentos,
 * basta preencher o array `REAL_TESTIMONIALS` abaixo.
 * 
 * Exemplo de formato:
 * {
 *   id: "1",
 *   doctorName: "Dra. Nome da Médica",
 *   specialty: "Dermatologista - SP",
 *   location: "São Paulo, SP",
 *   quote: "Texto do depoimento real autorizado...",
 * }
 */
export const REAL_TESTIMONIALS: TestimonialItem[] = [
  // Deixe vazio até que depoimentos reais sejam fornecidos pelo cliente
];

export const TestimonialsSection: React.FC = () => {
  const hasRealTestimonials = REAL_TESTIMONIALS.length > 0;

  return (
    <section
      id="depoimentos"
      className="py-20 md:py-28 bg-[#F5F2EB] border-t border-[#E8E1D5] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            Relações de confiança
          </p>
          <h2
            id="testimonials-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-5"
          >
            Quem trabalha comigo
          </h2>
          <p className="text-base sm:text-lg text-[#55504A] leading-relaxed">
            Parcerias administrativas construídas com discrição, pontualidade e sigilo profissional.
          </p>
        </div>

        {hasRealTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REAL_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF9F6] border border-[#DDD3C2] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <MessageSquareQuote className="w-8 h-8 text-[#A88858]/40 mb-4" />
                  <p className="text-sm sm:text-base text-[#3D3A37] italic leading-relaxed mb-6 font-serif">
                    “{item.quote}”
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E8E1D5]">
                  <p className="text-sm font-semibold text-[#242220]">{item.doctorName}</p>
                  <p className="text-xs text-[#736D66]">{item.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Authenticity Placeholder */
          <div
            id="testimonials-placeholder-container"
            className="bg-[#FAF9F6] border border-[#DDD3C2] rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto text-center shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-[#EFE8DC] border border-[#DCD1BF] flex items-center justify-center text-[#7F643B] mx-auto mb-5">
              <Lock className="w-5 h-5" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#242220] font-medium mb-3">
              Compromisso com a discrição e ética médica
            </h3>

            <p className="text-sm sm:text-base text-[#57524C] max-w-2xl mx-auto leading-relaxed mb-6">
              A rotina de médicos e consultórios particulares é tratada com total sigilo. Por respeito
              à privacidade e às normas profissionais da área da saúde, avaliações e relatos são
              publicados exclusivamente mediante consentimento expresso dos profissionais parceiros.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFE6] border border-[#E0D5C3] text-xs font-medium text-[#735D3D]">
              <ShieldCheck className="w-4 h-4 text-[#8C6D3F]" />
              <span>Espaço reservado para relatos e depoimentos autorizados</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
