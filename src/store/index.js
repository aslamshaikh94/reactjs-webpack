import React, { createContext, useContext, useReducer } from 'react'
import rootReducer, { initialState } from '@reducers/'

/**
 Set store globally
 */
export const setAppStore = store => {
  localStorage.setItem('store', JSON.stringify(store))
}

/**
 This store can use globally out of componet
 */
export const getAppStore = () => {
  return JSON.parse(localStorage.getItem('store')) || {}
}

/**
 * This is the actual context. Needs to be injected into `useContext` to
 * get store functionalities
 */
export const Store = createContext()

/**
 * Simple hook to get store.
 */
export const useStore = () => useContext(Store)

/**
 * This dispatcher is used to overcome the problem of not being able to use
 * hooks outside a component. It is initialized when `StoreProvider` is
 * instantiated. Use whenever actions need to be dispatched from outside
 * a component like an interceptor etc.
 */
export const storeDispatcher = {
  isReady: false,
  dispatch: () => {
    throw new Error('Dispatch Unavailable')
  }
}

/**
 * The store provider HOC. Passes down the context to the component tree.
 * Makes the `useStore` hook usable throughout the app.
 */
export const StoreProvider = ({ children }) => {
  const appStore = getAppStore()
  const [state, dispatch] = useReducer(rootReducer, appStore || initialState)
  const storeValue = { state, dispatch }

  if (!storeDispatcher.isReady) {
    storeDispatcher.isReady = true
    storeDispatcher.dispatch = params => dispatch(params)
    Object.freeze(storeDispatcher)
  }
  return <Store.Provider value={storeValue}>{children}</Store.Provider>
}
