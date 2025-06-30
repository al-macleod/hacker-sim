export class Terminal {
  constructor() {
    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');
    this.history = [];
    this.historyIndex = 0;
  }

  init() {
    this.writeLine('Welcome to Hacker Simulator');
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = this.inputEl.value.trim();
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
    this.writeLine('$ ' + command);
    switch (command) {
      case 'help':
        this.writeLine('Available commands: help, clear, mission');
        break;
      case 'clear':
        this.clear();
        break;
      case 'mission':
        this.writeLine('Your first mission is to hack the simulated network.');
        break;
      default:
        this.writeLine(`Unknown command: ${command}`);
    }
  }

  writeLine(text) {
    this.outputEl.textContent += text + '\n';
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  clear() {
    this.outputEl.textContent = '';
  }
}
