import React, { useEffect, useState } from "react";
import "./App.css";
import * as API from "./apiCommons.js";
import { Table, Input, Icon, Button, notification } from "antd";
import "antd/dist/antd.css";

const App = () => {
  let [accounts, setAccounts] = useState([]);
  let [inputValue, onChangeInputValue] = useState("");
  let [key, incrementKey] = useState(0);

  useEffect(() => {
    API.get(`http://localhost:8080`)
      .then(res => {
        return res.json().then(body => setAccounts(_ => body));
      })
      .catch(err => console.log(err));
  }, [key]);

  return (
    <div className="App">
      <div className="input-wrapper">
        <Input
          value={inputValue}
          placeholder="Input a number"
          onChange={event => {
            const { value } = event.target;
            const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
            if (
              (!isNaN(value) && reg.test(value)) ||
              value === "" ||
              value === "-"
            ) {
              onChangeInputValue(_ => value);
            }
          }}
        />
        <Button
          disabled={inputValue.length === 0 ? true : false}
          type="primary"
          onClick={() => {
            API.put(
              `http://localhost:8080/put-item?accountNumber=${inputValue}`,
              {
                accountNumber: `${inputValue}`
              }
            )
              .then(res => {
                incrementKey(_ => key + 1);
                successNotification();
              })
              .catch(error => failureNotification());
          }}
        >
          Add account
        </Button>
      </div>
      <header>List of scanned accounts</header>
      <Table
        pagination={false}
        className="accounts-table"
        dataSource={accounts}
        columns={columns}
      />
    </div>
  );
};

export default App;

const successNotification = () => {
  notification.open({
    message: "Congratulations",
    description: "Your accout has been successfully saved",
    icon: <Icon type="smile" style={{ color: "#4ae063" }} />
  });
};

const failureNotification = () => {
  notification.open({
    message: "Upsss",
    description: "Failed to save. Try again",
    icon: <Icon type="warning" style={{ color: "#d93b62" }} />
  });
};

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Account Number",
    dataIndex: "accountNumber",
    key: "accountNumber"
  }
];
