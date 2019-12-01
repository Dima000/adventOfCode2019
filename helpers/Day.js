let path = require('path');
const { logResult } = require(path.join(__dirname, 'general'));
const readFile = require(path.join(__dirname, 'readFile'));

class Day {
  constructor(dayNumber, isTest) {
    this.dayNumber = dayNumber;
    this.isTest = isTest;

    this.init();
  }

  init() {
    const fileName = this.isTest ? 'input.test.txt' : 'input.txt';
    let inputPath = path.join(__dirname, '..', 'days', `day${this.dayNumber}`, fileName);

    this.data = readFile(inputPath);
  }

  task(taskNumber, callback) {
    console.time(`Time task ${taskNumber}`);
    logResult(callback(this.data), taskNumber);
    console.timeEnd(`Time task ${taskNumber}`);
    console.log();
  }
}

module.exports = Day;