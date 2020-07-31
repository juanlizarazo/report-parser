const { ReportParserHelper } = require('./helpers');

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const tradeLines = [];
const reportPath = path.resolve(__dirname, './report.txt');
const readStream = fs.createReadStream(reportPath);

const readInterface = readline.createInterface({
  input: readStream,
  console: false
});

readInterface.on('line', function (line) {
  console.log(`Parsing  ${line}`);

  const parsedLine = ReportParserHelper.getTradeLine(line);

  if (parsedLine) {
    tradeLines.push(parsedLine);
  }
});

readInterface.on('error', function (error) {
  console.log(error);
});

readInterface.on('close', function () {
  console.log('\n⭐️ Output:\n');
  console.log(JSON.stringify(tradeLines, null, 2));
});
