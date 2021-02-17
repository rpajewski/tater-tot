const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type RequestOff {
        _id: ID
        timeOff: String
        reason: String
        paidTimeOff: Boolean
        approved: Boolean
        createdAt: Date
        approvedOn: Date
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
        token: ID!
        employee: Employee
    }

    type Query {
        me: Employee
        employees: [Employee]
        requestOffs: [RequestOff]
        requests(employee: ID!): [RequestOff]
    }

    input EmployeeInput {
        firstName: String!
        lastName: String!
        phoneNumber: String!
        email: String!
        password: String!
        role: String!
    }

    type Mutation {
        addUser(newEmployee: EmployeeInput!): Auth
        login(email String!, password: String!): Auth
        updateEmployee(phoneNumber: String!, email: String!, password: String!): Employee
        addRequestOff(employee: ID!): Employee
        updateRequestOff(_id: ID!, timeOff: String!, paidTimeOff: Boolean!): Employee
        approveRequestOff(_id: ID!, approvedOn: Boolean!): Employee
        deleteRequestOff(requestOffId: ID!): Employee
    }
`

module.exports = typeDefs