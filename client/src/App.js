import { Button } from 'antd';
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Profil from './Pages/Profil';
import Trending from "./Pages/Trending";
import './styles/index.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        <Route path="/trending" exact component={Trending} />
      </Switch>
    </Router>
  );
}

export default App;
