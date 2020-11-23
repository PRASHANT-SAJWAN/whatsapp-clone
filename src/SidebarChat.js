import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';
import DeleteGroup from './DeleteGroup';

function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    
    // generate random avatar every time screen is refreshed 
    useEffect(() => {
        setSeed (Math.floor(Math.random() * 5000));
    }, []);

    useEffect(()=> {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot=> {
                setMessages(snapshot.docs.map((doc)=> doc.data()))
            });
        }
    }, [id])

    const createChat = ()=> {
        const roomName = prompt ("Please enter name for chat room");
        if (roomName) {
            // add room to data base
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addNewChat? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={'https://avatars.dicebear.com/api/human/' + seed + '.svg'} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
                <div className="delete__icon">
                    <DeleteGroup roomId={id}/>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Public Group</h2>
        </div>
    );
}


export default SidebarChat
