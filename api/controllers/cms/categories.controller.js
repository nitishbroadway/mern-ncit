const { errorMsg } = require("../../lib")
const { Category } = require("../../models")

class CategoriesCtrl {
    index = async (req, res, next) => {
        try {
            const categorys = await Category.find()

            res.send(categorys)
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name } = req.body

            await Category.create({name})

            res.send({
                message: 'Category added'
            })
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            if(category) {
                res.send(category)
            } else {
                next({
                    message: 'Category not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { name } = req.body
            const { id } = req.params

            const category = await Category.findById(id)

            if (category) {
                await Category.findByIdAndUpdate(id, { name })

                res.send({
                    message: 'Category updated'
                })
            } else {
                next({
                    message: 'Category not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            if (category) {
                await Category.findByIdAndDelete(category._id)

                res.send({
                    message: 'Category deleted'
                })
            } else {
                next({
                    message: 'Category not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new CategoriesCtrl