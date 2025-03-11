// logs.ts
import logStore from '../../stores/log-store'

Page({
  data: {
    logs: logStore.data,
  },
  onLoad() {
    logStore.bind("logPage", this);
    logStore.loadLogs();
  },
})
