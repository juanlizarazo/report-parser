const { ReportParserHelper } = require('./report-parser-helper');

describe('report-parser-helper.js', () => {
  // describe('getTradeLine()', () => {
  //   ReportParserHelper.getTradeLine();
  // });

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

  // describe('processMonetaryValue()', () => {
  //   ReportParserHelper.processMonetaryValue();
  // });
});
