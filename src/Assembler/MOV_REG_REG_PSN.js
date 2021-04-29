// Move Value from Register to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the negative direction
export default function ( listPartInstruction, nameAbbreviation ) {
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameAbbreviation );

  // 8 Bit Register Address moved into Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.getAddressByName( listPartInstruction[1] );

  // 8 Bit Register Address moved into Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.getAddressByName( listPartInstruction[2] );

  // 8 Bit Value the Register Address is Shifted by
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( listPartInstruction[3] );
}