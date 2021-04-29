// Move Literal to Memory, to the Address that is stored in another Register as a Pointer
export default function ( listPartInstruction, nameAbbreviation ) {
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameAbbreviation );

  // 16 Bit Literal moved into Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[1]) / 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[1]) % 256);

  // 8 Bit Register Address moved into Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.getAddressByName( listPartInstruction[2] );
}