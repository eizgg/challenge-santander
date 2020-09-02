import React, { useState } from "react";
import Message from "./Message";
import axios from "axios";
import axiosRetry from "axios-retry";
import { useTranslation,Translation } from "react-i18next";
const CircuitBreaker = require("opossum");
const Input = () => {
  const { t, i18n } = useTranslation();
  const [personas, setPersonas] = useState("");
  const [message, setMessage] = useState("");
  const [cervezas,setCervezas]=useState()
  const options = {
    timeout: 500,
    errorThresholdPercentage: 50,
    resetTimeout: 5000,
  };
  
  axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });
  const onChange = (e) => {
    setPersonas(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const breaker = new CircuitBreaker(
        () =>
          axios.post("/api/cervezas", {
            personas: personas,
          }),
        options
      );
      breaker.fire();
      breaker.on("success", (result) => {
        setMessage("Total de packs de cervezas ")
      setCervezas(result.data.PacksDeCervezas)});
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("Ocurrió un problema  vuelva a intentar.");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <>
      {message ? 
    <Message msg={message} cerveza={cervezas} />: null}
      <form onSubmit={onSubmit}>
        <div className="form-group mb-4">
          <label>{t("Cuantas personas van a asistir al meetup?")}</label>
          <Translation>
          {
        t =>
           <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder={t('Numero de personas')}
              onChange={onChange}
            />
          }
          </Translation>
        </div>
        <Translation>
        {
        t =>
              <input
              type="submit"
              value={t('Enviar')}
              className="btn btn-primary btn-block mt-4"
            />
        }
        </Translation>
      </form>
    </>
  );
};

export default Input;
