import {
  USER_AUTH_SUCCESS,
  USER_DETAILS_SUCCESS,
  SEARCH_PROFILES_SUCCESS,
  BID_DETAILS_SUCCESS,
  BIDS_SUCCESS,
  EXPERT_PROFILES_SUCCESS,
  NOTIFICATION_SUCCESS,
  PRODUCT_DETAILS_SUCCESS
} from '@constants/actionsType'

/**
 * Set Loader
 * @param {String} payload
 */
export const setLodingStatusAction = payload => {
  const loader = document.querySelector('.Loader')
  if (payload === true) {
    loader.classList.add('ShowLoader')
  } else {
    loader.classList.remove('ShowLoader')
  }
}

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const userAuthSuccessAction = payload => ({
  type: USER_AUTH_SUCCESS,
  payload
})

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const userSetUserDetailsSuccessAction = payload => ({
  type: USER_DETAILS_SUCCESS,
  payload
})

/**
 * Sets profiles list and
 * @param {Object} payload The user login data
 */
export const userSetProfilesSuccessAction = payload => ({
  type: SEARCH_PROFILES_SUCCESS,
  payload
})

/**
 * Sets expert profiles list and
 * @param {Object} payload The user login data
 */
export const userSetExpertProfilesSuccessAction = payload => ({
  type: EXPERT_PROFILES_SUCCESS,
  payload
})

/**
 * Sets profiles bid details
 * @param {Object} payload The user login data
 */
export const userSetBidDetailsSuccessAction = payload => ({
  type: BID_DETAILS_SUCCESS,
  payload
})

/**
 * Set profiles bid details
 * @param {Object} payload The Bid Recieved data
 */
export const userSetBidsSuccessAction = payload => ({
  type: BIDS_SUCCESS,
  payload
})

/**
 * Set profiles bid details
 * @param {Object} payload The Bid Recieved data
 */
export const userSetNotificationSuccessAction = payload => ({
  type: NOTIFICATION_SUCCESS,
  payload
})

/**
 * Set product details
 * @param {Object} payload The Bid Recieved data
 */
export const userSetProductSuccessAction = payload => ({
  type: PRODUCT_DETAILS_SUCCESS,
  payload
})
