import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderNavbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import TermsConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyAndPolicy';
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/terms">
            <TermsConditions />
          </Route>
          <Route path="/privacy">
            <PrivacyPolicy />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;