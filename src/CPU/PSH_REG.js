// Move Register into Register
export default function () {
  const regFromOffsetInRegisterMemory = this.getMem8BitAtIp();
  if (this.registerManager.mapRegister.length <= regFromOffsetInRegisterMemory) {
    throw `Register doesn't exist "${regFromOffsetInRegisterMemory}"`;
  }

  const valueRegister = this.registerManager.getValueByAddress(regFromOffsetInRegisterMemory);

  this.pushToStack( valueRegister );
}