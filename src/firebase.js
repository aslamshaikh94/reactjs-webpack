import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// firebase.firestore.setLogLevel('debug')
firebase.firestore().settings({ experimentalForceLongPolling: true })

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
