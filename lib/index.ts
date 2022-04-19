import { EventEmitter } from "events";
import common from "./common";

const { printConsoleLog, validateLoggerConfig } = common;
export class Logger extends EventEmitter {
  id: string;
  isEventLog?: false;
  consoleLog?: string[];
  isProduction?: false;
  debug: Function;
  info: Function;
  error: Function;
  warn: Function;
  success: Function;

  constructor(config: {
    id?: "app-debug-logger";
    isEventLog?: false;
    consoleLog?: string[];
    isProduction?: false;
  }) {
    super();
    const {
      id = "app-debug-logger",
      isEventLog = false,
      consoleLog = ["info", "error", "warn", "success", "debug"],
      isProduction = false,
    } = validateLoggerConfig(config);
    this.id = id;
    this.isEventLog = isEventLog;
    this.consoleLog = consoleLog;
    this.isProduction = isProduction;

    console.log("*** Welcome in App Logger ***");

    this.debug = (moduleName: string, message: string) => {
      this.processLog("debug", moduleName, message);
    };
    this.info = (moduleName: string, message: string) => {
      this.processLog("info", moduleName, message);
    };
    this.error = (moduleName: string, message: string) => {
      this.processLog("error", moduleName, message);
    };
    this.warn = (moduleName: string, message: string) => {
      this.processLog("warn", moduleName, message);
    };
    this.success = (moduleName: string, message: string) => {
      this.processLog("success", moduleName, message);
    };
  }

  /**
   * Create Events
   * @param {string} event
   * @param {Object} payload
   */
  private createEvent(event: string, payload: any) {
    if (!this.isEventLog) {
      return true;
    }
    this.emit(this.id, { event, payload });

    return true;
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
    if (!this.consoleLog?.includes(type)) {
      return true;
    }
    const payload = {
      type,
      loggedAt: new Date(),
      moduleName,
      message,
    };

    if (!this.isProduction) {
      printConsoleLog(payload);
    }
    if (isEventEmit) {
      this.createEvent("log", payload);
    }

    return true;
  }
}
