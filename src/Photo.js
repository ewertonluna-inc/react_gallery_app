import React from 'react';

const Photo = ({ url }) => (
  <li>
    {/* Talvez mudar o atributo alt */}
    <img src={url} alt="" />
  </li>
)