
import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4">
            <span className="font-sans">Built with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="font-sans">using</span>
            <Code className="w-4 h-4 text-blue-400" />
            <span className="font-sans">and</span>
            <Coffee className="w-4 h-4 text-yellow-400" />
          </div>
          
          <p className="text-gray-500 text-sm mb-4 font-sans">
            © {new Date().getFullYear()} Pradeep Kadam. Automating infrastructure, one deployment at a time.
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm mb-4">
            <a 
              href="mailto:pradeeptraje@gmail.com" 
              className="text-gray-400 hover:text-green-400 transition-colors font-sans"
            >
              📧 pradeeptraje@gmail.com
            </a>
            <span className="text-gray-600">•</span>
            <a 
              href="https://www.linkedin.com/in/pradeeptraje/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors font-sans"
            >
              LinkedIn Profile
            </a>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400 font-sans">
              📱 +91 9226325101
            </span>
          </div>
          
          <div className="mt-6 terminal inline-block">
            <div className="terminal-text text-xs">
              <span className="terminal-prompt">pradeep@devops:~$</span>
              <span className="ml-2 text-green-400">Status: AVAILABLE FOR OPPORTUNITIES</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
