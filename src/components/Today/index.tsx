import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Today.css";

const Today = () => {
  const [btcPrice, setBtcPrice] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [ltcPrice, setLtcPrice] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      return restoreStateFromLocalStorage();
    }
    const fetchCryptoValue = async () => {
      try {
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
        );
        setBtcPrice(response.data.BTC.USD);
        setEthPrice(response.data.ETH.USD);
        setLtcPrice(response.data.LTC.USD);
        saveStateToLocalStorage();
      } catch (error) {
        console.log(error);
      }
    };
    fetchCryptoValue();
    setInterval(() => {
      fetchCryptoValue();
    }, 60000);
  }, []);

  const saveStateToLocalStorage = () => {
    localStorage.setItem(
      "today-state",
      JSON.stringify({
        btcPrice,
        ethPrice,
        ltcPrice,
      })
    );
  };

  const restoreStateFromLocalStorage = () => {
    const state = JSON.parse(localStorage.getItem("today-state") || "");
    setBtcPrice(state.btcPrice);
    setEthPrice(state.ethPrice);
    setLtcPrice(state.ltcPrice);
  };

  return (
    <div className="today--section container">
      <h2>Current Price</h2>
      <div className="columns today--section__box">
        <div className="column btc--section">
          <h5>${btcPrice}</h5>
          <p>1 BTC</p>
        </div>
        <div className="column eth--section">
          <h5>${ethPrice}</h5>
          <p>1 ETH</p>
        </div>
        <div className="column ltc--section">
          <h5>${ltcPrice}</h5>
          <p>1 LTC</p>
        </div>
      </div>
    </div>
  );
};

export default Today;
