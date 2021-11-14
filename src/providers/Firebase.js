import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {

  apiKey: "AIzaSyBSAiL_SDj13LaxmIRnykyMWe5tT36pQ88",

  authDomain: "celebirthday-f5331.firebaseapp.com",

  projectId: "celebirthday-f5331",

  storageBucket: "celebirthday-f5331.appspot.com",

  messagingSenderId: "936171983209",

  appId: "1:936171983209:web:7a54faae064011bf56edf8"

};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export { db };
