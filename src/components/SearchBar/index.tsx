import React, { FormEventHandler, useState } from "react";
import config from '../../library/config';
import './index.css'
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {TRootState} from '../../store';
import {ChangeEventHandler } from "react";
import SearchIcon from '@mui/icons-material/Search';

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
                sx ={{
                    width: {sm:100, md:3500},
                    "& .MuiOutlinedInput-root":{
                        "& > fieldset" :{
                            border:"0.5px solid white",
                            borderRadius:"30px",
                        }
                    }
                }}
                label="Search" 
                id="fullWidth" 
                type="text"
                color="success"
                InputLabelProps={{className: 'text_label'}}
                required
                onChange={handleInput}
                data-testid = "search-input"
            />
            <Button 
                variant="contained" 
                type="submit"
                id="btn" 
                className="btn-search"
                data-testid ="search-button"> 
                <SearchIcon fontSize="large"/>
            </Button>
        </form>
    )
}
export default SearchBar;