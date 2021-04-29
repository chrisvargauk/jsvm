export default function( listPartInstruction, strInstruction ) {
  const attrA = this.parseAttr(listPartInstruction[1], strInstruction);
  const attrB = this.parseAttr(listPartInstruction[2], strInstruction);
  const nameInstruction = `MOV_${attrA.type}_${attrB.type}`;

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

    case 'MEM': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA / 256 );
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA % 256 );
      break;
    }

    case 'REG_PTR': {
      // 8 Bit Register Address moved into Memory
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA );
      break;
    }

    case 'REG_PSP': {
      // 8 Bit Register Address moved into Memory
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA );

      // 8 Bit Value the Register Address is Shifted by
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueB );
      break;
    }

    case 'REG_PSN': {
      // 8 Bit Register Address moved into Memory
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueA );

      // 8 Bit Value the Register Address is Shifted by
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrA.valueB );
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

    case 'MEM': {
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(attrB.valueA) / 256);
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(attrB.valueA) % 256);
      break;
    }

    case 'REG_PTR': {
      // 8 Bit Register Address moved into Memory
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrB.valueA );
      break;
    }

    case 'REG_PSP': {
      // 8 Bit Register Address moved into Memory
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrB.valueA );

      // 8 Bit Value the Register Address is Shifted by
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrB.valueB );
      break;
    }

    case 'REG_PSN': {
      // 8 Bit Register Address moved into Memory
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrB.valueA );

      // 8 Bit Value the Register Address is Shifted by
      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( attrB.valueB );
      break;
    }

    default: {
      throw `ERROR: Parser: unknown type "${attrB.type}" to be moved in instruction "${strInstruction}".`
    }
  }
}