import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyD1N7dOnMq7qUmP52zulwfHBhicbK8DkxA",
    authDomain: "toil-tracker.firebaseapp.com",
    projectId: "toil-tracker",
    storageBucket: "toil-tracker.appspot.com",
    messagingSenderId: "28745633901",
    appId: "1:28745633901:web:76cbe52b40cbd1261aaf64"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init service
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()


  export { projectFirestore, projectAuth }