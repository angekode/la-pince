type Props = {
  transactions: any[];
  onDelete: (id: number) => void;
  onEdit: (t: any) => void;
};

export default function ExpenseList({ transactions, onDelete, onEdit }: Props) {
  return (
    <div className="expense-list">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="expense-row"
          style={{
            borderLeft: `5px solid ${t.category?.colorCode || "#ccc"}`,
            paddingLeft: "10px",
          }}
        >
          <span>{t.category?.name}</span>
          <span>{t.amount} €</span>
          <span>{new Date(t.date).toLocaleDateString()}</span>

          <div className="actions">
            <button onClick={() => onDelete(t.id)}>❌</button>
            <button onClick={() => onEdit(t)}>✏️</button>
          </div>
        </div>
      ))}
    </div>
  );
}