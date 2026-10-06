import RegisterIcon from '../../img/registerIcon.svg';
import gogle from '../../img/SVG (1).png'
import line from '../../img/Visual Linear Divider (1).png'
import { FaUserPlus } from "react-icons/fa6"
import { GiExitDoor } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { IoMdFingerPrint } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from '../../Store';
import { market } from '../../Store/finansSelector';
import hiden from '../../img/Container (4).png';
import { GoShieldCheck } from "react-icons/go";
import register from './register.module.css';
import { useState } from 'react';
import { loginUser, registerUser } from '../../Store/dataScript';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [isHiden, setHiden] = useState(true)
    const [isChecked, setChecked] = useState(false)
    const [page, setPage] = useState('register')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    })
    const marketData = useAppSelector(market)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    console.log(formData)

    const hundelSubmit = (e: any): void => {
        e.preventdefault()

        if (page === 'register') {
            dispatch(registerUser({ gmail: formData.email, password: formData.password, name: formData.name }))
            navigate('/mainPage')
        } else {
            dispatch(loginUser({ email: formData.email, password: formData.password }))
            navigate('/mainPage')
        }
    }
    return (
        <>
            <div className={register.registerPage}>
                <div className={register.topDecor}>
                    <p className={register.sys}>SYS.ENV // SECURE_AUTH_LAYER.04</p>
                    <p className={register.node}>NODE: KYIV_PRIMARY_SEC_4096</p>
                </div>
                <div className={register.registerContainer}>
                    <div className={register.registerContent}>
                        <div className={register.registerHeader}>
                            <img src={RegisterIcon} alt="" className={register.registerLogo} />
                            <h1 className={register.registerTitle}>
                                INVEST <span className={register.iq}>IQ</span> <span className={register.registerSubtitle}>SMART FINANCE</span>
                            </h1>
                        </div>
                        <div className={register.registerInfo}>
                            <h3 className={register.registerInfoTitle}>SMART FINANCE</h3>
                            <p className={register.registerInfoText}>Керуйте фінансами розумно, наочно та безпечно</p>
                        </div>
                        <div className={register.registerFormBlock}>
                            <div className={register.registerTabs}>
                                <button className={register.registerTabBtn} style={{ backgroundColor: page === 'register' ? 'black' : 'rgba(39, 42, 50, 0.9)' }} onClick={() => setPage('login')}><GiExitDoor className={register.door} />УВІЙТИ</button>
                                <button className={register.registerTabBtn} style={{ backgroundColor: page === 'register' ? 'rgba(39, 42, 50, 0.9)' : 'black' }} onClick={() => setPage('register')}><FaUserPlus />РЕЄСТРАЦІЯ</button>
                            </div>
                            <button className={register.registerGoogleBtn}>
                                <img src={gogle} alt="" className={register.registerGoogleIcon} />Увійти за допомогою Google
                            </button>
                            <img src={line} alt="" className={register.registerDividerLine} />
                            <form onSubmit={hundelSubmit} className={register.registerForm}>
                                {page === 'register' ? <div className={register.nameForm}>
                                    <label htmlFor="" className={register.registerLabel}>
                                        <p className={register.registerLabelText}>Імя</p>
                                        <p className={register.registerLabelNote}>User name</p>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Олег'
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={register.registerInputName}
                                        autoComplete="off"
                                    />
                                </div> : <></>}

                                <div className={register.registerInputGroup}>
                                    <label htmlFor="" className={register.registerLabel}>
                                        <p className={register.registerLabelText}>Електронна пошта</p>
                                        <p className={register.registerLabelNote}>TLS Protected</p>
                                    </label>
                                    <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='yourname@email.com' autoComplete="off" className={register.registerInputName} />
                                </div>
                                <div className={register.registerInputGroup}>
                                    <label htmlFor="" className={register.registerLabel}>
                                        <p className={register.registerLabelText}>Пароль</p>
                                        <p className={register.registerLabelNote}>Мін. 8 символів</p>
                                    </label>
                                    <input
                                        type={isHiden ? "password" : 'text'}
                                        autoComplete="new-password"
                                        placeholder='••••••••••••'
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={register.registerInputPasword} required
                                        pattern="[A-Za-z0-9]{8,}"
                                        title="Мінімум 8 символів: лише англійські літери (A-Z, a-z) та цифри (0-9)" />
                                    <button className={register.hiden} onClick={() => setHiden(!isHiden)} type='button'><img src={hiden} alt="" /></button>
                                </div>
                                <div className={register.registerInputCheckbox}>
                                    <input type="checkbox" style={{ backgroundColor: isChecked ? 'white' : '#0b0e15' }} onChange={(e) => setChecked(e.target.checked)} className={register.registerInput} />
                                    <label htmlFor="" className={register.registerLabel}>
                                        <p className={register.registerLabeCeckboxText}>Запам'ятати мене</p>
                                        <a className={register.registerLabeCeckboxNote}>Забули пароль?</a>
                                    </label>
                                </div>
                                <div className={register.registerActions}>
                                <button type={page === 'register' ? 'button' : 'submit'} onClick={() => setPage('login')} className={register.registerSubmitBtn}>.УВІЙТИ В АКАУНТ <FaArrowRight /></button>
                                <button type={page === 'register' ? 'submit' : 'button'} onClick={() => setPage('register')} className={register.registerCreateBtn}><IoMdFingerPrint className={register.fingerprint} /> Створити новий профіль</button>
                        </div>
                    </form>
                </div>
                <div className={register.registerSecurity}>
                    <p className={register.registerSecurityTitle}><GoShieldCheck className={register.Shield} />256-БІТНЕ БАНКІВСЬКЕ ШИФРУВАННЯ</p>
                    <p className={register.registerSecurityText}>Захист персональних даних згідно стандартів ISO/IEC 27001</p>
                </div>
            </div>

            <div className={register.registerSidebar}>
                <h4 className={register.registerSidebarTitle}><TbPointFilled className={register.pointImg} />INVESTIQ MKT CORE:</h4>
                <div className={register.cryptoCurs}>
                    <p className={register.registerMarketRow}>
                        SPY 500: <span className={register.registerMarketSPY}>{String((marketData as any)!.SPY?.dp).slice(0, 4)}%</span>
                    </p>
                    <p className={register.registerMarketRow}>
                        BTC/USD: <span className={register.registerMarketBTC}>{String((marketData as any)!.BTC?.dp).slice(0, 4)}%</span>
                    </p>
                    <p className={register.registerMarketRow}>
                        EUR/UAH: <span className={register.registerMarketUAH}>{String((marketData as any)!.EUR_UAH?.rate).slice(0, 5)}</span>
                    </p>
                </div>
            </div>
        </div >
            <div className={register.bottomDecor}>
                <p className={register.protocol}>LATENCY: 1.2ms • PROTOCOL TLSv1.3</p>
                <p className={register.status}>STATUS: OPERATIONAL</p>
            </div>
            </div >
        </>
    )
}