const { ITEM_TYPES } = require("../constants");

const CENTS_IN_A_DOLLAR = 100;

class ReportParserHelper {
  static getType(code, subCode) {
    const parsedCode = Number.parseInt(code, 10);
    const parsedSubCode = Number.parseInt(subCode, 10);

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

  static processMonetaryValue(value = "") {
    const valueWithoutDollarSign = value.replace("$", "");
    return Number.parseFloat(valueWithoutDollarSign) * CENTS_IN_A_DOLLAR;
  }
}

module.exports = { ReportParserHelper };
