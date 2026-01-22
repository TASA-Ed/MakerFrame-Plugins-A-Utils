.pragma library

// 日志级别枚举
const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4
};

// Logger类
class Logger {
  constructor(name = "App", minLevel = LogLevel.INFO) {
    this.name = name;
    this.minLevel = minLevel;
  };

  // 格式化消息
  _formatMessage(level, ...args) {
    const timestamp = Qt.formatDateTime(new Date(), "yyyy-MM-dd hh:mm:ss.zzz");
    const name = `[${this.name}]`;

    // 将所有参数转换为字符串
    const message = args.map(arg => {
      const str = String(arg);
      try {
        if (arg === null) return "null";
        if (arg === undefined) return "undefined";
        if (typeof arg === "string") return arg;
        if (typeof arg === "number" || typeof arg === "boolean") return str;

        // 处理 [object Object]
        if (typeof arg === "object" && str.includes('[object Object]')) {
          try {
            // 检测循环引用
            const seen = new WeakSet();
            return JSON.stringify(arg, (key, val) => {
              if (typeof val === "object" && val !== null) {
                if (seen.has(val)) {
                  return "[Circular]";
                }
                seen.add(val);
              }
              return val;
            }, 2);
          } catch (e) {
            return str;
          }
        }

        return str;
      } catch (e) {
        return str;
      }
    }).join(' ');

    return `${timestamp} ${name} ${message}`;
  };

  // 核心日志方法
  _log(level, ...args) {
    if (level < this.minLevel) return;

    const formattedMsg = this._formatMessage(level, ...args);

    // 根据级别选择控制台方法
    switch (level) {
      case LogLevel.DEBUG:
        console.log(formattedMsg);
        break;
      case LogLevel.INFO:
        console.info(formattedMsg);
        break;
      case LogLevel.WARN:
        console.warn(formattedMsg);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(formattedMsg);
        break;
      default:
        console.log(formattedMsg);
    }
  };

  // 公共日志方法
  debug(...args) {
    this._log(LogLevel.DEBUG, ...args);
  };

  info(...args) {
    this._log(LogLevel.INFO, ...args);
  };

  warn(...args) {
    this._log(LogLevel.WARN, ...args);
  };

  error(...args) {
    this._log(LogLevel.ERROR, ...args);
  };

  fatal(...args) {
    this._log(LogLevel.FATAL, ...args);
  };

  // 设置日志级别
  setMinLevel(level) {
    this.minLevel = level;
  };

  // 创建子Logger
  child(childName) {
    return new Logger(`${this.name}.${childName}`, this.minLevel);
  };

  // 时间分析
  time(label) {
    if (!this._timers) this._timers = {};
    this._timers[label] = Date.now();
  }

  timeEnd(label) {
    if (!this._timers || !this._timers[label]) {
      this.warn(`Timer '${label}' does not exist`);
      return;
    }
    const duration = Date.now() - this._timers[label];
    if (this.minLevel === 0) this.info(`${label}: ${duration}ms`);
    else this.debug(`${label}: ${duration}ms`);
    delete this._timers[label];
  }
}

// 创建默认Logger实例
const defaultLogger = new Logger("Default");

// 导出便捷方法
function debug(...args) {
  defaultLogger.debug(...args);
}

function info(...args) {
  defaultLogger.info(...args);
}

function warn(...args) {
  defaultLogger.warn(...args);
}

function error(...args) {
  defaultLogger.error(...args);
}

function fatal(...args) {
  defaultLogger.fatal(...args);
}

function time(label) {
  defaultLogger.time(label);
}

function timeEnd(label) {
  defaultLogger.timeEnd(label);
}

/**
 * createLogger
 * @param name 命名空间
 * @param minLevel 最小输出等级
 * @return Logger 类
 * */
function createLogger(name, minLevel = LogLevel.INFO) {
  return new Logger(name, minLevel);
}
