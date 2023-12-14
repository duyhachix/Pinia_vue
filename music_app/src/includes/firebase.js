import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDx4vDz8Tf1RtRLNwg0V1hnH9Wxw-bzfhQ",
  authDomain: "music-pinia.firebaseapp.com",
  projectId: "music-pinia",
  storageBucket: "music-pinia.appspot.com",
  appId: "1:289086431454:web:30da4b51a8b625f5bfe24f"
};

export default firebase.initializeApp(firebaseConfig);
