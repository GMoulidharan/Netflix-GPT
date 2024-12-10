import React, { useState } from 'react'
import Header from './Header';

const Login = () => {

    const [isSignInForm, setSignInForm] = useState(true);

    const toggleSignInForm = () =>{
        setSignInForm(!isSignInForm);
    };

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ce449112-3294-449a-b8d3-c4e1fdd7cff5/web/IN-en-20241202-TRIFECTA-perspective_0acfb303-6291-4ad1-806f-dda785f6295a_small.jpg"
                    alt='bg img'></img>
            </div>
            <form className='absolute bg-black p-12 w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className="font-bold text-4xl py-4">{isSignInForm? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                <input
                    type='text'
                    placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'
                />
                )}
                <input
                    type='text'
                    placeholder='Email address' className='p-4 my-4 w-full bg-gray-700'
                />
                
                <input
                    type='password'
                    placeholder='Password'
                    className='p-4 my-4 w-full bg-gray-700' />
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm? "Sign In" : "Sign Up"}</button>
                <p className="p-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "new to Netflix? Sign Up now" : "Already Registered? Sign In now"}</p>
            </form>
        </div>
    )
}

export default Login;