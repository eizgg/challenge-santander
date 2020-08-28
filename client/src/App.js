import React from "react";
import "./App.css";
import Input from "./components/input/Input";
import Temperatura from "./components/temperatura/Temperatura"
const App = () => (
  <>
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <i className="fab fa-react" /> Santander Challenge
      </h4>
      <Temperatura/>
      <Input />
      
    </div>
  </>
);

export default App;
