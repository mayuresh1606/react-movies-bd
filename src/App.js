import './App.css';
import {Movies} from './movies'
import {Navbar} from './navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useGlobalContext } from './context';
import { Popularity } from './popularity'
import { Details } from './details'
import { Sidebar } from './sidebar'
import { Genre } from './genre'
import { Loading } from './loading'

function App() {
  const {sidebar, loaded} = useGlobalContext()
  return (
    <>
    <Router>
      <Navbar />
      {sidebar && <Sidebar/>}
      <Switch>
      <Route exact path="/">
        {loaded ? <Movies />: <Loading /> }
      </Route>
      <Route path="/:type/details/:title/:id">
        {loaded?<Details />: <Loading /> }
      </Route>
      <Route path="/popularity/:currentPage">
        {loaded?<Popularity />: <Loading /> }
      </Route>
      <Route path="/genre/:movieGenre/:id/:currentPage">
        <Genre />
      </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
