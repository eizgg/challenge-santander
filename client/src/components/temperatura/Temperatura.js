import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";
import { useTranslation} from "react-i18next";
const Temperatura = () => {
  const {t, i18n} = useTranslation();
  const [temp, setTemp] = useState("");
  const CircuitBreaker = require("opossum");
  const options = {
    timeout: 50000,
    errorThresholdPercentage: 50,
    resetTimeout: 50000,
  };
  axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });
  useEffect(() => {
    try {
      const breaker = new CircuitBreaker(
        () => axios.post("/api/weather"),
        options
      );
      breaker.fire();
      breaker.on("success", (result) => {
        setTemp(Math.round(result.data.main.temp));
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  }, []);
  console.log(temp);
  return (
    <div>
      <h5 className="text-right mb-4">{t( 'Temperatura')}: {temp}°</h5>
    </div>
  );
};

export default Temperatura;
