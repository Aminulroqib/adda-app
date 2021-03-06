import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Message from './Message';

const Channel = ({ user = null, db = null }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('')

    const { uid, displayName, photoURL } = user;

    useEffect(() => {
        if (db) {
            const unsubcribe = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }))

                    setMessages(data);
                })

            return unsubcribe;
        }

    }, [db])
    const handleOnChange = e => {
        setNewMessage(e.target.value)
    }

    const handleOnSubmit = e => {
        e.preventDefault()

        if (db) {
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL,
            });
        }
    }
    return (
        <div className="flex flex-col h-full">
            <div className="overflow-auto h-full">
                <div className="py-4 max-w-screen-lg mx-auto">
                    <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
                        <div className="font-bold text-3xl text-center">
                            <p className="mb-1">Welcome to</p>
                            <p className="mb-3">Adda App</p>
                        </div>
                        <p className="text-gray-400 text-center">
                            This is the beginning of this chat.
                        </p>
                    </div>
                    <ul>
                        {
                            messages.map(message => (
                                <li key={message.id}>
                                    <Message {...message}
                                    />
                                </li>
                            ))}
                    </ul>
                    <div/>
                </div>
            </div>
            <div className="mb-6 mx-4">
                <form onSubmit={handleOnSubmit} className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleOnChange}
                        placeholder="Feel free to type here..."
                        className="flex-1 bg-transparent outline-none"
                    />
                    <button type="submit" disabled={!newMessage} className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Send
                    </button>

                </form>
            </div>
        </div>
    );
};


export default Channel;