const { Schema, model } = require('mongoose')

const Article = model('Article', new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    categoryId: {type: Schema.Types.ObjectId, required: true, ref: 'Category'},
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = Article