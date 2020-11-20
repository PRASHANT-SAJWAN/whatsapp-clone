import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { Avatar, IconButton } from '@material-ui/core';
// import MessageIcon from '@material-ui/icons/Message';
// import SyncIcon from '@material-ui/icons/Sync';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase'
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot=> (
            setRooms (snapshot.docs.map(doc=> ({
                id: doc.id,
                data: doc.data(),
            })))
        ));
        return ()=> {
            unsubscribe();
        }
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__header__right">
                    {/* <IconButton> <MessageIcon /> </IconButton> */}
                    {/* <IconButton> <SyncIcon /> </IconButton>
                    <IconButton> <MoreVertIcon /> </IconButton> */}
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    {/* <SearchIcon /> */}
                    <input  placeholder="seach or start a new chat"/>
                </div>
            </div>
            
            <div className="sidebar__chats">
                {/* give parameters */}
                <SidebarChat addNewChat/>
                {rooms.map((room)=> (
                    (room.data.name !== 'dummy_room d2837a5c7d52bf9f472b16bd851d6c09579a80fe5e4fbf293a988c117ee90bb0'? 
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/> 
                        : <div></div>)
                ))}
            </div>
        </div>
    )
}

export default Sidebar
