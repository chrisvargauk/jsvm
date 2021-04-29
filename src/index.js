import Jsvm from './Jsvm';
import Ide from './Ide';

window.jsvm = new Jsvm();
window.ide  = new Ide( window.jsvm );

// document.addEventListener('DOMContentLoaded', () => {
//
// }, false);

//   const addressStart = 111;
//   let addressCurrent = 0;
//   const strAssembly = `
// main:
//   mov 0x${'H'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'E'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'L'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'L'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'O'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${' '.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'W'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'O'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'R'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'L'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'D'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   mov 0x${'!'.charCodeAt(0).toString(16)} &0x${(addressStart+addressCurrent++).toString(16)}
//   end
// `;

// const strAssembly = `
// test:
//   phs 6($fp)    // Move value passed in to variable
//   ret
//
// main:
//   cal test: 0x03
//   end
// `;

// const strAssembly = `
// main:
//   mov 0x01 &0x15
//   mov 0x15 $r1
//   phs ($r1)
// end
// `;

// const strAssembly = `
// test:
//   phs 0x04          // a = 4
//   mov 0x05 -1($fp)  // a = 5
//   mov -1($fp) $acc  // a => $acc
//   ret
//
// main:
//   mov 0x01 $r1
//   phs 0x02
//   cal test: 0x03
// end
// `;

// const strAssembly = `
// main:
//   a = 1   // psh 0x01;
//   b = 2   // psh 0x02;
//   b = 3   // mov 0x03 1($sp)
//   b = a   // mov 2($sp) 2($sp)
// end
// `;

// const strAssembly = `
// main:
//   phs 0x01
//   mov 0x02 1($sp)
// end
// `;

// const strAssembly = `
// main:
//   mov 0x01 ($sp)
// end
// `;

// const strAssembly = `
// main:
//   phs 0x01
//   mov 0x02 $r1
//   mov $r1 1($sp)
// end
// `;

// const strAssembly = `
// main:
//   mov 0x01 $r1
//   mov $r1 ($sp)
// end
// `;

// const strAssembly = `
// main:
//   phs 0x01
//   mov 1($sp) $r1
// end
// `;

// const strAssembly = `
// main:
//   mov 0x01 &0x15
//   mov 0x16 $r1
//   mov -1($r1) $r2
// end
// `;

// const strAssembly = `
// main:
//   mov 0x01 &0x15
//   mov 0x15 $r1
//   mov ($r1) $r2
// end
// `;

// const strAssembly = `
// main:
//   mov 0x00 $acc
//   loop:
//     mov $acc $r1
//     add 0x01 $r1
//     jne $acc 0x03 loop:
// end
// `;

// const strAssembly = `
// my_subroutine:
//   add $r1 $r2
// ret
//
// main:
//   mov 0x00 $acc
//   loop:
//     cal my_subroutine: $acc 0x01
//     jne $acc 0x03 loop:
// end
// `;

// Prog: Loop
// const strAssembly = `
// MOV_REG_REG acc r1;
// MOV_LIT_REG 0x01 r2;
// ADD_REG_REG r1 r2;
// JMP_NOT_EQ 0x03 0x00;
// END
// `;

// Prog: Swap values of registers with Stack
// const strAssembly = `
// MOV_LIT_REG 0x01 r1;
// MOV_LIT_REG 0x02 r2;
// PHS_REG r1;
// PHS_REG r2;
// POP r1;
// POP r2;
// `;

// let indexMemory = 0;
// listByteInMemory[indexMemory++] = listObjInstruction.MOV_LIT_REG;
// listByteInMemory[indexMemory++] = 0x01;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r1'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.MOV_LIT_REG;
// listByteInMemory[indexMemory++] = 0x02;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r2'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.PHS_REG;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r1'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.PHS_REG;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r2'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.POP;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r1'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.POP;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r2'];

// PROGRAM 2
// let indexMemory = 0;
// listByteInMemory[indexMemory++] = listObjInstruction.MOV_MEM_REG;
// listByteInMemory[indexMemory++] = 0x0F;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r1'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.MOV_LIT_REG;
// listByteInMemory[indexMemory++] = 0x01;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r2'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.ADD_REG_REG;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r1'];
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r2'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.MOV_REG_MEM;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['acc'];
// listByteInMemory[indexMemory++] = 0x0F;
//
// listByteInMemory[indexMemory++] = listObjInstruction.JMP_NOT_EQ;
// listByteInMemory[indexMemory++] = 0x03;
// listByteInMemory[indexMemory++] = 0x00;

// PROGRAM 1
// let indexMemory = 0;
// listByteInMemory[indexMemory++] = listObjInstruction.MOV_LIT_REG;
// listByteInMemory[indexMemory++] = 0x01;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r1'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.MOV_LIT_REG;
// listByteInMemory[indexMemory++] = 0x02;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r2'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.ADD_REG_REG;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r1'];
// listByteInMemory[indexMemory++] = registerManager.mapRegister['r2'];
//
// listByteInMemory[indexMemory++] = listObjInstruction.MOV_REG_MEM;
// listByteInMemory[indexMemory++] = registerManager.mapRegister['acc'];
// listByteInMemory[indexMemory++] = 0x0C;