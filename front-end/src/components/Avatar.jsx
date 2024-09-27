import React from 'react';

import classes from './Avatar.module.css';
const Avatar = ({ story, isLoading, profileUrl }) => {
  const returnBorderStyle = () => {
    if (story) {
      if (isLoading) {
        return {
          borderRightStyle: 'dashed',
          borderTopStyle: 'dashed',
          borderLeftStyle: 'dashed',
          borderBottomStyle: 'dashed',
        };
      } else {
        return {
          borderRightStyle: 'solid',
          borderTopStyle: 'solid',
          borderLeftStyle: 'solid',
          borderBottomStyle: 'solid',
        };
      }
    }
  };
  return (
    <div className={classes.avatar_container}>
      {story && (
        <div className={classes.avatar_border} style={returnBorderStyle()} />
      )}
      {profileUrl && (
        <img
          src={`http://192.168.1.10:8080/${profileUrl}`}
          alt=''
          className={classes.avatar_image}
        />
      )}
    </div>
  );
};

export default Avatar;
