type Transaction = {
    date: string;
    description: string;
    category: string;
    amount: string;
    icon: string;
    income?: boolean;
  };
  
  const transactions: Transaction[] = [
    {
      date: "18.10.2024",
      description: "Сімейна доставка",
      category: "Продукти",
      amount: "-420.00 грн",
      icon: "",
    },
    {
      date: "18.10.2024",
      description: "Пальне A-95 (WOG)",
      category: "Транспорт",
      amount: "-1 850.00 грн",
      icon: "",
    },
    {
      date: "17.10.2024",
      description: "Аптека «Подорожник»",
      category: "Здоров'я",
      amount: "-360.00 грн",
      icon: "",
    },
    {
      date: "16.10.2024",
      description: "Запас на проект UI/UX",
      category: "Зарплата",
      amount: "+35 000.00 грн",
      icon: "",
      income: true,
    },
    {
      date: "15.10.2024",
      description: "Вечеря в ресторані",
      category: "Розваги",
      amount: "-1 150.00 грн",
      icon: "",
    },
    {
      date: "14.10.2024",
      description: "Підписка Figma & Spotify",
      category: "Сервіс",
      amount: "-520.00 грн",
      icon: "",
    },
  ];
  
  function Transactions() {
    return (
      <section className="transactions card">
        <div className="card-header">
          <h2>
            <span>●</span> Останні транзакції
          </h2>
  
          <div>
            <button>⚙ Фільтр</button>
            <button>⇩ Експорт</button>
          </div>
        </div>
  
        <div className="table">
          <div className="table-head">
            <span>ДАТА</span>
            <span>ОПИС</span>
            <span>КАТЕГОРІЯ</span>
            <span>СУМА</span>
            <span>ДІЇ</span>
          </div>
  
          {transactions.map((transaction, index) => (
            <div
              className={`table-row ${
                transaction.income ? "income-row" : ""
              }`}
              key={index}
            >
              <span>{transaction.date}</span>
  
              <span>{transaction.description}</span>
  
              <span>
                <b className="category">
                  {transaction.icon} {transaction.category}
                </b>
              </span>
  
              <strong
                className={transaction.income ? "positive" : "negative"}
              >
                {transaction.amount}
              </strong>
  
              <span className="actions">✎ &nbsp; 🗑</span>
            </div>
          ))}
        </div>
  
        <div className="transactions-footer">
          Показано 6 з 48 операцій за поточний період
          <span>Всі операції →</span>
        </div>
      </section>
    );
  }
  
  export default Transactions;