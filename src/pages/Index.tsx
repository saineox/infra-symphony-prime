
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
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
  console.log('Index page rendering...');
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ErrorBoundary>
        <Navigation />
      </ErrorBoundary>
      <div className="pt-16">
        <ErrorBoundary>
          <section id="hero">
            <Hero />
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <section id="devops-philosophy">
            <DevOpsPhilosophy />
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <section id="technical-arsenal">
            <TechnicalArsenal />
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <section id="project-showcase">
            <ProjectShowcase />
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <section id="testimonials">
            <Testimonials />
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <section id="career-timeline">
            <CareerTimeline />
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <section id="contact-terminal">
            <ContactTerminal />
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Index;
