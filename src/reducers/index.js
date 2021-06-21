import {
  USER_AUTH_SUCCESS,
  USER_DETAILS_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  APPLICATION_LOADING_STATUS
} from '@constants/actionsType'

import { setAppStore } from '@store'

export const initialState = {
  loggedInUserData: {},
  profileDetails: {},
  isAppLoading: false
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  let updatedState
  switch (type) {
    case USER_AUTH_SUCCESS:
      updatedState = { ...state, loggedInUserData: payload }
      break
    case USER_DETAILS_SUCCESS:
      updatedState = { ...state, profileDetails: payload }
      break
    case PRODUCT_DETAILS_SUCCESS:
      updatedState = { ...state, product: payload }
      break
    case APPLICATION_LOADING_STATUS:
      updatedState = { ...state, isAppLoading: payload }
      break
    default:
      updatedState = state
      break
  }

  setAppStore(updatedState)
  return updatedState
}
