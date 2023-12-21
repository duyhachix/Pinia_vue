import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDx4vDz8Tf1RtRLNwg0V1hnH9Wxw-bzfhQ',
  authDomain: 'music-pinia.firebaseapp.com',
  projectId: 'music-pinia',
  storageBucket: 'music-pinia.appspot.com',
  appId: '1:289086431454:web:30da4b51a8b625f5bfe24f',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const usersCollection = db.collection('users');

export { auth, db, usersCollection, storage };
