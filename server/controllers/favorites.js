const { Favorite } = require('../models/Favorites');
const joi = require('joi');

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const scheme = joi.object({
                userEmail: joi.string().required(),
            });

            const { error, value } = scheme.validate({userEmail: req.params.userEmail});

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await Favorite.find({ userEmail: value.userEmail });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the favorites" });
        }
    },
    getItem: async function (req, res, next) {
        try {
            const scheme = joi.object({
                userEmail: joi.string().required(),
                cardId: joi.string().required(),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await Favorite.findOne({ userEmail: value.userEmail,cardId:value.cardId });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the card" });
        }
    },
    add: async function (req, res, next) {
        try {
            const scheme = joi.object({
                userEmail: joi.string().required(),
                cardId: joi.string().required(),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const newFavorite = new Favorite(value);
            const result = await newFavorite.save();

            res.json({
                ...value,
                _id: result._id
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add favorite" });
        }
    },
    delete: async function (req, res, next) {
        try {
            const scheme = joi.object({
                userEmail: joi.string().required(),
                cardId: joi.string().required(),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const deleted = await Favorite.findOne({ cardId: value.cardId,userEmail:value.userEmail });

            await Favorite.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete favorite" });
        }
    },
}