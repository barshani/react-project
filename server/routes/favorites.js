var express = require('express');
var router = express.Router();
const favorites = require('../controllers/favorites');

router.post('/', favorites.add);
router.get('/', favorites.getItem);
router.get('/:userEmail', favorites.getAll);
router.delete('/', favorites.delete);

module.exports = router;