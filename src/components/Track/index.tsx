import React, { useState } from 'react';
import './index.css';
import msToTime from '../../library/formatDuration';

interface IProps {
  image: string;
  title: string;
  artists: string;
  duration: number;
  toggleSelect: () => void;
}

const Track: React.FC <IProps> = ({image, title, artists, duration, toggleSelect }) =>{
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleToggleSelect: () => void = () => {
    setIsSelected(!isSelected)
    toggleSelect()
  }
  
  return (
    <div className="card">
      <img className="image" src={image} alt={title} />
      <div className='card-item'>
        <div className = "item-card" >
          <h3 className="title">{title}</h3>
          <p className='artists'>{artists}</p>
          <p className='duration'>{msToTime(duration)}</p>
        </div>
        <div className="button">
            <button id="select" onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</button>
        </div>
      </div>
    </div>
  );
}
export default Track;