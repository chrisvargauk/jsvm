// Move Value from Register to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the negative direction
export default function () {
  // Fetch Register Address where store the Value
  const regFromAddress = this.getMem8BitAtIp();

  // Fetch the Stored Value under given Register
  const regFromValue = this.registerManager.getValueByAddress( regFromAddress );

  // Fetch Register Address where we store the Pointer
  const regToAddress = this.getMem8BitAtIp();

  // Fetch the Pointer from the Register where its stored
  const regToValue = this.registerManager.getValueByAddress( regToAddress );

  // Fetch the Number that the Pointer is Shifted by
  const shiftBy = this.getMem8BitAtIp();

  // Move the Register Value to Memory, to the Address what was stored as Pointer in another Register
  const valueInMemoryAtRegA = this.memory.setUint16( regToValue - shiftBy, regFromValue );
}