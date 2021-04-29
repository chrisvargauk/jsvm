export default class MemoryMapper {
  constructor() {
    this.listRegion = [];
    this.byteLength = 0;
  }

  map(device, start, end, isRemapped = false) {
    const region = {
      device,
      start,
      end,
      isRemapped
    };

    this.byteLength = this.byteLength < end ? end : this.byteLength;

    this.listRegion.unshift( region );

    return () => {
      this.listRegion = this.listRegion.filter(x => x !== region);
    }
  }

  findRegion( address) {
    for (let indexListRegion = 0; indexListRegion < this.listRegion.length; indexListRegion++) {
      const region = this.listRegion[indexListRegion];

      if (  region.start <= address &&
            address <= region.end
      ) return region;
    }

    throw `Error: No Memory Region found for address "${address}".`;
  }

  getUint8( address ) {
    const region = this.findRegion( address );

    const addressFinal = region.isRemapped ?
      address - region.start :
      address;

    return region.device.getUint8( addressFinal );
  }

  getUint16( address ) {
    const region = this.findRegion( address );

    const addressFinal = region.isRemapped ?
      address - region.start :
      address;

    return region.device.getUint16( addressFinal );
  }

  setUint8( address, value ) {
    const region = this.findRegion( address );

    const addressFinal = region.isRemapped ?
      address - region.start :
      address;

    return region.device.setUint8( addressFinal, value );
  }

  setUint16( address, value ) {
    const region = this.findRegion( address );

    const addressFinal = region.isRemapped ?
      address - region.start :
      address;

    return region.device.setUint16( addressFinal, value );
  }
}