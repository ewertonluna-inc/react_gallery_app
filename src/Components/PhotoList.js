import React from 'react';
import Photo from './Photo'
import NoResults from './NoResults';

//  https://farm66.staticflickr.com/65535/49913962037_4dd22617a4.jpg

const PhotoList = ({ data, topic }) => {
  let photos;
  let title;

  if (data.length > 0) {
    photos = data.map(photo =>{
      const farmId = photo.farm;
      const serverId = photo.server;
      const id = photo.id;
      const secret = photo.secret;
      const url = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
  
      return <Photo url={url} key={id}/>
    });
    title = topic
  } else {
    photos = <NoResults />
  }
  

  return (
    <div className="photo-container">
      <h2>{title} Photos</h2>

      <ul>
        {photos}
      </ul>
    </div>
  );
}

export default PhotoList;