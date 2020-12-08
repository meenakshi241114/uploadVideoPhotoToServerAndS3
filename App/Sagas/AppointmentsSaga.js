import { put, call } from 'redux-saga/effects'
import AppointmentsActions from 'App/Stores/Appointments/Actions'
import { appointmentService } from 'App/Services/Api/AppointmentService'

export function* fetchAppointments() {

  yield put(AppointmentsActions.fetchAppointmentsLoading())
  const appointments = yield call(appointmentService.fetchAppointments)
  if (appointments) {
    yield put(AppointmentsActions.fetchAppointmentsSuccess(appointments))
  } else {
    yield put(
      AppointmentsActions.fetchAppointmentsFailure('There was an error while fetching appointments informations.')
    )
  }
}
