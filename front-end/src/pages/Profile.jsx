import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import sharedStyles from '../styles/layout.module.css';
import classes from './Profile.module.css';
import { getUser } from '../services/api';
import { useParams } from 'react-router-dom';
const Profile = () => {
  const [userData, setUserData] = useState([]);

  const params = useParams();

  const token = useSelector(state => state.tokenStore.token);

  const getUserData = async () => {
    const serverRes = await getUser(token, params.id);
    setUserData(serverRes.result);
  };

  useEffect(() => {
    getUserData();
  }, [params.id]);


  return (
    <div className={`${classes.main} ${sharedStyles.shared}`}>
      Profile/{userData && userData.user?.username}
    </div>
  );
};

export default Profile;
