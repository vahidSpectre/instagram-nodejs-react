import React from 'react';
import { baseURL } from '../services/api';

import classes from './Avatar.module.css';
const Avatar = ({ size, story, isLoading, profileUrl }) => {
  const borderStyle = () => {
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
    <div
      className={classes.avatar_container}
      style={{ width: size, height: size }}
    >
      {story && <div className={classes.avatar_border} style={borderStyle()} />}
      {profileUrl && (
        <img
          src={`${baseURL}/${profileUrl}`}
          alt=''
          className={classes.avatar_image}
          style={{ width: `${size - 8}px`, height: `${size - 8}px` }}
        />
      )}
    </div>
  );
};

export default Avatar;
