import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { ForWhomSection } from "./components/ForWhomSection";
import { DifferentiatorsSection } from "./components/DifferentiatorsSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { PrivacyModal } from "./components/PrivacyModal";
import { ProposalModal } from "./components/ProposalModal";

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  const scrollToContact = () => {
    const contactEl = document.getElementById("contato");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#242220] flex flex-col selection:bg-[#E8DFD1] selection:text-[#1F1E1D]">
      {/* Top Header / Navigation */}
      <Navbar onOpenProposal={() => setIsProposalOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero / Primeira Dobra */}
        <Hero onOpenProposal={() => setIsProposalOpen(true)} />

        {/* 2. Seção de Problema */}
        <ProblemSection />

        {/* 3. Sobre a ISABELA */}
        <AboutSection />

        {/* 4. Serviços */}
        <ServicesSection onOpenProposal={() => setIsProposalOpen(true)} />

        {/* 5. Como Funciona */}
        <HowItWorksSection onOpenProposal={() => setIsProposalOpen(true)} />

        {/* 6. Para Quem É */}
        <ForWhomSection />

        {/* 7. Diferenciais */}
        <DifferentiatorsSection />

        {/* 8. Comparação Visual (Antes x Com a assessoria) */}
        <ComparisonSection onOpenProposal={() => setIsProposalOpen(true)} />

        {/* 9. Depoimentos */}
        <TestimonialsSection />

        {/* 10. FAQ */}
        <FaqSection />

        {/* 11. CTA Final */}
        <FinalCtaSection onOpenProposal={() => setIsProposalOpen(true)} />

        {/* 12. Contato / Solicitação de Proposta */}
        <ContactSection onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      </main>

      {/* 13. Rodapé */}
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* 14. Botão Flutuante de WhatsApp */}
      <FloatingWhatsApp />

      {/* Modais Acessíveis */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        onScrollToContact={scrollToContact}
      />
    </div>
  );
}
