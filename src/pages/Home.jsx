import React, { useState, useEffect } from "react";
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import './home.css';
import config from '../library/config';
import CreatePlayList from "../components/CreatePlayList";
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../reducer/authRedux';

const Home = () =>{
    const [tracks, setTracks] = useState([]);
    const [selected, setSelected] = useState([]);
    const [user, setUser] = useState({});
    const isLogin = useSelector(state => state.auth.isLogin);
    const dispatch = useDispatch();

    useEffect(() => {
      const accessTokenParams= new URLSearchParams(window.location.hash).get('#access_token')
    
      if (accessTokenParams !== null) {
        dispatch(login(accessTokenParams));
  
        const setUserProfile = async () => {
          try {
            const requestOptions = {
      headers: {
        'Authorization': 'Bearer ' + accessTokenParams,
        'Content-Type': 'application/json',
      },
    };
  
    const response = await fetch(`${config.SPOTIFY_BASE_URL}/me`, requestOptions).then(data => data.json());
            console.log(response);
            setUser(response);
          } catch (e) {
            alert(e);
          }
        }
  
        setUserProfile();
      }
    }, []);

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
          {isLogin &&(<CreatePlayList  userId={user.id} uris={selected}/>)}
          <div className='search-bar'>
            {!isLogin &&( <a href={getLinkAuth()}>Auth</a>)}
            <SearchBar  onSuccess={(tracks) => onSuccessSearch(tracks)}/>
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

