import { useState } from "react";
import "./styles.css";
import { AdddBankAccount } from "./AdddBankAccount";

const banks = [
  {
    number: 10,
    name: "HDFC Bank",
    balance: 500,
  },
  {
    number: 245,
    name: "Axis Bank",
    balance: 2500,
  },
  {
    number: 324,
    name: "ICICI Bank",
    balance: 48000,
  },
];

export default function App() {
  const [bankAccounts, setBankAccounts] = useState(banks);
  const [showAddBankAccount, setShowBankAccount] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  console.log(bankAccounts);

  function handleShowBankAccount() {
    setShowBankAccount((showAddBankAccount) => !showAddBankAccount);
  }

  function handleAddBank(newAccount) {
    setBankAccounts([...bankAccounts, newAccount]);
    setShowBankAccount(false);
  }

  function handleSelectedBank(bank) {
    setSelectedBankAccount(bank);
    setShowBankAccount(false);
  }

  function handleBankBalances(newBalance) {
    setBankAccounts((bankAccounts) =>
      bankAccounts.map((bank) =>
        bank.number === selectedBankAccount.number
          ? { ...bank, balance: newBalance }
          : bank
      )
    );
    setSelectedBankAccount(null);
  }

  return (
    <div className="App">
      <Sidebar
        bankAccounts={bankAccounts}
        onAddBank={handleShowBankAccount}
        showAddBankAccount={showAddBankAccount}
        onSelectedBank={handleSelectedBank}
      />
      {showAddBankAccount && <AdddBankAccount handleAddBank={handleAddBank} />}
      {!showAddBankAccount && (
        <RightPanel
          bankAccounts={bankAccounts}
          selectedBankAccount={selectedBankAccount}
          handleBankBalance={handleBankBalances}
          key={selectedBankAccount?.number}
        />
      )}
    </div>
  );
}

function RightPanel({ bankAccounts, selectedBankAccount, handleBankBalance }) {
  const totalBalance = bankAccounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  return (
    <div className="right-panel">
      <div className="top-bar">
        <p>Bank Balance: </p>
        <span className={totalBalance > 0 ? "green" : "red"}>
          &#x20B9; {totalBalance}/-
        </span>
      </div>
      {selectedBankAccount && (
        <Banking
          selectedBankAccount={selectedBankAccount}
          handleBankBalance={handleBankBalance}
        />
      )}
    </div>
  );
}

function Banking({ selectedBankAccount, handleBankBalance }) {
  const [amount, setAmount] = useState("");
  const [withdraw, setWithdraw] = useState("withdraw");

  function handleProceed(e) {
    e.preventDefault();
    withdraw === "withdraw"
      ? handleBankBalance(selectedBankAccount.balance - amount)
      : handleBankBalance(selectedBankAccount.balance + amount);
  }

  function handleAmount(e) {
    if (withdraw === "deposit") return setAmount(Number(e.target.value));
    Number(e.target.value) <= selectedBankAccount.balance &&
    Number(e.target.value) >= 0
      ? setAmount(Number(e.target.value))
      : setAmount(selectedBankAccount.balance);
  }

  return (
    <>
      <form className="banking" onSubmit={handleProceed}>
        <label>Welcome to {selectedBankAccount.name} Banking </label>
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
          placeholder="Enter Amount to Withdraw"
          onChange={(e) => handleAmount(e)}
        />

        <button type="submit">{"Proceed"}</button>
      </form>
    </>
  );
}

function Sidebar({
  bankAccounts,
  onAddBank,
  showAddBankAccount,
  onSelectedBank,
}) {
  return (
    <div className="sidebar">
      <ul>
        {bankAccounts.map((bank) => (
          <Bank key={bank.number} bank={bank} onSelectedBank={onSelectedBank} />
        ))}
      </ul>
      <Button onclick={onAddBank}>
        {showAddBankAccount ? "Close" : "Add Bank"}
      </Button>
    </div>
  );
}

function Button({ onclick, children }) {
  return (
    <button className="sidebar-button" onClick={onclick}>
      {children}
    </button>
  );
}

function Bank({ bank, onSelectedBank }) {
  return <li onClick={() => onSelectedBank(bank)}>{bank.name}</li>;
}
