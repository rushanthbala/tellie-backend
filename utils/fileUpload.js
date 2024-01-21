const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const express = require("express");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // No larger than 50mb, change as you need
  },
});
const generationMatchPrecondition = 0;

const deleteOptions = {
  ifGenerationMatch: generationMatchPrecondition,
};

let projectId = process.env.PROJECT_ID; // Get this from Google Cloud
let keyFilename = process.env.KEYFILENAME; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket(process.env.BUCKET_NAME); // Get this from Google Cloud -> Storage

const fileUpload = async (fileName, buffer) => {
  const blob = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const blobStream = blob.createWriteStream();
    // const link = blob
    // console.log(link,"links");
    blobStream.on("finish", () => {
      console.log("Success");
      resolve({ status: 200, message: "Success", link: fileName });
    });

    blobStream.on("error", (error) => {
      console.error(error);
      reject({ status: 500, message: error });
    });

    blobStream.end(buffer);
  });
};
// still work on it
async function deleteFile(link) {
  const fulllink = link;

  // Use the URL constructor to parse the URL
  const url = new URL(fulllink);

  // Access the pathname property to get the filename
  const validFileName = "BalendranRushanth_jan_2024.pdf";
  const fileName = String(validFileName);

  console.log(fileName);
  try {
    // Deletes the file from the bucket
    await storage.bucket(bucket).file(fileName).delete();

    // console.log(`File gs://${bucket}/${fileName} deleted`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
// const fileUpload =;

module.exports = { fileUpload, multer, bucket, deleteFile };
