import { motion, transform } from 'framer-motion';

import classes from './InfoPopup.module.css';
import { useEffect, useState } from 'react';
const InfoPopup = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  const wrapperAnimate = {
    width: isOpen ? '100%' : 0,
  };
  const sudoAnimate = {
    width: isOpen ? ['100%', '7%'] : ['7%', '100%'],
    x: isOpen ? [0, 1] : [1, 0],
  };
  const contentAnimate = {
    width: isOpen ? ['0%', '100%'] : ['100%', '0%'],
  };
  const textAnimate = {
    opacity: isOpen ? 1 : 0,
  };

  useEffect(() => {
    if (message) {
      setIsOpen(true);
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  }, [message]);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={wrapperAnimate}
      className={classes.main}
      transition={{ delay: isOpen ? 0 : 0.4, duration: 0.3 }}
    >
      <motion.div
        className={classes.content}
        initial={{ width: 0 }}
        animate={contentAnimate}
        transition={{ delay: isOpen ? 0.4 : 0, duration: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={textAnimate}
          transition={{ delay: !isOpen ? 0 : 0.6, duration: 0.1 }}
          className={classes.text}
        >
          {message}
        </motion.div>
      </motion.div>
      <motion.div
        className={classes.sudo}
        initial={{ width: 0 }}
        animate={sudoAnimate}
        transition={{ delay: isOpen ? 0.4 : 0, duration: 0.2 }}
      >
        &nbsp;
      </motion.div>
    </motion.div>
  );
};

export default InfoPopup;
