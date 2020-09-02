import React,{useState} from "react";
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute';
import  LogIn  from './components/logIn/logIn';
import HomePage from './components/HomePage/HomePage'
import { AuthContext } from './utils/auth'
import "./App.css";
function App  () {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') || "");
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  return(
  <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
  <BrowserRouter>
  <Switch>
      <PrivateRoute  exact path="/" component={HomePage} />
      <Route  path="/login" component={LogIn}/>
      </Switch>
    </BrowserRouter>
    </AuthContext.Provider>
)
  }

export default App;
