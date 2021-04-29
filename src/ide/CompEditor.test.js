const code = `
main:
  ;; Move Literal to Register 
  ;; MOV_LIT_REG 0x01 r1
  
  ;; Move Literal to Register (Abbreviation)
  ;; mov 0x01 $r1
  
  ;; Move Register to Register
  ;; MOV_LIT_REG 0x01 r1
  ;; MOV_REG_REG r1 r2
  
  ;; Move Register to Register (Abbreviation)
  ;; mov 0x0101 $r1
  ;; mov $r1 $r2
  
  ;; Move Literal to Memory
  ;; MOV_LIT_MEM 0x0101 0x000f
  
  ;; Move Literal to Memory (Abbreviation)
  ;; mov 0x0101 &0x000f
  
  ;; Move Register to Memory
  ;; mov 0x0101 $r1
  ;; MOV_REG_MEM r1 0x000f
  
  ;; Move Register to Memory (Abbreviation)
  ;; mov 0x0101 $r1
  ;; mov $r1 &0x000f
  
  ;; Move Memory to Register - Move value stored at a Memory Address to Register
  ;; mov 0x0101 &0x000f
  ;; MOV_MEM_REG 0x000f r1
  
  ;; Move Memory to Register (Abbreviation) - Move value stored at a Memory Address to Register
  ;; mov 0x0101 &0x000f
  ;; mov &0x000f $r1
  
  ;; Push Register's value to Stack
  ;; mov 0x0101 $r1
  ;; PSH_REG r1
  
  ;; Push Register's value to Stack (Abbreviation)
  ;; mov 0x0101 $r1
  ;; psh $r1
  
  ;; Push Literal to Stack
  ;; PSH_LIT 0x0101
  
  ;; Push Literal to Stack (Abbreviation)
  ;; psh 0x0101
  
  ;; Pop value from Stack to Register
  ;; psh 0x0101
  ;; POP_REG r1
  
  ;; Pop value from Stack to Register (Abbreviation)
  ;;psh 0x0101
  ;;pop $r1
  
  ;; Move Value from Memory, from the Address what we store as a Pointer in the defined Register, to another Register 
  ;; mov 0x0101 &0x001f
  ;; mov 0x001f $r1
  ;; MOV_REG_PTR_REG r1 r2
  
  ;; Move Value from Memory, from the Address what we store as a Pointer in the defined Register, to another Register (Abbreviation) 
  ;; mov 0x0101 &0x001f
  ;; mov 0x001f $r1
  ;; mov ($r1) $r2
  
  ;; Move Value from Memory, from the Address what we store as a Pointer in the defined Register, also that register is shifted by (positive direction) a value, to another Register 
  ;; mov 0x0101 &0x001f
  ;; mov 0x001e $r1
  ;; MOV_REG_PSP_REG r1 0x01 r2
  
  ;; Move Value from Memory, from the Address what we store as a Pointer in the defined Register, also that register is shifted by (positive direction) a value, to another Register (Abbreviation) 
  ;; mov 0x0101 &0x001f
  ;; mov 0x001e $r1
  ;; mov 1($r1) $r2
  
  ;; Combined Functionality - Access Value on the Stack using Stack Pointer
  ;; psh 0x0101
  ;; mov 1($sp) $r1
  
  ;; Move Value from Memory, from the Address what we store as a Pointer in the defined Register, also that register is shifted by (negative direction) a value, to another Register 
  ;; mov 0x0101 &0x001e
  ;; mov 0x001f $r1
  ;; MOV_REG_PSN_REG r1 0x01 r2
  
  ;; Move Value from Memory, from the Address what we store as a Pointer in the defined Register, also that register is shifted by (negative direction) a value, to another Register (Abbreviation) 
  ;; mov 0x0101 &0x001e
  ;; mov 0x001f $r1
  ;; mov -1($r1) $r2
  
  ;; Move Value from Register to Memory, to the Address that is stored in another Register as a Pointer
  ;; mov 0x0101 $r1
  ;; mov 0x001f $r2
  ;; MOV_REG_REG_PTR r1 r2
  
  ;; Move Value from Register to Memory, to the Address that is stored in another Register as a Pointer (Abbreviation)
  ;; mov 0x0101 $r1
  ;; mov 0x001f $r2
  ;; mov $r1 ($r2)
  
  ;; Move Value from Register to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the positive direction
  ;; mov 0x0101 $r1
  ;; mov 0x001e $r2
  ;; MOV_REG_REG_PSP r1 r2 0x01
  
  ;; Move Value from Register to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the positive direction (Abbreviation)
  ;; mov 0x0101 $r1
  ;; mov 0x001e $r2
  ;; mov $r1 1($r2)
  
  ;; Move Value from Register to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the negative direction
  ;; mov 0x0101 $r1
  ;; mov 0x0020 $r2
  ;; MOV_REG_REG_PSN r1 r2 0x01
  
  ;; Move Value from Register to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the negative direction (Abbreviation)
  ;; mov 0x0101 $r1
  ;; mov 0x0020 $r2
  ;; mov $r1 -1($r2)
  
  ;; Move Literal to Memory, to the Address that is stored in another Register as a Pointer
  ;; mov 0x001f $r1
  ;; MOV_LIT_REG_PTR 0x0101 r1
  
  ;; Move Literal to Memory, to the Address that is stored in another Register as a Pointer (Abbreviation)
  ;; mov 0x001f $r1
  ;; mov 0x0101 ($r1)
  
  ;; Move Literal to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the positive direction
  ;; mov 0x001e $r1
  ;; MOV_LIT_REG_PSP 0x0101 r1 0x01
  
  ;; Move Literal to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the positive direction (Abbreviation)
  ;; mov 0x001e $r1
  ;; mov 0x0101 1($r1)
  
  ;; Move Literal to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the negative direction
  ;; mov 0x0020 $r1
  ;; MOV_LIT_REG_PSN 0x0101 r1 0x01
  
  ;; Move Literal to Memory, to the Address that is stored in another Register as a Pointer, and shifted by a given Number to the negative direction (Abbreviation)
  ;; mov 0x0020 $r1
  ;; mov 0x0101 -1($r1)
  
  ;; Jump (to Memory Address)
  ;; JMP_LIT 0x000f
  
  ;; Jump (to Memory Address held in Register)
  ;; mov 0x000f $r1
  ;; JMP_REG r1
  
  ;; Jump (to Memory Address) (Abbreviation)
  ;; jmp 0x000f
  
  ;; Jump (to Memory Address held in Register) (Abbreviation)
  ;; mov 0x000f $r1
  ;; jmp $r1
  
  ;; Add Register to Register
  ;; mov 0x0001 $r1
  ;; mov 0x0002 $r2
  ;; ADD_REG_REG r1 r2
  
  ;; Add Register to Register (Abbreviation)
  ;; mov 0x0001 $r1
  ;; mov 0x0002 $r2
  ;; add $r1 $r2
  
  ;; Add Literal to Register
  ;; mov 0x0001 $r1
  ;; ADD_LIT_REG 0x0002 r1
  
  ;; Add Literal to Register (Abbreviation)
  ;; mov 0x0001 $r1
  ;; add 0x0002 $r1
  
  ;; Add Register to Register
  ;; mov 0x0002 $r1
  ;; mov 0x0001 $r2
  ;; SUB_REG_REG r1 r2
  
  ;; Add Register to Register (Abbreviation)
  ;; mov 0x0002 $r1
  ;; mov 0x0001 $r2
  ;;sub $r1 $r2
  
  ;; Add Register to Register
  ;; mov 0x0002 $r1
  ;; mov 0x0003 $r2
  ;; MUL_REG_REG r1 r2
  
  ;; Add Register to Register (Abbreviation)
  ;; mov 0x0002 $r1
  ;; mov 0x0003 $r2
  ;; mul $r1 $r2
  
  ;; Jump to Memory Address if Register Value is not equal to Literal
  ;; JNE_REG_LIT acc 0x0005 0x001f
  
  ;; Print to Virtual Screen
  alc 0x6f 'Hello world!'
  
  ;; CAL / RET
  ;; #########
  
  ;; my_subroutine:
  ;; mov 0x0103 $r1
  ;; psh 0x0104
  ;; ret
  ;; 
  ;; main:
  ;;   mov 0x0101 $r1
  ;;   cal my_subroutine: 0x0102 $r1
  ;;   mov 0x0105 $r2
  ;; end
`;

`
print_to:
  ;; 6($sp) -> Y
;; 7($sp) -> X
;; 8($sp) -> CHAR TO PRINT
;; 0x00d3   -> Screen Mem Address starts at

;; Y -> $acc
mov 6($sp) $r1 ;; mov Y  -> $r
mov 0x000c $r2   ;; mov 12 -> $r2
mul $r1 $r2

;; Y + X -> $acc
mov $acc $r1
mov 7($sp) $r2
add $r1 $r2

;; Screen Address + Y + X -> $acc
mov $acc $r1
mov 0x00d3 $r2
add $r1 $r2
mov 8($sp) $r1 ;; CHAR TO PRINT -> $r1
mov $r1 ($acc)
ret

main:
  ;; MOV_LIT_REG 0x01 r1
;; mov 0x01 $r1
cal print_to: 0x0040 0x0000 0x0000
cal print_to: 0x0040 0x0001 0x0001
cal print_to: 0x0040 0x0002 0x0002
cal print_to: 0x0040 0x0003 0x0003
cal print_to: 0x0040 0x0004 0x0004
cal print_to: 0x0040 0x0005 0x0005
cal print_to: 0x0040 0x0006 0x0006
cal print_to: 0x0040 0x0007 0x0007
end
`