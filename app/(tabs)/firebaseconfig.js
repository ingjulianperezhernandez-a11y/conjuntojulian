import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AAIzaSyB9VlOAOE5rFcWFs54A7YsBqqLSQp6fUgM",
  authDomain: "miconjunto92.firebaseapp.com",
  projectId: "miconjunto92",
  storageBucket: "miconjunto92.firebasestorage.app",
  messagingSenderId: "83963151023",
  appId: "1:83963151023:web:146b1b97bcb0d257cfa5a",
  measurementId: "G-SW66H9QNQE"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);