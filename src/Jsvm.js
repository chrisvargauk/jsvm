import { createMemory } from './util';
import Cpu from "./CPU/Cpu";
import ParserAssembly from './Assembler/ParserAssembly';
import MemoryMapper from "./MemoryMapper";
import Screen from "./Screen";

export default class Jsvm {
  constructor() {
    this.config = {
      sizeMemoryPhysical: 1024, // 0x38
    };

    // Create Parser
    this.assembler = new ParserAssembly();

    // Create Mapped Memory
    this.memoryMapped = new MemoryMapper();

    // Create Screen Device and map it onto Mapped Memory
    this.screen = new Screen();
    const addressMemoryScreenStart = 2048;
    this.memoryMapped.map(this.screen, addressMemoryScreenStart, addressMemoryScreenStart + 144, true);

    // Create Physical Memory and map it onto Mapped Memory
    this.memoryPhysical = null;
    this.setResetMemory( this.config.sizeMemoryPhysical );

    // Create CPU
    this.cpu = new Cpu({
      memory:     this.memoryMapped,
      addressSp:  this.memoryPhysical.byteLength - 2
    });
  }

  setResetMemory( sizeMemory ) {
    if (this.clearMemory) this.clearMemory();

    this.memoryPhysical = createMemory(sizeMemory);
    this.clearMemory = this.memoryMapped.map(this.memoryPhysical, 0, sizeMemory);
  }

  parse( str,  ) {
    this.setResetMemory( this.config.sizeMemoryPhysical );

    this.assembler.parse( str, this.memoryPhysical );
    this.prepProgram();
  }

  prepProgram() {
    this.cpu.setReset();
    this.cpu.registerManager.setValueByName('ip', 0);
    this.cpu.isRunning = true;
  }
}