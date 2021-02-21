import gqp from 'graphql-tag'

export const QUERY_ME = gqp`
    {
        me {
            _id
            firstName
            lastName
            phoneNumber
            email
            role
            requestOffs {
                _id
                timeOff
                reason
                paidTimeOff
                approved
                createdAt
                approvedOn
            }
        }
    }
`

export const QUERY_EMPLOYEES = gqp`
    {
        employees {
            _id
            firstName
            lastName
            phoneNumber
            email
            role
            requestOffs {
                _id
                timeOff
                reason
                paidTimeOff
                approved
                createdAt
                approvedOn
        }
    }
`

export const QUERY_REQUEST_OFFS = gql`
    {
        requestOffs {
            _id
            timeOff
            reason
            paidTimeOff
            approved
            createdAt
            approvedOn
        }
    }
`

export const QUERY_EMPLOYEE_REQUESTS = gql`
    query requests($employee: ID!) {
        requests(employee: $employee) {
            requestOffs {
                _id
                timeOff
                reason
                paidTimeOff
                approved
                createdAt
                approvedOn
            }
        }
    }
`