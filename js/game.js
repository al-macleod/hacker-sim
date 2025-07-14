import { Player } from './player.js';
import { MissionSystem } from './missions.js';
import { TargetApplications } from './targets.js';

export class Game {
  constructor() {
    this.player = new Player();
    this.missions = new MissionSystem();
    this.targets = new TargetApplications();
    this.currentMission = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    
    this.updateUI();
    this.missions.init();
    this.targets.init();
    this.currentMission = this.missions.getCurrentMission();
    this.updateMissionDisplay();
    this.isInitialized = true;
    
    // Listen for player updates
    this.player.on('update', () => this.updateUI());
    this.player.on('levelUp', (data) => this.handleLevelUp(data));
    this.missions.on('missionComplete', (mission) => this.handleMissionComplete(mission));
  }

  updateUI() {
    document.getElementById('player-level').textContent = this.player.level;
    document.getElementById('player-xp').textContent = this.player.xp;
    document.getElementById('player-reputation').textContent = this.player.reputation;
    
    this.updateSkillsDisplay();
    this.updateToolsDisplay();
    this.updateAchievementsDisplay();
  }

  updateSkillsDisplay() {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    
    const allSkills = [
      'Network Scanning', 'Vulnerability Assessment', 'SQL Injection',
      'XSS Detection', 'CSRF Analysis', 'Authentication Bypass',
      'Session Management', 'API Security Testing', 'Social Engineering Awareness',
      'Cryptography Analysis', 'Reverse Engineering', 'Malware Analysis'
    ];
    
    allSkills.forEach(skill => {
      const hasSkill = this.player.hasSkill(skill);
      const skillEl = document.createElement('div');
      skillEl.className = `skill-item p-2 rounded ${hasSkill ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'}`;
      skillEl.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-sm">${skill}</span>
          <span class="text-xs">${hasSkill ? '✓' : '🔒'}</span>
        </div>
      `;
      skillsList.appendChild(skillEl);
    });
  }

  updateToolsDisplay() {
    const toolsList = document.getElementById('tools-list');
    toolsList.innerHTML = '';
    
    Object.entries(this.player.tools).forEach(([tool, level]) => {
      const toolEl = document.createElement('div');
      const isUnlocked = level > 0;
      toolEl.className = `tool-item p-2 rounded ${isUnlocked ? 'bg-blue-900 text-blue-300' : 'bg-gray-700 text-gray-400'}`;
      
      const toolName = tool.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      toolEl.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-sm">${toolName}</span>
          <span class="text-xs">${isUnlocked ? `Lv.${level}` : '🔒'}</span>
        </div>
        ${isUnlocked ? `<div class="progress-bar mt-1"><div class="progress-fill" style="width: ${(level / 5) * 100}%"></div></div>` : ''}
      `;
      toolsList.appendChild(toolEl);
    });
  }

  updateAchievementsDisplay() {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';
    
    this.player.achievements.forEach(achievement => {
      const achEl = document.createElement('div');
      achEl.className = 'achievement-badge text-sm';
      achEl.innerHTML = `
        <div class="font-semibold">${achievement.name}</div>
        <div class="text-xs opacity-80">${achievement.description}</div>
      `;
      achievementsList.appendChild(achEl);
    });
    
    // Show locked achievements
    const lockedAchievements = [
      { name: 'First Steps', description: 'Complete your first vulnerability scan', condition: () => this.player.level >= 2 },
      { name: 'SQL Sleuth', description: 'Successfully identify SQL injection vulnerability', condition: () => this.player.hasSkill('SQL Injection') },
      { name: 'XSS Hunter', description: 'Find and exploit XSS vulnerability', condition: () => this.player.hasSkill('XSS Detection') },
      { name: 'Security Expert', description: 'Reach level 10', condition: () => this.player.level >= 10 }
    ].filter(ach => !this.player.achievements.some(earned => earned.name === ach.name) && !ach.condition());
    
    lockedAchievements.forEach(achievement => {
      const achEl = document.createElement('div');
      achEl.className = 'achievement-badge achievement-locked text-sm';
      achEl.innerHTML = `
        <div class="font-semibold">${achievement.name}</div>
        <div class="text-xs opacity-60">${achievement.description}</div>
      `;
      achievementsList.appendChild(achEl);
    });
  }

  updateMissionDisplay() {
    const missionContent = document.getElementById('mission-content');
    if (this.currentMission) {
      missionContent.innerHTML = `
        <h4 class="font-semibold text-white mb-2">${this.currentMission.title}</h4>
        <p class="mb-3">${this.currentMission.description}</p>
        <div class="text-sm text-gray-400">
          <strong>Objective:</strong> ${this.currentMission.objective}
        </div>
        <div class="text-sm text-blue-400 mt-2">
          <strong>Reward:</strong> ${this.currentMission.xpReward} XP
        </div>
      `;
    }
  }

  handleLevelUp(data) {
    this.showNotification(`Level Up! You reached level ${data.level}`, 'success');
    if (data.unlockedSkills.length > 0) {
      data.unlockedSkills.forEach(skill => {
        this.showNotification(`New skill unlocked: ${skill}`, 'info');
      });
    }
    if (data.unlockedTools.length > 0) {
      data.unlockedTools.forEach(tool => {
        this.showNotification(`New tool unlocked: ${tool}`, 'info');
      });
    }
  }

