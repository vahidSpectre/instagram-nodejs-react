import React from 'react';
import { Modal } from '@mui/material';
import { motion } from 'framer-motion';

import classes from './CustomModal.module.css';
const CustomModal = ({
  open,
  onClose,
  children,
  initial,
  animate,
  className,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={classes.main}>
      <motion.div
        initial={[{ scale: 1.05 }, initial]}
        animate={[{ scale: 1 }, animate]}
        className={className}
        transition={{ ease: 'easeOut', duration: 0.1 }}
      >
        {children}
      </motion.div>
    </Modal>
  );
};

export default CustomModal;
