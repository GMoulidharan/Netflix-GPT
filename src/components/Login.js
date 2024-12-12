import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);


    const handleButtonClick = () => {
        //Get values safely
        const emailValue = email.current?.value || "";
        const passwordValue = password.current?.value || "";
        //Validate the form data
        const message = checkValidData(emailValue, passwordValue);
        setErrorMessage(message);

        if (message) return; //Don't go a head
        //Other wise sign in or sign up(Logic)

        if (!isSignInForm) {
            //Sign up logic
            createUserWithEmailAndPassword(
                auth,
                emailValue,
                passwordValue
            )
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        // Profile updated!
                        //dispatch an action & update profile once again
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName, photoURL: photoURL
                        })
                        );
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message)
                    });
                    // console.log(user);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            //Sign in logic
            signInWithEmailAndPassword(
                auth,
                emailValue,
                passwordValue
            )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }
    }

    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm);
    };

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ce449112-3294-449a-b8d3-c4e1fdd7cff5/web/IN-en-20241202-TRIFECTA-perspective_0acfb303-6291-4ad1-806f-dda785f6295a_small.jpg"
                    alt='bg img'></img>
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='absolute bg-black p-12 w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className="font-bold text-4xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input
                        ref={name}
                        type='text'
                        placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'
                    />
                )}
                <input
                    ref={email}
                    type='text'
                    placeholder='Email address' className='p-4 my-4 w-full bg-gray-700'
                />

                <input
                    ref={password}
                    type='password'
                    placeholder='Password'
                    className='p-4 my-4 w-full bg-gray-700'
                />
                <p className="text-red-600 font-bold text-lg py-2">
                    {errorMessage}
                </p>

                <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="p-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "new to Netflix? Sign Up now" : "Already Registered? Sign In now"}</p>
            </form>
        </div>
    )
}

export default Login;