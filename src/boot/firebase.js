import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: "AIzaSyB9vsPQsgpwT5Yt4O1Kt4G-GFaPuDEaCZA",
  authDomain: "todo-win-c903e.firebaseapp.com",
  databaseURL: "https://todo-win-c903e.firebaseio.com",
  projectId: "todo-win-c903e",
  storageBucket: "todo-win-c903e.appspot.com",
  messagingSenderId: "355736126488",
  appId: "1:355736126488:web:c27947943eac2a831eef6d"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };
