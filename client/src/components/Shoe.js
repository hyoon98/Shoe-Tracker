import React from "react";
import "../styles/Shoe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Shoe({ data }) {
  const {
    id,
    original_price,
    price,
    shoe_name,
    image,
    url,
    date_created,
  } = data;
  return (
    <div className="item-container" onClick={() => window.open(url, "_blank")}>
      <img className="shoe-image" src={image} alt="example" />
      <div className="item-info-container">
        <h2 className="shoe-name">{shoe_name}</h2>
        <div className="date_create">Date added: {date_created[0]} </div>
        <div className="prices">
          <div className="current-price">Current Price: {price}</div>
          <div className="original-price">Original Price: {original_price}</div>
        </div>
      </div>
      <FontAwesomeIcon
        className="remove"
        icon={faTrash}
        onClick={(e) => {
          e.stopPropagation();
          console.log("deleted");
        }}
      />
    </div>
  );
}
