//dependencies
const express = require("express");
const { v4 } = require("uuid");

const authenticateToken = require("./VerifyToken");

//mongodb models
const Folder = require("../Models/DocumentFolder");
const Document = require("../Models/Document");
const DocumentFolder = require("../Models/DocumentFolder");
const DocumentPreset = require("../Models/DocumentPreset");

//express config
const Route = express.Router();

Route.get("/get", authenticateToken, async (req, res) => {
  try {
    const folder = await Folder.find({ path: req.query.path });
    const allDocuments = [];
    const allFolders = [];
    const data = folder[0].data;
    for (let obj of data) {
      if (obj.type === "document") {
        allDocuments.push((await Document.find({ _id: obj.documentID }))[0]);
      }

      if (obj.type === "folder") {
        allFolders.push((await Folder.find({ _id: obj.documentID }))[0]);
      }
    }
    let newDocuments = [];
    for (let Document of allDocuments) {
      const rolesUsed = [];
      for (let role of req.user.roles) {
        if (!rolesUsed.includes(role)) {
          if (Document.roles.includes(role)) newDocuments.push(Document);
          rolesUsed.push(role);
        }
      }
      if (
        Document.owner._id === req.user._id &&
        !newDocuments.includes(Document)
      )
        newDocuments.push(Document);
    }
    res.json({ folders: allFolders, documents: newDocuments, code: 0 });
  } catch (err) {
    console.log(err);
  }
});

Route.post("/getpaths", authenticateToken, async (req, res) => {
  try {
    let newPaths = [];
    for (let path of req.body.path) {
      let newPath = await Folder.find({ _id: path });
      newPaths.push(newPath[0].name);
    }
    res.json({ code: 0, paths: newPaths });
  } catch (err) {
    console.log(err);
  }
});

Route.post("/addDoc", authenticateToken, async (req, res) => {
  const doc = await new Document({
    _id: v4(),
    name: req.body.name,
    data: req.body.preset
      ? (
          await Document.findById(req.body.preset.value)
        ).data
      : {},
    createDate: +new Date(),
    changedDate: +new Date(),
    roles: req.body.roles,
    owner: { name: req.user.name, roles: req.user.roles, _id: req.user._id },
  });
  const newDoc = await doc.save();
  const folder = await Folder.find({ path: req.query.path });
  folder[0].data = [
    ...folder[0].data,
    { type: "document", documentID: newDoc._id },
  ];
  await folder[0].save();
  res.json({ code: 0, document: newDoc });
});

Route.post("/addFolder", authenticateToken, async (req, res) => {
  const uuid = v4();
  const doc = await new Folder({
    _id: uuid,
    name: req.body.name,
    data: [],
    createDate: +new Date(),
    owner: { name: req.user.name, _id: req.user._id },
    path: req.query.path + uuid + "/",
  });
  const newDoc = await doc.save();
  const folder = await Folder.find({ path: req.query.path });
  folder[0].data = [
    ...folder[0].data,
    { type: "folder", documentID: newDoc._id },
  ];
  await folder[0].save();
  res.json({ code: 0, folder: newDoc });
});

Route.post("/rename", authenticateToken, async (req, res) => {
  req.body.data.forEach(async (data) => {
    if (data.type === "document") {
      const element = await Document.findById(data.id);
      element.name = req.body.name;
      await element.save();
    } else if (data.type === "folder") {
      const element = await DocumentFolder.findById(data.id);
      element.name = req.body.name;
      await element.save();
    }
  });
  res.json({ code: 0, data: req.body });
});

Route.post("/creeatePreset", authenticateToken, async (req, res) => {
  const preset = await new DocumentPreset({
    _id: v4(),
    presetID: req.body.data,
    name: req.body.name,
  });
  res.json({ code: 0, data: await preset.save() });
});

Route.get("/getPresets", authenticateToken, async (req, res) => {
  const presets = await DocumentPreset.find();
  res.json({ code: 0, data: presets });
});

Route.delete("/delete", authenticateToken, async (req, res) => {
  if (req.body === []) {
    res.json({ code: 0 });
    return;
  }
  deleteItems(req.body);

  function deleteItems(data) {
    data = [...data, { parent: data[0].parent }];
    let filter = [];
    try {
      data.forEach(async (element, idx) => {
        if (data.length - 1 !== idx) {
          if (element.type === "document") {
            filter.push(element.id);
            await Document.deleteOne({ _id: element.id });
            await DocumentPreset.deleteMany({ presetID: element.id });
          } else if (element.type === "folder") {
            filter.push(element.id);
            await removeChildren(element.id);
            await DocumentFolder.deleteOne({ _id: element.id });
          }
        } else {
          let parentElement;
          if (element.parent === "") {
            const x = await DocumentFolder.find({ path: "/" });
            parentElement = x[0];
          } else {
            parentElement = await DocumentFolder.findById(element.parent);
          }
          let filterData = parentElement.data;
          filter.forEach((elementid) => {
            filterData.forEach((children, idx) => {
              if (children.documentID == elementid) {
                filterData.splice(idx, 1);
              }
            });
          });
          parentElement.save();
        }
      });
    } catch (err) {
      console.log(err);
      res.json({ code: 0 });
    }
  }

  let children = [];

  async function removeChildren(id) {
    let folders = await DocumentFolder.find({
      path: { $regex: new RegExp("/" + id + "/"), $options: "" },
    });
    folders.forEach((folder) => {
      folder.data.forEach((data) => {
        if (data.type === "document") {
          children.push({ id: data.documentID, type: data.type });
        }
      });
    });
    children.forEach(async (element) => {
      await Document.deleteOne({ _id: element.id });
    });
    folders.forEach(async (element) => {
      await DocumentFolder.deleteOne({ _id: element._id });
    });
  }

  res.json({ code: 0 });
});

module.exports = Route;
