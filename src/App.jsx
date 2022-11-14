import {Routes, Route, useNavigate, Router} from 'react-router-dom';
import Home from './page/Home';
import AllProfs from './page/AllProfs';
import Prof from './page/Prof';
import RateProf from './page/RateProf';
import Header from './components/Header/Header';
import styles from './App.module.css';
import Bookmark from './page/Bookmark';
import Profile from './page/Profile';
import { useAuth } from './context/AuthContent';
import Login from './page/Login';
import { useEffect } from 'react';

function App({dataService, accountService}) {

  const navigate = useNavigate();


  const { user, logout, signup, signin } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      logout();
      //navigate('/');
      //TODO: 로그인 없이 있을 수 없는 곳 ME로 빠져나오게
    }
  };

  const handleSigninPath = () => {
    navigate('/login');
  }

  const handleSignup = (username, password, name, email) => {
    signup(username, password, name, email);
    //navigate(-1);//뒤로가기
  }

  const handleSignin = (username, password) => {
    signin(username, password);
    //navigate(-1);//뒤로가기
  }


  return (
    <div>
        <Header handleLogout={handleLogout}  handleSignin={handleSigninPath} user={user}/>
        <div className={styles.body}>
          <div className={styles.content}>
          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profs" element={<AllProfs dataService={dataService} accountService={accountService}/>} />
              <Route path="/profs/departments/:departmentId" element={<AllProfs dataService={dataService} accountService={accountService}/>} />
              <Route path="/profs/:profId" element={<Prof dataService={dataService} accountService={accountService}/>} />
              <Route path="/profs/:profId/courses/:courseId" element={<Prof dataService={dataService} accountService={accountService}/>} />
              <Route path="/profs/:profId/ratings" element={<RateProf dataService={dataService}/>} />
              <Route path="/profs/:profId/ratings/:ratingId" element={<RateProf dataService={dataService}/>} />
              
              <Route path="/account/profile" element={<Profile dataService={dataService} accountService={accountService}/>} />
              <Route path="/account/profile/reviews/" element={<Profile dataService={dataService} accountService={accountService}/>} />
              <Route path="/account/profile/reviews/:departmentId" element={<Profile dataService={dataService} accountService={accountService}/>} />
              <Route path="/account/profile/likes" element={<Profile dataService={dataService} accountService={accountService}/>} />
              <Route path="/account/profile/likes/:departmentId" element={<Profile dataService={dataService} accountService={accountService}/>} />
              <Route path="/account/profile/dislikes" element={<Profile dataService={dataService} accountService={accountService}/>} />
              <Route path="/account/profile/dislikes/:departmentId" element={<Profile dataService={dataService} accountService={accountService}/>} />
              <Route path="/account/bookmarks" element={<Bookmark dataService={dataService} accountService={accountService}/>} />
              <Route path="/account/bookmarks/:departmentId" element={<Bookmark dataService={dataService} accountService={accountService}/>} />

              <Route path="/login" element={<Login onLogin={handleSignin} onSignUp={handleSignup} />} />
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
