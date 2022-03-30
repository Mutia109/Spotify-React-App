import React from 'react';
import './index.css';

export default function Card({image, title, artists}) {
  return (
    <div className="card">
      <img className="image" src={image} alt={title} />
      <h3 className="title">{title}</h3>
      <p className='artists'>{artists}</p>
      <div className="btn-card">
      <button id="select">Select</button>
      </div>
    </div>
  );
}