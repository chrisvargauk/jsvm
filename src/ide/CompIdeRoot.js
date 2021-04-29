import {Component} from "game-gui";
import './CompIdeRoot.scss';

import ViewMemory from "./ViewMemory";
import ViewRegisterList from "./ViewRegisterList";
import ViewStack from "./ViewStack";
import CompEditor from "./CompEditor";

export default class CompIdeRoot extends Component {
  afterInstantiation( dataFromParent ) {
    const listMemory    = this.readMemory();
    const listRegister  = this.readRegisterList();
    const listStack     = this.readStack();

    this.setState({
      listMemory,
      listRegister,
      listStack,
      ctrForeReRender: 0,
      isRunCpu: false,
    });

    this.dScreen = document.querySelector('#screen');
  }

  render () {
    return `
      <div class="head">
        JS VM IDE \\\\ LOAD FILE | SAVE FILE
      </div>
      
      <div id="area-editor-and-screen">
        ${this.include(CompEditor, this.getState(), {apiIde: this})}
        <div id="screen-wrapper">
          <div class="title">PERIPHERALS / SCREEN</div>
          <div class="content"></div>
        </div>
      </div>
      
      <div id="area-debug">
        ${this.include(ViewRegisterList, this.getState())}
        ${this.include(ViewMemory, this.getState())}
        ${this.include(ViewStack, this.getState())}
      </div>
    `;
  }

  afterRender() {
    document.querySelector('#screen-wrapper .content').appendChild(this.dScreen);
  }

  step() {
    this.option.api.cpu.step();

    const listMemory = this.readMemory();
    const listRegister = this.readRegisterList();
    const listStack  = this.readStack();

    this.setState({
      listMemory,
      listRegister,
      listStack,
      ctrForeReRender: this.getState().ctrForeReRender + 1,
      isRunCpu: this.getState().isRunCpu
    });
  }

  run() {


    let isRunCpu = !this.getState().isRunCpu;

    if (isRunCpu) {
      this.tokenIntervalRun = setInterval(this.step.bind(this), 10);
      // this.option.api.cpu.run();
    } else {
      clearInterval( this.tokenIntervalRun );
    }

    this.setState({
      ...this.getState(),
      isRunCpu: isRunCpu
    });
  }

  readMemory() {
    const region = this.option.api.cpu.memory.findRegion(0);

    const listMemory = [];
    for (let indexByte = 0; indexByte < region.device.byteLength; indexByte++) {
      const byte = region.device.getUint8(indexByte);
      listMemory.push( byte );
    }

    return listMemory;
  }

  readRegisterList() {
    const listRegister = [];
    this.option.api.cpu.registerManager.config.listRegisterName.forEach((nameRegister, indexRegister) => {
      // console.log(`Register[${'0x'+(indexRegister).toString(16).padStart(2, '0')}] "${nameRegister}"`, '0x'+this.registerManager.getValueByName(nameRegister).toString(16).padStart(2, '0'));

      listRegister.push({
        name:   nameRegister,
        value:  this.option.api.cpu.registerManager.getValueByName(nameRegister)
      });
    });

    return listRegister;
  }

  readStack() {
    const region = this.option.api.cpu.memory.findRegion(0);

    const listStack = [];
    for (let indexByte = region.device.byteLength - 32;  indexByte < region.device.byteLength; indexByte += 2) {
      const byte = region.device.getUint16(indexByte);

      listStack.push({
        address:  indexByte,
        value:    byte
      });
    }

    return listStack;
  }

  parse() {
    const strAssembly = document.querySelector('#editor').innerText;
    console.log('strAssembly', strAssembly);

    this.option.api.parse( strAssembly );

    const listMemory    = this.readMemory();
    const listRegister  = this.readRegisterList();
    const listStack     = this.readStack();

    this.setState({
      listMemory,
      listRegister,
      listStack,
      ctrForeReRender: 0,
    });
  }
}