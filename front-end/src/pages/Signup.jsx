import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signup } from '../services/api';
import { userActions, tokenAction } from '../store/store';

import classes from './Signup.module.css';
const Signup = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const dispatch = useDispatch();

  const handleSignup = async () => {
    const result = await signup({
      username,
      password,
      email,
      bio,
    });
    console.log(result);
    dispatch(userActions.loadUser(result.user));
    dispatch(tokenAction.loadToken(result.token));
  };

  return (
    <div className={classes.main}>
      <div>
        <label htmlFor="username">user name</label>
        <input
          type="text"
          name="username"
          onChange={e => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="text"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bio">bio</label>
        <input
          type="text"
          name="bio"
          onChange={e => setBio(e.target.value)}
        />
      </div>
      <button onClick={handleSignup}>sugn up</button>
    </div>
  );
};

export default Signup;
