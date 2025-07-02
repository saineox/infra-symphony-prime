
import React, { useState, useEffect } from 'react';
import { Terminal, Code, Server, GitBranch, Star, Users, Trophy } from 'lucide-react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'deploy --profile "Pradeep Kadam: DevOps Engineer & UI/UX Developer"';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Floating tech icons */}
      <div className="absolute inset-0">
        <Terminal className="particle w-6 h-6 text-green-400 top-20 left-10 animate-pulse" style={{animationDelay: '0s'}} />
        <Code className="particle w-8 h-8 text-blue-400 top-40 right-20 animate-pulse" style={{animationDelay: '2s'}} />
        <Server className="particle w-5 h-5 text-purple-400 bottom-32 left-32 animate-pulse" style={{animationDelay: '4s'}} />
        <GitBranch className="particle w-7 h-7 text-cyan-400 bottom-20 right-10 animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <div className="terminal max-w-3xl mx-auto mb-8">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="text-gray-400 ml-4">bash</span>
            </div>
            
            <div className="terminal-text">
              <span className="terminal-prompt">pradeep@devops-portfolio:~$</span>
              <span className="ml-2">{typedText}</span>
              <span className="terminal-cursor"></span>
            </div>
            
            {currentIndex >= fullText.length && (
              <div className="terminal-text mt-2 text-green-300">
                <span>✓ Profile loaded successfully</span><br />
                <span>✓ Automation workflows: ACTIVE</span><br />
                <span>✓ Cloud infrastructure: OPTIMIZED</span><br />
                <span>✓ GitHub Status: TOP 1% CONTRIBUTOR</span>
              </div>
            )}
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-1 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img 
                  src="/lovable-uploads/4e18bbe6-9029-4a52-b8bf-99c5281549ba.png" 
                  alt="Pradeep Kadam Profile Picture"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    console.log('Image failed to load');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Pradeep Kadam
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 font-sans">
            <span className="text-green-400 neon-glow">DevOps Engineer</span>
            <span className="text-gray-400 mx-2">+</span>
            <span className="text-blue-400 neon-glow">UI/UX Developer</span>
          </div>

          {/* GitHub Achievement Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg px-6 py-3 backdrop-blur-sm">
              <div className="flex items-center space-x-3 text-yellow-400">
                <Trophy className="w-6 h-6" />
                <span className="font-semibold">GitHub Top 1% Contributor</span>
                <Star className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            <span className="text-cyan-400">"Great infrastructure is invisible—it just works.</span>
            <br />
            <span className="text-green-400">Automation is the secret sauce that makes it possible."</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="https://www.linkedin.com/in/pradeeptraje/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 neon-border border-green-500 hover:shadow-lg hover:scale-105"
            >
              View LinkedIn Profile
            </a>
            <a 
              href="mailto:pradeeptraje@gmail.com"
              className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Contact Me
            </a>
          </div>

          {/* Contact Info */}
          <div className="text-center mb-12">
            <p className="text-gray-400 mb-2">
              📧 <a href="mailto:pradeeptraje@gmail.com" className="text-green-400 hover:text-green-300 transition-colors">pradeeptraje@gmail.com</a>
            </p>
            <p className="text-gray-400">
              📱 <span className="text-blue-400">+91 9226325101</span>
            </p>
          </div>

          {/* Enhanced Stats with GitHub achievements */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 neon-glow">Top 1%</div>
              <div className="text-gray-400 text-sm">GitHub Contributor</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 neon-glow">205+</div>
              <div className="text-gray-400 text-sm">Landing Pages Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 neon-glow">40%</div>
              <div className="text-gray-400 text-sm">Deployment Time Reduced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 neon-glow">$12K</div>
              <div className="text-gray-400 text-sm">Annual Cost Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
