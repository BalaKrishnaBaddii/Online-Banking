import { useState } from "react";
import "./addBank.css";

export function AdddBankAccount({ handleAddBank }) {
  const [number, setNumber] = useState("");
  const [name, setname] = useState("");
  const [balance, setBalance] = useState("");

  function handleOnSubnit(e) {
    e.preventDefault();
    if (!number || !name || !balance) return;
    const newAccount = {
      number,
      name,
      balance,
    };
    handleAddBank(newAccount);
    setBalance("");
    setname("");
    setNumber("");
  }

  return (
    <div className="add-bank">
      <h3>Add Bank Account</h3>
      <form onSubmit={handleOnSubnit}>
        <lable>Bank Name</lable>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <lablel>Account Number</lablel>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <lable>Balance</lable>
        <input
          type="text"
          value={balance}
          onChange={(e) =>
            setBalance(Number(e.target.value) ? Number(e.target.value) : "")
          }
        />
        <button type="submit">Add Account</button>
      </form>
    </div>
  );
}
