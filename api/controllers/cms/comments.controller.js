const { errorMsg } = require("../../lib")
const { Comment } = require("../../models")

class CommentsCtrl {
    index = async (req, res, next) => {
        try {
            let comments = await Comment.aggregate()
                .lookup({from: 'articles', localField: 'articleId', foreignField: '_id', as: 'article'})

            for(let i in comments) {
                comments[i].article = comments[i].article[0]
            }

            res.send(comments)
        } catch(error) {
            errorMsg(next, error)
        }
    }

    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const comment = await Comment.findById(id)

            if (comment) {
                await Comment.findByIdAndDelete(comment._id)

                res.send({
                    message: 'Comment deleted'
                })
            } else {
                next({
                    message: 'Comment not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new CommentsCtrl