const { ITEM_TYPES } = require('../constants');

const CENTS_IN_A_DOLLAR = 100;
const ONE_YEAR_IN_MS = 1564876800000;

module.exports.ReportParserHelper = class ReportParserHelper {
  static getType(code, subCode = null) {
    const parsedCode = Number.parseInt(code, 10);
    const parsedSubCode = subCode ? Number.parseInt(subCode, 10) : null;

    if (
      ITEM_TYPES.mortgage.codes.includes(parsedCode) &&
      ITEM_TYPES.mortgage.subCodes.includes(parsedSubCode)
    ) {
      return ITEM_TYPES.mortgage.display;
    }

    if (ITEM_TYPES.education.codes.includes(parsedCode)) {
      return ITEM_TYPES.education.display;
    }

    return ITEM_TYPES.other.display;
  }

  static processMonetaryValue(value = '') {
    const valueWithoutDollarSign = value.replace('$', '').replace(',', '');
    return Number.parseFloat(valueWithoutDollarSign) * CENTS_IN_A_DOLLAR;
  }

  static getTradeLine(line) {
    try {
      const items = line.split(' ');
      const [reportedDate, code, subCode, monthlyPayment, currentBalance] = items;

      const reportedDateObj = new Date(reportedDate);
      const reportedDateInMs = reportedDateObj.getTime();

      if (reportedDateInMs < ONE_YEAR_IN_MS) {
        return null;
      }

      if (items.length !== 5) {
        console.error('Ignoring line');
        return null;
      }

      return {
        type: ReportParserHelper.getType(code, subCode),
        monthly_payment: ReportParserHelper.processMonetaryValue(monthlyPayment),
        current_balance: ReportParserHelper.processMonetaryValue(currentBalance)
      };
    } catch (err) {
      console.error('Ignoring line', err);

      return null;
    }
  }
};
