const { Schema, model } = require('mongoose')

const User = model('User', new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    address: { type: String, required: true },
    phone: { type: String, required: true, maxLength: [30, 'Phone must not be longer than 30 characters'] },
    role: { type: String, enum: ['Admin', 'Author'], default: 'Author' },
    status: { type: Boolean, default: false }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = User