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
            if (context.employee) {
                return await RequestOff.find()
            }
            throw new AuthenticationError('You do not have these permissions!')
        },
        requests: async (parent, args, context) => {
            if (context.employee) {
                const employee = await Employee.findById(args.employee)
                    .select('-__v -password')
                    .populate('requestOffs')

                return employee
            }
            throw new AuthenticationError('Not logged in!')
        }
    },
    Mutation: {
        addEmployee: async (parent, args) => {
            const employee = await Employee.create(args)
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
        addRequestOff: async (parent, args, context) => {
            if (context.employee) {
                const request = await RequestOff.create(args)

                await Employee.findByIdAndUpdate(context.employee._id, { $push: { requestOffs: request }}, { new: true })

                return request
            }
            throw new AuthenticationError('Not logged in!')
        },
        updateRequestOff: async (parent, args, context) => {
            if (context.employee) {
                const updatedEmployee = await Employee.findByIdAndUpdate(
                    { _id: context.employee._id },
                    { $set: { requestOffs: args }},
                    { new: true }
                )
                return updatedEmployee
            }
            throw new AuthenticationError('Not logged in!')
        },
        approveRequestOff: async (parent, { employeeId, requestId, approved }, context) => {
            if (context.employee) {
                const updatedEmployee = await Employee.findByIdAndUpdate(
                    { _id: employeeId },
                    { $set: { requestOffs: { _id: requestId, approved: approved }}},
                    { new: true }
                )
                console.log(updatedEmployee)
                return updatedEmployee
            }
            throw new AuthenticationError('Not logged in!')
        },
        deleteRequestOff: async (parent, { requestId }, context) => {
            if (context.employee) {
                const updatedEmployee = await Employee.findOneAndUpdate(
                    { _id: context.employee._id },
                    { $pull: { requestOffs: { _id: requestId }}},
                    { new: true }
                )
                return updatedEmployee
            }
            throw new AuthenticationError('Not logged in!')
        }
    }
}

module.exports = resolvers