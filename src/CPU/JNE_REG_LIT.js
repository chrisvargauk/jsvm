// Move Register into Register
export default function () {
  const regAddressMemory = this.getMem8BitAtIp();
  const regValue = this.registerManager.getValueByAddress(regAddressMemory);

  const literal = this.getMem16BitAtIp();

  const addressMemoryJumpTo = this.getMem16BitAtIp();

  if ( regValue !== literal ) {
    this.registerManager.setValueByName('ip', addressMemoryJumpTo);
  }
}