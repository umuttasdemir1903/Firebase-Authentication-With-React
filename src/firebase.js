import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
import store from "./store/İndex";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const update = async data => {
  try{
    await updateProfile(auth.currentUser,data)
    toast.success('Profile updated')
    return true
  }catch(err){
    toast.error(err.message)
  }
}

export const resetPassword = async password => {
  try{
    await updatePassword(auth.currentUser,password)
    toast.success('Password updated')
    return true
  }catch(err){
    toast.error(err.message)
  }
}

export const emailVerification = async () => {
  try{
    await sendEmailVerification(auth.currentUser)
    toast.success(`Verification mail ${auth.currentUser.email} sent your mail, please check !`)
  }catch(err){
    toast.error(err.message)
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle({
      displayName : user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,

    }))
  } else {
    store.dispatch(logoutHandle())
  }
});

export default app;
