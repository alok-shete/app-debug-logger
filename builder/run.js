const script = require("./scripts.js");
const { exec } = require("child_process");
const args = process.argv.slice(2);

let scriptsArray = [];

const LOG = {
  warn: (str) => {
    console.log("\x1b[33m%s\x1b[0m", str);
  },
  err: (str) => {
    console.log("\x1b[31m%s\x1b[0m", str);
  },
  info: (str) => {
    console.log(str);
  },
  success: (str) => {
    console.log("\x1b[32m%s\x1b[0m", str);
  },
};

LOG.info(`\n* * * * * * * * * * * * * * * * * * * * *`);
LOG.info(`*                                       *`);
LOG.info(`*          APP DEBUG LOGGER             *`);
LOG.info(`*                                       *`);
LOG.info(`* * * * * * * * * * * * * * * * * * * * *\n`);

const sh = async (cmd) =>
  new Promise(async (resolve) => {
    const ls = await exec(cmd);
    LOG.warn(`RUNNING : ${cmd}`);
    ls.stdout.on("data", function (data) {
      LOG.info(data.toString());
    });

    ls.stderr.on("data", function (data) {
      LOG.err(data.toString());
    });

    await ls.on("exit", function (code) {
      if (!code) {
        LOG.success(`${cmd} : SUCCESS`);
      } else {
        LOG.err(`${cmd} : FAIL`);
      }
      resolve(true);
    });
  });
/**
 * get script
 */

args.forEach((arg) => {
  const result = script[arg];
  if (result) {
    if (typeof result === "string") {
      scriptsArray.push(result);
    } else {
      scriptsArray = scriptsArray.concat(result);
    }
  } else {
    LOG.err(`INVALID SCRIPT ARGUMENT : ${arg}`);
  }
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const startScript = async () => {
  await asyncForEach(scriptsArray, async (num) => {
    LOG.info(`\n* * * * * * * * * * * * * * * * * * * * * \n`);
    await sh(num);
  });

  LOG.info(`\n* * * * * * * * * * * * * * * * * * * * *`);
  LOG.info(`*                                       *`);
  LOG.info(`*    ALL SCRIPT EXECUTION COMPLETED     *`);
  LOG.info(`*                                       *`);
  LOG.info(`* * * * * * * * * * * * * * * * * * * * *\n`);
  return true;
};

if (scriptsArray.length > 0) {
  startScript();
} else {
}
