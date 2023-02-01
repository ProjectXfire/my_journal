import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

let firebaseConfig = {} as any;
if (process.env.NODE_ENV === "test") {
  firebaseConfig.apiKey = process.env.NEXT_PUBLIC_TEST_API_KEY;
  firebaseConfig.authDomain = process.env.NEXT_PUBLIC_TEST_AUTH_DOMAIN;
  firebaseConfig.projectId = process.env.NEXT_PUBLIC_TEST_PROJECT_ID;
  firebaseConfig.storageBucket = process.env.NEXT_PUBLIC_TEST_STORAGE_BUCKET;
  firebaseConfig.messagingSenderId =
    process.env.NEXT_PUBLIC_TEST_MESSAGING_SENDER_ID;
  firebaseConfig.appId = process.env.NEXT_PUBLIC_TEST_APP_ID;
} else {
  firebaseConfig.apiKey = process.env.NEXT_PUBLIC_API_KEY;
  firebaseConfig.authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
  firebaseConfig.projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  firebaseConfig.storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
  firebaseConfig.messagingSenderId =
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
  firebaseConfig.appId = process.env.NEXT_PUBLIC_APP_ID;
}

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
