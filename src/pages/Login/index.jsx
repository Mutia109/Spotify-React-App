import React, { useState, useEffect } from "react";
import './index.css';
import config from '../../library/config';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../reducer/authRedux';
import { useHistory } from "react-router-dom";
const Login = () =>{
    const dispatch = useDispatch();

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
    
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
      }
  
    return(
      <div className="dashboard">
        <div className="auth-link">
          <a id="link" href={getLinkAuth()}>Auth</a>
        </div>
      </div>
    )
}
export default Login;

