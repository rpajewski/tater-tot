const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const path = require('path')

const { typeDefs, resolvers } = require('./schemas')
const { authMiddleWare } = require('./utils/auth')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001
const app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleWare
})
server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/image', express.static(path.join(__dirname, '../client/images')))
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`🌐 API server running on port ${PORT}!`)
        console.log(`🌎 Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    })
})