import React, { useEffect, useState } from "react";
import "./App.css";
import * as API from "./apiCommons.js";

function App() {
  let [accounts, setAccounts] = useState([]);
  let [inputValue, onChangeInputValue] = useState("");
  let [key, incrementKey] = useState(0);

  useEffect(() => {
    API.get(`http://localhost:8080`)
      .then(res => {
        return res.json().then(body => setAccounts(_ => body));
      })
      .catch(err => {
        console.log(err);
      });
  }, [key]);

  return (
    <div className="App">
      <header>Zadanie rekrutacyjne trycodenet</header>
      <div>
        <input
          value={inputValue}
          onChange={event => {
            let value = event.target.value;
            onChangeInputValue(_ => value);
          }}
        />
        <button
          onClick={() => {
            incrementKey(_ => key + 1);
            API.put(
              `http://localhost:8080/put-item?accountNumber=${inputValue}`,
              {
                accountNumber: `${inputValue}`
              }
            )
              .then(res => console.log(res))
              .catch(error => console.log(error));
          }}
        >
          DODAJ ELEMENT
        </button>
      </div>
      {accounts.map((element, index) => (
        <div key={`${index}`}>{element.accountNumber}</div>
      ))}
    </div>
  );
}

export default App;
