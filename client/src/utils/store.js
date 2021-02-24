import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)

// check store values during production by typing store.getState() in console
if (process.env.NODE_ENV !== 'production') {
    window.store = store
}

export default store