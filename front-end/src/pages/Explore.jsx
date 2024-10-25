import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ImageList } from '@mui/material';

import { getAllPosts } from '../services/api';
import ExploreItem from '../components/ExploreItem';

import sharedStyles from '../styles/layout.module.css';
import classes from './Explore.module.css';
import Spinner from '../components/Spinner';
const Explore = ({ windowSize }) => {
  const [res, setRes] = useState([]);
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState('');
  const [cols, setCols] = useState(0);
  const [totalItems, setTotalItems] = useState(1);
  const [isIntersecting, setIsIntersecting] = useState(true);

  const loadingRef = useRef();

  const token = useSelector(state => state.tokenStore.token);
    const SidebarState = useSelector(state => state.sidebarStore.fullWidth);

  const getPosts = async (token, page) => {
    const serverRes = await getAllPosts(token, page);
    setRes(pre => [...pre, serverRes]);
    setTotalItems(serverRes.result.totalItems);
  };

  useEffect(() => {
    setSize(windowSize);
  }, [windowSize]);

  useEffect(() => {
    if (res.length > 0) {
      setPostData(state => [...state, ...res.at(-1).result.finallPosts]);
    }
  }, [res]);

  useEffect(() => {
    if (size === 's' || size === 'xs') setCols(3);
    if (size === 'm') setCols(4);
    if (size === 'l') setCols(5);
    if (size === 'xl') setCols(6);
  }, [size]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        setIsIntersecting(entries[0].isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    );
    if (loadingRef.current) observer.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) observer.unobserve(loadingRef.current);
    };
  }, [loadingRef]);

  useEffect(() => {
    if (isIntersecting) {
      getPosts(token, page);
      setPage(page + 1);
    }
  }, [isIntersecting]);

  return (
    <div
      className={`${classes.main} ${sharedStyles.shared} ${
        SidebarState ? sharedStyles.normal : sharedStyles.full
      }`}
    >
      <ImageList
        sx={{
          width: '100%',
          height: 'fit-content',
          minHeight: 'fit-content',
          overflow: 'hidden',
        }}
        cols={cols}
        rowHeight={164}
        gap={5}
      >
        {postData.map((item, i) => {
          return (
            <ExploreItem i={i} item={item} size={windowSize} key={item._id} />
          );
        })}
      </ImageList>
      {postData.length < totalItems && (
        <center ref={loadingRef}>
          <Spinner />
        </center>
      )}
      <center></center>
    </div>
  );
};

export default Explore;
