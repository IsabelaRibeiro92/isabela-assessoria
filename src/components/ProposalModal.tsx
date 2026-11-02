import React, { useEffect } from "react";
import { X, MessageCircle, FileText, ArrowRight, Sparkles, Instagram } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "../config/siteConfig";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToContact: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  onScrollToContact,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectContact = () => {
    onClose();
    onScrollToContact();
  };

  return (
    <div
      id="proposal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1D1B]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="proposal-modal-content"
        className="bg-[#FAF9F6] border border-[#DDD3C2] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="proposal-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E1D5] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A88858]" />
            <h2 id="proposal-modal-title" className="font-serif text-lg font-medium text-[#242220]">
              Solicitar proposta personalizada
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#666059] hover:text-[#242220] hover:bg-[#F2ECE1] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-5">
          <p className="text-sm text-[#55504A] leading-relaxed">
            Como prefere dar o primeiro passo para organizar a rotina e o atendimento do seu
            consultório?
          </p>

          {/* Option 1: WhatsApp Instant Contact */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-[#C2A67E]/60 bg-[#FFFFFF] hover:bg-[#FDFBF7] transition-all group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#F7F3EB] border border-[#E8DFC9] flex items-center justify-center text-[#8C6D3F]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D3F] block">
                  Mais rápido
                </span>
                <p className="text-sm font-semibold text-[#242220]">
                  Conversar direto no WhatsApp
                </p>
                <p className="text-xs text-[#6E6963]">
                  Fale com a ISABELA em tempo real
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A88858] transition-transform group-hover:translate-x-1" />
          </a>

          {/* Option 2: Web Form */}
          <button
            type="button"
            onClick={handleSelectContact}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-[#DDD5C7] bg-[#FFFFFF] hover:bg-[#FAF9F6] transition-all group shadow-xs text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#EFEAE1] border border-[#DDD3C2] flex items-center justify-center text-[#6B6358]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#242220]">
                  Preencher formulário no site
                </p>
                <p className="text-xs text-[#6E6963]">
                  Envie especialidade, cidade e volume de pacientes
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8C8377] transition-transform group-hover:translate-x-1" />
          </button>

          {/* Option 3: Instagram */}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-4 rounded-xl border border-[#DDD5C7] bg-[#FFFFFF] hover:bg-[#FAF9F6] transition-all group shadow-xs text-left"
            title="Conhecer o Instagram @isabela.assessoria_"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#F7F3EB] border border-[#E8DFC9] flex items-center justify-center text-[#8C6D3F]">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#242220]">
                  Acompanhar no Instagram
                </p>
                <p className="text-xs text-[#6E6963]">
                  {siteConfig.instagramHandle}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8C8377] transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F5F2EB] border-t border-[#E8E1D5] text-center text-xs text-[#78716A]">
          Atendimento exclusivo para médicos e profissionais da saúde
        </div>
      </div>
    </div>
  );
};
