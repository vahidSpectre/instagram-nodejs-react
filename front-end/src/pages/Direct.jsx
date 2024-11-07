import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import io from 'socket.io-client';

import { searchUsers, sendDirect, baseURL, getDirects } from '../services/api';
import { addMessageWithTimeout } from '../store/infoSlice';

import sharedStyles from '../styles/layout.module.css';
import classes from './Direct.module.css';
import MessageContainer from '../components/MessageContainer';
const Direct = () => {
  const [searchParam, setSearchParam] = useState('');
  const [searchUserData, setSearchUserData] = useState(null);
  const [isExtended, setIsExtended] = useState(false);
  const [targetId, setTargetId] = useState('');
  const [message, setMessage] = useState('');
  const [allDirects, setAllDirects] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const [socketData, setSocketData] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);

  const SidebarState = useSelector(state => state.sidebarStore.fullWidth);
  const token = useSelector(state => state.tokenStore.token);
  const userId = useSelector(state => state.userStore.user._id);

  const dispatch = useDispatch();
  const searchContainerRef = useRef();
  const searchInputRef = useRef();
  const searchButtonRef = useRef();

  useEffect(() => {
    const socket = io(baseURL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnect: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });
    socket.on('connect', () => {
      socket.emit('join', userId);
    });

    socket.on('connect_error', err => {
      console.error('Connection error:', err);
    });

    socket.on('directs', data => {
      setSocketData(data);
    });

    handleGetAllDirects(token);

    return () => {
      socket.off('directs');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const keys = Object.keys(allDirects);

    keys.map((elem, index, k) => {
      const temp = [];
      const tempKey = elem.split('-');
      if (tempKey[0] === userId.toString()) {
        setCurrentMessages([
          {
            send: [allDirects[tempKey[0]], tempKey[1]],
            recived: [allDirects[tempKey[1]], tempKey[0]],
          },
        ]);
        if ([k[tempKey[1]], k[tempKey[0]]]) {
          return console.log('both way direct', elem, index);
        }
        console.log('send', elem, index);
      }
      // else {
      //   return console.log('recived no response', elem,index);
      // }
    });
  }, [allDirects, socketData]);

  useEffect(() => {
    console.log(currentMessages);
  }, [currentMessages]);

  const handleSearchUsers = async e => {
    e.preventDefault();
    if (searchParam.trim(' ') !== '') {
      const serverRes = await searchUsers(token, searchParam);
      if (serverRes.response.ok) {
        setSearchUserData(serverRes.result.users);
        setIsExtended(true);
      } else {
        dispatch(addMessageWithTimeout(serverRes.result.message));
        setIsExtended(false);
      }
    }
  };

  const handleSendDirect = async e => {
    e.preventDefault();
    const serverRes = await sendDirect(token, {
      targetId,
      message,
    });
    handleGetAllDirects(token);
  };

  const handleGetAllDirects = async token => {
    const serverRes = await getDirects(token);
    setAllDirects(serverRes.result.directs);
  };

  const handleSelectContact = elem => {
    setAllDirects([]);
    setTargetId(elem._id);
    handleGetAllDirects(token);
  };

  const initial = {
    height: '100%',
  };
  const animate = {
    height: `${isExtended ? '15rem' : '100%'}`,
  };

  return (
    <section
      className={`${classes.main} ${sharedStyles.shared}  ${
        SidebarState ? sharedStyles.normal : sharedStyles.full
      }`}
    >
      <div className={classes.content}>
        <div className={classes.contacts_wrapper}>
          <div className={classes.contact_search}>
            <form className={classes.search_form} onSubmit={handleSearchUsers}>
              <input
                type='text'
                name='direct-search-input'
                id='direct-search-input'
                className={classes.search_input}
                onChange={e => setSearchParam(e.target.value)}
                ref={searchInputRef}
                onMouseEnter={() => {
                  searchUserData && setIsExtended(true);
                }}
              />
              <button
                type='submit'
                className={classes.search_button}
                ref={searchButtonRef}
              >
                Search
              </button>
              <motion.div
                initial={initial}
                animate={animate}
                className={classes.search_result_wrapper}
                ref={searchContainerRef}
                onMouseEnter={() => {
                  searchUserData && setIsExtended(true);
                }}
                onMouseLeave={() => setIsExtended(false)}
              >
                {searchUserData &&
                  searchUserData.map(elem => {
                    return (
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: 'grey',
                          padding: '10px 5px',
                          margin: '10px 0',
                          borderRadius: '100px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSelectContact(elem)}
                        key={elem._id}
                      >
                        {elem.username}
                        <br />
                        {elem.bio}
                      </div>
                    );
                  })}
              </motion.div>
            </form>
          </div>
          <div className={classes.contacts_container}></div>
        </div>
        <div className={classes.messages_container}>
          <div className={classes.messages_wrapper}>
            <MessageContainer />
          </div>
          <form className={classes.search_form} onSubmit={handleSendDirect}>
            <input
              type='text'
              className={classes.search_input}
              onChange={e => setMessage(e.target.value)}
            />
            <button type='submit' className={classes.search_button}>
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Direct;
