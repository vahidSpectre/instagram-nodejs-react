import { useSelector } from 'react-redux';
import InfoPopup from '../components/InfoPopup';

import classes from './Info.module.css';
import { nanoid } from '@reduxjs/toolkit';
const Info = () => {
  const messages = useSelector(state => state.infoStore.messages);

    return (
    <div className={classes.main}>
      {messages.map(info => {
        return <InfoPopup message={info} key={nanoid()} />;
      })}
    </div>
  );
};

export default Info;
