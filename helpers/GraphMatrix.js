const _ = require('lodash');

class GraphMatrix {
  constructor(x, y, value) {
    this.matrix = {};

    if (arguments.length > 0) {
      this.set(x, y, value);
    }
  }

  get(x, y) {
    return this.matrix[`${x}#${y}`];
  }

  has(x, y) {
    return !_.isUndefined(this.get(x, y));
  }

  set(x, y, value) {
    this.matrix[`${x}#${y}`] = value;
  }

  increment(x, y) {
    const value = this.get(x, y) || 0;
    this.set(x, y, value + 1);
  }

  findCoordinates(value) {
    const entry = Object.entries(this.matrix).find(entry => entry[1] === value);
    if (!entry) {
      return {};
    }

    const [y, x] = entry[0].split('#').map(n => +n);
    return { x, y };
  }

  entries() {
    return Object.entries(this.matrix);
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  fillMissing(missingChar) {
    let maxX = 0;
    let maxY = 0;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;

    Object.keys(this.matrix).forEach(key => {
      let [x, y] = key.split('#').map(n => +n);
      maxX = Math.max(x, maxX);
      minX = Math.min(x, minX);
      maxY = Math.max(y, maxY);
      minY = Math.min(y, minY);
    });

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        let noValue = !this.has(x, y);
        if (noValue) {
          this.set(x, y, missingChar);
        }
      }
    }
  }


  print(replaces = {}) {
    let maxX = 0;
    let maxY = 0;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;

    Object.keys(this.matrix).forEach(key => {
      let [x, y] = key.split('#').map(n => +n);
      maxX = Math.max(x, maxX);
      minX = Math.min(x, minX);
      maxY = Math.max(y, maxY);
      minY = Math.min(y, minY);
    });

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        let val = this.get(x, y);
        if (replaces.hasOwnProperty(val)) {
          val = replaces[val];
        }

        process.stdout.write((val || ' ').toString())
      }
      console.log();
    }

  }
}

module.exports = GraphMatrix;
