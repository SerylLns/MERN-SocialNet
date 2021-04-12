const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpeg "
    ) {
      throw Error("Invalid file");
    }
    if (req.file.size > 500000) throw Error("Max size");
  } catch (error) {
    const errors = uploadErrors(error);
    return res.status(201).json({errors});
  }

  const fileName = req.body.name + ".jpg";
  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  )
  try {
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $set: { picture: "./upload/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(500).send({ message: err });
      }
      
    )
  } catch (err) {
    return res.status(500).send({ message: err });
  }

};
