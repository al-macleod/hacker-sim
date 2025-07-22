export class Player {
  constructor() {
    this.level = 1;
    this.xp = 0;
    this.skillPoints = 15;
    this.btcBalance = 0.01; // Starting BTC
    this.reputation = 'White Hat';
    this.skills = {
      // Initialize all skills at level 0
      'network_scanning': 2, // Start with intermediate scanning
      'port_scanning': 1, // Start with basic port scanning
      'vulnerability_scanning': 0,
      'web_recon': 1, // Start with basic web reconnaissance
      'sql_injection': 0,
      'xss_exploitation': 0,
      'cryptography': 0,
      'hash_cracking': 0,
      'social_engineering': 0,
      'phishing': 0,
      'malware_analysis': 0,
      'payload_development': 0,
      'vulnerability_assessment': 0,
      'xss_detection': 0,
      'csrf_analysis': 0,
      'authentication_bypass': 0,
      'session_management': 0,
      'api_security_testing': 0,
      'social_engineering_awareness': 0,
      'cryptography_analysis': 0,
      'reverse_engineering': 0
    };
    this.tools = {
      scanner: 2,
      brute_force: 1,
      packet_sniffer: 0,
      vulnerability_scanner: 1,
      payload_generator: 0,
      proxy_tool: 0,
      forensics_kit: 0,
      crypto_analyzer: 0
    };
    this.selectedTool = null;
    this.availableTools = {
      'nmap': { name: 'Nmap Network Scanner', category: 'network', unlocked: true },
      'masscan': { name: 'Masscan Port Scanner', category: 'network', unlocked: true },
      'dirb': { name: 'DIRB Web Scanner', category: 'web', unlocked: true },
      'sqlmap': { name: 'SQLMap Injection Tool', category: 'web', unlocked: false },
      'burp': { name: 'Burp Suite Professional', category: 'web', unlocked: false },
      'msfconsole': { name: 'Metasploit Framework', category: 'exploit', unlocked: false },
      'hashcat': { name: 'Hashcat Password Cracker', category: 'crypto', unlocked: false },
      'john': { name: 'John the Ripper', category: 'crypto', unlocked: false },
      'setoolkit': { name: 'Social Engineer Toolkit', category: 'social', unlocked: false },
      'aircrack': { name: 'Aircrack-ng WiFi Tool', category: 'wireless', unlocked: false },
      'wireshark': { name: 'Wireshark Packet Analyzer', category: 'network', unlocked: false },
      'hydra': { name: 'THC Hydra Brute Forcer', category: 'brute', unlocked: false }
    };
    this.inventory = [];
    this.achievements = [];
    this.listeners = {};
    this.activeMissions = new Set();
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
      this.skillPoints += 5 + this.level; // More skill points at higher levels
      leveledUp = true;
    }
    
    if (leveledUp) {
      const levelUpData = this.handleLevelUp(oldLevel);
      this.emit('levelUp', levelUpData);
    }
    
    this.updateReputation();
    this.emit('update');
  }

  addBTC(amount) {
    this.btcBalance += amount;
    this.emit('update');
  }

  spendBTC(amount) {
    if (this.btcBalance >= amount) {
      this.btcBalance -= amount;
      this.emit('update');
      return true;
    }
    return false;
  }

  upgradeSkill(skillId, cost) {
    if (this.skillPoints >= cost) {
      this.skillPoints -= cost;
      this.skills[skillId] = (this.skills[skillId] || 0) + 1;
      this.emit('update');
      return true;
    }
    return false;
  }

  addToInventory(item) {
    this.inventory.push({
      id: item,
      name: this.getItemName(item),
      timestamp: Date.now()
    });
    this.emit('update');
  }

  getItemName(itemId) {
    const itemNames = {
      'basic_scanner_config': 'Basic Scanner Configuration',
      'network_intel': 'Network Intelligence Report',
      'sql_payload_pack': 'SQL Injection Payload Pack',
      'xss_vectors': 'XSS Attack Vectors',
      'mining_malware': 'Cryptocurrency Mining Malware',
      'banking_trojan': 'Banking Trojan Source Code',
      'zero_day_exploit': 'Zero-Day Exploit',
      'advanced_rootkit': 'Advanced Rootkit Kit',
      'nsa_toolkit': 'NSA Cyber Toolkit',
      'classified_exploits': 'Classified Government Exploits'
    };
    return itemNames[itemId] || itemId;
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
        skills: ['vulnerability_assessment'], 
        tools: { vulnerability_scanner: 1 },
        achievements: [{ name: 'First Steps', description: 'Reached level 2' }]
      },
      3: { 
        skills: ['sql_injection'], 
        tools: { brute_force: 1 }
      },
      4: { 
        skills: ['xss_detection'],
        tools: { payload_generator: 1 }
      },
      5: { 
        skills: ['csrf_analysis'],
        tools: { proxy_tool: 1 }
      },
      6: { 
        skills: ['authentication_bypass'],
        tools: { scanner: 2 }
      },
      7: { 
        skills: ['session_management'],
        tools: { packet_sniffer: 1 }
      },
      8: { 
        skills: ['api_security_testing'],
        tools: { forensics_kit: 1 }
      },
      9: { 
        skills: ['social_engineering_awareness'],
        tools: { crypto_analyzer: 1 }
      },
      10: { 
        skills: ['cryptography_analysis'],
        achievements: [{ name: 'Security Expert', description: 'Reached level 10' }]
      },
      12: { 
        skills: ['reverse_engineering'],
        tools: { scanner: 3 }
      },
      15: { 
        skills: ['malware_analysis'],
        tools: { vulnerability_scanner: 2 }
      }
    };
    
    for (let level = oldLevel + 1; level <= this.level; level++) {
      const unlocks = levelUnlocks[level];
      if (unlocks) {
        // Unlock skills
        if (unlocks.skills) {
          unlocks.skills.forEach(skill => {
            this.skills[skill] = 1;
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
    const totalSkillLevel = Object.values(this.skills).reduce((sum, level) => sum + level, 0);
    
    if (this.level >= 15 && totalSkillLevel >= 50) {
      this.reputation = 'Elite Hacker';
    } else if (this.level >= 12 && totalSkillLevel >= 30) {
      this.reputation = 'Advanced Penetration Tester';
    } else if (this.level >= 10 && totalSkillLevel >= 20) {
      this.reputation = 'Security Researcher';
    } else if (this.level >= 7 && totalSkillLevel >= 15) {
      this.reputation = 'Ethical Hacker';
    } else if (this.level >= 5 && totalSkillLevel >= 10) {
      this.reputation = 'Security Enthusiast';
    } else if (this.level >= 3 && totalSkillLevel >= 5) {
      this.reputation = 'Junior Security Analyst';
    } else {
      this.reputation = 'White Hat';
    }
  }

  hasSkill(skill) {
    return this.skills[skill] && this.skills[skill] > 0;
  }

  getSkillLevel(skill) {
    return this.skills[skill] || 0;
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

  startMission(missionId) {
    this.activeMissions.add(missionId);
    this.emit('update');
  }

  completeMission(missionId, rewards) {
    this.activeMissions.delete(missionId);
    
    // Apply rewards
    if (rewards.xp) this.addXP(rewards.xp);
    if (rewards.btc) this.addBTC(rewards.btc);
    if (rewards.skillPoints) this.skillPoints += rewards.skillPoints;
    if (rewards.items) {
      rewards.items.forEach(item => this.addToInventory(item));
    }
    if (rewards.droppedItems) {
      rewards.droppedItems.forEach(item => this.addToInventory(item));
    }
    
    this.emit('update');
  }
}