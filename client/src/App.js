import './App.css';

import {Route} from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage'
import Navbar from './components/navBar/NavBar'
import ContainerCard from './components/cards/container/Container'
import CardDetails from './components/cardDetails/CardDetail'
import AddBreed from './components/addBreed/AddBreed'
// import Ordering from'./components/ordering/Ordering'

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage/>
      </Route>

      <Route exact path="/dogs">
        <Navbar/>
        <ContainerCard/>
      </Route>

      <Route  exact path="/dogs/:id">
        <CardDetails/>
      </Route>

      <Route path="/dog/addbreed">
        <AddBreed/>
      </Route>
    </div>
  );
}

export default App;
