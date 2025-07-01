
import React from 'react';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';

const CareerTimeline = () => {
  const experiences = [
    {
      title: "Senior DevOps Engineer",
      company: "Current Company",
      duration: "2022 - Present",
      location: "Remote",
      achievements: [
        "Built zero-downtime deployment system for 500+ microservices",
        "Implemented GitOps workflows reducing deployment time by 75%",
        "Led migration to Kubernetes achieving 99.9% uptime",
        "Established infrastructure security standards and compliance"
      ],
      technologies: ["Kubernetes", "AWS", "Terraform", "ArgoCD", "Prometheus"],
      color: "border-green-500"
    },
    {
      title: "Cloud Infrastructure Engineer",
      company: "Previous Company",
      duration: "2020 - 2022",
      location: "Hybrid",
      achievements: [
        "Migrated on-premises legacy systems to AWS saving $1.2M/year",
        "Designed and implemented multi-region disaster recovery",
        "Automated infrastructure provisioning reducing manual effort by 90%",
        "Optimized cloud costs through right-sizing and reserved instances"
      ],
      technologies: ["AWS", "Terraform", "Jenkins", "Docker", "Ansible"],
      color: "border-blue-500"
    },
    {
      title: "DevOps Engineer",
      company: "Tech Startup",
      duration: "2018 - 2020",
      location: "On-site",
      achievements: [
        "Established CI/CD pipelines from scratch using Jenkins",
        "Containerized applications reducing deployment complexity",
        "Implemented monitoring and alerting with Prometheus/Grafana",
        "Created infrastructure as code practices"
      ],
      technologies: ["Jenkins", "Docker", "AWS", "Monitoring", "Scripting"],
      color: "border-purple-500"
    },
    {
      title: "Systems Administrator",
      company: "Enterprise Corp",
      duration: "2016 - 2018",
      location: "On-site",
      achievements: [
        "Managed Linux/Windows server infrastructure",
        "Automated routine maintenance tasks with Shell/PowerShell",
        "Implemented backup and disaster recovery procedures",
        "Maintained 99.5% system uptime across all environments"
      ],
      technologies: ["Linux", "Windows", "VMware", "Networking", "Scripting"],
      color: "border-cyan-500"
    }
  ];

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Career Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            A progression through infrastructure evolution, from traditional systems to cloud-native architectures
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${index === experiences.length - 1 ? 'pb-0' : ''}`}>
              <div className={`project-card border-2 ${exp.color} ml-4`}>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 font-sans">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-gray-300 font-sans">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="flex items-center text-gray-400 text-sm mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-green-400 font-semibold mb-3 flex items-center font-sans">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <span className="text-green-400 mr-2 mt-1">▶</span>
                        <span className="text-gray-300 leading-relaxed font-sans">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-blue-400 font-semibold mb-3 font-sans">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-black/50 text-sm rounded-full border border-gray-700 text-gray-300 hover:border-blue-400 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className="text-center mt-12">
          <a 
            href="https://www.linkedin.com/in/pradeeptraje/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            View Full Professional Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
