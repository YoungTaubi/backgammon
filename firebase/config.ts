import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';


var firebaseConfig = {
    
    apiKey: process.env.API_KEY,
    authDomain: "multiplayergamebackend-101.firebaseapp.com",
    databaseURL: "https://multiplayergamebackend-101-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "multiplayergamebackend-101",
    storageBucket: "multiplayergamebackend-101.appspot.com",
    messagingSenderId: "420811443218",
    appId: "1:420811443218:web:a30eeb0bfef5e3a6875ccb",
    measurementId: "G-V9RJDXYS13"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

const rtdb = getDatabase();

export { auth, db, rtdb };
