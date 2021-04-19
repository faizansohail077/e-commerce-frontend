import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCl6wE-sF9GEO_mZds1eeryFPPMSRxcCTA",
    authDomain: "e-commerce-mern-ae764.firebaseapp.com",
    projectId: "e-commerce-mern-ae764",
    storageBucket: "e-commerce-mern-ae764.appspot.com",
    messagingSenderId: "539698426265",
    appId: "1:539698426265:web:4f89f54b5eddbc6c9e2308",
    measurementId: "G-BYRD6FHD8E"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
