import React, { Profiler } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home'
import Profile from './components/Profile'
import Error from './components/Error'
import NavBar from './components/NavBar'
import {BrowserRouter, Route, Routes }from "react-router-dom"


function App() {
  return (
      <>
      <BrowserRouter>
          <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/error' element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>
      </>






    // <div>
    //   <h1>Welcome to the App</h1>
    //   <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    //     <div>
    //       <Login />
    //     </div>
    //     <div>
    //       <SignUp />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
