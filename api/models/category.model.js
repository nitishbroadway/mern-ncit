const { Schema, model } = require('mongoose')

const Category = model('Category', new Schema({
    name: { type: String, required: true },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = Category