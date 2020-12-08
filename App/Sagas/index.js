import { takeLatest, all } from 'redux-saga/effects'
import { AppointmentsTypes } from 'App/Stores/Appointments/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { fetchAppointments } from './AppointmentsSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AppointmentsTypes.FETCH_APPOINTMENTS, fetchAppointments),
  ])
}
