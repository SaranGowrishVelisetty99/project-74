import firebase from 'firebase/app';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyBi4hJwAfGaDsucn3XolXlvJmv7s2p1_eA",
    authDomain: "story-hub-be93f.firebaseapp.com",
    projectId: "story-hub-be93f",
    storageBucket: "story-hub-be93f.appspot.com",
    messagingSenderId: "44532722860",
    appId: "1:44532722860:web:6a74478374e6fd64fc0309"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore()