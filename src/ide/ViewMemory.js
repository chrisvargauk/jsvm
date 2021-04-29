import {Component} from "game-gui";
import './ViewMemory.scss';

export default class ViewMemory extends Component {
  render ( { listMemory } ) {
    const mapInstruction = this.option.api.mapInstruction;
    const ip = this.option.api.cpu.registerManager.getValueByName('ip');

    return `
      <div class="panel">
        <div class="title">## MEMORY ##</div>
        <div class="container">
          <div class="scrollable">
              ${listMemory && listMemory.map((byte, indexByte) => {
                const isIpHere = ip === indexByte;
                return `<div class="byte ${isIpHere ? 'ip':''}">
                  <div class="mark">${isIpHere ? '&lt;IP&gt;' : ''}</div>
                  <div class="address">0x${indexByte.toString(16).padStart(2, '0')}</div>
                  <div class="value">${(byte ? '0x'+byte.toString(16).padStart(2, '0') : '_ _')}</div>
                  <div class="instruction-name">${(byte in mapInstruction) ? ' '+mapInstruction[byte] : ''}</div>
                </div>`;
              }).join('')}      
          </div>  
        </div>
      </div>
    `;
  }
}