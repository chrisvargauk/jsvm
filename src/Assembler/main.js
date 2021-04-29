export default function() {
  this.listByteInMemory[ 0 ] = this.getInstructionCode('JMP_LIT');

  // 16 Bit Memory Address moved into Memory
  this.listByteInMemory[ 1 ] = parseInt(parseInt(this.indexMemoryWriteTo) / 256);
  this.listByteInMemory[ 2 ] = parseInt(parseInt(this.indexMemoryWriteTo) % 256);
}