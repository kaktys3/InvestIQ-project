import React, { useState } from 'react';
import dashboard from './dashboard.module.css';
import { IoArrowDownOutline } from "react-icons/io5";
import { IoArrowUpOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../../Store';
import { monthlyAnalitic, selectAllTransaction, statisticCategory } from '../../Store/finansSelector';
import type { AnalyticsResponse, pushDataSb, statisticTransaction, Transaction, updataDataInterfase } from '../../Store/interface';
import { TfiStatsDown } from "react-icons/tfi";
import { TfiStatsUp } from "react-icons/tfi";
import { TbPointFilled } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { TbFileDescriptionFilled } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { deletTransaction, pushData, updataData } from '../../Store/dataScript';
import { CiImport } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import health from '../../img/health.svg'
// import other from '../../img/other.svg'
// import entertainment from '../../img/entertainment.svg'
// import utilities from '../../img/utilities.svg'
// import products from '../../img/products.svg'
// import salary from '../../img/salary.svg'
// import services from '../../img/salary.svg'
// import transport from '../../img/transport.svg'
// export const categoryIconMap: Record<string, string> = {
//     health: health,         // Здоров'я
//     entertainment: entertainment,     // Розваги
//     utilities: utilities,           // Комунальні / Сервіси
//     products:  products,     // Продукти
//     salary: salary,        // Зарплата
//     services: services,            // Послуги
//     transport: transport,          // Транспорт
//     other: other,         // Інше
// };

const defaultState = {
    id: crypto.randomUUID(),
    type: 'expense',
    title: '',
    amount: 0,
    transaction_date: '',
    category_id: '',
    description: '',
    name: '',
    parent_id: '',
    date: '',
    sub_category: ''
}

const defoaltUpdata = {
    id: '',                      // ID транзакції, яку оновлюємо
    title: '',
    transaction_date: '',
    type: '',
    amount: 0,
    description: '',
}

export function Dashboard() {
    const [subName, setSubName] = useState('')
    const [filter, setFilter] = useState('')
    const [transactions, setTransactions] = useState({
        id: crypto.randomUUID(),
        type: 'expense',
        title: '',
        amount: 0,
        transaction_date: '',
        category_id: '',
        name: '',
        description: '',
        parent_id: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [updata, setUpdata] = useState({
        id: '',                      // ID транзакції, яку оновлюємо
        title: '',
        transaction_date: '',
        type: '',
        amount: 0,
        description: '',
    }
    )
    const dispatch = useAppDispatch()
    const transactionData = useAppSelector(selectAllTransaction) as Transaction[]
    const statisticTransaction = useAppSelector(statisticCategory) as statisticTransaction
    const monthAnalitic = useAppSelector(monthlyAnalitic) as AnalyticsResponse

    console.log(updata)


    const hundelSubmit = (e: any) => {
        e.preventDefault()

        dispatch(pushData(transactions as pushDataSb)).unwrap()

        setTransactions(defaultState)
        setSubName('')
    }

    const hundelUpdata = (e: any) => {
        e.preventDefault()

        dispatch(updataData(updata as updataDataInterfase)).unwrap()
        setUpdata(defoaltUpdata)
        setIsModalOpen(false)
    }

    return (
        <div className={dashboard.dashboardContainer}>
            <div className={dashboard.heroTopRow}>
                <div className={dashboard.balanceInfo}>
                    <label>ЗАГАЛЬНИЙ ЗАЛИШОК РАХУНКУ <span className={dashboard.balansTrue}>● Баланс підтверджено</span></label>
                    <h1>{monthAnalitic && monthAnalitic.net_summary} <span>грн</span></h1>
                </div>
                <div className={dashboard.finansContainer}>
                    <div className={dashboard.expenseBox}>
                        <IoArrowDownOutline className={dashboard.expenseImg} />
                        <div className={dashboard.expenseDataVisual}>
                            <p>ВИТРАТИ (МІСЯЦЬ)</p>
                            <p className={dashboard.expenseSum}>{monthAnalitic && monthAnalitic.total_expense}</p>
                        </div>
                    </div>
                    <div className={dashboard.incomeBox}>
                        <IoArrowUpOutline className={dashboard.incomeImg} />
                        <div className={dashboard.incomeDataVisual}>
                            <p>ЗАГАЛЬНИЙ ДОХІД</p>
                            <p className={dashboard.incomeSum}>{monthAnalitic && monthAnalitic.total_income}</p>
                        </div>
                    </div>
                    <div className={dashboard.modeToggleGroup}>
                        <button
                            type="button"
                            className={dashboard.toggleButton}
                            style={{
                                background: transactions.type === 'expense' ? 'linear-gradient(90deg, #ff5e3a 0%, #ff2a6d 50%, #9b51e0 100%)' : 'rgba(11, 14, 21, 0.6)',
                                transition: 'background-color 0.3s ease-in-out',
                            }}
                            onClick={() => setTransactions({ ...transactions, type: 'expense' })}
                        >
                            <TfiStatsDown /> ВИТРАТИ
                        </button>
                        <button
                            type="button"
                            className={`${dashboard.toggleButton} ${transactions.type === 'income' ? dashboard.toggleIncome : ''}`}
                            style={{
                                background: transactions.type === 'income' ? 'linear-gradient(90deg, #ff5e3a 0%, #ff2a6d 50%, #9b51e0 100%)' : 'rgba(11, 14, 21, 0.6)',
                                transition: 'background-color 0.3s ease-in-out',
                            }}
                            onClick={() => setTransactions({ ...transactions, type: 'income' })}
                        >
                            <TfiStatsUp />  ДОХІД
                        </button>
                    </div>
                </div>
            </div>

            <form className={dashboard.formSection} onSubmit={hundelSubmit}>
                <div className={dashboard.formTitleBox}>
                    <h2><TbPointFilled className={dashboard.point} />Нова операція</h2>
                    <p>РОЗУМНЕ ВНЕСЕННЯ ДАНИХ V2.4</p>
                </div>
                <div className={dashboard.formInputPath}>
                    <div className={dashboard.formGroupData}>
                        <label><MdOutlineDateRange className={dashboard.Icon} />Дата</label>
                        <input
                            type="date"
                            required
                            className={dashboard.inputDate}
                            value={transactions.transaction_date}
                            onChange={(e) => setTransactions({ ...transactions, transaction_date: e.target.value })}
                        />
                    </div>

                    <div className={dashboard.formGroupData}>
                        <label><TbFileDescriptionFilled className={dashboard.Icon} />заголовок</label>
                        <input
                            type="text"
                            required
                            className={dashboard.input}
                            placeholder="напр. Молочка"
                            value={transactions.title}
                            onChange={(e) => setTransactions({ ...transactions, title: e.target.value })}
                        />
                    </div>

                    <div className={dashboard.formGroupDescription}>
                        <label><TbFileDescriptionFilled className={dashboard.Icon} />Опис товару / послуги</label>
                        <input
                            type="text"
                            required
                            className={dashboard.input}
                            placeholder="напр. Сметану, Морква або WOG"
                            value={transactions.description}
                            onChange={(e) => setTransactions({ ...transactions, description: e.target.value })}
                        />
                    </div>

                    <div className={dashboard.formGroupCategory}>
                        <label><MdOutlineCategory className={dashboard.Icon} />Категорія</label>
                        {/* 1. Батьківська категорія */}
                        <select
                            required
                            className={dashboard.select}
                            value={transactions.parent_id}
                            onChange={(e) => {
                                const parentId = e.target.value;
                                const parentCat = monthAnalitic?.system_category?.find(c => c.category_id === parentId);

                                setTransactions(prev => ({
                                    ...prev,
                                    parent_id: parentId,
                                    name: parentCat ? parentCat.name : prev.name // Автозаповнення
                                }));
                            }}
                        >
                            <option value="">-- Оберіть основну категорію --</option>
                            {monthAnalitic?.system_category?.map((e) => (
                                <option key={e.category_id} value={e.category_id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>

                        {/* 2. Уточнення / Своя підкатегорія (показуємо тільки коли обрано батьківську) */}
                        {transactions.parent_id && <>
                            <input
                                type="text"
                                className={dashboard.input}
                                required
                                list="browsers-list"
                                placeholder="Уточніть назву (напр. Сільпо)"
                                value={subName}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSubName(val);
                                    const currentSubcategories = statisticTransaction?.category_Data
                                        ?.flatMap((cat) => cat.subcategory_data || [])
                                        ?.filter((sub) => sub.parent_id === transactions.parent_id);

                                    // 2. Ищем подкатегорию, у которой имя совпадает с введенным текстом (без учета регистра)
                                    const existingSubcategory = currentSubcategories?.find(
                                        (sub) => sub.name.trim().toLowerCase() === val.trim().toLowerCase()
                                    );

                                    // 3. Обновляем стейт: если нашли — берем ее category_id, если нет — ставим null
                                    setTransactions((prev) => ({
                                        ...prev,
                                        name: val,
                                        category_id: existingSubcategory ? existingSubcategory.id : ''
                                    }));
                                }}
                            />

                            <datalist id="browsers-list">
                                {statisticTransaction?.category_Data?.map((e) =>
                                    e.subcategory_data
                                        ?.filter((elem) => elem.parent_id === transactions.parent_id)
                                        ?.map((elem) => (
                                            <option key={elem.parent_id || elem.name} value={elem.name} />
                                        ))
                                )}
                            </datalist>
                        </>
                        }
                    </div>

                    <div className={dashboard.formGroupSum}>
                        <div className={dashboard.sumLabelBox}>
                            <label><LiaMoneyBillWaveSolid className={dashboard.Icon} />Сума</label>
                            <div className={dashboard.sumPlusButton}>
                                <button type='button' onClick={() => setTransactions({ ...transactions, amount: transactions.amount + 100 })}>+100</button>
                                <button type='button' onClick={() => setTransactions({ ...transactions, amount: transactions.amount + 500 })}>+500</button>
                                <button type='button' onClick={() => setTransactions({ ...transactions, amount: transactions.amount + 1000 })}>+1K</button>
                            </div>
                        </div>
                        <input
                            required
                            type="number"
                            className={dashboard.input}
                            placeholder="0.00 грн"
                            value={transactions.amount === 0 ? '' : transactions.amount}
                            onChange={(e) => setTransactions({ ...transactions, amount: Number(e.target.value) })}
                        />
                    </div>
                </div>
                <div className={dashboard.formButtons}>
                    <button
                        type="button"
                        className={dashboard.clearButton}
                        onClick={() => { setTransactions(defaultState); setSubName('') }}
                    >
                        Очистити
                    </button>
                    <button type="submit" className={dashboard.submitButton}>
                        ВВЕСТИ
                    </button>
                </div>
            </form>

            {monthAnalitic && <div className={dashboard.mainGrid}>
                {/* Таблиця транзакцій */}
                <div className={dashboard.card}>
                    <div className={dashboard.cardHeader}>
                        <div className={dashboard.cardTitleBox}>
                            < TbPointFilled className={dashboard.cardPoint} />
                            <h3>Останні транзакції</h3>
                        </div>
                        <div className={dashboard.cardBtnBox}>
                            <select className={dashboard.cardSelect} name="" id="" onChange={(e) => setFilter(e.target.value)}>
                                <option value="">Фільтр</option>
                                {monthAnalitic ? monthAnalitic?.system_category?.map(e => (
                                    <option className={dashboard.cardSelectOption} value={e.category_id}>{e.name}</option>
                                )) : ''}
                            </select>
                            <button className={dashboard.exportBtn}><CiImport />Експорт</button>
                        </div>
                    </div>

                    <div className={dashboard.tableWrapper}>
                        <table className={dashboard.table}>
                            <thead>
                                <tr>
                                    <th className={dashboard.th}>Дата</th>
                                    <th className={dashboard.th}>Опис</th>
                                    <th className={dashboard.th}>Категорія</th>
                                    <th className={dashboard.th}>Сума</th>
                                    <th className={dashboard.th}>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionData
                                    .filter((tx) => {
                                        if (filter === '') return true;

                                        // Отримуємо батьківську категорію, враховуючи, що categories або parent можуть бути null
                                        const parentCategory = Array.isArray(tx.categories?.parent)
                                            ? tx.categories?.parent[0]
                                            : tx.categories?.parent;

                                        // Безпечне порівняння через optional chaining
                                        return parentCategory?.id === filter || parentCategory?.name === filter;
                                    })
                                    .map((tx) => (
                                        <tr key={tx.id} className={dashboard.tr}>
                                            <td>{tx.transaction_date}</td>
                                            <td className={dashboard.cardDescriptionBox}>
                                                <h2 className={dashboard.cardTitle}>{tx.title}</h2>
                                                <strong>{tx.description}</strong>
                                            </td>

                                            {/* ТУТ ТАКОЖ ДОДАЄМО ?. АБО РЕЗЕРВНИЙ ТЕКСТ */}
                                            <td>{tx.categories?.name || 'Без категорії'}</td>

                                            <td>
                                                <span className={tx.type === 'expense' ? dashboard.amountExpense : dashboard.amountIncome}>
                                                    {tx.type === 'income' ? `+${tx.amount?.toFixed(2)}` : tx.amount?.toFixed(2)} грн
                                                </span>
                                            </td>
                                            <td className={dashboard.btnCardBox}>
                                                <button
                                                    className={dashboard.penBtn}
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setUpdata({
                                                            id: tx.id,
                                                            title: tx.title || '',
                                                            transaction_date: tx.transaction_date || '',
                                                            type: tx.type || 'expense',
                                                            amount: tx.amount || 0,
                                                            description: tx.description || ''
                                                        })
                                                    }}
                                                >
                                                    <FaPen className={dashboard.penIcon} />
                                                </button>
                                                <button
                                                    className={dashboard.DeletBtn}
                                                    onClick={() => dispatch(deletTransaction(tx.id))}
                                                >
                                                    <MdDelete className={dashboard.deletIcon} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                {isModalOpen && (
                                    <div
                                        className={`${dashboard.modalOverlay} ${dashboard.active}`}
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        <div
                                            className={dashboard.modalContent}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Шапка модального вікна */}
                                            <div className={dashboard.modalHeader}>
                                                <div className={dashboard.modalTitleGroup}>
                                                    <span className={`${dashboard.modalIndicator} ${updata.type === 'expense' ? dashboard.expense : dashboard.income}`} />
                                                    <h3 className={dashboard.modalTitle}>Нова транзакція</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    className={dashboard.modalCloseBtn}
                                                    onClick={() => setIsModalOpen(false)}
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            {/* Форма */}
                                            <form onSubmit={hundelUpdata} className={dashboard.modalForm}>

                                                {/* Перемикач: Витрати / Прибутки (2 кнопки) */}
                                                <div className={dashboard.typeToggleGroup}>
                                                    <button
                                                        type="button"
                                                        className={`${dashboard.typeBtn} ${updata.type === 'expense' ? dashboard.activeExpense : ''}`}
                                                        onClick={() => setUpdata({ ...updata, type: 'expense' })}
                                                    >
                                                        <span>−</span> Витрата
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`${dashboard.typeBtn} ${updata.type === 'income' ? dashboard.activeIncome : ''}`}
                                                        onClick={() => setUpdata({ ...updata, type: 'income' })}
                                                    >
                                                        <span>+</span> Прибуток
                                                    </button>
                                                </div>

                                                {/* Сума */}
                                                <div className={dashboard.inputGroup}>
                                                    <label className={dashboard.inputLabel}>Сума (грн) *</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        required
                                                        placeholder="0.00"
                                                        value={updata.amount === 0 ? '' : updata.amount}
                                                        onChange={(e) => setUpdata({ ...updata, amount: Number(e.target.value) })}
                                                        className={`${dashboard.inputField} ${dashboard.amountInput}`}
                                                    />
                                                </div>

                                                {/* Заголовок */}
                                                <div className={dashboard.inputGroup}>
                                                    <label className={dashboard.inputLabel}>Заголовок *</label>
                                                    <input
                                                        type="text"
                                                        placeholder="напр. Свинина для стейків"
                                                        value={updata.title}
                                                        onChange={(e) => setUpdata({ ...updata, title: e.target.value })}
                                                        className={dashboard.inputField}
                                                    />
                                                </div>

                                                {/* Дата */}
                                                <div className={dashboard.inputGroup}>
                                                    <label className={dashboard.inputLabel}>Дата *</label>
                                                    <input
                                                        type="date"
                                                        value={updata.transaction_date}
                                                        onChange={(e) => setUpdata({ ...updata, transaction_date: e.target.value })}
                                                        className={dashboard.inputField}
                                                    />
                                                </div>

                                                {/* Опис */}
                                                <div className={dashboard.inputGroup}>
                                                    <label className={dashboard.inputLabel}>Опис / Примітка</label>
                                                    <textarea
                                                        rows={2}
                                                        placeholder="напр. Сільпо, каса самообслуговування"
                                                        value={updata.description}
                                                        onChange={(e) => setUpdata({ ...updata, description: e.target.value })}
                                                        className={`${dashboard.inputField} ${dashboard.textareaField}`}
                                                    />
                                                </div>

                                                {/* Кнопка затвердження дій (3-тя кнопка) */}
                                                <button type="submit" className={dashboard.submitBtn}>
                                                    ✓ Затвердити зміни
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Зведення */}
                <div className={dashboard.card}>
                    <div className={dashboard.cardHeader}>
                        <h3>ЗВЕДЕННЯ</h3>
                    </div>

                    <div className={dashboard.summaryList}>
                        {monthAnalitic?.monthly_expenses_summary?.slice(8, 12).map((item, i) => (
                            <div key={i} className={dashboard.summaryRow}>
                                <span>{item.month_name}</span>
                                <strong>{item.total_expense}</strong>
                            </div>
                        ))}
                    </div>

                    <div className={dashboard.aiHintBox}>
                        <strong>Розумний аналіз:</strong> Ваші витрати за останні три місяці зменшились на 14% порівняно з минулим періодом. Ви вдало оптимізували бюджет!
                    </div>

                    <div className={dashboard.securityNotice}>
                        <div>
                            <strong>Конфіденційність даних:</strong> Усі фінансові записи шифруються за стандартом <strong>AES-256</strong>. AI-аналіз здійснюється анонімно без передачі персональних даних третім особам.
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Dashboard;