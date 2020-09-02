import React from "react";
import Input from "../input/Input";
import Temperatura from "../temperatura/Temperatura";
const HomePage = () => {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">Santander Challenge</h4>
      <Temperatura />
      <Input />
    </div>
  );
};

export default HomePage;
