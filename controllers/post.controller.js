const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
  PostModel.find((err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log("error to get data" + err);
    }
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      // if (
      //   req.file.detectedMimeType != "image/jpg" ||
      //   req.file.detectedMimeType != "image/png" ||
      //   req.file.detectedMimeType != "image/jpeg "
      // ) {
      //   throw Error("Invalid file");
      // }
      if (req.file.size > 500000) throw Error("max size");
    } catch (error) {
      console.log(error);
      const errors = uploadErrors(error);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log("Update error :" + err);
      }
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  PostModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log("Delete error :" + err);
    }
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (error) {
    res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (error) {
    res.status(400).send(err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) {
          return res.send(data);
        } else {
          return res.status(400).send(err);
        }
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    return PostModel.findById(req.params.id, (err, data) => {
      const theComment = data.comments.find((comment) => {
        return comment._id.equals(req.body.commentId);
      });
      console.log(theComment);
      if (!theComment) {
        return res.status(404).send("Comment not found");
      }
      theComment.text = req.body.text;
      return data.save((err) => {
        if (!err) return res.status(200).send(data);
        else return res.status(500).send(err);
      });
    });
  } catch (error) {
    return res.status(500).send(err);
  }
};
module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  }
};
