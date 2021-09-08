import { USER_AUTH_SUCCESS } from '@constants/actionsType'

import { setAppStore } from '@store'

export const initialState = {
  loggedInUserData: {}
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  let updatedState
  switch (type) {
    case USER_AUTH_SUCCESS:
      updatedState = { ...state, loggedInUserData: payload }
      break
    default:
      updatedState = state
      break
  }

  setAppStore(updatedState)
  return updatedState
}
