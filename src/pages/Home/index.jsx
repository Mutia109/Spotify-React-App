import React, { useState, useEffect } from "react";
import './index.css';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../reducer/authRedux';
import { useHistory } from "react-router-dom";
import config from '../../library/config';
import Navbar from "../../components/Navbar";
import Button from '@mui/material/Button';

const Home = () =>{
  const dispatch = useDispatch();

  const isLogin = useSelector(state => state.auth.isLogin);

  const history = useHistory(); 

  useEffect(() => {
    const accessTokenParams= new URLSearchParams(window.location.hash).get('#access_token')
  
    if (accessTokenParams !== null) {

      const setUserProfile = async () => {
        try {
          const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessTokenParams,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${config.SPOTIFY_BASE_URL}/me`, requestOptions).then(data => data.json());
        dispatch(login({
          accessToken : accessTokenParams,
          user : response,
        }));
        history.push("/create-playlist")
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

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${config.BASE_URL}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }
    return(
      <div className="dashboard">
        <Navbar/>
        <div className="container">
          <div className="item-text">
            <h1>You<span>r</span> Music.</h1>
            <h1>You<span>r</span> Podcast.</h1>
            <h1>You<span>r</span> Home.</h1>
            <div className="btn">
              <Button variant="contained" href={getLinkAuth()} id="login">
                Login With Spotify
              </Button>
            </div>
          </div>
          <div className="img">
              <img src="assets/headset.png" alt="img" />
          </div>
        </div>
      </div>
    )
}
export default Home;

