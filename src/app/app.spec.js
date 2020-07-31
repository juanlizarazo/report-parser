const { ReportOutput } = require('./models');
const { App } = require('./app');

describe('app', () => {
  describe('processReport()', () => {
    it('processes report and returns report output instance', async done => {
      const app = new App();
      const report = await app.processReport();

      expect(report instanceof ReportOutput).toBe(true);
      done();
    });
  });
});
