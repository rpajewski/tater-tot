const mongoose = require('mongoose')
const { Schema } = mongoose

const requestOffSchema = new Schema({
    timeOff: {
        type: String,
        required: true,
        trim: true
    },
    reason: {
        type: String,
        required: false,
        trim: true
    },
    paidTimeOff: {
        type: Boolean,
        required: true
    },
    approved: {
        type: Boolean,
        required: false,
        default: false
    }},
    { timestamps: true }
)

const RequestOff = mongoose.model('RequestOff', requestOffSchema)

module.exports = RequestOff