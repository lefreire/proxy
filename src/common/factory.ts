import Analytics = require("./analytics");
import Logger    = require("./logger");

declare var Config: any;

/**
 * Factory Helper
 *
 * Factories main objects to help decoupling the code
 */
class Factory {

    /**
     * Gets a new Logger instance
     * @param filePath Log file path
     * @param flag Log flag (default: RUNTIME)
     * @returns {Logger}
     */
    public static getLogger(filePath?: string, flag?: string): Logger {
        if (!filePath) filePath = Config.log.runtime;
        if (!flag) flag = "";
        return new Logger(filePath, flag);
    }

    /**
     * Gets a new Logger instance to log runtime messages
     * @returns {Logger}
     */
    public static getRuntimeLogger(): Logger {
        var runtimeLogPath: string = Config.log.runtime;
        return Factory.getLogger(runtimeLogPath, 'RUNTIME');
    }

    /**
     * Gets a new Logger instance to log server messages
     * @returns {Logger}
     */
    public static getServerLogger(): Logger {
        var serverLogPath: string = Config.log.server;
        return Factory.getLogger(serverLogPath, 'SERVER');
    }
    
    public static getAnalytics(enable: boolean): Analytics {
        var config: any = Config.analytics;
        return (enable)? new Analytics(config.ua, config.host) : new Analytics();
    }
}
export = Factory;