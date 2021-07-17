import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Button from './components/Button';
import Channel from './components/Channel';

firebase.initializeApp({
  apiKey: "AIzaSyAzdmAscTsQbrZHrNl8lzQfru47Xpe0eZc",
  authDomain: "adda-app-1.firebaseapp.com",
  projectId: "adda-app-1",
  storageBucket: "adda-app-1.appspot.com",
  messagingSenderId: "444927010633",
  appId: "1:444927010633:web:05816ee70666e2c817dc98"
})
const auth = firebase.auth();
const db = firebase.firestore();
function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const[initializing, setInitializing] = useState(true);

  useEffect(() => {

    const unsubcribe = auth.onAuthStateChanged(user =>{
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      if (initializing) {

        setInitializing(false)
        
      }
    })

    return unsubcribe;

  }, [])

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    };
  }

  const signOut = async () =>{
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    };
  }

  if (initializing) return 'Loading...'
  return (
    <div>
      <h1 className='text-red-500'>Yeeeeee</h1>
     { user ? (
       <>
       <Button onClick={signOut}>Sign Out</Button>
       <Channel user={user} db={db}/>
       <p>"Welcome to Adda App"</p>
       </>
       ) : ( 
       <Button onClick={signInWithGoogle}>Sign In With Google</Button>
       )}

    </div>
  );
}

export default App;
