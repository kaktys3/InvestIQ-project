
import { useMemo, useState } from 'react';
import type { Transaction } from '../Store/interface';

import {
    AnalyticsWrapper,
    SectionHeader,
    SectionTitle,
    TotalLabel,
    CategoryGrid,
    CategoryCard,
    CategoryTop,
    CategoryIcon,
    CategoryPercent,
    CategoryName,
    CategoryAmount,
    ProgressTrack,
    ProgressFill,
    DetailsPanel,
    DetailsHeader,
    DetailsTitle,
    Chart,
    ChartColumn,
    BarTrack,
    Bar,
    BarValue,
    BarLabel,
    ChartControls,
    ControlButton,
    EmptyState,
} from '../styles/ExpenseAnalytics.styles';




interface ExpenseAnalyticsProps {
    transactions: Transaction[];
}

type CategorySummary = {
    id: string;
    name: string;
    icon: string;
    amount: number;
    percentage: number;
};

type SubcategorySummary = {
    name: string;
    amount: number;
    percentage: number;
};

const categoryIcons: Record<string, string> = {
    Продукти: '',
    'Продукти харчування': '',
    Транспорт: '',
    "Здоров'я": '',
    Розваги: '',
    Комунальні: '',
    Інше: '',
};

const formatMoney = (amount: number) =>
    new Intl.NumberFormat('uk-UA', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
    }).format(amount);


    
export default function ExpenseAnalytics({
    transactions,
}: ExpenseAnalyticsProps) {
    const [selectedCategory, setSelectedCategory] =
        useState<string | null>(null);

    const [sortByAmount, setSortByAmount] = useState(true);
    const [showPercentages, setShowPercentages] = useState(false);

    const { categories, totalExpenses } = useMemo(() => {
        const expenses = transactions.filter(
            (transaction) =>
                transaction.type === 'expense' &&
                Number.isFinite(Number(transaction.amount)) &&
                Number(transaction.amount) > 0
        );

        const groups = new Map<string, CategorySummary>();

        for (const transaction of expenses) {
            const rawCategory = Array.isArray(transaction.categories) 
                ? transaction.categories[0] 
                : transaction.categories;

            const parent = rawCategory?.parent;
            
            const name = parent?.name || rawCategory?.name || 'Інше';
            const id = parent?.id || rawCategory?.id || 'other';

            const current = groups.get(id);
            const amountNum = Number(transaction.amount);

            if (current) {
                current.amount += amountNum;
            } else {
                groups.set(id, {
                    id,
                    name,
                    icon: categoryIcons[name] || '📦', // Іконка за замовчуванням
                    amount: amountNum,
                    percentage: 0,
                });
            }
        }

        const total = expenses.reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount),
            0
        );

        const result = Array.from(groups.values())
            .map((category) => ({
                ...category,
                percentage:
                    total > 0 ? (category.amount / total) * 100 : 0,
            }))
            .sort((a, b) => b.amount - a.amount);

        return {
            categories: result,
            totalExpenses: total,
        };
    }, [transactions]);

    const activeCategory =
        categories.find((category) => category.id === selectedCategory) ??
        categories[0];

    const subcategories = useMemo(() => {
        if (!activeCategory) {
            return [];
        }

        const grouped = new Map<string, number>();

        for (const transaction of transactions) {
            if (
                transaction.type !== 'expense' ||
                Number(transaction.amount) <= 0
            ) {
                continue;
            }

            const category = transaction.categories;
            const parentId = category?.parent?.id || category?.id || 'other';

            if (parentId !== activeCategory.id) {
                continue;
            }

            const name = category?.parent?.id
                ? category?.name || 'Без підкатегорії'
                : category?.name || 'Інше';

            grouped.set(
                name,
                (grouped.get(name) || 0) + Number(transaction.amount)
            );
        }

        const result: SubcategorySummary[] = Array.from(
            grouped.entries()
        ).map(([name, amount]) => ({
            name,
            amount,
            percentage:
                activeCategory.amount > 0
                    ? (amount / activeCategory.amount) * 100
                    : 0,
        }));

        return result.sort((a, b) =>
            sortByAmount ? b.amount - a.amount : a.name.localeCompare(b.name, 'uk')
        );
    }, [transactions, activeCategory, sortByAmount]);

    const maxAmount = Math.max(
        ...subcategories.map((item) => item.amount),
        1
    );

    return (
        <AnalyticsWrapper>
            <SectionHeader>
                <div>
                    <SectionTitle>
                        Структура витрат за категоріями
                    </SectionTitle>
                    <p>
                        Обери категорію для детального аналізу підкатегорій
                    </p>
                </div>

                <TotalLabel>
                    СУМАРНО: {formatMoney(totalExpenses)} грн
                </TotalLabel>
            </SectionHeader>

            {categories.length === 0 ? (
                <EmptyState>
                    Поки немає витрат для відображення аналітики.
                </EmptyState>
            ) : (
                <>
                    <CategoryGrid>
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                active={category.id === activeCategory?.id}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <CategoryTop>
                                    <CategoryIcon>
                                        {category.icon}
                                    </CategoryIcon>

                                    <CategoryPercent>
                                        {category.percentage.toFixed(0)}%
                                    </CategoryPercent>
                                </CategoryTop>

                                <CategoryName>
                                    {category.name}
                                </CategoryName>

                                <CategoryAmount>
                                    {formatMoney(category.amount)} грн
                                </CategoryAmount>

                                <ProgressTrack>
                                    <ProgressFill
                                        style={{ width: `${category.percentage}%` }}
                                    />

                                </ProgressTrack>
                            </CategoryCard>
                        ))}
                    </CategoryGrid>

                    {activeCategory && (
                        <DetailsPanel>
                            <DetailsHeader>
                                <div>
                                    <DetailsTitle>
                                        Деталізація витрат: {activeCategory.name}
                                    </DetailsTitle>
                                    <p>
                                        Розподіл витрат за підкатегоріями
                                    </p>
                                </div>

                                <ChartControls>
                                    <ControlButton
                                        active={sortByAmount}
                                        onClick={() => setSortByAmount(true)}
                                    >
                                        ↕ Сума
                                    </ControlButton>

                                    <ControlButton
                                        active={!sortByAmount}
                                        onClick={() => setSortByAmount(false)}
                                    >
                                        А–Я
                                    </ControlButton>

                                    <ControlButton
                                        active={showPercentages}
                                        onClick={() => setShowPercentages((previous) => !previous)}
                                    >
                                        {showPercentages ? 'Показати суми' : 'Показати %'}
                                    </ControlButton>

                                </ChartControls>
                            </DetailsHeader>

                            {subcategories.length === 0 ? (
                                <EmptyState>
                                    У цій категорії поки немає витрат.
                                </EmptyState>
                            ) : (
                                <Chart>
                                    {subcategories.map((item) => (
                                        <ChartColumn key={item.name}>
                                            <BarTrack>
                                                <BarValue>
                                                    {showPercentages
                                                        ? `${item.percentage.toFixed(1)}%`
                                                        : `${formatMoney(item.amount)} грн`}
                                                </BarValue>

                                                <Bar
                                                    style={{ height: `${Math.max(3, (item.amount / maxAmount) * 100)}%` }}
                                                    title={`${item.name}: ${formatMoney(item.amount)} грн`}
                                                />
                                            </BarTrack>

                                            <BarLabel>{item.name}</BarLabel>
                                        </ChartColumn>
                                    ))}
                                </Chart>
                            )}
                        </DetailsPanel>
                    )}
                </>
            )}
        </AnalyticsWrapper>
    );
}