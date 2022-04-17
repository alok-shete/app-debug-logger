# App Debug Logger

This Package is use for debug any **Javascript Application**.   

## Logger Setup

### Import Package
##### ES5 
```
const { Logger } =  require("app-debug-logger");
```
##### ES56	
```
import { Logger } from 'app-debug-logger'
```


### Logger Config
```
const config = {
	id           : "custom-id",
	isEventLog   : true,
	consoleLog   : ['info', 'error', 'warn', 'success', 'debug'],
	isProduction : false,
}
```
|    Key       | Type      | Default Value                                   |
| :---         | :---:     | :---                                            |
| id           | `string`  | `app-debug-logger`                              |
| isEventLog   | `boolean` | `false`                                         |
| consoleLog   | `array`   | `['info', 'error', 'warn', 'success', 'debug']` |
| isProduction | `boolean` | `false`                                         |

## Initialize Logger
```
const LOG = new Logger(config);
```

## Logger Methods

| Method | Parameters             | 
| :---   | :---                   |
| debug  |  `moduleName, log`     | 
| info   |  `moduleName, log`     | 
| warn   |  `moduleName, log`     |
| sucess |  `moduleName, log`     | 
| error  |  `moduleName, log`     |
| on     |  `loggerId, callback`  |
