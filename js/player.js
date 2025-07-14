export class Player {
  constructor() {
    this.level = 1;
    this.xp = 0;
    this.reputation = 'White Hat';
    this.skills = new Set();
    this.tools = {
      scanner: 1,
      brute_force: 0,
      packet_sniffer: 0,
      vulnerability_scanner: 0,
      payload_generator: 0,
      proxy_tool: 0,
      forensics_kit: 0,
      crypto_analyzer: 0
    };
    this.achievements = [];
    this.listeners = {};
    
    // Initialize with basic scanning skill
    this.skills.add('Network Scanning');
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  addXP(amount) {
    this.xp += amount;
    let leveledUp = false;
    const oldLevel = this.level;
    
    while (this.level < 20 && this.xp >= this.getXPRequiredForLevel(this.level + 1)) {
      this.level++;
      leveledUp = true;
    }
    
    if (leveledUp) {
      const levelUpData = this.handleLevelUp(oldLevel);
      this.emit('levelUp', levelUpData);
    }
    
    this.updateReputation();
    this.emit('update');
  }

  getXPRequiredForLevel(level) {
    return level * 100 + (level - 1) * 50; // Increasing XP requirements
  }

  handleLevelUp(oldLevel) {
    const unlockedSkills = [];
    const unlockedTools = [];
    
    // Level-based unlocks
    const levelUnlocks = {
      2: { 
        skills: ['Vulnerability Assessment'], 
        tools: { vulnerability_scanner: 1 },
        achievements: [{ name: 'First Steps', description: 'Reached level 2' }]
      },
      3: { 
        skills: ['SQL Injection'], 
        tools: { brute_force: 1 }
      },
      4: { 
        skills: ['XSS Detection'],
        tools: { payload_generator: 1 }
      },
      5: { 
        skills: ['CSRF Analysis'],
        tools: { proxy_tool: 1 }
      },
      6: { 
        skills: ['Authentication Bypass'],
        tools: { scanner: 2 }
      },
      7: { 
        skills: ['Session Management'],
        tools: { packet_sniffer: 1 }
      },
      8: { 
        skills: ['API Security Testing'],
        tools: { forensics_kit: 1 }
      },
      9: { 
        skills: ['Social Engineering Awareness'],
        tools: { crypto_analyzer: 1 }
      },
      10: { 
        skills: ['Cryptography Analysis'],
        achievements: [{ name: 'Security Expert', description: 'Reached level 10' }]
      },
      12: { 
        skills: ['Reverse Engineering'],
        tools: { scanner: 3 }
      },
      15: { 
        skills: ['Malware Analysis'],
        tools: { vulnerability_scanner: 2 }
      }
    };
    
    for (let level = oldLevel + 1; level <= this.level; level++) {
      const unlocks = levelUnlocks[level];
      if (unlocks) {
        // Unlock skills
        if (unlocks.skills) {
          unlocks.skills.forEach(skill => {
            this.skills.add(skill);
            unlockedSkills.push(skill);
          });
        }
        
        // Unlock/upgrade tools
        if (unlocks.tools) {
          Object.entries(unlocks.tools).forEach(([tool, toolLevel]) => {
            this.tools[tool] = toolLevel;
            unlockedTools.push(tool.replace(/_/g, ' '));
          });
        }
        
        // Add achievements
        if (unlocks.achievements) {
          unlocks.achievements.forEach(achievement => {
            this.achievements.push(achievement);
          });
        }
      }
    }
    
    return {
      level: this.level,
      unlockedSkills,
      unlockedTools
    };
  }

  updateReputation() {
    if (this.level >= 15) {
      this.reputation = 'Security Researcher';
    } else if (this.level >= 10) {
      this.reputation = 'Ethical Hacker';
    } else if (this.level >= 5) {
      this.reputation = 'Security Enthusiast';
    } else {
      this.reputation = 'White Hat';
    }
  }

  hasSkill(skill) {
    return this.skills.has(skill);
  }

  getToolLevel(tool) {
    return this.tools[tool] || 0;
  }

  addAchievement(name, description) {
    if (!this.achievements.some(a => a.name === name)) {
      this.achievements.push({ name, description });
      this.emit('update');
    }
  }
}