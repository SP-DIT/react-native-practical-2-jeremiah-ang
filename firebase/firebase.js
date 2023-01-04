// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCRZWT7j7JA8sJInblJ0pDCRmEBqVI8d78',
    authDomain: 'sp-dit.firebaseapp.com',
    projectId: 'sp-dit',
    storageBucket: 'sp-dit.appspot.com',
    messagingSenderId: '226204881392',
    appId: '1:226204881392:web:0078057993296c2fda4d35',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
