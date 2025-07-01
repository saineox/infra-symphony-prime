
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Download, Phone } from 'lucide-react';

const ContactTerminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: 'Welcome to Pradeep Kadam DevOps Terminal v2.1.0' },
    { type: 'system', text: 'Type "help" for available commands' },
    { type: 'prompt', text: 'pradeep@contact:~$' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      { type: 'output', text: 'Available commands:' },
      { type: 'output', text: '  contact --email     - Get email address' },
      { type: 'output', text: '  contact --phone     - Get phone number' },
      { type: 'output', text: '  contact --linkedin  - Open LinkedIn profile' },
      { type: 'output', text: '  contact --github    - Open GitHub profile' },
      { type: 'output', text: '  download --resume   - Download resume' },
      { type: 'output', text: '  status             - Show current status' },
      { type: 'output', text: '  clear              - Clear terminal' },
      { type: 'output', text: '  whoami             - About me' }
    ],
    'contact --email': () => {
      // Copy email to clipboard
      navigator.clipboard.writeText('pradeeptraje@gmail.com');
      return [
        { type: 'success', text: '📧 Email: pradeeptraje@gmail.com' },
        { type: 'output', text: 'Email copied to clipboard!' }
      ];
    },
    'contact --phone': () => {
      // Copy phone to clipboard  
      navigator.clipboard.writeText('+1 (922) 632-5101');
      return [
        { type: 'success', text: '📱 Phone: +1 (922) 632-5101' },
        { type: 'output', text: 'Phone number copied to clipboard!' }
      ];
    },
    'contact --linkedin': () => {
      window.open('https://www.linkedin.com/in/pradeeptraje/', '_blank');
      return [{ type: 'success', text: '🔗 Opening LinkedIn profile...' }];
    },
    'contact --github': () => {
      window.open('https://github.com/pradeeptraje', '_blank');
      return [{ type: 'success', text: '🐙 Opening GitHub profile...' }];
    },
    'download --resume': () => [
      { type: 'success', text: '📄 Downloading resume...' },
      { type: 'output', text: 'Resume.pdf downloaded successfully!' }
    ],
    status: () => [
      { type: 'success', text: '✅ DevOps Status: OPERATIONAL' },
      { type: 'success', text: '✅ Available for new opportunities' },
      { type: 'success', text: '✅ Response time: < 24 hours' },
      { type: 'success', text: '✅ Immediate joiner ready' },
      { type: 'output', text: '📍 Location: United States (Remote)' }
    ],
    whoami: () => [
      { type: 'output', text: 'Pradeep Kadam - DevOps Engineer & UI/UX Developer' },
      { type: 'output', text: '🚀 Specializing in automation and cost optimization' },
      { type: 'output', text: '☁️  AWS cloud infrastructure expert' },
      { type: 'output', text: '🎨 UI/UX developer with 135+ landing pages' },
      { type: 'output', text: '⚡ AutoHotkey automation specialist' },
      { type: 'output', text: '📈 Proven track record: $12K annual savings' },
      { type: 'output', text: '🏆 GitHub Top 1% Contributor' }
    ],
    clear: () => {
      setOutput([
        { type: 'system', text: 'Terminal cleared' },
        { type: 'prompt', text: 'pradeep@contact:~$' }
      ]);
      return [];
    }
  };

  const executeCommand = (command: string) => {
    setIsTyping(true);
    const newOutput = [...output];
    
    // Add user input
    newOutput.push({ type: 'input', text: `$ ${command}` });

    // Process command
    const cmd = command.toLowerCase().trim();
    if (commands[cmd as keyof typeof commands]) {
      const result = commands[cmd as keyof typeof commands]();
      if (result.length > 0) {
        newOutput.push(...result);
      }
    } else {
      newOutput.push({ 
        type: 'error', 
        text: `Command not found: ${command}. Type "help" for available commands.` 
      });
    }

    // Add new prompt
    if (cmd !== 'clear') {
      newOutput.push({ type: 'prompt', text: 'pradeep@contact:~$' });
    }

    setTimeout(() => {
      setOutput(newOutput);
      setInput('');
      setIsTyping(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
  };

  const handleQuickButton = (command: string) => {
    setInput(command);
    executeCommand(command);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const getTextColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-cyan-400';
      case 'prompt': return 'text-blue-400';
      case 'input': return 'text-white';
      case 'output': return 'text-gray-300';
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Contact Terminal
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            Interactive CLI interface for getting in touch. Click the buttons below for instant contact actions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="text-gray-400 ml-4">contact-terminal</span>
            </div>
            
            <div 
              ref={terminalRef}
              className="h-96 overflow-y-auto mb-4 space-y-1"
              onClick={() => inputRef.current?.focus()}
            >
              {output.map((line, index) => (
                <div key={index} className={`${getTextColor(line.type)} font-mono text-sm leading-relaxed`}>
                  {line.text}
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-400 font-mono text-sm animate-pulse">
                  Processing command...
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-blue-400 font-mono text-sm mr-2">pradeep@contact:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none"
                placeholder="Type a command or click buttons below..."
                autoFocus
              />
              <span className="terminal-cursor ml-1"></span>
            </form>
          </div>

          {/* Quick contact buttons with auto-execution */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
            <button 
              onClick={() => handleQuickButton('contact --email')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-green-400 transition-all duration-300 group hover:scale-105"
            >
              <Mail className="w-5 h-5 text-green-400 mr-2 group-hover:animate-bounce" />
              <span className="text-gray-300 font-sans">Email</span>
            </button>
            
            <button 
              onClick={() => handleQuickButton('contact --phone')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-yellow-400 transition-all duration-300 group hover:scale-105"
            >
              <Phone className="w-5 h-5 text-yellow-400 mr-2 group-hover:animate-bounce" />
              <span className="text-gray-300 font-sans">Phone</span>
            </button>
            
            <button 
              onClick={() => handleQuickButton('contact --linkedin')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-blue-400 transition-all duration-300 group hover:scale-105"
            >
              <Linkedin className="w-5 h-5 text-blue-400 mr-2 group-hover:animate-bounce" />
              <span className="text-gray-300 font-sans">LinkedIn</span>
            </button>
            
            <button 
              onClick={() => handleQuickButton('contact --github')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-purple-400 transition-all duration-300 group hover:scale-105"
            >
              <Github className="w-5 h-5 text-purple-400 mr-2 group-hover:animate-bounce" />
              <span className="text-gray-300 font-sans">GitHub</span>
            </button>
            
            <button 
              onClick={() => handleQuickButton('download --resume')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-cyan-400 transition-all duration-300 group hover:scale-105"
            >
              <Download className="w-5 h-5 text-cyan-400 mr-2 group-hover:animate-bounce" />
              <span className="text-gray-300 font-sans">Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTerminal;
