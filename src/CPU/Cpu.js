import registerManager from '../registerManager';
import listObjInstruction from '../listObjInstruction';
import MOV_LIT_REG      from './MOV_LIT_REG.js';
import MOV_REG_REG      from './MOV_REG_REG.js';
import MOV_LIT_MEM      from './MOV_LIT_MEM.js';
import MOV_REG_MEM      from './MOV_REG_MEM.js';
import MOV_MEM_REG      from './MOV_MEM_REG.js';
import MOV_REG_PTR_REG  from './MOV_REG_PTR_REG.js';
import MOV_REG_PSP_REG  from './MOV_REG_PSP_REG.js';
import MOV_REG_PSN_REG  from './MOV_REG_PSN_REG.js';
import MOV_REG_REG_PTR  from './MOV_REG_REG_PTR.js';
import MOV_REG_REG_PSP  from './MOV_REG_REG_PSP.js';
import MOV_REG_REG_PSN  from './MOV_REG_REG_PSN.js';
import MOV_LIT_REG_PTR  from './MOV_LIT_REG_PTR.js';
import MOV_LIT_REG_PSP  from './MOV_LIT_REG_PSP.js';
import MOV_LIT_REG_PSN  from './MOV_LIT_REG_PSN.js';
import ADD_REG_REG      from './ADD_REG_REG.js';
import ADD_LIT_REG      from './ADD_LIT_REG.js';
import SUB_REG_REG      from './SUB_REG_REG.js';
import MUL_REG_REG      from './MUL_REG_REG.js';
import PSH_REG          from './PSH_REG.js';
import POP_REG          from './POP_REG.js';
import PSH_LIT          from './PSH_LIT.js';
import JMP_LIT          from './JMP_LIT.js';
import JMP_REG          from './JMP_REG.js';
import JNE_REG_LIT      from './JNE_REG_LIT.js';
import CAL              from './CAL.js';
import RET              from './RET.js';
import ALC              from './ALC.js';

class Cpu {
  constructor( {memory, addressSp} ) {
    this.memory     = memory;
    this.addressSpAtProgramStart = addressSp;
    this.listByteInMemory = new Uint8Array(this.memory.buffer);
    this.registerManager = registerManager;

    this.setReset();
  }

  setReset( addressSp ) {
    this.isRunning = false;
    this.sizeStackFrame = 0;

    this.registerManager.resetDefault();
    this.registerManager.setValueByName('fp', this.addressSpAtProgramStart);
    this.registerManager.setValueByName('sp', this.addressSpAtProgramStart);
  }

  getMem8BitAtIp() {
    const addressInMemoryInstruction = this.registerManager.getValueByName('ip');
    const instruction = this.memory.getUint8(addressInMemoryInstruction);
    this.registerManager.setValueByName('ip', addressInMemoryInstruction + 1);
    return instruction;
  }

  getMem16BitAtIp() {
    const addressInMemoryInstruction = this.registerManager.getValueByName('ip');
    const instruction = this.memory.getUint16(addressInMemoryInstruction);
    this.registerManager.setValueByName('ip', addressInMemoryInstruction + 2);
    return instruction;
  }

  pushToStack( value ) {
    const addressInMemoryStackPointer = this.registerManager.getValueByName('sp');
    this.memory.setUint16(addressInMemoryStackPointer, value );
    this.registerManager.setValueByName('sp', addressInMemoryStackPointer - 2);
    this.sizeStackFrame++;
  }

  popFromStack() {
    const addressInMemoryStackPointer = this.registerManager.getValueByName('sp');
    this.registerManager.setValueByName('sp', addressInMemoryStackPointer + 2);
    const valueInStackPopped = this.memory.getUint16(addressInMemoryStackPointer + 2);
    this.sizeStackFrame -= 2;

    return valueInStackPopped;
  }

  pushAllRegisterToStack() {
    this.pushToStack( this.registerManager.getValueByName('r1'));
    this.pushToStack( this.registerManager.getValueByName('r2'));
    this.pushToStack( this.registerManager.getValueByName('ip'));
    this.pushToStack( ++this.sizeStackFrame);

    this.registerManager.setValueByName('fp', this.registerManager.getValueByName('sp'));
    this.sizeStackFrame = 0;
  }

