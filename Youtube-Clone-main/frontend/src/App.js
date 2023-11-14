import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Video from './Video'
// npm i react-router-dom@6.17.0

// npm i bootstrap@5.3.2
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignIn from './SignIn';
import Upload from './Upload';

function App() {
  return (
    <div className="App">
      {/* My react app
      <Home/> */}

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/video" element={<Video/>}></Route>
          <Route exact path="/signin" element={<SignIn/>}></Route>
          <Route exact path="/upload" element={<Upload/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
