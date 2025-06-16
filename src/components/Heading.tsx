
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="headerTitle">
        <h1>DevsPH</h1>
      </div>
      <div className="headerNav">
        <button className="home-btn" onClick={() => navigate('/')}>Home</button>
        <button className="browse-btn" onClick={() => navigate('/browse')}>Browse</button>
        <button className="about-btn" onClick={() => navigate('/about')}>About Us</button>
      </div>
      <div className="headerActions">
        <button className="login-btn" onClick={() => navigate('/signin')}>Login</button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>SignUp</button>
      </div>
    </div>
  );
}

export default Header;
