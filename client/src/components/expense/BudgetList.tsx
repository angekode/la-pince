export default function BudgetList({ mergedCategories, onEdit }: any) {
  return (
    <div className="expense-list">
      {mergedCategories.map((cat: any) => (
        <div key={cat.id} className="budget-row">

          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: cat.colorCode || "#ccc",
              }}
            />
            {cat.name}
          </span>

          <span>{cat.budget ? `${cat.budget.limit} €` : "-"}</span>
          <span>{cat.spent} €</span>

          <div>
            <button onClick={() => onEdit(cat)}>✏️</button>
          </div>

        </div>
      ))}
    </div>
  );
}