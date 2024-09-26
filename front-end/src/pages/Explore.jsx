import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { getAllPosts } from '../services/api';

import sharedStyles from '../styles/layout.module.css';
import classes from './Explore.module.css';
import { ImageList, ImageListItem, Skeleton } from '@mui/material';

const Explore = ({ windowSize }) => {
  const [res, setRes] = useState([]);
  const [page, setPage] = useState(1);
  const [postData, setPostData] = useState([]);
  const [size, setSize] = useState('');
  const [cols, setCols] = useState(0);

  const imgRef = useRef();

  const token = useSelector(state => state.tokenStore.token);

  const getPosts = async page => {
    console.log('req sent');
    const serverRes = await getAllPosts(token, page);
    setRes(pre => [...pre, serverRes]);
  };

  useEffect(() => {
    getPosts(page);
  }, []);

  useEffect(() => {
    setSize(windowSize);
  }, [windowSize]);

  const fetchNextPage = () => {
    setPage(page + 1);
    getPosts(page + 1);
  };

  useEffect(() => {
    if (res.length > 0) {
      setPostData(state => [...state, ...res.at(-1).result?.finallPosts]);
    }
  }, [res]);

  useEffect(() => {
    if (size === 's' || size === 'xs') setCols(4);
    if (size === 'm') setCols(4);
    if (size === 'l') setCols(5);
    if (size === 'xl') setCols(6);
    // alert(size)
  }, [size]);

  const returnCols = i => {
    if (size === 'xl') {
      if (i % 8 === 0) return 2;
      if (i % 8 === 1) return 1;
      if (i % 8 === 2) return 1;
      if (i % 8 === 3) return 2;
    }
    if (size === 'l') {
      if (i % 4 === 0) return 2;
      if (i % 4 === 1) return 2;
      if (i % 4 === 2) return 1;
    }
    if (size === 'm' || size === 'xs') {
      if (i % 3 === 0) return 2;
      if (i % 3 === 1) return 1;
      if (i % 3 === 2) return 1;
    }
  };

  // useEffect(() => {
  //   console.log(imgRef.current);
  //   const observer = new IntersectionObserver(
  //     ({ entries }) => {
  //       entries.ma
  //     },
  //     {
  //       threshold: 1,
  //       rootMargin: '0px',
  //     },
  //   );
  //   if (imgRef.current) observer.observe(imgRef.current);

  //   return () => {
  //     if (imgRef.current) observer.unobserve(imgRef.current);
  //   };
  // }, [imgRef]);

  return (
    <div className={`${classes.main} ${sharedStyles.shared}`}>
      <ImageList
        sx={{ width: '100%', height: 'fit-content' }}
        cols={cols}
        rowHeight={164}
        gap={'5px'}
      >
        {postData.map((item, i) => {
          return (
            <ImageListItem
              key={item._id}
              cols={returnCols(i)}
              rows={returnCols(i)}
            >
              {item ? (
                <img
                  src={`http://192.168.1.10:8080/${item.cover}?w=164&h=164&fit=crop&auto=format`}
                  loading='lazy'
                  ref={imgRef}
                />
              ) : (
                <Skeleton variant='rectangular' />
              )}
            </ImageListItem>
          );
        })}
      </ImageList>
      <button onClick={fetchNextPage}>ssssssssssssssss</button>
    </div>
  );
};

export default Explore;
