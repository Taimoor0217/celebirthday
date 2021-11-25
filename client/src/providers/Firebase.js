import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: "celebirthday-f5331.firebaseapp.com",

  projectId: "celebirthday-f5331",

  storageBucket: "celebirthday-f5331.appspot.com",

  messagingSenderId: "936171983209",

  appId: "1:936171983209:web:7a54faae064011bf56edf8"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
