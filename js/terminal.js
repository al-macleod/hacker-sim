import { Game } from './game.js';

export class Terminal {
  constructor() {
    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');
    this.history = [];
    this.historyIndex = 0;
    this.game = new Game();
  }

  init() {
    this.game.init();
    this.writeLine('Welcome to WebSec Academy - Interactive Security Learning Platform');
    this.writeLine('Type "help" to see available commands or "mission" to view your current objective.');
    this.writeLine('');
    
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = this.inputEl.value.trim();
        if (!command) return;
        
        this.history.push(command);
        this.historyIndex = this.history.length;
        this.handleCommand(command);
        this.inputEl.value = '';
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.inputEl.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.inputEl.value = '';
        }
      }
    });
  }

  handleCommand(command) {
    this.writeLine(`websec@academy:~$ ${command}`);
    
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    switch (cmd) {
      case 'help':
        this.showHelp();
        break;
      case 'clear':
        this.clear();
        break;
      case 'scan':
      case 'exploit':
      case 'analyze':
      case 'target':
      case 'mission':
      case 'skills':
      case 'tools':
      case 'status':
        this.executeGameCommand(cmd, args);
        break;
      case 'whoami':
        this.writeLine('websec-student');
        break;
      case 'pwd':
        this.writeLine('/home/websec-student');
        break;
      case 'ls':
        this.writeLine('Documents  Downloads  Projects  Tools');
        break;
      default:
        this.writeLine(`Command not found: ${cmd}`);
        this.writeLine('Type "help" for available commands.');
    }
  }

  showHelp() {
    this.writeLine('WebSec Academy Commands:');
    this.writeLine('');
    this.writeLine('Security Tools:');
    this.writeLine('  scan [target]     - Perform network/vulnerability scan');
    this.writeLine('  exploit <type>    - Attempt exploitation (sqli, xss, csrf)');
    this.writeLine('  analyze [target]  - Perform security analysis');
    this.writeLine('');
    this.writeLine('Target Management:');
    this.writeLine('  target list       - Show available target applications');
    this.writeLine('  target load <name> - Load target application for testing');
    this.writeLine('');
    this.writeLine('Game Progress:');
    this.writeLine('  mission           - View current mission objective');
    this.writeLine('  skills            - Show unlocked security skills');
    this.writeLine('  tools             - Show available security tools');
    this.writeLine('  status            - Display player statistics');
    this.writeLine('');
    this.writeLine('System:');
    this.writeLine('  help              - Show this help message');
    this.writeLine('  clear             - Clear terminal screen');
    this.writeLine('  whoami, pwd, ls   - Basic system commands');
  }

  executeGameCommand(command, args) {
    const result = this.game.executeCommand(command, args);
    
    if (result.success) {
      this.writeLine(result.message, 'success');
    } else {
      this.writeLine(result.message, 'error');
    }
  }

  writeLine(text, type = 'normal') {
    const colorClass = {
      'success': 'text-green-400',
      'error': 'text-red-400',
      'warning': 'text-yellow-400',
      'info': 'text-blue-400',
      'normal': 'text-green-400'
    }[type];
    
    const line = document.createElement('div');
    line.className = colorClass;
    line.textContent = text;
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  clear() {
    this.outputEl.innerHTML = '';
  }
}