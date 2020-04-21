import * as firebase from "firebase";
import { Props } from "react-firebaseui";
const firebaseConfig = {
  apiKey: "AIzaSyAEIrFxIw7erxv1dYkyPVPOxITepvivbZE",
  authDomain: "arark-timer.firebaseapp.com",
  databaseURL: "https://arark-timer.firebaseio.com",
  projectId: "arark-timer",
  storageBucket: "arark-timer.appspot.com",
  messagingSenderId: "559561346002",
  appId: "1:559561346002:web:f7e1c93c1a4004649c160b",
  measurementId: "G-W6ZMV5Y0M0",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const AuthConfig: Props = {
  uiConfig: {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  },
  firebaseAuth: firebase.auth(),
};
