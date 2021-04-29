// Move Register into Register
export default function () {
  const literal = this.getMem16BitAtIp();
  this.pushToStack( literal );
}