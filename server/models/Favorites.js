const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        require: true,
    },
    cardId: {
        type: String,
        require: true,
    },
});

const Favorite = mongoose.model('favorite', favoritesSchema);

exports.Favorite = Favorite;