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
  const [hasAutoExecuted, setHasAutoExecuted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Auto-execute navigate --home command after page load
  useEffect(() => {
    if (!hasAutoExecuted) {
      const timer = setTimeout(() => {
        console.log('Auto-executing navigate --home command...');
        executeCommand('navigate --home');
        setHasAutoExecuted(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoExecuted]);

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

  // Apple-like typing sound effect - more subtle and refined
  const playTypingSound = () => {
    if (!audioContextRef.current) return;
    
    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      const filter = audioContextRef.current.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      // Apple-like soft click sound
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioContextRef.current.currentTime);
      
      // Gentle filtering for warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, audioContextRef.current.currentTime);
      filter.Q.setValueAtTime(0.5, audioContextRef.current.currentTime);
      
      // Apple-like volume envelope - very soft
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.008, audioContextRef.current.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.04);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.04);
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
        setTimeout(() => {
          actions[actionIndex]();
          actionIndex++;
          executeNextAction();
        }, 600 + Math.random() * 200);
      }
    };
    
    setTimeout(executeNextAction, 300);
  };

  // Apple-like typing animation with more natural rhythm
  const typeText = (text: string, onComplete: () => void) => {
    let currentIndex = 0;
    const baseSpeed = 35;
    
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        const char = text[currentIndex];
        let speed = baseSpeed;
        
        // More natural typing rhythm like Apple products
        if (char === ' ') speed = baseSpeed * 0.4;
        else if (char === '.' || char === ',' || char === '!' || char === '?') speed = baseSpeed * 2.2;
        else if (char === '\n') speed = baseSpeed * 1.5;
        else if (Math.random() < 0.08) speed = baseSpeed * 2; // Occasional natural pause
        else speed = baseSpeed + (Math.random() * 12 - 6);
        
        playTypingSound();
        currentIndex++;
        setTimeout(typeNextChar, speed);
      } else {
        setTimeout(onComplete, 100);
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

  // Smooth scroll to terminal bottom
  const scrollToTerminalBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Enhanced scroll to section with longer scroll duration and smoother easing
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset to account for fixed navigation
      const navHeight = 80; // Approximate height of navigation
      const elementPosition = element.offsetTop - navHeight;
      
      // Create a longer, more gradual scroll animation with enhanced easing
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = 3500; // Increased from 2000ms to 3500ms for slower scroll
      let startTime: number | null = null;

      // Enhanced easing function for smoother, more elegant scrolling
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
  };

  // Keep terminal input focused and visible
  const maintainTerminalFocus = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        scrollToTerminalBottom();
      }
    }, 100);
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
        maintainTerminalFocus();
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
        maintainTerminalFocus();
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
        maintainTerminalFocus();
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '🔗 Opening LinkedIn profile...' }];
    },
    'contact --github': () => {
      const action = () => {
        window.open('https://github.com/saineox', '_blank');
        maintainTerminalFocus();
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '🐙 Opening GitHub profile...' }];
    },
    'download --resume': () => {
      const action = () => {
        console.log('Resume download initiated');
        maintainTerminalFocus();
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
        maintainTerminalFocus();
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '🏠 Navigating to home section...' }];
    },
    'navigate --devops': () => {
      const action = () => {
        scrollToSection('devops-philosophy');
        maintainTerminalFocus();
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '⚙️ Navigating to DevOps philosophy section...' }];
    },
    'navigate --skills': () => {
      const action = () => {
        scrollToSection('technical-arsenal');
        maintainTerminalFocus();
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '🛠️ Navigating to skills section...' }];
    },
    'navigate --projects': () => {
      const action = () => {
        scrollToSection('project-showcase');
        maintainTerminalFocus();
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '📁 Navigating to projects section...' }];
    },
    'navigate --testimonials': () => {
      const action = () => {
        scrollToSection('testimonials');
        maintainTerminalFocus();
      };
      setPendingActions([action]);
      return [{ type: 'success', text: '💬 Navigating to testimonials section...' }];
    },
    'navigate --experience': () => {
      const action = () => {
        scrollToSection('career-timeline');
        maintainTerminalFocus();
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
      maintainTerminalFocus();
      return [];
    }
  };

  const executeCommand = (command: string) => {
    // Prevent page jumping
    event?.preventDefault();
    
    const newOutput = [...output];
    
    newOutput.push({ 
      type: 'input', 
      text: `$ ${command}`, 
      id: Date.now().toString(),
      isComplete: true 
    });
    setOutput(newOutput);

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

    if (cmd !== 'clear' && result.length > 0) {
      const typingLines = result.map((line, index) => ({
        ...line,
        id: (Date.now() + index + 2).toString()
      }));
      
      typingLines.push({
        type: 'prompt',
        text: 'pradeep@contact:~$',
        id: (Date.now() + result.length + 2).toString()
      });
      
      setTypingQueue(prev => [...prev, ...typingLines]);
    } else if (cmd !== 'clear') {
      setTypingQueue(prev => [...prev, {
        type: 'prompt',
        text: 'pradeep@contact:~$',
        id: (Date.now() + 2).toString()
      }]);
    }

    setInput('');
    maintainTerminalFocus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    executeCommand(input);
  };

  const handleQuickButton = (command: string) => {
    if (isTyping) return;
    
    // Prevent any scrolling behavior from the button click
    event?.preventDefault();
    
    setInput(command);
    executeCommand(command);
  };

  // Auto-scroll to bottom when output changes, but maintain smooth scrolling
  useEffect(() => {
    scrollToTerminalBottom();
  }, [output]);

  // Keep input focused
  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping, output]);

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
        }, 35 + Math.random() * 10);
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
    <section id="contact-terminal" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Contact Terminal
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">
            Interactive CLI interface for getting in touch and navigating the portfolio. Click the buttons below for instant actions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto" ref={terminalContainerRef}>
          <div className="terminal relative">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="text-gray-400 ml-4">contact-terminal</span>
            </div>
            
            <div 
              ref={terminalRef}
              className="h-72 overflow-y-auto mb-4 space-y-1 scroll-smooth"
              onClick={() => {
                inputRef.current?.focus();
                // Prevent any unwanted scrolling on terminal click
                event?.preventDefault();
              }}
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

            <form onSubmit={handleSubmit} className="flex items-center sticky bottom-0 bg-black/95 py-2">
              <span className="text-blue-400 font-mono text-sm mr-2">pradeep@contact:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none disabled:opacity-50"
                placeholder={isTyping ? "Processing..." : "Type a command or click buttons below..."}
                autoComplete="off"
                spellCheck="false"
              />
              <span className="terminal-cursor ml-1"></span>
            </form>
          </div>

          {/* Navigation buttons - now positioned below terminal and will scroll naturally */}
          <div className="mt-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {navigationButtons.map((btn) => (
                <button 
                  key={btn.command}
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuickButton(btn.command);
                  }}
                  disabled={isTyping}
                  className={`flex items-center justify-center px-3 py-2 bg-black/50 border border-gray-700 rounded-lg hover:border-${btn.color}-400 transition-all duration-300 group hover:scale-105 disabled:opacity-50 disabled:hover:scale-100`}
                >
                  <btn.icon className={`w-4 h-4 text-${btn.color}-400 mr-2 group-hover:animate-bounce`} />
                  <span className="text-gray-300 font-sans text-sm">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact buttons - also positioned to scroll naturally */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Contact & Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {contactButtons.map((btn) => (
                <button 
                  key={btn.command}
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuickButton(btn.command);
                  }}
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
