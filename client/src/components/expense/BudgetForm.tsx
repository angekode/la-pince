export default function BudgetForm({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  amount,
  setAmount,
  alertEnabled,
  setAlertEnabled,
  onSave,
  onCancel,
}: any) {
  return (
    <div className="form">
      <select
        value={selectedCategoryId}
        onChange={(e) =>
          setSelectedCategoryId(e.target.value ? Number(e.target.value) : "")
        }
      >
        <option value="">-- Choisir catégorie --</option>
        {categories.map((cat: any) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Montant"
      />

      <label>
        Alerte
        <input
          type="checkbox"
          checked={alertEnabled}
          onChange={(e) => setAlertEnabled(e.target.checked)}
        />
      </label>

      <button onClick={onCancel}>Annuler</button>
      <button onClick={onSave}>Sauvegarder</button>
    </div>
  );
}