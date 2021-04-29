import listObjInstruction from "../listObjInstruction";

export default function(listPartInstruction, nameAbbreviation, strInstruction) {
  // Push Attributes to the Stack if any
  if ( 1 < listPartInstruction.length ) {
    for (let indexListPartInstruction = 2; indexListPartInstruction < listPartInstruction.length; indexListPartInstruction++) {
      const partInstruction = listPartInstruction[ indexListPartInstruction ];
      const attr = this.parseAttr( partInstruction, strInstruction );
      const nameInstruction = `PSH_${attr.type}`;

      this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );

      switch( nameInstruction ) {
        case 'PSH_LIT': {
          // 16 Bit Literal moved into Memory
          this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(attr.valueA) / 256);
          this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt(attr.valueA) % 256);

          break;
        }

        case 'PSH_REG': {
          // 8 Bit Register Address moved into Memory
          this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attr.valueA;

          break;
        }

        default: {
          throw `ERROR: Parser: unknown Instruction "${nameInstruction}" in Statement "${strInstruction}".`;
        }
      }
    }

    const nameInstruction = `PSH_LIT`;
    this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );

    // Push the number of Attributes (passed in to the Subroutine) onto the Stack
    // Note: the number of extra Attributes on the Stack is important to know when we Return from the Subroutine,
    //       to restore the state we have left
    const noAttrib = listPartInstruction.length - 2;
    this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt( noAttrib ) / 256);
    this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt( noAttrib ) % 256);
  }

  // Get the Memory Address where the given Subroutine starts
  const addrSubroutine = this.listObjNamedMemAddr[ listPartInstruction[1] ];
  if ( typeof addrSubroutine === 'undefined' ) {
    let messageError  = `Error: Parsing Error: Subroutine "${listPartInstruction[1]}" is undefined.`;
    messageError     += ` Please make sure that "${listPartInstruction[1]}" is defined before "main:".`;
    messageError     += ` List of Subroutines defined as of calling "${listPartInstruction[1]}": ["${Object.keys(this.listObjNamedMemAddr).join('", "')}"].`;
    throw messageError;
  }

  // Add "CAL" Instruction Code to the Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( 'CAL' );

  // Add the Memory Address where the given Subroutine starts to the Memory
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt( addrSubroutine ) / 256);
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(parseInt( addrSubroutine ) % 256);

  // cal my_subroutine: 0x01 $r1;
}