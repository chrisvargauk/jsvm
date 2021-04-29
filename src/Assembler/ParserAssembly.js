import configRegisterManager from "../registerManager.config"
import listObjInstruction from "../listObjInstruction";
import registerManager from "../registerManager";
import MOV_LIT_REG from './MOV_LIT_REG.js';
import MOV_REG_REG from './MOV_REG_REG.js';
import MOV_LIT_MEM from './MOV_LIT_MEM.js';
import MOV_REG_MEM from './MOV_REG_MEM.js';
import MOV_MEM_REG from './MOV_MEM_REG.js';
import MOV_REG_PTR_REG from './MOV_REG_PTR_REG.js';
import MOV_REG_PSP_REG from './MOV_REG_PSP_REG.js';
import MOV_REG_PSN_REG from './MOV_REG_PSN_REG.js';
import MOV_REG_REG_PTR from './MOV_REG_REG_PTR.js';
import MOV_REG_REG_PSP from './MOV_REG_REG_PSP.js';
import MOV_REG_REG_PSN from './MOV_REG_REG_PSN.js';
import MOV_LIT_REG_PTR from './MOV_LIT_REG_PTR.js';
import MOV_LIT_REG_PSP from './MOV_LIT_REG_PSP.js';
import MOV_LIT_REG_PSN from './MOV_LIT_REG_PSN.js';
import ADD_REG_REG from './ADD_REG_REG.js';
import ADD_LIT_REG from './ADD_LIT_REG.js';
import SUB_REG_REG from './SUB_REG_REG.js';
import MUL_REG_REG from './MUL_REG_REG.js';
import PSH_REG from './PSH_REG.js';
import PSH_LIT from './PSH_LIT.js';
import POP_REG from './POP_REG.js';
import JMP_LIT from './JMP_LIT.js';
import JMP_REG from './JMP_REG.js';
import JNE_REG_LIT from './JNE_REG_LIT.js';
import CAL from './CAL.js';
import RET from './RET.js';
import psh from './psh.js';
import pop from './pop.js';
import jmp from './jmp.js';
import mov from './mov.js';
import add from './add.js';
import sub from './sub.js';
import mul from './mul.js';
import main from'./main.js';
import end from './end.js';
import ALC from './ALC.js';

export default class ParserAssembly {
  constructor() {
    this.configRegisterManager  = configRegisterManager;
    this.listObjInstruction     = listObjInstruction;
    this.registerManager        = registerManager;

    this.setResetDefault();
  }

  setResetDefault() {
    this.listByteInMemory     = null;
    this.indexMemoryWriteTo   = 3; // note, the first 3 Bytes in memory is the Jump Instruction to Memory Address where the program start
    this.listObjNamedMemAddr  = {};
  }

