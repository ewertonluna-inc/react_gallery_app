import React from 'react';

const Photo = ({ url }) => {
  return (
    <li>
      <img src={url} alt="" />
    </li>
  );
  
}

export default Photo;