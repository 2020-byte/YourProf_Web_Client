import {Routes, Route, useNavigate} from 'react-router-dom';
import Home from './page/Home';
import AllProfs from './page/AllProfs';
import Prof from './page/Prof';
import RateProf from './page/RateProf';
import Header from './components/Header/Header';
import styles from './App.module.css';
import Bookmark from './page/Bookmark';
import Profile from './page/Profile';
import { AuthProvider, useAuth } from './context/AuthContent';
import Login from './page/Login';

function App() {

  const navigate = useNavigate();


  const { user, logout, signin } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      logout();
      // navigate('/');
      //TODO: 로그인 없이 있을 수 없는 곳 ME로 빠져나오게
    }
  };

  const handleSigninPath = () => {
    navigate('/login');
  }

  const handleSignin = () => {
    signin();
    navigate('/');
    //TODO: history back 같은 걸로 원래 있던데로 되돌아가게
  }


  return (
    <div>
        <Header handleLogout={handleLogout}  handleSignin={handleSigninPath} user={user}/>
        <div className={styles.body}>
          <div className={styles.content}>
          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<AllProfs/>} />
              <Route path="/search/:id" element={<Prof/>} />
              <Route path="/rateProf/:id" element={<RateProf/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/login" element={<Login onLogin={handleSignin} onSignUp={handleSignin} />} />
            </Routes>
            
          </div>
          <div className={styles.widget}>
            Widget
          </div>
      </div>
    </div>
  );
}

export default App;
