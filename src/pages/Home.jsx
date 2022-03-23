import React from 'react';
import Card from '../components/Card';
import data from '../library/data';

export default function Home() {
  return (
    <div className="home">
      <Card 
      image = {data.album.images[0].url}
      title = {data.name}
      artists ={data.artists[0].name}
      />
    </div>
  );
}
