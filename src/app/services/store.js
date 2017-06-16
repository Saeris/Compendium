import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { Observable } from 'rxjs' //eslint-disable-line no-unused-vars
import createLogger from 'redux-logger'
import Apollo from './apollo'

@inject(Apollo)
export default class Store {
  constructor(apollo) {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
    this.apollo = apollo.client
    this.state = this.configureStore()
    this.state.dispatch({type: `INIT_STATE`})
  }

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  createReducer(asyncReducers) {
    return combineReducers({ apollo: this.apollo.reducer(), ...asyncReducers })
  }

  createEpic(asyncEpics = []) {
    return combineEpics(...asyncEpics)
  }

  configureStore() {
    this.log.debug(`Configuring Redux Store.`)
    const loggerMiddleware = createLogger()
    const store = createStore(
      this.createReducer(),
      this.composeEnhancers(
        applyMiddleware(loggerMiddleware),
        applyMiddleware(createEpicMiddleware(this.createEpic())),
        applyMiddleware(this.apollo.middleware())
      )
    )
    store.asyncReducers = {}
    return store
  }

  addReducer(name, reducer) {
    this.log.debug(`Adding reducer '${name}'.`, reducer)
    let newReducers = {}
    newReducers[`${name}`] = reducer
    this.state.asyncReducers = { ...this.state.asyncReducers, ...newReducers }
    this.state.replaceReducer(this.createReducer(this.state.asyncReducers))
  }

  addEpic(epic) {

  }
}
