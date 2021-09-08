import {
  USER_LOGIN_SUCCESS,
  SET_APPLICATION_LOADING_STATUS,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from '@constants/actionTypes'

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const userLoginSuccessAction = payload => ({
  type: USER_LOGIN_SUCCESS,
  payload
})

/**
 * Sets loading status in the context store so that a loader can be
 * displayed when appropriate
 * @param {Boolean} payload Whether the app is in loading state
 */
export const setApplicationLoadingStatusAction = payload => ({
  type: SET_APPLICATION_LOADING_STATUS,
  payload
})

/**
 * Sets visible snackbar message and type in store
 * @param {Object} payload
 * @param {string} payload.message The message to show in snackbar
 * @param {'error'|'info'|'success'} payload.type The type of snackbar
 */
export const showSnackbarAction = payload => ({
  type: SHOW_SNACKBAR,
  payload
})

/**
 * Show snackbar visible to false in store
 */
export const hideSnackbarAction = () => ({
  type: HIDE_SNACKBAR
})
