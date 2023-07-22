var express = require('express');
var router = express.Router();
const cards = require('../controllers/cards');
const auth = require('../middleware/auth');

router.get('/', cards.getAll);
router.get('/:id', cards.getItem);
router.post('/', cards.add);
router.patch('/:id', cards.edit);
router.delete('/:id', cards.delete);

module.exports = router;