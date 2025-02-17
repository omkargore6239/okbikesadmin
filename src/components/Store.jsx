import React, { useState } from 'react';

const Store = () => {
  const [id, setId] = useState(null);
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [storeContactNumber, setStoreContactNumber] = useState('');
  const [storeGoogleMapUrl, setStoreGoogleMapUrl] = useState('');
  const [storeImage, setStoreImage] = useState('');

  return (
    <div>
      <h2>{storeName}</h2>
      <p>{address}</p>
      <p>Contact: {storeContactNumber}</p>
      {storeGoogleMapUrl && (
        <a href={storeGoogleMapUrl} target="_blank" rel="noopener noreferrer">
          View on Map
        </a>
      )}
      {storeImage && <img src={storeImage} alt={`${storeName}`} />}
    </div>
  );
};

export default Store;
