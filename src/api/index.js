import { auth, db, serverTimestamp } from '@src/firebase'
import { storeDispatcher } from '@store'
import { userSetUserDetailsSuccessAction } from '@actions'
import addToaster from '@shared/Notification'
import { setLodingStatusAction } from '@actions'

// const {  } = getAppStore()

/** Signup user using email, password
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */
export const callUserSignupApi = async payload => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  const { email, password } = payload
  try {
    const data = await auth.createUserWithEmailAndPassword(email, password)
    storeDispatcher.dispatch(setLodingStatusAction(false))
    return { status: 200, data }
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Signin user using email, password
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */
export const callUserSigninApi = async payload => {
  const { email, password } = payload
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const data = await auth.signInWithEmailAndPassword(email, password)
    storeDispatcher.dispatch(setLodingStatusAction(false))
    return { status: 200, data }
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Sign out user using email, password
 */
export const callUserSignOutApi = () => {
  return auth.signOut()
}

/** Reset user password, using user email
 */
export const callUserPasswordResetApi = async email => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const data = await auth.sendPasswordResetEmail(email)
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('success', 'Please check inbox')
    return data
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Send email verification */
export const callUserSendEmailVerification = async () => {
  try {
    const data = await auth.sendEmailVerification()
    return data
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Get current login user token
 */
export const callCurrentUserTokenIdApi = () => {
  return auth.currentUser.getIdToken(/* forceRefresh */ true)
}

/** Update user profile
 * @param {Object} payload
 */
export const callSetUserDetailsApi = async (uid, payload) => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const data = await db
      .collection('users')
      .doc(uid)
      .set({ ...payload, createdAt: serverTimestamp }, { merge: true })
    storeDispatcher.dispatch(setLodingStatusAction(false))
    return { status: 200, data }
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Get user profile details
 * @param {Object} payload
 * @param {Object} payload.uid
 */
export const callGetUserDetailsApi = async uid => {
  try {
    return db
      .collection('users')
      .doc(uid)
      .onSnapshot(sanapshot => {
        const data = sanapshot.data()
        storeDispatcher.dispatch(userSetUserDetailsSuccessAction(data))
      })
  } catch (error) {
    addToaster('error', error.message)
  }
}
