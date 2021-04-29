export default function() {
  this.listByteInMemory[ this.indexMemoryWriteTo++ ] = this.getInstructionCode( 'RET' );
}