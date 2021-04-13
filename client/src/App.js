import "antd/dist/antd.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UidContext } from './Components/AppContext';
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import Profil from './Pages/Profil';
import Trending from "./Pages/Trending";
import './styles/index.scss';

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("no toke" + err))
    };
    fetchToken();
    console.log(uid);
  }, [uid]);

  return (
    <Router>
      <Switch>
        <UidContext.Provider value={uid}>
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/trending" exact component={Trending} />
        </UidContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
