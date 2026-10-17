import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "digipasalproject.firebaseapp.com",
  projectId: "digipasalproject",
  storageBucket: "digipasalproject.firebasestorage.app",
  messagingSenderId: "964133234043",
  appId: "1:964133234043:web:6da100eae4edb6586709de",
  measurementId: "G-9KQQNW19PJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
