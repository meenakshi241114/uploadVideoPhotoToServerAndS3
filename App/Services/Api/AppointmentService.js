import axios from 'axios'
import { Config } from 'App/Config'
import { is, curryN, gte } from 'ramda'
import data from 'App/Data/Appointment.json';

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)
const appointmentApiClient = axios.create({

  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchAppointments() {
  return data;
}

/* For server request to fetch appointment list */

// function fetchAppointments(params) {
//   return appointmentApiClient.get(Config.APPOINTMENTS_SERVICE.FETCH_APPOINTMENTS_URL, {
//     headers: {
//       Authorization: 'Bearer ' + params.token
//     }
//   }).then((response) => {
//     if (in200s(response.status)) {
//       return response.data;
//     }
//     return null
//   }).catch(error => {
//     console.log(error)
//     return null
//   });
// }

export const appointmentService = {
  fetchAppointments,
  //fetchAppointments
}
