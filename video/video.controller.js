//Workout Model imported
const currentPathModel = require("./video.model");
const categaryModel = require("../category/category.model");

const mongoose = require("mongoose");
const { fileUpload, bucket, deleteFile } = require("../utils/fileUpload");
// get all
const getAll = async (req, res) => {
  const dbmodel = await currentPathModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(dbmodel);
};

// get a single
const getSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  const dbmodel = await currentPathModel.findById(id);

  if (!dbmodel) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  res.status(200).json(dbmodel);
};

// delete a currentPathModel
const deleteSinle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  const dbmodel = await currentPathModel.findOneAndDelete({ _id: id });

  if (!dbmodel) {
    return res.status(400).json({ error: "No Such Volunteer Job" });
  }

  res.status(200).json(dbmodel);
};

// update a workout
const updateDocument = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  try {
    const existingCategary = await categaryModel.findOne({
      _id: req.body.categaryID,
    });
    if (!existingCategary) {
      res.status(400).json({ error: "categary ID not found" });
      return;
    }
    if (req.file) {
      // The "thumnail" field is present, handle the file upload logic here
      console.log("File found, trying to upload...");
      const response = await fileUpload(req.file.originalname, req.file.buffer);
      let thumnail = "https://storage.googleapis.com/tellie/" + response.link;
      //   res.status(response.status).send("https://storage.googleapis.com/tellie/"+response.link);
      try {
        // const dbmodel = await currentPathModel.create(req.body,...thumnail);
        const ActalModel = await currentPathModel.findByIdAndUpdate(
          { _id: id },
          {
            ...req.body,
            thumnail,
          },
          { new: true }
        );

        if (!ActalModel) {
          return res.status(400).json({ error: "No Such Workout" });
        }

        res.status(200).json(ActalModel);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      const ActalModel = await currentPathModel.findByIdAndUpdate(
        { _id: id },
        {
          ...req.body,
        },
        { new: true }
      );

      if (!ActalModel) {
        return res.status(400).json({ error: "No Such Workout" });
      }

      res.status(200).json(ActalModel);
    }
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

const Create = async (req, res) => {
  console.log("Made it /upload");

  try {
    const existingCategary = await categaryModel.findOne({
      _id: req.body.categaryID,
    });
    if (!existingCategary) {
      res.status(400).json({ error: "categary ID not found" });
      return;
    }

    if (req.file) {
      console.log("File found, trying to upload...");
      const response = await fileUpload(req.file.originalname, req.file.buffer);
      let thumnail = "https://storage.googleapis.com/tellie/" + response.link;
      //   res.status(response.status).send("https://storage.googleapis.com/tellie/"+response.link);
      try {
        // const dbmodel = await currentPathModel.create(req.body,...thumnail);
        const dbmodel = await currentPathModel.create({
          ...req.body,
          thumnail,
        });

        res.status(200).json(dbmodel);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      throw "Error with image";
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getSingle,
  getAll,
  deleteSinle,
  updateDocument,
  Create,
};
