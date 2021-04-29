// Move Literal into Register
export default function () {
  const literal       = this.getMem16BitAtIp();
  const addressMemory = this.getMem16BitAtIp();

  if (this.memory.byteLength <= addressMemory) {
    throw `ERROR: CPU: Memory Address "${addressMemory}" doesn't exist.`;
  }

  this.memory.setUint16(addressMemory, literal);
}