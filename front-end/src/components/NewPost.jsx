import React, { useEffect, useRef, useState } from 'react';
import { Button, Icon, IconButton } from '@mui/material';
import { AddAPhoto, ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import CustomModal from './CustomModal';

import { modalActions } from '../store/store';
import { addMessageWithTimeout } from '../store/infoSlice';

import classes from './NewPost.module.css';
import { createPost } from '../services/api';
const NewPost = ({ open, onClose, windowSize }) => {
  const [extend, setExtend] = useState(0);
  const [size, setSize] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [mainImage, setMainImage] = useState({});
  const [addPhotoPer, setAddPhotoPer] = useState(true);
  const [caption, setCaption] = useState('');

  const imageInputRef = useRef();
  const captionRef = useRef();
  const tagsRef = useRef();

  const token = useSelector(state => state.tokenStore.token);

  const dispatch = useDispatch();

  useEffect(() => {
    setSize(windowSize);
  }, [windowSize]);

  useEffect(() => {
    setExtend(0);
  }, [size]);

  useEffect(() => {
    if (postImages.length === 5) {
      setAddPhotoPer(false);
    } else {
      setAddPhotoPer(true);
    }
    if (postImages.length > 0) {
      setMainImage(postImages.at(-1));
    }
  }, [postImages]);

  const CheckModalSize = () => {
    if (size === 'm') {
      return extend > 0 ? '95%' : '60%';
    }
    if (size === 'l') {
      return extend > 0 ? '80%' : '50%';
    }
    if (size === 'xl') {
      return extend > 0 ? '70%' : '40%';
    }
  };

  const handleOpenFiles = () => {
    imageInputRef.current.click();
  };

  const handleSetImage = e => {
    setPostImages(img => [...img, e.target.files[0]]);
  };

  const handleResetPost = () => {
    setPostImages([]);
    setMainImage({});
    setAddPhotoPer(true);
    setCaption('');
    setExtend(0);
    captionRef.current.value = '';
    tagsRef.current.value = '';
    dispatch(modalActions.closeModal());
  };

  const handleUploadPost = async () => {
    const serverRes = await createPost(
      {
        postImages: postImages,
        caption: caption,
      },
      token,
    );
    if (serverRes.response.ok) {
      handleResetPost();
      dispatch(addMessageWithTimeout(serverRes.result.message));
    }
  };

  const handleSetCaption = e => {
    const height = captionRef.current.scrollHeight;
    captionRef.current.style.height = `${height + 1}px`;
    setCaption(e.target.value);
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      className={classes.modal_container}
      initial={{ width: '60%' }}
      animate={{ width: CheckModalSize() }}
    >
      <div className={classes.header}>
        {extend === 0 && (
          <Button
            onClick={handleResetPost}
            className={classes.discard}
            color='warning'
          >
            DISCAD
          </Button>
        )}
        {extend > 0 && (
          <IconButton
            onClick={() =>
              extend > 0 ? setExtend(extend => extend - 1) : setExtend(0)
            }
          >
            <Icon className={classes.arrow}>
              <ArrowBack />
            </Icon>
          </IconButton>
        )}
        {extend < 2 && (
          <Button
            onClick={() =>
              extend < 2 ? setExtend(extend => extend + 1) : setExtend(2)
            }
            className={classes.next}
            disabled={postImages.length > 0 ? false : true}
          >
            Next
          </Button>
        )}
        {extend === 2 && (
          <Button
            onClick={handleUploadPost}
            color='success'
            variant='contained'
          >
            CREATE
          </Button>
        )}
      </div>
      <motion.section className={classes.content_wrapper}>
        <motion.div
          initial={{ width: '100%' }}
          animate={{
            width: `${extend > 0 ? '50%' : '100%'}`,
          }}
          transition={{ type: 'just' }}
          className={classes.img_container}
        >
          {postImages.length > 0 && (
            <img
              src={
                postImages.length > 1
                  ? URL.createObjectURL(mainImage)
                  : URL.createObjectURL(postImages.at(0))
              }
              alt=''
            />
          )}

          {addPhotoPer && (
            <span className={classes.add_photo_btn}>
              <IconButton onClick={handleOpenFiles}>
                <AddAPhoto />
              </IconButton>
              <input
                type='file'
                className={classes.dn}
                name='post_image'
                onChange={handleSetImage}
                ref={imageInputRef}
              />
            </span>
          )}
          {postImages.length > 1 && (
            <div className={classes.thumbnail}>
              <div className={classes.thumbnail_sheet}>
                {postImages.map((img, i) => {
                  return (
                    <img
                      src={URL.createObjectURL(img)}
                      alt=''
                      onClick={e => setMainImage(img)}
                      className={`${
                        img === mainImage ? classes.active : classes.deactive
                      }`}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ width: '0%' }}
          animate={{
            width: `${extend >= 1 ? '50%' : '0%'}`,
            left: `${extend >= 1 ? '50%' : '100%'}`,
          }}
          transition={{ type: 'just' }}
          className={classes.secondary_container}
        ></motion.div>
        <motion.div
          initial={{ width: '0%', left: '100%' }}
          animate={{
            width: `${extend === 2 ? '50%' : '0%'}`,
            left: `${extend === 2 ? '50%' : '100%'}`,
          }}
          transition={{ type: 'just' }}
          className={classes.last_container}
        >
          <div className={classes.input_wrapper}>
            <label className={classes.label} htmlFor='post_caption'>
              Caption:
            </label>
            <textarea
              className={classes.text_area}
              id='post_caption'
              ref={captionRef}
              onChange={handleSetCaption}
              maxLength={300}
            />
          </div>
          <span className={classes.input_wrapper}>
            <label className={classes.label} htmlFor='post_tags'>
              Tags:
            </label>
            <textarea
              className={classes.text_area}
              id='post_tags'
              ref={tagsRef}
            />
          </span>
        </motion.div>
      </motion.section>
    </CustomModal>
  );
};

export default NewPost;
