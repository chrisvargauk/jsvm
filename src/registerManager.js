import {createMemory} from "./util";
import config from "./registerManager.config"

class RegisterManager {
  constructor() {
    this.config = config;

    this.listRegister = null;
    this.mapRegister = {};

    this.createRegisterList();
  }

  createRegisterList() {
    this.listRegister = createMemory(this.config.listRegisterName.length * 2);

    this.mapRegister = this.config.listRegisterName.reduce((map, registerName, index) => {
      map[registerName] = index * 2;
      return map;
    }, {});
  }

  resetDefault() {
    this.createRegisterList();
  }

  getAddressByName( nameRegister ) {
    if (!(nameRegister in this.mapRegister)) {
      throw `Register can't be found:  "${nameRegister}".`;
    }

    return this.mapRegister[ nameRegister ];
  }

  getValueByName( nameRegister ) {
    const offsetInMemoryRegister = this.getAddressByName( nameRegister );
    return this.listRegister.getUint16( offsetInMemoryRegister );
  }

  setValueByName( nameRegister, valueRegister ) {
    const offsetInMemoryRegister = this.getAddressByName( nameRegister );
    this.listRegister.setUint16( offsetInMemoryRegister, valueRegister );
  }

  getValueByAddress( offsetInMemoryRegister ) {
    if (this.mapRegister.length <= offsetInMemoryRegister) {
      throw `Register doesn't exist "${offsetInMemoryRegister}"`;
    }

    return this.listRegister.getUint16( offsetInMemoryRegister );
  }

  setValueByAddress( offsetInMemoryRegister, valueRegister ) {
    if (this.mapRegister.length <= offsetInMemoryRegister) {
      throw `Register doesn't exist "${offsetInMemoryRegister}"`;
    }

    this.listRegister.setUint16( offsetInMemoryRegister, valueRegister );
  }
}

export default new RegisterManager();