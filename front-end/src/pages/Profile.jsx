import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { baseURL, getUser } from '../services/api';
import { useParams } from 'react-router-dom';
import { ImageList, ImageListItem } from '@mui/material';

import FollowButton from '../components/FollowButton';
import Avatar from '../components/Avatar';
import Spinner from '../components/Spinner';

import sharedStyles from '../styles/layout.module.css';
import classes from './Profile.module.css';
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const token = useSelector(state => state.tokenStore.token);
   const SidebarState = useSelector(state => state.sidebarStore.fullWidth);

  const getUserData = async () => {
    const serverRes = await getUser(token, params.id);
    setUserData(serverRes.result.user);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const number = obj => {
    return Object.keys(obj).length.toString();
  };

  return (
    <section
      className={`${classes.main} ${sharedStyles.shared} ${
        SidebarState ? sharedStyles.normal : sharedStyles.full
      }`}
    >
      <div className={classes.profile_header}>
        {userData && (
          <Avatar size={120} story={true} profileUrl={userData.imageUrl} />
        )}
        <span className={classes.header_text_wrapper}>
          <span className={classes.header_text}>
            <p>{userData && userData.username}</p>
            <p>{userData && userData.bio}</p>
          </span>
          <span className={classes.data_wrapper}>
            <span className={classes.data}>
              <p>{userData && number(userData.posts)}&nbsp;Posts</p>
              <p>{userData && number(userData.followers)}&nbsp;Followers</p>
              <p>{userData && number(userData.following)}&nbsp;following</p>
            </span>
            <FollowButton />
          </span>
        </span>
      </div>
      <div className={classes.profile_content}>
        {isLoading ? (
          <center>
            <Spinner />
          </center>
        ) : (
          <ImageList
            sx={{ width: '100%', height: 'fit-content' }}
            cols={3}
            rowHeight={164}
            gap={5}
          >
            {userData && userData.posts.length > 0 ? (
              userData.posts.map(item => (
                <ImageListItem
                  key={item._id}
                  sx={{ aspectRatio: 1, width: '100%' }}
                >
                  <img
                    src={`${baseURL}/${item.imageUrls.at(0)}`}
                    loading='lazy'
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </ImageListItem>
              ))
            ) : (
              <center>
                <p>No posts yet!</p>
              </center>
            )}
          </ImageList>
        )}
      </div>
    </section>
  );
};

export default Profile;
