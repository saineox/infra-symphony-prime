
import React from 'react';
import Hero from '../components/Hero';
import DevOpsPhilosophy from '../components/DevOpsPhilosophy';
import TechnicalArsenal from '../components/TechnicalArsenal';
import ProjectShowcase from '../components/ProjectShowcase';
import Testimonials from '../components/Testimonials';
import CareerTimeline from '../components/CareerTimeline';
import ContactTerminal from '../components/ContactTerminal';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <DevOpsPhilosophy />
      <TechnicalArsenal />
      <ProjectShowcase />
      <Testimonials />
      <CareerTimeline />
      <ContactTerminal />
      <Footer />
    </div>
  );
};

export default Index;
