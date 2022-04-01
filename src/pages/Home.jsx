import React, { useState, useEffect } from "react";
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import './home.css';
import config from '../library/config';

// const getHashParams = () =>{
//     const hashParams = {};
//     const r = /([^&;=]+)=?([^&;]*)/g;
//     const q = window.location.hash.substring(1);
//     let e = r.exec(q);
//     while (e) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//       e = r.exec(q);
//     }
//     return hashParams;
//   }

const Home = () =>{
    const [accToken, setAccToken] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
      const access_token= new URLSearchParams(window.location.hash).get('#access_token')
    
      setAccToken(access_token);
      setIsLogin(access_token !== null);
    }, [])

    const getLinkAuth = () =>{
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
      }
    
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
            {!isLogin &&( <a href={getLinkAuth()}>Auth</a>)}
            <SearchBar accessToken={accToken} onSuccess={(tracks) => onSuccessSearch(tracks)}/>
          </div>
          <div className='songs'>
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
export default Home;

