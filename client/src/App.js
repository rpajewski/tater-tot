import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

// pages & components
import Home from './pages/Home'
import Overview from './pages/Overview'
import Login from './pages/Login'
import EmployeeSignup from './pages/EmployeeSignup'
import SupervisorSignup from './pages/SupervisorSignup'
import UpdateInfo from './pages/UpdateInfo'
import RequestOff from './pages/RequestOff'
import Directory from './pages/Directory'
import NoMatch from './pages/NoMatch'
import Nav from './components/Nav'

// global store with redux
import { Provider } from 'react-redux'
import store from './utils/store'

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup/employee" component={EmployeeSignup} />
              <Route exact path="/signup/supervisor" component={SupervisorSignup} />
              <Route exact path="/overview/:id" component={Overview} />
              <Route exact path="/updateinfo/:id" component={UpdateInfo} />
              <Route exact path="/requestoff/:id" component={RequestOff} />
              <Route exact path="/directory/:id" component={Directory} />
              <Route component={NoMatch} />
            </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
