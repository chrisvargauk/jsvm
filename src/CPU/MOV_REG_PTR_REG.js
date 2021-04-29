// Move Value from Memory, from the Address what we store as a Pointer in the defined Register, to another Register
export default function () {
  // Fetch Register Address where we store the Pointer
  const regFromAddress = this.getMem8BitAtIp();

  // Fetch the Pointer from the Register where its stored
  const regFromValue = this.registerManager.getValueByAddress( regFromAddress );

  // Fetch the Value stored in Memory at the given Pointer
  const valueInMemoryAtRegA = this.memory.getUint16( regFromValue );

  // Fetch Register Address where move the Value to
  const regToAddress = this.getMem8BitAtIp();

  // Move the Value to Register
  this.registerManager.setValueByAddress( regToAddress, valueInMemoryAtRegA );
}