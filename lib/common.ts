/**
 * parse data info
 * @param {Date} fullDate
 * @returns {string} formatted date
 */
const parseDate = (fullDate: Date) => {
  const d = new Date(fullDate);
  const date = d.toISOString().split("T")[0];
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
    info: "\x1b[36m%s\x1b[0m",
    success: "\x1b[32m%s\x1b[0m",
    error: "\x1b[31m%s\x1b[0m",
    warn: "\x1b[33m%s\x1b[0m",
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

const validateLoggerConfig = (config: {
  id?: "app-debug-logger" | undefined;
  isEventLog?: false | undefined;
  consoleLog?: string[] | undefined;
  isProduction?: false | undefined;
}) => {
  const {
    id = "app-debug-logger",
    isEventLog = false,
    consoleLog = ["info", "error", "warn", "success", "debug"],
    isProduction = false,
  } = config;

  const validConfig: {
    id?: "app-debug-logger";
    isEventLog?: false;
    consoleLog?: string[];
    isProduction?: false;
  } = config;

  if (typeof id !== "string") {
    validConfig.id = "app-debug-logger";
  }
  if (typeof isEventLog !== "boolean") {
    validConfig.isEventLog = false;
  }
  if (typeof isProduction !== "boolean") {
    validConfig.isProduction = false;
  }
  if (!Array.isArray(consoleLog)) {
    validConfig.consoleLog = ["info", "error", "warn", "success", "debug"];
  }

  return validConfig;
};

export default {
  printConsoleLog: printConsoleLog,
  validateLoggerConfig: validateLoggerConfig,
};
