import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import CreatePlaylist from './pages/CreatePlaylist';
import {useSelector} from 'react-redux';
import Home from "./pages/Home";
const App = () => {
  const isLogin = useSelector(state => state.auth.isLogin);
  console.log(isLogin);
  return (
    <Router>
      <Switch>
        <Route path={"/create-playlist"}>
          {isLogin ? (
            <CreatePlaylist />
          ):(
            <Redirect to={"/"}/>
        )}
        </Route>
        <Route path={"/"} >
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
