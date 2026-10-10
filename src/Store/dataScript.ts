import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
import { type Login, type returnRegisterData, type Register, type Finnhub, type FinnhubFn, type period, type returnNewData, type updataDataInterfase, type outLogin, type pushDataSb } from "./interface";
import axios from "axios";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});

const userProfileData = async (userId: string) => {
    const { data: userProfile, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()


    if (profilesError) {
        console.log(profilesError)
        throw new Error(profilesError.message)
    }

    return userProfile
}

const userTransactionsData = async (userId: string, page: number = 0) => {
    const PAGE_SIZE = 40;
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: usertransactions, error: transactionsError } = await supabase
        .from('transactions')
        .select(`
    *,
    categories!category_id (
      id,
      name,
      icon,
      parent:parent_id!left (
        id,
        name
      )
    )
  `)
        .eq('user_id', userId)
        .order('transaction_date', { ascending: false })
        .range(from, to)


    if (transactionsError) {
        console.log(transactionsError)
        throw new Error(transactionsError.message)
    }

    return usertransactions
}

const monthlyAnaliticData = async (month: period, startData: string | null = null, endData: string | null = null) => {
    const { data, error } = await supabase.rpc('get_fast_panel_analytics', {
        p_period_type: month,
        p_start_date: startData,
        p_end_date: endData
    }
    )

    if (error) {
        console.log(error)
        throw new Error(error?.message)
    }

    data.id = crypto.randomUUID()

    console.log(data)
    return data
}

const statisticTransactions = async (period_type: period, startData: string | null = null, endData: string | null = null) => {
    const { data, error } = await supabase.rpc('get_statistic_transactions', {
        p_period_type: period_type,
        p_start_date: startData,
        p_end_date: endData
    }
    )

    if (error) {
        console.log(error)
        throw new Error(error.message)
    }

    data.id = crypto.randomUUID()

    console.log(data)
    return data
}

export const marketRate = createAsyncThunk<FinnhubFn, void>(
    'market/rate',
    async (_, thankApi) => {
        try {
            const API_KEY = import.meta.env.VITE_API_KEY
            const BASE_URL = 'https://finnhub.io/api/v1/quote'

            const [finSpy, finBtn, finUah] = await Promise.all([
                axios.get<Finnhub>(BASE_URL, { params: { symbol: 'SPY', token: API_KEY } }),
                axios.get<Finnhub>(BASE_URL, { params: { symbol: 'BINANCE:BTCUSDT', token: API_KEY } }),
                axios.get<any>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json')
            ]
            )

            return {
                SPY: finSpy.data,
                BTC: finBtn.data,
                EUR_UAH: finUah.data[0]

            }
        } catch (error) {
            return thankApi.rejectWithValue(error)
        }
    }
)

