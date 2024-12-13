import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toogleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) =>store.gpt.showGptSearch);

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

  const handleLanguageChange =(e) =>{
    dispatch(changeLanguage(e.target.value))
  };
  return (
    <div className="w-full absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt='logo'
      />
      {user && (
      <div className='flex p-2'>

        {showGptSearch && (
        <select 
        className='p-2 m-2 bg-gray-800 text-white'
        onChange={handleLanguageChange}
        >
          {SUPPORTED_LANGUAGES.map(lang => 
          <option 
            key={lang.identifier}
            value={lang.identifier}
          >
            {lang.name}
          </option>)}

        </select>)}
        <button 
          className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'
          onClick={handleGptSearchClick}
        >
            {showGptSearch ? "HomePage" : "GPT Search"}
        </button>
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