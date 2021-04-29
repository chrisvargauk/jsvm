export default function () {
  const registerOffsetInRegisterMemory = this.getMem8BitAtIp();
  const valueInStackPopped = this.popFromStack();

  this.registerManager.setValueByAddress( registerOffsetInRegisterMemory, valueInStackPopped );
}