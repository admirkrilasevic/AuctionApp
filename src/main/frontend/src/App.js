import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderNavbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Account from './pages/Account';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <HeaderNavbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;