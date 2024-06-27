const { Schema, model } = require('mongoose')

const User = model('User', new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true, maxLength: 30 },
    role: { type: String, enum: ['Admin', 'Author'], default: 'Author' },
    stutus: { type: Boolean, default: false }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = User