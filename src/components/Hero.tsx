import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, User, Calendar, MessageSquare } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";

interface HeroProps {
  onOpenProposal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProposal }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#FAF9F6] to-[#F5F2EB]"
    >
      {/* Background Subtle Ambience Glow (warm champagne/beige, no flashy colors) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#EFE9DF]/50 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Copy Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline Badge */}
            <div
              id="hero-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFE6] border border-[#E0D7C7] text-[#6E5A3E] text-[10.5px] sm:text-xs font-semibold tracking-wider uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A5824E] shrink-0" />
              <span>100% REMOTO • ATENDIMENTO EM TODO O BRASIL</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-headline"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] tracking-tight text-[#242220] font-normal mb-5"
            >
              Seu consultório organizado.{" "}
              <span className="italic font-serif font-light text-[#5C5650] block mt-1">
                Seus pacientes bem atendidos.
              </span>
              <span className="text-[#242220] font-normal block mt-1">
                Sua rotina mais leve.
              </span>
            </h1>

            {/* Brand Concept Statement */}
            <div className="flex items-center gap-2 mb-4 text-[#7A5F35] font-serif italic text-lg sm:text-xl">
              <span>“Eu cuido da sua gestão para que você cuide dos seus pacientes.”</span>
            </div>

            {/* Subheadline */}
            <p
              id="hero-subheadline"
              className="text-base sm:text-lg text-[#55504A] leading-relaxed max-w-2xl mb-8 font-normal"
            >
              Assessoria e gestão médica remota para profissionais que querem
              oferecer um atendimento de excelência sem precisar cuidar de tudo sozinhos.
            </p>

            {/* Strategic CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <a
                id="hero-cta-organize"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] text-base font-medium px-7 py-3.5 rounded-xl border border-transparent shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>Quero organizar meu consultório</span>
                <ArrowRight className="w-4 h-4 text-[#D4C3A3]" />
              </a>

              <button
                id="hero-cta-services"
                onClick={() => scrollToSection("servicos")}
                className="inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F5F0] text-[#3A3632] text-base font-medium px-6 py-3.5 rounded-xl border border-[#DED9CF] transition-all hover:border-[#C5BCAC]"
              >
                <span>Conhecer os serviços</span>
              </button>
            </div>

            {/* Key Trust Indicators */}
            <div
              id="hero-indicators"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-6 border-t border-[#E5E0D6]"
            >
              <div className="flex items-center gap-2.5 text-[#3E3A36] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#9E7D4E] shrink-0" />
                <span className="font-medium">Atendimento remoto</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#3E3A36] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#9E7D4E] shrink-0" />
                <span className="font-medium">Rotina personalizada</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#3E3A36] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#9E7D4E] shrink-0" />
                <span className="font-medium">Foco em profissionais da saúde</span>
              </div>
            </div>
          </div>

          {/* Visual Composition Column - Portrait / Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative Subtle Frame */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-b from-[#E7DEC8]/40 to-transparent blur-sm -z-10" />

              {/* Main Portrait Card */}
              <div
                id="hero-portrait-card"
                className="relative bg-[#FFFFFF] border border-[#E5DFD3] rounded-2xl p-4 sm:p-5 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.06)]"
              >
                {/* Photo or Professional Placeholder */}
                {siteConfig.heroPhotoUrl ? (
                  <img
                    src={siteConfig.heroPhotoUrl}
                    alt="ISABELA - Assessoria & Gestão Médica"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/5] object-cover object-top rounded-xl border border-[#EDE7DD] shadow-xs"
                  />
                ) : (
                  <div
                    id="hero-photo-placeholder"
                    className="w-full aspect-[4/5] rounded-xl bg-gradient-to-b from-[#F7F4EE] to-[#EFEAE0] border border-[#E2DAD0] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group"
                  >
                    {/* Subtle aesthetic lines */}
                    <div className="absolute inset-0 bg-[radial-gradient(#C2A67E_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
                    
                    <div className="w-20 h-20 rounded-full bg-[#FFFFFF] border border-[#D9CEBE] flex items-center justify-center shadow-sm mb-4 relative z-10 text-[#8F7249]">
                      <User className="w-9 h-9 stroke-[1.5]" />
                    </div>

                    <div className="relative z-10">
                      <p className="font-serif text-lg font-medium text-[#2E2B28] mb-1">
                        Foto profissional
                      </p>
                      <p className="text-xs text-[#736D66] max-w-[220px] leading-relaxed">
                        Espaço reservado para a fotografia oficial da assessoria
                      </p>
                    </div>

                    <div className="mt-4 px-3 py-1 bg-[#FFFFFF]/80 backdrop-blur-sm border border-[#DACFBF] rounded-full text-[11px] font-medium text-[#65533A] relative z-10">
                      ISABELA — Assessoria & Gestão Médica
                    </div>
                  </div>
                )}

                {/* Floating Operational Pill 1 (Bottom Left) */}
                <div className="mt-4 bg-[#FAF9F6] border border-[#E5E0D6] rounded-xl p-3.5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] text-[#7A5F35] flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#242220]">Agenda sob controle</p>
                      <p className="text-[11px] text-[#6E6963]">Agendamentos e confirmações ativas</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" title="Operação ativa" />
                </div>

                {/* Floating Operational Pill 2 */}
                <div className="mt-2 bg-[#FAF9F6] border border-[#E5E0D6] rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#EAE2D3] text-[#7A5F35] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#242220]">Atendimento humanizado</p>
                    <p className="text-[11px] text-[#6E6963]">Respostas claras com zelo e agilidade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
