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
import PageHeader from './components/PageHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
            <PageHeader title="Login">
              <Login />
            </PageHeader>
          </Route>
          <Route path="/register">
            <PageHeader title="Register">
              <Register />
            </PageHeader>
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/about">
            <PageHeader title="About Us">
              <About />
            </PageHeader>            
          </Route>
          <Route path="/terms">
            <PageHeader title="Terms and Conditions">
              <TermsConditions />
            </PageHeader>
          </Route>
          <Route path="/privacy">
            <PageHeader title="Privacy and Policy">
              <PrivacyPolicy />
            </PageHeader>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
