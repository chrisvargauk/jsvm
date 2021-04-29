// Move Literal to Memory, to the Address that is stored in another Register as a Pointer
export default function () {
  // Fetch 16 Bit Literal stored in Memory
  const literal = this.getMem16BitAtIp();

  // Fetch Register Address where we store the Pointer
  const regToAddress = this.getMem8BitAtIp();

  // Fetch the Pointer from the Register where its stored
  const regToValue = this.registerManager.getValueByAddress( regToAddress );

  // Move the Register Value to Memory, to the Address what was stored as Pointer in another Register
  const valueInMemoryAtRegA = this.memory.setUint16( regToValue, literal );
}