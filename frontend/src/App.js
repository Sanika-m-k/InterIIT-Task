import React, { useState } from "react";
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import ItemDetails from "./components/ItemDetails";
import TreeNode from "./components/TreeNode";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
    <Login/>
    <Routes>
      <Route path="/:itemName" element={<Home/>} />
      <Route path="/" element={<Home/>} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
