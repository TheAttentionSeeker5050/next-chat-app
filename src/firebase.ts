import firebase from 'firebase/app';
import 'firebase/database';

// Explicitly import types
import type { FirebaseApp } from 'firebase/app';
import { initializeApp } from "firebase/app";

// use environment variables

let firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY as string,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
    databaseURL: process.env.FIREBASE_DATABASE_URL as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.FIREBASE_APP_ID as string,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID as string
};

let firebaseApp: FirebaseApp;

// initialize firebase app
firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;