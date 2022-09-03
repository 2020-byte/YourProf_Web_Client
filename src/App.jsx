import {Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import AllProfs from './page/AllProfs';
import Prof from './page/Prof';
import RateProf from './page/RateProf';
import Header from './components/Header/Header';
import styles from './App.module.css';

function App() {
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<AllProfs/>} />
            <Route path="/search/:profname" element={<Prof/>} />
            <Route path="/rateProf" element={<RateProf/>} />
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
