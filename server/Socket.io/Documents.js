const Document = require("../Models/Document");

module.exports = (socket, io) => {
  socket.on("document/get", async (documentID) => {
    const [err, data] = await getDocument(documentID);
    socket.join(documentID);
    socket.emit("document/load", {
      data: data || {},
      err: err,
      id: documentID,
    });
    socket.on("document/change", (delta) => {
      socket.broadcast.to(documentID).emit("document/recive", delta);

    });
    socket.on("document/save", async (data) => {
      await Document.findByIdAndUpdate(documentID, { data, changedDate: + new Date() });
    });
  });
};

async function getDocument(documentID) {
  try {
    const document = await Document.findById(documentID);
    return [false, document.data];
  } catch {
    return [true, {}];
  }
}
