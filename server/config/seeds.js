// seeds only used for demonstration purposes
const db = require('./connection')
const { Employee, RequestOff } = require('../models')

db.once('open', async () => {
    await RequestOff.deleteMany()

    const requestOffs = await RequestOff.insertMany([
        {

        }
    ])

    console.log('Request Offs Seeded!')
    
    await Employee.deleteMany()

    const employees = await Employee.insertMany([
        {
            firstName: 'John',
            lastName: 'Smith',

        }
    ])

    console.log('Employees Seeded!')

    process.exit()
})