const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const audioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    episode: {
      type: String,
    },
    thumnail: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
    categaryID: {
      type: Schema.Types.ObjectId,
      ref: "unit",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("audio", audioSchema);
