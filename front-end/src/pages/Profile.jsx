import React from 'react';

import sharedStyles from '../styles/layout.module.css';
import classes from './Profile.module.css';
const Profile = () => {
  return (
    <div className={`${classes.main} ${sharedStyles.shared}`}>Profile</div>
  );
};

export default Profile;
