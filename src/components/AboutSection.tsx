import React from "react";
import { Check, Quote, User, Sparkles } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export const AboutSection: React.FC = () => {
  const experiences = [
    "Vivência prática na dinâmica real de consultórios e clínicas médicas",
    "Atendimento acolhedor, empático e resolutivo ao paciente",
    "Organização estratégica de agendas simples e complexas",
    "Confirmações ativas com antecedência e controle de reagendamentos",
    "Elo seguro de comunicação entre médico, paciente e parceiros",
    "Monitoramento diário de pendências administrativas e fluxos de retorno",
    "Experiência na administração simultânea de agendas de múltiplos médicos",
  ];

  return (
    <section
      id="sobre"
      className="py-20 md:py-28 bg-[#F5F2EB] border-t border-[#E8E1D5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo Column (Second Professional Portrait Frame) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-[#FAF9F6] border border-[#DDD3C2] rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)]">
                {siteConfig.aboutPhotoUrl ? (
                  <img
                    src={siteConfig.aboutPhotoUrl}
                    alt="ISABELA - Assessoria & Gestão Médica"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/5] object-cover object-top rounded-xl border border-[#EDE5DA] shadow-xs"
                  />
                ) : (
                  <div
                    id="about-photo-placeholder"
                    className="w-full aspect-[4/5] rounded-xl bg-gradient-to-b from-[#EFEAE0] to-[#E5DDCF] border border-[#DDD3C2] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#D5C7B3] flex items-center justify-center text-[#7F643B] mb-4 shadow-xs">
                      <User className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <p className="font-serif text-base sm:text-lg font-medium text-[#2E2B28] mb-1">
                      Foto institucional
                    </p>
                    <p className="text-xs text-[#6B655E] max-w-[240px] leading-relaxed">
                      Espaço reservado para a fotografia profissional no ambiente de trabalho
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6]/90 border border-[#D5C8B4] text-[11px] font-medium text-[#5C4A32]">
                      <Sparkles className="w-3 h-3 text-[#A88653]" />
                      <span>Atendimento humanizado & discrição</span>
                    </div>
                  </div>
                )}

                {/* Micro info note under photo */}
                <div className="mt-4 pt-4 border-t border-[#E8DFC9] flex items-center justify-between text-xs text-[#6E6860]">
                  <span className="font-semibold tracking-[0.16em] text-[#2E2B28]">ISABELA</span>
                  <span>Assessoria & Gestão Médica</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Content Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
              Sobre a ISABELA
            </p>

            <h2
              id="about-title"
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-6"
            >
              Muito além de cuidar de uma agenda: assessoria e gestão com zelo em cada detalhe.
            </h2>

            {/* Featured Quote Box - Brand Origin Concept */}
            <div
              id="about-quote"
              className="bg-[#FAF9F6] border-l-3 border-[#B39366] p-5 sm:p-6 rounded-r-xl border-y border-r border-[#E5DFD4] mb-6 shadow-xs relative"
            >
              <Quote className="w-6 h-6 text-[#C2A67E]/40 mb-2" />
              <p className="font-serif italic text-base sm:text-lg text-[#3D3A37] leading-relaxed">
                “Minha proposta é levar excelência e cuidado à rotina do seu consultório, assumindo a gestão e a organização para que você tenha mais tranquilidade e tempo para se dedicar aos seus pacientes.”
              </p>
              <p className="mt-3 text-xs font-semibold text-[#7A6340] uppercase tracking-wider">
                — ISABELA — Assessoria & Gestão Médica
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#4E4944] leading-relaxed mb-6 font-normal">
              A ISABELA Assessoria & Gestão Médica nasceu da vivência direta com as necessidades diárias de quem atende pacientes.
              Consultórios e clínicas de alto padrão exigem pontualidade, processos bem estruturados,
              comunicação acolhedora e discrição absoluta. Meu propósito é assumir a assessoria e gestão da
              rotina médica com rigor técnico e atendimento humanizado, permitindo que sua dedicação esteja
              100% voltada ao exercício da medicina e ao cuidado com quem confia na sua especialidade.
            </p>

            {/* Practical Points */}
            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#735F43] mb-3">
                Competências aplicadas à sua rotina:
              </p>
              {experiences.map((exp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#383531]">
                  <div className="w-4 h-4 rounded-full bg-[#E8DFC9] text-[#695435] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                  <span>{exp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
