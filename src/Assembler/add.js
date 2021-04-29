export default function( listPartInstruction, strInstruction ) {
  const attrA = this.parseAttr(listPartInstruction[1], strInstruction);
  const attrB = this.parseAttr(listPartInstruction[2], strInstruction);
  const nameInstruction = `ADD_${attrA.type}_${attrB.type}`;

  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );

  switch( attrA.type ) {
    case 'REG': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrA.valueA;
      break;
    }

    case 'LIT': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA / 256 );
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA % 256 );
      break;
    }

    default: {
      throw `ERROR: Parser: unknown type "${attrA.origin}" in instruction "${attrA.instruction}".`
    }
  }

  switch( attrB.type ) {
    case 'REG': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrB.valueA;
      break;
    }

    default: {
      throw `ERROR: Parser: unknown type "${attrB.type}" to be moved in instruction "${strInstruction}".`
    }
  }
}