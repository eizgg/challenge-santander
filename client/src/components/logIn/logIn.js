import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import axios from "axios";
import axiosRetry from "axios-retry";
import { useTranslation } from "react-i18next";
import Temperatura from "../temperatura/Temperatura"
function LogIn(props) {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const { setAuthTokens } = useAuth();
  const referer = "/";
  //función para cambiar el lenguaje con la libreria i18next
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  //llamada a la api consultando por el usuario y contraseña
  //se usa axios retry con delay 
  function postLogin(e) {
    e.preventDefault();
    if (!user) {
      setMsg("Inserte Usuario");
      setIsError(true);
    } else if (!password) {
      setMsg("Inserte Contraseña");
      setIsError(true);
    } else {
      try {
        axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });
        axios
          .post("/api/users", {
            user,
            password,
          })
          .then((result) => {
            console.log(result);
            if (result.data.acceso === true) {
              setAuthTokens(result.data.acceso);
              setLoggedIn(true);
            } else {
              setMsg("Usuario y/o contraseña incorrectos.");
              setIsError(true);
            }
          });
      } catch (err) {
        if (err.response.status === 500) {
          setMsg("Ocurrió un problema con el servidor vuelva a intentar.");
          setIsError(true);
        } else {
          setMsg("Ocurrió un problema  vuelva a intentar.");
          setIsError(true);
        }
      }
    }
  }
  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }
  return (
    <>
      <div className="container mt-5">
        <div className="row">
        <div className="col">
          <button
            className="btn btn-secondary"
            data-toggle="button"
            aria-pressed="false"
            onClick={() => changeLanguage("en")}
          >
            en
          </button>
          <button
            className="btn btn-secondary"
            data-toggle="button"
            aria-pressed="false"
            onClick={() => changeLanguage("es")}
          >
            es
          </button>
          </div>
          <div className="col">
          <Temperatura/>
                 </div>
        </div>
        
        <div className="row">
          <div className="col d-flex justify-content-center ">
            <div className="card text-center" style={{ width: "20rem" }}>
              <div className="card-header">{t("Ingreso")}</div>
              <div className="card-body">
                <p className="card-text">
                  {t(
                    "Para tener acceso de administrador contacte con el soporte"
                  )}
                </p>
                <form>
                  <label>{t("Usuario")}</label>
                  <input
                    type="username"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={user}
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                  />
                  <label>{t("Contraseña")}</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button onClick={postLogin} className="btn btn-primary">
                    {t("Ingresar")}
                  </button>
                </form>
                {isError ? (
                  <div className="alert alert-danger fade show" role="alert">
                    {t(msg)}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
