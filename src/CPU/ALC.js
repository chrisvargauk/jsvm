// Move Literal into Register
export default function () {
  const offsetInMemory = this.getMem16BitAtIp();
  const length = this.getMem16BitAtIp();
  for (let index = 0; index < length; index++) {
    const valueInMemory = this.getMem16BitAtIp();
    this.memory.setUint16(offsetInMemory + index, valueInMemory);
  }
}