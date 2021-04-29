import {Component} from "game-gui";
import './ViewStack.scss';

export default class ViewStack extends Component {
  render ( { listStack } ) {
    const sp = this.option.api.cpu.registerManager.getValueByName('sp');
    const fp = this.option.api.cpu.registerManager.getValueByName('fp');

    return `
      <div class="title">## STACK ##</div>
      ${listStack && listStack.map((byte, indexByte) => {
        const isSpHere = sp === byte.address;
        const isFpHere = fp === byte.address;
        return `<div class="byte">
          <div class="mark sp">${isSpHere ? 'SP&gt;' : ''}</div>    
          <div class="mark fp">${isFpHere ? '&lt;FP' : ''}</div>
          <div class="address">[0x${byte.address.toString(16).padStart(4, '0')}]</div>  
          <div class="value">${'0x'+byte.value.toString(16).padStart(4, '0')}</div>
        </div>`;  
      }).join('')}
    `;
  }
}