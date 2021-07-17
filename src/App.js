import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Button from './components/Button';
import Channel from './components/Channel';
import Navbar from './components/Navbar';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAzdmAscTsQbrZHrNl8lzQfru47Xpe0eZc",
    authDomain: "adda-app-1.firebaseapp.com",
    projectId: "adda-app-1",
    storageBucket: "adda-app-1.appspot.com",
    messagingSenderId: "444927010633",
    appId: "1:444927010633:web:05816ee70666e2c817dc98"
  });
}

const auth = firebase.auth();
const db = firebase.firestore();
function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {

    const unsubcribe = auth.onAuthStateChanged(user => {
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

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    };
  }

  if (initializing) return 'Loading...'
  return (
    <div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
      <div className="">
        <nav class="bg-gray-800">
          <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
              <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex items-center flex-shrink-0 text-white mr-6">
                  <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                  <span class="font-semibold text-xl tracking-tight">Adda App</span>
                </div>

              </div>
            </div>
          </div>
        </nav>
        <div >
          {user ? (
            <>
              <button
                onClick={signOut}
                className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 float-right"
              >
                Sign out
              </button>
              <Channel user={user} db={db} />
            </>
          ) : (
            <div className="grid .grid-flow-row .grid-rows-5">
                <button onClick={signInWithGoogle} className="p-2 px-4 m-5 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
                  Sign In With Google
                </button>
            </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default App;
