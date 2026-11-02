/**
 * ISABELA - Assessoria & Gestão Médica - Configurações Gerais da Marca e Contato
 * 
 * INSTRUÇÕES:
 * Insira abaixo as informações reais da ISABELA Assessoria & Gestão Médica quando disponíveis.
 * Não foram inventados números ou dados pessoais fictícios.
 */

export interface SiteConfig {
  companyName: string;
  tagline: string;
  positioning: string;
  /**
   * Número de WhatsApp com código do país e DDD (apenas números).
   * Exemplo: '5511999999999'
   * Deixe vazio se ainda não configurado.
   */
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  
  /**
   * E-mail institucional de contato.
   * Exemplo: 'contato@isabelaassessoria.med.br'
   */
  email: string;
  
  /**
   * Perfil do Instagram.
   * Exemplo: '@isabela.assessoria_'
   */
  instagramHandle: string;
  instagramUrl: string;
  
  /**
   * Cidade / Base de atendimento.
   */
  location: string;
  
  /**
   * CNPJ da empresa (quando aplicável).
   */
  cnpj: string;
  
  /**
   * URL ou caminho da foto profissional (para Hero e Sobre).
   * Caso não haja foto no momento, os componentes exibem um placeholder
   * visualmente refinado e discreto, sem fotos genéricas falsas.
   */
  heroPhotoUrl: string;
  aboutPhotoUrl: string;
}

export const siteConfig: SiteConfig = {
  companyName: "ISABELA",
  tagline: "Assessoria & Gestão Médica",
  positioning: "Assessoria e gestão médica remota especializada na rotina de médicos e consultórios.",
  
  // INSERIR AQUI O NÚMERO DO WHATSAPP (Ex: '5511999999999')
  whatsappNumber: "+55 19 98414-1762", 
  
  whatsappDefaultMessage: "Olá, Isabela! Conheci a Isabela Assessoria e Gestão Médica pelo site e gostaria de saber mais sobre os serviços.",
  
  // INSERIR AQUI O E-MAIL OFICIAL DE CONTATO
  email: "",
  
  // INSERIR AQUI O LINK DO INSTAGRAM
  instagramHandle: "@isabela.assessoria_",
  instagramUrl: "https://www.instagram.com/isabela.assessoria_/",
  
  // INSERIR AQUI A CIDADE OU INFORMAÇÃO DE ATENDIMENTO
  location: "Atendimento remoto para todo o Brasil",
  
  // INSERIR AQUI O CNPJ (opcional)
  cnpj: "",
  
  // Fotos profissionais (deixar em branco para exibir o placeholder elegante)
  heroPhotoUrl: "https://i.postimg.cc/tTrmcsRk/Whats-App-Image-2026-09-09-at-11-38-58.jpg",
  aboutPhotoUrl: "https://i.postimg.cc/FH7cb1wr/Whats-App-Image-2026-09-09-at-12-32-28.jpg",
};

/**
 * Retorna o link para o WhatsApp com mensagem formatada.
 * Se o número ainda não estiver configurado, retorna link com parâmetro de texto
 * ou pode ser tratado no componente para orientar o visitante.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || siteConfig.whatsappDefaultMessage).replace(/!/g, "%21");
  if (siteConfig.whatsappNumber && siteConfig.whatsappNumber.trim() !== "") {
    const cleanNumber = siteConfig.whatsappNumber.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}?text=${message}`;
  }
  // Se ainda não configurado, gera link padrão da API WhatsApp
  return `https://api.whatsapp.com/send?text=${message}`;
}
