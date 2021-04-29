// Move Literal into Register
export default function () {
  const literal = this.getMem16BitAtIp();
  const regOffsetInRegisterMemory = this.getMem8BitAtIp();

  if (this.registerManager.mapRegister.length <= regOffsetInRegisterMemory) {
    throw `Register doesn't exist "${regOffsetInRegisterMemory}"`;
  }

  this.registerManager.listRegister.setUint16(regOffsetInRegisterMemory, literal);
}