// вирішити проблему тригерної функції в реєстрації
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const registerUser = createAsyncThunk<returnRegisterData, Register>(
    'register/user',
    async (dataUser, thunkApi) => {
        try {
            const { data: authData, error: registerError } = await supabase.auth.signUp({
                email: dataUser.gmail,
                password: dataUser.password,
                options: {
                    data: {
                        full_name: dataUser.name,
                        is_premium: false
                    }
                }
            })

            if (registerError) {
                console.log(registerError)
                return thunkApi.rejectWithValue(registerError)
            }

            if (!authData.user) {
                return thunkApi.rejectWithValue('не вдалось отримати данні користуача')
            }

            await delay(500)

            const [profile, transactions, monthlyAnalitic, statisticTransaction] = await Promise.all([
                userProfileData(authData.user!.id),
                userTransactionsData(authData.user!.id),
                monthlyAnaliticData('month'),
                statisticTransactions('month')
            ])


            return {
                profile,
                transactions,
                monthlyAnalitic,
                statisticTransaction
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const loginUser = createAsyncThunk<returnRegisterData, Login>(
    'user/login',
    async (dataUser, thunkApi) => {
        try {
            const { data: userData, error: errorLogin } = await supabase.auth.signInWithPassword({
                email: dataUser.email,
                password: dataUser.password
            })

            if (errorLogin) {
                console.log(errorLogin)
                return thunkApi.rejectWithValue(errorLogin)
            }

            if (!userData.user) {
                return thunkApi.rejectWithValue('не вдалось отримати данні користуача')
            }

            console.log(userData)

            const [profile, transactions, monthlyAnalitic, statisticTransaction] = await Promise.all([
                userProfileData(userData.user!.id),
                userTransactionsData(userData.user!.id),
                monthlyAnaliticData('month'),
                statisticTransactions('month')
            ])


            return {
                profile,
                transactions,
                monthlyAnalitic,
                statisticTransaction
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const deletTransaction = createAsyncThunk<returnNewData, string>(
    'delete/transaction',
    async (id, thunkApi) => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || user === null) {
                throw new Error('помилк отримання данних користувача при видаленні транзакції')
            }

            const { data: deleteData, error: deletError } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id)

            if (deletError) {
                throw new Error('помилк видалення данних транзакції')
            }

            const [transactions, monthlyAnalitic, statisticTransaction] = await Promise.all([
                userTransactionsData(user.id),
                monthlyAnaliticData('month'),
                statisticTransactions('month')
            ])

            return {
                transactions,
                monthlyAnalitic,
                statisticTransaction
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const updataData = createAsyncThunk<
  returnNewData,
  updataDataInterfase,
  { rejectValue: string }
>(
  'updata/data',
  async (updataData, thunkApi) => {
    try {
      if (!updataData.id) {
        return thunkApi.rejectWithValue('ID транзакції відсутній');
      }

      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        return thunkApi.rejectWithValue('Помилка авторизації користувача');
      }

      // 1. Формуємо об'єкт оновлення тільки з переданими значеннями
      const updatePayload: Record<string, any> = {};

      if (updataData.type) updatePayload.type = updataData.type;
      if (updataData.title) updatePayload.title = updataData.title;
      if (updataData.transaction_date) updatePayload.transaction_date = updataData.transaction_date;
      if (updataData.description !== undefined) updatePayload.description = updataData.description;
      if (typeof updataData.amount === 'number' && updataData.amount > 0) {
        updatePayload.amount = updataData.amount;
      }

      // 2. Робимо update і ОБОВ'ЯЗКОВО викликаємо .select()
      const { data, error: updataError } = await supabase
        .from('transactions')
        .update(updatePayload)
        .eq('id', updataData.id)
        .select();

      if (updataError) {
        console.error('Supabase update error:', updataError);
        return thunkApi.rejectWithValue(updataError.message);
      }

      await delay(500);

      // 3. Завантажуємо оновлені дані
      const [transactions, monthlyAnalitic, statisticTransaction] = await Promise.all([
        userTransactionsData(user.id),
        monthlyAnaliticData('month'),
        statisticTransactions('month')
      ]);

      return {
        transactions,
        monthlyAnalitic,
        statisticTransaction
      };
    } catch (error: any) {
      // Повертаємо строкове повідомлення, щоб Redux не скаржився на non-serializable значення
      return thunkApi.rejectWithValue(
        error.message || 'Помилка при оновленні транзакції'
      );
    }
  }
);

export const outLoginUser = createAsyncThunk<outLogin>(
    'out/login',
    async (_, thunkApi) => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw new Error('сталась помилка при спробі розлогінізації')
            }

            return {
                profile: {},
                transactions: {},
                monthlyAnalitic: {},
                statisticTransaction: {},
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const pushData = createAsyncThunk<returnNewData, pushDataSb>(
    'push/data',
    async (data, thunkApi) => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            const category = data.category_id != '' ? data.category_id : crypto.randomUUID()

            if (error || user === null) {
                throw new Error('помилк отримання данних користувача при видаленні транзакції')
            }

            if (data.category_id === '') {
                const { data: categoryData, error: categoryError } = await supabase
                    .from('categories')
                    .insert({
                        user_id: user.id,
                        id: category,
                        name: data.name,
                        type: data.type,
                        parent_id: data.parent_id,
                    })
                    .select()

                if (categoryData === null || categoryError) {
                    throw new Error('помилк отримання данних користувача при push транзакції')
                }
            }

            const { data: newData, error: updataError } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    id: data.id,
                    category_id: category,
                    type: data.type,
                    amount: data.amount,
                    title: data.title,
                    description: data.description,
                    transaction_date: data.transaction_date
                })
                .select()

            if (updataError || newData === null) {
                throw new Error('помилк отримання данних користувача при push транзакції')
            }

            const [transactions, monthlyAnalitic, statisticTransaction] = await Promise.all([
                userTransactionsData(user.id),
                monthlyAnaliticData('month'),
                statisticTransactions('month')
            ])

            return {
                transactions,
                monthlyAnalitic,
                statisticTransaction
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)