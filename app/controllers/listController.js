
const assert = require('assert');
const { List } = require('../models');

const listController = {
    getAll: async (req, res) => {
        try {
            const lists = await List.findAll({
                include: {
                    association: 'cards',
                    include: 'tags'
                }
            });

            res.json(lists);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    getOne: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");

            const list = await List.findByPk(req.params.id, {
                include: {
                    association: 'cards',
                    include: 'tags'
                }
            });

            res.json(list);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    update: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");

            const list = await List.findByPk(req.params.id);

            if (!list) {
                return res.status(404).json({ status: 'list not found' });
            }

            const { name, position } = req.body;
            if (name) list.name = name;
            if (position) list.position = position;

            await list.save();

            res.json(list);

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    create: async (req, res) => {
        try {
            const { name, position } = req.body;
            assert.ok(name, "name can't be empty");
            let newList = await List.create({
                name, position
            });

            res.json(newList);

        } catch (err) {
            errorController._500(err, req, res);
        }

    },
    delete: async (req, res) => {
        try {
            assert.ok(Number(req.params.id), "id is required and is a number");
            const list = await List.findByPk(req.params.id);
            await list.destroy();

            res.json({
                status: 'ok'
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = listController;