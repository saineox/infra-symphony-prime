
import React, { useState, useEffect } from 'react';
import { Quote, Star, Linkedin } from 'lucide-react';

const Testimonials = () => {
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

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Mari Pool",
      role: "Team Lead, Web Developer",
      company: "Blackbaud",
      relationship: "Worked on the same team",
      date: "May 2025",
      content: "Pradeep is consistently reliable and technically strong in a variety of areas. He picks up new technologies quickly and contributes effectively without needing much ramp-up time. He's dependable, smart, and easy to work with—a solid team member who delivers.",
      highlights: ["Technically Strong", "Quick Learner", "Reliable", "Team Player"]
    },
    {
      name: "Corwin Bermudez",
      role: "Front-End Web Designer and Developer",
      company: "Former Colleague",
      relationship: "Worked on the same team",
      date: "May 2025",
      content: "As Pradeep's former colleague my whole team and I leaned on his ability to navigate complex workflows to meet customer needs quickly. His front-end scripting and data language experience makes him a valuable asset for supplementing customer-facing apps with customizable content and experiences. Pradeep worked quickly to learn techniques and languages we did not know, and elevated our team's processes consistently during his tenure.",
      highlights: ["Complex Workflows", "Customer-Focused", "Process Improvement", "Quick Learner"]
    },
    {
      name: "Derek Iwanowski",
      role: "Senior Consultant",
      company: "EVERFI",
      relationship: "Worked on the same team",
      date: "May 2025",
      content: "I highly recommend Pradeep as he is a very strong and dedicated worker who collaborates well with others. Pradeep is reliable and has a lot of technical knowledge. I believe he would be an asset to any team.",
      highlights: ["Dedicated", "Technical Knowledge", "Collaborative", "Asset to Team"]
    },
    {
      name: "Sunil Ajagekar",
      role: "Full Stack Developer",
      company: "Citi | Ex-Disney",
      relationship: "Academic & Professional Connection",
      date: "March 2024",
      content: "I highly recommend Pradeep for his exceptional development and DevOps skills. Having known him closely throughout our academic journey, I've witnessed his dedication and proficiency in tackling complex technical challenges. Pradeep's combination of strong academic background and hands-on expertise makes him a valuable asset to any team.",
      highlights: ["DevOps Excellence", "Complex Problem Solving", "Academic Excellence", "Hands-on Expertise"]
    },
    {
      name: "Nalini Sagar",
      role: "Senior Recruiter & Job Coach",
      company: "v-shesh",
      relationship: "Mentor",
      date: "May 2025",
      content: "Pradeep is one of our Codestar trainee, during the training period, he really performed well. he did a great job in his team project. good luck pradeep for your future endeavors.",
      highlights: ["Top Performer", "Team Project Excellence", "Training Success", "Mentorship"]
    },
    {
      name: "Abhijit Patil",
      role: "Business Analytics Specialist",
      company: "Strategic Insights Professional",
      relationship: "Professional Network",
      date: "February 2024",
      content: "I have no doubt that Pradeep's transition into a DevOps Engineer role will be met with the same level of enthusiasm and proficiency that he brought to the Organization. He has all the qualities necessary to excel in this new endeavor, and I wholeheartedly recommend him for any future opportunities.",
      highlights: ["Career Transition", "Enthusiasm", "Proficiency", "Future Potential"]
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-black/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional Testimonials
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            What industry professionals say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`project-card transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <Linkedin className="w-5 h-5 text-blue-400" />
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed font-sans text-sm">
                "{testimonial.content}"
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {testimonial.highlights.map((highlight, hIndex) => (
                  <span key={hIndex} className="px-2 py-1 rounded text-xs text-green-400 bg-green-500/10 border border-green-500/20">
                    {highlight}
                  </span>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-sans text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs font-sans">{testimonial.role}</p>
                    <p className="text-gray-500 text-xs font-sans">{testimonial.company}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-500 text-xs font-sans">{testimonial.relationship}</span>
                  <span className="text-gray-500 text-xs font-sans">{testimonial.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-sans text-sm">6 Professional Recommendations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5 text-blue-400" />
              <span className="font-sans text-sm">Verified LinkedIn Profiles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
