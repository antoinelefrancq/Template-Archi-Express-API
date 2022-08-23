
const assert = require('assert');
const { Card, Tag } = require('../models');

const cardController = {
    getAll: async (req, res) => {
        try {
            const cards = await Card.findAll({
                include: 'tags'
            });

            res.json(cards);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    getAllByList: async (req, res) => {
        try {
            const cards = await Card.findAll({
                where: { list_id: req.params.id },
                include: 'tags'
            });

            res.json(cards);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    getOne: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");

            const card = await Card.findByPk(req.params.id, {
                include: 'tags'
            });

            res.json(card);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    update: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");

            const card = await Card.findByPk(req.params.id);

            if (!card) {
                return res.status(404).json({ status: 'card not found' });
            }

            const { content, colour, list_id, position } = req.body;
            if (content) card.content = content;
            if (position) card.position = position;
            if (list_id) card.list_id = list_id;
            if (colour) card.colour = colour;

            await card.save();

            res.json(card);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    create: async (req, res) => {
        try {
            const { content, colour, list_id, position } = req.body;
            assert.ok(content, "content can't be empty");
            assert.ok(list_id, "name can't be empty");

            let newCard = await Card.create({
                content, colour, list_id, position
            });

            res.json(newCard);

        } catch (err) {
            errorController._500(err, req, res);
        }

    },
    delete: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");
            const card = await Card.findByPk(req.params.id);
            await card.destroy();

            res.json({
                status: 'ok'
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    addTag: async (req, res) => {
        try {
            assert.ok(Number(req.params.card_id), "card_id is required and is a number"); 
            assert.ok(Number(req.params.tag_id), "tag_id is required and is a number");
            const card = await Card.findByPk(req.params.card_id);
            const tag = await Tag.findByPk(req.params.tag_id);

            if (card && tag) {
                card.addTag(tag);

                await card.save();
                res.json({
                    status: 'ok'
                });
            } else {
                res.status(404).json({ message: 'card or tag not found ' });
            }

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    removeTag: async (req, res) => {
        try {
            assert.ok(Number(req.params.card_id), "card_id is required and is a number"); 
            assert.ok(Number(req.params.tag_id), "tag_id is required and is a number");
            const card = await Card.findByPk(req.params.card_id);
            const tag = await Tag.findByPk(req.params.tag_id);

            if (card && tag) {
                card.removeTag(tag);
                
                await card.save();
                res.json({
                    status: 'ok'
                });
            } else {
                res.status(404).json({ message: 'card or tag not found ' });
            }

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = cardController;