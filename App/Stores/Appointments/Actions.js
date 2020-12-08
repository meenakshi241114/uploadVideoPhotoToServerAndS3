import { createActions } from 'reduxsauce'
const { Types, Creators } = createActions({
  fetchAppointments: null,
  // The operation has started and is loading
  fetchAppointmentsLoading: null,
  // Appointments informations were successfully fetched
  fetchAppointmentsSuccess: ['appointments'],
  // An error occurred
  fetchAppointmentsFailure: ['errorMessage'],
})

export const AppointmentsTypes = Types
export default Creators
