export default function () {
  // Fetch Register Address where we store the Pointer
  const regFromAddress = this.getMem8BitAtIp();

  // Fetch the Pointer from the Register where its stored
  const regFromValue = this.registerManager.getValueByAddress( regFromAddress );

  // Fetch the Number that the Pointer is Shifted by
  const shiftBy = this.getMem8BitAtIp();

  // Fetch the Value stored in Memory at the given Pointer that is Shifted By a given Number to the negative direction
  const valueInMemoryAtRegA = this.memory.getUint16( regFromValue - shiftBy * 2 );

  // Fetch Register Address where move the Value to
  const regToAddress = this.getMem8BitAtIp();

  // Move the Value to Register
  this.registerManager.setValueByAddress( regToAddress, valueInMemoryAtRegA );
}
