
import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AppointmentsTypes } from './Actions'

export const fetchAppointmentsLoading = (state) => ({
  ...state,
  appointmentsIsLoading: true,
  appointmentsErrorMessage: null,
})

export const fetchAppointmentsSuccess = (state, { appointments }) => ({
  ...state,
  appointments: appointments,
  appointmentsIsLoading: false,
  appointmentsErrorMessage: null,
})

export const fetchAppointmentsFailure = (state, { errorMessage }) => ({
  ...state,
  appointments: {},
  appointmentsIsLoading: false,
  appointmentsErrorMessage: errorMessage,
})

export const reducer = createReducer(INITIAL_STATE, {
  [AppointmentsTypes.FETCH_APPOINTMENTS_LOADING]: fetchAppointmentsLoading,
  [AppointmentsTypes.FETCH_APPOINTMENTS_SUCCESS]: fetchAppointmentsSuccess,
  [AppointmentsTypes.FETCH_APPOINTMENTS_FAILURE]: fetchAppointmentsFailure,
})
