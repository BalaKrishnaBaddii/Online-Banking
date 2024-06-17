export function Button({ onclick, children }) {
  return (
    <button className="sidebar-button" onClick={onclick}>
      {children}
    </button>
  );
}
