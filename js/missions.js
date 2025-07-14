export class MissionSystem {
  constructor() {
    this.missions = [
      {
        id: 1,
        title: 'First Reconnaissance',
        description: 'Learn the basics of network scanning and information gathering.',
        objective: 'Perform a network scan using the scan command',
        xpReward: 50,
        requiredLevel: 1,
        completed: false,
        type: 'tutorial'
      },
      {
        id: 2,
        title: 'Vulnerability Discovery',
        description: 'Identify security weaknesses in web applications.',
        objective: 'Use the vulnerability scanner to find security issues',
        xpReward: 100,
        requiredLevel: 2,
        completed: false,
        type: 'scanning'
      },
      {
        id: 3,
        title: 'SQL Injection Hunt',
        description: 'Learn to identify and exploit SQL injection vulnerabilities.',
        objective: 'Successfully perform a SQL injection attack',
        xpReward: 150,
        requiredLevel: 3,
        completed: false,
        type: 'exploitation'
      },
      {
        id: 4,
        title: 'Cross-Site Scripting (XSS)',
        description: 'Discover and exploit XSS vulnerabilities in web applications.',
        objective: 'Find and exploit an XSS vulnerability',
        xpReward: 150,
        requiredLevel: 4,
        completed: false,
        type: 'exploitation'
      },
      {
        id: 5,
        title: 'CSRF Token Analysis',
        description: 'Analyze Cross-Site Request Forgery protection mechanisms.',
        objective: 'Identify CSRF vulnerabilities in target applications',
        xpReward: 200,
        requiredLevel: 5,
        completed: false,
        type: 'analysis'
      },
      {
        id: 6,
        title: 'Authentication Bypass',
        description: 'Learn techniques to bypass weak authentication mechanisms.',
        objective: 'Successfully bypass authentication on a target system',
        xpReward: 250,
        requiredLevel: 6,
        completed: false,
        type: 'exploitation'
      },
      {
        id: 7,
        title: 'Session Hijacking',
        description: 'Understand session management vulnerabilities.',
        objective: 'Demonstrate session hijacking techniques',
        xpReward: 300,
        requiredLevel: 7,
        completed: false,
        type: 'exploitation'
      },
      {
        id: 8,
        title: 'API Security Assessment',
        description: 'Test REST API endpoints for security vulnerabilities.',
        objective: 'Perform comprehensive API security testing',
        xpReward: 350,
        requiredLevel: 8,
        completed: false,
        type: 'assessment'
      }
    ];
    
    this.currentMissionIndex = 0;
    this.listeners = {};
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

  init() {
    // Initialize mission system
  }

  getCurrentMission() {
    return this.missions[this.currentMissionIndex] || null;
  }

  getNextMission() {
    if (this.currentMissionIndex < this.missions.length - 1) {
      this.currentMissionIndex++;
      return this.missions[this.currentMissionIndex];
    }
    return null;
  }

  completeMission(missionId) {
    const mission = this.missions.find(m => m.id === missionId);
    if (mission && !mission.completed) {
      mission.completed = true;
      this.emit('missionComplete', mission);
      return true;
    }
    return false;
  }

  getMissionProgress() {
    const completed = this.missions.filter(m => m.completed).length;
    return {
      completed,
      total: this.missions.length,
      percentage: (completed / this.missions.length) * 100
    };
  }

  getAvailableMissions(playerLevel) {
    return this.missions.filter(m => m.requiredLevel <= playerLevel && !m.completed);
  }

  getMissionByType(type) {
    return this.missions.filter(m => m.type === type);
  }
}