  parse( strAssembly, memory ) {
    this.listByteInMemory = new Uint8Array(memory.buffer);

    const listStrInstruction = strAssembly.trim().split('\n');
    listStrInstruction.forEach(strInstruction => {
      // Throw if Out of Memory
      if (this.listByteInMemory.byteLength <= this.indexMemoryWriteTo) {
        throw `ERROR: Parser is out of memory. Current Memory size is ${this.listByteInMemory.byteLength} Bytes`;
      }

      // Filter off indentation
      strInstruction = strInstruction.trim();

      // Filter off comments ";; some comments comes here.."
      strInstruction = strInstruction.split(';;')[0];

      // Filter off empty lines
      // Note: its important that filter runs after filtering off indentation
      if (strInstruction === '') return;

      let str;
      if ( strInstruction.indexOf("'") !== -1 ) {
        const parts = strInstruction.split("'");
        str = parts[1];
        strInstruction = `${parts[0]}"${parts[2]}`;
      }

      // Split the Assembly Line String by "Space"
      // Note: there are two spaces char-code 32 and char-code 160
      let listPartInstruction;
      if (strInstruction.indexOf(String.fromCharCode(32)) !== -1) {
        listPartInstruction = strInstruction.split(String.fromCharCode(32));
      } else if (strInstruction.indexOf(String.fromCharCode(160)) !== -1) {
        listPartInstruction = strInstruction.split(String.fromCharCode(160));
      } else {
        listPartInstruction = [strInstruction];
      }

      const nameAbbreviation = listPartInstruction[0].trim();

      // Collect Subroutine names and the corresponding Memory Address
      if (nameAbbreviation.indexOf(':') !== -1 &&
          nameAbbreviation !== 'main:'
      ) {
        // my_subroutine:
        this.listObjNamedMemAddr[ nameAbbreviation ] = this.indexMemoryWriteTo;
        return;
      }

      switch ( nameAbbreviation ) {
        case 'MOV_LIT_REG': { MOV_LIT_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_REG_REG': { MOV_REG_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_LIT_MEM': { MOV_LIT_MEM.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_REG_MEM': { MOV_REG_MEM.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_MEM_REG': { MOV_MEM_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_REG_PTR_REG': { MOV_REG_PTR_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_REG_PSP_REG': { MOV_REG_PSP_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_REG_PSN_REG': { MOV_REG_PSN_REG.call( this, listPartInstruction, nameAbbreviation ); break; }

        case 'MOV_REG_REG_PTR': { MOV_REG_REG_PTR.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_REG_REG_PSP': { MOV_REG_REG_PSP.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_REG_REG_PSN': { MOV_REG_REG_PSN.call( this, listPartInstruction, nameAbbreviation ); break; }

        case 'MOV_LIT_REG_PTR': { MOV_LIT_REG_PTR.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_LIT_REG_PSP': { MOV_LIT_REG_PSP.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MOV_LIT_REG_PSN': { MOV_LIT_REG_PSN.call( this, listPartInstruction, nameAbbreviation ); break; }

        case 'ADD_REG_REG': { ADD_REG_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'ADD_LIT_REG': { ADD_LIT_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'SUB_REG_REG': { SUB_REG_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'MUL_REG_REG': { MUL_REG_REG.call( this, listPartInstruction, nameAbbreviation ); break; }

        case 'PSH_REG':     { PSH_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'PSH_LIT':     { PSH_LIT.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'POP_REG':     { POP_REG.call( this, listPartInstruction, nameAbbreviation ); break; }

        case 'JMP_LIT':     { JMP_LIT.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'JMP_REG':     { JMP_REG.call( this, listPartInstruction, nameAbbreviation ); break; }
        case 'JNE_REG_LIT': { JNE_REG_LIT.call( this, listPartInstruction, nameAbbreviation ); break; }

        case 'cal':         { CAL.call( this, listPartInstruction, nameAbbreviation, strInstruction ); break; }

        case 'RET':         { RET.call( this ); break; }
        case 'ret':         { RET.call( this ); break; }

        case 'psh':         { psh.call( this, listPartInstruction, strInstruction ); break; }
        case 'pop':         { pop.call( this, listPartInstruction, strInstruction ); break; }

        case 'jmp':         { jmp.call( this, listPartInstruction, strInstruction ); break; }
        case 'mov':         { mov.call( this, listPartInstruction, strInstruction ); break; }
        case 'add':         { add.call( this, listPartInstruction, strInstruction ); break; }
        case 'sub':         { sub.call( this, listPartInstruction, strInstruction ); break; }
        case 'mul':         { mul.call( this, listPartInstruction, strInstruction ); break; }
        case 'main:':       { main.call( this ); break; }
        case 'END':         { end.call( this, listObjInstruction ); break; }
        case 'end':         { end.call( this, listObjInstruction ); break; }
        case 'alc':         { ALC.call( this, listPartInstruction, strInstruction, str ); break; }

        default: {
          throw `ERROR: Parser: unknown statement "${strInstruction}".`;
        }
      }

      return;

      if (nameAbbreviation === 'MOV_LIT_REG') {


      } else if (nameAbbreviation === 'MOV_REG_REG') {


      // } else if (nameAbbreviation === 'MOV_REG_MEM') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[1]];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(listPartInstruction[2]);
      //
      // } else if (nameAbbreviation === 'MOV_MEM_REG') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(listPartInstruction[1]);
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[2]];
      //
      // } else if (nameAbbreviation === 'ADD_REG_REG') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[1]];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[2]];
      //
      // } else if (nameAbbreviation === 'MUL_REG_REG') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[1]];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[2]];
      //
      // } else if (nameAbbreviation === 'JNE_REG_LIT') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[1]];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(listPartInstruction[2]);
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(listPartInstruction[3]);

      // } else if (nameAbbreviation === 'PHS_LIT') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(listPartInstruction[1]);

      // } else if (nameAbbreviation === 'PHS_REG') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[1]];
      //
      // } else if (nameAbbreviation === 'POP') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[1]];

      // } else if (nameAbbreviation === 'END') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );

      // } else if (nameAbbreviation === 'CAL_LIT') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(listPartInstruction[1]);
      //
      // } else if (nameAbbreviation === 'CAL_REG') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.registerManager.mapRegister[listPartInstruction[1]];

      // This exists only in the parser not implemented on the CPU
      // } else if (nameAbbreviation === 'SET_MEM_PTR') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
      //   this.indexMemoryWriteTo = parseInt(listPartInstruction[1]);

      // } else if (nameAbbreviation === 'RET') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );

      // } else if (nameAbbreviation === 'mov') {
        // const attrA = this.parseAttr(listPartInstruction[1], strInstruction);
        // const attrB = this.parseAttr(listPartInstruction[2], strInstruction);
        // const nameInstruction = `MOV_${attrA.type}_${attrB.type}`;
        //
        // this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( nameInstruction );
        // this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrA.valueA;
        //
        // if( typeof attrA.valueB !== 'undefined' ) {
        //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrA.valueB;
        // }
        //
        // this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrB.valueA;
        //
        // if( typeof attrB.valueB !== 'undefined' ) {
        //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrB.valueB;
        // }

      // } else if (nameAbbreviation === 'phs') {
      //   const attr = this.parseAttr(listPartInstruction[1], strInstruction);
      //   const nameInstruction = `PHS_${attr.type}`;
      //
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction[ nameInstruction ];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attr.valueA;
      //
      //   if( typeof attr.valueB !== 'undefined' ) {
      //     this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attr.valueB;
      //   }

      // End of Program
      } else if (nameAbbreviation === 'end') {
        this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction[ 'END' ];

      // Return from Subroutine
      } else if (nameAbbreviation === 'ret') {
        this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction[ 'RET' ];

      // my_subroutine:
      } else if (nameAbbreviation.indexOf(':') !== -1 &&
                 nameAbbreviation !== 'main:'
      ) {
        // my_subroutine:
        this.listObjNamedMemAddr[ nameAbbreviation ] = this.indexMemoryWriteTo;

      } else if (nameAbbreviation === 'var') {
        // var my_var
        const nameVar = listPartInstruction[1];
        this.listObjNamedMemAddr[ nameVar ] = this.indexMemoryWriteTo++;

      // } else if (nameAbbreviation === 'cal') {
      //   // Push Attributes to the Stack if any
      //   if ( 1 < listPartInstruction.length ) {
      //     for (let indexListPartInstruction = 2; indexListPartInstruction < listPartInstruction.length; indexListPartInstruction++) {
      //       const partInstruction = listPartInstruction[ indexListPartInstruction ];
      //       const attr = this.parseAttr( partInstruction, strInstruction );
      //       const nameInstruction = `PHS_${attr.type}`;
      //
      //       this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction[ nameInstruction ];
      //       this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attr.valueA;
      //     }
      //
      //     const nameInstruction = `PHS_LIT`;
      //     this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction[ nameInstruction ];
      //     this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listPartInstruction.length - 2;
      //   }
      //
      //   const addrSubroutine = this.listObjNamedMemAddr[ listPartInstruction[1] ];
      //   if ( typeof addrSubroutine === 'undefined' ) {
      //     let messageError  = `Error: Parsing Error: Subroutine "${listPartInstruction[1]}" is undefined.`;
      //     messageError     += ` Please make sure that "${listPartInstruction[1]}" is defined before "main:".`;
      //     messageError     += ` List of Subroutines defined as of calling "${listPartInstruction[1]}": ["${Object.keys(this.listObjNamedMemAddr).join('", "')}"].`;
      //     throw messageError;
      //   }
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction['CAL_LIT'];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = addrSubroutine;
      //
      //   // call my_subroutine: 0x01 $r1;

      // Address of Memory where the program starts
      // Write the Memory Address of the give line to the very first byte in the Memory
      // } else if (nameAbbreviation === 'main:') {
      //   this.listByteInMemory[0] = this.indexMemoryWriteTo;

      // } else if (nameAbbreviation === 'jne') {
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction['JNE_REG_LIT'];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.parseAttr( listPartInstruction[1], strInstruction ).valueA;
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.parseAttr( listPartInstruction[2], strInstruction ).valueA;
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.parseAttr( listPartInstruction[3], strInstruction ).valueA;

      // } else if (nameAbbreviation === 'add') {
      //   const attrA = this.parseAttr(listPartInstruction[1], strInstruction);
      //   const attrB = this.parseAttr(listPartInstruction[2], strInstruction);
      //   const nameInstruction = `ADD_${attrA.type}_${attrB.type}`;
      //
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction[ nameInstruction ];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrA.valueA;
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrB.valueA;
      //
      // } else if (nameAbbreviation === 'mul') {
      //   const attrA = this.parseAttr(listPartInstruction[1], strInstruction);
      //   const attrB = this.parseAttr(listPartInstruction[2], strInstruction);
      //   const nameInstruction = `MUL_${attrA.type}_${attrB.type}`;
      //
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction[ nameInstruction ];
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrA.valueA;
      //   this.listByteInMemory[ this.indexMemoryWriteTo++ ] = attrB.valueA;

        // alc 0x6f 'Hello world!' => alc 0x6f " => ['alc', '0x6f', '"']
      } else if (nameAbbreviation === 'alc') {
        this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction['ALC'];
        const addressMemory = this.parseAttr(listPartInstruction[1], strInstruction);
        this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt( addressMemory.valueA );
        this.listByteInMemory[ this.indexMemoryWriteTo++ ] = str.length;

        for (let indexStr = 0; indexStr < str.length; indexStr++) {
          const char = str[indexStr];
          this.listByteInMemory[ this.indexMemoryWriteTo++ ] = char.charCodeAt(0);
        }

      } else {
        this.listByteInMemory[ this.indexMemoryWriteTo++ ] = parseInt(listPartInstruction[0]);
      }
    });

    const listByteInMemory = this.listByteInMemory;

    this.setResetDefault();

    return listByteInMemory;
  }

  getInstructionCode( nameInstruction ) {
    const codeInstruction = listObjInstruction[ nameInstruction ];

    if (typeof codeInstruction === 'undefined' ) {
      throw `ERROR: Parser: Unknown Instruction name "${nameInstruction}".`;
    }

    return codeInstruction;
  }

  parseAttr( strAttrib, strInstruction ) {
    let namePartInstruction, movWhat, valueAttribA, valueAttribB;

    // Attribute is a Literal
    if (strAttrib[0] === '0') {
      namePartInstruction = 'LIT';
      movWhat             = strAttrib;
      valueAttribA         = parseInt( movWhat );

    // Attribute is a Register
    } else if (strAttrib[0] === '$') {
      namePartInstruction = 'REG';
      movWhat             = strAttrib.split('$').join('');
      valueAttribA         = this.registerManager.mapRegister[ movWhat ];

    // Attribute is a Memory Address
    } else if (strAttrib[0] === '&') {
      namePartInstruction = 'MEM';
      movWhat             = strAttrib.split('&').join('');

      // Potential mistake to make: &000f instead of &0x000f
      if (movWhat[0] === '0' && movWhat[1] !== 'x') {
        throw `ERROR: Parser: syntax error in "${strInstruction}" with attribute "${strAttrib}". It looks like you wanted to use hexadecimal number, but you made a mistake with the syntax.`;
      }
      valueAttribA         = parseInt( movWhat );

    // Attribute is a Registers Value
    // E.g.: ($sp), 8($fp)
    } else if ( strAttrib.indexOf('(') !== -1 ) {
      const isPtrShifted = strAttrib.split('(')[0] !== '';

      // If Register in the Attribute is NOT shifted by a certain value
      if (!isPtrShifted) {
        namePartInstruction = 'REG_PTR';
        const nameRegister  = strAttrib.split('($').join('').split(')').join('');
        valueAttribA   = this.registerManager.mapRegister[ nameRegister ];

      // If Register in the Attribute is shifted by a certain value
      } else {
        const listPartAttrib = strAttrib.split('($');
        const shiftedBy = parseInt(listPartAttrib[0]);

        if (0 < shiftedBy) {
          namePartInstruction = 'REG_PSP';

        } else {
          namePartInstruction = 'REG_PSN';
        }

        valueAttribB = Math.abs(shiftedBy);
        const nameRegister  = listPartAttrib[1].split(')').join('');
        valueAttribA = this.registerManager.mapRegister[ nameRegister ];
      }

    } else if (typeof this.listObjNamedMemAddr[ strAttrib ] !== 'undefined') {
      namePartInstruction = 'SUBROUTINE_OR_VAR';
      valueAttribA         = this.listObjNamedMemAddr[ strAttrib ];

    // } else {
    //   throw `Error: Parsing Error: Unexpected syntax in "${strInstruction}". Expected 0,$,& but got '${strAttrib[0]}'`;
    }

    return {
      type:  namePartInstruction,
      valueA: valueAttribA,
      valueB: valueAttribB,
      origin: strAttrib,
      instruction: strInstruction
    }
  }
}