import listObjInstruction from "../listObjInstruction";

export default function( listPartInstruction, strInstruction, str ) {
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( 'ALC' );
  const addressMemory = this.parseAttr(listPartInstruction[1], strInstruction);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(addressMemory.valueA) / 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(addressMemory.valueA) % 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(str.length / 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(str.length % 256);

  for (let indexStr = 0; indexStr < str.length; indexStr++) {
    const char = str[indexStr];
    this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(char.charCodeAt(0) / 256);
    this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(char.charCodeAt(0) % 256);
  }
}