import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, MessageCircle, Instagram, ShieldAlert, ArrowRight } from "lucide-react";
import { ContactFormData } from "../types";
import { siteConfig, getWhatsAppUrl } from "../config/siteConfig";

interface ContactSectionProps {
  onOpenPrivacy: () => void;
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, informe seu nome completo.";
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = "Informe sua especialidade ou área de atuação.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Informe sua cidade e estado.";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Informe um número de WhatsApp para contato.";
    } else if (formData.whatsapp.replace(/\D/g, "").length < 10) {
      newErrors.whatsapp = "Digite um número de telefone com DDD válido.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Informe seu endereço de e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Informe um endereço de e-mail válido.";
    }

    if (!formData.patientVolume.trim()) {
      newErrors.patientVolume = "Selecione ou informe a média de atendimentos.";
    }

    if (!formData.consent) {
      newErrors.consent = "Você precisa autorizar o contato para receber a proposta.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    /**
     * NOTA TÉCNICA DE INTEGRAÇÃO DE BACKEND:
     * O formulário valida os dados localmente. Caso deseje conectar a um serviço
     * de envio de e-mail (ex: Resend, EmailJS, Webhook, CRM ou API server-side),
     * a chamada assíncrona deve ser inserida aqui.
     * Como não há backend configurado por padrão, oferecemos o envio direto
     * estruturado via WhatsApp com os dados preenchidos.
     */
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const generateWhatsAppMessageFromForm = (): string => {
    return `Olá! Gostaria de solicitar uma proposta para meu consultório com a ISABELA Assessoria & Gestão Médica:
- Nome: ${formData.name}
- Especialidade: ${formData.specialty}
- Cidade: ${formData.city}
- Média de Atendimentos: ${formData.patientVolume}
- E-mail: ${formData.email}
- WhatsApp: ${formData.whatsapp}
${formData.message ? `- Mensagem: ${formData.message}` : ""}`;
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
          {isSubmitted ? (
            <div id="contact-success-box" className="py-8 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#F3EFE6] border border-[#D5C8B4] flex items-center justify-center text-[#7F643B] mx-auto mb-5">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#242220] font-medium mb-3">
                Solicitação registrada com sucesso!
              </h3>
              <p className="text-sm sm:text-base text-[#57524C] max-w-lg mx-auto leading-relaxed mb-6">
                Obrigada pelo interesse, Dr(a). <strong>{formData.name}</strong>. Para acelerar o
                alinhamento da sua proposta, você pode enviar estes dados diretamente para o WhatsApp
                da ISABELA agora mesmo:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
                <a
                  href={getWhatsAppUrl(generateWhatsAppMessageFromForm())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#242220] hover:bg-[#383532] text-[#FAF9F6] text-sm font-medium px-6 py-3 rounded-xl transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4C3A3]" />
                  <span>Continuar pelo WhatsApp</span>
                </a>

                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#D6CAB8] text-[#55504A] text-sm font-medium px-5 py-3 rounded-xl hover:bg-[#FAF9F6] transition-all"
                  title="Conhecer o perfil no Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#8C6D3F]" />
                  <span>Instagram</span>
                </a>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      specialty: "",
                      city: "",
                      whatsapp: "",
                      email: "",
                      patientVolume: "",
                      message: "",
                      consent: false,
                    });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#D6CAB8] text-[#55504A] text-sm font-medium px-5 py-3 rounded-xl hover:bg-[#FAF9F6]"
                >
                  Enviar outra mensagem
                </button>
              </div>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#3D3A36] uppercase tracking-wider mb-2">
                    Seu nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Dra. Juliana Fernandes"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.name
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
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
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    placeholder="Ex: Dermatologia, Cardiologia, etc."
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.specialty
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.specialty && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
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
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ex: São Paulo / SP"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.city
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
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
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Ex: (11) 99999-9999"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.whatsapp
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
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
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ex: contato@consultorio.com.br"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#242220] placeholder-[#9E9891] bg-[#FAF9F6] focus:bg-[#FFFFFF] focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-400 focus:ring-1 focus:ring-red-400"
                        : "border-[#DDD5C7] focus:border-[#B39366] focus:ring-1 focus:ring-[#B39366]"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
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
                    id="patientVolume"
                    name="patientVolume"
                    value={formData.patientVolume}
                    onChange={handleChange}
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
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
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
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
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
                    <span>Registrando solicitação...</span>
                  ) : (
                    <>
                      <span>Solicitar uma proposta</span>
                      <ArrowRight className="w-4 h-4 text-[#D4C3A3]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
