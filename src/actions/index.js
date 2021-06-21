import {
  USER_AUTH_SUCCESS,
  USER_DETAILS_SUCCESS,
  SEARCH_PROFILES_SUCCESS,
  BID_DETAILS_SUCCESS,
  BIDS_SUCCESS,
  EXPERT_PROFILES_SUCCESS,
  NOTIFICATION_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  APPLICATION_LOADING_STATUS
} from '@constants/actionsType'

/**
 * Sets loading status in the context store so that a loader can be
 * displayed when appropriate
 * @param {Boolean} payload Whether the app is in loading state
 */
export const setLodingStatusAction = payload => ({
  type: APPLICATION_LOADING_STATUS,
  payload
})

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
