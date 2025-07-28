
import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate position with navigation height offset
      const navHeight = 80; // Approximate height of navigation
      const elementPosition = element.offsetTop - navHeight;
      
      // Create a longer, more gradual scroll animation with enhanced easing
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = 3500; // 3.5 seconds for slower, smoother scroll
      let startTime: number | null = null;

      // Enhanced easing function for smoother, more elegant scrolling
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'devops-philosophy', label: 'DevOps' },
    { id: 'technical-arsenal', label: 'Skills' },
    { id: 'project-showcase', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'career-timeline', label: 'Experience' },
    { id: 'contact-terminal', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gradient-to-r from-green-500/40 via-blue-500/40 to-purple-500/40 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img 
                src="/lovable-uploads/417ac179-2146-4012-9a7b-05b995ed74c3.png" 
                alt="Pradeep Kadam" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-purple-400/20 rounded-xl animate-pulse"></div>
            </div>
            <span className="text-white font-semibold hidden sm:block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Pradeep Kadam</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-gray-300 hover:text-green-400 transition-all duration-300 text-sm font-medium group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/saineox"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/pradeeptraje/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:pradeeptraje@gmail.com"
              className="p-2 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-400/10 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 border-t border-green-500/20">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-green-400 hover:bg-green-500/10 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-700">
                <a
                  href="https://github.com/saineox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pradeeptraje/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:pradeeptraje@gmail.com"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
