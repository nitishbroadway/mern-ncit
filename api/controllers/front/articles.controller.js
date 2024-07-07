const { Article, Comment } = require("../../models")
const { Types } = require('mongoose')

class ArticlesCtrl {
    latest = async (req, res, next) => {
        try {
            const articles = await Article.find().sort({createdAt: 'desc'})

            res.send(articles)
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    byCatId = async (req, res, next) => {
        try {
            const { id } = req.params

            const articles = await Article.find({categoryId: id})

            res.send(articles)
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    byId = async (req, res, next) => {
        try {
            const { id } = req.params

            let article = await Article.aggregate()
                .match({_id: new Types.ObjectId(id)})
                .lookup({from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category'})
                .lookup({from: 'comments', localField: '_id', foreignField: 'articleId', as: 'comments'})

            article = article[0]

            article.category = article.category[0]

            res.send(article)
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    comment = async (req, res, next) => {
        try {
            const { id } = req.params
            const { name, email, content } = req.body

            await Comment.create({ name, email, content, articleId: id })

            res.send({
                message: 'Thank you for your comment'
            })
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new ArticlesCtrl