// not using this file delete after confirming

import { useParams } from 'react-router-dom';
import db from './database';
// import './Chat.js';

var message__container = document.getElementsByClassName('chat__message');

message__container.addEventListener ('onclick', function(e) {

})

function DeleteMessage(messageId) {
    const { roomId } = useParams();

    db.collection('rooms').doc(roomId).collection('messages').doc(messageId).remove();
}

export default DeleteMessage;