import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../services/api';
import { addMessageWithTimeout } from '../store/infoSlice';

import { tokenAction, userActions } from '../store/store';

import classes from './Login.moduls.css';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleLogin = async () => {
		const serverRes = await login({ email, password });
		console.log(serverRes)
		dispatch(addMessageWithTimeout(serverRes.result.message))
		if (!serverRes.response.ok) {
			return;
		}
		dispatch(tokenAction.loadToken(serverRes.result.token));
		dispatch(userActions.loadUser(serverRes.result.user));
	};

	return (
		<div>
			<span>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					onChange={e => setEmail(e.target.value)}
				/>
			</span>
			<span>
				<label htmlFor="password">password</label>
				<input
					type="text"
					name="password"
					onChange={e => setPassword(e.target.value)}
				/>
			</span>
			<button onClick={handleLogin}>log in</button>
		</div>
	);
};

export default Login;
