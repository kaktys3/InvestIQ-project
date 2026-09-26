import { loginUser, registerUser } from '../Store/dataScript'
import { useAppDispatch } from '../Store'


export default function Loyute() {
    const dispatch = useAppDispatch()

    const testFunction = (): void => {
        dispatch(loginUser({ email: 'ananas@gmail.com', password: '123456789'}))
    }
    return (
        <>
        <button onClick={testFunction}>clik me</button>
        </>
    )
}