import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
import { type Login, type returnRegisterData, type Register, type Finnhub, type FinnhubFn, type period, type AnalyticsResponse } from "./interface";
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
        return profilesError
    }

    return userProfile
}

// const userCategoriesData = async (userId: string) => {
//     const { data: userCategories, error: CategoriesError } = await supabase
//         .from('categories')
//         .select('*')
//         .eq('id', userId)
//         .maybeSingle()


//     if (CategoriesError) {
//         console.log(CategoriesError)
//         return CategoriesError
//     }

//     return userCategories
// }

const userTransactionsData = async (userId: string) => {
    const { data: usertransactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', userId)
        .maybeSingle()


    if (transactionsError) {
        console.log(transactionsError)
        return transactionsError
    }

    return usertransactions
}

const monthlyAnaliticData = async (month: period, startData: string | null = null, endData: string | null = null) => {
    const { data, error } = await supabase.rpc('get_flexible_analytics', {
        p_period_type: month,
        p_start_date: startData,
        p_end_date: endData
    }
    )

    if (error) {
        console.log(error)
        return error
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

            const profile = await userProfileData(authData.user!.id)
            // const categories = await userCategoriesData(authData.user!.id)
            const transactions = await userTransactionsData(authData.user!.id)
            const monthlyAnalitic = await monthlyAnaliticData('month')

            return {
                profile: profile,
                // categories: categories,
                transactions: transactions,
                monthlyAnalitic: monthlyAnalitic
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

            const profile = await userProfileData(userData.user!.id)
            // const categories = await userCategoriesData(userData.user!.id)
            const transactions = await userTransactionsData(userData.user!.id)
            const monthlyAnalitic = await monthlyAnaliticData('month')

            return {
                profile: profile,
                // categories: categories,
                transactions: transactions,
                monthlyAnalitic: monthlyAnalitic
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const analiticData = createAsyncThunk<AnalyticsResponse, period>(
    'analitic/data',
    async (periodData, thunkApi) => {
        try {
            const data = monthlyAnaliticData(periodData)

            if(!data) {
                return thunkApi.rejectWithValue(data)
            }

            return data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)