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
            throw new AuthenticationError('Not logged in')
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
            throw new AuthenticationError('You do not have these permissions')
        },
        requests: async (parent, args, context) => {
            if (context.employee) {
                const employee = await Employee.findById(context.employee._id)
                    .select('-__v -password')
                    .populate('requestOffs')

                employee.requestOffs.sort((a, b) => b.createdAt - a.createdAt)

                return employee
            }
            throw new AuthenticationError('Not logged in')
        }
    },
    Mutation: {

    }
}

module.exports = resolvers