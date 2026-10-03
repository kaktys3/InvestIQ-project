import React, { useState } from 'react';
import {
    DashboardContainer,
    HeroCard,
    HeroTopRow,
    BalanceInfo,
    ModeToggleGroup,
    ToggleButton,
    FormSection,
    FormGroup,
    Input,
    Select,
    SubmitButton,
    ClearButton,
    MainGrid,
    Card,
    CardHeader,
    TableWrapper,
    Table,
    Th,
    Tr,
    AmountText,
    SummaryList,
    SummaryRow,
    AiHintBox,
    SecurityNotice,
    // SecurityBadge,
} from '../../styles/DashboardPage.styles';

const INITIAL_TRANSACTIONS = [
    { id: '1', date: '18.10.2024', desc: 'Свинина для стейків', cat: 'Продукти', amount: -420.0, isExpense: true },
    { id: '2', date: '18.10.2024', desc: 'Пальне А-95 (WOG)', cat: 'Транспорт', amount: -1850.0, isExpense: true },
    { id: '3', date: '17.10.2024', desc: 'Аптека "Подорожник"', cat: 'Здоров’я', amount: -360.0, isExpense: true },
    { id: '4', date: '16.10.2024', desc: 'Аванс за проєкт UI/UX', cat: 'Зарплата', amount: 15000.0, isExpense: false },
    { id: '5', date: '15.10.2024', desc: 'Вечеря в ресторані', cat: 'Розваги', amount: -1150.0, isExpense: true },
];

const SUMMARY_DATA = [
    { month: 'ВЕРЕСЕНЬ', amount: '18 400.00 грн' },
    { month: 'СЕРПЕНЬ', amount: '22 100.00 грн' },
    { month: 'ЛИПЕНЬ', amount: '19 050.00 грн' },
    { month: 'ЧЕРВЕНЬ', amount: '24 600.00 грн' },
];

export function Dashboard() {
    const [mode, setMode] = useState<'expense' | 'income'>('expense');
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

    const [date, setDate] = useState('2024-10-18');
    const [desc, setDesc] = useState('');
    const [cat, setCat] = useState('');
    const [amount, setAmount] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!desc || !amount) return;

        const numAmount = parseFloat(amount);
        const newTx = {
            id: Date.now().toString(),
            date,
            desc,
            cat: cat || 'Різне',
            amount: mode === 'expense' ? -Math.abs(numAmount) : Math.abs(numAmount),
            isExpense: mode === 'expense',
        };

        setTransactions([newTx, ...transactions]);
        setDesc('');
        setAmount('');
    };

    return (
        <DashboardContainer>
            <HeroCard>
                <HeroTopRow>
                    <BalanceInfo>
                        <label>Поточний баланс рахунку</label>
                        <h1>54 200.00 грн</h1>
                    </BalanceInfo>

                    <ModeToggleGroup>
                        <ToggleButton
                            activeType={mode === 'expense' ? 'expense' : 'inactive'}
                            onClick={() => setMode('expense')}
                        >
                            ВИТРАТИ
                        </ToggleButton>
                        <ToggleButton
                            activeType={mode === 'income' ? 'income' : 'inactive'}
                            onClick={() => setMode('income')}
                        >
                            ДОХІД
                        </ToggleButton>
                    </ModeToggleGroup>
                </HeroTopRow>

                <FormSection onSubmit={handleAdd}>
                    <FormGroup>
                        <label>Дата</label>
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <label>Опис товару / послуги</label>
                        <Input
                            placeholder="напр. Сметану, Морква або WOG"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Категорія</label>
                        <Select value={cat} onChange={(e) => setCat(e.target.value)}>
                            <option value="">Продукти харчування</option>
                            <option value="Транспорт">Транспорт</option>
                            <option value="Здоров’я">Здоров’я</option>
                            <option value="Розваги">Розваги</option>
                            <option value="Зарплата">Зарплата</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <label>Сума</label>
                        <Input
                            type="number"
                            placeholder="0.00 грн"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </FormGroup>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <ClearButton
                            type="button"
                            onClick={() => {
                                setDesc('');
                                setAmount('');
                            }}
                        >
                            Очистити
                        </ClearButton>
                        <SubmitButton type="submit">ВВЕСТИ</SubmitButton>
                    </div>
                </FormSection>
            </HeroCard>

            <MainGrid>
                {/* Таблиця транзакцій */}
                <Card>
                    <CardHeader>
                        <h3>Останні транзакції</h3>
                    </CardHeader>

                    <TableWrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <Th>Дата</Th>
                                    <Th>Опис</Th>
                                    <Th>Категорія</Th>
                                    <Th>Сума</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <Tr key={tx.id}>
                                        <td>{tx.date}</td>
                                        <td><strong>{tx.desc}</strong></td>
                                        <td>{tx.cat}</td>
                                        <td>
                                            <AmountText isExpense={tx.isExpense}>
                                                {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(2)} грн
                                            </AmountText>
                                        </td>
                                    </Tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableWrapper>
                </Card>

                <Card>
                    <CardHeader>
                        <h3> ЗВЕДЕННЯ</h3>
                    </CardHeader>

                    <SummaryList>
                        {SUMMARY_DATA.map((item, i) => (
                            <SummaryRow key={i}>
                                <span>{item.month}</span>
                                <strong>{item.amount}</strong>
                            </SummaryRow>
                        ))}
                    </SummaryList>

                    <AiHintBox>
                        <strong>Розумний аналіз:</strong> Ваші витрати за останні три місяці зменшились на 14% порівняно з минулим періодом. Ви вдало оптимізували бюджет!
                    </AiHintBox>


                    <SecurityNotice>
                        {/* <SecurityBadge></SecurityBadge> */}
                        <div>
                            <strong>Конфіденційність даних:</strong> Усі фінансові записи шифруються за стандартом <strong>AES-256</strong>. AI-аналіз здійснюється анонімно без передачі персональних даних третім особам.
                        </div>
                    </SecurityNotice>

                </Card>
            </MainGrid>
        </DashboardContainer>
    );
}

export default Dashboard;