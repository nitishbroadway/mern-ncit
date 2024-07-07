const { errorMsg } = require("../../lib")
const { Category } = require("../../models")

class CategoriesCtrl {
    list = async (req, res, next) => {
        try {
            const categories = await Category.find()

            res.send(categories)
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    byId = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            res.send(category)
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new CategoriesCtrl