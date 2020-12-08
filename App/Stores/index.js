import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as AppointmentsReducer } from './Appointments/Reducers'

export default () => {
  const rootReducer = combineReducers({
    appointments: AppointmentsReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
