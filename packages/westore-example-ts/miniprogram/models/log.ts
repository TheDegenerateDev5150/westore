import * as util from "../utils/util";

export interface LogItem {
  data: string
  timeStamp: string | number
}

export class Log {
  logs: LogItem[];
  constructor() {
    this.logs = [];
  }

  loadLogs() {
    this.logs = (wx.getStorageSync("logs") || []).map(
      (log: string | number) => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log,
        };
      }
    );
  }
}
