import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import HeaderNavbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HeaderNavbar />
      <Footer />
    </div>
  );
}

export default App;
