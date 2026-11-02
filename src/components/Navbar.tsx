import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Instagram, Linkedin, Phone } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";
import marbleTextureImg from "../assets/images/white_marble_texture_1788969341745.jpg";

interface NavbarProps {
  onOpenProposal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProposal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#inicio", active: true },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-navigation"
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    >
      {/* Top Utility Bar - Exactly as in the reference image */}
      <div
        id="header-top-bar"
        className="bg-[#DDD4C7] border-b border-[#CEC4B3] text-[#695E52] text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase py-1.5 px-4 sm:px-6 lg:px-8 transition-all"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Values */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span>ORGANIZAÇÃO</span>
            <span className="text-[#AFA494]">|</span>
            <span>EFICIÊNCIA</span>
            <span className="text-[#AFA494] hidden xs:inline">|</span>
            <span className="hidden xs:inline">MAIS TEMPO PARA O QUE IMPORTA</span>
          </div>

          {/* Right Direct Channel & Socials */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#5C5246] hover:text-[#262320] transition-colors"
              title="Atendimento via WhatsApp"
            >
              <Phone className="w-3 h-3 text-[#786A5A]" />
              <span className="text-[9.5px] sm:text-[10.5px]">ATENDIMENTO VIA WHATSAPP</span>
            </a>

            <span className="text-[#AFA494] hidden xs:inline">|</span>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xs:inline-flex items-center gap-1.5 text-[#5C5246] hover:text-[#262320] transition-colors"
              title="Instagram @isabela.assessoria_"
            >
              <Instagram className="w-3.5 h-3.5 text-[#786A5A]" />
              <span className="text-[9.5px] sm:text-[10.5px]">@isabela.assessoria_</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Marble Header Bar */}
      <div
        id="header-marble-bar"
        className={`relative transition-all duration-300 border-b border-[#E6DFD5] ${
          isScrolled
            ? "py-3 sm:py-3.5 shadow-[0_4px_20px_-8px_rgba(45,36,25,0.07)]"
            : "py-4 sm:py-5 shadow-[0_2px_12px_-8px_rgba(45,36,25,0.04)]"
        }`}
      >
        {/* Realistic White-Cream Marble Texture Image Background */}
        <div
          className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${marbleTextureImg})`,
            backgroundColor: "#FAF8F5",
          }}
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            {/* Brand Logo - ISABELA Assessoria & Gestão Médica */}
            <a
              href="#inicio"
              id="brand-logo"
              onClick={(e) => handleNavClick(e, "#inicio")}
              className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6D3F] rounded-xs"
            >
              <span className="font-serif text-2xl sm:text-[1.75rem] tracking-[0.22em] text-[#181615] font-semibold transition-colors group-hover:text-[#7A5B2E] leading-none">
                ISABELA
              </span>
              <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.24em] text-[#5E5549] font-medium mt-1">
                Assessoria & Gestão Médica
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7" aria-label="Navegação principal">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  id={`nav-${link.href.replace("#", "")}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[14px] font-medium text-[#262320] hover:text-[#181615] transition-colors relative py-1"
                >
                  <span>{link.label}</span>
                  {link.active ? (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#181615]" />
                  ) : (
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8C6D3F] hover:w-full transition-all duration-200" />
                  )}
                </a>
              ))}
            </nav>

            {/* Action CTA & Contact Channels */}
            <div className="hidden sm:flex items-center space-x-2 md:space-x-3">
              {/* Instagram direct link */}
              <a
                id="header-instagram-cta"
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#262320] hover:text-[#181615] px-2.5 py-2 rounded-md hover:bg-[#EFE8DC]/60 transition-colors"
                title="Acessar Instagram @isabela.assessoria_"
                aria-label="Instagram @isabela.assessoria_"
              >
                <Instagram className="w-4 h-4 text-[#262320]" />
                <span>Instagram</span>
              </a>

              {/* WhatsApp direct link */}
              <a
                id="header-whatsapp-cta"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#262320] hover:text-[#181615] px-2.5 py-2 rounded-md hover:bg-[#EFE8DC]/60 transition-colors"
                title="Conversar no WhatsApp"
              >
                {/* Clean WhatsApp icon */}
                <svg
                  className="w-4 h-4 fill-none stroke-current stroke-[1.75]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Solicitar proposta Button - Exactly as in the reference image */}
              <a
                id="header-proposal-button"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1E1C1A] hover:bg-[#33302D] text-[#FAF8F5] text-[13px] sm:text-[13.5px] font-medium px-4 sm:px-5 py-2.5 rounded-full transition-all shadow-sm active:scale-[0.98]"
              >
                <span>Solicitar proposta</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#EFEBE4]" />
              </a>
            </div>

            {/* Mobile Menu Toggle & Compact CTA */}
            <div className="flex lg:hidden items-center space-x-2">
              <a
                id="mobile-proposal-btn"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden text-xs bg-[#1E1C1A] text-[#FAF8F5] px-3.5 py-1.5 rounded-full font-medium shadow-xs inline-flex items-center justify-center"
              >
                Proposta
              </a>

              <button
                id="mobile-menu-toggle"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#181615] hover:bg-[#EFE7D8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6D3F]"
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menu de navegação"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-[100px] shadow-xl px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 relative overflow-hidden border-b border-[#E6DFD5]"
        >
          {/* Matching white-cream marble image background for mobile drawer */}
          <div
            className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${marbleTextureImg})`,
              backgroundColor: "#FAF8F5",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col space-y-4 relative z-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-base font-medium py-2 border-b border-[#E5DAC8]/60 transition-colors flex items-center justify-between ${
                  link.active ? "text-[#181615] font-semibold" : "text-[#262320] hover:text-[#7A5B2E]"
                }`}
              >
                <span>{link.label}</span>
                {link.active && <span className="w-1.5 h-1.5 rounded-full bg-[#181615]" />}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <a
                id="mobile-drawer-proposal-button"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1E1C1A] text-[#FAF8F5] text-sm font-medium py-3 rounded-xl transition-all shadow-sm"
              >
                <span>Solicitar proposta</span>
                <ArrowRight className="w-4 h-4 text-[#EFEBE4]" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-[#C2A67E]/50 bg-[#FAF7F0] text-[#262320] text-sm font-medium py-3 rounded-xl transition-all hover:bg-[#EDE5D8]"
              >
                <Phone className="w-4 h-4 text-[#786A5A]" />
                <span>Conversar no WhatsApp</span>
              </a>

              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-[#C2A67E]/50 bg-[#FAF7F0] text-[#262320] text-sm font-medium py-3 rounded-xl transition-all hover:bg-[#EDE5D8]"
              >
                <Instagram className="w-4 h-4 text-[#786A5A]" />
                <span>Instagram (@isabela.assessoria_)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
