const {
    Recipe
} = require('../models')

module.exports = {
    async add(req, res) {
        try {
            var title = req.body.title
            var ingredients = req.body.ingredients.join(',')
            console.log(title)
            var recipe = {
                'title': title,
                'ingredients': ingredients
            }
            const result = await Recipe.create(recipe)
            res.send(result.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'This recipe is invalid'
            })
        }
    },
    async refresh(req, res) {
        try {
            const result = await Recipe.findAll({
                attributes: ['id', 'title', 'ingredients'],
                raw: true
            })
            res.send(result)
        } catch (err) {
            res.status(400).send({
                error: 'Error query'
            })
        }
    },
    async delete(req, res) {
        try {
            var val = req.body.id;
            const result = await Recipe.destroy({
                where: {
                    id: val
                }
            })
            console.log(result)
            if (result == 1) {
                res.sendStatus(200)
            } else {
                throw result
            }
        } catch (error) {
            res.status(400).send({
                error: 'Error deleting recipe'
            })
        }
    }
}