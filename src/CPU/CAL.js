// Move Literal into Register
export default function () {
  const addressMemorySubroutine = this.getMem16BitAtIp();
  this.pushAllRegisterToStack();

  this.registerManager.setValueByName('ip', addressMemorySubroutine);
}