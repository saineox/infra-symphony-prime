
import React, { useState, useEffect } from 'react';
import { Cloud, Container, Settings, GitBranch, Shield, BarChart3, Code, Palette } from 'lucide-react';

const TechnicalArsenal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('technical-arsenal');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      icon: Cloud,
      title: "Cloud Platforms",
      color: "text-blue-400",
      skills: [
        { name: "AWS", level: 95, description: "Expert" },
        { name: "EC2 & S3", level: 90, description: "Professional" },
        { name: "Cloud Cost Optimization", level: 85, description: "Professional" }
      ]
    },
    {
      icon: Container,
      title: "Orchestration & Containerization",
      color: "text-green-400",
      skills: [
        { name: "Kubernetes", level: 90, description: "Professional" },
        { name: "Docker", level: 95, description: "Expert" },
        { name: "Container Orchestration", level: 85, description: "Professional" }
      ]
    },
    {
      icon: Settings,
      title: "Infrastructure as Code",
      color: "text-purple-400",
      skills: [
        { name: "Terraform", level: 90, description: "Professional" },
        { name: "YAML Configurations", level: 95, description: "Expert" },
        { name: "Infrastructure Automation", level: 90, description: "Professional" }
      ]
    },
    {
      icon: GitBranch,
      title: "CI/CD & Version Control",
      color: "text-cyan-400",
      skills: [
        { name: "Jenkins", level: 95, description: "Expert" },
        { name: "GitHub Actions", level: 90, description: "Professional" },
        { name: "ArgoCD", level: 85, description: "Professional" }
      ]
    },
    {
      icon: BarChart3,
      title: "Monitoring & Observability",
      color: "text-orange-400",
      skills: [
        { name: "Prometheus", level: 95, description: "Expert" },
        { name: "Grafana", level: 95, description: "Expert" },
        { name: "ELK Stack", level: 80, description: "Professional" }
      ]
    },
    {
      icon: Shield,
      title: "Security & Quality",
      color: "text-red-400",
      skills: [
        { name: "SonarQube", level: 85, description: "Professional" },
        { name: "Trivy Security Scanning", level: 80, description: "Professional" },
        { name: "ADA Compliance", level: 90, description: "Professional" }
      ]
    },
    {
      icon: Code,
      title: "Frontend Development",
      color: "text-pink-400",
      skills: [
        { name: "HTML5 & CSS3", level: 95, description: "Expert" },
        { name: "JavaScript & React", level: 90, description: "Professional" },
        { name: "Bootstrap & Responsive Design", level: 95, description: "Expert" }
      ]
    },
    {
      icon: Palette,
      title: "Automation & Scripting",
      color: "text-yellow-400",
      skills: [
        { name: "AutoHotkey v1/v2", level: 95, description: "Expert" },
        { name: "Python Scripting", level: 85, description: "Professional" },
        { name: "Bash Scripting", level: 80, description: "Professional" }
      ]
    }
  ];

  return (
    <section id="technical-arsenal" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            Comprehensive toolkit spanning DevOps automation, cloud infrastructure, and UI/UX development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="project-card">
              <div className="flex items-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-black/50 border-2 border-current ${category.color} mr-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold ${category.color} font-sans`}>
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium font-sans text-sm">{skill.name}</span>
                      <span className={`text-xs ${category.color} font-bold`}>
                        {skill.description}
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8 font-sans">Certifications & Training</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-black/30 border border-gray-700 rounded-lg p-4">
              <span className="text-green-400 font-semibold">Certified Kubernetes Application Developer (CKAD)</span>
            </div>
            <div className="bg-black/30 border border-gray-700 rounded-lg p-4">
              <span className="text-blue-400 font-semibold">Advance DevOps - Zero To Hero</span>
            </div>
            <div className="bg-black/30 border border-gray-700 rounded-lg p-4">
              <span className="text-purple-400 font-semibold">DevSecOps - Kubernetes DevOps & Security</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 neon-glow">5+</div>
            <div className="text-gray-400 text-sm font-sans">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 neon-glow">25+</div>
            <div className="text-gray-400 text-sm font-sans">Automation Scripts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 neon-glow">135+</div>
            <div className="text-gray-400 text-sm font-sans">Landing Pages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 neon-glow">1000+</div>
            <div className="text-gray-400 text-sm font-sans">Hours Saved</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalArsenal;
