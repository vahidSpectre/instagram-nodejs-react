import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { followUser, followUserState } from '../services/api';

import classes from './FollowButton.module.css';
const FollowButton = () => {
  const [isActive, setIsActive] = useState(false);

  const currentUserId = useSelector(state => state.userStore.user._id);
  const token = useSelector(state => state.tokenStore.token);

  const params = useParams();
  const profileId = params.id;

  const handleFollow = async () => {
    const serverRes = await followUser(token, profileId);
    setIsActive(serverRes.result.isFollowingUser);
  };

  const getFollowState = async () => {
    const serverRes = await followUserState(token, profileId);
    setIsActive(serverRes.result.isFollowingUser);
  };

  useEffect(() => {
    getFollowState();
  }, []);

  useEffect(() => {
    getFollowState();
  }, [profileId]);

  return (
    <button
      className={`${classes.main} ${
        isActive ? classes.active : classes.deactive
      } ${currentUserId === profileId ? classes.dn : ''}`}
      onClick={() => handleFollow()}
    >
      <p>{isActive ? 'Following' : 'Follow'}</p>
    </button>
  );
};

export default FollowButton;
