import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyD8yM074fdAssnzpfbSVgZLgFS7fS7eNXw',
    authDomain: 'john-ecommerce.firebaseapp.com',
    projectId: 'john-ecommerce',
    storageBucket: 'john-ecommerce.appspot.com',
    messagingSenderId: '720090344712',
    appId: '1:720090344712:web:3605d7ed6f07552693d0bd'
}

const fire = initializeApp(firebaseConfig)
const auth = getAuth(fire)
const store = getFirestore(fire)
const fun = getFunctions(fire)

export default { auth, store, fun }
