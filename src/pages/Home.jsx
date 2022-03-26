import React from 'react';
import Card from '../components/Card';
import data from '../library/data';
import './home.css';

export default function Home() {
  return (
    <div className="home">
      <div className='songs'>
        {data.map(d => (
          <Card
            image = {d.album.images[0].url}
            title = {d.name}
            artists ={d.artists[0].name}
          />
        ))}
      </div>
    </div>
  );
}
