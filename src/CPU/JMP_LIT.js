// Move Literal into Register
export default function () {
  const addressMemory = this.getMem16BitAtIp();

  if (this.memory.byteLength <= addressMemory) {
    throw `ERROR: CPU: Memory Address "${addressMemory}" doesn't exist.`;
  }

  this.registerManager.setValueByName('ip', addressMemory);
}