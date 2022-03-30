import React, { Component } from 'react'
import config from '../../library/config';
import './index.css'

export default class SearchBar extends Component {
    state = {
    text: '',
  }

  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();

    const { text } = this.state;

    var requestOptions = {
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
        .then((data) => data.json());

      console.log(this.props);
      const tracks = response.tracks.items;
      this.props.onSuccess(tracks);
    } catch (e) {
      alert(e);
    }

    e.target.blur();
  }

  render() {
    return (
      <form className="form-search" onSubmit={(e) => this.onSubmit(e)}>
        <input
          type="text"
          placeholder="Search..."
          className="form-search-input"
          required
          onChange={(e) => this.handleInput(e)}
        />
        <button id="btn-search" type='submit'>Search</button>
      </form>
    )
  }
}
