export default function(listPartInstruction, nameAbbreviation) {
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameAbbreviation );

  // 8 Bit Register Address moved into Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.getAddressByName( listPartInstruction[1] );

  // 16 Bit Literal moved into Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[2]) / 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[2]) % 256);

  // 16 Bit Literal moved into Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[3]) / 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[3]) % 256);
}