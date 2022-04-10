import React, { useState } from "react";
import './index.css';
import config from "../../library/config";
import { useSelector } from "react-redux";

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
        <form className="create-form" onSubmit={handleSubmit}>
            <div className="input">
                <label id='text'>Create Playlist</label> <br/>
                <input 
                    type="text" 
                    name="title"
                    placeholder="Title..."
                    value={form.title}
                    onChange = {handleChange} /><br/>
                <textarea 
                    name="description" 
                    id="description" 
                    cols="53" 
                    rows="3"
                    placeholder="Description"
                    value={form.description}
                    onChange = {handleChange}>
                </textarea><br/>
            </div>
            <div className="btn">
                <button id='submit' type="submit">Create</button>
            </div>
        </form>
    )

}
export default CreatePlaytListForm;