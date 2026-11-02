/**
 * Definições de Tipos para o site ISABELA Assessoria & Gestão Médica
 */

export interface ContactFormData {
  name: string;
  specialty: string;
  city: string;
  whatsapp: string;
  email: string;
  patientVolume: string;
  message: string;
  consent: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  details: string[];
  iconName: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

export interface AudienceItem {
  title: string;
  description: string;
}

export interface DifferentiatorItem {
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  doctorName: string;
  specialty: string;
  location: string;
  quote: string;
  isPlaceholder?: boolean;
}
