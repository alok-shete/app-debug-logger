const { Logger } = require("./../dist/");

const LOG = new Logger({
  id: "demo",
  isEventLog: true,
  consoleLog: ["error", "info"],
  isProduction: false,
});

console.log(LOG);

LOG.on(LOG.id, function (e) {
  console.log(e);
});

LOG.info("demo", "smkmlkmslm");
