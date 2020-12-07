import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import SectionBox from "./SectionBox";
import { Price } from "../../types";
import "./History.css";

const History = () => {
  const [todayPrice, setTodayPrice] = useState({} as Price);
  const [yesterdayPrice, setYesterdayPrice] = useState({} as Price);
  const [twoDaysPrice, setTwoDaysPrice] = useState({} as Price);
  const [threeDaysPrice, setThreeDaysPrice] = useState({} as Price);
  const [fourDaysPrice, setFourDaysPrice] = useState({} as Price);
  const days = ["today", "yesterday", "twoDays", "threeDays", "fourDays"];

  useEffect(() => {
    if (!navigator.onLine) {
      restoreStateFromLocalStorage();
    }

    days.forEach((day: string, index: number) => {
      getPriceForDay(index, day);
    });
  }, []);

  const saveStateToLocalStorage = () => {
    localStorage.setItem(
      "history-state",
      JSON.stringify({
        todayPrice,
        yesterdayPrice,
        twoDaysPrice,
        threeDaysPrice,
        fourDaysPrice,
      })
    );
  };

  const restoreStateFromLocalStorage = () => {
    const state = JSON.parse(localStorage.getItem("history-state") || "");
    setTodayPrice(state.todayPrice);
    setYesterdayPrice(state.yesterdayPrice);
    setTwoDaysPrice(state.twoDaysPrice);
    setThreeDaysPrice(state.threeDaysPrice);
    setFourDaysPrice(state.fourDaysPrice);
  };

  const getCurrencyPrice = async (date: string, currency: string) => {
    try {
      return await axios.get(
        `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${currency}&tsyms=USD&ts=${date}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getPriceForDay = async (daysCount = 0, key: string) => {
    try {
      const time = moment().subtract(daysCount, "days").unix().toString();
      const response = await axios.all([
        getETHPrices(time),
        getBTCPrices(time),
        getLTCPrices(time),
      ]);
      let prices = {
        date: moment.unix(Number(time)).format("MMMM Do YYYY"),
      } as Price;

      response.forEach((res: any, index: number) => {
        if (index === 0) {
          prices.eth = res.data.ETH?.USD || "";
        }
        if (index === 1) {
          prices.btc = res.data.BTC?.USD || "";
        }
        if (index === 2) {
          prices.ltc = res.data.LTC?.USD || "";
        }
      });
      setSpecificState(prices, key);
    } catch (error) {
      console.log(error);
    }
  };

  const getETHPrices = (date: string) => getCurrencyPrice(date, "ETH");
  const getBTCPrices = (date: string) => getCurrencyPrice(date, "BTC");
  const getLTCPrices = (date: string) => getCurrencyPrice(date, "LTC");

  const setSpecificState = (prices: Price, day: string) => {
    if (day === days[0]) {
      setTodayPrice(prices);
    }
    if (day === days[1]) {
      setYesterdayPrice(prices);
    }
    if (day === days[2]) {
      setTwoDaysPrice(prices);
    }
    if (day === days[3]) {
      setThreeDaysPrice(prices);
    }
    if (day === days[4]) {
      setFourDaysPrice(prices);
    }
    saveStateToLocalStorage();
  };

  return (
    <div className="history--section container">
      <h2>History (Past 5 days)</h2>
      <div className="history--section__box">
        <SectionBox price={todayPrice} />
        <SectionBox price={yesterdayPrice} />
        <SectionBox price={twoDaysPrice} />
        <SectionBox price={threeDaysPrice} />
        <SectionBox price={fourDaysPrice} />
      </div>
    </div>
  );
};

export default History;
