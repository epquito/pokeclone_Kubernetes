import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pokeLogo from '../assets/PokeLogoClean.png';
import { userApi } from './utilities';

export default function Navbar({ user, setUser, isLoggedIn, setIsLoggedIn }) {
  const [linkWords, setLinkWords] = useState('Log In');
  const [linkWordsLink, setLinkWordsLink] = useState('/login');

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = async () => {
    let response = await userApi.post('logout/');
    if (response.status === 204) {
      setUser('');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      delete userApi.defaults.headers.common['Authorization'];
      setIsLoggedIn(false);
      navigate('/landing');
    }
  };

  const setLink = () => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case '/signup':
        setLinkWords('Log In');
        setLinkWordsLink('/login');
        break;
      case '/login':
        setLinkWords('Sign Up');
        setLinkWordsLink('/signup');
        break;
      case '/house':
      case '/pokecenter':
      case '/pokedex':
        setLinkWords('Map');
        setLinkWordsLink('/main');
        break;
      default:
        setLinkWords('');
    }
  };

  useEffect(() => {
    setLink();
  }, [location.pathname]); // Add location.pathname as a dependency to re-evaluate when the path changes

  return (
    <>
      <nav className="Navbar" id="nav_bar">
        <div className="navLinks">
          <img id="nav_logo" src={pokeLogo} alt="PokeLogo"></img>
          <Link to="/" className="nav_link"> Home </Link>
          <Link to={linkWordsLink} className="nav_link"> {linkWords} </Link>
          {isLoggedIn && (
            <Link to="/" onClick={handleLogOut} className="nav_link">Log Out</Link>
          )}
        </div>
      </nav>
    </>
  );
}
