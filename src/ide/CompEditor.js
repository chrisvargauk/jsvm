import { Component } from "game-gui";
import './CompEditor.scss';

export default class CompEditor extends Component {
  afterInstantiation() {
    this.setState({
      strCode: `
print_to:
  ;; 6($sp) -> Y
  ;; 7($sp) -> X
  ;; 8($sp) -> CHAR TO PRINT
  ;; 0x0800   -> Screen Mem Address starts at

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
  mov 0x0800 $r2
  add $r1 $r2
  mov 8($sp) $r1 ;; CHAR TO PRINT -> $r1
  mov $r1 ($acc)
ret

main:
  cal print_to: 0x0040 0x0003 0x0003
  cal print_to: 0x0040 0x0003 0x0004
  cal print_to: 0x0040 0x0003 0x0005
  cal print_to: 0x0040 0x0004 0x0005
  cal print_to: 0x0040 0x0005 0x0005
  cal print_to: 0x0040 0x0006 0x0005
  cal print_to: 0x0040 0x0007 0x0005
  cal print_to: 0x0040 0x0008 0x0005
  cal print_to: 0x0040 0x0008 0x0004
  cal print_to: 0x0040 0x0008 0x0003
  cal print_to: 0x0040 0x0007 0x0003
  cal print_to: 0x0040 0x0006 0x0003
  cal print_to: 0x0040 0x0005 0x0003
  cal print_to: 0x0040 0x0005 0x0004
  cal print_to: 0x0040 0x0005 0x0005
  cal print_to: 0x0040 0x0005 0x0006
  cal print_to: 0x0040 0x0005 0x0007
  cal print_to: 0x0040 0x0005 0x0008
  cal print_to: 0x0040 0x0005 0x0009
  cal print_to: 0x0040 0x0006 0x0009
  cal print_to: 0x0040 0x0007 0x0009
  cal print_to: 0x0040 0x0008 0x0009
  cal print_to: 0x0040 0x0009 0x0009
  cal print_to: 0x0040 0x000a 0x0009
  cal print_to: 0x0040 0x000a 0x0008
  cal print_to: 0x0040 0x000a 0x0007
  cal print_to: 0x0040 0x000a 0x0006
  cal print_to: 0x0040 0x000a 0x0005
  cal print_to: 0x0040 0x000a 0x0004
  cal print_to: 0x0040 0x000a 0x0003
  cal print_to: 0x0040 0x000a 0x0002
  cal print_to: 0x0040 0x000a 0x0001
  cal print_to: 0x0040 0x0009 0x0001
  cal print_to: 0x0040 0x0008 0x0001
  cal print_to: 0x0040 0x0007 0x0001
  cal print_to: 0x0040 0x0006 0x0001
  cal print_to: 0x0040 0x0005 0x0001
  cal print_to: 0x0040 0x0004 0x0001
  cal print_to: 0x0040 0x0003 0x0001
  cal print_to: 0x0040 0x0002 0x0001
  cal print_to: 0x0040 0x0001 0x0001
  cal print_to: 0x0040 0x0001 0x0002
  cal print_to: 0x0040 0x0001 0x0003
  cal print_to: 0x0040 0x0001 0x0004
  cal print_to: 0x0040 0x0001 0x0005
  cal print_to: 0x0040 0x0001 0x0006
  cal print_to: 0x0040 0x0001 0x0007
  cal print_to: 0x0040 0x0001 0x0008
  cal print_to: 0x0040 0x0001 0x0009
  cal print_to: 0x0040 0x0001 0x000a
  cal print_to: 0x0040 0x0001 0x000b
  cal print_to: 0x0040 0x0002 0x000b
  cal print_to: 0x0040 0x0003 0x000b
  cal print_to: 0x0040 0x0004 0x000b
  cal print_to: 0x0040 0x0005 0x000b
  cal print_to: 0x0040 0x0006 0x000b
  cal print_to: 0x0040 0x0007 0x000b
  cal print_to: 0x0040 0x0008 0x000b
  cal print_to: 0x0040 0x0009 0x000b
  cal print_to: 0x0040 0x000a 0x000b
  cal print_to: 0x0040 0x000b 0x000b
  cal print_to: 0x0040 0x000c 0x000b
  cal print_to: 0x0040 0x000d 0x000b
end
      `,
    })
  }
  render( dataFromParent ) {
    return `
    <div class="title">
      <span>ASSEMBLY CODE</span>
      <spna class="btn-step" gui-click="run">${dataFromParent.isRunCpu ? 'STOP' : 'RUN'}</spna>
      <span class="btn-step" >&nbsp;|&nbsp;</span>
      <span class="btn-step" gui-click="step">STEP</span>
      <span class="btn-step" >&nbsp;|&nbsp;</span>
      <spna class="btn-step" gui-click="parse">COMPILE</spna> 
    </div>
    <div class="content">
      <div class="line-number-list">
      ${(function () {
        let str = '';  
        for (let i = 0; i < 100; i++) {
          str += `<div>${i+1}</div>`;
        }
        
        return str; 
      }.bind(this)())}
      </div>
      <div id="editor" class="scrollable" contenteditable="true" style="color: white">
        ${this.strToHtml(this.getState().strCode)}
      </div>
    </div>
    `;
  }

  strToHtml( str ) {
    str = str.split('\n').map(lineCode => {
      lineCode = lineCode.split('  ').join('&nbsp;&nbsp;');
      lineCode = lineCode.split(' ').map(lineItem => {
        return `<span>${lineItem}</span>&nbsp;`;
      }).join('');

      return `<div>${lineCode}</div>`;
    }).join('');

    return str;
  }

  parse() {
    this.config.apiIde.parse();
  }

  step() {
    this.config.apiIde.step();
  }

  run() {
    this.config.apiIde.run();
  }
}

// print_to:
//   ;; 6($sp) -> Y
//   ;; 7($sp) -> X
//   ;; 8($sp) -> CHAR TO PRINT
//   ;; 0x6f   -> Screen Mem Address starts at
//
//   ;; Y -> $acc
//   mov 6($sp) $r1 ;; mov Y  -> $r
//   mov 0x0c $r2   ;; mov 12 -> $r2
//   mul $r1 $r2
//
//   ;; Y + X -> $acc
//   mov $acc $r1
//   mov 7($sp) $r2
//   add $r1 $r2
//
//   ;; Screen Address + Y + X -> $acc
//   mov $acc $r1
//   mov 0x6f $r2
//   add $r1 $r2
//   mov 8($sp) $r1 ;; CHAR TO PRINT -> $r1
//   mov $r1 ($acc)
// ret
//
// main:
//   MOV_LIT_REG 0x01 r1
//   mov 0x01 $r1
//   cal print_to: 0x40 0x00 0x00
//   cal print_to: 0x40 0x00 0x01
//   cal print_to: 0x40 0x00 0x02
//   cal print_to: 0x40 0x01 0x02
//   cal print_to: 0x40 0x02 0x02
//   ;; cal print_to: 0x40 0x03 0x02
//   ;; cal print_to: 0x40 0x03 0x03
//   ;; cal print_to: 0x40 0x03 0x04
// end