import { put } from 'redux-saga/effects'
import AppointmentsActions from 'App/Stores/Appointments/Actions'
import NavigationService from 'App/Services/NavigationService'

export function* startup() {
  yield put(AppointmentsActions.fetchAppointments())
  
  NavigationService.navigateAndReset('MainScreen')
}
