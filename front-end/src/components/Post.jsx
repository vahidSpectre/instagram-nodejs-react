import React, { useEffect, useState } from 'react';
import { baseURL } from '../services/api';

import Avatar from './Avatar';

import classes from './Post.module.css';
const Post = ({ data }) => {
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    data && setPostData(data);
  }, [data]);

  return (
    <div className={classes.main}>
      {postData && (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            story={true}
            profileUrl={postData.creator.imageUrl}
          />
          {postData && postData.creator.username}
        </span>
      )}
      {postData && (
        <img src={`${baseURL}/${postData.imageUrls.at(0)}`} alt='' />
      )}
    </div>
  );
};

export default Post;
