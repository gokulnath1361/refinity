const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/me', auth, getUser);

module.exports = router;
