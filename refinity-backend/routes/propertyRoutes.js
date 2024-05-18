const express = require('express');
const router = express.Router();
const {
    addProperty,
    getProperties,
    getProperty,
    updateProperty,
    deleteProperty,
    getOwnerProperty,

} = require('../controllers/propertyController');
const auth = require('../middleware/auth');

router.post('/', auth, addProperty);
router.get('/', getProperties);
router.get('/:id', getProperty);
router.get('/owner/:id', getOwnerProperty);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

module.exports = router;
