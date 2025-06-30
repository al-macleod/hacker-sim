import { getNpcResponse } from './npcApi.js';

export class Terminal {
  constructor() {
    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');
    this.history = [];
    this.historyIndex = 0;
    this.credits = 500;
    this.inventory = [];
    this.marketItems = [
      { name: 'exploit-kit', price: 150 },
      { name: 'rootkit', price: 300 },
      { name: 'vpn-gear', price: 100 }
    ];
    this.inbox = [
      'From: Handler\nSubject: First Mission\nIntercept the target traffic and report back.',
      'From: Rival Hacker\nSubject: You are being watched\nBack off or get burned.'
    ];
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
    const [cmd, ...args] = command.split(' ');
    switch (cmd) {
      case 'help':
        this.writeLine('Available commands: help, clear, mission, market, buy <item>, wallet, inbox, read <n>, npc <msg>');
        break;
      case 'clear':
        this.clear();
        break;
      case 'mission':
        this.writeLine('Your first mission is to hack the simulated network.');
        break;
      case 'market':
        this.showMarket();
        break;
      case 'buy':
        this.buyItem(args.join(' '));
        break;
      case 'wallet':
        this.writeLine(`Credits: $${this.credits}`);
        break;
      case 'inbox':
        this.showInbox();
        break;
      case 'read':
        this.readMessage(parseInt(args[0], 10));
        break;
      case 'npc':
        this.contactNpc(args.join(' '));
        break;
      default:
        this.writeLine(`Unknown command: ${command}`);
    }
  }

  showMarket() {
    this.marketItems.forEach((item, idx) => {
      this.writeLine(`${idx + 1}. ${item.name} - $${item.price}`);
    });
  }

  buyItem(itemName) {
    const item = this.marketItems.find(i => i.name === itemName);
    if (!item) {
      this.writeLine(`Item not found: ${itemName}`);
      return;
    }
    if (this.credits < item.price) {
      this.writeLine('Insufficient credits.');
      return;
    }
    this.credits -= item.price;
    this.inventory.push(item.name);
    this.writeLine(`Purchased ${item.name} for $${item.price}`);
  }

  showInbox() {
    if (this.inbox.length === 0) {
      this.writeLine('Inbox empty');
      return;
    }
    this.inbox.forEach((msg, idx) => {
      const subjectLine = msg.split('\n')[1] || 'No Subject';
      this.writeLine(`${idx + 1}. ${subjectLine}`);
    });
  }

  readMessage(index) {
    if (isNaN(index) || index < 1 || index > this.inbox.length) {
      this.writeLine('Invalid message number');
      return;
    }
    this.writeLine(this.inbox[index - 1]);
  }

  async contactNpc(message) {
    if (!message) {
      this.writeLine('Usage: npc <message>');
      return;
    }
    const response = await getNpcResponse(message);
    this.writeLine(response);
  }

  writeLine(text) {
    this.outputEl.textContent += text + '\n';
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  clear() {
    this.outputEl.textContent = '';
  }
}
