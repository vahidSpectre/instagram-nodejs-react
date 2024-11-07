import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { tokenAction } from '../store/store';
import { baseURL, getFeed } from '../services/api';
import Post from '../components/Post';
import Avatar from '../components/Avatar';
import Spinner from '../components/Spinner';

import sharedStyles from '../styles/layout.module.css';
import classes from './Home.module.css';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef();

  const token = useSelector(state => state.tokenStore.token);
  const userId = useSelector(state => state.userStore.user._id);
  const SidebarState = useSelector(state => state.sidebarStore.fullWidth);

  const dispatch = useDispatch();

  const getFeedd = async (t, p) => {
    const serverRes = await getFeed(t, p);
    setPosts(perv => [...perv, ...serverRes.result.posts]);
  };

  useEffect(() => {
    const socket = io(baseURL, {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      socket.emit('join', userId);
    });

    socket.on('connect_error', err => {
      console.error('Connection error:', err);
    });

    socket.on('posts', data => {
      setPosts(perv => [data.post, ...perv]);
    });

    const observer = new IntersectionObserver(
      entries => {
        if (entries.at(0).isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      },
      { threshold: 0 },
    );

    observer.observe(ref.current);

    return () => {
      socket.off('posts');
      socket.disconnect();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      getFeedd(token, page);
      setPage(page + 1);
    }
  }, [isIntersecting]);

  const handleLogout = () => {
    dispatch(tokenAction.removeToken());
  };

  return (
    <section
      className={`${classes.main} ${sharedStyles.shared} ${
        SidebarState ? sharedStyles.normal : sharedStyles.full
      }`}
    >
      <div className={classes.content}>
        <button onClick={handleLogout}>Log out</button>
        <div className={classes.storyWrapper}>
          <Avatar story={true} isLoading={true} />
          <Avatar story={true} />
          <Avatar story={true} />
          <Avatar story={true} />
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.posts}>
            {posts &&
              posts.map(postData => {
                return <Post data={postData} key={postData._id} />;
              })}
          </div>
          <div className={classes.suggestions}></div>
        </div>
        <center ref={ref}>
          <Spinner />
        </center>
      </div>
    </section>
  );
};

export default Home;
