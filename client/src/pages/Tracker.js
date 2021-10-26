import Shoe from "../components/Shoe";
import { useState, useEffect } from "react";
import "../styles/Tracker.css";
import axios from "axios";

function Tracker() {
  const [url, setUrl] = useState("");
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => {
      setShoes(res.data);
      console.log(res.data);
    });
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/", { url: url }).then((res) => {
      console.log(res.data);
    });
  }

  return (
    <div className="Tracker">
      <h1>Shoe Tracker</h1>
      <div className="Shoes">
        {shoes.map((shoe) => (
          <Shoe data={shoe} key={shoe.id} />
        ))}
      </div>
      <div className="form">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Tracker;
