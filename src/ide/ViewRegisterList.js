import {Component} from "game-gui";
import './ViewRegisterList.scss';

export default class ViewRegisterList extends Component {
  render ( { listRegister } ) {
    return `
      <div class="title">REGIST.</div>
      ${listRegister && listRegister.map((register, indexByte) => {
        return `<div class="register">
          <div class="head">
            <div class="name">${register.name}</div>    
            <div class="address">0x${(indexByte * 2).toString(16).padStart(2, '0')}</div>
          </div>
          <div class="value">${(register.value ? '0x'+register.value.toString(16).padStart(4, '0') : ' ')}</div>
        </div>`;  
      }).join('')}
    `;
  }
}