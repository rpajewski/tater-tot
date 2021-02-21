import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

// pages & components
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import EmployeeSignup from './pages/EmployeeSignup'
import SupervisorSignup from './pages/SupervisorSignup'
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
              <Route exact path="/dashboard/:id" component={Dashboard} />
              <Route component={NoMatch} />
            </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App
