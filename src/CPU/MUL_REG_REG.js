// Move Register into Register
export default function () {
  const regFirstOffsetInRegisterMemory = this.getMem8BitAtIp();
  const regFirstValue = this.registerManager.getValueByAddress(regFirstOffsetInRegisterMemory);

  const regSecondOffsetInRegisterMemory = this.getMem8BitAtIp();
  const regSecondValue = this.registerManager.getValueByAddress(regSecondOffsetInRegisterMemory);

  this.registerManager.setValueByName( 'acc', regFirstValue * regSecondValue );
}