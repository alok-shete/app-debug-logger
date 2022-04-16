const Logger = require("./../dist/index").default;
const LOG = new Logger({});

LOG.on(LOG.id, function (e) {
  console.log(e);
});

LOG.info("demo", "smkmlkmslm");
LOG.info("demo", "smkmlkmslm");
LOG.info("demo", "smkmlkmslm");
