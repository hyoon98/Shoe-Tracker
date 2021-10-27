import Shoe from "../components/Shoe";
import { useState, useEffect } from "react";
import "../styles/Tracker.css";
import axios from "axios";
import Navbar from "../components/Navbar";

function Tracker() {
  const [url, setUrl] = useState("");
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => {
      setShoes(res.data);
    });
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/", { url: url }).then((res) => {
      window.location.reload();
    });
  }

  return (
    <div className="Tracker">
      <Navbar />
      <div className="Shoes">
        {shoes.length === 0 ? (
          <h2>Loading shoes or list is empty!</h2>
        ) : (
          shoes.map((shoe) => <Shoe data={shoe} key={shoe.id} />)
        )}
      </div>
      <div className="form">
        <form onSubmit={submitHandler}>
          <label>
            <h2>Add a Shoe</h2>
          </label>
          <input
            type="text"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <input type="submit" value="Add URL" />
        </form>
      </div>
    </div>
  );
}

export default Tracker;
