import type { ChangeEvent, FormEvent } from "react";



type FormData = {
  date: string;
  description: string;
  category: string;
  amount: string;
};

function AddTransaction() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Форма відправлена");
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(event.target.value);
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="section-title">
        <span>●</span>
        <h2>Нова операція</h2>
        <small>РОЗУМНІ ВНЕСЕННЯ ДАНИХ v1.4</small>
      </div>

      <div className="form-grid">
        <label>
          Дата

          <input
            type="text"
            defaultValue="18.10.2024"
            onChange={handleChange}
          />
        </label>

        <label>
          Опис товару / послуги

          <input
            type="text"
            placeholder="напр. бензин, Сільпо, Заправка авто WOG"
            onChange={handleChange}
          />
        </label>

        <label>
          Категорія

          <select onChange={handleChange}>
            <option>Продукти харчування</option>
            <option>Транспорт</option>
            <option>Здоров'я</option>
            <option>Розваги</option>
            <option>Комунальні</option>
          </select>
        </label>

        <label>
          Сума

          <input
            type="number"
            placeholder="0.00"
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="reset" className="clear">
          ✕ ОЧИСТИТИ
        </button>

        <button type="submit" className="add">
          ⊕ ВНЕСТИ
        </button>
      </div>
    </form>
  );
}

export default AddTransaction;