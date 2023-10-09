import firebase from 'firebase/app';
import 'firebase/firebase-database'
import { getAuth, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider } from "firebase/auth";

//Importante importar o serviço de auth
import 'firebase/auth';


const config = require('../config/firebaseCreds.js')

firebase.initializeApp(config);

//Iniciar o serviço de auth


const persistence = firebase.auth.Auth.Persistence.LOCAL;

export const auth = firebase.auth();
const db = firebase.database()

const getAll = () => {
      return db
}

//Iniciar o google sing in
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

//Exporta a função de login
export const singInWithGoogle = () => auth.signInWithPopup(provider);
export default{
  getAll
}
