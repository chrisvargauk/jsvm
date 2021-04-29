// Move Literal into Register
export default function () {
  const regOffsetInRegisterMemory = this.getMem8BitAtIp();
  if (this.registerManager.mapRegister.length <= regOffsetInRegisterMemory) {
    throw `Register doesn't exist "${regOffsetInRegisterMemory}"`;
  }

  const regValue = this.registerManager.getValueByAddress(regOffsetInRegisterMemory);

  if (this.memory.byteLength <= regValue) {
    throw `ERROR: CPU: Memory Address "${regValue}" doesn't exist.`;
  }

  this.registerManager.setValueByName('ip', regValue);
}