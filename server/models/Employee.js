const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const RequestOff = require('./RequestOff')

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(p) {
                return /\d{3}-\d{3}-\d{4}/.test(p)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Please enter a phone number']
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(e) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e)
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, 'Please enter an email address']
    },
    password: {
        type: String,
        require: true,
        minlength: 8
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    requestOffs: [RequestOff.schema]
})

employeeSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next()
})

employeeSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee