import React from "react";
import "../styles/Shoe.css";

export default function Shoe(props) {
  const { original_price, price, shoe_name } = props.data;
  return (
    <div className="item-container">
      <img className="shoe-image" src="/example.jpeg" alt="example" />
      <div className="item-info-container">
        <h2 className="shoe-name">{shoe_name}</h2>
        <div className="shoe-info">
          Magna duis sint pariatur ullamco irure mollit reprehenderit excepteur
        </div>
        <div className="prices">
          <div className="current-price">Current Price:{price}</div>
          <div className="original-price">Original Price:{original_price}</div>
        </div>
      </div>
    </div>
  );
}
