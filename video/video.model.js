const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumnail: {
      type: String,
      required: true,
    },
    videoLink: {
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

module.exports = mongoose.model("video", videoSchema);
