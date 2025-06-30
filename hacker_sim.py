class Player:
    """Simple player profile with XP, level, skills and tools."""
    LEVEL_CAP = 10

    def __init__(self):
        self.xp = 0
        self.level = 1
        self.skills = set()
        self.tools = {
            'scanner': 1,          # base scanner
            'brute_force': 0,      # 0 = locked, >0 = level of tool
            'sniffer': 0,
            'social_engineering': 0,
        }

    def add_xp(self, amount: int):
        """Add XP and handle leveling."""
        self.xp += amount
        while self.level < self.LEVEL_CAP and self.xp >= self.level * 100:
            self.level_up()

    def level_up(self):
        self.level += 1
        print(f"\n*** Level Up! You reached level {self.level}. ***")
        unlocks = LEVEL_UNLOCKS.get(self.level, {})
        for skill in unlocks.get('skills', []):
            self.skills.add(skill)
            print(f"Skill unlocked: {skill}")
        for tool, lvl in unlocks.get('tools', {}).items():
            prev = self.tools.get(tool, 0)
            self.tools[tool] = lvl
            if prev == 0:
                print(f"Tool unlocked: {tool} (level {lvl})")
            else:
                print(f"Tool upgraded: {tool} -> level {lvl}")

    def has_skill(self, skill: str) -> bool:
        return skill in self.skills

    def tool_level(self, tool: str) -> int:
        return self.tools.get(tool, 0)


LEVEL_UNLOCKS = {
    2: {'skills': ['Brute Force'], 'tools': {'brute_force': 1}},
    3: {'skills': ['Packet Sniffing'], 'tools': {'sniffer': 1}},
    4: {'tools': {'scanner': 2}},  # faster scanner
    5: {'skills': ['Social Engineering']},
    7: {'tools': {'scanner': 3}},  # even faster scanner
}


def main():
    player = Player()
    print("Welcome to Hacker Sim! Type 'help' for commands.")
    while True:
        cmd = input("\n> ").strip().lower()
        if cmd in {'quit', 'exit'}:
            print("Goodbye!")
            break
        elif cmd == 'help':
            print("Commands: scan, brute, sniff, social, status, help, quit")
        elif cmd == 'status':
            print(f"Level: {player.level} XP: {player.xp}")
            print(f"Skills: {', '.join(player.skills) or 'None'}")
            print(f"Tools: {player.tools}")
        elif cmd == 'scan':
            speed = player.tool_level('scanner')
            print(f"Scanning network (speed {speed})...")
            player.add_xp(20 * speed)
        elif cmd == 'brute':
            if player.has_skill('Brute Force'):
                lvl = player.tool_level('brute_force')
                print(f"Running brute force attack with tool level {lvl}...")
                player.add_xp(30 * lvl)
            else:
                print("You haven't unlocked Brute Force yet.")
        elif cmd == 'sniff':
            if player.has_skill('Packet Sniffing'):
                lvl = player.tool_level('sniffer')
                print(f"Sniffing packets with tool level {lvl}...")
                player.add_xp(25 * lvl)
            else:
                print("You haven't unlocked Packet Sniffing yet.")
        elif cmd == 'social':
            if player.has_skill('Social Engineering'):
                print("Performing social engineering...")
                player.add_xp(40)
            else:
                print("You haven't unlocked Social Engineering yet.")
        else:
            print("Unknown command. Type 'help' for options.")


if __name__ == '__main__':
    main()
