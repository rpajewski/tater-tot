const { Schema, model } = require('mongoose');

const { formatDate } = require('../utils/helpers')

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
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => formatDate(createdAtVal)
    },
    approvedOn: {
        type: Date,
        default: Date.now,
        get: approvedOnVal => formatDate(approvedOnVal)
    }
})

const RequestOff = model('RequestOff', requestOffSchema)

module.exports = RequestOff