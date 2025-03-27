// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd9ZTX4w6n_TVqzA0a4TEU2sR8p9V_-5o",
  authDomain: "netflix-clone-3961e.firebaseapp.com",
  projectId: "netflix-clone-3961e",
  storageBucket: "netflix-clone-3961e.firebasestorage.app",
  messagingSenderId: "622674933187",
  appId: "1:622674933187:web:023ad0c1fa02fa6f20f976"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);

const signup = async(name,email,password)=>{
    try {
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user=res.user;
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       });
    
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}
const login= async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}