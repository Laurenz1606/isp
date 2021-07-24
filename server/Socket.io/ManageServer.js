const schedule = require("node-schedule");
const os = require("os");
const nodeDiskInfo = require("node-disk-info");

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + ":" : "";
  var hDisplay = h > 0 ? h + ":" : "";
  var mDisplay = m > 0 ? m + ":" : "";
  var sDisplay = s > 0 ? s + "" : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

module.exports = (io) => {
  const job = schedule.scheduleJob("*/5 * * * * *", function () {
    io.in("data").emit("server/data", {
      memory: {
        free: os.freemem(),
        full: os.totalmem(),
      },
      hostname: os.hostname(),
      diskSpache: nodeDiskInfo.getDiskInfoSync().filter((disk) => disk.filesystem === "/dev/sda2")[0],
      avg: os.loadavg(),
      uptime: secondsToDhms(os.uptime()),
      version: os.version(),
    });
  });
  io.on("connection", (socket) => {
    socket.on("server/get", async () => {
      socket.join("data");
      socket.emit("server/data", {
        memory: {
          free: os.freemem(),
          full: os.totalmem(),
        },
        hostname: os.hostname(),
        diskSpache: nodeDiskInfo.getDiskInfoSync().filter((disk) => disk.filesystem === "/dev/sda2")[0],
        avg: os.loadavg(),
        uptime: secondsToDhms(os.uptime()),
        version: os.version(),
      });
    });
  });
};
