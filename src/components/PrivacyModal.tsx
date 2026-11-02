import React, { useEffect } from "react";
import { X, ShieldCheck, AlertCircle } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div
      id="privacy-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1D1B]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="privacy-modal-content"
        className="bg-[#FAF9F6] border border-[#DDD3C2] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="privacy-modal-title"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E8E1D5] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#8C6D3F]" />
            <h2 id="privacy-modal-title" className="font-serif text-xl font-medium text-[#242220]">
              Política de Privacidade & Termos de Uso
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#666059] hover:text-[#242220] hover:bg-[#F2ECE1] transition-colors"
            aria-label="Fechar modal de privacidade"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#57524C] leading-relaxed">
          {/* Medical Notice */}
          <div className="bg-[#F6F2E8] border border-[#DDD2BE] p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#8C6D3F] shrink-0 mt-0.5" />
            <div className="text-xs text-[#524B3F]">
              <strong className="text-[#2B2723] block mb-1">
                Aviso Importante: Este website não é um prontuário eletrônico ou sistema de saúde.
              </strong>
              Não realizamos diagnósticos médicos, não armazenamos registros clínicos de pacientes e
              não permitimos o envio de exames, laudos ou dados de saúde por meio de formulários
              comerciais.
            </div>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-[#242220] mb-2">
              1. Coleta de Informações Comerciais
            </h3>
            <p>
              Os dados solicitados no formulário deste site (nome, especialidade médica, cidade,
              WhatsApp, e-mail e volume de atendimentos) são utilizados exclusivamente para responder
              à sua solicitação de orçamento, alinhar detalhes da rotina do seu consultório e
              apresentar a proposta de assessoria remota da {siteConfig.companyName}.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-[#242220] mb-2">
              2. Confidencialidade e Não Compartilhamento
            </h3>
            <p>
              Garantimos que as informações profissionais fornecidas jamais serão vendidas, cedidas
              ou transferidas a terceiros para fins de propaganda ou mailing não solicitado. O
              contato é mantido estritamente no âmbito da prestação de serviços de assessoria e
              gestão médica.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-[#242220] mb-2">
              3. Prestação de Serviços Remotos
            </h3>
            <p>
              A assessoria prestada pela {siteConfig.companyName} atua com funções operacionais de
              gestão de rotinas, agendamento de consultas, confirmação prévia e comunicação
              administrativa. Qualquer conduta clínica ou decisão médica permanece sob total
              autonomia e responsabilidade do profissional contratante.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-[#242220] mb-2">
              4. Atualização e Exclusão de Dados
            </h3>
            <p>
              A qualquer momento, o profissional que entrou em contato pode solicitar a atualização
              ou exclusão dos seus dados de cadastro enviando uma mensagem para os nossos canais
              oficiais de atendimento.
            </p>
          </div>

          <p className="text-[11px] text-[#857E75] pt-2 border-t border-[#EAE3D6]">
            Última atualização: Setembro de 2026. Documento editável conforme as particularidades
            jurídicas da empresa.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E8E1D5] bg-[#FFFFFF] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#242220] text-[#FAF9F6] text-xs font-medium hover:bg-[#383532] transition-colors"
          >
            Entendido e fechar
          </button>
        </div>
      </div>
    </div>
  );
};
