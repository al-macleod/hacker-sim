export class SkillTree {
  constructor() {
    this.skills = {
      // Network Security Branch
      'network_scanning': {
        name: 'Network Scanning',
        description: 'Advanced network reconnaissance techniques',
        maxLevel: 10,
        cost: (level) => level * 50,
        prerequisites: [],
        unlocks: ['port_scanning', 'service_enumeration']
      },
      'port_scanning': {
        name: 'Port Scanning',
        description: 'Stealth port scanning and OS fingerprinting',
        maxLevel: 8,
        cost: (level) => level * 75,
        prerequisites: ['network_scanning'],
        unlocks: ['vulnerability_scanning']
      },
      'vulnerability_scanning': {
        name: 'Vulnerability Assessment',
        description: 'Automated vulnerability discovery',
        maxLevel: 10,
        cost: (level) => level * 100,
        prerequisites: ['port_scanning'],
        unlocks: ['exploit_development']
      },

      // Web Application Security Branch
      'web_recon': {
        name: 'Web Reconnaissance',
        description: 'Web application information gathering',
        maxLevel: 8,
        cost: (level) => level * 60,
        prerequisites: [],
        unlocks: ['sql_injection', 'xss_exploitation']
      },
      'sql_injection': {
        name: 'SQL Injection',
        description: 'Advanced SQL injection techniques',
        maxLevel: 10,
        cost: (level) => level * 120,
        prerequisites: ['web_recon'],
        unlocks: ['blind_sqli', 'time_based_sqli']
      },
      'xss_exploitation': {
        name: 'XSS Exploitation',
        description: 'Cross-site scripting attack vectors',
        maxLevel: 8,
        cost: (level) => level * 100,
        prerequisites: ['web_recon'],
        unlocks: ['dom_xss', 'stored_xss']
      },

      // Cryptography Branch
      'cryptography': {
        name: 'Cryptography',
        description: 'Encryption and decryption techniques',
        maxLevel: 10,
        cost: (level) => level * 150,
        prerequisites: [],
        unlocks: ['hash_cracking', 'ssl_analysis']
      },
      'hash_cracking': {
        name: 'Hash Cracking',
        description: 'Password hash analysis and cracking',
        maxLevel: 8,
        cost: (level) => level * 180,
        prerequisites: ['cryptography'],
        unlocks: ['rainbow_tables']
      },

      // Social Engineering Branch
      'social_engineering': {
        name: 'Social Engineering',
        description: 'Human psychology exploitation',
        maxLevel: 6,
        cost: (level) => level * 200,
        prerequisites: [],
        unlocks: ['phishing', 'pretexting']
      },
      'phishing': {
        name: 'Phishing',
        description: 'Advanced phishing campaign creation',
        maxLevel: 8,
        cost: (level) => level * 250,
        prerequisites: ['social_engineering'],
        unlocks: ['spear_phishing']
      },

      // Malware Development Branch
      'malware_analysis': {
        name: 'Malware Analysis',
        description: 'Reverse engineering malicious software',
        maxLevel: 10,
        cost: (level) => level * 300,
        prerequisites: ['cryptography'],
        unlocks: ['payload_development', 'rootkit_analysis']
      },
      'payload_development': {
        name: 'Payload Development',
        description: 'Custom exploit payload creation',
        maxLevel: 8,
        cost: (level) => level * 400,
        prerequisites: ['malware_analysis'],
        unlocks: ['advanced_persistence']
      }
    };
  }

  getSkill(skillId) {
    return this.skills[skillId];
  }

  getAvailableSkills(playerSkills) {
    return Object.entries(this.skills).filter(([id, skill]) => {
      return skill.prerequisites.every(prereq => 
        playerSkills[prereq] && playerSkills[prereq] > 0
      );
    });
  }

  canUpgradeSkill(skillId, playerSkills, skillPoints) {
    const skill = this.skills[skillId];
    if (!skill) return false;

    const currentLevel = playerSkills[skillId] || 0;
    if (currentLevel >= skill.maxLevel) return false;

    const cost = skill.cost(currentLevel + 1);
    if (skillPoints < cost) return false;

    return skill.prerequisites.every(prereq => 
      playerSkills[prereq] && playerSkills[prereq] > 0
    );
  }
}