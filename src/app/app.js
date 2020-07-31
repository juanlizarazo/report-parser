const fs = require('fs');
const readline = require('readline');
const path = require('path');

const { ReportOutput } = require('./models');
const { ReportParserHelper } = require('./helpers');

module.exports.App = class App {
  constructor() {
    this.reportOutput = new ReportOutput();
  }

  processReport() {
    const reportPath = path.resolve(__dirname, './report.txt');
    const readStream = fs.createReadStream(reportPath);

    this.readInterface = readline.createInterface({
      input: readStream,
      console: false
    });

    this.readInterface.on('line', line => this._processLine(line));
    this.readInterface.on('error', err => console.log(err));

    return new Promise(resolve => {
      this.readInterface.on('close', () => resolve(this.reportOutput));
    });
  }

  _processLine(line) {
    console.log(`Parsing  ${line}`);

    const parsedLine = ReportParserHelper.getTradeLine(line);

    if (parsedLine) {
      this.reportOutput.addTradeLine(parsedLine);
    }
  }
}
