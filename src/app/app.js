const fs = require('fs');
const readline = require('readline');
const path = require('path');

const { ReportOutput } = require('./models');
const { ReportParserHelper } = require('./helpers');

const reportPath = path.resolve(__dirname, './report.txt');
const readStream = fs.createReadStream(reportPath);
const reportOutput = new ReportOutput();

const readInterface = readline.createInterface({
  input: readStream,
  console: false
});

readInterface.on('line', function (line) {
  console.log(`Parsing  ${line}`);

  const parsedLine = ReportParserHelper.getTradeLine(line);

  if (parsedLine) {
    reportOutput.addTradeLine(parsedLine);
  }
});

readInterface.on('error', function (error) {
  console.log(error);
});

readInterface.on('close', function () {
  console.log('\n⭐️ Output:\n');
  console.log(JSON.stringify(reportOutput, null, 2));
});
