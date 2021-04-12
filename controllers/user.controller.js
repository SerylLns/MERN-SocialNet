const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  console.log("index");
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log("show");
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id);
  }
  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data)
    else console.log('ID unknown : ' + req.params.id);
  }).select('-password');
};