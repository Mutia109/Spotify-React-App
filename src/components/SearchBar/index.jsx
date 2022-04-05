import React, { useState } from "react";
import config from '../../library/config';
import './index.css'
import { useSelector } from "react-redux";


const SearchBar = (props) =>{
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [text, setText] = useState('');

    const handleInput = (e) =>{
        setText(e.target.value);
    }

    const onSubmit =async (e) =>{
        e.preventDefault();

        var requestOptions = {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            }
          };

          try{
              const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
              .then((data) => data.json());
      
            console.log(props);
            const tracks = response.tracks.items;
            props.onSuccess(tracks);
            }catch (e) 
            {
             alert(e);
        }
        e.target.blur();
    }

    return(
        <form className="form-search" onSubmit={onSubmit}>
            <input
            type="text"
            placeholder="Search..."
            className="form-search-input"
            required
            onChange={handleInput}
            />
            <button id="btn-search" type='submit'>Search</button>
        </form>
    )
}
export default SearchBar;