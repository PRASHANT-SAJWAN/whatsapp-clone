import { Avatar, IconButton } from '@material-ui/core';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import DropDown from './DropDown';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).get().then(snapshot => {
                setSeed(snapshot.data().seed);
            });
        }
    }, [roomId]);

    useEffect(() => {
        if (roomId) {
            var roomRef = db.collection('rooms').doc(roomId);

            roomRef.get().then(doc => {
                if (!doc.exists) {
                    alert('No such ROOM!');
                } else {
                    db.collection('rooms').doc(roomId).onSnapshot((snapshot) => {
                        setRoomName(snapshot.data().name);
                    });

                    db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                        setMessages(snapshot.docs.map(doc => doc.data()))
                    });
                }
            }).catch(err => {
                console.log('Error getting document', err);
            });
        }
    }, [roomId]);

    const hash_code = (timestamp) => {
        const random = Math.floor(Math.random() * 500000);
        const str = user.displayName + input + timestamp + random;
        var hash = 0, i = 0, len = str.length;
        while (i < len) {
            hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
        }
        return hash + random;
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();

        // write in db
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            email: user.email,
            timestamp: timestamp,
            message_ID: hash_code(timestamp),
        });

        setInput("");
    }

    return (
        roomName ?
            (<div className="chat">
                <div className="chat__header">
                    <Avatar src={'https://avatars.dicebear.com/api/human/' + seed + '.svg'} />
                    <div className="chat__header__info">
                        <h3>{roomName ? roomName : '404 Room Not Found'}</h3>
                        {messages.length === 0 ? "" :
                            (<p>last message at{" "} {
                                new Date(
                                    messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                            </p>)}
                    </div>
                    <div className="chat__header__right">
                        <IconButton> <SearchSharpIcon /> </IconButton>
                        <IconButton> <MoreVertIcon /> </IconButton>
                    </div>
                </div>

                <div className="chat__body">
                    {messages.map(function (message) {
                        return (
                            <p className={`chat__message ${message.email === user.email && "chat__reciever"}`}>
                                <span className="chat__name"> {message.name} </span>
                                {message.message}
                                <span className="chat__timestamp">
                                    {new Date(message.timestamp?.toDate()).toUTCString()}
                                </span>
                                <DropDown msg={message} user={user.displayName} message_ID={message.message_ID} roomId={roomId} message_type={message.name === user.displayName ? "send" : "recieve"} />
                            </p>)
                    })}
                </div>

                <div className="chat__footer">
                    <IconButton>
                        <InsertEmoticonIcon />
                    </IconButton>
                    <form>
                        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                        <button onClick={sendMessage} type="submit">Send</button>
                    </form>
                    <IconButton>
                        <MicIcon />
                    </IconButton>
                </div>
            </div>)
            : (<div className="no__chat"></div>)
    )
}

export default Chat