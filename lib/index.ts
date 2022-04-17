import * as EventEmitter from "events";
import common from "./common";

const {
  printConsoleLog,
  loggerCurrentVersion,
  getPackagesJson,
  versionToNumber,
} = common;

export default class Logger extends EventEmitter {
  id: any;
  constructor(config: any) {
    super();
    const { id = "logger_event" } = config;
    this.id = id;

    console.log("*** Welcome in App Logger ***");
    console.log("*** Current Version : ", loggerCurrentVersion);

    let loggerLiveVersion = "0.0.0";
    getPackagesJson()
      .then((res: any) => {
        const packageJsonVersion = res.version ?? "0.0.0";
        loggerLiveVersion = packageJsonVersion;

        console.log(loggerLiveVersion);

        if (
          versionToNumber(loggerLiveVersion) >
          versionToNumber(loggerCurrentVersion)
        ) {
          this.processLog(
            "warn",
            "LOGGER",
            "*** Seems you are using old package please update ***",
            false
          );
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("err");
      });
  }

  /**
   * Create Events
   * @param {string} event
   * @param {Object} payload
   */
  private createEvent(event: string, payload: any) {
    this.emit(this.id, { event, payload });
  }

  /**
   * process log
   * @param {string} type
   * @param {string} moduleName
   * @param {string} message
   * @param {boolean} isEventEmit - default false
   */
  private processLog(
    type: string,
    moduleName: string,
    message: string,
    isEventEmit = true
  ) {
    const payload = {
      type,
      loggedAt: new Date(),
      moduleName,
      message,
    };

    printConsoleLog(payload);
    isEventEmit ? this.createEvent("log", payload) : null;
  }

  /**
   *
   * @param {string} moduleName
   * @param {string} message
   */
  debug(moduleName: string, message: string) {
    this.processLog("debug", moduleName, message);
  }

  /**
   *
   * @param {string} moduleName
   * @param {string} message
   */
  info(moduleName: string, message: string) {
    this.processLog("info", moduleName, message);
  }
  /**
   *
   * @param {string} moduleName
   * @param {string} message
   */

  success(moduleName: string, message: string) {
    this.processLog("success", moduleName, message);
  }

  /**
   *
   * @param {string} moduleName
   * @param {string} message
   */
  error(moduleName: string, message: string) {
    this.processLog("error", moduleName, message);
  }

  /**
   *
   * @param {string} moduleName
   * @param {string} message
   */
  warn(moduleName: string, message: string) {
    this.processLog("warn", moduleName, message);
  }
}
