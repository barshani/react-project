const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
         minlength: 3,
        maxlength: 256,
    },
    subtitle: {
        type: String,
        require: true,
         minlength: 3,
        maxlength: 256,
    },
    description: {
        type: String,
        require: true,
         minlength: 3,
    },
    phone: {
        type: String,
        require: true,
         minlength: 10,
        maxlength: 13,
    },
    email: {
        type: String,
        require: true,
         minlength: 5,
        maxlength: 256,
    },
    web: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    imageALT: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
        require: true,
         minlength: 3,
        maxlength: 1024,
    },
    city: {
        type: String,
        require: true,
         minlength: 3,
        maxlength: 1024,
    },
    street: {
        type: String,
        require: true,
         minlength: 3,
        maxlength: 1024,
    },
    houseNum: {
        type: String,
        require: true,
         minlength: 1,
        maxlength: 1024,
    },
    zip: {
        type: String,
    },
    createdBy: {
        type: String,
    },
});

const Card = mongoose.model('Cards', cardSchema);

exports.Card = Card;