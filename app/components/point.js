const Point = function (row, col) {
  this.row = row;
  this.col = col;
};
Point.prototype.equals = function (obj) {
  if (!obj) {return false;}
  return obj.row === this.row && obj.col === this.col;
};
Point.prototype.toString = function () {return `[${this.row}, ${this.col}]`;}
export default Point;
