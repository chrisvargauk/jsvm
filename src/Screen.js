export default class Screen {
  constructor() {
    this.dScreen = document.querySelector('#screen');
    // this.dScreen.style.width = '503px';
    // this.dScreen.style.height = '140px';
    this.dScreen.style.width = '263px';

    this.dScreen.style.borderWidth = '1px';
    this.dScreen.style.borderStyle = 'solid';
    this.dScreen.style.borderColor = '#8b8b8b';
    this.dScreen.style.overflow = 'hidden';
    this.dScreen.style.color = 'white';
    this.dScreen.style.fontFamily = 'monospace';
    this.dScreen.style.fontSize = '16px';
    this.dScreen.style.padding = '10px';
    this.dScreen.style.textAlign = 'center';

    this.mapPixelAll( this.dScreen )
  }

  mapPixelAll( dScreen ) {
    this.mapPixel = [];

    for (let i = 0; i < 144; i++) {
      const dPixel = document.createElement('div');
      dPixel.style.width = '20px';
      dPixel.style.height = '20px';
      dPixel.style.float = 'left';
      // dPixel.style.backgroundColor = 'lightBlue';
      // dPixel.style.borderWidth = '1px';
      // dPixel.style.borderStyle = 'solid';
      // dPixel.style.borderColor = 'black';

      dScreen.appendChild( dPixel );

      this.mapPixel.push( dPixel );
    }
  }

  getUint8() {
    return 0;
  }

  setUint8(address, value) {
    console.log('Screen', address, value);
    this.mapPixel[ address ].innerHTML = String.fromCharCode(value);
  }

  setUint16(address, value) {
    console.log('Screen', address, value);
    this.mapPixel[ address ].innerHTML = String.fromCharCode(value);
  }
}