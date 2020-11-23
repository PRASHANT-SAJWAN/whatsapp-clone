import React from 'react'
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';

// todo: not working correctly
function DeleteGroup(data) {
    const handleClick = () => {
        // alert('click');
        console.log('roomId: ' + data.roomId);
        // change url first
        console.log (document.location.href);
        var url_link = document.location.href;
        url_link = url_link.slice (0, url_link.lastIndexOf('/'));
        document.location.href = url_link;
        // remove message from firebase
        db.collection('rooms').doc(data.roomId).delete();
    }
 
    return (
        <div>
            <IconButton onClick={handleClick}>
                <DeleteForeverIcon />
            </IconButton>
        </div>
    )
}

export default DeleteGroup;