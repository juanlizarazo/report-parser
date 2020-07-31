const { ITEM_TYPES } = require('../constants');
const DEFAULT_HOUSING_EXPENSE = 106100;

module.exports.ReportOutput = class ReportOutput {
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
};
