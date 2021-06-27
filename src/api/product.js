import { auth, db, storage, serverTimestamp } from '@src/firebase'
import { storeDispatcher } from '@store'
import { userSetUserDetailsSuccessAction } from '@actions'
import addToaster from '@shared/Notification'
import { setLodingStatusAction } from '@actions'

/** Add Product
 * @param {Object} payload
 * @param {Object} payload.uid
 */
export const callAddProductApi = async (uid, payload) => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const data = await db
      .collection(`users/${uid}/products`)
      .add({ ...payload, createdAt: serverTimestamp })
    storeDispatcher.dispatch(setLodingStatusAction(false))
    return data
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Edit Product using user id product id
 * @param {Object} payload.uid
 * @param {Object} payload.id
 * @param {Object} payload
 */
export const callEditProductApi = async (uid, id, payload) => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const data = await db
      .collection(`users/${uid}/products`)
      .doc(id)
      .set({ ...payload, createdAt: serverTimestamp }, { merge: true })
    storeDispatcher.dispatch(setLodingStatusAction(false))
    return data
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Get for logined user products list
 * @param {Object} payload.uid
 */
export const callGetUserProductsApi = async uid => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const { docs } = await db.collection(`/users/${uid}/products`).get()
    storeDispatcher.dispatch(setLodingStatusAction(false))
    return (
      docs &&
      docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
    )
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Get all products list
 * @param {Object} payload.uid
 */
export const callGetProductsApi = async () => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const { docs = [] } = await db.collection('/users').get()
    storeDispatcher.dispatch(setLodingStatusAction(false))
    const data = await Promise.all(
      docs.map(async doc => {
        const { docs } = await doc.ref.collection('products').get()
        return await Promise.all(
          docs.map(item => {
            return { ...item.data(), id: item.id }
          })
        )
      })
    )
    return data.flat(1)
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Get user product using user id and product id
 * @param {Object} payload.uid
 * @param {Object} payload.id
 */
export const callGetUserProductApi = async (uid, id) => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const doc = await db.collection(`/users/${uid}/products`).doc(id).get()
    storeDispatcher.dispatch(setLodingStatusAction(false))
    return { ...doc.data(), id: doc.id }
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}

/** Get product categories using from utility
 * @param {Object} payload.uid
 * @param {Object} payload.id
 */
export const callGetProductCategoriesApi = async () => {
  try {
    const doc = await db.collection('/utility').doc('categories').get()
    const data = doc.data()
    return { status: 200, data }
  } catch (error) {
    addToaster('error', error.message)
  }
}

/** Upload documents using user uid
 * @param {Object} payload
 * @param {Object} payload.uid
 */
export const callUploadProductImageApi = (uid, payload) => {
  const { name, file } = payload
  return storage.ref(`/products/${uid}/${name}`).put(file)
}

export const callGetProductImagesApi = async uid => {
  storeDispatcher.dispatch(setLodingStatusAction(true))
  try {
    const { items } = await storage.ref().child(`products/${uid}`).listAll()
    const imageList = await Promise.all(
      items.map(async item => {
        const url = await item.getDownloadURL()
        return await url
      })
    )
    storeDispatcher.dispatch(setLodingStatusAction(false))
    return imageList
  } catch (error) {
    storeDispatcher.dispatch(setLodingStatusAction(false))
    addToaster('error', error.message)
  }
}
