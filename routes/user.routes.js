const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require('../controllers/user.controller');

// Authenticate
router.post('/register', authController.signUp);

// User DB
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);

module.exports = router;