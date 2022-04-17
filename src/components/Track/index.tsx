import React, { useState } from 'react';
import './index.css';

interface IProps {
  image: string;
  title: string;
  artists: string;
  toggleSelect: () => void;
}

const Track: React.FC <IProps> = ({image, title, artists, toggleSelect }) =>{
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleToggleSelect: () => void = () => {
    setIsSelected(!isSelected)
    toggleSelect()
  }
  
  return (
    <div className="card">
      <img className="image" src={image} alt={title} />
      <div className = "item-card" >
        <h3 className="title">{title}</h3>
        <p className='artists'>{artists}</p>
        <button id="select" onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</button>
      </div>
    </div>
  );
}
export default Track;