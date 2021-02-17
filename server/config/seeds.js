// seeds only used for demonstration purposes
const db = require('./connection')
const { Employee, RequestOff } = require('../models')

db.once('open', async () => {
    await RequestOff.deleteMany()

    const requestOffs = await RequestOff.insertMany([
        {
            timeOff: 'March 14th - March 21st',
            reason: 'Going to Rome',
            paidTimeOff: true
        },
        {
            timeOff: 'April 19th - April 21st',
            reason: 'Going camping',
            paidTimeOff: false
        },
        {
            timeOff: 'July 13th - July 28th',
            reason: 'Honeymoon',
            paidTimeOff: true
        },
        {
            timeOff: 'December 23rd - December 26th',
            reason: 'Family in town for Christmas',
            paidTimeOff: false
        }
    ])

    console.log('Request Offs Seeded!')
    
    await Employee.deleteMany()

    const employees = await Employee.insertMany([
        {
            firstName: 'John',
            lastName: 'Smith',
            phoneNumber: '111-111-1111',
            email: 'fakeemail1@testmail.com',
            password: 'password1',
            role: 'employee',
            requestOffs: [ requestOffs[0], requestOffs[3] ]
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            phoneNumber: '222-222-2222',
            email: 'fakeemail2@testmail.com',
            password: 'password2',
            role: 'employee',
            requestOffs: [ requestOffs[1] ]
        },
        {
            firstName: 'Pamela',
            lastName: 'Washington',
            phoneNumber: '333-333-3333',
            email: 'fakeemail3@testmail.com',
            password: 'password3',
            role: 'employee',
            requestOffs: [ requestOffs[2] ]
        },
        {
            firstName: 'Elijah',
            lastName: 'Holt',
            phoneNumber: '444-444-4444',
            email: 'fakeemail4@testmail.com',
            password: 'password4',
            role: 'employee',
        },
        {
            firstName: 'Jonny',
            lastName: 'Appleseed',
            phoneNumber: '555-555-5555',
            email: 'fakeemail5@testmail.com',
            password: 'password5',
            role: 'employee',
        },
        {
            firstName: 'The',
            lastName: 'Fonz',
            phoneNumber: '666-666-6666',
            email: 'fakeemail6@testmail.com',
            password: 'password6',
            role: 'employee',
        },
        {
            firstName: 'Tony',
            lastName: 'Stark',
            phoneNumber: '777-777-7777',
            email: 'fakeemail7@testmail.com',
            password: 'password7',
            role: 'employee',
        },
        {
            firstName: 'Bruce',
            lastName: 'Banner',
            phoneNumber: '888-888-8888',
            email: 'fakeemail8@testmail.com',
            password: 'password8',
            role: 'employee',
        },
        {
            firstName: 'Rick',
            lastName: 'James',
            phoneNumber: '999-999-9999',
            email: 'fakeemail9@testmail.com',
            password: 'password9',
            role: 'employee',
        },
        {
            firstName: 'Steve',
            lastName: 'Rogers',
            phoneNumber: '123-456-7890',
            email: 'fakeemail10@testmail.com',
            password: 'password10',
            role: 'employee',
        }
    ])

    console.log(`${employees.length} were seeded to the database!`)

    process.exit()
})