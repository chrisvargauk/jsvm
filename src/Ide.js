import listObjInstruction from "./listObjInstruction";

import CompIdeRoot from "./ide/CompIdeRoot";
import GameGUI, {Component} from 'game-gui';

export default class Ide {
  constructor( jsvm ) {
    this.jsvm = jsvm;

    const mapInstruction = Object.keys(listObjInstruction).reduce((map, key, index) => {
      const value = listObjInstruction[key];
      map[value] = key;
      return map;
    }, {});

    const option = {
      api: {
        mapInstruction,
        cpu: this.jsvm.cpu,
        parse: this.jsvm.parse.bind( this.jsvm ),
      },
    };

    this.gameGUI = new GameGUI(CompIdeRoot, '#ui-root', option);
  }
}