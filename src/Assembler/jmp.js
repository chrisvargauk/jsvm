export default function( listPartInstruction, strInstruction ) {
  const attrA = this.parseAttr(listPartInstruction[1], strInstruction);
  const nameInstruction = `JMP_${attrA.type}`;

  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );

  switch( attrA.type ) {
    case 'LIT': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA / 256 );
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA % 256 );
      break;
    }

    case 'REG': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrA.valueA;
      break;
    }

    default: {
      throw `ERROR: Parser: unknown type "${attrA.type}" in instruction "${strInstruction}".`
    }
  }
}