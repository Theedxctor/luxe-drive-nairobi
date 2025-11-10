// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAfzJFWUFy993FR2qoRUdVy_t8S0KosOPo",
  authDomain: "luxedriveke.firebaseapp.com",
  projectId: "luxedriveke",
  storageBucket: "luxedriveke.firebasestorage.app",
  messagingSenderId: "456250680903",
  appId: "1:456250680903:web:714c5999180fa987aff362",
  measurementId: "G-PPQF4P3SP4"
};

// Initialize Firebase
let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  
  // Initialize Analytics only in the client-side and if supported
  if (typeof window !== 'undefined') {
    isSupported().then(yes => yes && getAnalytics(app));
  }
} else {
  app = getApp();
}

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Initialize Authentication
const auth = getAuth(app);

export { app, db, storage, auth };
