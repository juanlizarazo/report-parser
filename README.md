# report-parser

Built using node 10.

Build with JS without external packages (except for testing).

It parses a local report located in src/app/report.txt
At this time, to stay within scope, dynamic file paths through the console are not supported.
Feel free to replace `src/app/report.txt` with any other report you want to test or parse.

# Approach

Code is self documenting, it is composed by an main.js file that runs the process report method.
There's a helper to help parse the report line items and format them correctly.
The constants folder has the codes and the display names.
Some classes use private constants that are just of the concern of the class itself and I decided to encapsulate them.

# To parse report

Run `yarn` or `npm install` to install DEV dependencies. These are only needed to run unit tests.

Just run `yarn start` or `npm start` in your terminal to parse and see report output.

# To run tests

`yarn test` or `npm test` to run 16 specs, written about the given criteria.
