import * as EventEmitter from "events";
const packageJson = require("./../package.json");

export default class Logger extends EventEmitter {
  id: any;
  init: () => void;
  constructor(config: any) {
    super();
    const { id = "logger_event" } = config;
    this.id = id;

    this.init = function () {
      console.log("*** Welcome in App Logger ***");
      console.log("*** Current Version : ", packageJson.version);
    };

    this.init();
  }

  /**
   * Create Events
   * @param {*} event - string
   * @param {*} payload - any
   */
  private createEvent(event: string, payload: any) {
    this.emit(this.id, { event, payload });
  }

  /**
   * parse data info
   * @param {*} fullDate
   * @returns
   */
  private parseDate = (fullDate: Date) => {
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
  private printConsoleLog(payload: any) {
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
    const log = `${this.parseDate(
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
  }

  /**
   * process log
   * @param type
   * @param moduleName
   * @param message
   */
  private processLog(type: string, moduleName: string, message: string) {
    const payload = {
      type,
      loggedAt: new Date(),
      moduleName,
      message,
    };

    this.printConsoleLog(payload);
    this.createEvent("log", payload);
  }

  debug(moduleName: string, message: string) {
    this.processLog("debug", moduleName, message);
  }

  info(moduleName: string, message: string) {
    this.processLog("info", moduleName, message);
  }

  success(moduleName: string, message: string) {
    this.processLog("success", moduleName, message);
  }

  error(moduleName: string, message: string) {
    this.processLog("error", moduleName, message);
  }

  warn(moduleName: string, message: string) {
    this.processLog("warn", moduleName, message);
  }
};
