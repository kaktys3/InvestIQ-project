import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
import { type Login, type returnRegisterData, type Register, type Finnhub, type FinnhubFn, type period, type returnNewData, type updataDataInterfase, type outLogin } from "./interface";
import axios from "axios";


const supabase = createClient('https://jfoqxacpmunojzdgurbj.supabase.co', 'sb_publishable_jitNzgQXxlBfyGrhgarvOg_HV2zjWms', {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
})

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
    categories (
      id,
      name,
      parent:parent_id (    
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
            const API_KEY = 'dan40k1r01qn0fq9lengdan40k1r01qn0fq9leo0'
            const BASE_URL = 'https://finnhub.io/api/v1/quote'

            const [finSpy, finBtn, finUah] = await Promise.all([
                axios.get<Finnhub>(BASE_URL, { params: { symbol: 'SPY', token: API_KEY } }),
                axios.get<Finnhub>(BASE_URL, { params: { symbol: 'BINANCE:BTCUSDT', token: API_KEY } }),
                axios.get<Finnhub>(BASE_URL, { params: { symbol: 'OANDA:EUR_UAH', token: API_KEY } })
            ]
            )

            return {
                SPY: finSpy.data,
                BTC: finBtn.data,
                EUR_UAH: finUah.data

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

            await delay(500)

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

export const updataData = createAsyncThunk<returnNewData, updataDataInterfase>(
    'updata/data',
    async (updataData, thunkApi) => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || user === null) {
                throw new Error('помилк отримання данних користувача при видаленні транзакції')
            }

            const { data, error: updataError } = await supabase
                .from('transactions')
                .update({
                    type: updataData.type,
                    amount: updataData.amount,
                    title: updataData.title,
                    description: updataData.description,
                    transaction_date: updataData.transaction_date
                })
                .eq('id', updataData.id)

            if (updataError || data === null) {
                throw new Error('помилк отримання данних користувача при оновленні транзакції')
            }

            await delay(500)

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

export const outLoginUser = createAsyncThunk<outLogin>(
    'updata/data',
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