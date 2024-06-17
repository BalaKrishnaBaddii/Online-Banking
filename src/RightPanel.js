import { useState } from "react";
import { Banking } from "./Banking";

export function RightPanel({
  bankAccounts,
  selectedBankAccount,
  handleBankBalance,
  setSelectedBankAccount,
}) {
  const totalBalance = bankAccounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const [isOpen, setIsOpen] = useState(true);

  function handleIsOpen() {
    setIsOpen(false);
    setSelectedBankAccount(null);
  }

  return (
    <div className="right-panel">
      <div className="top-bar">
        <p>Bank Balance: </p>
        <span className={totalBalance > 0 ? "green" : "red"}>
          &#x20B9; {totalBalance}/-
        </span>
      </div>
      {selectedBankAccount && isOpen && (
        <Banking
          selectedBankAccount={selectedBankAccount}
          handleBankBalance={handleBankBalance}
          onIsOpen={handleIsOpen}
        />
      )}
    </div>
  );
}
