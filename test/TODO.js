const EventEmitter = require("events");

const parseDate = (fullDate) => {
  const d = new Date(fullDate);
  const date = d.toISOString().split("T")[0];
  const hour = `0${d.getHours()}`.slice(-2);
  const min = `0${d.getMinutes()}`.slice(-2);
  const sec = `0${d.getSeconds()}`.slice(-2);
  return `${date} ${hour}:${min}:${sec}`;
};

const printConsoleLog = (payload) => {
  const { type, moduleName, message, loggedAt } = payload;

  /**
   * log text color content
   */
  const logColor = {
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

const Logger = (function LoggerModule() {
  let instances = []; // array of objects of instances variables
  function Logger(value) {
    this._init();
    this._set("value", value);
    this._set("eventEmitter", new EventEmitter());
  }

  const createEvent = (instance, event, payload) => {
    // console.log(ref.currentInstance.eventEmitter);
    const currentInstance = instances[instance];
    currentInstance.eventEmitter.emit(`${instance}`, { event, payload });
    // console.log(instances[instance]);
  };

  const LoggerFunctions = (instance) => {
    const logTypes = ["debug", "error", "info", "warn"];
    functionObj = {};
    logTypes.forEach((type) => {
      functionObj = {
        ...functionObj,
        [type]: (moduleName, message) => {
          const payload = {
            type,
            loggedAt: new Date(),
            moduleName,
            message,
          };
          printConsoleLog(payload);
          createEvent(instance, "log", payload);
        },
      };
    });
    return functionObj;
  };

  Logger.prototype = {
    // create new instance
    _init: function () {
      this.instance = instances.length;
      instances.push({ instance: this.instance });
      this.currentInstance = instances[this.instance];
    },

    // get instances variable
    _get: function (prop) {
      return this.currentInstance[prop];
    },

    // set instances variable
    _set: function (prop, value) {
      return (this.currentInstance[prop] = value);
    },

    // remove instances variables
    _destroy: function () {
      this.currentInstance.eventEmitter.removeAllListeners();
      delete instances[this.instance];
    },

    on: function (callback) {
      this.currentInstance.eventEmitter.on(`${this.instance}`, callback);
    },

    debug: function (_moduleName, _message) {},
    error: function (_moduleName, _message) {},
    info: function (_moduleName, _message) {},
    warn: function (_moduleName, _message) {},

    ...LoggerFunctions(instances.length),
  };

  console.log(Logger.prototype);

  return Logger;
})();

let a = new Logger("foo");

a.on(function (e) {
  console.log(e);
});

a.error("demo", "dee");
a.debug("demo", "dee");
a.info("demo", "dee");

a.warn("demo", "dee");

a.error("demo", "dee");

a.error("demo", "dee");
