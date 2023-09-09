

//Intializing the firebase
import { initializeApp } from "firebase/app";
//Intializing firebse to craete user email authorization
import { getAuth} from "firebase/auth";
//initalizing the to login into the firebase
import { getFirestore } from "firebase/firestore";
//getting the firestore modules
import { getStorage } from "firebase/storage";



  const firebaseConfig = {
    apiKey: "AIzaSyDC6WHfsVYGnDbWLW4Aygr8_zi1IdBHKAQ",
  authDomain: "hr-stop.firebaseapp.com",
  projectId: "hr-stop",
  storageBucket: "hr-stop.appspot.com",
  messagingSenderId: "93226985699",
  appId: "1:93226985699:web:d59a426401ddef5231fdd6",
  measurementId: "G-JVCR3DCX8R"
  };
  
  const app = initializeApp(firebaseConfig);

  //initialize the db
  export const db = getFirestore(app);

  //so this app will have authentication
  export const auth = getAuth(app)
  export  const storage = getStorage(app);

  