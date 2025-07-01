
import React from 'react';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';

const CareerTimeline = () => {
  const experiences = [
    {
      title: "DevOps Engineer & Senior UI/UX Developer",
      company: "TechExped Technology Services Pvt Ltd | Everfi from Blackbaud.inc",
      duration: "April 2022 - Present",
      location: "Washington, United States",
      achievements: [
        "Designed multi-stage CI/CD pipelines with GitHub, Jenkins, SonarQube, reducing manual errors by 30%",
        "Implemented scalable cloud infrastructure using Terraform, cutting monthly costs by 10%",
        "Dockerized applications and orchestrated K8s deployments, reducing deployment times by 25%",
        "Established monitoring with Prometheus/Grafana, reducing incident response times by 35%",
        "Delivered 100+ responsive web templates from Figma designs, improving turnaround by 30%",
        "Spearheaded ADA compliance initiatives for 15+ client websites achieving 100% accessibility"
      ],
      technologies: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Prometheus", "Grafana", "HTML5", "CSS3", "React"],
      color: "border-green-500"
    },
    {
      title: "Online Content Moderator",
      company: "Accenture in India",
      duration: "February 2022 - May 2022",
      location: "Mumbai, Maharashtra, India",
      achievements: [
        "Moderated 500+ daily social media posts with 99.9% compliance accuracy",
        "Flagged and resolved 1,200+ policy violations within SLA deadlines",
        "Automated repetitive tasks using AutoHotkey macros, reducing review time by 20%",
        "Collaborated on UI improvements for internal moderation tools"
      ],
      technologies: ["AutoHotkey", "Content Moderation", "Process Automation", "UI/UX"],
      color: "border-blue-500"
    },
    {
      title: "Trader | Trainer | Associate Partner",
      company: "Profitmart Securities Pvt. Ltd.",
      duration: "June 2018 - February 2022",
      location: "Kolhapur, Maharashtra, India",
      achievements: [
        "Developed 20+ AutoHotkey v1 scripts for trade automation, boosting profits by 18%+ monthly",
        "Integrated utilities with AWS EC2, saving 50% of cloud runtime costs annually",
        "Designed front-end interfaces using HTML5, CSS3, Bootstrap for real-time trading data",
        "Streamlined REST API integrations improving data flow between algorithms and UI dashboards"
      ],
      technologies: ["AutoHotkey", "AWS EC2", "HTML5", "CSS3", "Bootstrap", "REST APIs"],
      color: "border-purple-500"
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
            5+ years of experience bridging DevOps automation with UI/UX development
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
