const express = require("express");
const Data = require("../models/data");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const fs = require("fs");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    fs.mkdirSync("./uploads", { recursive: true });
    cb(uploadError, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.post(
  "/datas",
  auth,
  uploadOptions.single("image"),
  async (req, res, next) => {
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request");

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const newData = JSON.parse(req.body.data);
    const data = new Data({
      wasteType: newData.wasteType,
      location: newData.location,
      image: `${basePath}${fileName}`,
      owner: req.user._id,
    });

    try {
      await data.save();
      res.status(201).send(data);
    } catch (e) {
      res.send(e);
    }
  }
);

router.get("/datas", auth, async (req, res) => {
  try {
    await req.user.populate("datas").execPopulate();
    res.send(req.user.datas);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/datas/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const data = await Data.findOne({ _id, owner: req.user._id });

    if (!data) {
      return res.status(404).send();
    }

    res.send(data);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/datas/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["location", "wasteType"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const data = await Data.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!data) {
      return res.status(404).send();
    }

    updates.forEach((update) => (data[update] = req.body[update]));
    await data.save();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/datas/:id", auth, async (req, res) => {
  try {
    const data = await Data.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!data) {
      res.status(404).send();
    }

    res.send(data);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
