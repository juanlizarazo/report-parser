const { App } = require('./src/app/app');

const app = new App();

app.processReport().then(reportOutput => {
  console.log('\n⭐️ Output:\n');
  console.log(JSON.stringify(reportOutput, null, 2));
});
