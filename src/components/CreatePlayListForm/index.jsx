import React, { useState } from "react";
import './index.css';
import config from "../../library/config";
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

const CreatePlaytListForm = ({uris}) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user.id);
    
    const [form, setForm] = useState({
        title: '',
        description: ''
    }) 

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.title.length > 10){
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                    }
                }
                
                const optionsCreatePlaylist = {
                    ...requestOptions,
                    body: JSON.stringify({
                        name: form.title,
                        description: form.description,
                        public: false,
                        collaborative: false,
                    }),
                }
                
                const responseCreatePlayList = await fetch(`${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`, optionsCreatePlaylist).then(data=> data.json());
                
                const optionsAddTrack = {
                    ...requestOptions,
                    body: JSON.stringify({
                        uris
                     }),
                }
                
                await fetch(`${config.SPOTIFY_BASE_URL}/playlists/${responseCreatePlayList.id}/tracks`, optionsAddTrack).then(data=> data.json());
                
                
                setForm({ title: '', description: '' });
                alert('Playlist created successfully');
                
            } catch (error) {
            alert(error);
            }
        }else{
            alert('Title must be large than 10 characters');
        }
    }

    return(
        <form  onSubmit={handleSubmit}>
            <div className="create-form">
                <h4>Create Playlist</h4>
                <div className="input-form">
                    <TextField
                        name="title"
                        id="input-title"
                        sx ={{
                            width: {sm:10, md:600},
                            "& .MuiOutlinedInput-root":{
                                "& > fieldset" :{
                                    border:"0.5px solid white",
                                    borderRadius:"30px",
                                }
                            }
                        }}
                        label="Title"
                        InputLabelProps={{className: 'title-label'}}
                        multiline
                        required
                        color="success"
                        value={form.title}
                        onChange={handleChange}
                    />
                    <TextField
                        name="description"
                        id="input-description"
                        sx ={{
                            width: {sm:10, md:600},
                            "& .MuiOutlinedInput-root":{
                                "& > fieldset" :{
                                    border:"0.5px solid white",
                                    borderRadius:"30px",
                                }
                            }
                        }}
                        label="Description"
                        InputLabelProps={{className: 'desc-label'}}
                        multiline
                        required
                        color="success"
                        rows={3}
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="btn">
                    <Button  id ="create"  type = "submit" variant="contained" endIcon={<CreateIcon fontSize="large"/>}>
                        Create
                    </Button>
                </div>
            </div>
        </form>
    )

}
export default CreatePlaytListForm;