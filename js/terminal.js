import { Game } from './game.js';
import { MissionSystem } from './missions.js';
import { SkillTree } from './skillTree.js';
import { ToolInterface } from './toolInterface.js';

export class Terminal {
  constructor() {
    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');
    this.history = [];
    this.historyIndex = 0;
    this.game = new Game();
    this.missionSystem = new MissionSystem();
    this.skillTree = new SkillTree();
    this.toolInterface = new ToolInterface(this);
    this.currentDirectory = '/home/hacker';
    this.fileSystem = this.initializeFileSystem();
    this.selectedTool = null;
    this.toolMode = false;
  }

  initializeFileSystem() {
    return {
      '/': {
        type: 'directory',
        contents: ['home', 'etc', 'tmp', 'var', 'usr']
      },
      '/home': {
        type: 'directory',
        contents: ['hacker']
      },
      '/home/hacker': {
        type: 'directory',
        contents: ['Documents', 'Downloads', 'Tools', 'Scripts', '.bashrc']
      },
      '/home/hacker/Tools': {
        type: 'directory',
        contents: ['nmap', 'sqlmap', 'burp', 'metasploit']
      },
      '/home/hacker/Scripts': {
        type: 'directory',
        contents: ['scan.py', 'exploit.py', 'ddos.py', 'keylogger.py']
      },
      '/home/hacker/.bashrc': {
        type: 'file',
        content: '# Hacker Terminal Configuration\nexport PATH=$PATH:/home/hacker/Tools\nalias ll="ls -la"\nalias scan="python3 /home/hacker/Scripts/scan.py"'
      },
      '/etc': {
        type: 'directory',
        contents: ['passwd', 'shadow', 'hosts']
      },
      '/etc/passwd': {
        type: 'file',
        content: 'root:x:0:0:root:/root:/bin/bash\nhacker:x:1000:1000:Elite Hacker:/home/hacker:/bin/bash'
      }
    };
  }
  init() {
    this.game.init();
    this.missionSystem = new MissionSystem();
    this.writeLine('Welcome to WebSec Academy - Interactive Security Learning Platform');
    this.writeLine('Advanced Hacker Terminal v3.0 - Loaded with professional tools');
    this.writeLine('Type "help" for commands, "missions" for available jobs, "skills" to upgrade abilities');
    this.writeLine('');
    this.showSystemStatus();
    
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        const command = this.inputEl.value.trim();
        if (!command) return;
        
        this.history.push(command);
        this.historyIndex = this.history.length;
        this.handleCommand(command);
        this.inputEl.value = '';
        e.preventDefault();
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

  showSystemStatus() {
    const player = this.game.player;
    this.writeLine(`System Status: ONLINE | BTC Balance: ${player.btcBalance.toFixed(6)} | Level: ${player.level}`, 'info');
    this.writeLine(`Active Connections: ${Math.floor(Math.random() * 50) + 10} | Reputation: ${player.reputation}`, 'info');
    this.writeLine('');
  }
  handleCommand(command) {
    this.writeLine(`hacker@elite:${this.currentDirectory}$ ${command}`);
    
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    // Handle tool mode commands
    if (this.toolMode && this.selectedTool) {
      if (cmd === 'exit' || cmd === 'quit') {
        this.toolMode = false;
        this.selectedTool = null;
        this.writeLine('Exited tool mode', 'info');
        return;
      }
      
      const result = this.toolInterface.executeToolCommand(this.selectedTool, cmd, args, this.game.player);
      if (result.success) {
        this.writeLine(result.message, 'success');
        if (result.reward) {
          this.writeLine(`Rewards: ${result.reward.btc ? result.reward.btc.toFixed(6) + ' BTC' : ''} ${result.reward.xp ? result.reward.xp + ' XP' : ''}`, 'info');
        }
      } else {
        this.writeLine(result.message, 'error');
      }
      return;
    }
    
    switch (cmd) {
      case 'help':
        this.showHelp();
        break;
      case 'clear':
        this.clear();
        break;
      
      // System Commands
      case 'ls':
        this.handleLS(args);
        break;
      case 'cd':
        this.handleCD(args);
        break;
      case 'pwd':
        this.writeLine(this.currentDirectory);
        break;
      case 'cat':
        this.handleCAT(args);
        break;
      case 'mkdir':
        this.handleMKDIR(args);
        break;
      case 'touch':
        this.handleTOUCH(args);
        break;
      case 'rm':
        this.handleRM(args);
        break;
      case 'ps':
        this.handlePS();
        break;
      case 'kill':
        this.handleKILL(args);
        break;
      case 'whoami':
        this.writeLine('hacker');
        break;
      
      // Tool selection and management
      case 'tools':
        this.showAvailableTools();
        break;
      case 'select':
        this.selectTool(args);
        break;
      case 'tool-status':
        this.showToolStatus();
        break;
      
      // Python execution
      case 'python':
      case 'python3':
        this.handlePython(args);
        break;
      
      // Advanced hacking tools
      case 'nmap':
      case 'nmap-stealth':
      case 'masscan':
      case 'dirb':
      case 'sqlmap':
      case 'burp':
      case 'msfconsole':
      case 'exploit':
      case 'hashcat':
      case 'john':
      case 'setoolkit':
      case 'aircrack':
      case 'wireshark':
      case 'hydra':
        this.launchTool(cmd, args);
        break;
      
      // Game-specific commands
      case 'missions':
        this.showMissions();
        break;
      case 'start-mission':
        this.startMission(args);
        break;
      case 'complete-mission':
        this.completeMission(args);
        break;
      case 'skills':
        this.showSkills();
        break;
      case 'upgrade-skill':
        this.upgradeSkill(args);
        break;
      case 'inventory':
        this.showInventory();
        break;
      case 'balance':
        this.showBalance();
        break;
      
      case 'scan':
      case 'exploit':
      case 'analyze':
      case 'target':
      case 'mission':
      case 'tools':
      case 'status':
        this.executeGameCommand(cmd, args);
        break;
      
      default:
        this.writeLine(`Command not found: ${cmd}`);
        this.writeLine('Type "help" for available commands.');
    }
  }

  handleLS(args) {
    const path = args[0] ? this.resolvePath(args[0]) : this.currentDirectory;
    const dir = this.fileSystem[path];
    
    if (!dir) {
      this.writeLine(`ls: cannot access '${path}': No such file or directory`, 'error');
      return;
    }
    
    if (dir.type !== 'directory') {
      this.writeLine(path.split('/').pop());
      return;
    }
    
    const contents = dir.contents || [];
    if (args.includes('-la') || args.includes('-l')) {
      contents.forEach(item => {
        const itemPath = `${path}/${item}`;
        const itemObj = this.fileSystem[itemPath];
        const type = itemObj?.type === 'directory' ? 'd' : '-';
        const perms = itemObj?.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--';
        this.writeLine(`${type}${perms} 1 hacker hacker 4096 Jan 15 12:00 ${item}`);
      });
    } else {
      this.writeLine(contents.join('  '));
    }
  }

  handleCD(args) {
    if (!args[0]) {
      this.currentDirectory = '/home/hacker';
      return;
    }
    
    const newPath = this.resolvePath(args[0]);
    const dir = this.fileSystem[newPath];
    
    if (!dir || dir.type !== 'directory') {
      this.writeLine(`cd: ${args[0]}: No such file or directory`, 'error');
      return;
    }
    
    this.currentDirectory = newPath;
  }

  handleCAT(args) {
    if (!args[0]) {
      this.writeLine('cat: missing file operand', 'error');
      return;
    }
    
    const filePath = this.resolvePath(args[0]);
    const file = this.fileSystem[filePath];
    
    if (!file) {
      this.writeLine(`cat: ${args[0]}: No such file or directory`, 'error');
      return;
    }
    
    if (file.type !== 'file') {
      this.writeLine(`cat: ${args[0]}: Is a directory`, 'error');
      return;
    }
    
    this.writeLine(file.content || '');
  }

  handlePython(args) {
    if (!args[0]) {
      this.writeLine('Python 3.9.2 Interactive Shell - Type exit() to quit');
      this.writeLine('>>> ', 'info');
      return;
    }
    
    const scriptPath = this.resolvePath(args[0]);
    const scriptName = args[0];
    
    // Simulate Python script execution
    this.writeLine(`Executing Python script: ${scriptName}`, 'info');
    
    if (scriptName.includes('scan.py')) {
      this.simulatePythonScan();
    } else if (scriptName.includes('exploit.py')) {
      this.simulatePythonExploit();
    } else if (scriptName.includes('ddos.py')) {
      this.simulateDDoSScript();
    } else if (scriptName.includes('keylogger.py')) {
      this.simulateKeylogger();
    } else {
      this.writeLine('Script executed successfully');
    }
  }

  simulatePythonScan() {
    this.writeLine('Network Scanner v2.1 - Starting scan...', 'info');
    setTimeout(() => {
      this.writeLine('Found 15 active hosts');
      this.writeLine('Vulnerable services detected: SSH (3), HTTP (8), FTP (2)');
      this.writeLine('Scan complete. Results saved to scan_results.txt');
      this.game.player.addXP(25);
      this.game.player.addBTC(0.0002);
    }, 1000);
  }

  simulatePythonExploit() {
    this.writeLine('Advanced Exploit Framework - Loading modules...', 'warning');
    setTimeout(() => {
      const success = Math.random() > 0.4;
      if (success) {
        this.writeLine('Exploit successful! Shell access gained', 'success');
        this.game.player.addXP(100);
        this.game.player.addBTC(0.002);
      } else {
        this.writeLine('Exploit failed - target may be patched', 'error');
      }
    }, 1500);
  }

  simulateDDoSScript() {
    this.writeLine('DDoS Attack Script - WARNING: Use responsibly!', 'warning');
    this.writeLine('This is for educational purposes only', 'warning');
    setTimeout(() => {
      this.writeLine('Simulated attack completed - No actual harm done');
      this.writeLine('Educational value: Understanding DDoS mitigation');
    }, 2000);
  }

  simulateKeylogger() {
    this.writeLine('Keylogger Analysis Tool - Analyzing captured data...', 'info');
    setTimeout(() => {
      this.writeLine('Found 247 keystrokes, 15 passwords, 8 credit cards');
      this.writeLine('Data encrypted and stored securely for analysis');
      this.game.player.addBTC(0.001);
    }, 1200);
  }

  executeAdvancedTool(command, args) {
    const result = this.advancedTools.executeToolCommand(command, args, this.game.player);
    
    if (result.success) {
      this.writeLine(result.message, 'success');
      if (result.reward) {
        this.writeLine(`Rewards earned: ${result.reward.btc ? result.reward.btc.toFixed(6) + ' BTC' : ''} ${result.reward.xp ? result.reward.xp + ' XP' : ''}`, 'info');
      }
    } else {
      this.writeLine(result.message, 'error');
    }
  }

  showMissions() {
    const player = this.game.player;
    const availableMissions = this.missionSystem.getAvailableMissions(player.skills, player.level);
    
    this.writeLine('=== AVAILABLE MISSIONS ===', 'info');
    this.writeLine('');
    
    availableMissions.forEach(mission => {
      const cooldown = this.missionSystem.getMissionProgress(mission.id).cooldownRemaining;
      const status = cooldown > 0 ? `(Cooldown: ${Math.ceil(cooldown / 60000)}m)` : '(Available)';
      
      this.writeLine(`[${mission.difficulty.toUpperCase()}] ${mission.name} ${status}`);
      this.writeLine(`  ${mission.description}`);
      this.writeLine(`  Rewards: ${mission.rewards.xp} XP, ${mission.rewards.btc} BTC, ${mission.rewards.skillPoints} SP`);
      this.writeLine(`  Command: start-mission ${mission.id}`);
      this.writeLine('');
    });
  }

  startMission(args) {
    if (!args[0]) {
      this.writeLine('Usage: start-mission <mission_id>', 'error');
      return;
    }
    
    const missionId = args[0];
    const success = this.missionSystem.startMission(missionId);
    
    if (success) {
      this.game.player.startMission(missionId);
      this.writeLine(`Mission '${missionId}' started! Complete objectives and use 'complete-mission ${missionId}'`, 'success');
    } else {
      this.writeLine('Failed to start mission. Check requirements and availability.', 'error');
    }
  }

  completeMission(args) {
    if (!args[0]) {
      this.writeLine('Usage: complete-mission <mission_id>', 'error');
      return;
    }
    
    const missionId = args[0];
    const rewards = this.missionSystem.completeMission(missionId, this.game.player);
    
    if (rewards) {
      this.game.player.completeMission(missionId, rewards);
      this.writeLine(`Mission '${missionId}' completed!`, 'success');
      this.writeLine(`Rewards: ${rewards.xp} XP, ${rewards.btc.toFixed(6)} BTC, ${rewards.skillPoints} Skill Points`, 'info');
      
      if (rewards.droppedItems && rewards.droppedItems.length > 0) {
        this.writeLine(`Bonus drops: ${rewards.droppedItems.join(', ')}`, 'success');
      }
    } else {
      this.writeLine('Mission not found or not active.', 'error');
    }
  }

  showSkills() {
    const player = this.game.player;
    const availableSkills = this.skillTree.getAvailableSkills(player.skills);
    
    this.writeLine('=== SKILL TREE ===', 'info');
    this.writeLine(`Available Skill Points: ${player.skillPoints}`, 'info');
    this.writeLine('');
    
    Object.entries(player.skills).forEach(([skillId, level]) => {
      const skill = this.skillTree.getSkill(skillId);
      if (skill) {
        const maxed = level >= skill.maxLevel ? ' (MAXED)' : '';
        this.writeLine(`${skill.name}: Level ${level}/${skill.maxLevel}${maxed}`);
        
        if (level < skill.maxLevel) {
          const cost = skill.cost(level + 1);
          const canUpgrade = this.skillTree.canUpgradeSkill(skillId, player.skills, player.skillPoints);
          const status = canUpgrade ? '(Can upgrade)' : '(Insufficient SP)';
          this.writeLine(`  Next level cost: ${cost} SP ${status}`);
        }
      }
    });
    
    this.writeLine('');
    this.writeLine('Use: upgrade-skill <skill_name> to upgrade');
  }

  upgradeSkill(args) {
    if (!args[0]) {
      this.writeLine('Usage: upgrade-skill <skill_name>', 'error');
      return;
    }
    
    const skillId = args[0];
    const player = this.game.player;
    const skill = this.skillTree.getSkill(skillId);
    
    if (!skill) {
      this.writeLine('Skill not found.', 'error');
      return;
    }
    
    const currentLevel = player.skills[skillId] || 0;
    const cost = skill.cost(currentLevel + 1);
    
    if (this.skillTree.canUpgradeSkill(skillId, player.skills, player.skillPoints)) {
      if (player.upgradeSkill(skillId, cost)) {
        this.writeLine(`${skill.name} upgraded to level ${currentLevel + 1}!`, 'success');
        
        // Check for tool unlocks
        this.checkToolUnlocks(skillId, currentLevel + 1);
      }
    } else {
      this.writeLine('Cannot upgrade skill. Check requirements and skill points.', 'error');
    }
  }

  checkToolUnlocks(skillId, level) {
    const player = this.game.player;
    const toolUnlocks = {
      'network_scanning': { 2: ['masscan'], 4: ['wireshark'] },
      'web_recon': { 2: ['dirb'], 3: ['burp'] },
      'sql_injection': { 2: ['sqlmap'] },
      'malware_analysis': { 3: ['msfconsole'] },
      'hash_cracking': { 2: ['hashcat'], 3: ['john'] },
      'social_engineering': { 2: ['setoolkit'] },
      'cryptography': { 3: ['aircrack'] },
      'vulnerability_scanning': { 4: ['hydra'] }
    };
    
    if (toolUnlocks[skillId] && toolUnlocks[skillId][level]) {
      toolUnlocks[skillId][level].forEach(toolId => {
        if (player.availableTools[toolId] && !player.availableTools[toolId].unlocked) {
          player.availableTools[toolId].unlocked = true;
          this.writeLine(`New tool unlocked: ${player.availableTools[toolId].name}!`, 'success');
        }
      });
    }
  }

  showInventory() {
    const player = this.game.player;
    
    this.writeLine('=== INVENTORY ===', 'info');
    
    if (player.inventory.length === 0) {
      this.writeLine('Inventory is empty.');
      return;
    }
    
    player.inventory.forEach((item, index) => {
      const date = new Date(item.timestamp).toLocaleString();
      this.writeLine(`${index + 1}. ${item.name} (acquired: ${date})`);
    });
  }

  showBalance() {
    const player = this.game.player;
    this.writeLine(`BTC Balance: ${player.btcBalance.toFixed(8)} BTC`, 'success');
    this.writeLine(`USD Equivalent: $${(player.btcBalance * 45000).toFixed(2)}`, 'info');
  }

  resolvePath(path) {
    if (path.startsWith('/')) {
      return path;
    }
    
    if (path === '..') {
      const parts = this.currentDirectory.split('/');
      parts.pop();
      return parts.join('/') || '/';
    }
    
    if (path === '.') {
      return this.currentDirectory;
    }
    
    return `${this.currentDirectory}/${path}`.replace(/\/+/g, '/');
  }

  handleMKDIR(args) {
    if (!args[0]) {
      this.writeLine('mkdir: missing operand', 'error');
      return;
    }
    
    const dirPath = this.resolvePath(args[0]);
    this.fileSystem[dirPath] = {
      type: 'directory',
      contents: []
    };
    
    // Add to parent directory
    const parentPath = dirPath.substring(0, dirPath.lastIndexOf('/')) || '/';
    const dirName = dirPath.substring(dirPath.lastIndexOf('/') + 1);
    
    if (this.fileSystem[parentPath]) {
      this.fileSystem[parentPath].contents.push(dirName);
    }
    
    this.writeLine(`Directory created: ${args[0]}`);
  }

  handleTOUCH(args) {
    if (!args[0]) {
      this.writeLine('touch: missing file operand', 'error');
      return;
    }
    
    const filePath = this.resolvePath(args[0]);
    this.fileSystem[filePath] = {
      type: 'file',
      content: ''
    };
    
    this.writeLine(`File created: ${args[0]}`);
  }

  handleRM(args) {
    if (!args[0]) {
      this.writeLine('rm: missing operand', 'error');
      return;
    }
    
    const filePath = this.resolvePath(args[0]);
    if (this.fileSystem[filePath]) {
      delete this.fileSystem[filePath];
      this.writeLine(`Removed: ${args[0]}`);
    } else {
      this.writeLine(`rm: cannot remove '${args[0]}': No such file or directory`, 'error');
    }
  }

  handlePS() {
    this.writeLine('  PID TTY          TIME CMD');
    this.writeLine(' 1337 pts/0    00:00:01 bash');
    this.writeLine(' 1338 pts/0    00:00:00 nmap');
    this.writeLine(' 1339 pts/0    00:00:02 sqlmap');
    this.writeLine(' 1340 pts/0    00:00:00 metasploit');
    this.writeLine(' 1341 pts/0    00:00:01 burp');
  }

  handleKILL(args) {
    if (!args[0]) {
      this.writeLine('kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]', 'error');
      return;
    }
    
    const pid = args[0];
    this.writeLine(`Process ${pid} terminated.`);
  }
  showHelp() {
    this.writeLine('=== ELITE HACKER TERMINAL v3.0 ===', 'info');
    this.writeLine('');
    this.writeLine('System Commands:');
    this.writeLine('  ls, cd, pwd, cat, mkdir, touch, rm, ps, kill, whoami');
    this.writeLine('  python/python3 <script> - Execute Python scripts');
    this.writeLine('');
    this.writeLine('Advanced Hacking Tools:');
    this.writeLine('  nmap <target>     - Network mapper and port scanner');
    this.writeLine('  sqlmap <url>      - Advanced SQL injection tool');
    this.writeLine('  burp              - Web application security scanner');
    this.writeLine('  msfconsole        - Metasploit penetration testing framework');
    this.writeLine('  hashcat <hashes>  - Advanced password recovery');
    this.writeLine('  setoolkit         - Social engineering toolkit');
    this.writeLine('');
    this.writeLine('Mission System:');
    this.writeLine('  missions          - View available missions');
    this.writeLine('  start-mission <id> - Start a mission');
    this.writeLine('  complete-mission <id> - Complete active mission');
    this.writeLine('');
    this.writeLine('Character Progression:');
    this.writeLine('  skills            - View skill tree and upgrade options');
    this.writeLine('  upgrade-skill <skill> - Upgrade a skill');
    this.writeLine('  inventory         - View collected items');
    this.writeLine('  balance           - Check BTC balance');
    this.writeLine('');
    this.writeLine('Legacy Commands:');
    this.writeLine('  scan, exploit, analyze, target, status - Basic security tools');
    this.writeLine('');
    this.writeLine('System:');
    this.writeLine('  help              - Show this help');
    this.writeLine('  clear             - Clear terminal');
    this.writeLine('');
    this.writeLine('Type "missions" to start earning BTC and XP!', 'success');
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
    this.showSystemStatus();
  }
}