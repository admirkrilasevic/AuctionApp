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
import PageLayout from './components/PageLayout';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import ItemPage from './pages/ItemPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <HeaderNavbar />
          <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return (
                        <Redirect to="/home" /> 
                    )
                }}
            />
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <PageLayout title="Login">
                <Login />
              </PageLayout>
            </Route>
            <Route path="/register">
              <PageLayout title="Register">
                <Register />
              </PageLayout>
            </Route>
            <Route path="/shop/:categoryId">
              <PageLayout>
                <Shop />
              </PageLayout>
            </Route>
            <Route path="/account/:section">
              <Account />
            </Route>
            <Route path="/about">
              <PageLayout title="About Us">
                <About />
              </PageLayout>            
            </Route>
            <Route path="/terms">
              <PageLayout title="Terms and Conditions">
                <TermsConditions />
              </PageLayout>
            </Route>
            <Route path="/privacy">
              <PageLayout title="Privacy and Policy">
                <PrivacyPolicy />
              </PageLayout>
            </Route>
            <Route path="/items/:itemId">
              <ItemPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
