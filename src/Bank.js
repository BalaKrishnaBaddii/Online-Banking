export function Bank({ bank, onSelectedBank, onDeleteBank }) {
  return (
    <div className="bank-button">
      <li onClick={() => onSelectedBank(bank)}>{bank.name}</li>
      <span onClick={() => onDeleteBank(bank)}>&#x1F5D1;</span>
    </div>
  );
}
