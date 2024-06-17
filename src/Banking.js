import { useState } from "react";

export function Banking({ selectedBankAccount, handleBankBalance, onIsOpen }) {
  const [amount, setAmount] = useState("");
  const [withdraw, setWithdraw] = useState("withdraw");

  function handleProceed(e) {
    e.preventDefault();
    withdraw === "withdraw"
      ? handleBankBalance(selectedBankAccount.balance - amount)
      : handleBankBalance(selectedBankAccount.balance + amount);
  }

  function handleAmount(e) {
    setAmount(0);
    if (withdraw === "deposit") return setAmount(Number(e.target.value));
    Number(e.target.value) <= selectedBankAccount.balance &&
    Number(e.target.value) >= 0
      ? setAmount(Number(e.target.value))
      : setAmount(selectedBankAccount.balance);
  }

  return (
    <>
      <form className="banking" onSubmit={handleProceed}>
        <span>
          <label>Welcome to {selectedBankAccount.name} Banking </label>
          <em className="close" onClick={onIsOpen}>
            ❌
          </em>
        </span>
        <select onChange={(e) => setWithdraw(e.target.value)}>
          <option value={"withdraw"}>Withdraw Amount</option>
          <option value={"deposit"}>Deposit Amount</option>
        </select>
        <label>Avail Balance</label>
        <input type="text" disabled value={selectedBankAccount.balance} />
        <label>Amount</label>
        <input
          type="text"
          value={amount}
          placeholder={`Enter ${withdraw} amount`}
          onChange={(e) => handleAmount(e)}
        />

        <button type="submit">{"Proceed"}</button>
      </form>
    </>
  );
}
