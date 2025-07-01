
import React from 'react';
import { Code2, Shield, Zap } from 'lucide-react';

const DevOpsPhilosophy = () => {
  const principles = [
    {
      icon: Code2,
      title: "Infrastructure as Poetry",
      description: "Every line of code should be elegant, purposeful, and self-documenting",
      color: "text-green-400"
    },
    {
      icon: Shield,
      title: "Security as Default",
      description: "Security isn't an afterthought—it's the foundation of everything we build",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Failure as Fuel",
      description: "Every failure is a learning opportunity that strengthens our resilience",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            DevOps Philosophy
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            Three core principles that guide every architectural decision and automation strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {principles.map((principle, index) => (
            <div key={index} className="project-card text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 mb-6 border-2 border-current ${principle.color} group-hover:scale-110 transition-transform duration-300`}>
                <principle.icon className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${principle.color} font-sans`}>
                {principle.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-sans">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* CI/CD Pipeline Visualization */}
        <div className="terminal max-w-4xl mx-auto">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <span className="text-gray-400 ml-4">CI/CD Pipeline Status</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-green-400">●</span>
              <span className="text-gray-300">Source Code Push</span>
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-green-400">✓</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-blue-400">●</span>
              <span className="text-gray-300">Automated Testing</span>
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-blue-400">✓</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-purple-400">●</span>
              <span className="text-gray-300">Security Scanning</span>
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-purple-400">✓</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-cyan-400">●</span>
              <span className="text-gray-300">Container Build</span>
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div className="bg-cyan-400 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-cyan-400">✓</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-green-400">●</span>
              <span className="text-gray-300">Production Deploy</span>
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-green-400">✓</span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <span className="text-green-400">Pipeline Status: </span>
            <span className="text-green-300 font-bold">HEALTHY</span> 
            <span className="text-gray-400 ml-4">Last deploy: 2 minutes ago</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevOpsPhilosophy;
