const { ReportParserHelper } = require('./helpers');

const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { ITEM_TYPES } = require('./constants');

const reportPath = path.resolve(__dirname, './report.txt');
const readStream = fs.createReadStream(reportPath);

const output = {
  get fixed_expenses_before_education() {
    return 0;
  },
  tradelines: []
};

const DEFAULT_HOUSING_EXPENSE = 1061;

class ReportOutput {
  constructor() {
    this._housingExpenses = 0;
    this._nonHousingExpenses = 0;
    this._tradeLines = [];
  }

  get fixed_expenses_before_education() {
    if (this._housingExpenses === 0) {
      return this._nonHousingExpenses + DEFAULT_HOUSING_EXPENSE;
    }

    return this._nonHousingExpenses + this._housingExpenses;
  }

  addTradeLine(tradeLine) {
    this._tradeLines.push(tradeLine);
    this._updateFixedExpensesBeforeEducation(tradeLine);
  }

  toJSON() {
    return {
      fixed_expenses_before_education: this.fixed_expenses_before_education,
      tradelines: this._tradeLines
    };
  }

  _updateFixedExpensesBeforeEducation(tradeLine) {
    if (tradeLine.current_balance === 0) {
      return;
    }

    if (tradeLine.type === ITEM_TYPES.mortgage.display) {
      this._housingExpenses += tradeLine.monthly_payment;
    }

    if (tradeLine.type === ITEM_TYPES.other.display) {
      this._nonHousingExpenses += tradeLine.monthly_payment;
    }
  }
}

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
