import i18n from "i18next";
import { initReactI18next, OnInit,EventEmitter } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Total de packs de cervezas ":"total beer packs: ",
      "Ocurrió un problema con el servidor vuelva a intentar.":"There was problem with the server try again",
      "Ocurrió un problema  vuelva a intentar.":"There was a problem try again",
      "Usuario y/o contraseña incorrectos.":"User and/or password is incorrect",
      "Inserte Contraseña":"Insert Password",
      "Inserte Usuario":"Insert User",
      "Numero de personas":"Number of People",
      "Enviar":"Submit",
      "Cuantas personas van a asistir al meetup?":"How many people will attend the meetup?",
      "Temperatura":"Temperature",
      "Ingreso": "Log in",
      "Usuario" : "User",
      "Contraseña":"Password",
      "Ingresar":"Log in",
      "Para tener acceso de administrador contacte con el soporte": "To have access please contact to the suport."
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;