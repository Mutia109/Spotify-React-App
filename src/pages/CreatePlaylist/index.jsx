import CreatePlaytListForm from "../../components/CreatePlayListForm";
import SearchBar from '../../components/SearchBar';
import Card from '../../components/Card';
import { useState } from "react";
import './index.css';
    
const CreatePlayList = () =>{
    const [tracks, setTracks] = useState([]);
    const [selected, setSelected] = useState([]);

    const onSuccessSearch = (tracks) => {
        const selectedTracks = filterSelectedTracks();
        const searchDistincTracks = tracks.filter(track => !selected.includes(track.uri));
    
        setTracks([...selectedTracks, ...searchDistincTracks]);
      }
  
      const toggleSelect = (track) => {
        const uri = track.uri;
    
        if (selected.includes(uri)) {
          setSelected(selected.filter(item => item !== uri));
        } else {
          setSelected([...selected, uri]);
        }
      }
  
      const filterSelectedTracks = () => {
        return tracks.filter(track => selected.includes(track.uri));
      }

    return(
        <div className="home">
          <div className='search-bar'>
            <SearchBar  onSuccess={(tracks) => onSuccessSearch(tracks)}/>
          </div>
          <CreatePlaytListForm  uris={selected}/>
          <div className='tracks'>
            {tracks.map(track => (
              <Card
                key={track.id}
                image = {track.album.images[0].url}
                title = {track.name}
                artists ={track.artists[0].name}
                toggleSelect={() => toggleSelect(track)}
              />
            ))}
          </div>
        </div>
    )
}

export default CreatePlayList;
