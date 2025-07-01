
import React from 'react';
import Navigation from '../components/Navigation';
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
      <Navigation />
      <div className="pt-16">
        <section id="hero">
          <Hero />
        </section>
        <section id="devops-philosophy">
          <DevOpsPhilosophy />
        </section>
        <section id="technical-arsenal">
          <TechnicalArsenal />
        </section>
        <section id="project-showcase">
          <ProjectShowcase />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="career-timeline">
          <CareerTimeline />
        </section>
        <section id="contact-terminal">
          <ContactTerminal />
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
