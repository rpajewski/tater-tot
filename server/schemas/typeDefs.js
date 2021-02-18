const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type RequestOff {
        _id: ID
        timeOff: String
        reason: String
        paidTimeOff: Boolean
        approved: Boolean
        createdAt: String
        approvedOn: String
    }

    type Employee {
        _id: ID
        firstName: String
        lastName: String
        phoneNumber: String
        email: String
        role: String
        requestOffs: [RequestOff]
    }

    type Auth {
        token: ID
        employee: Employee
    }

    type Query {
        me: Employee
        employees: [Employee]
        requestOffs: [RequestOff]
        requests(employee: ID!): Employee
    }

    type Mutation {
        addEmployee(firstName: String!, lastName: String!, phoneNumber: String!, email: String!, password: String!, role: String!): Auth
        login(email: String!, password: String!): Auth
        updateEmployee(phoneNumber: String!, email: String!, password: String!): Employee
        addRequestOff(timeOff: String!, reason: String!, paidTimeOff: Boolean!): RequestOff
        updateRequestOff(_id: ID!, timeOff: String, reason: String, paidTimeOff: Boolean): Employee
        approveRequestOff(employeeId: ID!, requestId: ID!, approved: Boolean): Employee
        deleteRequestOff(requestId: ID!): Employee
    }
`

module.exports = typeDefs