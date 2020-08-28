import React, { useState, useEffect } from "react";
const Temperatura = () => {
  const [temp, setTemp] = useState("");

  useEffect(() => {
    try {
      fetch("/api/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => setTemp(Math.round(response.main.temp)));
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
      <h5 className="text-right mb-4">Tiempo: {temp}°</h5>
    </div>
  );
};

export default Temperatura;
