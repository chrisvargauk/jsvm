// Move Literal into Register
export default function () {
  const addressMemory = this.getMem16BitAtIp();
  const valueAtAddressMemory = this.memory.getUint16( addressMemory );

  const regOffsetInRegisterMemory = this.getMem8BitAtIp();
  if (this.registerManager.mapRegister.length <= regOffsetInRegisterMemory) {
    throw `Register doesn't exist "${regOffsetInRegisterMemory}"`;
  }

  this.registerManager.setValueByAddress( regOffsetInRegisterMemory, valueAtAddressMemory );
}