import React, { useState } from 'react';

import { ImageListItem, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';

import CustomModal from './CustomModal';
import { baseURL, getPost } from '../services/api';
import Spinner from './Spinner';

import classes from './ExploreItem.module.css';
const ExploreItem = ({ size, item, i }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState({});

  const token = useSelector(state => state.tokenStore.token);

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
    if (size === 'm' || size === 'xs' || size === 's') {
      if (i % 3 === 0 && i % 6 === 0) return 2;
      if (i % 3 === 1) return 1;
    }
  };

  const modalWidth = () => {
    if (size === 'm' || size === 'l') return '90%';
    if (size === 'xl') return '60%';
  };

  const handleFetchDate = async () => {
    setOpenModal(true);
    setIsLoadingData(true);
    const serverRes = await getPost(token, item._id);
    if (!serverRes.response?.ok) {
      return handleCloseModal();
    }
    if (serverRes.response.ok) {
      setIsLoadingData(false);
      setData(serverRes.result.post);
    }
  };
  const handleCloseModal = () => setOpenModal(false);

  return (
    <ImageListItem
      key={item._id}
      cols={returnCols(i)}
      rows={returnCols(i)}
      className={classes.list_item}
    >
      <img
        src={`${baseURL}/${item.cover}?w=164&h=164&fit=crop&auto=format`}
        onLoad={() => setIsLoading(false)}
        className={isLoading ? classes.dn : classes.db}
        onClick={() => handleFetchDate()}
        loading='lazy'
      />
      <Skeleton
        className={`${classes.skeleton} ${isLoading ? classes.db : classes.dn}`}
        variant='rectangular'
        animation='wave'
      />
      {size !== 's' && size !== 'xs' && (
        <CustomModal
          className={classes.modal}
          open={openModal}
          onClose={handleCloseModal}
          initial={{ width: modalWidth() }}
          animate={{ width: modalWidth() }}
        >
          {isLoadingData && <Spinner className={classes.spinner} />}
          <div className={classes.imageWrapper}>
            {Object.keys(data).length > 0 && (
              <img src={`${baseURL}/${data?.imageUrls.at(0)}`} alt='' />
            )}
          </div>
        </CustomModal>
      )}
    </ImageListItem>
  );
};

export default ExploreItem;
