import gql from 'graphql-tag'

export const QUERY_ME = gql`
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

export const QUERY_EMPLOYEES = gql`
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
    query requests($employeeId: ID!) {
        requests(employeeId: $employeeId) {
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