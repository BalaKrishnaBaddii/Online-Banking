import { useState } from "react";
import "./styles.css";
import { AdddBankAccount } from "./AdddBankAccount";
import { RightPanel } from "./RightPanel";
import { Sidebar } from "./Sidebar";

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

  function handleDeleteBank(delBank) {
    const updatedBanks = bankAccounts.filter(
      (bank) => bank.number !== delBank.number
    );
    setBankAccounts(updatedBanks);
  }
  return (
    <div className="App">
      <Sidebar
        bankAccounts={bankAccounts}
        onAddBank={handleShowBankAccount}
        showAddBankAccount={showAddBankAccount}
        onSelectedBank={handleSelectedBank}
        onDeleteBank={handleDeleteBank}
      />
      {showAddBankAccount && <AdddBankAccount handleAddBank={handleAddBank} />}
      {!showAddBankAccount && (
        <RightPanel
          bankAccounts={bankAccounts}
          selectedBankAccount={selectedBankAccount}
          handleBankBalance={handleBankBalances}
          setSelectedBankAccount={setSelectedBankAccount}
          key={selectedBankAccount?.number}
        />
      )}
    </div>
  );
}
