import React, { useState, useRef } from "react";
import {
  Send,
  AlertCircle,
  MessageCircle,
  Instagram,
  ShieldAlert,
  ArrowRight,
  Copy,
  Check,
  FileSpreadsheet,
  ExternalLink,
  RotateCcw,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { ContactFormData } from "../types";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";

interface ContactSectionProps {
  onOpenPrivacy: () => void;
}

interface SubmittedState {
  protocol: string;
  whatsappUrl: string;
  messageText: string;
  isSavedInDatabase: boolean;
  data: ContactFormData;
  submittedAt: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenPrivacy }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    specialty: "",
    city: "",
    whatsapp: "",
    email: "",
    patientVolume: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmittedState | null>(null);
  const [copied, setCopied] = useState(false);

  // Field refs to scroll/focus first invalid input
  const nameRef = useRef<HTMLInputElement>(null);
  const specialtyRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const patientVolumeRef = useRef<HTMLSelectElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  // Mask function for telephone/WhatsApp
  const formatPhone = (val: string): string => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Por favor, informe seu nome completo.";
    }

    if (!formData.specialty.trim() || formData.specialty.trim().length < 2) {
      newErrors.specialty = "Informe sua especialidade ou área médica.";
    }

    if (!formData.city.trim() || formData.city.trim().length < 2) {
      newErrors.city = "Informe sua cidade e estado (ex: Campinas / SP).";
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.whatsapp = "Informe um número de WhatsApp com DDD para contato.";
    } else if (cleanPhone.length < 10) {
      newErrors.whatsapp = "Digite um número válido com DDD (mínimo 10 dígitos).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Informe seu endereço de e-mail profissional.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Informe um endereço de e-mail válido.";
    }

    if (!formData.patientVolume.trim()) {
      newErrors.patientVolume = "Selecione o volume aproximado de consultas por mês.";
    }

    if (!formData.consent) {
      newErrors.consent = "Você precisa autorizar o contato para receber a proposta.";
    }

    setErrors(newErrors);

    // Focus first invalid element
    if (newErrors.name && nameRef.current) nameRef.current.focus();
    else if (newErrors.specialty && specialtyRef.current) specialtyRef.current.focus();
    else if (newErrors.city && cityRef.current) cityRef.current.focus();
    else if (newErrors.whatsapp && whatsappRef.current) whatsappRef.current.focus();
    else if (newErrors.email && emailRef.current) emailRef.current.focus();
    else if (newErrors.patientVolume && patientVolumeRef.current) patientVolumeRef.current.focus();
    else if (newErrors.consent && consentRef.current) consentRef.current.focus();

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "whatsapp") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const generateWhatsAppMessage = (data: ContactFormData, protocol: string): string => {
    const lines = [
      `Olá, Isabela! Gostaria de solicitar uma proposta personalizada para meu consultório com a Isabela Assessoria & Gestão Médica.`,
      ``,
      `📋 Dados para Elaboração da Proposta (Protocolo: #${protocol}):`,
      `• Nome: ${data.name.trim()}`,
      `• Especialidade: ${data.specialty.trim()}`,
      `• Cidade / UF: ${data.city.trim()}`,
      `• Volume mensal: ${data.patientVolume}`,
      `• WhatsApp do consultório: ${data.whatsapp.trim()}`,
      `• E-mail: ${data.email.trim()}`,
    ];

    if (data.message && data.message.trim()) {
      lines.push(`• Observações da rotina: ${data.message.trim()}`);
    }

    lines.push(``);
    lines.push(`Fico no aguardo do seu contato para alinharmos os detalhes do atendimento. Obrigado(a)!`);

    return lines.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    let protocol = `ISB-${dateStr}-${randomSuffix}`;
    let isSavedInDatabase = false;

    // 1. Armazenamento com segurança e proteção de dados no servidor
    try {
      const response = await fetch("/api/propostas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.protocol) {
          protocol = result.protocol;
          isSavedInDatabase = true;
        }
      }
    } catch (err) {
      console.warn("Armazenamento via API temporariamente offline, utilizando registro local de backup.", err);
    }

    // 2. Armazenamento de contingência em localStorage do navegador
    try {
      const localBackup = JSON.parse(localStorage.getItem("isabela_propostas_backup") || "[]");
      localBackup.unshift({
        protocol,
        createdAt: now.toISOString(),
        ...formData,
      });
      localStorage.setItem("isabela_propostas_backup", JSON.stringify(localBackup.slice(0, 50)));
    } catch {
      // Ignora erro de localStorage caso desabilitado
    }

    // 3. Gerar mensagem estruturada com todos os dados informados
    const messageText = generateWhatsAppMessage(formData, protocol);
    const whatsappUrl = getWhatsAppUrl(messageText);

    // 4. Abrir o WhatsApp com a mensagem preenchida
    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("Abertura automática de popup impedida pelo navegador:", err);
    }

    // 5. Atualizar o estado da interface para a tela de ação e orientação
    setSubmissionState({
      protocol,
      whatsappUrl,
      messageText,
      isSavedInDatabase,
      data: { ...formData },
      submittedAt: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    });

    setIsSubmitting(false);

    // Rola suavemente até o topo da seção para o usuário ver as orientações
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyMessage = async () => {
    if (!submissionState) return;
    try {
      await navigator.clipboard.writeText(submissionState.messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Falha ao copiar mensagem:", err);
    }
  };

  const handleResetForm = () => {
    setSubmissionState(null);
    setCopied(false);
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3F] mb-3">
            Atendimento Personalizado
          </p>
          <h2
            id="contact-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242220] font-normal tracking-tight leading-tight mb-4"
          >
            Solicite uma proposta para seu consultório
          </h2>
          <p className="text-sm sm:text-base text-[#55504A] leading-relaxed">
            Preencha os dados abaixo para receber um contato detalhado e entender como a assessoria
            remota pode ser aplicada à dinâmica do seu atendimento.
          </p>
        </div>

        {/* Mandatory Explicit Disclaimer */}
        <div
          id="contact-medical-warning"
          className="bg-[#F8F5EE] border border-[#E0D7C6] rounded-xl p-4 mb-8 flex items-start gap-3 text-xs sm:text-sm text-[#665D50]"
        >
          <ShieldAlert className="w-5 h-5 text-[#8C6D3F] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#2B2723]">Aviso importante:</strong> Este formulário é
            destinado exclusivamente a profissionais interessados nos serviços da ISABELA
            Assessoria & Gestão Médica.{" "}
            <span className="font-semibold text-[#242220]">
              Não envie informações clínicas, prontuários, exames ou dados sensíveis de pacientes.
            </span>
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FFFFFF] border border-[#E5DFD4] rounded-2xl p-6 sm:p-10 shadow-xs">
          {submissionState ? (
            /* =========================================================================
             * TELA DE FINALIZAÇÃO E ORIENTAÇÃO DO WHATSAPP (CONFIÁVEL E TRANSPARENTE)
             * ========================================================================= */
            <div id="contact-action-box" className="py-2 animate-in fade-in duration-300">
              {/* Badge de Ação Necessária */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F3EB] border border-[#E8DEC8] text-[#8C6D3F] text-xs font-medium mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>Etapa final: Envio pelo WhatsApp</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#242220] font-medium mb-3">
                Conclua o envio no seu WhatsApp
              </h3>

              {/* Explicação clara e objetiva do fluxo real */}
              <p className="text-sm sm:text-base text-[#57524C] leading-relaxed mb-6">
                Dr(a). <strong>{submissionState.data.name}</strong>, preparamos a sua mensagem com
                todos os dados informados. Uma janela do WhatsApp foi aberta com o texto pronto.
              </p>

              {/* Destaque visual: O usuário ainda precisa clicar em ENVIAR */}
              <div className="bg-[#FFFDF9] border-2 border-[#C2A67E]/50 rounded-xl p-4 sm:p-5 mb-7 text-left">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F7F3EB] border border-[#E5D7BF] flex items-center justify-center text-[#8C6D3F] shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <p className="font-semibold text-[#242220]">
                      Atenção: A Isabela só receberá sua solicitação quando você clicar em "Enviar" no WhatsApp.
                    </p>
                    <p className="text-[#69625A] leading-relaxed">
                      Por segurança, o WhatsApp não envia mensagens sozinho. Caso a janela da conversa não tenha
                      aberto automaticamente ou tenha sido bloqueada pelo navegador, utilize o botão abaixo para
                      abrir a conversa:
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões Principais de Ação */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 mb-8">
                {/* Botão 1: Abrir WhatsApp diretamente */}
                <a
                  href={submissionState.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] text-sm sm:text-base font-medium px-6 py-3.5 rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 text-[#D4C3A3]" />
                  <span>Abrir WhatsApp e Enviar Mensagem</span>
                  <ExternalLink className="w-4 h-4 text-[#A89880]" />
                </a>

                {/* Botão 2: Copiar Mensagem Pronta */}
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center justify-center gap-2 border border-[#D6CAB8] text-[#3D3934] hover:bg-[#FAF9F6] text-sm font-medium px-5 py-3.5 rounded-xl transition-all"
                  title="Copiar texto da mensagem para a área de transferência"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Mensagem copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#8C6D3F]" />
                      <span>Copiar texto da proposta</span>
                    </>
                  )}
                </button>
              </div>

              {/* Informação do Armazenamento de Segurança */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl p-4 sm:p-5 mb-8 text-left text-xs sm:text-sm text-[#5C564E]">
                <div className="flex items-center gap-2 font-medium text-[#2E2B28] mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8C6D3F]" />
                  <span>
                    Protocolo de atendimento gerado:{" "}
                    <strong className="text-[#8C6D3F] font-mono text-xs sm:text-sm">
                      #{submissionState.protocol}
                    </strong>
                  </span>
                </div>
                <p className="text-xs text-[#736E67] leading-relaxed">
                  {submissionState.isSavedInDatabase
                    ? "✓ Cópia de segurança armazenada com proteção de dados no banco de dados local do sistema às " +
                      submissionState.submittedAt +
                      "."
                    : "✓ Dados estruturados com sucesso para transmissão via WhatsApp oficial (+55 19 98414-1762)."}
                </p>
              </div>

              {/* Card de Resumo dos Dados Informados */}
              <div className="border border-[#EBE4D8] rounded-xl p-5 mb-8 text-left bg-[#FFFFFF]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D3F] mb-3">
                  Resumo das informações preparadas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm text-[#45413B]">
                  <div>
                    <span className="text-[#878077]">Nome:</span>{" "}
                    <strong className="text-[#242220] font-medium">{submissionState.data.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#878077]">Especialidade:</span>{" "}
                    <strong className="text-[#242220] font-medium">{submissionState.data.specialty}</strong>
                  </div>
                  <div>
                    <span className="text-[#878077]">Cidade / UF:</span>{" "}
                    <strong className="text-[#242220] font-medium">{submissionState.data.city}</strong>
                  </div>
                  <div>
                    <span className="text-[#878077]">Volume mensal:</span>{" "}
                    <strong className="text-[#242220] font-medium">{submissionState.data.patientVolume}</strong>
                  </div>
                  <div>
                    <span className="text-[#878077]">WhatsApp:</span>{" "}
                    <strong className="text-[#242220] font-medium">{submissionState.data.whatsapp}</strong>
                  </div>
                  <div>
                    <span className="text-[#878077]">E-mail:</span>{" "}
                    <strong className="text-[#242220] font-medium">{submissionState.data.email}</strong>
                  </div>
                </div>

                {submissionState.data.message && (
                  <div className="mt-3 pt-3 border-t border-[#F2ECE1] text-xs sm:text-sm text-[#45413B]">
                    <span className="text-[#878077] block mb-0.5">Observações da rotina:</span>
                    <p className="text-[#242220] italic bg-[#FAF9F6] p-2.5 rounded-lg border border-[#EDE7DC]">
                      "{submissionState.data.message}"
                    </p>
                  </div>
                )}
              </div>

              {/* Links de Apoio / Voltar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F0EAE0] text-xs text-[#736E67]">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-1.5 text-[#5C564E] hover:text-[#242220] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Corrigir dados ou preencher nova solicitação</span>
                </button>

                <div className="flex items-center gap-4">
                  <a
                    href="/api/propostas?format=csv"
                    download="propostas_isabela_assessoria.csv"
                    className="inline-flex items-center gap-1.5 text-[#8C6D3F] hover:text-[#5E4723] transition-colors"
                    title="Exportar planilha de solicitações registradas no sistema (formato CSV)"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Planilha de solicitações (CSV)</span>
                  </a>

                  {siteConfig.instagramUrl && (
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#8C6D3F] hover:text-[#5E4723] transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>{siteConfig.instagramHandle}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
             * FORMULÁRIO DE CAPTAÇÃO COM VALIDAÇÃO COMPLETA
             * ========================================================================= */
            <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#3D3A36] uppercase tracking-wider mb-2">
                    Seu nome completo *
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Dra. Juliana Fernandes"
                    aria-invalid={!!errors.name}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.name
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Especialidade */}
                <div>
                  <label htmlFor="specialty" className="block text-xs font-semibold text-[#3D3A36] uppercase tracking-wider mb-2">
                    Especialidade ou área médica *
                  </label>
                  <input
                    ref={specialtyRef}
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    placeholder="Ex: Dermatologia, Cardiologia, etc."
                    aria-invalid={!!errors.specialty}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.specialty
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.specialty && (
                    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.specialty}</span>
                    </p>
                  )}
                </div>

                {/* Cidade / Estado */}
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-[#3D3A36] uppercase tracking-wider mb-2">
                    Cidade / Estado *
                  </label>
                  <input
                    ref={cityRef}
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ex: Campinas / SP"
                    aria-invalid={!!errors.city}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.city
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.city && (
                    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.city}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-xs font-semibold text-[#3D3A36] uppercase tracking-wider mb-2">
                    WhatsApp para contato *
                  </label>
                  <input
                    ref={whatsappRef}
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Ex: (19) 99999-9999"
                    maxLength={15}
                    aria-invalid={!!errors.whatsapp}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.whatsapp
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.whatsapp}</span>
                    </p>
                  )}
                </div>

                {/* E-mail */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#3D3A36] uppercase tracking-wider mb-2">
                    E-mail profissional *
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ex: contato@consultorio.com.br"
                    aria-invalid={!!errors.email}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Quantidade aproximada de atendimentos */}
                <div>
                  <label htmlFor="patientVolume" className="block text-xs font-semibold text-[#3D3A36] uppercase tracking-wider mb-2">
                    Volume aproximado de consultas / mês *
                  </label>
                  <select
                    ref={patientVolumeRef}
                    id="patientVolume"
                    name="patientVolume"
                    value={formData.patientVolume}
                    onChange={handleChange}
                    aria-invalid={!!errors.patientVolume}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.patientVolume
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  >
                    <option value="">Selecione uma faixa média</option>
                    <option value="Até 30 pacientes/mês">Até 30 atendimentos / mês</option>
                    <option value="30 a 60 pacientes/mês">30 a 60 atendimentos / mês</option>
                    <option value="60 a 120 pacientes/mês">60 a 120 atendimentos / mês</option>
                    <option value="Mais de 120 pacientes/mês">Mais de 120 atendimentos / mês</option>
                    <option value="Consultório em fase de abertura">Consultório em fase de estruturação/abertura</option>
                  </select>
                  {errors.patientVolume && (
                    <p role="alert" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.patientVolume}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Mensagem adicional */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#3D3A36] uppercase tracking-wider mb-2">
                  Mensagem ou particularidades da sua rotina (opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte brevemente sobre seus horários de atendimento ou o principal desafio atual..."
                  className="w-full px-4 py-3 rounded-xl border border-[#DDD5C7] text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366] focus:outline-none transition-all"
                />
              </div>

              {/* Checkbox de consentimento */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    ref={consentRef}
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-[#C8BEAE] text-[#242220] focus:ring-[#B39366] accent-[#242220]"
                  />
                  <span className="text-xs text-[#5C564E] leading-relaxed">
                    Autorizo o contato da assessoria ISABELA exclusivamente para fins de
                    apresentação de proposta comercial e esclarecimentos dos serviços, de acordo
                    com a{" "}
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="text-[#8C6D3F] underline hover:text-[#5E4723]"
                    >
                      Política de Privacidade
                    </button>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p role="alert" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] text-base font-medium py-3.5 px-6 rounded-xl border border-transparent shadow-xs hover:shadow-md transition-all disabled:opacity-70 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin text-[#D4C3A3]" />
                      <span>Preparando envio e registrando...</span>
                    </span>
                  ) : (
                    <>
                      <span>Solicitar uma proposta</span>
                      <ArrowRight className="w-4 h-4 text-[#D4C3A3]" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-[#8C857B] mt-2.5">
                  Ao clicar, seus dados serão registrados com segurança e direcionados para o WhatsApp comercial da Isabela.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
