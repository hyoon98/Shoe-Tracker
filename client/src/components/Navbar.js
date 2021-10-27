import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div
      style={{
        boxSizing: "border-box",
        background: "white",
        margin: "0",
        marginBottom: "1em",
        padding: "0.2rem calc((100vw - 1000px) / 2)",
      }}
    >
      <h1 style={{ color: "#2b6638", margin: "0", padding: "0.5em" }}>
        <FontAwesomeIcon icon={faShoePrints} />
        Shoe Tracker
        <FontAwesomeIcon icon={faShoePrints} />
      </h1>
    </div>
  );
}
