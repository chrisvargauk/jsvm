const listInstruction = [
  // # Input / Output to Registers #
  // # ########################### #

  // All inputs to Register
  'MOV_LIT_REG',      // LIT -> REG
  'MOV_MEM_REG',      // MEM -> REG
  'MOV_REG_REG',      // REG -> REG
  'MOV_REG_PTR_REG',  // REG PTR -> REG
  'MOV_REG_PSP_REG',  // REG PTR SHIFTED + -> REG
  'MOV_REG_PSN_REG',  // REG PTR SHIFTED - -> REG

  // All outputs from Register
  'MOV_REG_MEM',      // REG -> MEM
                      // REG -> REG  Note: it is a duplicate, therefore removed here
  'MOV_REG_REG_PTR',  // REG -> REG PTR
  'MOV_REG_REG_PSP',  // REG -> REG PTR SHIFTED +
  'MOV_REG_REG_PSN',  // REG -> REG PTR SHIFTED -
  // 'PSH_REG',       // REG -> STACK  Note: it is a duplicate, therefore removed here

  // Shortcuts - dont consider all the possible permutations, we only define the often used ones
  'MOV_MEM_MEM',
  'MOV_LIT_MEM',
  'MOV_LIT_REG_PTR',
  'MOV_LIT_REG_PSP',
  'MOV_LIT_REG_PSN',

  // # Input / Output to Stack #
  // # ####################### #

  // Push & Pop
  'PSH_REG',
  'PSH_LIT',
  'POP_REG',

  // # Operations #
  // # ########## #
  'ADD_REG_REG',
  'SUB_REG_REG',
  'MUL_REG_REG',
  'DIV_REG_REG', // Note: we dont do floating point operations yet
  'MOD_REG_REG',

  // Shortcuts - dont consider all the possible permutations, we only define the often used ones
  'ADD_LIT_REG',

  // # Other #
  // # ##### #

  'JMP_LIT',
  'JMP_REG',
  'JNE_REG_LIT',

  'END',
  'CAL',
  'RET',
  'GET_ATR',
  'ALC',

  // # To be removed #
  // # ############# #

  // We dont need these because we can do it through registers
  'PHS_REG_PTR',
  'PHS_REG_PSP',
  'PHS_REG_PSN',
];

const addressStart = 0xe0;
const listObjInstruction = listInstruction.reduce((map, nameInstruction, index) => {
  map[ nameInstruction ] = addressStart + index;
  return map;
}, {});

export default listObjInstruction;