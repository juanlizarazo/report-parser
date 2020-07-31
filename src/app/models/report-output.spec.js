const { ReportOutput } = require('./index');

describe('report-output', () => {
  let reportOutput;

  beforeEach(() => {
    reportOutput = new ReportOutput();
  });

  describe('get fixed_expenses_before_education', () => {
    it('uses default housing expense if there are none', () => {
      reportOutput.addTradeLine({
        type: 'education',
        monthly_payment: 34131,
        current_balance: 14210021
      });

      expect(reportOutput.fixed_expenses_before_education).toBe(106100);
    });

    it('uses ignores tradelines with balance of 0', () => {
      reportOutput.addTradeLine({
        type: 'education',
        monthly_payment: 34131,
        current_balance: 0
      });

      expect(reportOutput.fixed_expenses_before_education).toBe(106100);
    });

    it('uses mortgage tradelines and ignores education for housing expenses', () => {
      reportOutput.addTradeLine({
        type: 'mortgage',
        monthly_payment: 34131,
        current_balance: 100
      });

      reportOutput.addTradeLine({
        type: 'mortgage',
        monthly_payment: 1000,
        current_balance: 100
      });

      reportOutput.addTradeLine({
        type: 'education',
        monthly_payment: 1000,
        current_balance: 100
      });

      expect(reportOutput.fixed_expenses_before_education).toBe(35131);
    });
  });

  describe('toJSON()', () => {
    it('serializes correct report', () => {
      reportOutput.addTradeLine({
        type: 'education',
        monthly_payment: 34131,
        current_balance: 14210021
      });
      reportOutput.addTradeLine({
        type: 'mortgage',
        monthly_payment: 234412,
        current_balance: 51232121
      });
      reportOutput.addTradeLine({
        type: 'other',
        monthly_payment: 31241,
        current_balance: 4123
      });
      reportOutput.addTradeLine({
        type: 'mortgage',
        monthly_payment: 123012,
        current_balance: 21330061
      });

      const result = reportOutput.toJSON();

      expect(result).toEqual({
        fixed_expenses_before_education: 388665,
        tradelines: [
          {
            type: 'education',
            monthly_payment: 34131,
            current_balance: 14210021
          },
          {
            type: 'mortgage',
            monthly_payment: 234412,
            current_balance: 51232121
          },
          {
            type: 'other',
            monthly_payment: 31241,
            current_balance: 4123
          },
          {
            type: 'mortgage',
            monthly_payment: 123012,
            current_balance: 21330061
          }
        ]
      });
    });
  });
});
