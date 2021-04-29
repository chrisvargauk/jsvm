export default function ( listPartInstruction, nameAbbreviation ) {
  const attr = this.parseAttr(listPartInstruction[1], nameAbbreviation);
  const nameInstruction = `POP_${attr.type}`;

  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );

  switch( nameInstruction ) {
    case 'POP_REG': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attr.valueA;
      break;
    }

    default: {
      throw `ERROR: Parser: unknown type "${attrA.origin}" in instruction "${attrA.instruction}".`
    }
  }
}