// Move Register into Register
export default function () {
  const literal = this.getMem16BitAtIp();

  const regSecondOffsetInRegisterMemory = this.getMem8BitAtIp();
  const regSecondValue = this.registerManager.getValueByAddress(regSecondOffsetInRegisterMemory);

  this.registerManager.setValueByName( 'acc', literal + regSecondValue );
}