  handleMissionComplete(mission) {
    this.showNotification(`Mission completed: ${mission.title}`, 'success');
    this.player.addXP(mission.xpReward);
    this.currentMission = this.missions.getNextMission();
    this.updateMissionDisplay();
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-600' : 
      type === 'error' ? 'bg-red-600' : 
      type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Command handlers for terminal
  executeCommand(command, args = []) {
    switch (command) {
      case 'scan':
        return this.handleScanCommand(args);
      case 'exploit':
        return this.handleExploitCommand(args);
      case 'analyze':
        return this.handleAnalyzeCommand(args);
      case 'target':
        return this.handleTargetCommand(args);
      case 'mission':
        return this.handleMissionCommand(args);
      case 'skills':
        return this.handleSkillsCommand();
      case 'tools':
        return this.handleToolsCommand();
      case 'status':
        return this.handleStatusCommand();
      default:
        return { success: false, message: `Unknown command: ${command}` };
    }
  }

  handleScanCommand(args) {
    if (!this.player.hasSkill('Network Scanning')) {
      return { success: false, message: 'You need to unlock Network Scanning skill first.' };
    }
    
    const target = args[0] || 'localhost';
    const scanLevel = this.player.getToolLevel('scanner');
    
    // Simulate scan results
    const vulnerabilities = [
      'Open port 80 (HTTP)',
      'Open port 443 (HTTPS)',
      'Potential SQL injection in login form',
      'Missing security headers',
      'Outdated server version detected'
    ].slice(0, Math.min(3 + scanLevel, 5));
    
    this.player.addXP(20 * scanLevel);
    
    return {
      success: true,
      message: `Scanning ${target}...\n\nVulnerabilities found:\n${vulnerabilities.map(v => `• ${v}`).join('\n')}`
    };
  }

  handleExploitCommand(args) {
    const exploitType = args[0];
    if (!exploitType) {
      return { success: false, message: 'Usage: exploit <type> [target]\nAvailable: sqli, xss, csrf' };
    }
    
    const skillMap = {
      'sqli': 'SQL Injection',
      'xss': 'XSS Detection',
      'csrf': 'CSRF Analysis'
    };
    
    const requiredSkill = skillMap[exploitType];
    if (!requiredSkill || !this.player.hasSkill(requiredSkill)) {
      return { success: false, message: `You need to unlock ${requiredSkill} skill first.` };
    }
    
    // Simulate exploit attempt
    const success = Math.random() > 0.3; // 70% success rate
    if (success) {
      this.player.addXP(50);
      return { success: true, message: `${exploitType.toUpperCase()} exploit successful! Gained access to target system.` };
    } else {
      return { success: false, message: `${exploitType.toUpperCase()} exploit failed. Target may be patched or protected.` };
    }
  }

  handleAnalyzeCommand(args) {
    if (!this.player.hasSkill('Vulnerability Assessment')) {
      return { success: false, message: 'You need to unlock Vulnerability Assessment skill first.' };
    }
    
    const target = args[0] || 'current target';
    this.player.addXP(30);
    
    return {
      success: true,
      message: `Analyzing ${target}...\n\nSecurity Assessment:\n• Authentication: Weak password policy\n• Session Management: Insecure session tokens\n• Input Validation: Multiple injection points\n• Access Control: Privilege escalation possible`
    };
  }

  handleTargetCommand(args) {
    const action = args[0];
    if (action === 'list') {
      const targets = this.targets.getAvailableTargets();
      return {
        success: true,
        message: `Available targets:\n${targets.map(t => `• ${t.name} - ${t.difficulty}`).join('\n')}`
      };
    } else if (action === 'load') {
      const targetName = args[1];
      if (targetName) {
        this.targets.loadTarget(targetName);
        return { success: true, message: `Loading target application: ${targetName}` };
      }
    }
    
    return { success: false, message: 'Usage: target list | target load <name>' };
  }

  handleMissionCommand(args) {
    if (this.currentMission) {
      return {
        success: true,
        message: `Current Mission: ${this.currentMission.title}\n\n${this.currentMission.description}\n\nObjective: ${this.currentMission.objective}`
      };
    } else {
      return { success: true, message: 'No active missions. Check back later for new challenges!' };
    }
  }

  handleSkillsCommand() {
    const skills = Array.from(this.player.skills);
    if (skills.length === 0) {
      return { success: true, message: 'No skills unlocked yet. Complete missions to gain new skills!' };
    }
    return {
      success: true,
      message: `Unlocked Skills:\n${skills.map(s => `• ${s}`).join('\n')}`
    };
  }

  handleToolsCommand() {
    const tools = Object.entries(this.player.tools)
      .filter(([_, level]) => level > 0)
      .map(([tool, level]) => `• ${tool.replace(/_/g, ' ')} (Level ${level})`);
    
    if (tools.length === 0) {
      return { success: true, message: 'No tools unlocked yet. Level up to gain access to security tools!' };
    }
    
    return {
      success: true,
      message: `Available Tools:\n${tools.join('\n')}`
    };
  }

  handleStatusCommand() {
    return {
      success: true,
      message: `Player Status:\nLevel: ${this.player.level}\nXP: ${this.player.xp}\nReputation: ${this.player.reputation}\nSkills: ${this.player.skills.size}\nActive Tools: ${Object.values(this.player.tools).filter(l => l > 0).length}`
    };
  }
}