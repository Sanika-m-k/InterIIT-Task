import React, { useState } from "react";
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Search from "./components/Search";
const App = () => {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/:itemId" element={<Home/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/search" element={<Search/>}/>

    </Routes>
  </BrowserRouter>
  );
};

export default App;
