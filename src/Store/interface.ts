export type period = 'month' | 'quarter' | 'year' | 'custom';

// 3. Інформація про вибраний період
export interface AnalyticsPeriod {
    type: period
    start_date: string; // Формат ISO / YYYY-MM-DD
    end_date: string;   // Формат ISO / YYYY-MM-DD
    total_days: number;
}

export interface yearMonthAmount {
    month_name: string;
    total_expense: number;
}

export interface categoryNameId {
    category_id: string,
    category_name: string
}

export interface subcategoriesAnaliticData {
    id: string,
    parent_id: string,
    name: string,
    total_expense: number,
    percentage_of_expenses: string,
}

export interface statisticCategoryData {
    id: string,
    icons: string,
    name: string,
    total_expense: number;
    percentage_of_expenses: string,
    subcategory_data: subcategoriesAnaliticData[]
}

export interface systemCategory {
    category_id: string
    name: string,
    is_system: boolean
}

// interface fast panel
// прибери адаптери лишні

export interface AnalyticsResponse {
    period: AnalyticsPeriod;
    total_income: number;
    total_expense: number;
    net_summary: number;
    avg_daily_expense: number;
    avg_daily_transactions: number;
    monthly_expenses_summary: yearMonthAmount[];
    all_name_id_category: categoryNameId[],
    system_category: systemCategory[]
    icons: string,
}

// interface StatisticTransaction

export interface statisticTransaction {
    type: period,
    category_Data: statisticCategoryData[]
}

export type TransactionType = 'income' | 'expense';

export interface updataDataInterfase {
    id: string;                      // ID транзакції, яку оновлюємо
    title?: string;
    transaction_date?: string;
    type?: TransactionType;
    amount?: number;
    description?: string | null;
}

export interface Profile {
    id: string;                  // uuid (PK)
    full_name: string;           // text
    is_premium?: boolean | null; // bool
    created_at?: string | null;  // timestamptz
    updated_at?: string | null;  // timestamptz
}

export interface Transaction {
    id: string;
    user_id: string;             // uuid (FK)
    category_id?: string | null; // uuid (FK)
    type: TransactionType;       // transaction_type
    amount: number;              // numeric
    title: string;               // text
    description?: string | null; // text
    transaction_date: string;    // date (формат YYYY-MM-DD)
    created_at?: string | null;  // timestamptz
    icon: string,
    categories: {
        "id": string,
        "name": string,
        "parent": {
            "id": string,
            "name": string
        }
    }
}

export interface Finnhub {
    symbol: string,
    token: string,
}

export interface FinnhubFn {
    SPY: object,
    BTC: object,
    EUR_UAH: object
}



export interface Register {
    gmail: string,
    password: string,
    name: string,
}

export interface Login {
    email: string,
    password: string
}

export interface outLogin {
    profile: {},
    transactions: {},
    monthlyAnalitic: {},
    statisticTransaction: {}
}

export interface returnRegisterData {
    profile: Profile,
    transactions: Transaction[],
    monthlyAnalitic: AnalyticsResponse,
    statisticTransaction: statisticCategoryData,
}

export interface returnNewData {
    transactions: Transaction[],
    monthlyAnalitic: AnalyticsResponse,
    statisticTransaction: statisticCategoryData,
}