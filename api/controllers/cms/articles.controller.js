const { errorMsg } = require("../../lib")
const { Article } = require("../../models")
const { unlinkSync } = require('node:fs')

class ArticlesCtrl {
    index = async (req, res, next) => {
        try {
            let articles = await Article.aggregate()
                .lookup({from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category'})

            for(let i in articles) {
                articles[i].category = articles[i].category[0]
            }

            res.send(articles)
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, content, categoryId } = req.body
            
            const { file } = req
            let image

            if(file) {
                image = file.filename
            }

            await Article.create({name, content, categoryId, image})

            res.send({
                message: 'Article added'
            })
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const { id } = req.params

            const article = await Article.findById(id)

            if(article) {
                res.send(article)
            } else {
                next({
                    message: 'Article not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { name, content, categoryId } = req.body
            const { id } = req.params
            const { file } = req

            const article = await Article.findById(id)

            if (article) {
                let image

                if (file) {
                    image = file.filename
                } else {
                    image = article?.image
                }

                await Article.findByIdAndUpdate(id, { name, content, categoryId, image })

                res.send({
                    message: 'Article updated'
                })
            } else {
                next({
                    message: 'Article not found',
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

            const article = await Article.findById(id)

            if (article) {
                if(article?.image) {
                    unlinkSync(`uploads/${article.image}`)
                }

                await Article.findByIdAndDelete(article._id)

                res.send({
                    message: 'Article deleted'
                })
            } else {
                next({
                    message: 'Article not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new ArticlesCtrl