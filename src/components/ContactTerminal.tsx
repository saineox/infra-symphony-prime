
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Download } from 'lucide-react';

const ContactTerminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: 'Welcome to Pradeep Traje DevOps Terminal v2.1.0' },
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
      { type: 'output', text: '  contact --linkedin  - Open LinkedIn profile' },
      { type: 'output', text: '  contact --github    - Open GitHub profile' },
      { type: 'output', text: '  download --resume   - Download resume' },
      { type: 'output', text: '  status             - Show current status' },
      { type: 'output', text: '  clear              - Clear terminal' },
      { type: 'output', text: '  whoami             - About me' }
    ],
    'contact --email': () => [
      { type: 'success', text: '📧 Email: pradeep.traje@devops.com' },
      { type: 'output', text: 'Email copied to clipboard!' }
    ],
    'contact --linkedin': () => {
      window.open('https://www.linkedin.com/in/pradeeptraje/', '_blank');
      return [{ type: 'success', text: '🔗 Opening LinkedIn profile...' }];
    },
    'contact --github': () => {
      window.open('https://github.com/saineox', '_blank');
      return [{ type: 'success', text: '🐙 Opening GitHub profile...' }];
    },
    'download --resume': () => [
      { type: 'success', text: '📄 Downloading resume...' },
      { type: 'output', text: 'Resume.pdf downloaded successfully!' }
    ],
    status: () => [
      { type: 'success', text: '✅ Infrastructure Status: OPERATIONAL' },
      { type: 'success', text: '✅ Available for new opportunities' },
      { type: 'success', text: '✅ Response time: < 24 hours' },
      { type: 'output', text: '📍 Location: Remote-first' }
    ],
    whoami: () => [
      { type: 'output', text: 'Pradeep Traje - Senior DevOps Engineer' },
      { type: 'output', text: '🚀 Specializing in cloud-native infrastructure' },
      { type: 'output', text: '☁️  Multi-cloud architecture expert' },
      { type: 'output', text: '🛡️  Security-first automation advocate' },
      { type: 'output', text: '📈 Proven track record of cost optimization' }
    ],
    clear: () => {
      setOutput([
        { type: 'system', text: 'Terminal cleared' },
        { type: 'prompt', text: 'pradeep@contact:~$' }
      ]);
      return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsTyping(true);
    const newOutput = [...output];
    
    // Add user input
    newOutput.push({ type: 'input', text: `$ ${input}` });

    // Process command
    const command = input.toLowerCase().trim();
    if (commands[command as keyof typeof commands]) {
      const result = commands[command as keyof typeof commands]();
      if (result.length > 0) {
        newOutput.push(...result);
      }
    } else {
      newOutput.push({ 
        type: 'error', 
        text: `Command not found: ${input}. Type "help" for available commands.` 
      });
    }

    // Add new prompt
    if (command !== 'clear') {
      newOutput.push({ type: 'prompt', text: 'pradeep@contact:~$' });
    }

    setTimeout(() => {
      setOutput(newOutput);
      setInput('');
      setIsTyping(false);
    }, 500);
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
            Interactive CLI interface for getting in touch. Try typing "help" to see available commands.
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
                <div className="text-gray-400 font-mono text-sm">
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
                placeholder="Type a command..."
                autoFocus
              />
              <span className="terminal-cursor ml-1"></span>
            </form>
          </div>

          {/* Quick contact buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <button 
              onClick={() => setInput('contact --email')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-green-400 transition-colors group"
            >
              <Mail className="w-5 h-5 text-green-400 mr-2 group-hover:animate-pulse" />
              <span className="text-gray-300 font-sans">Email</span>
            </button>
            
            <button 
              onClick={() => setInput('contact --linkedin')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-blue-400 transition-colors group"
            >
              <Linkedin className="w-5 h-5 text-blue-400 mr-2 group-hover:animate-pulse" />
              <span className="text-gray-300 font-sans">LinkedIn</span>
            </button>
            
            <button 
              onClick={() => setInput('contact --github')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-purple-400 transition-colors group"
            >
              <Github className="w-5 h-5 text-purple-400 mr-2 group-hover:animate-pulse" />
              <span className="text-gray-300 font-sans">GitHub</span>
            </button>
            
            <button 
              onClick={() => setInput('download --resume')}
              className="flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-cyan-400 transition-colors group"
            >
              <Download className="w-5 h-5 text-cyan-400 mr-2 group-hover:animate-pulse" />
              <span className="text-gray-300 font-sans">Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTerminal;
