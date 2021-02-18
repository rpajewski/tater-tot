const { AuthenticationError } = require('apollo-server-express')
const { Employee, RequestOff } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.employee) {
                const employeeData = await Employee.findOne({ _id: context.employee._id })
                    .select('-__v -password')
                    .populate('requestOffs')

                return employeeData
            }
            throw new AuthenticationError('Not logged in!')
        },
        employees: async () => {
            return await Employee.find()
                .select('-__v -password')
                .populate('requestOffs')
        },
        requestOffs: async (parent, args, context) => {
            if (context.employee.role === 'supervisor') {
                return await RequestOff.find()
            }
            throw new AuthenticationError('You do not have these permissions!')
        },
        requests: async (parent, args, context) => {
            if (context.employee) {
                const employee = await Employee.findById(context.employee._id)
                    .select('-__v -password')
                    .populate('requestOffs')

                employee.requestOffs.sort((a, b) => b.createdAt - a.createdAt)

                return employee
            }
            throw new AuthenticationError('Not logged in!')
        }
    },
    Mutation: {
        addEmployee: async (parent, { newEmployee }) => {
            const employee = await Employee.create(newEmployee)
            const token = signToken(employee)

            return { token, employee }
        },
        login: async (parent, { email, password }) => {
            const employee = await Employee.findOne({ email })

            if (!employee) {
                throw new AuthenticationError('Incorrect credentials!')
            }

            const correctPw = await employee.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials!')
            }

            const token = signToken(employee)

            return { token, employee }
        },
        updateEmployee: async (parent, args, context) => {
            if (context.employee) {
                return await Employee.findByIdAndUpdate(context.employee._id, args, { new: true })
            }
            throw new AuthenticationError('Not logged in!')
        },
        addRequestOff: async (parent, { newRequest }, context) => {
            if (context.employee) {
                const request = await RequestOff.create(newRequest)

                await Employee.findByIdAndUpdate(context.employee._id, { $push: { requestOffs: request }})

                return request
            }
            throw new AuthenticationError('Not Logged in!')
        },
        updateRequestOff: async (parent, { _id, timeOff, paidTimeOff }) => {
            return await RequestOff.findByIdAndUpdate(_id, { $set: { timeOff: timeOff, paidTimeOff: paidTimeOff }}, { new: true })
        },
        approveRequestOff: async (parent, { _id, approvedOn }) => {
            return await RequestOff.findByIdAndUpdate(_id, { $set: { approvedOn: approvedOn }}, { new: true })
        },
        deleteRequestOff: async (parent, { _id }, context) => {
            if (context.employee) {
                const updatedEmployee = await Employee.findOneAndUpdate(
                    { _id: context.employee._id },
                    { $pull: {requestOffs: { _id: _id }}},
                    { new: true }
                )
                return updatedEmployee
            }
            throw new AuthenticationError('Not logged in!')
        }
    }
}

module.exports = resolvers