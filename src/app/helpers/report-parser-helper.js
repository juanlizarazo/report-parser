const CENTS_IN_A_DOLLAR = 100;

class ReportParserHelper {
    static getType(code, subCode) {
        const parsedCode = Number.parseInt(code, 10);
        const parsedSubCode = Number.parseInt(subCode, 10);

        if (parsedCode === 10 && (parsedSubCode === 12 || parsedSubCode ===15)) {
            return 'mortgage';
        }
    }

    static processMonetaryValue(value = '') {
        const valueWithoutDollarSign = value.replace('$', '');
        return Number.parseFloat(valueWithoutDollarSign) * CENTS_IN_A_DOLLAR;
    }
}

module.exports = { ReportParserHelper };
