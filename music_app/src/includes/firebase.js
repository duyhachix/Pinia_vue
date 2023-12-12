import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyB8FOUwXOxQiaGBEw7H-I5X-N3UIm1QOeg',
  authDomain: 'music-275ae.firebaseapp.com',
  projectId: 'music-275ae',
  storageBucket: 'music-275ae.appspot.com',
  appId: '1:26746577836:web:73a3ad2b088c8a2e6b1009',
  measurementId: 'G-W0PNRWR4JH',
};

export default firebase.initializeApp(firebaseConfig);
