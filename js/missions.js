export class MissionSystem {
  constructor() {
    this.missions = {
      // Tutorial Missions
      'first_scan': {
        id: 'first_scan',
        name: 'First Network Scan',
        description: 'Perform your first network reconnaissance',
        type: 'tutorial',
        difficulty: 'beginner',
        requirements: [],
        objectives: ['Use nmap to scan a target network'],
        rewards: {
          xp: 100,
          btc: 0.001,
          skillPoints: 5,
          items: ['basic_scanner_config']
        },
        repeatable: false,
        completed: false
      },

      // Recurring Farming Missions
      'daily_recon': {
        id: 'daily_recon',
        name: 'Daily Reconnaissance',
        description: 'Perform routine network scanning for intelligence gathering',
        type: 'farming',
        difficulty: 'beginner',
        requirements: ['network_scanning:1'],
        objectives: ['Scan 3 different networks', 'Identify 5 open ports'],
        rewards: {
          xp: 50,
          btc: 0.0005,
          skillPoints: 2,
          items: ['network_intel', 'port_list']
        },
        repeatable: true,
        cooldown: 3600000, // 1 hour
        dropRates: {
          'advanced_scanner': 0.05,
          'exploit_db_access': 0.02,
          'btc_bonus': 0.1
        }
      },

      'web_vuln_hunt': {
        id: 'web_vuln_hunt',
        name: 'Web Vulnerability Hunt',
        description: 'Search for vulnerabilities in web applications',
        type: 'farming',
        difficulty: 'intermediate',
        requirements: ['web_recon:2', 'sql_injection:1'],
        objectives: ['Find SQL injection in 2 sites', 'Discover XSS vulnerability'],
        rewards: {
          xp: 150,
          btc: 0.002,
          skillPoints: 8,
          items: ['sql_payload_pack', 'xss_vectors']
        },
        repeatable: true,
        cooldown: 7200000, // 2 hours
        dropRates: {
          'sqlmap_premium': 0.08,
          'burp_extension': 0.06,
          'zero_day_exploit': 0.01,
          'btc_jackpot': 0.03
        }
      },

      'crypto_mining_hack': {
        id: 'crypto_mining_hack',
        name: 'Crypto Mining Operation',
        description: 'Infiltrate and extract from cryptocurrency mining pools',
        type: 'farming',
        difficulty: 'advanced',
        requirements: ['cryptography:3', 'malware_analysis:2'],
        objectives: ['Breach mining pool security', 'Extract wallet addresses'],
        rewards: {
          xp: 300,
          btc: 0.01,
          skillPoints: 15,
          items: ['mining_malware', 'wallet_cracker']
        },
        repeatable: true,
        cooldown: 14400000, // 4 hours
        dropRates: {
          'advanced_rootkit': 0.12,
          'crypto_stealer': 0.08,
          'premium_vpn_access': 0.15,
          'btc_mega_bonus': 0.05
        }
      },

      // High-Value Heist Missions
      'bank_infiltration': {
        id: 'bank_infiltration',
        name: 'Digital Bank Heist',
        description: 'Infiltrate a major banking institution',
        type: 'heist',
        difficulty: 'expert',
        requirements: ['sql_injection:5', 'social_engineering:3', 'malware_analysis:4'],
        objectives: ['Bypass 2FA system', 'Access customer database', 'Transfer funds'],
        rewards: {
          xp: 1000,
          btc: 0.1,
          skillPoints: 50,
          items: ['banking_trojan', 'swift_exploit', 'offshore_account']
        },
        repeatable: true,
        cooldown: 86400000, // 24 hours
        dropRates: {
          'zero_day_banking': 0.20,
          'insider_contact': 0.10,
          'btc_whale_wallet': 0.02
        }
      },

      'government_breach': {
        id: 'government_breach',
        name: 'Government System Breach',
        description: 'Infiltrate classified government systems',
        type: 'heist',
        difficulty: 'legendary',
        requirements: ['vulnerability_scanning:8', 'payload_development:5', 'cryptography:7'],
        objectives: ['Breach firewall', 'Escalate privileges', 'Extract classified data'],
        rewards: {
          xp: 2500,
          btc: 0.5,
          skillPoints: 100,
          items: ['classified_exploits', 'nsa_toolkit', 'diplomatic_immunity']
        },
        repeatable: true,
        cooldown: 604800000, // 7 days
        dropRates: {
          'nation_state_malware': 0.30,
          'quantum_decryption': 0.05,
          'btc_treasury_access': 0.01
        }
      }
    };

    this.activeMissions = new Set();
    this.completedMissions = new Set();
    this.missionCooldowns = new Map();
  }

  getAvailableMissions(playerSkills, playerLevel) {
    return Object.values(this.missions).filter(mission => {
      // Check if mission is on cooldown
      if (this.missionCooldowns.has(mission.id)) {
        const cooldownEnd = this.missionCooldowns.get(mission.id);
        if (Date.now() < cooldownEnd) return false;
      }

      // Check if already completed (for non-repeatable missions)
      if (!mission.repeatable && this.completedMissions.has(mission.id)) {
        return false;
      }

      // Check requirements
      return mission.requirements.every(req => {
        const [skill, level] = req.split(':');
        return playerSkills[skill] >= parseInt(level);
      });
    });
  }

  startMission(missionId) {
    const mission = this.missions[missionId];
    if (!mission) return false;

    this.activeMissions.add(missionId);
    return true;
  }

  completeMission(missionId, player) {
    const mission = this.missions[missionId];
    if (!mission || !this.activeMissions.has(missionId)) return null;

    this.activeMissions.delete(missionId);
    this.completedMissions.add(missionId);

    // Set cooldown for repeatable missions
    if (mission.repeatable && mission.cooldown) {
      this.missionCooldowns.set(missionId, Date.now() + mission.cooldown);
    }

    // Calculate rewards with drop rates
    const rewards = { ...mission.rewards };
    const droppedItems = [];

    // Process drop rates
    if (mission.dropRates) {
      Object.entries(mission.dropRates).forEach(([item, rate]) => {
        if (Math.random() < rate) {
          droppedItems.push(item);
          
          // Special BTC bonuses
          if (item.includes('btc')) {
            const bonusMultiplier = item.includes('mega') ? 10 : 
                                  item.includes('jackpot') ? 5 : 
                                  item.includes('whale') ? 50 : 2;
            rewards.btc *= bonusMultiplier;
          }
        }
      });
    }

    rewards.droppedItems = droppedItems;
    return rewards;
  }

  getMissionProgress(missionId) {
    // Simulate mission progress tracking
    return {
      completed: this.completedMissions.has(missionId),
      active: this.activeMissions.has(missionId),
      cooldownRemaining: this.missionCooldowns.has(missionId) ? 
        Math.max(0, this.missionCooldowns.get(missionId) - Date.now()) : 0
    };
  }
}