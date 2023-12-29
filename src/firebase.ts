import firebase from 'firebase/app';
import 'firebase/database';

// Explicitly import types
import type { FirebaseApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
};

let firebaseApp: FirebaseApp;

// Check if the app is already initialized
if (!firebase.getApps().length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.getApp();
}

export default firebaseApp;