import React, { FormEventHandler, useState } from "react";
import config from '../../library/config';
import './index.css'
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {TRootState} from '../../store';
import { ChangeEventHandler } from "react";

interface IProps{
    onSuccess: (tracks: any[]) => void;
}

const SearchBar: React.FC<IProps> = ({onSuccess}) => {
    const accessToken:string = useSelector((state:TRootState) => state.auth.accessToken);
    const [text, setText] = useState<string>('');

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) =>{
        setText(e.target.value);
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();

        var requestOptions = {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            }
        };
        try{
            const response: any = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
            .then((data) => data.json());
            
            const tracks: any[] = response.tracks.items;
            onSuccess(tracks);
        }catch (e)
        {
           alert(e);
        }
    }

    return(
        <form className="form-search" onSubmit={onSubmit}>
            <TextField fullWidth 
                label="Search" 
                id="fullWidth" 
                type="text"
                className="form-search-input"
                required
                onChange={handleInput}/>
            <Button variant="contained" color="success" className="btn-search">
                 Search
            </Button>
        </form>
    )
}
export default SearchBar;