import React from "react";
import { Price } from "../../types";

type Props = {
  price: Price;
};

const SectionBox = ({ price }: Props) => (
  <div className="history--section__box__inner">
    <h4>{price.date}</h4>
    <div className="columns">
      <div className="column">
        <p>1 BTC = ${price.btc}</p>
      </div>
      <div className="column">
        <p>1 ETH = ${price.eth}</p>
      </div>
      <div className="column">
        <p>1 LTC = ${price.ltc}</p>
      </div>
    </div>
  </div>
);

export default SectionBox;
