export async function getNpcResponse(message) {
  // Basic logic tree acting as an AI adversary placeholder
  const lower = message.toLowerCase();
  if (lower.includes('hello')) {
    return 'NPC: Greetings, hacker.';
  }
  if (lower.includes('threat')) {
    return 'NPC: You should watch your back.';
  }
  return 'NPC: ...';
}
