import React from "react";
import Today from "./components/Today";
import History from "./components/History";
import "./App.css";

function App() {
  return (
    <div className="">
      <div className="topheader">
        <header className="container">
          <nav className="navbar">
            <div className="navbar-brand">
              <span className="navbar-item">CryptoNow</span>
            </div>
            <div className="navbar-end">
              <a
                className="navbar-item"
                href="https://github.com/Palfonsoag/cryptoNow"
                target="_blank"
                rel="noopener noreferrer"
              >
                CryptoNow Repo
              </a>
            </div>
          </nav>
        </header>
      </div>
      <section className="results--section">
        <div className="container">
          <h1>
            CryptoNow is a realtime price information about<br></br> BTC, ETH
            and LTC.
          </h1>
        </div>
        <div className="results--section__inner">
          <Today />
          <History />
        </div>
      </section>
    </div>
  );
}

export default App;
