
import React from 'react';
import { ExternalLink, GitBranch, Star, Eye } from 'lucide-react';

const ProjectShowcase = () => {
  const projects = [
    {
      title: "Kubernetes Autoscaler Optimization",
      description: "Advanced predictive scaling system that reduced cluster costs by 40% while maintaining 99.9% uptime",
      repository: "saineox/k8s-autoscaler",
      technologies: ["Kubernetes", "Go", "Prometheus", "Grafana"],
      impact: "40% cost reduction",
      stars: 245,
      views: 1200,
      color: "border-green-500"
    },
    {
      title: "Terraform Multi-Cloud Framework",
      description: "Unified infrastructure framework supporting AWS, Azure, and GCP with automated compliance checking",
      repository: "saineox/terraform-multicloud",
      technologies: ["Terraform", "Python", "AWS", "Azure", "GCP"],
      impact: "$1.2M annual savings",
      stars: 189,
      views: 890,
      color: "border-blue-500"
    },
    {
      title: "GitOps Pipeline with ArgoCD",
      description: "Complete GitOps implementation with automated deployments, rollbacks, and progressive delivery",
      repository: "saineox/gitops-argocd",
      technologies: ["ArgoCD", "Kubernetes", "Helm", "Kustomize"],
      impact: "Zero-downtime deployments",
      stars: 167,
      views: 750,
      color: "border-purple-500"
    },
    {
      title: "Infrastructure Security Scanner",
      description: "Automated security scanning tool that integrates with CI/CD pipelines for continuous compliance",
      repository: "saineox/infra-security-scanner",
      technologies: ["Python", "Docker", "Terraform", "YAML"],
      impact: "100% compliance rate",
      stars: 134,
      views: 620,
      color: "border-red-500"
    },
    {
      title: "Microservices Monitoring Stack",
      description: "Complete observability solution with distributed tracing, metrics, and log aggregation",
      repository: "saineox/microservices-monitoring",
      technologies: ["Prometheus", "Jaeger", "ELK", "Kubernetes"],
      impact: "50% faster troubleshooting",
      stars: 98,
      views: 430,
      color: "border-orange-500"
    },
    {
      title: "Cloud Cost Optimization Engine",
      description: "Machine learning-powered tool for optimizing cloud resource allocation and cost management",
      repository: "saineox/cloud-cost-optimizer",
      technologies: ["Python", "ML", "AWS", "Terraform"],
      impact: "30% cost optimization",
      stars: 156,
      views: 680,
      color: "border-cyan-500"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Project Showcase
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            Real-world solutions that have transformed infrastructure operations at scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className={`project-card border-2 ${project.color} group relative overflow-hidden`}>
              {/* Terminal-style header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400 font-mono">{project.repository}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-green-400" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 font-sans group-hover:text-green-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-4 leading-relaxed font-sans">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="px-2 py-1 bg-black/50 text-xs rounded border border-gray-700 text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Impact badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                  💡 {project.impact}
                </span>
              </div>

              {/* GitHub stats */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{project.views}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Updated recently
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* GitHub profile link */}
        <div className="text-center mt-12">
          <a 
            href="https://github.com/saineox" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <GitBranch className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
