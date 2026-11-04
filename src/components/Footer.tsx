import React from "react";
import { MessageCircle, Mail, Instagram, ArrowUp, FileSpreadsheet } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#1F1D1B] text-[#D1CCC4] pt-16 pb-12 border-t border-[#33302D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2E2B28]">
          {/* Brand Presentation */}
          <div className="md:col-span-6 flex flex-col items-start">
            <span className="font-serif text-2xl tracking-[0.22em] text-[#FAF9F6] font-semibold mb-1">
              {siteConfig.companyName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#A88858] font-medium mb-4">
              {siteConfig.tagline}
            </span>
            <p className="text-sm text-[#9C968E] max-w-md leading-relaxed mb-6 font-light">
              Organização de agenda, atendimento administrativo e suporte personalizado para
              médicos e profissionais da saúde que valorizam tempo, tranquilidade e cuidado com o paciente.
            </p>
            <p className="text-xs text-[#736E67]">
              {siteConfig.location}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#FAF9F6] mb-4">
              Navegação
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="text-[#9C968E] hover:text-[#FAF9F6] transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("sobre")}
                  className="text-[#9C968E] hover:text-[#FAF9F6] transition-colors"
                >
                  Sobre a ISABELA
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("servicos")}
                  className="text-[#9C968E] hover:text-[#FAF9F6] transition-colors"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-[#9C968E] hover:text-[#FAF9F6] transition-colors"
                >
                  Dúvidas Frequentes (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="text-[#9C968E] hover:text-[#FAF9F6] transition-colors"
                >
                  Contato & Proposta
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="text-[#9C968E] hover:text-[#FAF9F6] transition-colors underline decoration-dotted"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <a
                  href="/api/propostas?format=csv"
                  download="propostas_isabela_assessoria.csv"
                  className="text-[#9C968E] hover:text-[#FAF9F6] transition-colors inline-flex items-center gap-1.5 text-xs pt-1 opacity-80 hover:opacity-100"
                  title="Exportar planilha de solicitações registradas (CSV para Excel/Google Planilhas)"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#C2A67E]" />
                  <span>Exportar Propostas (CSV)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#FAF9F6] mb-4">
              Canais de Contato
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#9C968E] hover:text-[#FAF9F6] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#C2A67E]" />
                  <span>
                    {siteConfig.whatsappNumber ? siteConfig.whatsappNumber : "WhatsApp Comercial"}
                  </span>
                </a>
              </li>

              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-[#9C968E] hover:text-[#FAF9F6] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#C2A67E]" />
                    <span>{siteConfig.email}</span>
                  </a>
                </li>
              )}

              {siteConfig.instagramUrl ? (
                <li>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#9C968E] hover:text-[#FAF9F6] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#C2A67E]" />
                    <span>{siteConfig.instagramHandle || "Instagram"}</span>
                  </a>
                </li>
              ) : (
                <li className="text-xs text-[#736E67] flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#736E67]" />
                  <span>Instagram: canal a configurar</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736E67]">
          <p>© 2026 ISABELA — Assessoria & Gestão Médica. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#D1CCC4] transition-colors"
            >
              Termos e Privacidade
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[#D1CCC4] transition-colors"
              title="Voltar ao topo da página"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
