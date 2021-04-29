export default function ( listPartInstruction, nameAbbreviation ) {
  const attr = this.parseAttr(listPartInstruction[1], nameAbbreviation);
  const nameInstruction = `PSH_${attr.type}`;

  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );

  switch( nameInstruction ) {
    case 'PSH_REG': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attr.valueA;
      break;
    }

    case 'PSH_LIT': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attr.valueA / 256 );
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attr.valueA % 256 );
      break;
    }

    default: {
      throw `ERROR: Parser: unknown type "${attrA.origin}" in instruction "${attrA.instruction}".`
    }
  }
}