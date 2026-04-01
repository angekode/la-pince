import DatePicker from "react-datepicker";

type Props = {
  categories: any[];
  selectedCategoryId: number | "";
  setSelectedCategoryId: any;
  amount: string;
  setAmount: any;
  date: Date | null;
  setDate: any;
  onSave: () => void;
  onCancel: () => void;
};

export default function ExpenseForm({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  amount,
  setAmount,
  date,
  setDate,
  onSave,
  onCancel,
}: Props) {
  return (
    <div className="form">
      <select
        value={selectedCategoryId}
        onChange={(e) =>
          setSelectedCategoryId(e.target.value ? Number(e.target.value) : "")
        }
      >
        <option value="">-- Choisir catégorie --</option>
        {categories.map((cat) => (
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

      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        maxDate={new Date()}
      />

      <div className="form-actions">
        <button onClick={onCancel}>Annuler</button>
        <button className="primary-button" onClick={onSave}>
          Sauvegarder
        </button>
      </div>
    </div>
  );
}