import React from 'react';
import data from '../../library/data';
import './index.css';

export default function Card() {
  return (
    <div className='container'>
      <div className="card">
        <img className="image" src={data.album.images[0].url} alt={data.album.name} />
        <h3 className="title">{data.album.name}</h3>
        <p className='text'>{data.album.artists[0].name}</p>
        <div className="btn">
        <button id="select">Select</button>
        </div>
      </div>
    </div>
  );
}