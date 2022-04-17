// const https = require('https');
const loggerCurrentVersion = require('./../package.json').version;
// const packageJsonPath = require('./../package.json').repository.path;

/**
 * get package json
 * @returns
 */
const getPackagesJson = function() {
  // let options = {
  //   host: 'api.github.com',
  //   path: packageJsonPath,
  //   method: 'GET',
  //   headers: { 'user-agent': 'node.js' },
  // };
  return new Promise(function(resolve) {
    // let request = https.request(options, function(response: any) {
    //   let body = '';
    //   response.on('data', function(chunk: any) {
    //     body += chunk.toString('utf8');
    //   });
    //   response.on('end', function() {
    //     try {
    //       let content = JSON.parse(body).content;
    //       let buf = Buffer.from(content, 'base64');
    //       let packageJson = JSON.parse(buf.toString());
    //       resolve(packageJson);
    //     } catch (err) {
    //       reject(err);
    //     }
    //   });
    // });
    // request.end();
    // request.on('error', function(err: any) {
    //   reject(err);
    // });
    resolve({});
  });
};
/**
 * parse data info
 * @param {Date} fullDate
 * @returns {string} formatted date
 */
const parseDate = (fullDate: Date) => {
  const d = new Date(fullDate);
  const date = d.toISOString().split('T')[0];
  const hour = `0${d.getHours()}`.slice(-2);
  const min = `0${d.getMinutes()}`.slice(-2);
  const sec = `0${d.getSeconds()}`.slice(-2);
  return `${date} ${hour}:${min}:${sec}`;
};

/**
 * print log on console
 * @param payload
 */
const printConsoleLog = (payload: any) => {
  const { type, moduleName, message, loggedAt } = payload;

  /**
   * log text color content
   */
  const logColor: any = {
    info: '\x1b[36m%s\x1b[0m',
    success: '\x1b[32m%s\x1b[0m',
    error: '\x1b[31m%s\x1b[0m',
    warn: '\x1b[33m%s\x1b[0m',
  };

  /**
   * create log string
   */
  const log = `${parseDate(
    loggedAt
  )} : [${type.toUpperCase()}] : ${moduleName} - ${message}`;

  /**
   * print log
   */
  if (logColor[type]) {
    console.log(logColor[type], log);
  } else {
    console.log(log);
  }
};

const versionToNumber = (version: string) => {
  const versionArr =
    version.split('.').length === 3 ? version.split('.') : ['0', '0', '0'];
  let [major, minor, patch] = versionArr.map(versionNumber => {
    return `0000${versionNumber}`;
  });

  const numVersion = `${major.slice(major.length - 4)}${minor.slice(
    minor.length - 3
  )}${patch.slice(patch.length - 2)}`;

  return Number(numVersion) || 0;
};

const validateLoggerConfig = (config: {
  id?: 'logger_event' | undefined;
  isEventLog?: false | undefined;
  consoleLog?: string[] | undefined;
  isProduction?: false | undefined;
}) => {
  const {
    id = 'logger_event',
    isEventLog = false,
    consoleLog = ['info', 'error', 'warn', 'success', 'debug'],
    isProduction = false,
  } = config;

  const validConfig: {
    id?: 'logger_event';
    isEventLog?: false;
    consoleLog?: string[];
    isProduction?: false;
  } = config;

  if (typeof id !== 'string') {
    validConfig.id = 'logger_event';
  }
  if (typeof isEventLog !== 'boolean') {
    validConfig.isEventLog = false;
  }
  if (typeof isProduction !== 'boolean') {
    validConfig.isProduction = false;
  }
  if (!Array.isArray(consoleLog)) {
    validConfig.consoleLog = ['info', 'error', 'warn', 'success', 'debug'];
  }

  return validConfig;
};

export default {
  getPackagesJson: getPackagesJson,
  printConsoleLog: printConsoleLog,
  loggerCurrentVersion: loggerCurrentVersion,
  versionToNumber: versionToNumber,
  validateLoggerConfig: validateLoggerConfig,
};
