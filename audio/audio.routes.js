const express = require("express");
const router = express.Router();
const {
  getSingle,
  getAll,
  deleteSinle,
  updateDocument,
  Create,
} = require("./audio.controller");
const { fileUpload, multer } = require("../utils/fileUpload");
const { Storage } = require("@google-cloud/storage");

//Get all
router.get("/", getAll);

//Get a single document
router.get("/:id", getSingle);

//POST a new document

//Delete a  document
router.delete("/:id", deleteSinle);

//Update a document
router.patch(
  "/:id",
  multer.fields([
    { name: "thumnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  updateDocument
);

// Streams file upload to Google Storage
router.post(
  "/upload",
  multer.fields([
    { name: "thumnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  Create
);

//still work on it
// router.delete('/upload/:id',deleteSinleUpload)

module.exports = router;
