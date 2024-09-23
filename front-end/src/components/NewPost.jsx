import React, { useEffect, useState } from 'react';
import { Button, Icon, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';

import CustomModal from './CustomModal';

import { size } from '../utils/helpers';

import classes from './NewPost.module.css';
const NewPost = ({ open, onClose }) => {
  const [extend, setExtend] = useState(0);
  const [size, setSize] = useState('')

   window.addEventListener('resize', () => {
    const width = window.innerWidth;
    if (width <= 576) return setSize('x-small');
    if (width > 577 && width <= 768) return setSize('small');
    if (width > 767 && width <= 1024) return setSize('medium');
    if (width > 1025 && width <= 1440) return setSize('large');
    if (width > 1441) return setSize('x-large');
  });

  useEffect(() => {
    console.log(size)
  }, [size])
  

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      className={classes.modal_container}
      initial={{ width: '50%' }}
      animate={{ width: `${extend > 0 ? '100%' : '50%'}` }}
    >
      <div className={classes.header}>
        <IconButton
          onClick={() =>
            extend > 0 ? setExtend(extend => extend - 1) : setExtend(0)
          }
        >
          <Icon className={classes.arrow}>
            <ArrowBack />
          </Icon>
        </IconButton>
        <Button
          onClick={() =>
            extend < 2 ? setExtend(extend => extend + 1) : setExtend(2)
          }
          className={classes.next}
        >
          Next
        </Button>
      </div>
      <section className={classes.content_wrapper}>
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${extend > 0 ? '50%' : '100%'}` }}
          transition={{ type: 'just' }}
          className={classes.img_container}
        ></motion.div>
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
          initial={{ width: '0%' }}
          animate={{
            width: `${extend === 2 ? '50%' : '0%'}`,
            left: `${extend === 2 ? '50%' : '100%'}`,
          }}
          transition={{ type: 'just' }}
          className={classes.last_container}
        ></motion.div>
      </section>
    </CustomModal>
  );
};

export default NewPost;
