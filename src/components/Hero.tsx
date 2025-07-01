
import React, { useState, useEffect } from 'react';
import { Terminal, Code, Server, GitBranch } from 'lucide-react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'deploy --profile "Pradeep Traje: Senior DevOps Engineer"';

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
              <span className="terminal-prompt">pradeep@devops-elite:~$</span>
              <span className="ml-2">{typedText}</span>
              <span className="terminal-cursor"></span>
            </div>
            
            {currentIndex >= fullText.length && (
              <div className="terminal-text mt-2 text-green-300">
                <span>✓ Profile loaded successfully</span><br />
                <span>✓ Infrastructure orchestration: READY</span><br />
                <span>✓ Automation pipeline: ACTIVE</span>
              </div>
            )}
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Pradeep Traje
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 font-sans">
            <span className="text-green-400 neon-glow">Senior DevOps Engineer</span>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            <span className="text-cyan-400">"Transforming Infrastructure Chaos</span>
            <br />
            <span className="text-green-400">into Automated Symphony"</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 neon-border border-green-500 hover:shadow-lg hover:scale-105">
              View Infrastructure
            </button>
            <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
              Download Resume
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 neon-glow">500+</div>
              <div className="text-gray-400 text-sm">Microservices Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 neon-glow">$1.2M</div>
              <div className="text-gray-400 text-sm">Annual Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 neon-glow">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime Achieved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
