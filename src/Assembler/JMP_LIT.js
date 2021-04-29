export default function(listPartInstruction, nameAbbreviation) {
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameAbbreviation );

  // 16 Bit Literal moved into Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[1]) / 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[1]) % 256);
}