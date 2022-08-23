
const assert = require('assert');
const { Tag } = require('../models');

const tagController = {
    getAll: async (req, res) => {
        try {
            const tags = await Tag.findAll({
                include: 'cards'
            });

            res.json(tags);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    getOne: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");

            const tag = await Tag.findByPk(req.params.id, {
                include: 'cards'
            });

            res.json(tag);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    update: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");

            const tag = await Tag.findByPk(req.params.id);

            if (!tag) {
                return res.status(404).json({ status: 'tag not found' });
            }

            const { name, colour } = req.body;
            if (name) tag.name = name;
            if (colour) tag.colour = colour;

            await tag.save();

            res.json(tag);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    create: async (req, res) => {
        try {
            const { name, colour } = req.body;
            assert.ok(name, "name can't be empty");

            let newTag = await Tag.create({
                name, colour
            });

            res.json(newTag);

        } catch (err) {
            errorController._500(err, req, res);
        }

    },
    delete: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");
            const tag = await Tag.findByPk(req.params.id);
            await tag.destroy();

            res.json({
                status: 'ok'
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = tagController;