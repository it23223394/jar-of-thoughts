import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBKgCywgYYqj0401ncntZJSJOOq_peMl7o",
  authDomain: "jar-of-thoughts.firebaseapp.com",
  projectId: "jar-of-thoughts",
  storageBucket: "jar-of-thoughts.firebasestorage.app",
  messagingSenderId: "36161050234",
  appId: "1:36161050234:web:d3801f5f240981874a8dc3",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)