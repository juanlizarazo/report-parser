const { ReportParserHelper } = require('./report-parser-helper');

describe('report-parser-helper.js', () => {
  beforeEach(() => {
    spyOn(console, 'error');
  });

  describe('getTradeLine()', () => {
    it('builds trade line', () => {
      const result = ReportParserHelper.getTradeLine('2019-10-10 5 1 $431.98 $51028.00');

      expect(result).toEqual({
        type: 'education',
        monthly_payment: 43198,
        current_balance: 5102800
      });
    });

    it('skips trade line that is older than one year old', () => {
      const result = ReportParserHelper.getTradeLine('2019-08-03 5 1 $431.98 $51028.00');

      expect(result).toEqual(null);
    });

    it('includes trade line that is less than one year old', () => {
      const result = ReportParserHelper.getTradeLine('2019-08-07 5 1 $431.98 $51028.00');

      expect(result).toEqual({
        type: 'education',
        monthly_payment: 43198,
        current_balance: 5102800
      });
    });

    it('skips bad line', () => {
      const result = ReportParserHelper.getTradeLine('2015-10-10 5 1 $431.98$51028.00');
      expect(result).toBe(null);
    });

    it('handles exception', () => {
      const result = ReportParserHelper.getTradeLine(undefined);
      expect(result).toBe(null);
    });
  });

  describe('getType()', () => {
    it('returns mortgage for code 10 and subCode 12', () => {
      const result = ReportParserHelper.getType(10, 12);
      expect(result).toBe('mortgage');
    });

    it('returns mortgage for code 10 and subCode 15', () => {
      const result = ReportParserHelper.getType(10, 15);
      expect(result).toBe('mortgage');
    });

    it('returns does not return mortgage for code 10 and other subCodes', () => {
      const result = ReportParserHelper.getType(10, 100);
      expect(result).not.toBe('mortgage');
    });

    it('returns education for code 5', () => {
      const result = ReportParserHelper.getType(5);
      expect(result).toBe('education');
    });

    it('returns other for any other code', () => {
      const result = ReportParserHelper.getType(500);
      expect(result).toBe('other');
    });
  });

  describe('processMonetaryValue()', () => {
    it('returns expected format', () => {
      const result = ReportParserHelper.processMonetaryValue('51028.00');

      expect(result).toBe(5102800);
    });

    it('removes supports dollar sign in input', () => {
      const result = ReportParserHelper.processMonetaryValue('$51028.00');

      expect(result).toBe(5102800);
    });

    it('supports thousand commas', () => {
      const result = ReportParserHelper.processMonetaryValue('51,028.00');

      expect(result).toBe(5102800);
    });
  });
});
