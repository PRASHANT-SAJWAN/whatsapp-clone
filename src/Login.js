import { Button } from '@material-ui/core';
import React from 'react';
import db, { auth, provider } from './firebase';
import './Login.css';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{ }, dispatch] = useStateValue();
    const add = (email, name) => {
        var flag = false;
        db.collection(email).where('name', '==', name).get().then(function (docs) {
            docs.forEach(doc => {
                if (doc.data().name === name) {
                    flag = true;
                }
            });
            if (!flag) {
                db.collection(email).add({
                    name: name,
                });
            }
        });
    }

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
                add(result.user.email, result.user.displayName);
            })
            .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" />
                <div className="login__text">
                    <h1>Sign in</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with google
                </Button>
            </div>
        </div>
    )
}

export default Login
