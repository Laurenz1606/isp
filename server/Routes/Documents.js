//dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

//mongodb models
const Folder = require("../Models/DocumentFolder");
const Document = require("../Models/Document");

//express config
const Route = express.Router();

Route.get("/get", authenticateToken, async (req, res) => {
  try {
    const folder = await Folder.find({ path: req.query.path });
    const allDocuments = []
    const allFolders = []
    const data = folder[0].data
    for(let obj of data) {
      if(obj.type === "document") {
        allDocuments.push((await Document.find({_id: obj.documentID}))[0])
      }

      if(obj.type === "folder") {
        allFolders.push((await Folder.find({_id: obj.documentID}))[0])
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
    res.json({folders: allFolders, documents: newDocuments, code: 0 });
  } catch (err) {
    console.log(err);
  }
});

Route.post("/getpaths", authenticateToken, async (req, res) => {
  try {
    let newPaths = []
    for(let path of req.body.path) {
      let newPath = await Folder.find({_id: path})
      newPaths.push(newPath[0].name)
    }
    res.json({ code: 0, paths: newPaths})
  } catch (err) {
    console.log(err);
  }
});

Route.post("/addDoc", authenticateToken, async (req, res) => {
  const doc = await new Document({
    _id: v4(),
    name: req.body.name,
    data: {},
    createDate: +new Date(),
    changedDate: +new Date(),
    roles: req.body.roles,
    owner: { name: req.user.name, roles: req.user.roles, _id: req.user._id },
  });
  const newDoc = await doc.save()
  const folder = await Folder.find({path: req.query.path})
  folder[0].data = [...folder[0].data, {type: "document", documentID: newDoc._id}]
  await folder[0].save()
  res.json({ code: 0, document: newDoc });
});

Route.post("/addFolder", authenticateToken, async (req, res) => {
  const uuid = v4()
  const doc = await new Folder({
    _id: uuid,
    name: req.body.name,
    data: [],
    createDate: +new Date(),
    owner: { name: req.user.name, _id: req.user._id },
    path: req.query.path + uuid + "/",
  });
  const newDoc = await doc.save()
  const folder = await Folder.find({path: req.query.path})
  folder[0].data = [...folder[0].data, {type: "folder", documentID: newDoc._id}]
  await folder[0].save()
  res.json({ code: 0, folder: newDoc });
});

Route.post("/addFolder", authenticateToken, async (req, res) => {
  const doc = await new Folder({
    _id: v4(),
    name: req.body.name,
    data: [],
    createDate: +new Date(),
    owner: { name: req.user.name, _id: req.user._id },
    path: req.query.path + req.body.name,
  });
  res.json({ code: 0, document: await doc.save() });
});

Route.post("/deleteFolder", async (req, res) => {
  if(req.body.folder === undefined || req.body.folder ===  null || req.body.folder ===  "/") return res.json({})
  const start = {documentID: req.body.folder}

  removeFoldersAndFilesRecursive([start])
  const FolderGet = Folder.findById(req.body.folder)
  let path = FolderGet.path.split("/")
  const ParentFodler = await Folder.findById(path[path.length - 2])
  testForChild(req.body.folder, ParentFodler)

  async function removeFoldersAndFilesRecursive(childrens) {
    childrens.forEach(async (children) => {
      const folder = await Folder.findById(children.documentID)
      // await Folder.findById()
      if(children.documentID === req.body.folder) await Folder.deleteOne({_id: children.documentID})
      pushIDsIntoArray(folder.data)
      if(checkIfFolderHasSubFolders(folder.data)) {
        removeFoldersAndFilesRecursive(folder.data.filter(element => element.type === "folder"))
      }
      else {
        return
      }
    })
  }

  function testForChild(childId, parent) {
    let newdata = []
    parent.data.forEach(dataelement => {
      if(dataelement.type === "folder" && dataelement.documentID === childId) {
      } else {
        newdata.push(dataelement)
      }
    })
    parent.data = newdata
    parent.save()
  }

  function pushIDsIntoArray(data) {
    data.forEach(element => {
      if(element.type === "folder") Folder.deleteOne({_id: element.documentID})
      if(element.type === "document") Document.deleteOne({_id: element.documentID})
    })
  }

  function checkIfFolderHasSubFolders(data) {
    let check = false
    data.forEach((dataelement) => {
      if(dataelement.type === "folder") check = true
    })
    return check
  }
})


//authToken function
function authenticateToken(req, res, next) {
  //get the token from the header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //check if token exists
  if (token == null) return res.sendStatus(401);

  //verify user
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //user token is wrong
    if (err) return res.sendStatus(403);

    //set the user to the request.user
    req.user = user;
    next();
  });
}

module.exports = Route;
