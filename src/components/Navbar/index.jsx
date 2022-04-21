import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../reducer/authRedux';
import { useHistory } from "react-router-dom";
import config from '../../library/config';
import './index.css';


export default function Navbar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const isLogin = useSelector(state => state.auth.isLogin);

  const history = useHistory(); 

  React.useEffect(() => {
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar className="nav-box">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon color="inherit" fontSize="large"/>
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className="logo">
            Spotify
          </Typography>
          {isLogin ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
                <div className="auth-link">
                  <a id="link" href={getLinkAuth()}>Login</a>
                </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
