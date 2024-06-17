import { Bank } from "./Bank";
import { Button } from "./Button";

export function Sidebar({
  bankAccounts,
  onAddBank,
  showAddBankAccount,
  onSelectedBank,
  onDeleteBank,
}) {
  return (
    <div className="sidebar">
      <ul>
        {bankAccounts.map((bank) => (
          <Bank
            key={bank.number}
            bank={bank}
            onSelectedBank={onSelectedBank}
            onDeleteBank={onDeleteBank}
          />
        ))}
      </ul>
      <Button onclick={onAddBank}>
        {showAddBankAccount ? "Close" : "Add Bank"}
      </Button>
    </div>
  );
}
