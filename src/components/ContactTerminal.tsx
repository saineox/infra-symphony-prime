import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Download, Phone, Home, Server, Code, User, Briefcase, MessageSquare } from 'lucide-react';

interface OutputLine {
  type: string;
  text: string;
  id: string;
  isComplete?: boolean;
}

const ContactTerminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<OutputLine[]>([
    { type: 'system', text: 'Welcome to Pradeep Kadam DevOps Terminal v2.1.0', id: '1', isComplete: true },
    { type: 'system', text: 'Type "help" for available commands', id: '2', isComplete: true },
    { type: 'prompt', text: 'pradeep@contact:~$', id: '3', isComplete: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingQueue, setTypingQueue] = useState<OutputLine[]>([]);
  const [pendingActions, setPendingActions] = useState<(() => void)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Create smooth, noiseless typing sound effect
  const playTypingSound = () => {
    if (!audioContextRef.current) return;
    
    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      const filter = audioContextRef.current.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      // Smooth sine wave for noiseless sound
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440 + Math.random() * 100, audioContextRef.current.currentTime);
      
      // Low-pass filter to make it smoother
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      filter.Q.setValueAtTime(1, audioContextRef.current.currentTime);
      
      // Very gentle volume with smooth fade
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.02, audioContextRef.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.08);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.08);
    } catch (error) {
      // Silently handle audio errors
    }
  };

  // Execute pending actions gradually after typing completes
  const executeActionsGradually = (actions: (() => void)[]) => {
    if (actions.length === 0) return;
    
    let actionIndex = 0;
    const executeNextAction = () => {
      if (actionIndex < actions.length) {
        // Add human-like delay between actions
        setTimeout(() => {
          actions[actionIndex]();
          actionIndex++;
          executeNextAction();
        }, 800 + Math.random() * 400); // 800-1200ms delay between actions
      }
    };
    
    // Start executing actions after a brief pause
    setTimeout(executeNextAction, 500);
  };

  // Typing animation effect with smoother timing
  const typeText = (text: string, onComplete: () => void) => {
    let currentIndex = 0;
    const baseSpeed = 40;
    
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        // Vary speed based on character type for more natural typing
        const char = text[currentIndex];
        let speed = baseSpeed;
        
        if (char === ' ') speed = baseSpeed * 0.3; // Faster for spaces
        else if (char === '.' || char === ',' || char === '!') speed = baseSpeed * 2; // Slower for punctuation
        else if (Math.random() < 0.1) speed = baseSpeed * 1.8; // Occasional hesitation
        else speed = baseSpeed + (Math.random() * 20 - 10); // Slight variation
        
        playTypingSound();
        currentIndex++;
        setTimeout(typeNextChar, speed);
      } else {
        // Small pause before completing
        setTimeout(onComplete, 150);
      }
    };
    
    typeNextChar();
  };

  // Process typing queue
  useEffect(() => {
    if (typingQueue.length > 0 && !isTyping) {
      setIsTyping(true);
      const nextLine = typingQueue[0];
      
      // Add the line to output immediately but mark as incomplete
      setOutput(prev => [...prev, { ...nextLine, isComplete: false }]);
      
      // Start typing animation
      typeText(nextLine.text, () => {
        // Mark as complete
        setOutput(prev => 
          prev.map(line => 
            line.id === nextLine.id ? { ...line, isComplete: true } : line
          )
        );
        
        // Remove from queue and continue
        setTypingQueue(prev => prev.slice(1));
        setIsTyping(false);
        
        // If this was the last line and there are pending actions, execute them
        if (typingQueue.length === 1 && pendingActions.length > 0) {
          executeActionsGradually(pendingActions);
          setPendingActions([]);
        }
      });
    }
  }, [typingQueue, isTyping, pendingActions]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands = {
    help: () => [
      { type: 'output', text: 'Available commands:' },
      { type: 'output', text: '  contact --email     - Get email address' },
      { type: 'output', text: '  contact --phone     - Get phone number' },
      { type: 'output', text: '  contact --linkedin  - Open LinkedIn profile' },
      { type: 'output', text: '  contact --github    - Open GitHub profile' },
      { type: 'output', text: '  download --resume   - Download resume' },
      { type: 'output', text: '  navigate --home     - Go to home section' },
      { type: 'output', text: '  navigate --devops   - Go to DevOps section' },
      { type: 'output', text: '  navigate --skills   - Go to skills section' },
      { type: 'output', text: '  navigate --projects - Go to projects section' },
      { type: 'output', text: '  navigate --testimonials - Go to testimonials section' },
      { type: 'output', text: '  navigate --experience - Go to experience section' },
      { type: 'output', text: '  status             - Show current status' },
      { type: 'output', text: '  clear              - Clear terminal' },
      { type: 'output', text: '  whoami             - About me' }
    ],
    'contact --email': () => {
      const action = () => {
        navigator.clipboard.writeText('pradeeptraje@gmail.com');
      };
      setPendingActions([action]);
      return [
        { type: 'success', text: '📧 Email: pradeeptraje@gmail.com' },
        { type: 'output', text: 'Email copied to clipboard!' }
      ];
    },
    'contact --phone': () => {
      const action = () => {
        navigator.clipboard.writeText('+91 9226325101');
      };
      setPendingActions([action]);
      return [
        { type: 'success', text: '📱 Phone: +91 9226325101' },
        { type: 'output', text: 'Phone number copied to clipboard!' }
      ];
    },
    'contact --linkedin': () => {
      const action = () => {
        window.open('https://www.linkedin.com/in/pradeeptraje/', '_blank');
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '🔗 Opening LinkedIn profile...' }];
    },
    'contact --github': () => {
      const action = () => {
        window.open('https://github.com/saineox', '_blank');
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '🐙 Opening GitHub profile...' }];
    },
    'download --resume': () => {
      const action = () => {
        // Simulate download action
        console.log('Resume download initiated');
      };
      setPendingActions([action]);
      return [
        { type: 'success', text: '📄 Downloading resume...' },
        { type: 'output', text: 'Resume.pdf downloaded successfully!' }
      ];
    },
    'navigate --home': () => {
      const action = () => {
        scrollToSection('hero');
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '🏠 Navigating to home section...' }];
    },
    'navigate --devops': () => {
      const action = () => {
        scrollToSection('devops-philosophy');
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '⚙️ Navigating to DevOps philosophy section...' }];
    },
    'navigate --skills': () => {
      const action = () => {
        scrollToSection('technical-arsenal');
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '🛠️ Navigating to skills section...' }];
    },
    'navigate --projects': () => {
      const action = () => {
        scrollToSection('project-showcase');
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '📁 Navigating to projects section...' }];
    },
    'navigate --testimonials': () => {
      const action = () => {
        scrollToSection('testimonials');
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '💬 Navigating to testimonials section...' }];
    },
    'navigate --experience': () => {
      const action = () => {
        scrollToSection('career-timeline');
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '📈 Navigating to experience section...' }];
    },
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
        { type: 'system', text: 'Terminal cleared', id: Date.now().toString(), isComplete: true },
        { type: 'prompt', text: 'pradeep@contact:~$', id: (Date.now() + 1).toString(), isComplete: true }
      ]);
      setTypingQueue([]);
      setPendingActions([]);
      return [];
    }
  };

  const executeCommand = (command: string) => {
    const newOutput = [...output];
    
    // Add user input immediately
    newOutput.push({ 
      type: 'input', 
      text: `$ ${command}`, 
      id: Date.now().toString(),
      isComplete: true 
    });
    setOutput(newOutput);

    // Process command
    const cmd = command.toLowerCase().trim();
    let result: any[] = [];
    
    if (commands[cmd as keyof typeof commands]) {
      result = commands[cmd as keyof typeof commands]();
    } else {
      result = [{ 
        type: 'error', 
        text: `Command not found: ${command}. Type "help" for available commands.` 
      }];
    }

    // Add results to typing queue if not clear command
    if (cmd !== 'clear' && result.length > 0) {
      const typingLines = result.map((line, index) => ({
        ...line,
        id: (Date.now() + index + 2).toString()
      }));
      
      // Add prompt at the end
      typingLines.push({
        type: 'prompt',
        text: 'pradeep@contact:~$',
        id: (Date.now() + result.length + 2).toString()
      });
      
      setTypingQueue(prev => [...prev, ...typingLines]);
    } else if (cmd !== 'clear') {
      // Add prompt for commands with no output
      setTypingQueue(prev => [...prev, {
        type: 'prompt',
        text: 'pradeep@contact:~$',
        id: (Date.now() + 2).toString()
      }]);
    }

    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    executeCommand(input);
  };

  const handleQuickButton = (command: string) => {
    if (isTyping) return;
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

  // Component for animated text
  const AnimatedText = ({ text, isComplete, className }: { text: string; isComplete?: boolean; className: string }) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
      if (isComplete) {
        setDisplayText(text);
      } else {
        setDisplayText('');
      }
    }, [text, isComplete]);

    useEffect(() => {
      if (!isComplete && displayText.length < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 40 + Math.random() * 15);
        return () => clearTimeout(timer);
      }
    }, [displayText, text, isComplete]);

    return (
      <div className={className}>
        {displayText}
        {!isComplete && displayText.length < text.length && (
          <span className="terminal-cursor inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
        )}
      </div>
    );
  };

  const navigationButtons = [
    { command: 'navigate --home', icon: Home, label: 'Home', color: 'green' },
    { command: 'navigate --devops', icon: Server, label: 'DevOps', color: 'blue' },
    { command: 'navigate --skills', icon: Code, label: 'Skills', color: 'purple' },
    { command: 'navigate --projects', icon: Briefcase, label: 'Projects', color: 'cyan' },
    { command: 'navigate --testimonials', icon: MessageSquare, label: 'Testimonials', color: 'yellow' },
    { command: 'navigate --experience', icon: User, label: 'Experience', color: 'pink' }
  ];

  const contactButtons = [
    { command: 'contact --email', icon: Mail, label: 'Email', color: 'green' },
    { command: 'contact --phone', icon: Phone, label: 'Phone', color: 'yellow' },
    { command: 'contact --linkedin', icon: Linkedin, label: 'LinkedIn', color: 'blue' },
    { command: 'contact --github', icon: Github, label: 'GitHub', color: 'purple' },
    { command: 'download --resume', icon: Download, label: 'Resume', color: 'cyan' }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Contact Terminal
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            Interactive CLI interface for getting in touch and navigating the portfolio. Click the buttons below for instant actions.
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
              {output.map((line) => (
                <AnimatedText
                  key={line.id}
                  text={line.text}
                  isComplete={line.isComplete}
                  className={`${getTextColor(line.type)} font-mono text-sm leading-relaxed`}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-blue-400 font-mono text-sm mr-2">pradeep@contact:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none disabled:opacity-50"
                placeholder={isTyping ? "Processing..." : "Type a command or click buttons below..."}
                autoFocus
              />
              <span className="terminal-cursor ml-1"></span>
            </form>
          </div>

          {/* Navigation buttons */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {navigationButtons.map((btn) => (
                <button 
                  key={btn.command}
                  onClick={() => handleQuickButton(btn.command)}
                  disabled={isTyping}
                  className={`flex items-center justify-center px-3 py-2 bg-black/50 border border-gray-700 rounded-lg hover:border-${btn.color}-400 transition-all duration-300 group hover:scale-105 disabled:opacity-50 disabled:hover:scale-100`}
                >
                  <btn.icon className={`w-4 h-4 text-${btn.color}-400 mr-2 group-hover:animate-bounce`} />
                  <span className="text-gray-300 font-sans text-sm">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact buttons */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Contact & Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {contactButtons.map((btn) => (
                <button 
                  key={btn.command}
                  onClick={() => handleQuickButton(btn.command)}
                  disabled={isTyping}
                  className={`flex items-center justify-center px-4 py-3 bg-black/50 border border-gray-700 rounded-lg hover:border-${btn.color}-400 transition-all duration-300 group hover:scale-105 disabled:opacity-50 disabled:hover:scale-100`}
                >
                  <btn.icon className={`w-5 h-5 text-${btn.color}-400 mr-2 group-hover:animate-bounce`} />
                  <span className="text-gray-300 font-sans">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTerminal;
