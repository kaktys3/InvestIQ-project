// 1. наче не актуально
// export interface SubcategoryStat {
//     subcategory_id: string;
//     subcategory_name: string;
//     amount: number;
//     percentage_of_category: number;
// }

// 2. Не актуально
// export interface CategoryStat {
//     category_id: string;
//     category_name: string;
//     total_amount: number;
//     percentage_of_total_expense: number;
//     subcategories: SubcategoryStat[];
// }

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
    subcategory_data: statisticCategoryData[]
}

export interface systemCategory {
    category_id: string
    name: string,
    is_system: boolean
}

// 4. не актуальний
// export interface AnalyticsResponse {
//     id: string,
//     period: AnalyticsPeriod;
//     total_income: number;
//     total_expense: number;
//     net_summary: number;
//     avg_daily_expense: number;
//     avg_daily_transactions: number;
//     monthly_expenses_summary: yearMonthAmount[]
//     categories_breakdown: CategoryStat[];

// }
// interface fast panel

export interface AnalyticsResponse {
    id: string,
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

// 1. Таблиця profiles
export interface Profile {
    id: string;                  // uuid (PK)
    full_name: string;           // text
    is_premium?: boolean | null; // bool
    created_at?: string | null;  // timestamptz
    updated_at?: string | null;  // timestamptz
}

// export interface Category {
//     id: string;                  // uuid (PK)
//     user_id?: string | null;     // uuid (FK) - null для системних категорій
//     name: string;                // text
//     type: TransactionType;       // transaction_type (income / expense)
//     color?: string | null;       // text
//     is_system?: boolean | null;  // bool
//     created_at?: string | null;  // timestamptz
//     parent_id?: string | null;   // uuid (FK) - для підкатегорій
// }

export interface Transaction {
    id: string;
    name: string,               // uuid (PK)
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
    name: string
}

export interface Login {
    email: string,
    password: string
}

export interface returnRegisterData {
    profile: Profile,
    // categories: Category,
    transactions: Transaction[],
    monthlyAnalitic: AnalyticsResponse
}