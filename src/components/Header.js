import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toogleGptSearchView } from '../utils/gptSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is signed in I will get the user here 
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName, photoURL: photoURL
        })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unSubscribe when component unmounts
    return () => unSubscribe();
  }, []);

  const handleGptSearchClick = () =>{
    //Toggle GPT search
    dispatch(toogleGptSearchView());
  }
  return (
    <div className="w-full absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt='logo'
      />
      {user && (
      <div className='flex p-2'>
        <button 
          className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'
          onClick={handleGptSearchClick}
          >GPT Search</button>
        <img
          src={user?.photoURL}
          className='w-12 h-12'
          alt='userIcon' />
        <button
          onClick={handleSignOut}
          className='font-bold text-white'>(SignOut)</button>
      </div>
      )}
    </div>
  )
}

export default Header