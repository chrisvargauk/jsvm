export default function ( listPartInstruction, nameAbbreviation ) {
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameAbbreviation );
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[1]) / 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(listPartInstruction[1]) % 256);

  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.getAddressByName( listPartInstruction[2] );
}