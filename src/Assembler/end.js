export default function( listObjInstruction ) {
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = listObjInstruction[ 'END' ];
}