import gql from 'graphql-tag'

export const ADD_EMPLOYEE = gql`
    mutation addEmployee($firstName:String!, $lastName:String!, $phoneNumber:String!, $email:String!, $password:String!, $role:String!) {
        addEmployee(firstName:$firstName, lastName:$lastName, phoneNumber:$phoneNumber, email:$email, password:$password, role:$role) {
            token
            employee {
                _id
            }
        }
    }
`

export const LOGIN = gql`
    mutation login($email:String!, $password:String!) {
        login(email: $email, password: $password) {
            token
            employee {
                _id
            }
        }
    }
`

export const UPDATE_EMPLOYEE = gql`
    mutation updateEmployee($phoneNumber:String, $email:String, password:String) {
        updateEmployee(phoneNumber:$phoneNumber, email:$email, password:$password) {
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

export const ADD_REQUEST_OFF = gql`
    mutation addRequestOff($timeOff:String, $reason:String, $paidTimeOff:Boolean) {
        addRequestOff(timeOff:$timeOff, reason:$reason, paidTimeOff:$paidTimeOff) {
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

export const UPDATE_REQUEST_OFF = gql`
    mutation updateRequestOff($_id:ID!, $timeOff:String, $reason:String, $paidTimeOff:Boolean) {
        updateRequestOff(_id:$_id, timeOff:$timeOff, reason:$reason, paidTimeOff:$paidTimeOff) {
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

export const APPROVE_REQUEST_OFF = gql`
    mutation approveRequestOff($employeeId:ID!, $requestId:ID!, $approved:Boolean!) {
        approveRequestOff(employeeId:$employeeId, requestId:$requestId, approved:$approved) {
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

export const DELETE_REQUEST_OFF = gql`
    mutation deleteRequestOff($requestId:ID!) {
        deleteRequestOff(requestId:$requestId) {
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