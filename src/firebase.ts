import firebase from 'firebase/app';
import 'firebase/database';

// Explicitly import types
import type { FirebaseApp } from 'firebase/app';
import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';


// declare types for the firebase config
interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}


let firebaseConfig : FirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string
};


let firebaseApp: FirebaseApp;

// initialize firebase app


if (process.env.NODE_ENV === 'development') {
    // check if there are running emulators
    firebaseApp = initializeApp({
        projectId: "next-chat-app-f0e97",
        databaseURL: "http://127.0.0.1:9000/?ns=next-chat-app-f0e97"
    });

    if (process.env.FIREBASE_DATABASE_EMULATOR_HOST?.length) {
        console.log('Already connected to the emulator');
    } else {
        try {
        connectDatabaseEmulator(getDatabase(
            firebaseApp
        ), '127.0.0.1', 9000, { mockUserToken: "admin" });
        } catch (e) {
            console.log('Emulator already connected');
            // console.log(e);
        }
    }
} else {
        
    firebaseApp = initializeApp(firebaseConfig);
}

export default firebaseApp;