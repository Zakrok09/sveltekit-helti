import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence } from "firebase/auth";
import 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import {authState} from "rxfire/auth"
import {map} from 'rxjs/operators'

const firebaseConfig = {

    apiKey: "AIzaSyAjrR-lShdKImu-5KqcmlxarQy8Vd13whQ",
  
    authDomain: "helti-e0359.firebaseapp.com",
  
    databaseURL: "https://helti-e0359-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "helti-e0359",
  
    storageBucket: "helti-e0359.appspot.com",
  
    messagingSenderId: "1027203634759",
  
    appId: "1:1027203634759:web:cb82b4611b813294188362"
  
};


export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
setPersistence(auth, browserSessionPersistence);
export const loginWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const newAccount = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loggedin$ = authState(auth).pipe(map(user=> (user ? user:null)));
export const logout = () => auth.signOut();
export const db = getFirestore(app);
export const database = getDatabase(app)
  