  popAllRegisterFromStack() {
    const addressInMemoryFramePointer = this.registerManager.getValueByName('fp');
    this.registerManager.setValueByName('sp', addressInMemoryFramePointer);

    const sizeStackFrame = this.popFromStack();
    this.sizeStackFrame = sizeStackFrame;

    this.registerManager.setValueByName('ip', this.popFromStack());
    this.registerManager.setValueByName('r2', this.popFromStack());
    this.registerManager.setValueByName('r1', this.popFromStack());

    const noArg = this.popFromStack();

    for (let i = 0; i < noArg; i++) {
      this.popFromStack();
    }

    this.registerManager.setValueByName('fp', addressInMemoryFramePointer + sizeStackFrame * 2);
  }

  executeInstruction( instruction ) {
    this.isRunning = true;

    switch (instruction) {
      // Move Literal into Register
      case listObjInstruction.MOV_LIT_REG: { MOV_LIT_REG.call( this ); break; }
      // Move Literal to Memory
      case listObjInstruction.MOV_LIT_MEM: { MOV_LIT_MEM.call( this ); break; }
      // Move Register to Register
      case listObjInstruction.MOV_REG_REG: { MOV_REG_REG.call( this ); break; }
      // Move Register to Memory
      case listObjInstruction.MOV_REG_MEM: { MOV_REG_MEM.call( this ); break; }
      // Move Memory to Register
      case listObjInstruction.MOV_MEM_REG: { MOV_MEM_REG.call( this ); break; }

      case listObjInstruction.MOV_REG_PTR_REG: { MOV_REG_PTR_REG.call( this ); break; }
      case listObjInstruction.MOV_REG_PSP_REG: { MOV_REG_PSP_REG.call( this ); break; }
      case listObjInstruction.MOV_REG_PSN_REG: { MOV_REG_PSN_REG.call( this ); break; }

      case listObjInstruction.MOV_REG_REG_PTR: { MOV_REG_REG_PTR.call( this ); break; }
      case listObjInstruction.MOV_REG_REG_PSP: { MOV_REG_REG_PSP.call( this ); break; }
      case listObjInstruction.MOV_REG_REG_PSN: { MOV_REG_REG_PSN.call( this ); break; }

      case listObjInstruction.MOV_LIT_REG_PTR: { MOV_LIT_REG_PTR.call( this ); break; }
      case listObjInstruction.MOV_LIT_REG_PSP: { MOV_LIT_REG_PSP.call( this ); break; }
      case listObjInstruction.MOV_LIT_REG_PSN: { MOV_LIT_REG_PSN.call( this ); break; }

      case listObjInstruction.ADD_REG_REG: { ADD_REG_REG.call( this ); break; }
      case listObjInstruction.ADD_LIT_REG: { ADD_LIT_REG.call( this ); break; }
      case listObjInstruction.SUB_REG_REG: { SUB_REG_REG.call( this ); break; }
      case listObjInstruction.MUL_REG_REG: { MUL_REG_REG.call( this ); break; }

      case listObjInstruction.PSH_REG: { PSH_REG.call( this ); break; }
      case listObjInstruction.PSH_LIT: { PSH_LIT.call( this ); break; }
      case listObjInstruction.POP_REG: { POP_REG.call( this ); break; }

      // Jump to Memory Address
      case listObjInstruction.JMP_LIT:      { JMP_LIT.call( this ); break; }
      // Jump to Memory Address
      case listObjInstruction.JMP_REG:      { JMP_REG.call( this ); break; }
      case listObjInstruction.JNE_REG_LIT:  { JNE_REG_LIT.call( this ); break; }

      case listObjInstruction.CAL: { CAL.call( this ); break; }
      case listObjInstruction.RET: { RET.call( this ); break; }
      case listObjInstruction.ALC: { ALC.call( this ); break; }

      // case listObjInstruction.MOV_REG_PTR_REG: {
      //   const rAoffsetInMemory = this.getMem8BitAtIp();
      //   const rBoffsetInMemory = this.getMem8BitAtIp();
      //   const rAvalueInMemory = this.registerManager.listRegister.getUint8(rAoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   const valueInMemory = this.memory.getUint8(rAvalueInMemory);
      //   this.registerManager.listRegister.setUint8(rBoffsetInMemory, valueInMemory);
      //   break;
      // }

      // case listObjInstruction.MOV_REG_PSN_REG: {
      //   const rAoffsetInMemory  = this.getMem8BitAtIp();
      //   const shiftBy           = this.getMem8BitAtIp();
      //   const rBoffsetInMemory  = this.getMem8BitAtIp();
      //   const rAvalueInMemory   =this.registerManager.listRegister.getUint8(rAoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   const valueInMemory = this.memory.getUint8(rAvalueInMemory - shiftBy);
      //   this.registerManager.listRegister.setUint8(rBoffsetInMemory, valueInMemory);
      //   break;
      // }

      // case listObjInstruction.MOV_REG_REG_PTR: {
      //   const rAoffsetInMemory = this.getMem8BitAtIp();
      //   const rBoffsetInMemory = this.getMem8BitAtIp();
      //   const rAvalueInMemory = this.registerManager.listRegister.getUint8(rAoffsetInMemory);
      //   const rBvalueInMemory = this.registerManager.listRegister.getUint8(rBoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   this.memory.setUint8(rBvalueInMemory, rAvalueInMemory);
      //   break;
      // }

      // case listObjInstruction.MOV_REG_REG_PSP: {
      //   const rAoffsetInMemory = this.getMem8BitAtIp();
      //   const rBoffsetInMemory = this.getMem8BitAtIp();
      //   const shiftBy           = this.getMem8BitAtIp();
      //   const rAvalueInMemory = this.registerManager.listRegister.getUint8(rAoffsetInMemory);
      //   const rBvalueInMemory = this.registerManager.listRegister.getUint8(rBoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   this.memory.setUint8(rBvalueInMemory + shiftBy, rAvalueInMemory);
      //   break;
      // }

      // case listObjInstruction.MOV_REG_REG_PSN: {
      //   const rAoffsetInMemory = this.getMem8BitAtIp();
      //   const rBoffsetInMemory = this.getMem8BitAtIp();
      //   const shiftBy           = this.getMem8BitAtIp();
      //   const rAvalueInMemory = this.registerManager.listRegister.getUint8(rAoffsetInMemory);
      //   const rBvalueInMemory = this.registerManager.listRegister.getUint8(rBoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   this.memory.setUint8(rBvalueInMemory - shiftBy, rAvalueInMemory);
      //   break;
      // }

      // case listObjInstruction.MOV_LIT_REG_PTR: {
      //   const literal = this.getMem8BitAtIp();
      //   const rBoffsetInMemory = this.getMem8BitAtIp();
      //   const rBvalueInMemory = this.registerManager.listRegister.getUint8(rBoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   this.memory.setUint8(rBvalueInMemory, literal);
      //   break;
      // }

      // case listObjInstruction.MOV_LIT_REG_PSP: {
      //   const literal = this.getMem8BitAtIp();
      //   const rBoffsetInMemory = this.getMem8BitAtIp();
      //   const shiftBy           = this.getMem8BitAtIp();
      //   const rBvalueInMemory = this.registerManager.listRegister.getUint8(rBoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   this.memory.setUint8(rBvalueInMemory + shiftBy, literal);
      //   break;
      // }

      // case listObjInstruction.MOV_LIT_REG_PSN: {
      //   const literal = this.getMem8BitAtIp();
      //   const rBoffsetInMemory = this.getMem8BitAtIp();
      //   const shiftBy           = this.getMem8BitAtIp();
      //   const rBvalueInMemory = this.registerManager.listRegister.getUint8(rBoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   this.memory.setUint8(rBvalueInMemory - shiftBy, literal);
      //   break;
      // }

      // // Add Register to Register and put value to 'acc'
      // case listObjInstruction.ADD_LIT_REG: {
      //   const valueLiteral = this.getMem8BitAtIp();
      //   const regOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const regValue = this.registerManager.listRegister.getUint8(regOffsetInRegisterMemory);
      //   this.registerManager.setValueByName('acc', valueLiteral + regValue);
      //   break;
      // }

      // Add Register to Register and put value to 'acc'
      // case listObjInstruction.ADD_REG_REG: {
      //   const rAOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const rBOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const r1Value = this.registerManager.listRegister.getUint8(rAOffsetInRegisterMemory);
      //   const r2Value = this.registerManager.listRegister.getUint8(rBOffsetInRegisterMemory);
      //   this.registerManager.setValueByName('acc', r1Value + r2Value);
      //   break;
      // }

      // case listObjInstruction.MUL_REG_REG: {
      //   const rAOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const rBOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const r1Value = this.registerManager.listRegister.getUint8(rAOffsetInRegisterMemory);
      //   const r2Value = this.registerManager.listRegister.getUint8(rBOffsetInRegisterMemory);
      //   this.registerManager.setValueByName('acc', r1Value * r2Value);
      //   break;
      // }

      // case listObjInstruction.JNE_REG_LIT: {
      //   const regOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const registerValue = this.registerManager.listRegister.getUint8(regOffsetInRegisterMemory);
      //   const valueInMemory = this.getMem8BitAtIp();
      //   const offsetInMemory = this.getMem8BitAtIp();
      //
      //   if (registerValue !== valueInMemory) {
      //     this.registerManager.setValueByName('ip', offsetInMemory);
      //   }
      //
      //   break;
      // }

      // case listObjInstruction.PHS_LIT: {
      //   const valueInMemory = this.getMem8BitAtIp();
      //   this.pushToStack( valueInMemory );
      //   break
      // }

      // case listObjInstruction.PHS_REG: {
      //   const registerOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const valueRegister = this.registerManager.listRegister.getUint8(registerOffsetInRegisterMemory);
      //   this.pushToStack( valueRegister );
      //   break;
      // }

      // case listObjInstruction.PHS_REG_PTR: {
      //   const rAoffsetInMemory  = this.getMem8BitAtIp();
      //   const rAvalueInMemory   =this.registerManager.listRegister.getUint8(rAoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   const valueInMemory = this.memory.getUint8(rAvalueInMemory);
      //   this.pushToStack(valueInMemory);
      //   break;
      // }

      // case listObjInstruction.PHS_REG_PSP: {
      //   const rAoffsetInMemory  = this.getMem8BitAtIp();
      //   const shiftBy           = this.getMem8BitAtIp();
      //   const rAvalueInMemory   = this.registerManager.listRegister.getUint8(rAoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   const valueInMemory = this.memory.getUint8(rAvalueInMemory + shiftBy);
      //   this.pushToStack(valueInMemory);
      //   break;
      // }

      // case listObjInstruction.PHS_REG_PSN: {
      //   const rAoffsetInMemory  = this.getMem8BitAtIp();
      //   const shiftBy           = this.getMem8BitAtIp();
      //   const rAvalueInMemory   = this.registerManager.listRegister.getUint8(rAoffsetInMemory);
      //   // The given Registers value is a pointer to a Memory Address
      //   const valueInMemory = this.memory.getUint8(rAvalueInMemory - shiftBy);
      //   this.pushToStack(valueInMemory);
      //   break;
      // }

      // case listObjInstruction.POP: {
      //   const registerOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const valueInStackPopped = this.popFromStack();
      //   this.registerManager.listRegister.setUint8(registerOffsetInRegisterMemory, valueInStackPopped);
      //
      //   break;
      // }

      case listObjInstruction.END: {
        this.isRunning = false;
        break;
      }

      // case listObjInstruction.CAL_LIT: {
      //   const valueInMemory = this.getMem8BitAtIp();
      //   this.pushAllRegisterToStack();
      //
      //   this.registerManager.setValueByName('ip', valueInMemory);
      //
      //   // Move Arguments passed into Subroutine through Stack to General Purpose Registers (r1, r2..)
      //   // const addressInMemoryStackPointer = this.registerManager.getValueByName('sp');
      //   // const noArg = this.memory.getUint8(addressInMemoryStackPointer + 5);
      //   // for (let i = 0; i < noArg; i++) {
      //   //   const valueAttribute = this.memory.getUint8(addressInMemoryStackPointer + 5 + (noArg - i));
      //   //   const nameReg = 'r'+(i+1);
      //   //   this.registerManager.setValueByName(nameReg, valueAttribute);
      //   // }
      //
      //   break;
      // }

      // case listObjInstruction.RET: {
      //   this.popAllRegisterFromStack();
      //   break;
      // }

      // case listObjInstruction.CAL_REG: {
      //   const registerOffsetInRegisterMemory = this.getMem8BitAtIp();
      //   const valueRegister = this.registerManager.listRegister.getUint8(registerOffsetInRegisterMemory);
      //   this.pushAllRegisterToStack();
      //
      //   this.registerManager.setValueByName('ip', valueRegister);
      //   break;
      // }

      // case listObjInstruction.GET_ATR: {
      //   break;
      // }

      // case listObjInstruction.ALC: {
      //   const offsetInMemory = this.getMem8BitAtIp();
      //   const length = this.getMem8BitAtIp();
      //   for (let index = 0; index < length; index++) {
      //     const valueInMemory = this.getMem8BitAtIp();
      //     this.memory.setUint8(offsetInMemory + index, valueInMemory);
      //   }
      //   break;
      // }

      default: {
        throw `ERROR: CPU: Unknown Instruction: "0x${instruction.toString(16).padStart(2, '0')}".`;
      }
    }
  }

  step() {
    const instruction = this.getMem8BitAtIp();
    this.executeInstruction(instruction);
  }

  run() {
    setInterval( this.step.bind(this), 100 );
  }
}

export default Cpu;