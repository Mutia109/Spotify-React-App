import React, {Component} from 'react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import './home.css';
import config from '../library/config';


class Home extends Component {  
  state = {
    accToken : '',
    isLogin: false,
    tracks:[],
  }

  getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    const params = this.getHashParams();
    const {access_token : accessToken} = params;

    this.setState({accToken: accessToken, isLogin: accessToken !== undefined});

  }

  getLinkAuth(){
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  onSuccessSearch(tracks) {
    this.setState({ tracks });
  }


  render() {
      return (
        <div className="home">
          <div className='search-bar'>
            {!this.state.isLogin &&( <a href={this.getLinkAuth()}>Auth</a>)}
            <SearchBar accessToken={this.state.accToken} onSuccess={(tracks) =>this.onSuccessSearch(tracks)}/>
          </div>
          <div className='songs'>
            {this.state.tracks.map(d => (
              <Card
                key={d.id}
                image = {d.album.images[0].url}
                title = {d.name}
                artists ={d.artists[0].name}
              />
            ))}
          </div>
        </div>
      )
  }
}
export default Home;

// export default function Home() {
//   return (
//     <div className="home">
//       <SearchBar/>
//       <div className='songs'>
//         {data.map(d => (
//           <Card
//             image = {d.album.images[0].url}
//             title = {d.name}
//             artists ={d.artists[0].name}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
