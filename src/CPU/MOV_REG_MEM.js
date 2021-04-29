// Move Register into Register
export default function () {
  const regFromOffsetInRegisterMemory = this.getMem8BitAtIp();
  if (this.registerManager.mapRegister.length <= regFromOffsetInRegisterMemory) {
    throw `Register doesn't exist "${regFromOffsetInRegisterMemory}"`;
  }

  // const regFromValue = this.registerManager.listRegister.getUint8(regFromOffsetInRegisterMemory);
  const regFromValue = this.registerManager.getValueByAddress(regFromOffsetInRegisterMemory);

  const addressMemory = this.getMem16BitAtIp();
  if (this.memory.byteLength <= addressMemory) {
    throw `ERROR: CPU: Memory Address "${addressMemory}" doesn't exist.`;
  }

  this.memory.setUint16(addressMemory, regFromValue);
}