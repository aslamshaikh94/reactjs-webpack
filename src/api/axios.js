import Axios from 'axios'
import { storeDispatcher, getAppStore } from '@store/index'
import {
  setApplicationLoadingStatusAction,
  userLogoutAction,
  showSnackbarAction,
  underMaintenanceAction
} from '@actions/index'
import history from '@history/'
import { encryptRequest, decryptResponse } from '@utils/crypto'
import {
  LOGIN_ROUTE,
  CAPTURE_LEAD_ROUTE,
  UNDER_MAINTENANCE_ROUTE
} from '@constants/routes'

/**
 * Authorizes requests by injecting the token from the sessionStorage.
 * @param {import('axios').AxiosRequestConfig} request The request object
 */
const outgoingRequestInterceptor = request => {
  if (request.url) {
    const { loggedInUserData = {} } = getAppStore()
    const { token } = loggedInUserData
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
  }
  storeDispatcher.dispatch(setApplicationLoadingStatusAction(true))
  return request
}

/**
 * This interceptor is used to handle all possible axios failure scenarios.
 * Add an early return to not pass the error ahead to the caller.
 * @param {Object} err The error object
 */
const responseErrorInterceptor = err => {
  let errorJSON = err.toJSON ? err.toJSON() : {}
  const { response: { status, data: { data = {}, message } = {} } = {} } = err

  if (status < 500 && status >= 400) {
    // all 4xx errors
    storeDispatcher.dispatch(
      showSnackbarAction({
        message,
        type: 'error'
      })
    )
    // throw user to capture lead page if errorFlag is true Otherwise display err msg
    if (status === 400) {
      let errorFlag = data.journeydrop
      storeDispatcher.dispatch(
        showSnackbarAction({
          message,
          type: 'error'
        })
      )
      errorFlag && history.push(CAPTURE_LEAD_ROUTE)
    }
    // throw user to login page. 403 might have to be removed depending on API
    if ([401, 403].includes(err.response.status)) {
      storeDispatcher.dispatch(userLogoutAction())

      const { data = {} } = err.response
      const { message = 'You have been logged out' } = data

      const type = err.config.url === '/users/login' ? 'error' : 'info'

      storeDispatcher.dispatch(showSnackbarAction({ message, type }))
      history.push(LOGIN_ROUTE)
    }
  }

  if (status === 503) {
    storeDispatcher.dispatch(underMaintenanceAction(data))
    history.push(UNDER_MAINTENANCE_ROUTE)
  }

  if (!!errorJSON && errorJSON.code === 'ECONNABORTED') {
    storeDispatcher.dispatch(
      showSnackbarAction({
        message: 'Request Timed Out. Please check your connection',
        type: 'error'
      })
    )
  }
  if (!!errorJSON && errorJSON.message === 'Network Error') {
    storeDispatcher.dispatch(
      showSnackbarAction({
        message: 'Network Error.',
        type: 'error'
      })
    )
  }
  storeDispatcher.dispatch(setApplicationLoadingStatusAction(false))
  return Promise.reject(err)
}

let AxiosInstance = Axios.create({
  baseURL: process.env.API_URL
})

AxiosInstance.defaults.timeout = 30000
AxiosInstance.defaults.headers = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0'
}

const responseSuccessInterceptor = response => {
  storeDispatcher.dispatch(setApplicationLoadingStatusAction(false))
  return response
}

AxiosInstance.interceptors.request.use(
  request => encryptRequest(outgoingRequestInterceptor(request)),
  error => error
)

AxiosInstance.interceptors.response.use(
  response => decryptResponse(responseSuccessInterceptor(response)),
  error => responseErrorInterceptor(error)
)

export default AxiosInstance
