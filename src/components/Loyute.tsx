import { loginUser, registerUser } from '../Store/dataScript'
import { useAppDispatch, useAppSelector } from '../Store'
import { profile } from '../Store/finansSelector'
import RegisterPage from '../pages/RegisterPage/RegisterPage'


export default function Loyute() {
    const dispatch = useAppDispatch()
    const profil = useAppSelector(profile)

    console.log(profil)

    const testFunction = (): void => {
        dispatch(registerUser({ gmail: 'anang@gmai.com', password: '123456789', name: 'churka'}))
    }
    return (
        <>
        <button onClick={testFunction}>clik me</button>
        <RegisterPage/>
        </>
    )
}